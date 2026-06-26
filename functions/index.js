/* ============================================================
   Gemini Proxy — Firebase Cloud Function (v2 callable)
   Holds ONE shared Gemini API key server-side (Secret Manager)
   so every signed-in kid gets AI book-report feedback & quizzes
   without entering their own key.

   Security:
   - Requires Firebase Auth (signed-in users only).
   - Per-user daily rate limit (protects the shared free-tier quota).
   - Prompt size + generationConfig are sanitized/clamped.

   Deploy:
   1. firebase functions:secrets:set GEMINI_API_KEY   (paste your key)
   2. firebase deploy --only functions
   ============================================================ */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();

const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');
const MODEL = 'gemini-2.5-flash-lite';

// Max proxied AI calls per signed-in user per day (book reports + quizzes
// are low-frequency, so this comfortably covers normal use while blocking abuse).
const MAX_CALLS_PER_USER_PER_DAY = 50;

function sanitizeConfig(cfg) {
    cfg = cfg && typeof cfg === 'object' ? cfg : {};
    const out = {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 }
    };
    // temperature 0..1
    if (typeof cfg.temperature === 'number') {
        out.temperature = Math.min(1, Math.max(0, cfg.temperature));
    }
    if (typeof cfg.topP === 'number') {
        out.topP = Math.min(1, Math.max(0, cfg.topP));
    }
    // clamp output tokens to keep cost/latency bounded
    const tokens = parseInt(cfg.maxOutputTokens, 10);
    out.maxOutputTokens = Number.isFinite(tokens) ? Math.min(2048, Math.max(64, tokens)) : 800;
    // allow caller to request plain text instead of JSON
    if (cfg.responseMimeType === 'text/plain') {
        out.responseMimeType = 'text/plain';
    }
    return out;
}

exports.geminiProxy = onCall(
    { secrets: [GEMINI_API_KEY], cors: true, region: 'us-central1', maxInstances: 10 },
    async (request) => {
        // 1. Require a signed-in user
        if (!request.auth) {
            throw new HttpsError('unauthenticated', 'Please sign in to use AI features.');
        }
        const uid = request.auth.uid;

        // 2. Validate prompt
        const prompt = request.data && request.data.prompt;
        if (typeof prompt !== 'string' || prompt.trim().length < 10 || prompt.length > 8000) {
            throw new HttpsError('invalid-argument', 'Prompt must be 10–8000 characters.');
        }

        // 3. Per-user daily rate limit (atomic)
        const db = admin.firestore();
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
        const usageRef = db.collection('aiUsage').doc(`${uid}_${today}`);
        await db.runTransaction(async (tx) => {
            const snap = await tx.get(usageRef);
            const count = snap.exists ? (snap.data().count || 0) : 0;
            if (count >= MAX_CALLS_PER_USER_PER_DAY) {
                throw new HttpsError('resource-exhausted', 'Daily AI limit reached. Try again tomorrow!');
            }
            tx.set(
                usageRef,
                { count: count + 1, uid, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
                { merge: true }
            );
        });

        // 4. Forward to Gemini using the shared server-side key
        const cfg = sanitizeConfig(request.data && request.data.generationConfig);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY.value()}`;
        const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: cfg };

        let res;
        try {
            res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (e) {
            throw new HttpsError('unavailable', 'Could not reach the AI service. Try again.');
        }

        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            if (res.status === 429) {
                throw new HttpsError('resource-exhausted', 'AI is busy right now. Try again in a bit.');
            }
            throw new HttpsError('internal', `AI error ${res.status}: ${errText.slice(0, 150)}`);
        }

        const data = await res.json();
        const text = data && data.candidates && data.candidates[0]
            && data.candidates[0].content && data.candidates[0].content.parts
            && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
        if (!text) {
            throw new HttpsError('internal', 'Empty response from AI.');
        }

        return { text };
    }
);
