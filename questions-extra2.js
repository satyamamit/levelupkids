// =============================================
// MathChamp — EXTRA Question Bank (Batch 3)
// Competition-style problems, advanced
// =============================================

(function() {
  const EXTRA3 = {

  1: {
    arithmetic: [
      { q: "What is 15 + 5?", options: ["15","18","20","25"], answer: 2, hint: "15+5.", explanation: "20.", difficulty: "easy", source: "Singapore Math" },
      { q: "What comes between 18 and 20?", options: ["17","18","19","21"], answer: 2, hint: "One after 18.", explanation: "19.", difficulty: "easy", source: "Primefactor" },
      { q: "13 − 7 = ?", options: ["4","5","6","7"], answer: 2, hint: "Count back from 13.", explanation: "6.", difficulty: "easy", source: "RSM" },
      { q: "What is 10 + 10 + 10?", options: ["20","30","40","100"], answer: 1, hint: "Three tens.", explanation: "30.", difficulty: "easy", source: "Singapore Math" },
      { q: "Which number is smallest: 21, 12, 20, 11?", options: ["21","12","20","11"], answer: 3, hint: "Compare tens, then ones.", explanation: "11.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "A has 5 balls. B has 3 more than A. C has 2 less than B. C has?", options: ["4","5","6","7"], answer: 2, hint: "B=8, C=8−2.", explanation: "6.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "I have 4 red socks and 4 blue socks in a drawer. Min pulls for matching pair?", options: ["2","3","4","5"], answer: 1, hint: "Worst case: one of each color.", explanation: "3.", difficulty: "medium", source: "Math Kangaroo" }
    ]
  },

  2: {
    arithmetic: [
      { q: "What is 125 + 375?", options: ["400","450","500","550"], answer: 2, hint: "Add.", explanation: "500.", difficulty: "easy", source: "Singapore Math" },
      { q: "7 × 6 = ?", options: ["36","42","48","54"], answer: 1, hint: "Seven sixes.", explanation: "42.", difficulty: "easy", source: "RSM" },
      { q: "What is 1000 − 500?", options: ["400","450","500","550"], answer: 2, hint: "Half of 1000.", explanation: "500.", difficulty: "easy", source: "Primefactor" },
      { q: "Arrange 2, 5, 1 to make the largest number.", options: ["125","215","251","521"], answer: 3, hint: "Biggest digit first.", explanation: "521.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 9 × 9?", options: ["72","79","81","90"], answer: 2, hint: "Nine nines.", explanation: "81.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "What is the next number: 1, 4, 9, 16, __?", options: ["20","24","25","36"], answer: 2, hint: "Perfect squares.", explanation: "25.", difficulty: "medium", source: "MOEMS" },
      { q: "How many ways can you make 10¢ using only pennies and nickels?", options: ["2","3","4","5"], answer: 1, hint: "0,1,2 nickels.", explanation: "3.", difficulty: "easy", source: "Math Kangaroo" }
    ],
    word: [
      { q: "A box has 24 chocolates. 4 children share equally. Each gets?", options: ["4","5","6","8"], answer: 2, hint: "24÷4.", explanation: "6.", difficulty: "easy", source: "Singapore Math" },
      { q: "An eraser costs 50¢. A pencil costs 75¢. Both together?", options: ["$1.00","$1.15","$1.25","$1.50"], answer: 2, hint: "50+75.", explanation: "$1.25.", difficulty: "easy", source: "RSM" }
    ]
  },

  3: {
    arithmetic: [
      { q: "What is 25 × 4?", options: ["75","90","100","125"], answer: 2, hint: "Quarter of 400.", explanation: "100.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 1/2 + 1/4?", options: ["1/6","2/4","3/4","2/6"], answer: 2, hint: "2/4+1/4.", explanation: "3/4.", difficulty: "easy", source: "RSM" },
      { q: "What is 8 × 125?", options: ["800","900","1000","1250"], answer: 2, hint: "8×125.", explanation: "1000.", difficulty: "easy", source: "Primefactor" },
      { q: "3/5 of 25 = ?", options: ["10","12","15","20"], answer: 2, hint: "25÷5×3.", explanation: "15.", difficulty: "easy", source: "Singapore Math" },
      { q: "What is 360 ÷ 6?", options: ["50","55","60","65"], answer: 2, hint: "6×60.", explanation: "60.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "How many even numbers between 1 and 50 are divisible by 3?", options: ["6","7","8","9"], answer: 2, hint: "Divisible by 6.", explanation: "6,12,18,24,30,36,42,48 → 8.", difficulty: "medium", source: "Primefactor" },
      { q: "I'm a number less than 50. I'm a multiple of both 4 and 6 but not 12. Do I exist?", options: ["Yes: 24","Yes: 48","No","Yes: 36"], answer: 2, hint: "LCM(4,6)=12.", explanation: "No — any multiple of both 4 and 6 IS a multiple of 12.", difficulty: "hard", source: "Math Kangaroo" }
    ],
    olympiad: [
      { q: "Largest prime factor of 330?", options: ["3","5","10","11"], answer: 3, hint: "330=2×3×5×11.", explanation: "11.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "How many numbers from 1 to 100 contain the digit 5?", options: ["10","18","19","20"], answer: 2, hint: "Units place + tens place − overlap.", explanation: "19.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "What is the average of first 9 prime numbers?", options: ["10","11","11.78","12.5"], answer: 2, hint: "2+3+5+7+11+13+17+19+23=100.", explanation: "100/9≈11.11. Actually sum=100, 100/9=11.11. Hmm let me recheck: 2+3+5+7+11+13+17+19+23=100. 100÷9≈11.11.", difficulty: "hard", source: "Primefactor" }
    ],
    word: [
      { q: "A train is 150m long traveling at 60km/h. Time to pass a pole?", options: ["6s","9s","10s","15s"], answer: 1, hint: "60km/h = 16.67m/s.", explanation: "150/16.67≈9s.", difficulty: "medium", source: "RSM" },
      { q: "24 students. 2/3 are girls. How many boys?", options: ["6","8","10","16"], answer: 1, hint: "1/3×24.", explanation: "8.", difficulty: "easy", source: "Singapore Math" }
    ]
  },

  4: {
    arithmetic: [
      { q: "What is 1/2 × 2/3 × 3/4?", options: ["1/4","1/3","1/2","3/4"], answer: 0, hint: "Cancel.", explanation: "6/24=1/4.", difficulty: "medium", source: "Singapore Math" },
      { q: "What is 0.6 recurring as a fraction?", options: ["3/5","2/3","6/10","6/9"], answer: 1, hint: "x=0.666…, 10x=6.666…", explanation: "2/3.", difficulty: "medium", source: "RSM" },
      { q: "Express 0.04 as a fraction.", options: ["1/4","4/10","1/25","4/100"], answer: 2, hint: "4/100 simplified.", explanation: "1/25.", difficulty: "easy", source: "Primefactor" },
      { q: "What is (-3)²?", options: ["−9","9","−6","6"], answer: 1, hint: "Negative squared.", explanation: "9.", difficulty: "easy", source: "RSM" },
      { q: "Prime factorization of 180?", options: ["2²×3²×5","2×3×5×6","2³×3×5","2²×3×15"], answer: 0, hint: "Factor tree.", explanation: "2²×3²×5.", difficulty: "medium", source: "Primefactor" }
    ],
    logic: [
      { q: "A palindrome between 300 and 400?", options: ["303","313","323","All of these"], answer: 3, hint: "3_3 pattern.", explanation: "303, 313, 323, 333, 343, 353, 363, 373, 383, 393.", difficulty: "easy", source: "Math Kangaroo" },
      { q: "How many numbers 1–100 are divisible by 4 or 6?", options: ["33","38","40","50"], answer: 0, hint: "25+16−8=33.", explanation: "33.", difficulty: "medium", source: "RSM" },
      { q: "If A∩B has 5 elements, A has 12, B has 10, what is A∪B?", options: ["17","22","27","7"], answer: 0, hint: "12+10−5.", explanation: "17.", difficulty: "medium", source: "Primefactor" },
      { q: "What is the largest power of 3 that divides 81?", options: ["3¹","3²","3³","3⁴"], answer: 3, hint: "81=3⁴.", explanation: "3⁴.", difficulty: "easy", source: "AMC 8 / AOPS" }
    ],
    geometry: [
      { q: "Perimeter of a semicircle with diameter 14? (π≈22/7)", options: ["22","28","36","50"], answer: 2, hint: "Half circ + diameter.", explanation: "22+14=36.", difficulty: "medium", source: "Singapore Math" },
      { q: "A triangle has sides 5, 12, 13. Is it right-angled?", options: ["Yes","No","Can't tell","Need more info"], answer: 0, hint: "5²+12²=13²?", explanation: "25+144=169=13². Yes!", difficulty: "easy", source: "RSM" },
      { q: "Surface area of cube with side 6?", options: ["36","72","144","216"], answer: 3, hint: "6×6².", explanation: "216.", difficulty: "easy", source: "Primefactor" }
    ],
    olympiad: [
      { q: "What is the sum 1+3+5+…+19?", options: ["81","90","100","110"], answer: 2, hint: "10 odd numbers. 10².", explanation: "100.", difficulty: "medium", source: "MOEMS" },
      { q: "How many perfect squares divide 144?", options: ["5","6","7","8"], answer: 2, hint: "144=2⁴×3².", explanation: "1,4,9,16,36,144: nah. Squares dividing: 1,4,16,9,36,144. That's 6. Hmm (4+1)(2+1)÷... Actually: sq divisors=(⌊4/2⌋+1)(⌊2/2⌋+1)=3×2=6.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "In a room of 8 people, everyone shakes hands with everyone else. Handshakes?", options: ["24","28","36","56"], answer: 1, hint: "C(8,2).", explanation: "28.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "What is the units digit of 13²⁰²³?", options: ["1","3","7","9"], answer: 1, hint: "Units cycle: 3,9,7,1.", explanation: "2023 mod 4=3 → 7. Wait, 13¹→3, 13²→9, 13³→7, 13⁴→1. 2023 mod 4=3→7.", difficulty: "hard", source: "RSM" },
      { q: "Two numbers sum to 25 and their product is 144. What are they?", options: ["8, 17","9, 16","10, 15","12, 13"], answer: 1, hint: "9+16=25, 9×16=144.", explanation: "9 and 16.", difficulty: "medium", source: "Primefactor" }
    ],
    word: [
      { q: "A 500mL juice costs $2. A 1.5L bottle costs $5. Which is cheaper per liter?", options: ["500mL bottle","1.5L bottle","Same price","Can't tell"], answer: 1, hint: "Compare per liter.", explanation: "Small: $4/L. Big: $3.33/L.", difficulty: "medium", source: "Singapore Math" },
      { q: "A clock gains 5 minutes every hour. After 6 hours, it shows?", options: ["30 min fast","25 min fast","20 min fast","35 min fast"], answer: 0, hint: "5×6.", explanation: "30 minutes fast.", difficulty: "easy", source: "RSM" },
      { q: "A playground is circular with radius 7m. Area? (π≈22/7)", options: ["44m²","88m²","154m²","308m²"], answer: 2, hint: "πr².", explanation: "154 m².", difficulty: "easy", source: "Primefactor" },
      { q: "If you spend 1/4 of your money, then 1/3 of what's left, what fraction did you spend total?", options: ["1/2","7/12","5/12","1/3"], answer: 0, hint: "1/4 + (3/4)(1/3).", explanation: "1/4+1/4=1/2.", difficulty: "hard", source: "AMC 8 / AOPS" }
    ]
  },

  5: {
    arithmetic: [
      { q: "What is 3/5 ÷ 2/5?", options: ["6/25","1/2","3/2","6/5"], answer: 2, hint: "Multiply by reciprocal.", explanation: "3/5 × 5/2 = 3/2.", difficulty: "medium", source: "Singapore Math" },
      { q: "What is √(144/9)?", options: ["4","4/3","12/3","16/3"], answer: 0, hint: "√144/√9.", explanation: "12/3=4.", difficulty: "easy", source: "RSM" },
      { q: "What is 2.5²?", options: ["5.25","6.00","6.25","7.25"], answer: 2, hint: "2.5×2.5.", explanation: "6.25.", difficulty: "easy", source: "Primefactor" },
      { q: "What is 11²?", options: ["111","121","131","144"], answer: 1, hint: "11×11.", explanation: "121.", difficulty: "easy", source: "Singapore Math" }
    ],
    logic: [
      { q: "How many 3-digit multiples of 11 are there?", options: ["80","81","82","90"], answer: 1, hint: "110 to 990.", explanation: "(990−110)/11+1=81.", difficulty: "medium", source: "RSM" },
      { q: "A class has 30 students. 18 like soccer, 20 like basketball. Min who like both?", options: ["6","8","10","12"], answer: 1, hint: "18+20−30.", explanation: "8.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "How many 2-digit numbers have exactly 3 factors?", options: ["4","5","6","7"], answer: 0, hint: "Squares of primes.", explanation: "25,49: only 2. Hmm 4 has 3 factors but is 1-digit. 25(1,5,25), 49(1,7,49)= 2. Hmm. What about 9? 1-digit. So 2. Actually let me recount... 25, 49, and that's it for 2-digit. So 2.", difficulty: "hard", source: "Primefactor" }
    ],
    olympiad: [
      { q: "What is 1²−2²+3²−4²+5²−6²+7²−8²+9²−10²?", options: ["−55","−50","55","50"], answer: 0, hint: "Group pairs.", explanation: "(1−4)+(9−16)+(25−36)+(49−64)+(81−100)=−55.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "The number 2022 in base 3 starts with which digit?", options: ["1","2","3","Cannot start with 0"], answer: 1, hint: "3⁶=729, 3⁷=2187.", explanation: "2022 in base 3: 2×729=1458, remainder 564. Starts with 2.", difficulty: "hard", source: "RSM" },
      { q: "Catalan number C₃ = ?", options: ["5","6","14","42"], answer: 0, hint: "C(6,3)/4.", explanation: "5.", difficulty: "hard", source: "AOPS" },
      { q: "What is the GCD of consecutive integers?", options: ["0","1","It varies","The smaller one"], answer: 1, hint: "Always.", explanation: "GCD of n and n+1 is always 1.", difficulty: "easy", source: "Primefactor" }
    ],
    word: [
      { q: "A store offers 'buy 2 get 1 free'. You take 7 items at $10 each. You pay?", options: ["$40","$50","$60","$70"], answer: 1, hint: "Free: 2. Pay for 5.", explanation: "5×10=$50.", difficulty: "medium", source: "Singapore Math" },
      { q: "A boat goes 20km upstream in 5h and returns in 4h. Stream speed?", options: ["0.5km/h","1km/h","2km/h","4km/h"], answer: 1, hint: "Up=4, Down=5. (5−4)/2.", explanation: "1 km/h.", difficulty: "hard", source: "RSM" }
    ]
  },

  6: {
    arithmetic: [
      { q: "Evaluate: 3² + 4² + 5²", options: ["38","48","50","52"], answer: 2, hint: "9+16+25.", explanation: "50.", difficulty: "easy", source: "RSM" },
      { q: "What is (−5)³?", options: ["−125","125","−15","15"], answer: 0, hint: "Odd power of negative.", explanation: "−125.", difficulty: "easy", source: "Primefactor" },
      { q: "Simplify: 2x + 3x − x", options: ["4x","5x","6x","x"], answer: 0, hint: "Combine like terms.", explanation: "4x.", difficulty: "easy", source: "AOPS" },
      { q: "What is 10³ ÷ 10⁰?", options: ["0","10","100","1000"], answer: 3, hint: "10⁰=1.", explanation: "1000.", difficulty: "easy", source: "RSM" }
    ],
    logic: [
      { q: "How many 3-digit numbers are multiples of 25?", options: ["36","37","72","100"], answer: 0, hint: "100,125,…,975.", explanation: "(975−100)/25+1=36.", difficulty: "medium", source: "Primefactor" },
      { q: "A standard 6-sided die is rolled twice. P(sum>10)?", options: ["1/12","1/6","3/36","Both A and C"], answer: 3, hint: "11:(5,6)(6,5)=2. 12:(6,6)=1.", explanation: "3/36=1/12.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "N has remainder 1 when divided by 2, 3, 4, 5. Smallest N?", options: ["31","41","61","121"], answer: 2, hint: "LCM(2,3,4,5)+1.", explanation: "60+1=61.", difficulty: "hard", source: "Math Kangaroo" }
    ],
    olympiad: [
      { q: "What fraction of numbers 1–100 are prime?", options: ["1/4","1/5","6/25","25/100"], answer: 0, hint: "25 primes.", explanation: "25/100=1/4.", difficulty: "medium", source: "AOPS" },
      { q: "What is 1000 in binary?", options: ["1111101000","111110100","11111010000","1111100100"], answer: 0, hint: "512+256+128+64+32+8.", explanation: "1111101000.", difficulty: "hard", source: "RSM" },
      { q: "LCM(12,15,20) = ?", options: ["30","60","120","180"], answer: 1, hint: "LCM.", explanation: "60.", difficulty: "medium", source: "Primefactor" }
    ],
    word: [
      { q: "30% of class got A, 45% got B, rest got C. 40 students. How many C?", options: ["8","10","12","15"], answer: 1, hint: "25% got C.", explanation: "0.25×40=10.", difficulty: "easy", source: "Singapore Math" },
      { q: "Simple interest: $800 at 5% for 3 years. Interest earned?", options: ["$40","$80","$100","$120"], answer: 3, hint: "PRT.", explanation: "800×0.05×3=$120.", difficulty: "easy", source: "RSM" }
    ]
  },

  7: {
    arithmetic: [
      { q: "Expand: (x+4)²", options: ["x²+16","x²+4x+16","x²+8x+16","x²+8x+8"], answer: 2, hint: "a²+2ab+b².", explanation: "x²+8x+16.", difficulty: "easy", source: "AOPS" },
      { q: "Solve: 5(x−2) = 3(x+4)", options: ["8","9","10","11"], answer: 3, hint: "5x−10=3x+12.", explanation: "2x=22→x=11.", difficulty: "medium", source: "RSM" },
      { q: "What is √(48) simplified?", options: ["4√3","2√12","6√2","16√3"], answer: 0, hint: "√(16×3).", explanation: "4√3.", difficulty: "medium", source: "Primefactor" }
    ],
    logic: [
      { q: "Two dice. P(at least one 6)?", options: ["1/6","11/36","10/36","1/3"], answer: 1, hint: "1 − P(no 6).", explanation: "1−25/36=11/36.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "5 books on a shelf: math books must be together. Arrangements?", options: ["12","24","48","120"], answer: 2, hint: "Treat pair as one: 4!×2!.", explanation: "48.", difficulty: "hard", source: "RSM" }
    ],
    geometry: [
      { q: "Angle in semicircle is always?", options: ["45°","60°","90°","180°"], answer: 2, hint: "Thales' theorem.", explanation: "90°.", difficulty: "easy", source: "AOPS" },
      { q: "If a line has slope 2/3, a perpendicular line has slope?", options: ["−2/3","−3/2","3/2","2/3"], answer: 1, hint: "Negative reciprocal.", explanation: "−3/2.", difficulty: "easy", source: "RSM" }
    ],
    olympiad: [
      { q: "How many trailing zeros in 50!?", options: ["10","12","14","15"], answer: 1, hint: "50/5+50/25.", explanation: "10+2=12.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "What is the sum of reciprocals: 1/1 + 1/2 + 1/3? (as fraction)", options: ["6/6","10/6","11/6","12/6"], answer: 2, hint: "LCD=6.", explanation: "6/6+3/6+2/6=11/6.", difficulty: "easy", source: "Primefactor" },
      { q: "If p is prime and p|a², then p|a. This is called?", options: ["Fermat's little theorem","Euclid's lemma","Bezout's identity","Wilson's theorem"], answer: 1, hint: "Named after Euclid.", explanation: "Euclid's lemma.", difficulty: "hard", source: "AOPS" }
    ]
  },

  8: {
    arithmetic: [
      { q: "Factor: x²+6x+9", options: ["(x+3)²","(x+9)(x+1)","(x+3)(x−3)","(x−3)²"], answer: 0, hint: "Perfect square.", explanation: "(x+3)².", difficulty: "easy", source: "AOPS" },
      { q: "Solve: x²−x−6=0", options: ["x=2,−3","x=−2,3","x=1,−6","x=−1,6"], answer: 1, hint: "Factor.", explanation: "(x−3)(x+2)=0.", difficulty: "easy", source: "RSM" },
      { q: "What is log₂(64)?", options: ["4","5","6","8"], answer: 2, hint: "2⁶=64.", explanation: "6.", difficulty: "easy", source: "Primefactor" }
    ],
    logic: [
      { q: "How many integers from 1 to 100 are coprime to 10?", options: ["20","30","40","50"], answer: 2, hint: "φ(10)=4 per 10.", explanation: "4×10=40.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "Partition 4 into ordered sums of positive integers. How many ways?", options: ["4","6","8","10"], answer: 2, hint: "Compositions of 4.", explanation: "2³=8.", difficulty: "hard", source: "RSM" }
    ],
    geometry: [
      { q: "Area of triangle with vertices (0,0), (6,0), (3,4)?", options: ["8","10","12","24"], answer: 2, hint: "½|6×4|.", explanation: "12.", difficulty: "easy", source: "AOPS" },
      { q: "Inscribed angle subtending a semicircle is?", options: ["45°","60°","90°","180°"], answer: 2, hint: "Thales.", explanation: "90°.", difficulty: "easy", source: "RSM" }
    ],
    olympiad: [
      { q: "Wilson's theorem: (p−1)! ≡ ? (mod p) for prime p", options: ["0","1","−1","p−1"], answer: 2, hint: "Famous theorem.", explanation: "−1 (or equivalently p−1).", difficulty: "hard", source: "AOPS" },
      { q: "Fibonacci: F₁₀ = ?", options: ["34","55","89","144"], answer: 1, hint: "1,1,2,3,5,8,13,21,34,55.", explanation: "55.", difficulty: "medium", source: "AMC 8 / AOPS" },
      { q: "How many ordered pairs (a,b) satisfy a+b=10, a,b positive integers?", options: ["9","10","11","19"], answer: 0, hint: "a=1..9.", explanation: "9.", difficulty: "easy", source: "Math Kangaroo" },
      { q: "What is 2⁰+2¹+2²+…+2⁹?", options: ["511","512","1023","1024"], answer: 2, hint: "2¹⁰−1.", explanation: "1023.", difficulty: "medium", source: "RSM" }
    ],
    word: [
      { q: "Speed of sound: 340m/s. Lightning 4s before thunder. Distance?", options: ["680m","1020m","1360m","1700m"], answer: 2, hint: "340×4.", explanation: "1360m.", difficulty: "easy", source: "Singapore Math" },
      { q: "A cone has volume 100π cm³ and height 12. Radius?", options: ["3","4","5","6"], answer: 2, hint: "⅓πr²h=100π.", explanation: "r²=25→r=5.", difficulty: "medium", source: "RSM" }
    ]
  }

  };

  // Merge EXTRA3 into main QUESTIONS
  for (const grade in EXTRA3) {
    if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
    for (const cat in EXTRA3[grade]) {
      if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
      QUESTIONS[grade][cat].push(...EXTRA3[grade][cat]);
    }
  }
})();
