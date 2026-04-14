/* ============================================================
   AI-Powered Question Generator — Gemini Integration
   Never see the same question twice! Always challenging!
   ============================================================ */

const AIQuestionEngine = (function () {
  'use strict';

  // ─── Config ────────────────────────────────────────────────
  // Models to try in order — auto-fallback if one fails
  const GEMINI_MODELS = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-8b',
  ];
  const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';

  const STORAGE_KEY = 'levelupkids_ai_config';
  const SEEN_KEY = 'levelupkids_seen_questions';

  // ─── State ─────────────────────────────────────────────────
  let apiKey = '';
  let enabled = false;
  let workingModel = ''; // remember which model worked last

  function init() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    apiKey = saved.apiKey || '';
    enabled = saved.enabled || false;
    workingModel = saved.workingModel || '';
  }

  function isEnabled() { return enabled && apiKey.length > 10; }

  function setApiKey(key) {
    apiKey = (key || '').trim();
    enabled = apiKey.length > 10;
    workingModel = ''; // reset model on new key
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey, enabled, workingModel }));
  }

  function getApiKey() { return apiKey; }

  function disable() {
    enabled = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey, enabled, workingModel }));
  }

  function saveWorkingModel(model) {
    workingModel = model;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    saved.workingModel = model;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }

  function getWorkingModel() { return workingModel; }

  // ─── Seen Questions Tracker ────────────────────────────────
  // Store a hash of each question text so we never show duplicates
  function hashQuestion(text) {
    let hash = 0;
    const str = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  function getSeenHashes(playerName) {
    const all = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
    return new Set(all[playerName] || []);
  }

  function markSeen(playerName, questions) {
    const all = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
    const existing = all[playerName] || [];
    const hashes = questions.map(q => hashQuestion(q.q));
    const merged = [...new Set([...existing, ...hashes])];
    // Keep last 5000 hashes to avoid localStorage bloat
    all[playerName] = merged.slice(-5000);
    localStorage.setItem(SEEN_KEY, JSON.stringify(all));
  }

  function isNewQuestion(playerName, questionText) {
    const seen = getSeenHashes(playerName);
    return !seen.has(hashQuestion(questionText));
  }

  // ─── Category Prompts ──────────────────────────────────────
  function getCategoryPrompt(category, grade) {
    const prompts = {
      arithmetic: `Number operations including multi-step calculations, order of operations, exponents, roots, negative numbers, and mental math tricks. Make them tricky — not straightforward single-step problems.`,
      logic: `Logic puzzles, number patterns, sequence analysis, digit manipulation, divisibility tricks, prime number challenges, factor problems, and lateral thinking math puzzles.`,
      geometry: `Geometry problems involving area, perimeter, volume, angles, coordinate geometry, transformations, and spatial reasoning. Include diagrams described in text when helpful.`,
      olympiad: `Competition-style problems similar to AMC 8, Math Kangaroo, MATHCOUNTS, and Math Olympiad. These should require creative problem-solving, not just computation.`,
      aime: `AIME-difficulty problems in number theory, algebra, combinatorics, and geometry. These should be genuinely challenging — requiring multiple steps and clever insights.`,
      word: `Real-world word problems involving money, time, rates, ratios, proportions, percentages, and data interpretation. Make the scenarios interesting and the math non-trivial.`,
      mixed: `A fun mix of arithmetic, logic, geometry, and word problems. Vary the difficulty and topic to keep it unpredictable.`,
      fb_estimation: `Estimation and rounding problems: rounding to nearest 10/100/1000, estimating sums/differences/products, benchmark fractions and percents, and reasonable estimate selection.`,
      fb_data: `Data analysis: reading bar graphs, line plots, tables; finding mean, median, mode, range; interpreting data displays; and making predictions from data.`,
      fb_measurement: `Measurement problems: unit conversions (metric and customary), elapsed time, perimeter, area, volume, temperature, and scale drawings.`,
      fb_number_sense: `Number sense: place value, number patterns, mental math strategies, comparing/ordering numbers, number properties, and algebraic thinking.`,
      fb_probability: `Probability and counting: likelihood of events, experimental vs theoretical probability, combinations, permutations, and tree diagrams.`,
      fb_math_mixed: `A comprehensive mix of estimation, data analysis, measurement, number sense, and probability — similar to FastBridge aMath assessment format.`,
      english_vocabulary: `Vocabulary: word meanings in context, synonyms, antonyms, analogies, prefixes/suffixes/roots, and academic vocabulary.`,
      english_grammar: `Grammar: parts of speech, sentence structure, subject-verb agreement, punctuation, verb tenses, and sentence correction.`,
      english_reading: `Reading comprehension: provide a short passage (3-5 sentences) and ask about main idea, inference, author's purpose, vocabulary in context, or text structure.`,
      english_spelling: `Spelling: commonly misspelled words, homophones, spelling rules (i before e, doubling consonants, etc.), and identifying correctly/incorrectly spelled words.`,
      english_mixed: `A mix of vocabulary, grammar, reading comprehension, and spelling questions.`,
    };
    return prompts[category] || prompts.mixed;
  }

  function getDifficultyGuidance(grade) {
    if (grade <= 2) return `These are for young learners (age 6-7). Questions should be accessible but still require thinking — not just simple recall. Use fun scenarios.`;
    if (grade <= 4) return `These are for grades 3-4 (age 8-9). Include multi-step problems that require reasoning. Avoid trivially easy single-operation questions.`;
    if (grade <= 6) return `These are for grades 5-6 (age 10-11). Problems should be challenging — think competition math level. Include problems that require clever shortcuts or insights.`;
    return `These are for grades 7-8 (age 12-13). Make these genuinely hard — pre-algebra, competition level. Include problems that would appear on AMC 8 or Math Kangaroo.`;
  }

  // ─── Gemini API Call (with multi-model fallback & retry) ──
  async function callGemini(model, prompt, maxTokens) {
    const url = `${GEMINI_BASE}${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.0,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: maxTokens || 4096,
        }
      })
    });
    return response;
  }

  // Sleep helper for retry backoff
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function generateWithGemini(grade, category, count) {
    if (!isEnabled()) return [];

    const categoryDesc = getCategoryPrompt(category, grade);
    const diffGuide = getDifficultyGuidance(grade);

    const prompt = `You are a math and English education expert creating quiz questions for a competitive learning app called "LevelUpKids". The app is designed to LEVEL UP kids' skills — questions should be challenging and thought-provoking, never boring or trivially easy.

GRADE: ${grade}
CATEGORY: ${category}
${diffGuide}

TOPIC FOCUS:
${categoryDesc}

Generate EXACTLY ${count} multiple-choice questions. Each question MUST be unique and creative — don't repeat common textbook problems.

CRITICAL RULES:
1. Each question must have EXACTLY 4 options (A, B, C, D)
2. Exactly ONE option must be correct
3. Wrong options should be plausible (common mistakes students make)
4. Include a helpful hint that guides without giving away the answer
5. Include a clear explanation of the solution
6. Assign difficulty: "easy", "medium", or "hard"
7. For Grade ${grade}, lean toward "medium" and "hard" — this is a LEVEL UP app!
8. Make questions that test UNDERSTANDING, not just memorization
9. For reading comprehension, include a short passage IN the question

Return ONLY a valid JSON array with this exact structure (no markdown, no code fences):
[
  {
    "q": "question text here",
    "options": ["option A", "option B", "option C", "option D"],
    "answer": 0,
    "hint": "helpful hint here",
    "explanation": "step-by-step explanation",
    "difficulty": "medium"
  }
]

The "answer" field is the 0-based index of the correct option.
Do NOT wrap in markdown code blocks. Return ONLY the JSON array.`;

    // Build model list: try last working model first, then the rest
    const modelsToTry = workingModel
      ? [workingModel, ...GEMINI_MODELS.filter(m => m !== workingModel)]
      : [...GEMINI_MODELS];

    for (const model of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          console.log(`🤖 Trying ${model} (attempt ${attempt + 1})...`);
          const response = await callGemini(model, prompt, 4096);

          if (response.status === 429) {
            console.warn(`⏳ Rate limited on ${model}, waiting ${(attempt + 1) * 3}s...`);
            await sleep((attempt + 1) * 3000);
            continue; // retry same model
          }

          if (response.status === 404 || response.status === 400) {
            console.warn(`❌ Model ${model} not available (${response.status}), trying next...`);
            break; // try next model
          }

          if (!response.ok) {
            const errText = await response.text();
            console.warn(`Gemini API error on ${model}:`, response.status, errText.slice(0, 200));
            break; // try next model
          }

          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

          // Parse JSON — handle potential markdown code fences
          let jsonStr = text.trim();
          if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
          }

          const parsed = JSON.parse(jsonStr);
          if (!Array.isArray(parsed)) continue;

          // Validate and tag each question
          const valid = parsed.filter(q =>
            q && q.q && Array.isArray(q.options) && q.options.length === 4 &&
            typeof q.answer === 'number' && q.answer >= 0 && q.answer < 4
          ).map(q => ({
            ...q,
            source: '🤖 AI Generated',
            difficulty: q.difficulty || 'medium'
          }));

          if (valid.length > 0) {
            // Remember which model worked
            if (model !== workingModel) saveWorkingModel(model);
            console.log(`🤖 AI generated ${valid.length}/${count} questions via ${model} for ${category} (Grade ${grade})`);
            return valid;
          }
        } catch (e) {
          console.warn(`Error with ${model}:`, e.message);
          if (attempt === 0) continue; // retry once
        }
      }
    }

    console.warn('🤖 All models exhausted, returning empty');
    return [];
  }

  // ─── Main Entry: Get AI Questions (with dedup) ─────────────
  async function getQuestions(grade, category, count, playerName) {
    if (!isEnabled()) return [];

    const aiQuestions = await generateWithGemini(grade, category, count + 3); // Request extra for dedup buffer

    if (!aiQuestions.length) return [];

    // Filter out questions this player has seen before
    const fresh = playerName
      ? aiQuestions.filter(q => isNewQuestion(playerName, q.q))
      : aiQuestions;

    // Take only what we need
    const result = fresh.slice(0, count);

    // Mark these as seen
    if (playerName && result.length > 0) {
      markSeen(playerName, result);
    }

    return result;
  }

  // ─── Settings UI Helper ────────────────────────────────────
  function getSettingsHTML() {
    const key = getApiKey();
    const on = isEnabled();
    const model = getWorkingModel();
    return `
      <div class="ai-settings-card">
        <div class="ai-settings-header">
          <span class="ai-icon">🤖</span>
          <div>
            <h4>AI-Powered Questions</h4>
            <p class="ai-settings-desc">Unlimited unique questions powered by Google Gemini AI. Never see the same question twice!</p>
          </div>
          <span class="ai-status ${on ? 'ai-on' : 'ai-off'}">${on ? '✅ Active' : '⚫ Off'}</span>
        </div>
        <div class="ai-settings-body">
          <div class="ai-key-group">
            <label for="ai-api-key">Gemini API Key <span class="ai-free-badge">FREE</span></label>
            <div class="ai-key-row">
              <input type="password" id="ai-api-key" value="${key}" placeholder="Paste your Gemini API key..." autocomplete="off">
              <button id="btn-toggle-ai-key" class="btn-ai-toggle" title="Show/Hide">👁️</button>
            </div>
            <p class="ai-key-help">
              Get your free key: <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>
              — Free tier: 15 requests/min, 1M tokens/day
            </p>
            ${model ? `<p class="ai-key-help" style="margin-top:4px;">🧠 Active model: <strong>${model}</strong></p>` : ''}
          </div>
          <div class="ai-actions">
            <button id="btn-save-ai-key" class="btn-primary btn-ai-save">💾 Save & Enable</button>
            <button id="btn-test-ai" class="btn-secondary btn-ai-test">🧪 Test Connection</button>
            ${on ? '<button id="btn-disable-ai" class="btn-secondary btn-ai-disable">⏸️ Disable</button>' : ''}
          </div>
          <div id="ai-test-result" class="ai-test-result" style="display:none;"></div>
        </div>
      </div>
    `;
  }

  function bindSettingsEvents() {
    const keyInput = document.getElementById('ai-api-key');
    const toggleBtn = document.getElementById('btn-toggle-ai-key');
    const saveBtn = document.getElementById('btn-save-ai-key');
    const testBtn = document.getElementById('btn-test-ai');
    const disableBtn = document.getElementById('btn-disable-ai');
    const resultEl = document.getElementById('ai-test-result');

    if (toggleBtn && keyInput) {
      toggleBtn.onclick = () => {
        keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
        toggleBtn.textContent = keyInput.type === 'password' ? '👁️' : '🙈';
      };
    }

    if (saveBtn && keyInput) {
      saveBtn.onclick = () => {
        setApiKey(keyInput.value);
        if (resultEl) {
          resultEl.style.display = 'block';
          resultEl.className = 'ai-test-result ai-success';
          resultEl.textContent = '✅ API key saved! AI questions are now enabled.';
        }
        // Refresh the status badge
        const statusEl = document.querySelector('.ai-status');
        if (statusEl) {
          statusEl.className = 'ai-status ai-on';
          statusEl.textContent = '✅ Active';
        }
      };
    }

    if (testBtn) {
      testBtn.onclick = async () => {
        if (!keyInput || !keyInput.value.trim()) {
          if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'ai-test-result ai-error';
            resultEl.textContent = '❌ Please enter an API key first.';
          }
          return;
        }

        testBtn.disabled = true;
        testBtn.textContent = '⏳ Testing...';

        const tempKey = keyInput.value.trim();
        const testPrompt = 'Generate 1 fun math question for a 4th grader. Return only JSON: {"q":"question","options":["A","B","C","D"],"answer":0}';
        let found = false;

        for (const model of GEMINI_MODELS) {
          try {
            testBtn.textContent = `⏳ Trying ${model.split('-').slice(1).join('-')}...`;
            const url = `${GEMINI_BASE}${model}:generateContent?key=${tempKey}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: testPrompt }] }],
                generationConfig: { temperature: 0.8, maxOutputTokens: 256 }
              })
            });

            if (res.status === 429) {
              // Rate limited — wait 3s and retry once
              if (resultEl) {
                resultEl.style.display = 'block';
                resultEl.className = 'ai-test-result ai-info';
                resultEl.textContent = `⏳ Rate limited on ${model}, waiting 3s to retry...`;
              }
              await sleep(3000);
              const retry = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: testPrompt }] }],
                  generationConfig: { temperature: 0.8, maxOutputTokens: 256 }
                })
              });
              if (retry.ok) {
                const data = await retry.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                saveWorkingModel(model);
                found = true;
                if (resultEl) {
                  resultEl.style.display = 'block';
                  resultEl.className = 'ai-test-result ai-success';
                  resultEl.innerHTML = `✅ Connected! Model: <strong>${model}</strong><br><small>Sample: ${text.slice(0, 120)}...</small>`;
                }
                break;
              }
              continue; // try next model
            }

            if (res.status === 404 || res.status === 400) {
              continue; // model not available, try next
            }

            if (res.ok) {
              const data = await res.json();
              const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
              saveWorkingModel(model);
              found = true;
              if (resultEl) {
                resultEl.style.display = 'block';
                resultEl.className = 'ai-test-result ai-success';
                resultEl.innerHTML = `✅ Connected! Model: <strong>${model}</strong><br><small>Sample: ${text.slice(0, 120)}...</small>`;
              }
              break;
            }
          } catch (e) {
            continue; // try next model
          }
        }

        if (!found) {
          if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.className = 'ai-test-result ai-error';
            resultEl.innerHTML = '❌ Could not connect to any Gemini model.<br><small>This may be a temporary rate limit — wait 1 minute and try again. Make sure billing is enabled on your Google Cloud project, or try a fresh API key from <a href="https://aistudio.google.com/apikey" target="_blank">AI Studio</a>.</small>';
          }
        }

        testBtn.disabled = false;
        testBtn.textContent = '🧪 Test Connection';
      };
    }

    if (disableBtn) {
      disableBtn.onclick = () => {
        disable();
        if (resultEl) {
          resultEl.style.display = 'block';
          resultEl.className = 'ai-test-result ai-info';
          resultEl.textContent = '⏸️ AI questions disabled. Using local question bank.';
        }
        const statusEl = document.querySelector('.ai-status');
        if (statusEl) {
          statusEl.className = 'ai-status ai-off';
          statusEl.textContent = '⚫ Off';
        }
      };
    }
  }

  // ─── Init on load ──────────────────────────────────────────
  init();

  return {
    isEnabled,
    setApiKey,
    getApiKey,
    getWorkingModel,
    disable,
    getQuestions,
    markSeen,
    getSettingsHTML,
    bindSettingsEvents,
    hashQuestion,
    isNewQuestion
  };

})();
