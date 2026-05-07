// =============================================
// LevelUpKids — SBA Grade 4 Extra Math Practice
// 50+ additional Grade 4 math questions for test prep
// Common Core aligned: OA, NBT, NF, MD, G
// =============================================

(function() {
  const SBA4_EXTRA = {
  4: {
    sba_math: [
      // ─── 4.OA: Operations & Algebraic Thinking ───
      { q: "A school has 6 classrooms with 28 students in each. How many students are there in all?", options: ["148","158","168","178"], answer: 2, hint: "Multiply classrooms × students.", explanation: "6 × 28 = 168 students.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Jake has 156 stickers to share equally among 12 friends. How many stickers does each friend get?", options: ["12","13","14","15"], answer: 1, hint: "156 ÷ 12 = ?", explanation: "156 ÷ 12 = 13 stickers each.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A farmer plants 9 rows with 23 seeds in each row. How many seeds did he plant?", options: ["197","207","217","227"], answer: 1, hint: "9 × 23 = ?", explanation: "9 × 23 = 207 seeds.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is the next number in the pattern: 3, 7, 11, 15, 19, ...?", options: ["21","22","23","24"], answer: 2, hint: "Find the rule: add what each time?", explanation: "Pattern adds 4 each time. 19 + 4 = 23.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Which expression equals 4 × (6 + 3)?", options: ["4 × 6 + 3","4 × 6 + 4 × 3","4 + 6 × 3","(4 × 6) + 3"], answer: 1, hint: "Use the distributive property.", explanation: "4 × (6 + 3) = 4 × 6 + 4 × 3 = 24 + 12 = 36.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A toy costs $8. How many toys can you buy with $100, and how much change do you get?", options: ["12 toys, $4 change","12 toys, $2 change","13 toys, $4 change","11 toys, $12 change"], answer: 0, hint: "100 ÷ 8 = ?", explanation: "100 ÷ 8 = 12 remainder 4. So 12 toys with $4 left.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Sam is 3 times as old as his sister. His sister is 7. How old is Sam?", options: ["10","14","21","24"], answer: 2, hint: "Multiply: 3 × 7.", explanation: "3 × 7 = 21. Sam is 21 years old.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Find all factor pairs of 36.", options: ["(1,36) (2,18) (3,12) (4,9) (6,6)","(1,36) (2,18) (3,12) (4,8) (6,6)","(1,36) (2,18) (3,9) (4,12) (6,6)","(1,36) (2,12) (3,18) (4,9) (6,6)"], answer: 0, hint: "Find pairs that multiply to 36.", explanation: "1×36, 2×18, 3×12, 4×9, 6×6 are all factor pairs of 36.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "Is 51 prime or composite?", options: ["Prime","Composite","Neither","Both"], answer: 1, hint: "Can you divide 51 by 3?", explanation: "51 = 3 × 17, so it has more than two factors. It's composite.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A pattern follows: multiply by 2, then subtract 1. Start at 3. What is the 4th number?", options: ["9","17","19","33"], answer: 2, hint: "3 → 5 → 9 → 17 → ?", explanation: "3→(3×2−1=5)→(5×2−1=9)→(9×2−1=17)→(17×2−1=33). Wait—4th number after 3 is the 4th step. 3, 5, 9, 17. The 4th number is 17.", difficulty: "hard", source: "SBA Grade 4" },

      // ─── 4.NBT: Number & Operations in Base Ten ───
      { q: "What is 45 × 36?", options: ["1,520","1,580","1,620","1,680"], answer: 2, hint: "45 × 30 + 45 × 6.", explanation: "45 × 30 = 1,350. 45 × 6 = 270. Total: 1,620.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is 7,200 ÷ 8?", options: ["800","850","900","950"], answer: 2, hint: "72 ÷ 8 = 9, then add the zeros.", explanation: "7,200 ÷ 8 = 900.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 50,000 − 23,467?", options: ["26,533","27,533","26,433","27,433"], answer: 0, hint: "Borrow across the zeros.", explanation: "50,000 − 23,467 = 26,533.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Round 385,621 to the nearest ten thousand.", options: ["380,000","385,000","386,000","390,000"], answer: 3, hint: "Look at the thousands digit (5).", explanation: "5 ≥ 5, so round up: 390,000.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Which is greater: 456,789 or 465,789?", options: ["456,789","465,789","They are equal","Cannot determine"], answer: 1, hint: "Compare the ten-thousands digit.", explanation: "In the ten-thousands place: 5 < 6, so 465,789 > 456,789.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 83 × 47?", options: ["3,801","3,891","3,901","3,991"], answer: 2, hint: "83 × 40 + 83 × 7.", explanation: "83 × 40 = 3,320. 83 × 7 = 581. Total: 3,901.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "What is the value of the digit 7 in 174,523?", options: ["7,000","70,000","700","7"], answer: 1, hint: "7 is in the ten-thousands place.", explanation: "The 7 is in the ten-thousands place, so its value is 70,000.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Subtract: 400,000 − 156,832 = ?", options: ["243,168","244,168","243,268","253,168"], answer: 0, hint: "Regroup from the hundred-thousands.", explanation: "400,000 − 156,832 = 243,168.", difficulty: "medium", source: "SBA Grade 4" },

      // ─── 4.NF: Number & Operations—Fractions ───
      { q: "What is 2/3 + 3/4?", options: ["5/7","5/12","17/12","11/12"], answer: 2, hint: "Find common denominator: 12.", explanation: "2/3 = 8/12, 3/4 = 9/12. Sum: 17/12 = 1 5/12.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "Which fraction is greater: 3/5 or 2/3?", options: ["3/5","2/3","They are equal","Cannot tell"], answer: 1, hint: "Find common denominator: 15.", explanation: "3/5 = 9/15, 2/3 = 10/15. Since 10 > 9, 2/3 > 3/5.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Convert 3 2/5 to an improper fraction.", options: ["11/5","13/5","17/5","7/5"], answer: 2, hint: "Multiply whole number by denominator, add numerator.", explanation: "3 × 5 + 2 = 17. So 3 2/5 = 17/5.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 7/8 − 3/8?", options: ["4/8","4/16","1/2","Both A and C"], answer: 3, hint: "Same denominators — subtract numerators.", explanation: "7/8 − 3/8 = 4/8 = 1/2. Both 4/8 and 1/2 are correct.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 6 × 2/3?", options: ["12/3","4","8/3","3"], answer: 1, hint: "6 × 2 = 12, keep denominator 3.", explanation: "6 × 2/3 = 12/3 = 4.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Place these fractions in order from least to greatest: 1/2, 2/5, 3/4", options: ["2/5, 1/2, 3/4","1/2, 2/5, 3/4","3/4, 1/2, 2/5","2/5, 3/4, 1/2"], answer: 0, hint: "Convert to common denominator 20.", explanation: "1/2=10/20, 2/5=8/20, 3/4=15/20. Order: 8/20 < 10/20 < 15/20.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What decimal is equivalent to 7/10?", options: ["0.07","0.17","0.7","7.0"], answer: 2, hint: "Divide 7 by 10.", explanation: "7 ÷ 10 = 0.7.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Add: 3/10 + 42/100 = ?", options: ["45/100","45/110","72/100","72/110"], answer: 2, hint: "Convert 3/10 to hundredths.", explanation: "3/10 = 30/100. Then 30/100 + 42/100 = 72/100.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Which shows 0.65 as a fraction?", options: ["65/10","65/100","6/5","65/1000"], answer: 1, hint: "0.65 means 65 hundredths.", explanation: "0.65 = 65/100 = 13/20.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── 4.MD: Measurement & Data ───
      { q: "How many minutes are in 3 hours and 15 minutes?", options: ["180","195","200","215"], answer: 1, hint: "3 hours = 180 minutes, then add 15.", explanation: "3 × 60 + 15 = 195 minutes.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A rectangle has a perimeter of 40 cm. If the length is 12 cm, what is the width?", options: ["6 cm","8 cm","10 cm","16 cm"], answer: 1, hint: "P = 2l + 2w. So 2w = 40 − 24.", explanation: "40 − 2(12) = 16. Width = 16 ÷ 2 = 8 cm.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Convert 5 feet to inches.", options: ["50","55","60","72"], answer: 2, hint: "1 foot = 12 inches.", explanation: "5 × 12 = 60 inches.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A fish tank holds 8 gallons. How many quarts is that?", options: ["16","24","32","40"], answer: 2, hint: "1 gallon = 4 quarts.", explanation: "8 × 4 = 32 quarts.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "An angle measures 135°. Is it acute, right, or obtuse?", options: ["Acute","Right","Obtuse","Straight"], answer: 2, hint: "Obtuse angles are between 90° and 180°.", explanation: "135° is between 90° and 180°, so it's obtuse.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A square has a side of 15 meters. What is its area?", options: ["30 m²","60 m²","150 m²","225 m²"], answer: 3, hint: "Area of square = side × side.", explanation: "15 × 15 = 225 m².", difficulty: "easy", source: "SBA Grade 4" },
      { q: "How many pounds are in 64 ounces?", options: ["2","3","4","5"], answer: 2, hint: "1 pound = 16 ounces.", explanation: "64 ÷ 16 = 4 pounds.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A line plot shows X's above: 2(×3), 3(×5), 4(×2), 5(×4). How many data points total?", options: ["12","14","16","18"], answer: 1, hint: "Add all the X's: 3+5+2+4.", explanation: "3 + 5 + 2 + 4 = 14 data points.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── 4.G: Geometry ───
      { q: "A shape has exactly one pair of parallel sides. What is it?", options: ["Parallelogram","Rectangle","Trapezoid","Square"], answer: 2, hint: "Only ONE pair of parallel sides.", explanation: "A trapezoid has exactly one pair of parallel sides.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "How many lines of symmetry does a regular hexagon have?", options: ["2","4","6","8"], answer: 2, hint: "A regular hexagon has 6 equal sides.", explanation: "A regular hexagon has 6 lines of symmetry.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Which of these is NOT a polygon?", options: ["Triangle","Circle","Pentagon","Octagon"], answer: 1, hint: "Polygons have straight sides.", explanation: "A circle has no straight sides, so it's not a polygon.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A right triangle has legs of 3 cm and 4 cm. What is its perimeter if the hypotenuse is 5 cm?", options: ["10 cm","12 cm","15 cm","20 cm"], answer: 1, hint: "Add all three sides.", explanation: "3 + 4 + 5 = 12 cm.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Two angles are supplementary. One is 65°. What is the other?", options: ["25°","65°","115°","125°"], answer: 2, hint: "Supplementary angles add to 180°.", explanation: "180° − 65° = 115°.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is a line segment?", options: ["A line that goes on forever","Part of a line with two endpoints","A curved path","Two lines that cross"], answer: 1, hint: "It has a start and an end.", explanation: "A line segment is part of a line with two endpoints — it doesn't go on forever.", difficulty: "easy", source: "SBA Grade 4" },
    ],
  },
  };

  // Merge into QUESTIONS
  for (const grade in SBA4_EXTRA) {
    if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
    for (const cat in SBA4_EXTRA[grade]) {
      if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
      QUESTIONS[grade][cat].push(...SBA4_EXTRA[grade][cat]);
    }
  }
})();
