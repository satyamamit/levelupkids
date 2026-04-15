/* ============================================================
   Gemini AI Question Generator — Background Generation Engine
   Generates unique questions via Google Gemini API
   Tags all questions as AI-generated for admin tracking
   ============================================================ */

const GeminiQuestionEngine = (function () {
    'use strict';

    // ─── Configuration (Optimized for Gemini Free Tier) ────
    // Using gemini-2.5-flash-lite: free input+output, lowest cost, great for MCQs
    const GEMINI_MODEL = 'gemini-2.5-flash-lite';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    const STORAGE_KEY = 'mathchamp_ai_questions';
    const SERVED_KEY = 'mathchamp_ai_served';
    const SETTINGS_KEY = 'mathchamp_ai_settings';
    const STATS_KEY = 'mathchamp_ai_stats';
    const RATE_KEY = 'mathchamp_ai_ratelimit';
    const BATCH_SIZE = 10;          // 10 questions per API call (fits comfortably in free-tier tokens)
    const MIN_POOL_SIZE = 20;       // Start background gen if pool falls below this
    const BG_INTERVAL_MS = 120000;  // Check pool every 2 minutes
    const MAX_CACHED = 1000;        // Max questions in local cache per grade+category
    const MAX_REQUESTS_PER_DAY = 300; // Free tier allows 1500 RPD, we use 300 conservatively
    const MIN_REQUEST_GAP_MS = 3000; // Min 3s between API calls (free tier allows 30 RPM)

    // ─── State ──────────────────────────────────────────────
    let _apiKey = '';
    let _isGenerating = false;
    let _rateLimitedUntil = 0;
    let _bgTimer = null;
    let _lastRequestTime = 0;
    let _stats = {
        totalGenerated: 0,
        totalServed: 0,
        totalErrors: 0,
        lastGeneratedAt: null,
        generationLog: []
    };

    // ─── Initialize ─────────────────────────────────────────
    function init() {
        _loadSettings();
        _loadStats();
        console.log('🤖 GeminiQuestionEngine initialized', _apiKey ? '(API key set)' : '(no API key)');
    }

    // ─── Settings Management ────────────────────────────────
    function _loadSettings() {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            if (saved) {
                const s = JSON.parse(saved);
                _apiKey = s.apiKey || '';
            }
        } catch (e) { console.warn('Failed to load AI settings:', e); }
    }

    function _saveSettings() {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify({ apiKey: _apiKey }));
        } catch (e) { console.warn('Failed to save AI settings:', e); }
    }

    function setApiKey(key) {
        _apiKey = (key || '').trim();
        _saveSettings();
        console.log('🔑 Gemini API key', _apiKey ? 'set' : 'cleared');
    }

    function getApiKey() {
        return _apiKey;
    }

    function hasApiKey() {
        return _apiKey && _apiKey.length > 10;
    }

    // ─── Stats Management ───────────────────────────────────
    function _loadStats() {
        try {
            const saved = localStorage.getItem(STATS_KEY);
            if (saved) _stats = { ..._stats, ...JSON.parse(saved) };
        } catch (e) { /* ignore */ }
    }

    function _saveStats() {
        try {
            localStorage.setItem(STATS_KEY, JSON.stringify(_stats));
        } catch (e) { /* ignore */ }
    }

    function getStats() {
        const pool = _getAllCached();
        const served = _getServedIds();
        const rateInfo = getRateLimitInfo();
        const byGrade = {};
        const byCategory = {};
        pool.forEach(q => {
            const g = q._grade || 'unknown';
            const c = q._category || 'unknown';
            byGrade[g] = (byGrade[g] || 0) + 1;
            byCategory[c] = (byCategory[c] || 0) + 1;
        });
        return {
            totalCached: pool.length,
            totalGenerated: _stats.totalGenerated,
            totalServed: _stats.totalServed,
            totalErrors: _stats.totalErrors,
            isGenerating: _isGenerating,
            lastGeneratedAt: _stats.lastGeneratedAt,
            byGrade,
            byCategory,
            recentLog: (_stats.generationLog || []).slice(-20),
            servedCount: served.size,
            hasApiKey: hasApiKey(),
            model: GEMINI_MODEL,
            rateLimit: rateInfo
        };
    }

    // ─── Local Cache (localStorage) ─────────────────────────
    function _getCacheKey(grade, category) {
        return `${STORAGE_KEY}_g${grade}_${category}`;
    }

    function _getCached(grade, category) {
        try {
            const key = _getCacheKey(grade, category);
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    }

    function _setCached(grade, category, questions) {
        try {
            const key = _getCacheKey(grade, category);
            // Limit cache size
            const trimmed = questions.slice(-MAX_CACHED);
            localStorage.setItem(key, JSON.stringify(trimmed));
        } catch (e) { console.warn('Cache save error:', e); }
    }

    function _addToCached(grade, category, newQuestions) {
        const existing = _getCached(grade, category);
        const combined = [...existing, ...newQuestions];
        _setCached(grade, category, combined);
        return combined.length;
    }

    function _getAllCached() {
        const all = [];
        const categories = ['arithmetic', 'logic', 'geometry', 'olympiad', 'word', 'mixed', 'aime',
            'fastbridge', 'highcap', 'cogat', 'moems', 'noetic', 'imc',
            'kangaroo', 'mathcounts', 'singapore', 'math_challenge', 'math_is_cool',
            'vocabulary', 'grammar', 'reading', 'spelling',
            'fb_reading', 'spelling_bee'];
        for (let grade = 1; grade <= 8; grade++) {
            for (const cat of categories) {
                const cached = _getCached(grade, cat);
                all.push(...cached);
            }
        }
        return all;
    }

    // ─── Served Questions Tracking (prevent repeats) ────────
    function _getServedIds() {
        try {
            const saved = localStorage.getItem(SERVED_KEY);
            return new Set(saved ? JSON.parse(saved) : []);
        } catch (e) { return new Set(); }
    }

    function _markServed(questionIds) {
        try {
            const served = _getServedIds();
            questionIds.forEach(id => served.add(id));
            // Keep last 2000 to prevent unbounded growth
            const arr = [...served];
            const trimmed = arr.slice(-2000);
            localStorage.setItem(SERVED_KEY, JSON.stringify(trimmed));
        } catch (e) { /* ignore */ }
    }

    function _generateQuestionId(q) {
        // Create a deterministic ID from question text
        const str = (q.q || '') + (q.options || []).join('') + (q.answer || '');
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return 'ai_' + Math.abs(hash).toString(36);
    }

    // ─── Rate Limit Tracking ────────────────────────────────
    function _getRateState() {
        try {
            const saved = localStorage.getItem(RATE_KEY);
            if (saved) {
                const s = JSON.parse(saved);
                // Reset if it's a new day
                const today = new Date().toDateString();
                if (s.date !== today) return { date: today, count: 0 };
                return s;
            }
        } catch (e) { /* ignore */ }
        return { date: new Date().toDateString(), count: 0 };
    }

    function _incrementRateCount() {
        const state = _getRateState();
        state.count++;
        try { localStorage.setItem(RATE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    }

    function _canMakeRequest() {
        const state = _getRateState();
        if (state.count >= MAX_REQUESTS_PER_DAY) {
            console.warn(`🛑 Daily API limit reached (${state.count}/${MAX_REQUESTS_PER_DAY}). Resets at midnight PT.`);
            return false;
        }
        return true;
    }

    function getRateLimitInfo() {
        const state = _getRateState();
        return { today: state.count, limit: MAX_REQUESTS_PER_DAY, remaining: Math.max(0, MAX_REQUESTS_PER_DAY - state.count) };
    }

    async function _waitForRateLimit() {
        const elapsed = Date.now() - _lastRequestTime;
        if (elapsed < MIN_REQUEST_GAP_MS) {
            const waitMs = MIN_REQUEST_GAP_MS - elapsed;
            console.log(`⏳ Rate limit: waiting ${waitMs}ms before next request...`);
            await new Promise(r => setTimeout(r, waitMs));
        }
    }

    // ─── Gemini API Call (Free Tier Optimized) ──────────────
    async function _callGemini(prompt, retries = 2) {
        if (!hasApiKey()) throw new Error('No Gemini API key configured');
        if (!_canMakeRequest()) throw new Error('Daily free-tier request limit reached. Try again tomorrow!');

        // Check if we're in a 429 cooldown period
        if (Date.now() < _rateLimitedUntil) {
            const waitMin = Math.round((_rateLimitedUntil - Date.now()) / 60000);
            throw new Error(`Rate limited — cooling down (${waitMin}min left). Try again later.`);
        }

        await _waitForRateLimit();

        const url = `${GEMINI_API_URL}?key=${_apiKey}`;
        const body = {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 0.9,
                topP: 0.95,
                maxOutputTokens: 2048,       // Lower token budget for free tier
                responseMimeType: "application/json",
                thinkingConfig: { thinkingBudget: 0 }  // Disable thinking to save tokens
            }
        };

        _lastRequestTime = Date.now();
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        // Handle rate limiting (429) — set 10-minute cooldown, don't retry
        if (res.status === 429) {
            _rateLimitedUntil = Date.now() + 600000; // 10 minute cooldown
            const errText = await res.text();
            console.warn(`🛑 Rate limited (429). Pausing ALL API requests for 10 minutes.`);
            throw new Error(`Gemini API error 429 — paused for 10min. ${errText.slice(0, 100)}`);
        }

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 200)}`);
        }

        _incrementRateCount();

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from Gemini');

        return text;
    }

    // ─── Build Prompts ──────────────────────────────────────
    function _getGradeLevel(grade) {
        if (grade <= 2) return 'early elementary (K-2)';
        if (grade <= 5) return 'upper elementary (3-5)';
        return 'middle school (6-8)';
    }

    function _getGradeTopics(grade) {
        if (grade <= 2) return 'single/double digit operations, skip counting, basic shapes, simple patterns, coin values, telling time, basic fractions (halves/quarters)';
        if (grade <= 3) return 'multiplication/division facts, place value to thousands, basic fractions, simple geometry, bar graphs, elapsed time';
        if (grade <= 5) return 'multi-digit operations, fractions/decimals/percents, area/perimeter, coordinate grids, order of operations, ratios, data analysis';
        if (grade <= 6) return 'ratios/proportions, integers, expressions/equations, area/volume, statistical measures, coordinate plane';
        return 'pre-algebra, linear equations, proportional relationships, geometry proofs, probability, square roots, exponents, functions';
    }

    function _buildMathPrompt(grade, category, count) {
        const level = _getGradeLevel(grade);
        const topics = _getGradeTopics(grade);
        const isElem = grade <= 5;

        const catDesc = {
            arithmetic: `arithmetic appropriate for Grade ${grade} (${topics})`,
            logic: `logic puzzles, patterns & reasoning for ${level} level`,
            geometry: isElem
                ? `geometry: shapes, symmetry, perimeter, area, angles — ${level} level`
                : `geometry: area, volume, coordinate geometry, transformations, angles — ${level} level`,
            word: `word problems with real-life scenarios appropriate for ${level} — using ${topics}`,
            mixed: `mixed math topics for Grade ${grade} covering: ${topics}`,
            // Competition — grade-aware
            olympiad: isElem
                ? `AMC 8/Math Kangaroo style for elementary: creative puzzles, pattern recognition, counting, logical thinking — NOT algebra`
                : `AMC 8/Mathcounts style for middle school: multi-step problems, number theory, combinatorics, algebraic thinking`,
            moems: isElem
                ? `MOEMS Division E (elementary): creative problem-solving, pattern puzzles, counting strategies, number relationships, logical reasoning — no algebra required`
                : `MOEMS Division M (middle school): number theory, combinatorics, algebraic thinking, geometry reasoning, multi-step logic`,
            noetic: isElem
                ? `Noetic Math (elementary): non-routine reasoning, work backwards, drawing diagrams, finding patterns, creative counting — age-appropriate for Grade ${grade}`
                : `Noetic Math (middle school): advanced reasoning, algebraic patterns, optimization problems, multi-step logic`,
            imc: isElem
                ? `International Mathematics Competition (IMC) for elementary Grade ${grade}: logic puzzles, number patterns, creative problem-solving, counting strategies — problems should be challenging but NOT require algebra`
                : `International Mathematics Competition (IMC) for middle school Grade ${grade}: number theory, combinatorics, geometry, algebraic manipulation — multi-step competition problems`,
            aime: `AIME-level competition math: number theory, algebra, combinatorics, geometry — challenging multi-step problems`,
            // Test Prep
            fastbridge: isElem
                ? `FastBridge aMath (elementary): estimation, rounding, number sense, reading simple graphs, basic measurement, mental math — Grade ${grade} standards`
                : `FastBridge aMath (middle school): data interpretation, statistical reasoning, proportional thinking, measurement conversions — Grade ${grade} standards`,
            highcap: isElem
                ? `Highly Capable Program (HCP) gifted screening (elementary): abstract reasoning, quantitative comparisons, pattern matrices, spatial reasoning — no advanced math needed`
                : `Highly Capable Program (HCP) gifted screening (middle school): abstract reasoning, quantitative comparisons, algebraic pattern recognition, advanced logic`,
            cogat: isElem
                ? `CogAT (Cognitive Abilities Test) Quantitative Battery for elementary Grade ${grade}: number analogies (e.g., 2→4, 3→9, 4→?), number series (find the next number), number puzzles (e.g., ? + 3 = 7), quantitative comparisons — focus on patterns and relationships, NOT advanced math`
                : `CogAT (Cognitive Abilities Test) for middle school Grade ${grade}: number analogies, number series, figure matrices, quantitative comparisons, verbal analogies expressed as math/logic — multi-step reasoning with pattern recognition`,
            // Additional competitions
            kangaroo: isElem
                ? `Math Kangaroo (elementary): fun visual puzzles, creative logic, spatial thinking, pattern recognition — problems should be engaging and visual, described in text`
                : `Math Kangaroo (middle school): multi-step puzzles, clever counting, spatial reasoning, tricky logic — problems should have elegant "aha moment" solutions`,
            mathcounts: `Mathcounts Sprint/Target round style for Grade ${grade}: algebra, probability, geometry, number theory — problems solvable in 1-3 minutes`,
            math_challenge: isElem
                ? `Math Challenge / Continental Math League (CML) for elementary Grade ${grade}: speed math, mental calculation, multi-step problem-solving, number puzzles — problems should be solvable in 2-3 minutes`
                : `RSM Math Challenge / CML for middle school Grade ${grade}: algebraic thinking, geometry, number theory, multi-step problem-solving — competition-level difficulty`,
            math_is_cool: isElem
                ? `Math is Cool competition for elementary Grade ${grade}: individual round style — mental math, estimation, number sense, logic, place value — quick-fire problems solvable in 1-2 minutes`
                : `Math is Cool competition for middle school Grade ${grade}: individual and team rounds — algebra, geometry, probability, number theory, estimation — fast-paced problems`,
            singapore: isElem
                ? `Singapore Math (elementary): bar model word problems, mental math strategies, multi-step word problems, number bonds — Grade ${grade} level`
                : `Singapore Math (middle school): heuristic problem-solving, model drawing, ratio/proportion word problems, challenging multi-step scenarios`,
        }[category] || `mixed math for Grade ${grade}`;

        let extra = '';
        if (['olympiad', 'aime', 'moems', 'noetic', 'imc', 'kangaroo', 'mathcounts', 'math_challenge', 'math_is_cool'].includes(category)) {
            extra = ' Problems should require 2-3 steps of reasoning, not just direct computation. Include tricky distractors.';
        } else if (category === 'singapore') {
            extra = ' Problems should be word-problem heavy with real-world context. Describe bar models in text if applicable.';
        } else if (category === 'fastbridge') {
            extra = ' Focus on quick estimation, number sense, and data literacy. Describe any charts/graphs in text.';
        } else if (category === 'highcap') {
            extra = ' Focus on abstract patterns, analogies, and gifted-level quantitative thinking. No advanced math notation.';
        } else if (category === 'cogat') {
            extra = ' Focus on CogAT-style number analogies (A→B, C→D, E→?), number series (find next/missing), and number puzzles. Use → arrow notation for analogies. Problems should test pattern recognition, NOT computation skills.';
        }

        return `Generate ${count} unique Grade ${grade} (${level}) math MCQs: ${catDesc}.${extra}
Rules: 4 options each, "answer" = index 0-3 of correct, age-appropriate difficulty for Grade ${grade}.
JSON array: [{"q":"...","options":["A","B","C","D"],"answer":0,"hint":"...","explanation":"...","difficulty":"easy|medium|hard"}]
Return ONLY valid JSON.`;
    }

    function _buildEnglishPrompt(grade, category, count) {
        const level = _getGradeLevel(grade);
        const isElem = grade <= 5;

        const catDesc = {
            vocabulary: isElem
                ? `vocabulary for ${level}: basic synonyms, antonyms, simple context clues, word meanings — age-appropriate words for Grade ${grade}`
                : `vocabulary for ${level}: context clues, word roots/prefixes/suffixes, analogies, connotation vs denotation — Grade ${grade} level`,
            grammar: isElem
                ? `grammar for ${level}: parts of speech, sentence types, subject-verb agreement, punctuation, capitalization — Grade ${grade} standards`
                : `grammar for ${level}: complex sentences, clauses, verb tenses, pronoun-antecedent agreement, comma rules, semicolons — Grade ${grade} standards`,
            reading: isElem
                ? `reading comprehension for ${level}: include a 2-3 sentence passage, then ask about main idea, details, or inference — use simple language for Grade ${grade}`
                : `reading comprehension for ${level}: include a 3-4 sentence passage, ask about main idea, inference, author's purpose, text structure — Grade ${grade} complexity`,
            spelling: isElem
                ? `spelling for ${level}: commonly misspelled words appropriate for Grade ${grade}, identify correct/incorrect spellings`
                : `spelling for ${level}: challenging words, homophones, commonly confused words — Grade ${grade} level`,
            // Exam-level English
            fb_reading: isElem
                ? `FastBridge aReading test prep for ${level}: MIX of vocabulary (synonyms/antonyms), grammar (parts of speech, punctuation), reading comprehension (2-3 sentence passage + question), and spelling — each question should be from a different area. Grade ${grade} standards.`
                : `FastBridge aReading test prep for ${level}: MIX of vocabulary (context clues, roots), grammar (clauses, verb tenses), reading comprehension (3-4 sentence passage + inference question), and spelling (homophones, tricky words) — each question from a different area. Grade ${grade} standards.`,
            spelling_bee: isElem
                ? `Scripps Spelling Bee style for ${level}: "Which word is spelled correctly?" with tricky misspellings. Include etymology hints. Words appropriate for Grade ${grade} regional bee level.`
                : `Scripps Spelling Bee style for ${level}: challenging words with Latin/Greek roots, silent letters, unusual spellings. Include word origin and definition in the hint. Grade ${grade} bee level.`,
        }[category] || `mixed English language arts for Grade ${grade}`;

        return `Generate ${count} unique Grade ${grade} (${level}) English MCQs: ${catDesc}.
Rules: 4 options each, "answer" = index 0-3 of correct, age-appropriate for Grade ${grade}.
JSON array: [{"q":"...","options":["A","B","C","D"],"answer":0,"hint":"...","explanation":"...","difficulty":"easy|medium|hard"}]
Return ONLY valid JSON.`;
    }

    // ─── Parse & Validate Gemini Response ───────────────────
    function _parseResponse(text, grade, category) {
        let questions = [];
        try {
            // Try parsing directly as JSON
            questions = JSON.parse(text);
        } catch (e) {
            // Try extracting JSON array from text
            const match = text.match(/\[[\s\S]*\]/);
            if (match) {
                try { questions = JSON.parse(match[0]); } catch (e2) { /* failed */ }
            }
        }

        if (!Array.isArray(questions)) return [];

        const isEnglish = ['vocabulary', 'grammar', 'reading', 'spelling', 'fb_reading', 'spelling_bee'].includes(category);

        // Validate and tag each question
        return questions
            .filter(q =>
                q && q.q && Array.isArray(q.options) && q.options.length === 4 &&
                typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3
            )
            .map(q => {
                const id = _generateQuestionId(q);
                return {
                    ...q,
                    source: '🤖 AI Generated',
                    _aiGenerated: true,
                    _aiTag: 'gemini',
                    _grade: grade,
                    _category: category,
                    _id: id,
                    _generatedAt: new Date().toISOString(),
                    difficulty: q.difficulty || 'medium',
                    hint: q.hint || 'Think carefully about this problem.',
                    explanation: q.explanation || 'The correct answer is ' + (q.options[q.answer] || ''),
                };
            });
    }

    // ─── Generate Questions ─────────────────────────────────
    async function generateQuestions(grade, category, count = BATCH_SIZE) {
        if (_isGenerating) {
            console.log('⏳ Already generating, skipping...');
            return [];
        }

        if (!hasApiKey()) {
            console.warn('🔑 No Gemini API key set — cannot generate AI questions');
            return [];
        }

        _isGenerating = true;
        const startTime = Date.now();

        try {
            const isEnglish = ['vocabulary', 'grammar', 'reading', 'spelling', 'fb_reading', 'spelling_bee'].includes(category);
            const prompt = isEnglish
                ? _buildEnglishPrompt(grade, category, count)
                : _buildMathPrompt(grade, category, count);

            console.log(`🤖 Generating ${count} AI questions: Grade ${grade}, ${category}...`);
            const responseText = await _callGemini(prompt);
            const questions = _parseResponse(responseText, grade, category);

            if (questions.length > 0) {
                // Add to local cache
                const totalCached = _addToCached(grade, category, questions);

                // Save to Firestore if available
                _saveToFirestore(grade, category, questions);

                // Update stats
                _stats.totalGenerated += questions.length;
                _stats.lastGeneratedAt = new Date().toISOString();
                _stats.generationLog.push({
                    time: new Date().toISOString(),
                    grade, category, count: questions.length,
                    durationMs: Date.now() - startTime
                });
                // Keep log manageable
                if (_stats.generationLog.length > 100) {
                    _stats.generationLog = _stats.generationLog.slice(-100);
                }
                _saveStats();

                console.log(`✅ Generated ${questions.length} AI questions (${totalCached} total cached for g${grade}/${category})`);
            } else {
                console.warn('⚠️ Gemini returned 0 valid questions');
                _stats.totalErrors++;
                _saveStats();
            }

            return questions;
        } catch (err) {
            console.error('❌ Gemini generation error:', err);
            _stats.totalErrors++;
            _stats.generationLog.push({
                time: new Date().toISOString(),
                grade, category, count: 0,
                error: err.message,
                durationMs: Date.now() - startTime
            });
            _saveStats();
            return [];
        } finally {
            _isGenerating = false;
        }
    }

    // ─── Firestore Sync ─────────────────────────────────────
    async function _saveToFirestore(grade, category, questions) {
        if (typeof firebaseDb === 'undefined' || !firebaseDb) return;
        try {
            const batch = firebaseDb.batch();
            questions.forEach(q => {
                const docId = q._id || _generateQuestionId(q);
                const ref = firebaseDb.collection('ai_questions').doc(docId);
                batch.set(ref, {
                    ...q,
                    grade: grade,
                    category: category,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            });
            await batch.commit();
            console.log(`☁️ Saved ${questions.length} AI questions to Firestore`);
        } catch (err) {
            console.warn('Firestore AI question save error:', err);
        }
    }

    async function loadFromFirestore(grade, category, limit = 50) {
        if (typeof firebaseDb === 'undefined' || !firebaseDb) return [];
        try {
            let query = firebaseDb.collection('ai_questions')
                .where('grade', '==', grade)
                .where('category', '==', category)
                .orderBy('createdAt', 'desc')
                .limit(limit);

            const snapshot = await query.get();
            const questions = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                questions.push({
                    ...data,
                    _id: doc.id,
                    _aiGenerated: true,
                    _aiTag: 'gemini',
                    source: '🤖 AI Generated'
                });
            });
            return questions;
        } catch (err) {
            console.warn('Firestore AI question load error:', err);
            return [];
        }
    }

    async function getFirestoreCount() {
        if (typeof firebaseDb === 'undefined' || !firebaseDb) return 0;
        try {
            const snapshot = await firebaseDb.collection('ai_questions').limit(1000).get();
            return snapshot.size;
        } catch (err) { return 0; }
    }

    // ─── Get Unique Questions for Student ───────────────────
    async function getUniqueQuestions(grade, category, count = 10) {
        const served = _getServedIds();
        let pool = _getCached(grade, category);

        // ALWAYS try Firestore first — all students can read, no API key needed
        try {
            const cloudQs = await loadFromFirestore(grade, category, 100);
            if (cloudQs.length > 0) {
                // Merge cloud questions into local pool, avoiding duplicates
                const existingIds = new Set(pool.map(q => q._id));
                const newFromCloud = cloudQs.filter(q => !existingIds.has(q._id));
                pool = [...pool, ...newFromCloud];
                // Update local cache so subsequent calls are faster
                _setCached(grade, category, pool);
            }
        } catch (e) {
            console.warn('Firestore read failed (non-critical):', e);
        }

        // Filter out already-served questions
        let available = pool.filter(q => !served.has(q._id));

        // If not enough unique questions AND admin has API key, generate more on-demand
        // Regular students without API key just get whatever is in Firestore
        if (available.length < count && hasApiKey()) {
            console.log(`🤖 Pool low (${available.length}/${count}), generating more AI questions...`);
            const newQs = await generateQuestions(grade, category, Math.max(BATCH_SIZE, count * 2));
            // Re-check the pool
            pool = _getCached(grade, category);
            available = pool.filter(q => !served.has(q._id));
        }

        // If STILL not enough, allow re-serving old questions
        if (available.length < count && pool.length > 0) {
            console.log(`⚠️ Only ${available.length} unique AI questions available, supplementing with previously served`);
            const needed = count - available.length;
            const reuse = pool.filter(q => served.has(q._id)).slice(0, needed);
            available = [...available, ...reuse];
        }

        // Shuffle and pick
        const shuffled = _shuffle(available);
        const selected = shuffled.slice(0, count);

        // Mark as served
        const ids = selected.map(q => q._id).filter(Boolean);
        _markServed(ids);
        _stats.totalServed += selected.length;
        _saveStats();

        return selected;
    }

    function _shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ─── Background Generation ──────────────────────────────
    function startBackgroundGeneration(currentGrade) {
        if (_bgTimer) return; // Already running
        if (!hasApiKey()) {
            console.log('🤖 Background gen skipped — no API key');
            return;
        }

        console.log('🤖 Starting background AI question generation (free tier mode)...');

        // Grade-aware categories: different exams for elementary vs middle school
        function getCategoriesForGrade(grade) {
            const isElem = grade <= 5;
            // School tests (all grades)
            const school = ['fastbridge', 'highcap', 'cogat'];
            // English exams
            const english = ['fb_reading', 'spelling_bee'];
            // Math competitions — elementary vs middle school
            const competitions = isElem
                ? ['olympiad', 'moems', 'noetic', 'kangaroo', 'imc', 'singapore', 'math_challenge', 'math_is_cool']
                : ['olympiad', 'moems', 'noetic', 'kangaroo', 'imc', 'singapore', 'math_challenge', 'math_is_cool', 'mathcounts', 'aime'];
            // Internal topic keys (still generate for fallback pool)
            const core = ['arithmetic', 'logic', 'geometry', 'word'];
            return [...school, ...competitions, ...core, ...english];
        }

        async function checkAndGenerate() {
            if (_isGenerating) return;
            if (!_canMakeRequest()) {
                console.log('🛑 Background gen paused — daily limit reached');
                return;
            }
            if (Date.now() < _rateLimitedUntil) {
                const waitMin = Math.round((_rateLimitedUntil - Date.now()) / 60000);
                console.log(`🛑 Background gen paused — 429 cooldown (${waitMin}min remaining)`);
                return;
            }

            // Generate for multiple grades around the current grade
            const grades = [...new Set([currentGrade, Math.max(1, currentGrade - 1), Math.min(8, currentGrade + 1)])];
            let batchesThisCycle = 0;
            const MAX_BATCHES_PER_CYCLE = 3; // Up to 3 batches per cycle

            for (const grade of grades) {
                if (batchesThisCycle >= MAX_BATCHES_PER_CYCLE) break;
                const categories = getCategoriesForGrade(grade);
                for (const cat of categories) {
                    if (batchesThisCycle >= MAX_BATCHES_PER_CYCLE) break;
                    if (!_canMakeRequest()) break;

                    const pool = _getCached(grade, cat);
                    const served = _getServedIds();
                    const unserved = pool.filter(q => !served.has(q._id));

                    if (unserved.length < MIN_POOL_SIZE) {
                        console.log(`🤖 Background: Pool low for g${grade}/${cat} (${unserved.length}), generating ${BATCH_SIZE}...`);
                        await generateQuestions(grade, cat, BATCH_SIZE);
                        batchesThisCycle++;
                        // Brief delay between batches
                        await new Promise(r => setTimeout(r, 4000));
                    }
                }
            }
            if (batchesThisCycle > 0) {
                console.log(`🤖 Background cycle done: ${batchesThisCycle} batches (~${batchesThisCycle * BATCH_SIZE} questions)`);
            }
        }

        // Initial check after 10s delay (gentler startup)
        setTimeout(checkAndGenerate, 10000);

        // Periodic checks
        _bgTimer = setInterval(checkAndGenerate, BG_INTERVAL_MS);
    }

    function stopBackgroundGeneration() {
        if (_bgTimer) {
            clearInterval(_bgTimer);
            _bgTimer = null;
            console.log('🤖 Background generation stopped');
        }
    }

    // ─── Admin Functions ────────────────────────────────────
    function purgeAllQuestions() {
        const categories = ['arithmetic', 'logic', 'geometry', 'olympiad', 'word', 'mixed', 'aime',
            'fastbridge', 'highcap', 'cogat', 'moems', 'noetic', 'imc',
            'kangaroo', 'mathcounts', 'singapore', 'math_challenge', 'math_is_cool',
            'vocabulary', 'grammar', 'reading', 'spelling',
            'fb_reading', 'spelling_bee'];
        for (let grade = 1; grade <= 8; grade++) {
            for (const cat of categories) {
                const key = _getCacheKey(grade, cat);
                localStorage.removeItem(key);
            }
        }
        localStorage.removeItem(SERVED_KEY);
        _stats = { totalGenerated: 0, totalServed: 0, totalErrors: 0, lastGeneratedAt: null, generationLog: [] };
        _saveStats();
        console.log('🗑️ All AI questions purged');
    }

    async function purgeFirestore() {
        if (typeof firebaseDb === 'undefined' || !firebaseDb) return;
        try {
            const snapshot = await firebaseDb.collection('ai_questions').limit(500).get();
            const batch = firebaseDb.batch();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            console.log(`🗑️ Purged ${snapshot.size} AI questions from Firestore`);
        } catch (err) {
            console.warn('Firestore purge error:', err);
        }
    }

    function getRecentQuestions(limit = 20) {
        const all = _getAllCached();
        // Sort by generation time, newest first
        all.sort((a, b) => (b._generatedAt || '').localeCompare(a._generatedAt || ''));
        return all.slice(0, limit);
    }

    function deleteQuestion(questionId) {
        const categories = ['arithmetic', 'logic', 'geometry', 'olympiad', 'word', 'mixed', 'aime',
            'fastbridge', 'highcap', 'cogat', 'moems', 'noetic', 'imc',
            'kangaroo', 'mathcounts', 'singapore', 'math_challenge', 'math_is_cool',
            'vocabulary', 'grammar', 'reading', 'spelling',
            'fb_reading', 'spelling_bee'];
        for (let grade = 1; grade <= 8; grade++) {
            for (const cat of categories) {
                const cached = _getCached(grade, cat);
                const filtered = cached.filter(q => q._id !== questionId);
                if (filtered.length !== cached.length) {
                    _setCached(grade, cat, filtered);
                    return true;
                }
            }
        }
        return false;
    }

    // ─── Initialize on load ─────────────────────────────────
    init();

    // ─── Public API ─────────────────────────────────────────
    return {
        setApiKey,
        getApiKey,
        hasApiKey,
        generateQuestions,
        getUniqueQuestions,
        getStats,
        getRecentQuestions,
        deleteQuestion,
        startBackgroundGeneration,
        stopBackgroundGeneration,
        purgeAllQuestions,
        purgeFirestore,
        loadFromFirestore,
        getFirestoreCount,
        getRateLimitInfo,
        isGenerating: () => _isGenerating,
        MODEL: GEMINI_MODEL,
    };
})();
