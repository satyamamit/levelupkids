// =============================================
// LevelUpKids — FastBridge Grade 4 Extra Practice
// 40+ additional Grade 4 questions for FastBridge/aReading/aMath prep
// Estimation, Number Sense, Data, Measurement, Patterns
// =============================================

(function() {
  const FB4_EXTRA = {

  4: {
    arithmetic: [
      // ─── Estimation & Mental Math ───
      { q: "Estimate: 67 × 19 ≈ ?", options: ["1,200","1,400","1,600","1,800"], answer: 1, hint: "Round: 70 × 20.", explanation: "70 × 20 = 1,400.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Estimate: 812 − 397 ≈ ?", options: ["300","400","500","600"], answer: 1, hint: "Round: 800 − 400.", explanation: "800 − 400 = 400.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Estimate: 489 + 312 ≈ ?", options: ["700","800","900","1000"], answer: 1, hint: "Round: 500 + 300.", explanation: "500 + 300 = 800.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Is 5/8 closer to 0, 1/2, or 1?", options: ["0","1/2","1","Exactly 1/2"], answer: 1, hint: "5/8 = 0.625", explanation: "5/8 = 0.625, which is closer to 1/2 (0.5) than to 1.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Which is the best estimate for 24 × 38?", options: ["About 600","About 800","About 1,000","About 1,200"], answer: 2, hint: "Round: 25 × 40.", explanation: "25 × 40 = 1,000. Actual: 24 × 38 = 912.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Estimate: 4,215 + 2,876 ≈ ?", options: ["6,000","7,000","8,000","9,000"], answer: 1, hint: "Round: 4,000 + 3,000.", explanation: "4,000 + 3,000 = 7,000.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "What is 250 × 4 using mental math?", options: ["800","900","1,000","1,100"], answer: 2, hint: "25 × 4 = 100, then add zero.", explanation: "250 × 4 = 1,000.", difficulty: "easy", source: "FastBridge Prep" },

      // ─── Number Sense & Patterns ───
      { q: "What comes next: 5, 10, 20, 40, ...?", options: ["50","60","70","80"], answer: 3, hint: "Each number is doubled.", explanation: "Pattern: × 2. 40 × 2 = 80.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "[6 : 18] = [9 : ?]", options: ["21","24","27","36"], answer: 2, hint: "6 × 3 = 18. Apply same rule to 9.", explanation: "Rule: × 3. 9 × 3 = 27.", difficulty: "medium", source: "CogAT Prep" },
      { q: "[3 : 12] = [5 : ?]", options: ["15","20","25","30"], answer: 1, hint: "3 × ? = 12.", explanation: "Rule: × 4. 5 × 4 = 20.", difficulty: "easy", source: "CogAT Prep" },
      { q: "[10 : 5] = [24 : ?]", options: ["8","10","12","14"], answer: 2, hint: "10 ÷ 2 = 5. Apply same to 24.", explanation: "Rule: ÷ 2. 24 ÷ 2 = 12.", difficulty: "easy", source: "CogAT Prep" },
      { q: "What is the pattern? 1, 4, 9, 16, 25, ...?", options: ["30","35","36","49"], answer: 2, hint: "These are perfect squares.", explanation: "1², 2², 3², 4², 5², 6² = 36.", difficulty: "medium", source: "HCP Prep" },
      { q: "Find the missing number: 2, 5, 10, 17, __, 37", options: ["24","25","26","28"], answer: 2, hint: "Differences: 3, 5, 7, ?, 11", explanation: "Differences increase by 2: 3, 5, 7, 9, 11. So 17 + 9 = 26.", difficulty: "hard", source: "HCP Prep" },
      { q: "[8 : 64] = [6 : ?]", options: ["24","30","36","48"], answer: 2, hint: "8 × 8 = 64. So 6 × 6 = ?", explanation: "Rule: square it. 6² = 36.", difficulty: "hard", source: "CogAT Prep" },
      { q: "What number is 1,000 more than 45,678?", options: ["45,778","46,678","55,678","145,678"], answer: 1, hint: "Add 1,000 to the thousands place.", explanation: "45,678 + 1,000 = 46,678.", difficulty: "easy", source: "FastBridge Prep" },
    ],
    geometry: [
      // ─── Measurement & Conversion ───
      { q: "How many inches are in 4 feet?", options: ["36","42","48","60"], answer: 2, hint: "1 foot = 12 inches.", explanation: "4 × 12 = 48 inches.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Convert 3 yards to feet.", options: ["6","9","12","15"], answer: 1, hint: "1 yard = 3 feet.", explanation: "3 × 3 = 9 feet.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "How many cups are in 3 quarts?", options: ["6","8","10","12"], answer: 3, hint: "1 quart = 4 cups.", explanation: "3 × 4 = 12 cups.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A desk is about 1 meter long. About how many centimeters is that?", options: ["10","50","100","1000"], answer: 2, hint: "1 meter = ? centimeters.", explanation: "1 meter = 100 centimeters.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Which is a better estimate for the weight of a watermelon?", options: ["5 ounces","5 pounds","50 pounds","500 pounds"], answer: 1, hint: "Think about how heavy a watermelon feels.", explanation: "A watermelon weighs about 5 pounds (some up to 20 lbs).", difficulty: "easy", source: "FastBridge Prep" },
      { q: "The perimeter of a square is 48 cm. What is the length of one side?", options: ["8 cm","10 cm","12 cm","16 cm"], answer: 2, hint: "A square has 4 equal sides.", explanation: "48 ÷ 4 = 12 cm per side.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A rectangle is 14 m long and 6 m wide. What is its area?", options: ["20 m²","40 m²","84 m²","168 m²"], answer: 2, hint: "Area = length × width.", explanation: "14 × 6 = 84 m².", difficulty: "easy", source: "FastBridge Prep" },
      { q: "How many seconds are in 5 minutes?", options: ["50","100","250","300"], answer: 3, hint: "1 minute = 60 seconds.", explanation: "5 × 60 = 300 seconds.", difficulty: "easy", source: "FastBridge Prep" },
    ],
    word: [
      // ─── Data, Probability & Word Problems ───
      { q: "Test scores: 75, 82, 88, 95, 90. What is the range?", options: ["13","15","18","20"], answer: 3, hint: "Range = highest − lowest.", explanation: "95 − 75 = 20.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Find the mean of: 12, 18, 15, 9, 16", options: ["13","14","15","16"], answer: 1, hint: "Add all, divide by 5.", explanation: "(12+18+15+9+16) ÷ 5 = 70 ÷ 5 = 14.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Data set: 4, 7, 7, 8, 9, 9, 9, 12. What is the mode?", options: ["7","8","9","12"], answer: 2, hint: "Which value appears most often?", explanation: "9 appears 3 times (more than any other). Mode = 9.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A bag has 4 red, 3 blue, and 3 yellow marbles. What is the probability of picking a red marble?", options: ["3/10","4/10","4/7","3/7"], answer: 1, hint: "Total marbles = 4+3+3 = 10.", explanation: "4 red out of 10 total = 4/10 = 2/5.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "A spinner has 8 equal sections: 3 green, 2 red, 2 blue, 1 yellow. P(NOT green)?", options: ["3/8","5/8","1/8","6/8"], answer: 1, hint: "Not green = total − green.", explanation: "Not green = 8 − 3 = 5. P(not green) = 5/8.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A store sells 45 apples on Monday, 62 on Tuesday, 38 on Wednesday. What is the average daily sales?", options: ["42","45","48","52"], answer: 2, hint: "Add all three, divide by 3.", explanation: "(45+62+38) ÷ 3 = 145 ÷ 3 ≈ 48.3 ≈ 48.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "You flip a coin 3 times. How many possible outcomes?", options: ["3","6","8","12"], answer: 2, hint: "Each flip has 2 outcomes.", explanation: "2 × 2 × 2 = 8 possible outcomes.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A line plot shows lengths of bugs: 1 in.(×2), 1½ in.(×4), 2 in.(×3), 2½ in.(×1). Total bugs measured?", options: ["8","10","12","14"], answer: 1, hint: "Add up all the X's.", explanation: "2 + 4 + 3 + 1 = 10 bugs.", difficulty: "easy", source: "FastBridge Prep" },
      { q: "Books read by students: 5, 3, 7, 3, 8, 3, 6. What is the median?", options: ["3","5","6","7"], answer: 1, hint: "Sort and find the middle value.", explanation: "Sorted: 3, 3, 3, 5, 6, 7, 8. Middle (4th) value = 5.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A recipe needs 3/4 cup of sugar. You want to make 4 batches. How much sugar total?", options: ["3 cups","2 cups","2½ cups","3¼ cups"], answer: 0, hint: "4 × 3/4 = ?", explanation: "4 × 3/4 = 12/4 = 3 cups.", difficulty: "medium", source: "FastBridge Prep" },
    ],
  },

  };

  // ─── Merge into main QUESTIONS bank ─────────────────────
  if (typeof QUESTIONS !== 'undefined') {
    for (const grade in FB4_EXTRA) {
      if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
      for (const cat in FB4_EXTRA[grade]) {
        if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
        QUESTIONS[grade][cat].push(...FB4_EXTRA[grade][cat]);
      }
    }
  }

})();
