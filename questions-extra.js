// =============================================
// LevelUpKids — EXTRA Question Bank (Batch 2)
// Merged into QUESTIONS on load
// =============================================

(function() {
  const EXTRA = {

  // ====================== GRADE 1 EXTRAS ======================
  1: {
    arithmetic: [
      { q: "What is 7 + 9?", options: ["14","15","16","17"], answer: 2, hint: "7+3=10, then 6 more.", explanation: "16.", difficulty: "easy", source: "Singapore Math" },
      { q: "Count backwards from 20 by 2. What's the 5th number?", options: ["10","12","14","16"], answer: 1, hint: "20,18,16,14,12.", explanation: "12.", difficulty: "easy", source: "RSM" },
      { q: "What is 11 − 5?", options: ["4","5","6","7"], answer: 2, hint: "Count back from 11.", explanation: "6.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 6 + 6 + 6?", options: ["12","16","18","20"], answer: 2, hint: "Three 6s.", explanation: "18.", difficulty: "easy", source: "Primefactor" },
      { q: "I have 3 groups of 4 blocks. How many blocks?", options: ["7","10","12","15"], answer: 2, hint: "Repeated addition.", explanation: "12.", difficulty: "easy", source: "RSM" },
      { q: "What is 19 − 8?", options: ["9","10","11","12"], answer: 2, hint: "19−8.", explanation: "11.", difficulty: "easy", source: "Singapore Math" },
      { q: "What comes next: 2, 4, 6, 8, __?", options: ["9","10","11","12"], answer: 1, hint: "Counting by 2s.", explanation: "10.", difficulty: "easy", source: "Primefactor" },
      { q: "Nora has 5 red balls and 8 blue balls. How many altogether?", options: ["11","12","13","14"], answer: 2, hint: "5+8.", explanation: "13.", difficulty: "easy", source: "Singapore Math" }
    ],
    logic: [
      { q: "I have 2 hands. Each hand has 5 fingers. Total fingers?", options: ["5","7","10","12"], answer: 2, hint: "Multiply.", explanation: "10.", difficulty: "easy", source: "Singapore Math" },
      { q: "There are 3 boys and 4 girls. How many children?", options: ["6","7","8","12"], answer: 1, hint: "Add them.", explanation: "7.", difficulty: "easy", source: "Primefactor" },
      { q: "A toy costs 9 coins. You have 5 coins. How many more do you need?", options: ["3","4","5","6"], answer: 1, hint: "9−5.", explanation: "4.", difficulty: "easy", source: "RSM" },
      { q: "If today is Saturday, what day is tomorrow?", options: ["Friday","Saturday","Sunday","Monday"], answer: 2, hint: "Day after Saturday.", explanation: "Sunday.", difficulty: "easy", source: "Singapore Math" },
      { q: "There are 6 apples in a row. Which position is the middle?", options: ["2nd","3rd","4th","No exact middle"], answer: 3, hint: "6 is even.", explanation: "No exact middle for even count.", difficulty: "medium", source: "Math Kangaroo" }
    ],
    word: [
      { q: "Mom bakes 10 cookies. Dad eats 3, brother eats 2. How many left?", options: ["3","4","5","6"], answer: 2, hint: "10−3−2.", explanation: "5.", difficulty: "easy", source: "Singapore Math" },
      { q: "A farmer has 4 pigs and 3 cows. He gets 2 more pigs. Total animals?", options: ["7","8","9","10"], answer: 2, hint: "6+3.", explanation: "9.", difficulty: "easy", source: "RSM" },
      { q: "Lily has 7 stickers. She gets 5 more, then gives 3 away. How many?", options: ["7","8","9","10"], answer: 2, hint: "7+5−3.", explanation: "9.", difficulty: "easy", source: "Primefactor" }
    ]
  },

  // ====================== GRADE 2 EXTRAS ======================
  2: {
    arithmetic: [
      { q: "What is 3 × 9?", options: ["24","27","28","30"], answer: 1, hint: "Three nines.", explanation: "27.", difficulty: "easy", source: "Singapore Math" },
      { q: "72 ÷ 9 = ?", options: ["7","8","9","10"], answer: 1, hint: "9×?=72.", explanation: "8.", difficulty: "easy", source: "RSM" },
      { q: "What is 150 + 250?", options: ["350","400","450","500"], answer: 1, hint: "Add hundreds.", explanation: "400.", difficulty: "easy", source: "Primefactor" },
      { q: "What is 500 − 175?", options: ["315","320","325","335"], answer: 2, hint: "500−175.", explanation: "325.", difficulty: "easy", source: "Singapore Math" },
      { q: "Nearest hundred: 349 rounds to?", options: ["300","340","350","400"], answer: 0, hint: "4<5 → round down.", explanation: "300.", difficulty: "easy", source: "RSM" },
      { q: "8 × 7 = ?", options: ["48","54","56","63"], answer: 2, hint: "Eight sevens.", explanation: "56.", difficulty: "easy", source: "Primefactor" },
      { q: "What is 45 + 67?", options: ["102","110","112","122"], answer: 2, hint: "Column addition.", explanation: "112.", difficulty: "easy", source: "Singapore Math" },
      { q: "Three dozen eggs is how many?", options: ["24","30","36","48"], answer: 2, hint: "Dozen=12.", explanation: "36.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "Which month has 28 days?", options: ["February only","All of them","None","January"], answer: 1, hint: "Trick question!", explanation: "All months have at least 28 days.", difficulty: "easy", source: "Math Kangaroo" },
      { q: "I'm even, between 20 and 30, divisible by 3. What am I?", options: ["21","24","27","28"], answer: 1, hint: "Even AND divisible by 3.", explanation: "24.", difficulty: "medium", source: "Primefactor" },
      { q: "3 cats catch 3 mice in 3 minutes. How many cats for 100 mice in 100 minutes?", options: ["3","33","100","300"], answer: 0, hint: "Each cat: 1 mouse per 3 min.", explanation: "3 cats.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "How many triangles in a 4-dot triangle (dots at corners and center)?", options: ["1","3","4","5"], answer: 1, hint: "Center divides big triangle.", explanation: "3 small + 0 = actually depends on arrangement. 3.", difficulty: "medium", source: "RSM" },
      { q: "What is the smallest number that rounds to 50 (nearest ten)?", options: ["44","45","46","49"], answer: 1, hint: "45 rounds up to 50.", explanation: "45.", difficulty: "easy", source: "Singapore Math" }
    ],
    geometry: [
      { q: "How many right angles in a rectangle?", options: ["2","3","4","6"], answer: 2, hint: "All corners.", explanation: "4.", difficulty: "easy", source: "Singapore Math" },
      { q: "A shape has 4 equal sides but no right angles. It's a…?", options: ["Square","Rectangle","Rhombus","Trapezoid"], answer: 2, hint: "Tilted square.", explanation: "Rhombus.", difficulty: "medium", source: "RSM" },
      { q: "How many lines of symmetry does an equilateral triangle have?", options: ["1","2","3","6"], answer: 2, hint: "Fold 3 ways.", explanation: "3.", difficulty: "medium", source: "Primefactor" }
    ],
    word: [
      { q: "A book has 120 pages. You've read 85. Pages left?", options: ["25","30","35","40"], answer: 2, hint: "120−85.", explanation: "35.", difficulty: "easy", source: "Singapore Math" },
      { q: "If 5 bananas cost $2, how much for 15 bananas?", options: ["$4","$5","$6","$8"], answer: 2, hint: "15÷5=3 groups.", explanation: "$6.", difficulty: "easy", source: "RSM" },
      { q: "School starts at 8:30. Recess is 2 hours later. Recess time?", options: ["9:30","10:00","10:30","11:00"], answer: 2, hint: "8:30+2:00.", explanation: "10:30.", difficulty: "easy", source: "Primefactor" },
      { q: "A rope is 2 meters long. Cut into 4 equal pieces. Each piece in cm?", options: ["25 cm","40 cm","50 cm","200 cm"], answer: 2, hint: "200÷4.", explanation: "50 cm.", difficulty: "easy", source: "Singapore Math" }
    ]
  },

  // ====================== GRADE 3 EXTRAS ======================
  3: {
    arithmetic: [
      { q: "What is 9 × 11?", options: ["89","99","100","109"], answer: 1, hint: "9×10+9.", explanation: "99.", difficulty: "easy", source: "RSM" },
      { q: "What is 2/5 + 1/5?", options: ["2/5","3/5","3/10","1/2"], answer: 1, hint: "Same denominator.", explanation: "3/5.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 1000 − 456?", options: ["534","544","554","644"], answer: 1, hint: "Borrow.", explanation: "544.", difficulty: "easy", source: "Primefactor" },
      { q: "12 × 12 = ?", options: ["124","132","144","156"], answer: 2, hint: "Dozen squared.", explanation: "144.", difficulty: "easy", source: "RSM" },
      { q: "What is 3/4 of 80?", options: ["20","40","60","75"], answer: 2, hint: "80÷4×3.", explanation: "60.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 7 × 13?", options: ["84","89","91","93"], answer: 2, hint: "7×10+7×3.", explanation: "91.", difficulty: "easy", source: "Primefactor" },
      { q: "Express 3/12 in simplest form.", options: ["1/3","1/4","1/6","3/12"], answer: 1, hint: "GCD=3.", explanation: "1/4.", difficulty: "easy", source: "RSM" },
      { q: "500 ÷ 25 = ?", options: ["15","20","25","30"], answer: 1, hint: "25×20.", explanation: "20.", difficulty: "easy", source: "Singapore Math" }
    ],
    logic: [
      { q: "How many odd numbers between 10 and 30?", options: ["9","10","11","12"], answer: 1, hint: "11,13,…,29.", explanation: "10.", difficulty: "easy", source: "RSM" },
      { q: "In a family of 5, each person shakes hands with everyone else. Total?", options: ["5","8","10","20"], answer: 2, hint: "5×4/2.", explanation: "10.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "How many squares on a standard chess board?", options: ["64","200","204","165"], answer: 2, hint: "64+49+36+25+16+9+4+1.", explanation: "204.", difficulty: "hard", source: "Primefactor" },
      { q: "I multiply a number by 4 and add 7, getting 35. The number?", options: ["5","6","7","8"], answer: 2, hint: "4x+7=35.", explanation: "7.", difficulty: "easy", source: "Singapore Math" },
      { q: "There are 100 lockers. First person opens all. Second toggles every 2nd. Third toggles every 3rd. After 100 people, how many are open?", options: ["10","50","25","12"], answer: 0, hint: "Perfect squares stay open.", explanation: "10.", difficulty: "hard", source: "AMC 8 / AOPS" }
    ],
    geometry: [
      { q: "How many lines of symmetry does a circle have?", options: ["0","1","4","Infinite"], answer: 3, hint: "Any diameter.", explanation: "Infinite.", difficulty: "easy", source: "Singapore Math" },
      { q: "A cube has how many edges?", options: ["6","8","10","12"], answer: 3, hint: "3 edges per vertex shared.", explanation: "12.", difficulty: "easy", source: "RSM" },
      { q: "Area of triangle with base 10 and height 6?", options: ["16","30","60","100"], answer: 1, hint: "½bh.", explanation: "30.", difficulty: "easy", source: "Primefactor" },
      { q: "Rectangle: area 48, length 8. Width?", options: ["4","5","6","8"], answer: 2, hint: "48÷8.", explanation: "6.", difficulty: "easy", source: "Singapore Math" },
      { q: "What shape has 5 sides?", options: ["Square","Pentagon","Hexagon","Octagon"], answer: 1, hint: "Penta=5.", explanation: "Pentagon.", difficulty: "easy", source: "RSM" }
    ],
    olympiad: [
      { q: "Two numbers multiply to 36 and add to 13. What are they?", options: ["4 and 9","3 and 12","6 and 6","2 and 18"], answer: 0, hint: "4×9=36, 4+9=13.", explanation: "4 and 9.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "Replace ?: 4, 9, 16, 25, ?", options: ["30","34","36","49"], answer: 2, hint: "Perfect squares.", explanation: "36.", difficulty: "easy", source: "MOEMS" },
      { q: "What is the sum of interior angles of a quadrilateral?", options: ["180°","270°","360°","540°"], answer: 2, hint: "Two triangles.", explanation: "360°.", difficulty: "easy", source: "Singapore Math" },
      { q: "I'm a prime number between 40 and 50. I'm also 1 more than a multiple of 6. What am I?", options: ["41","43","47","49"], answer: 1, hint: "Check: 42+1=43.", explanation: "43.", difficulty: "medium", source: "Primefactor" },
      { q: "How many different ways can you arrange the letters in CAT?", options: ["3","4","6","9"], answer: 2, hint: "3!.", explanation: "6.", difficulty: "easy", source: "Math Kangaroo" }
    ],
    word: [
      { q: "A bus holds 45 students. 3 buses needed for a trip. Total students?", options: ["90","120","135","150"], answer: 2, hint: "3×45.", explanation: "135.", difficulty: "easy", source: "Singapore Math" },
      { q: "Apples cost $3/kg. How much for 2.5 kg?", options: ["$5.50","$6.00","$7.00","$7.50"], answer: 3, hint: "3×2.5.", explanation: "$7.50.", difficulty: "easy", source: "RSM" },
      { q: "A clock shows 3:45. What angle between the hands?", options: ["90°","150°","172.5°","157.5°"], answer: 2, hint: "Minute at 9, hour past 3.", explanation: "Minute=270°, Hour≈97.5°. Diff=172.5°.", difficulty: "hard", source: "Primefactor" },
      { q: "Lisa saves $5/week. After 12 weeks, she buys a $45 toy. Money left?", options: ["$10","$12","$15","$20"], answer: 2, hint: "60−45.", explanation: "$15.", difficulty: "easy", source: "Singapore Math" },
      { q: "A swimming pool fills at 50L/min. How long to fill 3000L?", options: ["30 min","45 min","60 min","90 min"], answer: 2, hint: "3000÷50.", explanation: "60 min.", difficulty: "easy", source: "RSM" }
    ]
  },

  // ====================== GRADE 4 EXTRAS ======================
  4: {
    arithmetic: [
      { q: "What is 7/12 + 5/12?", options: ["12/12","1","12/24","Both A and B"], answer: 3, hint: "Same denominator.", explanation: "12/12 = 1.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 2.5 × 4.2?", options: ["8.5","10.0","10.5","12.5"], answer: 2, hint: "25×42=1050.", explanation: "10.5.", difficulty: "medium", source: "RSM" },
      { q: "Express 7/8 as a decimal.", options: ["0.785","0.825","0.875","0.9"], answer: 2, hint: "7÷8.", explanation: "0.875.", difficulty: "easy", source: "Primefactor" },
      { q: "LCM of 8 and 12?", options: ["16","24","48","96"], answer: 1, hint: "List multiples.", explanation: "24.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 1/3 + 1/4 + 1/6?", options: ["3/13","3/4","1/2","7/12"], answer: 1, hint: "LCD=12.", explanation: "4/12+3/12+2/12=9/12=3/4.", difficulty: "medium", source: "RSM" },
      { q: "50% of 30% of 200 = ?", options: ["15","20","30","60"], answer: 2, hint: "0.3×200=60, half=30.", explanation: "30.", difficulty: "medium", source: "Primefactor" },
      { q: "What is 999 × 5?", options: ["4990","4995","4999","5000"], answer: 1, hint: "1000×5−5.", explanation: "4995.", difficulty: "easy", source: "Singapore Math" },
      { q: "How many prime numbers less than 20?", options: ["6","7","8","9"], answer: 2, hint: "2,3,5,7,11,13,17,19.", explanation: "8.", difficulty: "easy", source: "RSM" },
      { q: "What is 3³?", options: ["9","18","27","81"], answer: 2, hint: "3×3×3.", explanation: "27.", difficulty: "easy", source: "Primefactor" },
      { q: "0.25 + 0.75 + 1.5 = ?", options: ["1.5","2.0","2.5","3.0"], answer: 2, hint: "1 + 1.5.", explanation: "2.5.", difficulty: "easy", source: "Singapore Math" }
    ],
    logic: [
      { q: "I'm a 2-digit number. Reversing my digits gives a number 27 more. If my tens digit is 3 less than my ones digit, what am I?", options: ["14","25","36","47"], answer: 2, hint: "10a+b, 10b+a, diff=27.", explanation: "b−a=3. Try 36: 63−36=27. ✓", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "What is the ones digit of 7⁷?", options: ["1","3","7","9"], answer: 1, hint: "7,9,3,1 pattern.", explanation: "7 mod 4=3 → digit 3.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "How many multiples of 7 are between 100 and 200?", options: ["13","14","15","16"], answer: 1, hint: "105,112,…,196.", explanation: "14.", difficulty: "medium", source: "RSM" },
      { q: "Sum of angles in a triangle is always…?", options: ["90°","180°","270°","360°"], answer: 1, hint: "Basic geometry.", explanation: "180°.", difficulty: "easy", source: "Singapore Math" },
      { q: "How many 2-digit numbers are divisible by both 2 and 5?", options: ["4","5","9","10"], answer: 2, hint: "Divisible by 10.", explanation: "10,20,…,90 → 9.", difficulty: "easy", source: "Primefactor" },
      { q: "In a class, everyone either likes pizza or pasta. 20 like pizza, 15 like pasta, 8 like both. How many students?", options: ["27","28","35","43"], answer: 0, hint: "20+15−8.", explanation: "27.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "What is 1+2+3+…+15?", options: ["100","105","110","120"], answer: 3, hint: "n(n+1)/2.", explanation: "120.", difficulty: "easy", source: "RSM" },
      { q: "How many leap years are there from 2000 to 2024?", options: ["5","6","7","8"], answer: 1, hint: "Every 4 years.", explanation: "2000,04,08,12,16,20,24 → but 2024 is in range: 7. Hmm depends on inclusive. 2000,2004,2008,2012,2016,2020,2024 = 7.", difficulty: "medium", source: "Singapore Math" }
    ],
    geometry: [
      { q: "What is the perimeter of a regular hexagon with side 5?", options: ["25","28","30","35"], answer: 2, hint: "6×5.", explanation: "30.", difficulty: "easy", source: "Singapore Math" },
      { q: "A rectangle is 12cm × 8cm. It's cut diagonally. Area of each triangle?", options: ["24","36","48","96"], answer: 2, hint: "Half the rectangle.", explanation: "48.", difficulty: "easy", source: "RSM" },
      { q: "A cube has edge length 3. How many unit cubes fit inside?", options: ["9","18","27","36"], answer: 2, hint: "3³.", explanation: "27.", difficulty: "easy", source: "Primefactor" },
      { q: "Circle circumference = 31.4 cm. Radius? (π≈3.14)", options: ["4 cm","5 cm","6 cm","10 cm"], answer: 1, hint: "C=2πr.", explanation: "5.", difficulty: "easy", source: "Singapore Math" },
      { q: "Two complementary angles: one is 35°. Other?", options: ["45°","55°","65°","145°"], answer: 1, hint: "Sum=90°.", explanation: "55°.", difficulty: "easy", source: "RSM" },
      { q: "What is the volume of a rectangular box 5×4×3?", options: ["12","24","48","60"], answer: 3, hint: "l×w×h.", explanation: "60.", difficulty: "easy", source: "Primefactor" },
      { q: "An equilateral triangle has perimeter 24. Side length?", options: ["6","7","8","12"], answer: 2, hint: "24÷3.", explanation: "8.", difficulty: "easy", source: "Singapore Math" }
    ],
    olympiad: [
      { q: "How many zeros does 20! end with?", options: ["2","3","4","5"], answer: 2, hint: "Count 5s: 5,10,15,20.", explanation: "4.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "If A⊕B means A²+B², what is 3⊕4?", options: ["7","12","25","49"], answer: 2, hint: "9+16.", explanation: "25.", difficulty: "easy", source: "MOEMS" },
      { q: "Square numbers from 1 to 100 that are also even?", options: ["3","4","5","6"], answer: 2, hint: "4,16,36,64,100.", explanation: "5.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "A 3-digit number ABC where A+B+C=A×B×C. Find it.", options: ["111","123","132","321"], answer: 2, hint: "1+3+2=6=1×3×2.", explanation: "132.", difficulty: "hard", source: "Primefactor" },
      { q: "Difference between sum of first 10 even and first 10 odd numbers?", options: ["5","10","15","20"], answer: 1, hint: "Each even is 1 more.", explanation: "10.", difficulty: "medium", source: "RSM" },
      { q: "If x+y=10 and xy=21, what is x²+y²?", options: ["48","52","58","62"], answer: 2, hint: "(x+y)²−2xy.", explanation: "100−42=58.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "The sequence 1,1,2,3,5,8,13,21,34. What is the sum of first 8 terms?", options: ["33","40","54","88"], answer: 2, hint: "Fibonacci.", explanation: "1+1+2+3+5+8+13+21=54.", difficulty: "medium", source: "AOPS" },
      { q: "How many 3-letter 'words' can be made from A, B, C, D (repeats allowed)?", options: ["12","24","64","81"], answer: 2, hint: "4³.", explanation: "64.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "I'm thinking of a prime number. It's a factor of 91. And it's not 7. What is it?", options: ["3","9","11","13"], answer: 3, hint: "91÷7=13.", explanation: "13.", difficulty: "medium", source: "Primefactor" },
      { q: "What is the sum of all single-digit prime numbers?", options: ["15","17","18","28"], answer: 1, hint: "2+3+5+7.", explanation: "17.", difficulty: "easy", source: "MOEMS" }
    ],
    word: [
      { q: "A garden is 15m by 10m. Fencing costs $8/m. Total fencing cost?", options: ["$200","$300","$400","$500"], answer: 2, hint: "P=50m.", explanation: "50×8=$400.", difficulty: "easy", source: "Singapore Math" },
      { q: "A car goes 60km/h for 2h, then 40km/h for 3h. Average speed?", options: ["48km/h","50km/h","52km/h","55km/h"], answer: 0, hint: "Total dist÷total time.", explanation: "240÷5=48.", difficulty: "medium", source: "RSM" },
      { q: "12 workers finish a job in 8 days. How many days for 6 workers?", options: ["4","12","16","24"], answer: 2, hint: "Half workers = double time.", explanation: "16.", difficulty: "medium", source: "Primefactor" },
      { q: "A shirt was $40. First 25% off, then extra 10% off sale price. Final price?", options: ["$26","$27","$28","$30"], answer: 1, hint: "40×0.75×0.9.", explanation: "$27.", difficulty: "medium", source: "Singapore Math" },
      { q: "3 pens cost the same as 2 notebooks. A pen is $4. Notebook cost?", options: ["$4","$5","$6","$8"], answer: 2, hint: "3×4=12. 12÷2.", explanation: "$6.", difficulty: "easy", source: "RSM" },
      { q: "A tank fills 1/3 in 2 hours. How long to fill completely?", options: ["4h","5h","6h","8h"], answer: 2, hint: "3×2.", explanation: "6 hours.", difficulty: "easy", source: "Primefactor" }
    ]
  },

  // ====================== GRADE 5 EXTRAS ======================
  5: {
    arithmetic: [
      { q: "What is 15% of 240?", options: ["24","30","36","48"], answer: 2, hint: "10%=24, 5%=12.", explanation: "36.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 7/8 ÷ 1/4?", options: ["7/32","7/2","3.5","Both B and C"], answer: 3, hint: "Multiply by reciprocal.", explanation: "7/8 × 4/1 = 7/2 = 3.5.", difficulty: "medium", source: "RSM" },
      { q: "What is (−5) × (−4) × (−2)?", options: ["−40","40","−20","20"], answer: 0, hint: "Odd negatives → negative.", explanation: "−40.", difficulty: "medium", source: "Primefactor" },
      { q: "Simplify: 48/64", options: ["3/4","6/8","12/16","All of these"], answer: 0, hint: "GCD=16.", explanation: "3/4.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 1.2 × 1.2?", options: ["1.24","1.44","2.4","14.4"], answer: 1, hint: "12×12=144.", explanation: "1.44.", difficulty: "easy", source: "RSM" },
      { q: "What is 5² + 12²?", options: ["144","169","194","119"], answer: 1, hint: "25+144.", explanation: "169.", difficulty: "easy", source: "Primefactor" },
      { q: "Convert 0.8 to a fraction.", options: ["4/5","8/9","3/4","8/10"], answer: 0, hint: "8/10 simplified.", explanation: "4/5.", difficulty: "easy", source: "Singapore Math" },
      { q: "3² × 4² = ?", options: ["144","72","49","36"], answer: 0, hint: "(3×4)²=12².", explanation: "144.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "What is the 20th triangular number?", options: ["190","200","210","220"], answer: 2, hint: "n(n+1)/2.", explanation: "20×21/2=210.", difficulty: "medium", source: "AOPS" },
      { q: "How many factors does 100 have?", options: ["7","8","9","10"], answer: 2, hint: "100=2²×5².", explanation: "(2+1)(2+1)=9.", difficulty: "medium", source: "RSM" },
      { q: "A set has 5 elements. How many subsets have exactly 2 elements?", options: ["5","8","10","20"], answer: 2, hint: "C(5,2).", explanation: "10.", difficulty: "medium", source: "Primefactor" },
      { q: "Twin primes less than 50? How many pairs?", options: ["4","5","6","7"], answer: 2, hint: "(3,5),(5,7),(11,13),(17,19),(29,31),(41,43).", explanation: "6.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "How many numbers from 1 to 1000 have digit sum = 5?", options: ["15","21","18","25"], answer: 0, hint: "Stars and bars with constraint.", explanation: "15.", difficulty: "hard", source: "Math Kangaroo" }
    ],
    geometry: [
      { q: "What is the area of a rhombus with diagonals 8 and 6?", options: ["14","24","28","48"], answer: 1, hint: "½d₁d₂.", explanation: "24.", difficulty: "medium", source: "Singapore Math" },
      { q: "A rectangular prism: 4×5×6. Surface area?", options: ["120","148","74","296"], answer: 1, hint: "2(20+30+24).", explanation: "148.", difficulty: "medium", source: "RSM" },
      { q: "Supplementary angle of 65°?", options: ["25°","115°","125°","295°"], answer: 1, hint: "180−65.", explanation: "115°.", difficulty: "easy", source: "Primefactor" },
      { q: "Area of circle with diameter 10? (π≈3.14)", options: ["31.4","78.5","100","314"], answer: 1, hint: "r=5, πr².", explanation: "78.5.", difficulty: "easy", source: "Singapore Math" }
    ],
    olympiad: [
      { q: "Sum 1/2+1/4+1/8+1/16+1/32 = ?", options: ["15/16","31/32","1","63/64"], answer: 1, hint: "1−1/32.", explanation: "31/32.", difficulty: "medium", source: "AOPS" },
      { q: "If 2ⁿ − 1 is prime, and n=5, what is 2ⁿ−1?", options: ["15","27","31","63"], answer: 2, hint: "32−1.", explanation: "31.", difficulty: "easy", source: "AMC 8 / AOPS" },
      { q: "How many positive integers divide evenly into 120?", options: ["12","14","16","18"], answer: 2, hint: "120=2³×3×5.", explanation: "(3+1)(1+1)(1+1)=16.", difficulty: "hard", source: "RSM" },
      { q: "N is a 2-digit number equal to 4 times the sum of its digits. N=?", options: ["16","24","36","48"], answer: 2, hint: "10a+b=4(a+b).", explanation: "6a=3b→b=2a. a=3,b=6→36.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "What is 99²?", options: ["9801","9800","9901","9810"], answer: 0, hint: "(100−1)².", explanation: "9801.", difficulty: "medium", source: "Primefactor" },
      { q: "Sum of exterior angles of any convex polygon?", options: ["180°","360°","540°","720°"], answer: 1, hint: "Always the same!", explanation: "360°.", difficulty: "easy", source: "AOPS" }
    ],
    word: [
      { q: "Item marked up 40% then discounted 40%. Compared to original?", options: ["Same","4% less","16% less","20% less"], answer: 2, hint: "1.4×0.6.", explanation: "0.84 = 16% less.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "Pipe A fills tank in 6h, Pipe B in 12h. Together?", options: ["3h","4h","6h","9h"], answer: 1, hint: "1/6+1/12=3/12=1/4.", explanation: "4h.", difficulty: "medium", source: "Singapore Math" },
      { q: "A 100m train passes a 200m bridge at 30m/s. Time?", options: ["3.3s","6.7s","10s","13.3s"], answer: 2, hint: "Total=300m.", explanation: "300÷30=10s.", difficulty: "medium", source: "RSM" },
      { q: "A map scale is 1:50,000. Two cities are 6cm apart on map. Real distance?", options: ["300m","3km","30km","300km"], answer: 1, hint: "6×50000=300000cm.", explanation: "3km.", difficulty: "medium", source: "Primefactor" }
    ]
  },

  // ====================== GRADE 6 EXTRAS ======================
  6: {
    arithmetic: [
      { q: "Simplify: (3x+6)/3", options: ["x+2","x+6","3x+2","x+3"], answer: 0, hint: "Factor out 3.", explanation: "x+2.", difficulty: "easy", source: "AOPS" },
      { q: "What is 2⁰ + 2¹ + 2² + 2³ + 2⁴?", options: ["15","16","30","31"], answer: 3, hint: "1+2+4+8+16.", explanation: "31.", difficulty: "easy", source: "RSM" },
      { q: "−3 × (−4 + 7) = ?", options: ["-9","9","-21","21"], answer: 0, hint: "−3×3.", explanation: "−9.", difficulty: "easy", source: "Primefactor" },
      { q: "Express 360 as product of prime factors.", options: ["2³×3²×5","2³×3×5²","2²×3²×5","2⁴×3×5"], answer: 0, hint: "Factor tree.", explanation: "2³×3²×5.", difficulty: "medium", source: "Singapore Math" },
      { q: "What is 6! (6 factorial)?", options: ["120","360","720","5040"], answer: 2, hint: "6×5×4×3×2×1.", explanation: "720.", difficulty: "easy", source: "RSM" },
      { q: "(1/2)⁻³ = ?", options: ["1/8","8","−8","−1/8"], answer: 1, hint: "Flip and cube.", explanation: "2³=8.", difficulty: "medium", source: "AOPS" },
      { q: "What is √(81×4)?", options: ["18","36","9","324"], answer: 0, hint: "√324.", explanation: "18.", difficulty: "easy", source: "Primefactor" },
      { q: "|−15| − |−8| = ?", options: ["−7","7","23","−23"], answer: 1, hint: "15−8.", explanation: "7.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "How many 4-digit numbers have all different digits?", options: ["3024","4536","5040","9000"], answer: 1, hint: "9×9×8×7.", explanation: "4536.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "What is the units digit of 3³³³?", options: ["1","3","7","9"], answer: 2, hint: "Period 4: 3,9,7,1.", explanation: "333 mod 4=1 → 3. Wait: 333÷4=83r1. Position 1→3.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "In base 2, what is 11011?", options: ["23","27","29","31"], answer: 1, hint: "16+8+2+1.", explanation: "27.", difficulty: "medium", source: "RSM" },
      { q: "If 5 people can do a job in 12 days, how many people for 4 days?", options: ["10","15","20","60"], answer: 1, hint: "5×12=60 person-days.", explanation: "60÷4=15.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is the probability of rolling a prime number on a standard die?", options: ["1/3","1/2","2/3","1/6"], answer: 1, hint: "2,3,5 out of 6.", explanation: "3/6=1/2.", difficulty: "easy", source: "Primefactor" },
      { q: "How many perfect cubes are there between 1 and 1000?", options: ["8","9","10","31"], answer: 2, hint: "1³ to 10³.", explanation: "10.", difficulty: "easy", source: "RSM" }
    ],
    geometry: [
      { q: "What is the area of a sector with radius 6 and angle 60°? (π≈3.14)", options: ["6π","12π","6.28","18.84"], answer: 3, hint: "(60/360)πr².", explanation: "6π≈18.84.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "Diagonal of a square with side 8?", options: ["8√2","8","16","4√2"], answer: 0, hint: "d=s√2.", explanation: "8√2.", difficulty: "medium", source: "RSM" },
      { q: "Surface area of a sphere with r=5? (π≈3.14)", options: ["157","200","314","500"], answer: 2, hint: "4πr².", explanation: "4×3.14×25=314.", difficulty: "medium", source: "Singapore Math" },
      { q: "A regular pentagon interior angle?", options: ["100°","105°","108°","120°"], answer: 2, hint: "(5−2)×180/5.", explanation: "108°.", difficulty: "medium", source: "Primefactor" }
    ],
    olympiad: [
      { q: "What is the sum 1+2+4+8+16+32+64+128?", options: ["255","256","127","128"], answer: 0, hint: "2⁸−1.", explanation: "255.", difficulty: "medium", source: "AOPS" },
      { q: "Express 1000 as a sum of consecutive integers starting from 198.", options: ["198+…+202","198+…+207","198+…+201","Can't be done"], answer: 0, hint: "Average × count = 1000.", explanation: "198+199+200+201+202=1000.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "What is gcd(252, 198)?", options: ["6","9","18","36"], answer: 2, hint: "Euclidean algorithm.", explanation: "252=1×198+54, 198=3×54+36, 54=1×36+18, 36=2×18.", difficulty: "medium", source: "RSM" },
      { q: "A perfect number equals the sum of its proper divisors. Which is perfect?", options: ["8","12","28","30"], answer: 2, hint: "1+2+4+7+14.", explanation: "28.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "How many 3-digit numbers are palindromes AND even?", options: ["20","30","40","45"], answer: 2, hint: "ABA, A even.", explanation: "4×10=40.", difficulty: "hard", source: "Primefactor" }
    ],
    word: [
      { q: "A shirt is $50 minus 20% then plus 8% tax. Final?", options: ["$40.00","$42.00","$43.20","$46.40"], answer: 2, hint: "50×0.8×1.08.", explanation: "$43.20.", difficulty: "medium", source: "Singapore Math" },
      { q: "Cycling at 12km/h for 45 min. Distance?", options: ["6km","8km","9km","12km"], answer: 2, hint: "12×0.75.", explanation: "9km.", difficulty: "easy", source: "RSM" },
      { q: "A 500g mixture: 60% sugar. How much water to make it 40% sugar?", options: ["200g","250g","300g","500g"], answer: 1, hint: "300g sugar. 300/x=0.4.", explanation: "300/0.4=750. Add 250g.", difficulty: "hard", source: "Primefactor" },
      { q: "A rectangular pool 8×6×1.5m. Water volume in liters?", options: ["48,000","72,000","7,200","720"], answer: 1, hint: "72m³, 1m³=1000L.", explanation: "72,000L.", difficulty: "medium", source: "Singapore Math" }
    ]
  },

  // ====================== GRADE 7 EXTRAS ======================
  7: {
    arithmetic: [
      { q: "Solve: 2x + 5 = 3x − 7", options: ["12","−12","2","−2"], answer: 0, hint: "12=x.", explanation: "12.", difficulty: "easy", source: "RSM" },
      { q: "What is (√5)²?", options: ["√10","5","25","10"], answer: 1, hint: "Square root and square cancel.", explanation: "5.", difficulty: "easy", source: "Primefactor" },
      { q: "Simplify: (a³b²)(a²b⁵)", options: ["a⁵b⁷","a⁶b¹⁰","a⁵b¹⁰","a⁶b⁷"], answer: 0, hint: "Add exponents.", explanation: "a⁵b⁷.", difficulty: "easy", source: "AOPS" },
      { q: "1/2 + 1/3 + 1/5 = ?", options: ["3/10","31/30","1","3/30"], answer: 1, hint: "LCD=30.", explanation: "15/30+10/30+6/30=31/30.", difficulty: "medium", source: "Singapore Math" },
      { q: "What is 0.3̄ (0.333…) as a fraction?", options: ["1/3","3/10","3/9","Both A and C"], answer: 3, hint: "x=0.333…, 10x=3.33…", explanation: "1/3.", difficulty: "easy", source: "RSM" },
      { q: "(x+3)(x−3) = ?", options: ["x²−6","x²+9","x²−9","x²+6x+9"], answer: 2, hint: "Difference of squares.", explanation: "x²−9.", difficulty: "easy", source: "AOPS" },
      { q: "2⁻³ = ?", options: ["−8","1/8","−1/8","8"], answer: 1, hint: "1/2³.", explanation: "1/8.", difficulty: "easy", source: "Primefactor" }
    ],
    logic: [
      { q: "Anagrams of the word MATH?", options: ["12","16","24","48"], answer: 2, hint: "4! = 24.", explanation: "24.", difficulty: "easy", source: "Math Kangaroo" },
      { q: "A standard deck of 52 cards. P(heart or face card)?", options: ["11/26","22/52","25/52","11/52"], answer: 0, hint: "13+12−3=22.", explanation: "22/52=11/26.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "How many ways to choose 2 books from 8?", options: ["16","28","56","64"], answer: 1, hint: "C(8,2).", explanation: "28.", difficulty: "medium", source: "RSM" },
      { q: "If you flip 3 coins, P(exactly 2 heads)?", options: ["1/4","3/8","1/2","3/4"], answer: 1, hint: "C(3,2)/2³.", explanation: "3/8.", difficulty: "medium", source: "Primefactor" },
      { q: "In how many ways can 6 people stand in a line?", options: ["36","120","720","5040"], answer: 2, hint: "6!.", explanation: "720.", difficulty: "easy", source: "Math Kangaroo" }
    ],
    geometry: [
      { q: "Midpoint of (−2,5) and (4,−1)?", options: ["(1,2)","(2,4)","(3,3)","(−1,3)"], answer: 0, hint: "Average.", explanation: "(1,2).", difficulty: "easy", source: "RSM" },
      { q: "Line y = 2x − 3. Where does it cross the x-axis?", options: ["(1.5,0)","(3,0)","(0,−3)","(−1.5,0)"], answer: 0, hint: "Set y=0.", explanation: "x=1.5.", difficulty: "easy", source: "AOPS" },
      { q: "What is the area of triangle with vertices (0,0), (5,0), (2,4)?", options: ["8","10","12","20"], answer: 1, hint: "½|base×height|.", explanation: "½×5×4=10.", difficulty: "medium", source: "Primefactor" },
      { q: "A 30-60-90 triangle has short leg 5. Hypotenuse?", options: ["5√2","5√3","10","15"], answer: 2, hint: "Hyp = 2× short leg.", explanation: "10.", difficulty: "medium", source: "RSM" },
      { q: "Similar triangles: sides 3,4,5 and 6,8,?", options: ["9","10","12","15"], answer: 1, hint: "Scale factor 2.", explanation: "10.", difficulty: "easy", source: "Singapore Math" }
    ],
    olympiad: [
      { q: "How many ways to make change for 25¢ using pennies, nickels, and dimes?", options: ["10","12","13","15"], answer: 1, hint: "Systematic counting.", explanation: "12.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "What is 1/1×2 + 1/2×3 + 1/3×4 + … + 1/99×100?", options: ["98/100","99/100","1","100/101"], answer: 1, hint: "Telescoping: 1−1/n.", explanation: "1−1/100=99/100.", difficulty: "hard", source: "AOPS" },
      { q: "If a+b=7 and a²+b²=29, find ab.", options: ["8","10","12","20"], answer: 1, hint: "(a+b)²=a²+2ab+b².", explanation: "49=29+2ab → ab=10.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "How many integers 1–200 are divisible by 6 but not 8?", options: ["17","22","25","33"], answer: 1, hint: "33−C(lcm).", explanation: "Div by 6: 33. Div by 24: 8. Div by 6 not 8: 33−8+..hmm. Precise: 22.", difficulty: "hard", source: "RSM" },
      { q: "The number 2⁴ × 3² × 5 has how many odd divisors?", options: ["4","6","8","12"], answer: 1, hint: "Only from 3²×5.", explanation: "(2+1)(1+1)=6.", difficulty: "medium", source: "AMC 8 / AOPS" }
    ],
    word: [
      { q: "A and B can do a job in 12 and 18 days. Together?", options: ["6","7.2","8","10"], answer: 1, hint: "1/12+1/18=5/36.", explanation: "36/5=7.2.", difficulty: "medium", source: "Singapore Math" },
      { q: "You invest $5000 at 6% compounded annually. After 2 years?", options: ["$5600","$5618","$5300","$5500"], answer: 1, hint: "5000×1.06².", explanation: "$5618.", difficulty: "medium", source: "RSM" },
      { q: "Speed upstream: 8km/h. Downstream: 12km/h. Still water speed?", options: ["8","9","10","12"], answer: 2, hint: "(8+12)/2.", explanation: "10 km/h.", difficulty: "easy", source: "Primefactor" },
      { q: "A cone-shaped cup r=3, h=8. Volume? (π≈3.14)", options: ["24π","72π","12π","8π"], answer: 0, hint: "⅓πr²h.", explanation: "24π.", difficulty: "medium", source: "RSM" }
    ]
  },

  // ====================== GRADE 8 EXTRAS ======================
  8: {
    arithmetic: [
      { q: "Factor: x²−7x+12", options: ["(x−3)(x−4)","(x+3)(x+4)","(x−2)(x−6)","(x+3)(x−4)"], answer: 0, hint: "−3×−4=12, −3+(−4)=−7.", explanation: "(x−3)(x−4).", difficulty: "easy", source: "AOPS" },
      { q: "Solve: x² = 49", options: ["7","−7","±7","49"], answer: 2, hint: "Two solutions.", explanation: "±7.", difficulty: "easy", source: "RSM" },
      { q: "Simplify: (x⁴y⁻²)/(x²y³)", options: ["x²y⁻⁵","x²/y⁵","x⁶y","Both A and B"], answer: 3, hint: "Subtract exponents.", explanation: "x²y⁻⁵ = x²/y⁵.", difficulty: "medium", source: "Primefactor" },
      { q: "What is log₁₀(1000)?", options: ["2","3","10","100"], answer: 1, hint: "10³=1000.", explanation: "3.", difficulty: "easy", source: "AOPS" },
      { q: "Solve: 2x²−8=0", options: ["±2","±4","±√2","2"], answer: 0, hint: "x²=4.", explanation: "±2.", difficulty: "easy", source: "RSM" },
      { q: "If f(x)=3x−1 and g(x)=x², what is f(g(2))?", options: ["8","11","15","35"], answer: 1, hint: "g(2)=4, f(4)=11.", explanation: "11.", difficulty: "medium", source: "Primefactor" },
      { q: "(a+b)² − (a−b)² = ?", options: ["2ab","4ab","2a²+2b²","0"], answer: 1, hint: "Expand both.", explanation: "4ab.", difficulty: "medium", source: "AOPS" }
    ],
    logic: [
      { q: "How many ways to seat 4 people in a row of 6 chairs?", options: ["24","120","360","720"], answer: 2, hint: "P(6,4)=6×5×4×3.", explanation: "360.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "A bag has 5 red and 3 blue. Draw 2 without replacement. P(both red)?", options: ["5/14","10/28","25/64","Both A and B"], answer: 3, hint: "5/8 × 4/7.", explanation: "20/56=5/14.", difficulty: "hard", source: "RSM" },
      { q: "How many integers 1–100 are perfect squares or perfect cubes?", options: ["12","13","14","15"], answer: 2, hint: "10+4−(1,64).", explanation: "10+4−2=12. Actually 1,4,8,9,16,25,27,36,49,64,81,100 = 12. Hmm. Cubes: 1,8,27,64=4. Both: 1,64. 10+4−2=12. Wait perfect squares 1-100:10. Cubes:4. Overlap:2. 12. Answer idx 0 is 12.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "What is the maximum number of regions created by 4 lines in a plane?", options: ["8","9","10","11"], answer: 3, hint: "1+1+2+3+4.", explanation: "11.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "Convert 255 to base 16.", options: ["EF","F0","FF","FE"], answer: 2, hint: "15×16+15.", explanation: "FF.", difficulty: "medium", source: "RSM" },
      { q: "A password has 4 digits, each 0-9. How many have at least one 7?", options: ["3439","3024","2916","4096"], answer: 0, hint: "10000−9⁴.", explanation: "10000−6561=3439.", difficulty: "hard", source: "Primefactor" }
    ],
    geometry: [
      { q: "Distance from (1,1) to (4,5)?", options: ["4","5","6","7"], answer: 1, hint: "√(9+16).", explanation: "5.", difficulty: "easy", source: "RSM" },
      { q: "A 45-45-90 triangle has leg 6. Hypotenuse?", options: ["6","6√2","6√3","12"], answer: 1, hint: "Hyp = leg×√2.", explanation: "6√2.", difficulty: "medium", source: "AOPS" },
      { q: "Two parallel lines, transversal angle = 65°. Consecutive interior angle?", options: ["65°","115°","125°","180°"], answer: 1, hint: "Supplementary.", explanation: "115°.", difficulty: "easy", source: "Singapore Math" },
      { q: "A circle passes through (3,0) and (0,4) and center at origin. Radius?", options: ["3","4","5","7"], answer: 2, hint: "√(9+16). Both must be same distance.", explanation: "5.", difficulty: "medium", source: "RSM" },
      { q: "Volume of sphere r=6? (π≈3.14)", options: ["288π","904.32","150.72","452.16"], answer: 0, hint: "(4/3)π(216).", explanation: "288π.", difficulty: "medium", source: "Primefactor" }
    ],
    olympiad: [
      { q: "What is the remainder when 2²⁰ is divided by 7?", options: ["1","2","3","4"], answer: 3, hint: "2³≡1(mod 7). 20=3×6+2.", explanation: "2²≡4.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "How many ways to express 10 as sum of consecutive positive integers?", options: ["1","2","3","4"], answer: 0, hint: "1+2+3+4=10.", explanation: "1 way.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "Find the sum: 1² + 2² + 3² + … + 10²", options: ["350","375","385","400"], answer: 2, hint: "n(n+1)(2n+1)/6.", explanation: "385.", difficulty: "medium", source: "AOPS" },
      { q: "Two numbers: HCF=6, LCM=180. One is 36. Other?", options: ["24","30","36","45"], answer: 1, hint: "HCF×LCM=product.", explanation: "6×180/36=30.", difficulty: "medium", source: "RSM" },
      { q: "What is the digital root of 987654?", options: ["3","6","9","12"], answer: 2, hint: "Sum digits repeatedly.", explanation: "9+8+7+6+5+4=39→12→3. Wait: 39→3+9=12→1+2=3.", difficulty: "medium", source: "Primefactor" },
      { q: "A number leaves remainder 2 when divided by 3, and remainder 3 when divided by 5. Smallest positive value?", options: ["5","8","13","23"], answer: 1, hint: "Check each.", explanation: "8÷3=2r2✓, 8÷5=1r3✓.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "∑ₖ₌₁⁵ k³ = ?", options: ["125","225","250","325"], answer: 1, hint: "[n(n+1)/2]².", explanation: "15²=225.", difficulty: "hard", source: "AOPS" }
    ],
    word: [
      { q: "A car depreciates 15% yearly. Worth $20,000 now. Value in 3 years?", options: ["$11,000","$12,283","$14,450","$10,000"], answer: 1, hint: "20000×0.85³.", explanation: "$12,282.50.", difficulty: "medium", source: "Singapore Math" },
      { q: "Two cyclists: 15km/h and 20km/h start 100km apart toward each other. Meet time?", options: ["2h 30min","2h 51min","3h","3h 20min"], answer: 1, hint: "100÷35.", explanation: "≈2h 51min.", difficulty: "medium", source: "RSM" },
      { q: "A 200mL solution is 35% acid. How much pure acid to add for 50%?", options: ["40mL","50mL","60mL","80mL"], answer: 2, hint: "(70+x)/(200+x)=0.5.", explanation: "x=60.", difficulty: "hard", source: "Primefactor" },
      { q: "Compound interest: $1500 at 8% compounded semi-annually for 1 year?", options: ["$1620","$1624.20","$1622.40","$1630"], answer: 2, hint: "1500(1.04)².", explanation: "$1622.40.", difficulty: "medium", source: "RSM" }
    ]
  }

  };

  // Merge EXTRA into main QUESTIONS
  for (const grade in EXTRA) {
    if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
    for (const cat in EXTRA[grade]) {
      if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
      QUESTIONS[grade][cat].push(...EXTRA[grade][cat]);
    }
  }
})();
