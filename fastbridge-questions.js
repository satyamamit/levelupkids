// =============================================
// LevelUpKids — FastBridge / HCP Prep Questions
// Measurement · Data · Estimation · Number Sense
// CogAT Number Analogies · Probability · Patterns
// =============================================

(function() {
  const FB_QUESTIONS = {

  // ====================== GRADE 1 ======================
  1: {
    arithmetic: [
      { q: "Estimate: Is 8 + 7 closer to 10 or 20?", options: ["10","15","20","25"], answer: 1, hint: "8 + 7 = ?", explanation: "8 + 7 = 15, closest to 15.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "What number added to 6 makes 10?", options: ["3","4","5","6"], answer: 1, hint: "Number bonds to 10.", explanation: "6 + 4 = 10.", difficulty: "easy", source: "HCP Prep" },
      { q: "2 → 4, 3 → 6, 5 → ?", options: ["7","8","10","15"], answer: 2, hint: "What's the rule?", explanation: "Rule: double it. 5 × 2 = 10.", difficulty: "medium", source: "CogAT Prep" },
      { q: "1 → 3, 2 → 5, 3 → 7, 4 → ?", options: ["8","9","10","11"], answer: 1, hint: "Each number: × 2 + 1.", explanation: "4 × 2 + 1 = 9.", difficulty: "medium", source: "CogAT Prep" },
    ],
    geometry: [
      { q: "About how many paperclips long is a pencil?", options: ["2","5","7","20"], answer: 2, hint: "A pencil is about 7 inches.", explanation: "About 7 paperclips.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Which is longer: your arm or your finger?", options: ["Arm","Finger","Same","Can't tell"], answer: 0, hint: "Compare body parts.", explanation: "Your arm is much longer.", difficulty: "easy", source: "FastBridge Prep" },
    ],
    word: [
      { q: "A class has 5 boys and 7 girls. The bar graph shows these. How many more girls than boys?", options: ["1","2","3","4"], answer: 1, hint: "7 − 5.", explanation: "7 − 5 = 2 more girls.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Tally marks: IIII II means what number?", options: ["5","6","7","8"], answer: 2, hint: "Count each mark.", explanation: "IIII = 5, II = 2. Total: 7.", difficulty: "easy", source: "FastBridge Prep" },
    ],
  },

  // ====================== GRADE 2 ======================
  2: {
    arithmetic: [
      { q: "Estimate: 29 + 42 ≈ ?", options: ["60","70","80","90"], answer: 1, hint: "Round: 30 + 40.", explanation: "30 + 40 = 70.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "What is the range of: 3, 8, 5, 2, 9?", options: ["5","6","7","8"], answer: 2, hint: "Highest − lowest.", explanation: "9 − 2 = 7.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "3 → 9, 4 → 16, 5 → ?", options: ["20","25","30","35"], answer: 1, hint: "Multiply the number by itself.", explanation: "5 × 5 = 25. Rule: square it.", difficulty: "hard", source: "CogAT Prep" },
      { q: "2 → 6, 5 → 15, 8 → ?", options: ["16","20","24","30"], answer: 2, hint: "What's the rule?", explanation: "Rule: × 3. 8 × 3 = 24.", difficulty: "medium", source: "CogAT Prep" },
    ],
    geometry: [
      { q: "How many inches are in 1 foot?", options: ["6","10","12","24"], answer: 2, hint: "A ruler is 1 foot long.", explanation: "1 foot = 12 inches.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "How many minutes are in 1 hour?", options: ["30","45","60","100"], answer: 2, hint: "Look at a clock.", explanation: "1 hour = 60 minutes.", difficulty: "easy", source: "FastBridge Prep" },
    ],
    word: [
      { q: "A pictograph shows: 🍎🍎🍎 for Monday, 🍎🍎🍎🍎🍎 for Tuesday. Each 🍎 = 2 apples. How many Tuesday?", options: ["5","8","10","15"], answer: 2, hint: "5 symbols × 2.", explanation: "5 × 2 = 10 apples.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Scores: 5, 8, 8, 3, 6. Which score appears the most?", options: ["3","5","6","8"], answer: 3, hint: "Which number repeats?", explanation: "8 appears twice. Mode = 8.", difficulty: "easy", source: "FastBridge Prep" },
    ],
  },

  // ====================== GRADE 3 ======================
  3: {
    arithmetic: [
      { q: "Estimate: 287 + 413 ≈ ?", options: ["600","700","800","900"], answer: 1, hint: "Round: 300 + 400.", explanation: "300 + 400 = 700.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Find the median of: 12, 5, 8, 15, 10", options: ["8","10","12","15"], answer: 1, hint: "Sort first, find the middle.", explanation: "Sorted: 5, 8, 10, 12, 15. Median = 10.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Find the mean of: 4, 6, 8, 10, 2", options: ["5","6","7","8"], answer: 1, hint: "Add all, divide by 5.", explanation: "(4+6+8+10+2) ÷ 5 = 30 ÷ 5 = 6.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "[5 : 15] = [8 : ?]", options: ["16","18","24","40"], answer: 2, hint: "5 × ? = 15. Apply same to 8.", explanation: "Rule: × 3. 8 × 3 = 24.", difficulty: "medium", source: "CogAT Prep" },
      { q: "1, 4, 9, 16, ?", options: ["20","24","25","36"], answer: 2, hint: "These are perfect squares.", explanation: "1², 2², 3², 4², 5² = 25.", difficulty: "medium", source: "HCP Prep" },
    ],
    geometry: [
      { q: "How many centimeters are in 3 meters?", options: ["30","100","300","3000"], answer: 2, hint: "1 meter = 100 cm.", explanation: "3 × 100 = 300 cm.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "How many feet are in 2 yards?", options: ["2","4","6","8"], answer: 2, hint: "1 yard = 3 feet.", explanation: "2 × 3 = 6 feet.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A recipe needs 2 cups. How many fluid ounces is that?", options: ["8","12","16","20"], answer: 2, hint: "1 cup = 8 fl oz.", explanation: "2 × 8 = 16 fluid ounces.", difficulty: "medium", source: "FastBridge Prep" },
    ],
    word: [
      { q: "A bar graph shows books read: Amy=8, Ben=5, Chloe=12, Dan=7. Who read the most?", options: ["Amy","Ben","Chloe","Dan"], answer: 2, hint: "Find the largest bar.", explanation: "Chloe read 12 (the most).", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Spinner has 4 equal sections: red, blue, green, yellow. P(landing on blue)?", options: ["1/2","1/3","1/4","1/8"], answer: 2, hint: "1 blue out of 4 total.", explanation: "1 out of 4 = 1/4.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "You flip a coin and roll a die. How many possible outcomes?", options: ["6","8","12","36"], answer: 2, hint: "2 × 6.", explanation: "2 coin sides × 6 die faces = 12.", difficulty: "medium", source: "FastBridge Prep" },
    ],
  },

  // ====================== GRADE 4 ======================
  4: {
    arithmetic: [
      { q: "Estimate: 48 × 21 ≈ ?", options: ["800","1000","1200","1500"], answer: 1, hint: "Round: 50 × 20.", explanation: "50 × 20 = 1,000.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Is 7/12 closer to 0, 1/2, or 1?", options: ["0","1/2","1","Can't tell"], answer: 1, hint: "7/12 ≈ 0.58...", explanation: "7/12 ≈ 0.58, closer to 1/2.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Find mean of: 85, 90, 78, 92, 80", options: ["83","84","85","86"], answer: 2, hint: "Add all, divide by 5.", explanation: "(85+90+78+92+80) ÷ 5 = 425 ÷ 5 = 85.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Find median and range of: 14, 8, 22, 5, 16. What is median + range?", options: ["28","31","34","36"], answer: 1, hint: "Sorted: 5,8,14,16,22.", explanation: "Median=14, Range=22−5=17. Sum=31.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "[4 : 16] = [7 : ?]", options: ["28","35","49","56"], answer: 2, hint: "4² = 16. So 7² = ?", explanation: "Rule: square. 7² = 49.", difficulty: "hard", source: "CogAT Prep" },
      { q: "2, 6, 18, 54, ?", options: ["72","108","162","216"], answer: 2, hint: "Each × 3.", explanation: "54 × 3 = 162. Geometric: ×3.", difficulty: "medium", source: "HCP Prep" },
    ],
    geometry: [
      { q: "How many grams are in 2.5 kilograms?", options: ["25","250","2500","25000"], answer: 2, hint: "1 kg = 1,000 g.", explanation: "2.5 × 1,000 = 2,500 g.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "How many mL are in 3 liters?", options: ["30","300","3000","30000"], answer: 2, hint: "1 liter = 1,000 mL.", explanation: "3 × 1,000 = 3,000 mL.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A map scale: 1 inch = 5 miles. Two cities are 3 inches apart. Real distance?", options: ["8 miles","10 miles","15 miles","20 miles"], answer: 2, hint: "3 × 5.", explanation: "3 × 5 = 15 miles.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Which quadrant is point (−3, 5) in?", options: ["I","II","III","IV"], answer: 1, hint: "(−,+) = Quadrant II.", explanation: "Negative x, positive y → Quadrant II.", difficulty: "medium", source: "FastBridge Prep" },
    ],
    word: [
      { q: "Survey: Pizza=15, Tacos=10, Burgers=8, Pasta=7. What fraction chose Pizza?", options: ["15/40","15/33","3/8","1/3"], answer: 0, hint: "Total = 15+10+8+7.", explanation: "Total = 40. Pizza = 15/40 = 3/8.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A bag has 3 red, 5 blue, 2 green marbles. P(blue)?", options: ["1/2","1/3","3/10","5/10"], answer: 0, hint: "5 blue out of 10 total.", explanation: "5/10 = 1/2.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "3 apples cost $2.40. How much for 7 apples?", options: ["$4.80","$5.20","$5.60","$6.00"], answer: 2, hint: "Unit price = $2.40 ÷ 3.", explanation: "$0.80 each. 7 × $0.80 = $5.60.", difficulty: "medium", source: "FastBridge Prep" },
    ],
  },

  // ====================== GRADE 5 ======================
  5: {
    arithmetic: [
      { q: "Estimate: 4,872 + 3,156 ≈ ?", options: ["7,000","8,000","9,000","10,000"], answer: 1, hint: "Round: 5,000 + 3,000.", explanation: "5,000 + 3,000 = 8,000.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "√50 is between which two integers?", options: ["5 and 6","6 and 7","7 and 8","8 and 9"], answer: 2, hint: "7² = 49, 8² = 64.", explanation: "49 < 50 < 64, so √50 is between 7 and 8.", difficulty: "medium", source: "HCP Prep" },
      { q: "What is 3/4 × 2/5? (Simplify)", options: ["3/10","6/20","5/9","6/9"], answer: 0, hint: "Multiply numerators, multiply denominators.", explanation: "3×2 / 4×5 = 6/20 = 3/10.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "What is 2/3 ÷ 4/5?", options: ["5/6","8/15","10/12","6/12"], answer: 0, hint: "Flip the second, then multiply.", explanation: "2/3 × 5/4 = 10/12 = 5/6.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "[12 : 4] = [? : 7]", options: ["14","15","21","28"], answer: 2, hint: "12 ÷ 3 = 4. So ? ÷ 3 = 7.", explanation: "Rule: ÷ 3. So ? = 7 × 3 = 21.", difficulty: "hard", source: "CogAT Prep" },
      { q: "1, 1, 2, 3, 5, 8, 13, ?", options: ["18","20","21","26"], answer: 2, hint: "Add the last two numbers.", explanation: "Fibonacci: 8 + 13 = 21.", difficulty: "medium", source: "HCP Prep" },
      { q: "Price changed from $80 to $100. Percent increase?", options: ["20%","25%","30%","50%"], answer: 1, hint: "Change ÷ original × 100.", explanation: "(100−80) ÷ 80 × 100 = 25%.", difficulty: "medium", source: "FastBridge Prep" },
    ],
    geometry: [
      { q: "Convert 3.5 km to meters.", options: ["35","350","3500","35000"], answer: 2, hint: "1 km = 1,000 m.", explanation: "3.5 × 1,000 = 3,500 m.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Reflect point (4, −2) over the x-axis. New point?", options: ["(4, 2)","(−4, −2)","(−4, 2)","(4, −2)"], answer: 0, hint: "Flip the y-coordinate.", explanation: "Reflect over x-axis: (4, −2) → (4, 2).", difficulty: "medium", source: "FastBridge Prep" },
      { q: "What is the midpoint of (2, 6) and (8, 10)?", options: ["(5, 8)","(6, 8)","(5, 7)","(10, 16)"], answer: 0, hint: "Average the x's and y's.", explanation: "((2+8)/2, (6+10)/2) = (5, 8).", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A cube has edges of 4 cm. Surface area?", options: ["64 cm²","96 cm²","128 cm²","144 cm²"], answer: 1, hint: "6 faces, each 4×4.", explanation: "6 × (4×4) = 6 × 16 = 96 cm².", difficulty: "hard", source: "FastBridge Prep" },
    ],
    word: [
      { q: "Test scores: 88, 92, 76, 95, 84. Mean?", options: ["85","87","88","90"], answer: 1, hint: "Add all, divide by 5.", explanation: "(88+92+76+95+84) ÷ 5 = 435 ÷ 5 = 87.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Data: 4, 7, 7, 9, 3, 7, 5. Mode?", options: ["3","5","7","9"], answer: 2, hint: "Most frequent.", explanation: "7 appears 3 times. Mode = 7.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A jar: 6 red, 4 blue, 5 green. You pick one. P(not red)?", options: ["2/5","3/5","6/15","2/3"], answer: 1, hint: "Not red = blue + green.", explanation: "9/15 = 3/5.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Recipe for 4 needs 2/3 cup sugar. Recipe for 12 needs?", options: ["1 cup","1½ cups","2 cups","2½ cups"], answer: 2, hint: "12 ÷ 4 = 3 times the recipe.", explanation: "3 × 2/3 = 6/3 = 2 cups.", difficulty: "medium", source: "FastBridge Prep" },
    ],
  },

  // ====================== GRADE 6 ======================
  6: {
    arithmetic: [
      { q: "Estimate: 398 × 52 ≈ ?", options: ["15,000","20,000","25,000","30,000"], answer: 1, hint: "Round: 400 × 50.", explanation: "400 × 50 = 20,000.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "[8 : 2] = [27 : ?]", options: ["3","6","9","13.5"], answer: 0, hint: "8 = 2³. 27 = 3³. Cube root!", explanation: "Rule: cube root. ∛27 = 3.", difficulty: "hard", source: "CogAT Prep" },
      { q: "3, 6, 11, 18, 27, ?", options: ["36","38","40","42"], answer: 1, hint: "Differences: 3, 5, 7, 9, ...", explanation: "Differences increase by 2. Next diff = 11. 27 + 11 = 38.", difficulty: "hard", source: "HCP Prep" },
      { q: "Population 50,000 grows 10% per year. After 2 years?", options: ["55,000","60,000","60,500","61,000"], answer: 2, hint: "50,000 × 1.1 × 1.1", explanation: "50,000 × 1.1 = 55,000. × 1.1 = 60,500.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "5 out of 8 dentists recommend a toothpaste. What percent?", options: ["58%","60%","62.5%","65%"], answer: 2, hint: "5 ÷ 8 × 100.", explanation: "5/8 = 0.625 = 62.5%.", difficulty: "medium", source: "FastBridge Prep" },
    ],
    geometry: [
      { q: "Convert 2.5 miles to feet.", options: ["5,000","7,600","13,200","26,400"], answer: 2, hint: "1 mile = 5,280 feet.", explanation: "2.5 × 5,280 = 13,200 feet.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A cylinder: radius 3 cm, height 10 cm. Volume? (use π ≈ 3.14)", options: ["94.2 cm³","188.4 cm³","282.6 cm³","314 cm³"], answer: 2, hint: "V = πr²h.", explanation: "3.14 × 9 × 10 = 282.6 cm³.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Slope of line through (1, 3) and (4, 9)?", options: ["1","2","3","6"], answer: 1, hint: "Slope = (y₂−y₁)/(x₂−x₁).", explanation: "(9−3)/(4−1) = 6/3 = 2.", difficulty: "medium", source: "FastBridge Prep" },
    ],
    word: [
      { q: "Students' test scores: 72, 85, 90, 85, 68. Mean, median, mode?", options: ["80, 85, 85","82, 85, 85","80, 85, 90","82, 85, 72"], answer: 0, hint: "Add, sort, find most common.", explanation: "Mean: 400/5=80. Sorted: 68,72,85,85,90. Median=85. Mode=85.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Two dice rolled. P(sum = 7)?", options: ["1/6","1/12","5/36","7/36"], answer: 0, hint: "How many ways to make 7?", explanation: "6 ways out of 36: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1). 6/36 = 1/6.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A shirt costs $45 after 25% off. Original price?", options: ["$50","$56.25","$60","$67.50"], answer: 2, hint: "Sale = 75% of original.", explanation: "$45 ÷ 0.75 = $60.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Unit rate: 240 miles in 4 hours = ? mph", options: ["50","55","60","65"], answer: 2, hint: "Distance ÷ time.", explanation: "240 ÷ 4 = 60 mph.", difficulty: "easy", source: "FastBridge Prep" },
    ],
  },

  };

  // Share with grades 7 and 8
  FB_QUESTIONS[7] = FB_QUESTIONS[6];
  FB_QUESTIONS[8] = FB_QUESTIONS[6];

  // ─── Merge into main QUESTIONS bank ─────────────────────
  if (typeof QUESTIONS !== 'undefined') {
    for (const grade in FB_QUESTIONS) {
      if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
      for (const cat in FB_QUESTIONS[grade]) {
        if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
        QUESTIONS[grade][cat].push(...FB_QUESTIONS[grade][cat]);
      }
    }
  }

  // ─── FastBridge Math Category Mapping ───────────────────
  // Maps fb_ categories to which question pools & generators to use
  const FB_CATEGORY_MAP = {
    fb_estimation:    { questionCats: ['arithmetic'],       generators: ['estimation', 'rounding', 'mentalMath'] },
    fb_data:          { questionCats: ['word', 'arithmetic'], generators: ['meanMedianModeRange', 'dataTable', 'averageProblem'] },
    fb_measurement:   { questionCats: ['geometry'],          generators: ['unitConversion', 'perimeter', 'area', 'volume'] },
    fb_number_sense:  { questionCats: ['arithmetic', 'logic'], generators: ['numberPattern', 'numberAnalogy', 'mentalMath', 'missingNumber'] },
    fb_probability:   { questionCats: ['word'],              generators: ['simpleProbability', 'countingPrinciple', 'permutationCombo'] },
    fb_math_mixed:    { questionCats: ['arithmetic', 'geometry', 'word', 'logic'], generators: ['estimation', 'meanMedianModeRange', 'unitConversion', 'numberAnalogy', 'mentalMath', 'simpleProbability', 'dataTable'] },
  };

  // ─── Global function: getFastBridgeMathQuestions ────────
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  window.getFastBridgeMathQuestions = async function(grade, category, count) {
    grade = parseInt(grade) || 4;
    count = count || 10;
    const mapping = FB_CATEGORY_MAP[category];
    if (!mapping) return [];

    let pool = [];

    // 1) Gather FastBridge-source static questions from the QUESTIONS bank
    if (typeof QUESTIONS !== 'undefined') {
      const gradeData = QUESTIONS[grade] || {};
      const searchGrades = [grade, grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
      for (const g of searchGrades) {
        const gData = QUESTIONS[g] || {};
        for (const cat of mapping.questionCats) {
          const arr = gData[cat] || [];
          // Prioritize FastBridge/HCP/CogAT tagged questions
          arr.forEach(q => {
            if (q.source && (q.source.includes('FastBridge') || q.source.includes('HCP') || q.source.includes('CogAT'))) {
              pool.push({ ...q, _priority: g === grade ? 2 : 1 });
            }
          });
        }
      }
    }

    // Sort so current-grade questions come first
    pool.sort((a, b) => b._priority - a._priority);
    pool = pool.map(({ _priority, ...q }) => q);

    // 2) Generate dynamic questions using QuestionAPI generators
    if (typeof QuestionAPI !== 'undefined' && QuestionAPI.Gen) {
      const gens = mapping.generators.filter(g => typeof QuestionAPI.Gen[g] === 'function');
      if (gens.length > 0) {
        const genCount = Math.max(count - pool.length, Math.ceil(count * 0.5));
        let tries = 0;
        while (pool.length < count + genCount && tries < genCount * 3) {
          try {
            const genName = gens[Math.floor(Math.random() * gens.length)];
            const q = QuestionAPI.Gen[genName](grade);
            if (q && q.q && q.options && q.options.length === 4 && typeof q.answer === 'number') {
              pool.push(q);
            }
          } catch (e) { /* skip bad generation */ }
          tries++;
        }
      }
    }

    // 3) If still short, pull from local bank regardless of source tag
    if (pool.length < count && typeof QUESTIONS !== 'undefined') {
      const gradeData = QUESTIONS[grade] || {};
      for (const cat of mapping.questionCats) {
        const arr = gradeData[cat] || [];
        const existing = new Set(pool.map(q => q.q));
        arr.forEach(q => {
          if (!existing.has(q.q)) pool.push(q);
        });
      }
    }

    return shuffle(pool).slice(0, count);
  };

})();
