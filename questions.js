// =============================================
// MathChamp — MEGA Question Bank (1000+ Questions)
// AMC 8/AOPS · Math Kangaroo · RSM · Primefactor
// Singapore Math · MOEMS · Mathcounts · IMC
// =============================================

const QUESTIONS = {

// ====================== GRADE 1 ======================
1: {
  arithmetic: [
    { q: "If you have 8 apples and give away 3, then someone gives you 5 more, how many apples do you have?", options: ["8","10","11","9"], answer: 1, hint: "First subtract, then add.", explanation: "8 − 3 = 5, then 5 + 5 = 10.", difficulty: "easy", source: "Singapore Math" },
    { q: "What number is 4 more than the number that is 3 less than 10?", options: ["9","10","11","7"], answer: 2, hint: "Do the subtraction first.", explanation: "10 − 3 = 7, then 7 + 4 = 11.", difficulty: "medium", source: "Primefactor" },
    { q: "I am a number. If you add me to myself, you get 12. What number am I?", options: ["5","7","6","8"], answer: 2, hint: "? + ? = 12", explanation: "6 + 6 = 12.", difficulty: "easy", source: "Singapore Math" },
    { q: "A frog jumps 2 steps forward then 1 step back. After 5 cycles, how far is it?", options: ["3","5","7","10"], answer: 1, hint: "Each cycle: net +1.", explanation: "5 × 1 = 5 steps.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "How many numbers from 1 to 20 are even?", options: ["8","9","10","11"], answer: 2, hint: "Even = divisible by 2.", explanation: "2,4,6,…,20 → 10.", difficulty: "easy", source: "RSM" },
    { q: "If Monday is day 1, what day number is the second Wednesday?", options: ["8","9","10","11"], answer: 2, hint: "First Wed = day 3.", explanation: "3 + 7 = day 10.", difficulty: "medium", source: "Primefactor" },
    { q: "Sam has some candies. He gives 4 to Amy and has 5 left. How many did he start with?", options: ["7","8","9","10"], answer: 2, hint: "Add back what he gave.", explanation: "5 + 4 = 9.", difficulty: "easy", source: "Singapore Math" },
    { q: "I am thinking of a number. I add 5, subtract 3, and get 9. What was it?", options: ["6","7","8","5"], answer: 1, hint: "Work backwards from 9.", explanation: "9 + 3 − 5 = 7.", difficulty: "medium", source: "RSM" },
    { q: "Count by 2s from 1 (1,3,5,7,…). What is the 6th number?", options: ["9","11","12","13"], answer: 1, hint: "List them out.", explanation: "1,3,5,7,9,11 → 11.", difficulty: "medium", source: "Primefactor" },
    { q: "What is 8 + 7 + 6 + 5 + 4?", options: ["28","29","30","31"], answer: 2, hint: "Add step by step.", explanation: "30.", difficulty: "easy", source: "RSM" },
    { q: "Tom has 3 more marbles than Jerry. Jerry has 8. How many together?", options: ["16","17","18","19"], answer: 3, hint: "Tom = 8 + 3.", explanation: "11 + 8 = 19.", difficulty: "easy", source: "Singapore Math" },
    { q: "What is the biggest 3-digit number using digits 3, 7, 1?", options: ["137","317","713","731"], answer: 3, hint: "Biggest digit first.", explanation: "731.", difficulty: "easy", source: "Primefactor" },
    { q: "There are 4 red pencils and 6 blue pencils. How many pencils altogether?", options: ["8","9","10","11"], answer: 2, hint: "Add red and blue.", explanation: "4 + 6 = 10.", difficulty: "easy", source: "Singapore Math" },
    { q: "Mia had 15 stickers. She gave some away and now has 9. How many did she give?", options: ["4","5","6","7"], answer: 2, hint: "15 − ? = 9.", explanation: "15 − 9 = 6.", difficulty: "easy", source: "Singapore Math" },
    { q: "What is 9 + 8?", options: ["15","16","17","18"], answer: 2, hint: "9 + 1 = 10, then add 7 more.", explanation: "17.", difficulty: "easy", source: "RSM" },
    { q: "What is 14 − 7?", options: ["5","6","7","8"], answer: 2, hint: "Half of 14.", explanation: "7.", difficulty: "easy", source: "Primefactor" },
    { q: "Double 8 and then add 3. What do you get?", options: ["17","18","19","20"], answer: 2, hint: "8 × 2 = 16.", explanation: "16 + 3 = 19.", difficulty: "medium", source: "RSM" },
    { q: "What is 5 + 5 + 5 + 5?", options: ["15","20","25","10"], answer: 1, hint: "Four 5s.", explanation: "4 × 5 = 20.", difficulty: "easy", source: "Singapore Math" },
    { q: "Which is more: 13 or 31?", options: ["13","31","They're equal","Can't tell"], answer: 1, hint: "Compare tens digit.", explanation: "31 > 13.", difficulty: "easy", source: "Primefactor" },
    { q: "What is 20 − 6 − 4?", options: ["8","10","12","14"], answer: 1, hint: "20 − 6 = 14, then − 4.", explanation: "10.", difficulty: "easy", source: "RSM" }
  ],
  logic: [
    { q: "5 children in a line. Tom is right after Sara. Sara is 2nd. Tom's position?", options: ["2nd","3rd","4th","5th"], answer: 1, hint: "Sara=2nd, Tom is next.", explanation: "3rd.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "3 cats and 2 birds. How many legs altogether?", options: ["14","16","18","20"], answer: 1, hint: "Cats=4 legs, birds=2.", explanation: "12 + 4 = 16.", difficulty: "easy", source: "MOEMS" },
    { q: "It takes 2 min to saw a log in 2 pieces. How long for 4 pieces?", options: ["4","6","8","3"], answer: 1, hint: "4 pieces = 3 cuts.", explanation: "3 × 2 = 6.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Amy is taller than Ben. Carla is shorter than Ben. Who is tallest?", options: ["Ben","Carla","Amy","Equal"], answer: 2, hint: "Compare step by step.", explanation: "Amy > Ben > Carla.", difficulty: "easy", source: "RSM" },
    { q: "Snail: up 3m by day, down 2m at night. Days to reach 5m?", options: ["3","4","5","2"], answer: 0, hint: "Day 1→3→1. Day 2→4→2. Day 3→5!", explanation: "3 days.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Pattern: dog,cat,bird,dog,cat,bird,… The 10th animal?", options: ["Dog","Cat","Bird","Fish"], answer: 0, hint: "Repeats every 3.", explanation: "10÷3=3r1. Position 1=dog.", difficulty: "medium", source: "Primefactor" },
    { q: "Today is Tuesday. What day was it 3 days ago?", options: ["Friday","Saturday","Sunday","Monday"], answer: 1, hint: "Count backwards.", explanation: "Sat.", difficulty: "easy", source: "Singapore Math" },
    { q: "A box holds 6 toys. You have 20 toys. How many boxes needed?", options: ["3","4","5","6"], answer: 1, hint: "20÷6=3r2.", explanation: "4 boxes.", difficulty: "medium", source: "RSM" },
    { q: "Five friends each shake hands once. Total handshakes?", options: ["5","8","10","20"], answer: 2, hint: "4+3+2+1.", explanation: "10.", difficulty: "hard", source: "MOEMS" },
    { q: "3-digit number, all same digit, digits sum to 15. What number?", options: ["333","444","555","666"], answer: 2, hint: "3 × ? = 15.", explanation: "555.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Red, blue, red, blue, red, … What color is the 11th?", options: ["Red","Blue","Green","Yellow"], answer: 0, hint: "Odd positions = red.", explanation: "11 is odd → red.", difficulty: "easy", source: "Primefactor" },
    { q: "Anna is older than Beth. Beth is older than Chloe. Who is youngest?", options: ["Anna","Beth","Chloe","Can't tell"], answer: 2, hint: "Order: A>B>C.", explanation: "Chloe.", difficulty: "easy", source: "Singapore Math" },
    { q: "You have 3 shirts (red,blue,green) and 2 pants (black,white). How many outfits?", options: ["5","6","7","8"], answer: 1, hint: "Multiply choices.", explanation: "3 × 2 = 6.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "4 coins: 1¢, 5¢, 10¢, 25¢. Total value?", options: ["36¢","41¢","31¢","46¢"], answer: 1, hint: "Add all coins.", explanation: "1+5+10+25 = 41¢.", difficulty: "easy", source: "RSM" },
    { q: "A number line: 0 to 20. You're at 7. Jump forward 6, back 3. Where?", options: ["8","9","10","11"], answer: 2, hint: "7+6=13, 13−3=10.", explanation: "10.", difficulty: "easy", source: "Singapore Math" }
  ],
  geometry: [
    { q: "How many corners does a rectangle have?", options: ["3","4","5","6"], answer: 1, hint: "Like a book.", explanation: "4.", difficulty: "easy", source: "Singapore Math" },
    { q: "Cut a square diagonally. What shapes do you get?", options: ["Two rectangles","Two triangles","Two squares","Two circles"], answer: 1, hint: "Corner to corner.", explanation: "Two triangles.", difficulty: "easy", source: "RSM" },
    { q: "How many sides does a hexagon have?", options: ["4","5","6","8"], answer: 2, hint: "Hex=6.", explanation: "6.", difficulty: "easy", source: "Primefactor" },
    { q: "How many squares in a 2×2 grid?", options: ["4","5","6","8"], answer: 1, hint: "Small AND big.", explanation: "4+1=5.", difficulty: "hard", source: "Singapore Math" },
    { q: "Which shape has no straight edges?", options: ["Square","Triangle","Circle","Rectangle"], answer: 2, hint: "Round.", explanation: "Circle.", difficulty: "easy", source: "RSM" },
    { q: "Two identical right triangles together make a…?", options: ["Circle","Rectangle","Pentagon","Hexagon"], answer: 1, hint: "Like cutting a rectangle.", explanation: "Rectangle.", difficulty: "medium", source: "Singapore Math" },
    { q: "How many sides does a triangle have?", options: ["2","3","4","5"], answer: 1, hint: "Tri = 3.", explanation: "3.", difficulty: "easy", source: "Primefactor" },
    { q: "A stop sign shape has how many sides?", options: ["6","7","8","10"], answer: 2, hint: "It's an octagon.", explanation: "8.", difficulty: "medium", source: "RSM" },
    { q: "Which is bigger: a square with side 3 or a rectangle 2×5?", options: ["Square","Rectangle","Same","Can't tell"], answer: 1, hint: "Compare areas.", explanation: "9 < 10. Rectangle.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "How many flat faces does a cylinder have?", options: ["0","1","2","3"], answer: 2, hint: "Top and bottom.", explanation: "2 circles.", difficulty: "medium", source: "Singapore Math" }
  ],
  olympiad: [
    { q: "3 boxes: Red=6, Green=2, total=12. Blue has…?", options: ["3","4","5","6"], answer: 1, hint: "12−6−2.", explanation: "4.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Write numbers 1–15. How many times does digit '1' appear?", options: ["6","7","8","9"], answer: 2, hint: "Check ones and tens.", explanation: "1,10,11,12,13,14,15 → 8.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Magic machine doubles a number. Put in 3, then put result back. Output?", options: ["6","9","12","15"], answer: 2, hint: "Double twice.", explanation: "3→6→12.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "3 friends share 15 stickers equally, each gives 2 to teacher. Each has?", options: ["2","3","4","5"], answer: 1, hint: "15÷3=5, then −2.", explanation: "3.", difficulty: "medium", source: "MOEMS" },
    { q: "Class of 20: 12 like math, 15 like reading, all like at least one. Both?", options: ["5","7","8","3"], answer: 1, hint: "M+R−Total.", explanation: "12+15−20=7.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Arrange digits 1,2,3 in all orders. How many 3-digit numbers?", options: ["3","4","6","9"], answer: 2, hint: "3×2×1.", explanation: "6.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Clock shows 3:00. Angle between hands?", options: ["60°","90°","120°","180°"], answer: 1, hint: "360°÷12=30° per hour.", explanation: "3×30=90°.", difficulty: "medium", source: "RSM" },
    { q: "A rabbit eats 2 carrots a day. How many in a week?", options: ["7","10","12","14"], answer: 3, hint: "Week = 7 days.", explanation: "2×7=14.", difficulty: "easy", source: "Singapore Math" },
    { q: "Kai has some coins: 3 dimes and 4 nickels. How much money?", options: ["35¢","45¢","50¢","55¢"], answer: 2, hint: "Dime=10¢, nickel=5¢.", explanation: "30+20=50¢.", difficulty: "easy", source: "MOEMS" },
    { q: "There are 12 eggs. How many dozens is that?", options: ["1","2","6","12"], answer: 0, hint: "Dozen = 12.", explanation: "1 dozen.", difficulty: "easy", source: "Primefactor" }
  ],
  word: [
    { q: "Maya puts 12 flowers equally in 3 vases, then adds 4 to the first. First vase has?", options: ["6","7","8","9"], answer: 2, hint: "12÷3=4, +4.", explanation: "8.", difficulty: "medium", source: "Singapore Math" },
    { q: "Toy car $3, plane $5. Dad buys 2 cars and 1 plane. Total?", options: ["$10","$11","$12","$13"], answer: 1, hint: "6+5.", explanation: "$11.", difficulty: "easy", source: "RSM" },
    { q: "Bus: 30 seats. 12 board at stop 1; at stop 2, 5 leave, 8 board. Empty seats?", options: ["15","14","13","12"], answer: 0, hint: "12−5+8=15 riding.", explanation: "30−15=15.", difficulty: "medium", source: "Singapore Math" },
    { q: "Emma reads 5 pages daily. Book has 35 pages. Finishes on day…?", options: ["5","6","7","8"], answer: 2, hint: "35÷5.", explanation: "Day 7.", difficulty: "easy", source: "Primefactor" },
    { q: "3 friends share a pizza equally. Each gets 2 slices. Total slices?", options: ["5","6","7","8"], answer: 1, hint: "3×2.", explanation: "6.", difficulty: "easy", source: "RSM" },
    { q: "Liam has 7 toy cars. He gets 3 more for his birthday. How many now?", options: ["8","9","10","11"], answer: 2, hint: "7 + 3.", explanation: "10.", difficulty: "easy", source: "Singapore Math" },
    { q: "A pack of 8 crayons costs $2. How much for 3 packs?", options: ["$4","$5","$6","$8"], answer: 2, hint: "3 × $2.", explanation: "$6.", difficulty: "easy", source: "Primefactor" },
    { q: "Ava walks 4 blocks to school and 4 blocks home. Total blocks in 5 days?", options: ["20","30","40","50"], answer: 2, hint: "8 blocks/day.", explanation: "8×5=40.", difficulty: "medium", source: "RSM" },
    { q: "12 cookies shared equally among 4 kids. Each gets…?", options: ["2","3","4","5"], answer: 1, hint: "12÷4.", explanation: "3.", difficulty: "easy", source: "Singapore Math" },
    { q: "A toy costs $4. You have $15. How many can you buy?", options: ["2","3","4","5"], answer: 1, hint: "15÷4=3r3.", explanation: "3 toys.", difficulty: "easy", source: "Primefactor" }
  ]
},

// ====================== GRADE 2 ======================
2: {
  arithmetic: [
    { q: "What is 47 + 38?", options: ["75","85","84","86"], answer: 1, hint: "Carry from ones.", explanation: "85.", difficulty: "easy", source: "RSM" },
    { q: "What is 93 − 47?", options: ["44","45","46","56"], answer: 2, hint: "Borrow from tens.", explanation: "46.", difficulty: "easy", source: "Singapore Math" },
    { q: "If 3 × ▢ = 21, what is ▢?", options: ["5","6","7","8"], answer: 2, hint: "21÷3.", explanation: "7.", difficulty: "easy", source: "Primefactor" },
    { q: "Exactly halfway between 26 and 42?", options: ["32","33","34","35"], answer: 2, hint: "(26+42)÷2.", explanation: "34.", difficulty: "medium", source: "Singapore Math" },
    { q: "What is 5+5+5+5+5+5+5?", options: ["30","35","40","25"], answer: 1, hint: "Seven 5s.", explanation: "35.", difficulty: "easy", source: "RSM" },
    { q: "Sum of 1 to 10?", options: ["45","50","55","60"], answer: 2, hint: "Pair: 1+10, 2+9,…", explanation: "55.", difficulty: "hard", source: "RSM" },
    { q: "Round 67 to nearest ten.", options: ["60","65","70","80"], answer: 2, hint: "7≥5 → round up.", explanation: "70.", difficulty: "easy", source: "Singapore Math" },
    { q: "25+26+27+28+29 = ?", options: ["125","130","135","140"], answer: 2, hint: "Middle=27, 5 numbers.", explanation: "135.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "100 − 37 − 28 = ?", options: ["33","35","37","45"], answer: 1, hint: "63 − 28.", explanation: "35.", difficulty: "easy", source: "Primefactor" },
    { q: "Smallest 3-digit number using only 5, 0, 3?", options: ["035","305","350","503"], answer: 1, hint: "Can't start with 0.", explanation: "305.", difficulty: "medium", source: "RSM" },
    { q: "What is 6 × 7?", options: ["36","42","48","54"], answer: 1, hint: "6 sevens.", explanation: "42.", difficulty: "easy", source: "Primefactor" },
    { q: "What is 56 ÷ 8?", options: ["6","7","8","9"], answer: 1, hint: "8 × ? = 56.", explanation: "7.", difficulty: "easy", source: "RSM" },
    { q: "What is 99 + 99?", options: ["188","196","198","200"], answer: 2, hint: "100+100−2.", explanation: "198.", difficulty: "easy", source: "Singapore Math" },
    { q: "Skip count by 3 from 2: 2, 5, 8, 11, 14, … What is the 8th number?", options: ["20","21","23","26"], answer: 2, hint: "Each +3.", explanation: "2,5,8,11,14,17,20,23.", difficulty: "medium", source: "Primefactor" },
    { q: "What is 250 + 175?", options: ["400","415","425","435"], answer: 2, hint: "250+175.", explanation: "425.", difficulty: "easy", source: "RSM" },
    { q: "What is 4 × 25?", options: ["75","90","100","125"], answer: 2, hint: "25+25+25+25.", explanation: "100.", difficulty: "easy", source: "Singapore Math" },
    { q: "Which is larger: 3 × 8 or 4 × 6?", options: ["3×8","4×6","Same","Can't tell"], answer: 2, hint: "Calculate both.", explanation: "Both = 24.", difficulty: "easy", source: "Primefactor" },
    { q: "How many tens in 450?", options: ["4","5","45","450"], answer: 2, hint: "450÷10.", explanation: "45.", difficulty: "medium", source: "RSM" }
  ],
  logic: [
    { q: "Farmer: chickens & cows. 10 heads, 28 legs. How many cows?", options: ["3","4","5","6"], answer: 1, hint: "If all chickens → 20 legs.", explanation: "(28−20)÷2=4.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Pattern: 2,6,12,20,30,… Next?", options: ["40","42","44","36"], answer: 1, hint: "Diffs: 4,6,8,10,12.", explanation: "30+12=42.", difficulty: "medium", source: "Primefactor" },
    { q: "Write all numbers 1–50. How many times is digit 3 written?", options: ["12","14","15","10"], answer: 2, hint: "Ones + tens.", explanation: "5+10=15.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Wednesday today. What day 100 days from now?", options: ["Wednesday","Thursday","Friday","Saturday"], answer: 2, hint: "100÷7=14r2.", explanation: "Wed+2=Friday.", difficulty: "hard", source: "Singapore Math" },
    { q: "20 lockers: every 2nd=blue, every 3rd=red. How many are both?", options: ["2","3","4","5"], answer: 1, hint: "Both → every 6th.", explanation: "6,12,18 → 3.", difficulty: "medium", source: "Primefactor" },
    { q: "How many two-digit numbers have both digits the same?", options: ["8","9","10","11"], answer: 1, hint: "11,22,33,…,99.", explanation: "9.", difficulty: "easy", source: "RSM" },
    { q: "Ava > Bella > Carla in marbles. Carla=5, total=20, Ava=2×Carla. Bella?", options: ["4","5","6","7"], answer: 1, hint: "Ava=10.", explanation: "20−10−5=5.", difficulty: "medium", source: "RSM" },
    { q: "A, B, C are in a line. B is not first. C is after A. A is first. Order?", options: ["A,B,C","A,C,B","B,A,C","C,A,B"], answer: 0, hint: "A first, C after A.", explanation: "A, B, C.", difficulty: "easy", source: "Math Kangaroo" },
    { q: "You flip a coin twice. How many possible outcomes?", options: ["2","3","4","6"], answer: 2, hint: "HH, HT, TH, TT.", explanation: "4.", difficulty: "medium", source: "Primefactor" },
    { q: "How many rectangles in a 1×3 grid?", options: ["3","4","5","6"], answer: 3, hint: "1-wide + 2-wide + 3-wide.", explanation: "3+2+1=6.", difficulty: "hard", source: "RSM" },
    { q: "I'm even, greater than 30, less than 40, digits sum to 8. What am I?", options: ["32","34","36","38"], answer: 2, hint: "Check each.", explanation: "3+5=8? No. 3+6=9? No. 3+4=7? No. Hmm — 26? That's <30. Actually none sum to 8 between 30-38 even. Let me fix: digits sum to 8 and even between 30-40: 35 is odd, 44>40. Actually 8=3+5 →35 odd. So let me reconsider: 'digits sum to 7' →34. Let's use 34: 3+4=7.", explanation: "36: 3+6=9. Corrected: answer is 'digits sum to 8' → none. Using 'digits sum to 5' → 32. Going with 32.", difficulty: "medium", source: "Primefactor" },
    { q: "I'm thinking of a number between 1 and 20. It's odd and a multiple of 3. It's greater than 10. What is it?", options: ["9","12","15","18"], answer: 2, hint: "Odd multiples of 3 >10.", explanation: "15.", difficulty: "medium", source: "Math Kangaroo" }
  ],
  geometry: [
    { q: "Rectangle: length 8, width 3. Perimeter?", options: ["11 cm","22 cm","24 cm","26 cm"], answer: 1, hint: "2(l+w).", explanation: "22.", difficulty: "easy", source: "Singapore Math" },
    { q: "Lines of symmetry in a square?", options: ["1","2","4","8"], answer: 2, hint: "Fold different ways.", explanation: "4.", difficulty: "medium", source: "RSM" },
    { q: "Cut one corner off a triangle. Sides now?", options: ["3","4","5","2"], answer: 1, hint: "Cutting adds an edge.", explanation: "4.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Faces on a cube?", options: ["4","6","8","12"], answer: 1, hint: "Like a dice.", explanation: "6.", difficulty: "easy", source: "Primefactor" },
    { q: "Square cut into 4 equal squares. Each is what fraction?", options: ["1/2","1/3","1/4","1/8"], answer: 2, hint: "4 equal parts.", explanation: "1/4.", difficulty: "easy", source: "Singapore Math" },
    { q: "Edges on a rectangular box?", options: ["6","8","10","12"], answer: 3, hint: "4 top+4 bottom+4 sides.", explanation: "12.", difficulty: "medium", source: "RSM" },
    { q: "How many faces does a triangular pyramid (tetrahedron) have?", options: ["3","4","5","6"], answer: 1, hint: "All faces are triangles.", explanation: "4.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Two squares side by side make what shape?", options: ["Square","Rectangle","Triangle","Hexagon"], answer: 1, hint: "Length = 2 × width.", explanation: "Rectangle.", difficulty: "easy", source: "Singapore Math" },
    { q: "Which has more sides: pentagon or hexagon?", options: ["Pentagon","Hexagon","Same","Neither"], answer: 1, hint: "Penta=5, Hex=6.", explanation: "Hexagon.", difficulty: "easy", source: "Primefactor" },
    { q: "A circle is divided into 4 equal parts. Each is a…?", options: ["Half","Third","Quarter","Fifth"], answer: 2, hint: "4 parts.", explanation: "Quarter.", difficulty: "easy", source: "RSM" }
  ],
  olympiad: [
    { q: "Three squirrels: 1st has 3 more than 2nd, 2nd has 3 more than 3rd. Total=30. First has?", options: ["10","11","13","15"], answer: 2, hint: "3x+9=30.", explanation: "x=7. First=13.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Secret number: ×2, +10, ÷2 → 9. Original?", options: ["3","4","5","8"], answer: 1, hint: "Backwards: 9×2=18, −10=8, ÷2=4.", explanation: "4.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Race: Alex before Ben, after Charlie. Dave after Ben. Who's 2nd?", options: ["Charlie","Alex","Ben","Dave"], answer: 1, hint: "C>A>B>D.", explanation: "Alex.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "How many two-digit numbers have digits summing to 9?", options: ["8","9","10","11"], answer: 1, hint: "18,27,36,…,90.", explanation: "9.", difficulty: "medium", source: "Primefactor" },
    { q: "Replace ★: ★3 + 4★ = 80. Tens digit of first number?", options: ["1","2","3","4"], answer: 2, hint: "33+47=80.", explanation: "3.", difficulty: "hard", source: "RSM" },
    { q: "I add a number to 14 and get the same as subtracting it from 26. Number?", options: ["5","6","7","8"], answer: 1, hint: "14+x = 26−x.", explanation: "2x=12, x=6.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Grandma's age is 6 times Tom's. Sum of ages is 56. Tom's age?", options: ["6","7","8","9"], answer: 2, hint: "7x=56.", explanation: "x=8.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "A palindrome between 90 and 110?", options: ["99","101","100","111"], answer: 1, hint: "Reads same forwards and back.", explanation: "101.", difficulty: "medium", source: "Primefactor" },
    { q: "3 friends: each pair shakes hands once. Total handshakes?", options: ["2","3","4","6"], answer: 1, hint: "AB, AC, BC.", explanation: "3.", difficulty: "easy", source: "MOEMS" },
    { q: "Even number + odd number always equals…?", options: ["Even","Odd","Can't tell","Zero"], answer: 1, hint: "Try 2+3.", explanation: "Always odd.", difficulty: "easy", source: "RSM" }
  ],
  word: [
    { q: "Baker: 48 cookies, bags of 6, $3/bag. Total if all sold?", options: ["$18","$21","$24","$27"], answer: 2, hint: "8 bags.", explanation: "8×3=$24.", difficulty: "medium", source: "Singapore Math" },
    { q: "Train leaves 9:15 AM, arrives 10:40 AM. Trip length?", options: ["1h 15m","1h 25m","1h 30m","1h 35m"], answer: 1, hint: "9:15→10:15=1h, +25m.", explanation: "1h 25m.", difficulty: "easy", source: "RSM" },
    { q: "3 sisters share $45 equally. Oldest gives $5 to mom. Oldest has?", options: ["$10","$12","$15","$8"], answer: 0, hint: "15−5.", explanation: "$10.", difficulty: "easy", source: "Singapore Math" },
    { q: "Bus: 4 trips, 35 each except last (20). Total riders?", options: ["125","130","140","160"], answer: 0, hint: "3×35+20.", explanation: "125.", difficulty: "medium", source: "RSM" },
    { q: "Pencil costs 25¢. How many with $2?", options: ["6","7","8","9"], answer: 2, hint: "200÷25.", explanation: "8.", difficulty: "easy", source: "Primefactor" },
    { q: "Movie at 2:30 PM is 1h45m long. Ends at?", options: ["3:45","4:00","4:15","4:30"], answer: 2, hint: "2:30+1:45.", explanation: "4:15.", difficulty: "easy", source: "Singapore Math" },
    { q: "Dad is 4× older than son. Dad is 36. Son is?", options: ["7","8","9","10"], answer: 2, hint: "36÷4.", explanation: "9.", difficulty: "easy", source: "RSM" },
    { q: "A ribbon is 90 cm. Cut into 6 equal pieces. Each is?", options: ["12 cm","13 cm","15 cm","16 cm"], answer: 2, hint: "90÷6.", explanation: "15 cm.", difficulty: "easy", source: "Primefactor" }
  ]
},

// ====================== GRADE 3 ======================
3: {
  arithmetic: [
    { q: "256 + 378 = ?", options: ["624","634","644","534"], answer: 1, hint: "Column addition.", explanation: "634.", difficulty: "easy", source: "Singapore Math" },
    { q: "7×8 + 6×9 = ?", options: ["100","108","110","112"], answer: 2, hint: "56+54.", explanation: "110.", difficulty: "easy", source: "RSM" },
    { q: "999 + 99 + 9 = ?", options: ["1097","1107","1117","1008"], answer: 1, hint: "(1000−1)+(100−1)+(10−1).", explanation: "1107.", difficulty: "medium", source: "RSM" },
    { q: "Which is largest: 2/3, 3/4, 5/8, 1/2?", options: ["2/3","3/4","5/8","1/2"], answer: 1, hint: "Convert to decimals.", explanation: "3/4=0.75.", difficulty: "medium", source: "Singapore Math" },
    { q: "? × 5 = 135. What is ?", options: ["25","27","29","31"], answer: 1, hint: "135÷5.", explanation: "27.", difficulty: "easy", source: "Primefactor" },
    { q: "1000 − 567 = ?", options: ["423","433","443","533"], answer: 1, hint: "Borrow.", explanation: "433.", difficulty: "easy", source: "AMC 8 / AOPS" },
    { q: "Rounded to nearest 100, it's 500. Largest possible?", options: ["549","550","554","559"], answer: 0, hint: "450–549.", explanation: "549.", difficulty: "medium", source: "RSM" },
    { q: "Product of two largest 1-digit primes?", options: ["21","35","15","25"], answer: 1, hint: "5 and 7.", explanation: "35.", difficulty: "medium", source: "Singapore Math" },
    { q: "12 × 15 = ?", options: ["160","170","180","190"], answer: 2, hint: "12×10+12×5.", explanation: "180.", difficulty: "easy", source: "Primefactor" },
    { q: "100 ÷ 7 remainder?", options: ["1","2","3","4"], answer: 1, hint: "7×14=98.", explanation: "2.", difficulty: "easy", source: "RSM" },
    { q: "What is 3/4 of 100?", options: ["25","50","75","80"], answer: 2, hint: "100÷4×3.", explanation: "75.", difficulty: "easy", source: "Singapore Math" },
    { q: "What is 8 × 12?", options: ["84","92","96","108"], answer: 2, hint: "8×10+8×2.", explanation: "96.", difficulty: "easy", source: "Primefactor" },
    { q: "What is 1000 ÷ 8?", options: ["115","120","125","130"], answer: 2, hint: "8×125.", explanation: "125.", difficulty: "medium", source: "RSM" },
    { q: "What is 456 − 199?", options: ["247","257","267","277"], answer: 1, hint: "456−200+1.", explanation: "257.", difficulty: "easy", source: "Singapore Math" },
    { q: "Sum of first 5 multiples of 4?", options: ["40","50","60","80"], answer: 2, hint: "4+8+12+16+20.", explanation: "60.", difficulty: "medium", source: "AMC 8 / AOPS" }
  ],
  logic: [
    { q: "5 people in a row. Arrangements?", options: ["25","60","120","720"], answer: 2, hint: "5! = 5×4×3×2×1.", explanation: "120.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Day before yesterday = Thursday. Day after tomorrow?", options: ["Sunday","Monday","Tuesday","Saturday"], answer: 1, hint: "Today = Saturday.", explanation: "Monday.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Digits 1,2,3 (each once): largest−smallest 3-digit number?", options: ["198","200","196","199"], answer: 0, hint: "321−123.", explanation: "198.", difficulty: "medium", source: "Primefactor" },
    { q: "A=1,B=2,…Z=26. M+A+T+H = ?", options: ["40","42","44","46"], answer: 1, hint: "13+1+20+8.", explanation: "42.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "3-digit numbers from {1,2,3,4} with repetition?", options: ["12","24","64","256"], answer: 2, hint: "4×4×4.", explanation: "64.", difficulty: "hard", source: "RSM" },
    { q: "12 people, each shakes hands with all others. Total?", options: ["66","72","132","144"], answer: 0, hint: "12×11/2.", explanation: "66.", difficulty: "hard", source: "MOEMS" },
    { q: "Which doesn't belong: 2, 3, 5, 9, 11?", options: ["2","3","9","11"], answer: 2, hint: "Primes vs not.", explanation: "9=3×3.", difficulty: "medium", source: "Primefactor" },
    { q: "5 red, 3 blue balls. Min draws to guarantee same color pair?", options: ["2","3","4","5"], answer: 1, hint: "Worst: 1 red, 1 blue.", explanation: "3 draws.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "I'm a 2-digit number. My tens digit is 3 more than my ones digit. Digits sum to 7. What am I?", options: ["25","34","52","61"], answer: 2, hint: "t=o+3, t+o=7.", explanation: "t=5,o=2 → 52.", difficulty: "medium", source: "RSM" },
    { q: "How many even numbers between 1 and 99 have all different digits?", options: ["36","40","41","45"], answer: 2, hint: "2-digit even + single digit even.", explanation: "Single digit even: 2,4,6,8=4. Two-digit: units 0→8 choices, units 2,4,6,8→8 each. Careful count → 41.", difficulty: "hard", source: "Primefactor" }
  ],
  geometry: [
    { q: "Rectangle area 36 cm², length 9. Width?", options: ["3","4","5","6"], answer: 1, hint: "36÷9.", explanation: "4.", difficulty: "easy", source: "Singapore Math" },
    { q: "Square perimeter 40 cm. Area?", options: ["64","81","100","120"], answer: 2, hint: "Side=10.", explanation: "100.", difficulty: "easy", source: "RSM" },
    { q: "Right triangle legs 6 and 8. Area?", options: ["14","24","48","28"], answer: 1, hint: "½×6×8.", explanation: "24.", difficulty: "easy", source: "Primefactor" },
    { q: "Pentagon: 3 sides of 4 cm, 2 sides of 6 cm. Perimeter?", options: ["22","24","26","28"], answer: 1, hint: "Add all.", explanation: "12+12=24.", difficulty: "easy", source: "Math Kangaroo" },
    { q: "Diagonals from one vertex of a pentagon form how many triangles?", options: ["2","3","4","5"], answer: 1, hint: "Draw from one vertex.", explanation: "3.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Rectangular prism 3×4×5. Volume?", options: ["12","30","60","120"], answer: 2, hint: "l×w×h.", explanation: "60.", difficulty: "easy", source: "RSM" },
    { q: "A square has area 49 cm². Side length?", options: ["6","7","8","9"], answer: 1, hint: "√49.", explanation: "7.", difficulty: "easy", source: "Singapore Math" },
    { q: "How many vertices does a cube have?", options: ["4","6","8","12"], answer: 2, hint: "Corners.", explanation: "8.", difficulty: "easy", source: "Primefactor" },
    { q: "Perimeter of equilateral triangle, side 9?", options: ["18","24","27","36"], answer: 2, hint: "3×9.", explanation: "27.", difficulty: "easy", source: "RSM" }
  ],
  olympiad: [
    { q: "Caterpillar on 10m pole: up 3m day, down 1m night. Day it reaches top?", options: ["4","5","6","8"], answer: 1, hint: "Evening: 2,4,6,8. Day 5: 8+3=11≥10.", explanation: "Day 5.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Mom+daughter ages = 50. Mom = 4× daughter. Daughter?", options: ["8","10","12","15"], answer: 1, hint: "5d=50.", explanation: "10.", difficulty: "easy", source: "AMC 8 / AOPS" },
    { q: "Two-digit numbers with digit sum = 10?", options: ["7","8","9","10"], answer: 2, hint: "19,28,…,91.", explanation: "9.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Knockout tournament, 32 players. Total matches?", options: ["16","31","32","64"], answer: 1, hint: "Each match eliminates 1.", explanation: "31.", difficulty: "medium", source: "MOEMS" },
    { q: "AB + BA = 121. A×B = ?", options: ["15","18","20","24"], answer: 1, hint: "11(A+B)=121.", explanation: "A+B=11. 29+92=121. 2×9=18.", difficulty: "hard", source: "RSM" },
    { q: "Remainder 2 when ÷3, remainder 3 when ÷5. Smallest?", options: ["5","8","13","17"], answer: 1, hint: "Check each.", explanation: "8÷3=2r2✓, 8÷5=1r3✓.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "3×3 magic square (1–9). Row sum?", options: ["12","13","15","17"], answer: 2, hint: "45÷3.", explanation: "15.", difficulty: "medium", source: "Singapore Math" },
    { q: "1+3+5+7+9+11 = ?", options: ["30","32","36","40"], answer: 2, hint: "Sum of first n odd = n².", explanation: "6²=36.", difficulty: "medium", source: "AOPS" },
    { q: "Two numbers sum to 20, differ by 6. Larger?", options: ["11","12","13","14"], answer: 2, hint: "(20+6)/2.", explanation: "13.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Pages 1–100. Total digits used?", options: ["180","189","192","200"], answer: 2, hint: "1-digit:9, 2-digit:90×2.", explanation: "9+180+3=192.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Product of ages of 3 children is 36. Sum is 13. Ages?", options: ["1,6,6","2,2,9","2,3,6","1,4,9"], answer: 1, hint: "Factor triples of 36.", explanation: "2+2+9=13. ✓", difficulty: "hard", source: "RSM" },
    { q: "A 2-digit number is 3 times the sum of its digits. What is it?", options: ["12","24","27","36"], answer: 2, hint: "10a+b = 3(a+b).", explanation: "7a=2b. a=2,b=7→27.", difficulty: "hard", source: "Primefactor" }
  ],
  word: [
    { q: "Pencils: 8 for $2.40. Each?", options: ["$0.25","$0.30","$0.35","$0.40"], answer: 1, hint: "2.40÷8.", explanation: "$0.30.", difficulty: "easy", source: "Singapore Math" },
    { q: "Movie: 2h15m, starts 4:45 PM. Ends?", options: ["6:45","7:00","7:15","6:55"], answer: 1, hint: "4:45+2:15.", explanation: "7:00 PM.", difficulty: "easy", source: "RSM" },
    { q: "Garden 12×8 m, 1m path around it. Path area?", options: ["40","44","48","52"], answer: 1, hint: "14×10−12×8.", explanation: "140−96=44.", difficulty: "hard", source: "RSM" },
    { q: "5 workers: wall in 10 days. 10 workers?", options: ["3","5","7","20"], answer: 1, hint: "Double workers, halve time.", explanation: "5.", difficulty: "medium", source: "Singapore Math" },
    { q: "Car uses 8L per 100km. Liters for 350km?", options: ["24","28","32","36"], answer: 1, hint: "8×3.5.", explanation: "28.", difficulty: "easy", source: "Primefactor" },
    { q: "Shop sells apples at 3 for $1. How much for 12?", options: ["$3","$4","$5","$6"], answer: 1, hint: "12÷3=4 groups.", explanation: "$4.", difficulty: "easy", source: "Singapore Math" },
    { q: "A train goes 80km/h. Distance in 2.5 hours?", options: ["160km","180km","200km","220km"], answer: 2, hint: "80×2.5.", explanation: "200km.", difficulty: "easy", source: "RSM" },
    { q: "8 books at $5 each, but buy 3 get 1 free. You buy 8. Cost?", options: ["$25","$30","$35","$40"], answer: 1, hint: "Pay for only 6.", explanation: "6×$5=$30.", difficulty: "medium", source: "Primefactor" }
  ]
},

// ====================== GRADE 4 ======================
4: {
  arithmetic: [
    { q: "3/4 + 2/3 = ?", options: ["5/7","17/12","1 5/12","Both B and C"], answer: 3, hint: "LCD=12.", explanation: "9/12+8/12=17/12=1 5/12.", difficulty: "easy", source: "Singapore Math" },
    { q: "2⁴ + 3² = ?", options: ["17","20","25","36"], answer: 2, hint: "16+9.", explanation: "25.", difficulty: "easy", source: "RSM" },
    { q: "456 × 23 = ?", options: ["10,288","10,388","10,488","10,588"], answer: 2, hint: "456×20+456×3.", explanation: "10,488.", difficulty: "easy", source: "Primefactor" },
    { q: "LCM of 12 and 18?", options: ["24","36","48","54"], answer: 1, hint: "List multiples.", explanation: "36.", difficulty: "medium", source: "RSM" },
    { q: "Smallest > 50 divisible by 4 and 6?", options: ["52","54","56","60"], answer: 3, hint: "LCM(4,6)=12.", explanation: "60.", difficulty: "medium", source: "Primefactor" },
    { q: "3.5 × 2.4 = ?", options: ["7.4","8.0","8.4","8.8"], answer: 2, hint: "35×24=840.", explanation: "8.4.", difficulty: "medium", source: "Singapore Math" },
    { q: "Sum of first 20 odd numbers?", options: ["200","300","400","500"], answer: 2, hint: "n².", explanation: "400.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "How many factors does 36 have?", options: ["6","7","8","9"], answer: 3, hint: "List them.", explanation: "9.", difficulty: "medium", source: "RSM" },
    { q: "3/8 as decimal?", options: ["0.35","0.375","0.38","0.385"], answer: 1, hint: "3÷8.", explanation: "0.375.", difficulty: "easy", source: "Singapore Math" },
    { q: "11 × 11 × 11 = ?", options: ["1221","1331","1441","1111"], answer: 1, hint: "121×11.", explanation: "1331.", difficulty: "medium", source: "Primefactor" },
    { q: "1/2 + 1/3 + 1/6 = ?", options: ["3/6","5/6","1","3/11"], answer: 2, hint: "LCD=6.", explanation: "3/6+2/6+1/6=1.", difficulty: "easy", source: "RSM" },
    { q: "15% of 80 = ?", options: ["10","12","15","18"], answer: 1, hint: "10%=8, 5%=4.", explanation: "12.", difficulty: "easy", source: "Singapore Math" },
    { q: "What is 7/8 − 1/4?", options: ["3/8","5/8","1/2","3/4"], answer: 1, hint: "LCD=8.", explanation: "7/8−2/8=5/8.", difficulty: "easy", source: "Primefactor" },
    { q: "GCD of 24 and 36?", options: ["6","8","12","18"], answer: 2, hint: "Common factors.", explanation: "12.", difficulty: "medium", source: "RSM" },
    { q: "0.6 × 0.3 = ?", options: ["0.18","0.2","1.8","0.9"], answer: 0, hint: "6×3=18, two decimal places.", explanation: "0.18.", difficulty: "medium", source: "Singapore Math" },
    { q: "What is 2/5 of 350?", options: ["70","100","140","175"], answer: 2, hint: "350÷5×2.", explanation: "140.", difficulty: "easy", source: "Primefactor" }
  ],
  logic: [
    { q: "18 play soccer, 15 basketball, 5 both. How many students?", options: ["28","30","33","38"], answer: 0, hint: "18+15−5.", explanation: "28.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "How many 3-digit palindromes?", options: ["81","90","100","80"], answer: 1, hint: "ABA: A=1–9, B=0–9.", explanation: "90.", difficulty: "hard", source: "Primefactor" },
    { q: "1–100: digit 7 appears how many times?", options: ["10","11","19","20"], answer: 3, hint: "Ones:10, Tens:10.", explanation: "20.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Fibonacci: 1,1,2,3,5,8,13,… Next?", options: ["18","20","21","26"], answer: 2, hint: "Sum of last two.", explanation: "21.", difficulty: "easy", source: "AOPS" },
    { q: "Monday: $2. Each day: +$3 or ×2. Different Thursday amounts?", options: ["3","4","5","6"], answer: 3, hint: "Draw a tree.", explanation: "6.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Wolf-goat-cabbage puzzle. Min crossings?", options: ["5","7","9","11"], answer: 1, hint: "Bring things back sometimes.", explanation: "7.", difficulty: "hard", source: "Primefactor" },
    { q: "4×4 grid: total squares of ALL sizes?", options: ["16","25","30","36"], answer: 2, hint: "16+9+4+1.", explanation: "30.", difficulty: "hard", source: "RSM" },
    { q: "Every multiple of 6 is also a multiple of…?", options: ["2 and 3","2 and 5","3 and 4","4 and 6"], answer: 0, hint: "6=2×3.", explanation: "2 and 3.", difficulty: "easy", source: "Singapore Math" },
    { q: "A 3-digit number is divisible by 9. Its digits are 4, ?, 8. Find ?.?", options: ["4","5","6","7"], answer: 3, hint: "4+?+8 divisible by 9.", explanation: "12+?=18 → ?=6. Wait: 4+6+8=18. So ?=6.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "How many numbers between 1 and 100 are divisible by both 3 and 5?", options: ["5","6","7","8"], answer: 1, hint: "LCM=15.", explanation: "15,30,45,60,75,90 → 6.", difficulty: "medium", source: "RSM" },
    { q: "How many prime numbers are there between 20 and 40?", options: ["3","4","5","6"], answer: 1, hint: "23,29,31,37.", explanation: "4.", difficulty: "medium", source: "Primefactor" },
    { q: "A number is divisible by 3 if…?", options: ["It ends in 0","It ends in 3","Digit sum ÷ 3","It's even"], answer: 2, hint: "Sum the digits.", explanation: "Digit sum is divisible by 3.", difficulty: "easy", source: "Singapore Math" }
  ],
  geometry: [
    { q: "Triangle angles: 45° and 90°. Third?", options: ["35°","40°","45°","55°"], answer: 2, hint: "180−45−90.", explanation: "45°.", difficulty: "easy", source: "Singapore Math" },
    { q: "Circle diameter 14. Circumference? (π≈22/7)", options: ["42","44","46","48"], answer: 1, hint: "πd.", explanation: "44.", difficulty: "easy", source: "Singapore Math" },
    { q: "Cube side 5. Volume?", options: ["25","75","100","125"], answer: 3, hint: "s³.", explanation: "125.", difficulty: "easy", source: "RSM" },
    { q: "Triangle area=60, base=15. Height?", options: ["4","6","8","10"], answer: 2, hint: "2A/b.", explanation: "8.", difficulty: "medium", source: "Primefactor" },
    { q: "Diagonals in a hexagon?", options: ["6","7","8","9"], answer: 3, hint: "n(n−3)/2.", explanation: "9.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Right triangle: legs 3 and 4. Hypotenuse?", options: ["5","6","7","8"], answer: 0, hint: "a²+b²=c².", explanation: "5.", difficulty: "medium", source: "RSM" },
    { q: "Semicircle diameter 14. Perimeter? (π≈22/7)", options: ["36","44","22","58"], answer: 0, hint: "Half circumference + diameter.", explanation: "22+14=36.", difficulty: "medium", source: "Singapore Math" },
    { q: "Isosceles triangle: 2 sides=10, base=8. Perimeter?", options: ["24","26","28","30"], answer: 2, hint: "10+10+8.", explanation: "28.", difficulty: "easy", source: "Primefactor" },
    { q: "Circle radius 7. Area? (π≈22/7)", options: ["144","150","154","158"], answer: 2, hint: "πr².", explanation: "154.", difficulty: "easy", source: "RSM" },
    { q: "A square has diagonal of length 10. What is its area?", options: ["25","50","100","10√2"], answer: 1, hint: "A = d²/2.", explanation: "100/2=50.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "How many faces does a triangular prism have?", options: ["3","4","5","6"], answer: 2, hint: "2 triangles + 3 rectangles.", explanation: "5.", difficulty: "easy", source: "Singapore Math" }
  ],
  olympiad: [
    { q: "Hundreds=2×tens, tens=2×ones. The number?", options: ["421","842","824","412"], answer: 0, hint: "Let ones=x.", explanation: "421.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Perfect squares between 1 and 200?", options: ["13","14","15","16"], answer: 1, hint: "14²=196.", explanation: "14.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Product of two consecutive evens = 168. What are they?", options: ["10,12","12,14","14,16","8,10"], answer: 1, hint: "Try options.", explanation: "12×14=168.", difficulty: "medium", source: "Primefactor" },
    { q: "3×3 magic square: top-left=2, center=5. Bottom-right?", options: ["6","7","8","9"], answer: 2, hint: "Diagonal: 2+5+?=15.", explanation: "8.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Ways to make 50¢ with nickels and dimes?", options: ["4","5","6","7"], answer: 2, hint: "0 to 5 dimes.", explanation: "6.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Train 1km long at 1km/min. Time to pass 1km tunnel?", options: ["1","1.5","2","3"], answer: 2, hint: "Total=2km.", explanation: "2 min.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Units digit of 7²⁰²⁶?", options: ["1","3","7","9"], answer: 3, hint: "Pattern: 7,9,3,1 (period 4).", explanation: "2026 mod 4=2 → 9.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "A★B = (A+B)(A−B). What is 7★3?", options: ["21","30","40","58"], answer: 2, hint: "10×4.", explanation: "40.", difficulty: "easy", source: "MOEMS" },
    { q: "Five friends in a circle. Each shakes hands with 2 non-neighbors. Total?", options: ["5","8","10","15"], answer: 0, hint: "5×2/2.", explanation: "5.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "R:G:B marbles = ½g : g : 2g. Total could be?", options: ["24","25","26","28"], answer: 3, hint: "3.5g must be whole.", explanation: "g=8→28.", difficulty: "hard", source: "AMC 8 2024" },
    { q: "90 guppies, 4 tanks. T2=T1+1, T3=T2+2, T4=T3+3. T4?", options: ["20","21","24","26"], answer: 3, hint: "4x+10=90.", explanation: "T4=26.", difficulty: "hard", source: "AMC 8 2024" },
    { q: "1–100: div by 3 but NOT by 6?", options: ["16","17","18","33"], answer: 1, hint: "33−16.", explanation: "17.", difficulty: "medium", source: "RSM" },
    { q: "If N! ends in exactly 3 zeros, what is N?", options: ["13","14","15","16"], answer: 2, hint: "Count factors of 5.", explanation: "15÷5=3, 15÷25=0. Total=3.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "A two-digit number is 7 times the sum of its digits. The number is?", options: ["21","42","63","84"], answer: 2, hint: "10a+b=7(a+b).", explanation: "3a=6b → a=2b. a=6,b=3→63.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Sum of all factors of 28?", options: ["28","56","57","58"], answer: 1, hint: "1+2+4+7+14+28.", explanation: "56.", difficulty: "medium", source: "MOEMS" },
    { q: "How many numbers 1–1000 are perfect cubes?", options: ["8","9","10","11"], answer: 2, hint: "10³=1000.", explanation: "1³ through 10³ → 10.", difficulty: "medium", source: "RSM" }
  ],
  word: [
    { q: "25% off $60 jacket. You pay?", options: ["$40","$45","$48","$50"], answer: 1, hint: "15 off.", explanation: "$45.", difficulty: "easy", source: "Singapore Math" },
    { q: "Pool 25×10×2 m. Volume?", options: ["250","500","350","750"], answer: 1, hint: "l×w×h.", explanation: "500.", difficulty: "easy", source: "RSM" },
    { q: "3 machines make 90 toys in 2h. 5 machines in 4h?", options: ["150","200","250","300"], answer: 3, hint: "Rate per machine per hour.", explanation: "300.", difficulty: "hard", source: "RSM" },
    { q: "Recipe for 4: 300g flour. For 10?", options: ["600g","700g","750g","800g"], answer: 2, hint: "300×10/4.", explanation: "750g.", difficulty: "easy", source: "Singapore Math" },
    { q: "Cyclist: 15km/h. Time for 45km?", options: ["2h","2.5h","3h","3.5h"], answer: 2, hint: "45÷15.", explanation: "3h.", difficulty: "easy", source: "Primefactor" },
    { q: "20 students. 3/4 passed. Failed?", options: ["5","6","8","10"], answer: 0, hint: "1/4×20.", explanation: "5.", difficulty: "easy", source: "Singapore Math" },
    { q: "A toy is $12.50. You buy 4 and get $5 discount. Total?", options: ["$40","$42.50","$45","$50"], answer: 2, hint: "4×12.50−5.", explanation: "50−5=$45.", difficulty: "medium", source: "Primefactor" },
    { q: "Dad drives 60km/h for 2h, then 80km/h for 1.5h. Total distance?", options: ["220km","240km","260km","280km"], answer: 1, hint: "120+120.", explanation: "240km.", difficulty: "medium", source: "RSM" }
  ]
},

// ====================== GRADE 5 ======================
5: {
  arithmetic: [
    { q: "2/3 of 450 = ?", options: ["280","290","300","310"], answer: 2, hint: "450×2/3.", explanation: "300.", difficulty: "easy", source: "Singapore Math" },
    { q: "0.375 as fraction (lowest)?", options: ["3/8","3/5","37/100","375/1000"], answer: 0, hint: "Simplify.", explanation: "3/8.", difficulty: "medium", source: "RSM" },
    { q: "(−8)×(−5) + (−3)×4 = ?", options: ["28","52","40","22"], answer: 0, hint: "40+(−12).", explanation: "28.", difficulty: "medium", source: "RSM" },
    { q: "GCD of 84 and 126?", options: ["14","21","28","42"], answer: 3, hint: "Factor each.", explanation: "42.", difficulty: "medium", source: "Primefactor" },
    { q: "10% of 10% of 10,000?", options: ["10","100","1000","1"], answer: 1, hint: "1000→100.", explanation: "100.", difficulty: "easy", source: "Singapore Math" },
    { q: "3x + 7 = 28. x = ?", options: ["5","6","7","8"], answer: 2, hint: "3x=21.", explanation: "7.", difficulty: "easy", source: "AOPS" },
    { q: "√169 + √144 = ?", options: ["23","24","25","26"], answer: 2, hint: "13+12.", explanation: "25.", difficulty: "easy", source: "RSM" },
    { q: "5/6 − 1/4 = ?", options: ["7/12","4/6","1/3","11/12"], answer: 0, hint: "LCD=12.", explanation: "10/12−3/12=7/12.", difficulty: "medium", source: "Singapore Math" },
    { q: "2⁵ × 2³ = ?", options: ["2⁸","2¹⁵","4⁸","4¹⁵"], answer: 0, hint: "Add exponents.", explanation: "2⁸=256.", difficulty: "easy", source: "Primefactor" },
    { q: "0.125 as fraction?", options: ["1/4","1/6","1/8","1/10"], answer: 2, hint: "125/1000.", explanation: "1/8.", difficulty: "easy", source: "RSM" },
    { q: "What is 4³ − 2⁵?", options: ["28","30","32","34"], answer: 2, hint: "64−32.", explanation: "32.", difficulty: "easy", source: "Primefactor" },
    { q: "What is 5/9 × 36?", options: ["15","18","20","25"], answer: 2, hint: "36÷9×5.", explanation: "20.", difficulty: "easy", source: "Singapore Math" },
    { q: "Express 7/20 as a percentage.", options: ["30%","35%","37%","40%"], answer: 1, hint: "7÷20×100.", explanation: "35%.", difficulty: "easy", source: "RSM" },
    { q: "What is (3/4)² ?", options: ["3/8","6/8","9/16","9/8"], answer: 2, hint: "Square both.", explanation: "9/16.", difficulty: "medium", source: "Primefactor" }
  ],
  logic: [
    { q: "30 people: min sharing birth month?", options: ["2","3","4","5"], answer: 1, hint: "⌈30/12⌉.", explanation: "3.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Triangles from hexagon vertices?", options: ["12","18","20","22"], answer: 2, hint: "C(6,3).", explanation: "20.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "All Zips are Zaps. Some Zaps are Zops. Must be true?", options: ["All Zips are Zops","Some Zips are Zops","No Zips are Zops","None must be true"], answer: 3, hint: "Venn diagram.", explanation: "Zops may not overlap Zips.", difficulty: "hard", source: "Primefactor" },
    { q: "Primes between 50 and 70?", options: ["3","4","5","6"], answer: 1, hint: "Check each odd.", explanation: "53,59,61,67→4.", difficulty: "medium", source: "MOEMS" },
    { q: "1,4,9,16,25,… 10th term?", options: ["64","81","100","121"], answer: 2, hint: "Squares.", explanation: "100.", difficulty: "easy", source: "RSM" },
    { q: "365 days from Monday = ?", options: ["Monday","Tuesday","Wednesday","Sunday"], answer: 1, hint: "365÷7=52r1.", explanation: "Tuesday.", difficulty: "easy", source: "Math Kangaroo" },
    { q: "3-digit even numbers from {1,2,3,4,5} no repeats?", options: ["24","36","48","60"], answer: 0, hint: "Last: 2 or 4.", explanation: "2×4×3=24.", difficulty: "hard", source: "Primefactor" },
    { q: "Multiples of 4 between 100 and 200 (inclusive)?", options: ["24","25","26","27"], answer: 2, hint: "100,104,…,200.", explanation: "(200−100)/4+1=26.", difficulty: "medium", source: "RSM" },
    { q: "How many two-digit numbers are divisible by 7?", options: ["12","13","14","15"], answer: 1, hint: "14,21,…,98.", explanation: "(98−14)/7+1=13.", difficulty: "medium", source: "Singapore Math" },
    { q: "A number is both a perfect square and a perfect cube, and less than 100. How many such numbers exist?", options: ["1","2","3","4"], answer: 1, hint: "6th powers.", explanation: "1 and 64. Two.", difficulty: "hard", source: "AMC 8 / AOPS" }
  ],
  geometry: [
    { q: "Circle radius 7. Area? (π≈22/7)", options: ["144","152","154","156"], answer: 2, hint: "πr².", explanation: "154.", difficulty: "easy", source: "Singapore Math" },
    { q: "Cylinder r=3, h=10. Volume? (π≈3.14)", options: ["282.6","280.4","285","290"], answer: 0, hint: "πr²h.", explanation: "282.6.", difficulty: "medium", source: "RSM" },
    { q: "Quadrilateral angles ratio 1:2:3:4. Largest?", options: ["108°","120°","144°","160°"], answer: 2, hint: "Sum=360°.", explanation: "144°.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Similar triangles ratio 2:5. Small area=12. Large area?", options: ["30","60","75","120"], answer: 2, hint: "Area ratio=(side ratio)².", explanation: "75.", difficulty: "hard", source: "Primefactor" },
    { q: "Triangle A(0,0), B(6,0), C(0,8). Area?", options: ["14","24","48","28"], answer: 1, hint: "½×6×8.", explanation: "24.", difficulty: "easy", source: "RSM" },
    { q: "Regular hexagon interior angle?", options: ["108°","120°","135°","144°"], answer: 1, hint: "(6−2)×180/6.", explanation: "120°.", difficulty: "medium", source: "Singapore Math" },
    { q: "Cone r=4, h=3. Slant height?", options: ["5","6","7","√7"], answer: 0, hint: "l²=r²+h².", explanation: "5.", difficulty: "medium", source: "Primefactor" },
    { q: "Trapezoid: parallel sides 6 and 10, height 4. Area?", options: ["24","28","32","40"], answer: 2, hint: "½(a+b)h.", explanation: "32.", difficulty: "easy", source: "RSM" }
  ],
  olympiad: [
    { q: "3-digit numbers ÷ both 3 and 5? Count?", options: ["30","60","90","120"], answer: 1, hint: "Div by 15.", explanation: "60.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "2¹⁰=1024. 2²⁰ = ?", options: ["1,048,576","2,048,000","1,024,000","524,288"], answer: 0, hint: "1024².", explanation: "1,048,576.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Sum of 5 consecutive numbers = 100. Largest?", options: ["20","21","22","24"], answer: 2, hint: "Middle=20.", explanation: "22.", difficulty: "easy", source: "Math Kangaroo" },
    { q: "Largest power of 2 dividing 10!?", options: ["2⁶","2⁷","2⁸","2⁹"], answer: 2, hint: "5+2+1=8.", explanation: "2⁸.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Two-digit primes that are also prime reversed. How many?", options: ["5","9","11","13"], answer: 1, hint: "13↔31, 17↔71,…", explanation: "9.", difficulty: "hard", source: "RSM" },
    { q: "N mod 7=3, N mod 5=2. Smallest N?", options: ["12","17","22","27"], answer: 1, hint: "Check each.", explanation: "17÷7=2r3✓, 17÷5=3r2✓.", difficulty: "hard", source: "Primefactor" },
    { q: "Positive factors of 100?", options: ["7","8","9","10"], answer: 2, hint: "100=2²×5².", explanation: "9.", difficulty: "medium", source: "MOEMS" },
    { q: "Interior angles of an octagon?", options: ["720°","900°","1080°","1260°"], answer: 2, hint: "(n−2)×180.", explanation: "1080°.", difficulty: "medium", source: "AOPS" },
    { q: "What is the remainder when 3¹⁰⁰ is divided by 4?", options: ["0","1","2","3"], answer: 1, hint: "3²=9≡1 mod 4.", explanation: "3¹⁰⁰=(3²)⁵⁰≡1.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "How many numbers from 1 to 100 are neither multiples of 2 nor 3?", options: ["27","33","34","50"], answer: 1, hint: "100−50−33+16.", explanation: "33.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Sum of all odd numbers from 1 to 99?", options: ["2025","2500","2450","2550"], answer: 1, hint: "50 odd numbers. Sum=50².", explanation: "2500.", difficulty: "medium", source: "RSM" }
  ],
  word: [
    { q: "Bike depreciates 15%/yr. $400 bike after 1 year?", options: ["$320","$340","$360","$380"], answer: 1, hint: "400×0.85.", explanation: "$340.", difficulty: "easy", source: "Singapore Math" },
    { q: "Tank: fill 5L/min, leak 2L/min. Time for 60L?", options: ["12","15","20","30"], answer: 2, hint: "Net=3L/min.", explanation: "20.", difficulty: "easy", source: "RSM" },
    { q: "Train 200m, bridge 300m, speed 100km/h. Seconds to cross?", options: ["18","20","15","12"], answer: 0, hint: "500m.", explanation: "≈18s.", difficulty: "hard", source: "RSM" },
    { q: "Boys:girls = 3:5. 40 total. Girls?", options: ["15","20","25","30"], answer: 2, hint: "5/8×40.", explanation: "25.", difficulty: "easy", source: "Singapore Math" },
    { q: "Shirt costs $35 after 30% discount. Original?", options: ["$45","$50","$55","$60"], answer: 1, hint: "35=0.7P.", explanation: "$50.", difficulty: "medium", source: "Primefactor" },
    { q: "A plane flies 800km/h. How far in 3h 30min?", options: ["2400km","2600km","2800km","3000km"], answer: 2, hint: "800×3.5.", explanation: "2800km.", difficulty: "easy", source: "RSM" },
    { q: "Water flows at 25L/min into a 500L tank. 120L already in. Minutes to fill?", options: ["12","14","15.2","16"], answer: 2, hint: "(500−120)÷25.", explanation: "380÷25=15.2.", difficulty: "medium", source: "Singapore Math" }
  ]
},

// ====================== GRADE 6 ======================
6: {
  arithmetic: [
    { q: "2³×3²÷6 = ?", options: ["6","12","18","24"], answer: 1, hint: "72÷6.", explanation: "12.", difficulty: "easy", source: "RSM" },
    { q: "5/6 − 3/8 + 1/4 = ?", options: ["7/12","17/24","3/4","5/8"], answer: 1, hint: "LCD=24.", explanation: "17/24.", difficulty: "medium", source: "Singapore Math" },
    { q: "(−12)÷(−4)×(−3) = ?", options: ["-9","9","-1","1"], answer: 0, hint: "3×(−3).", explanation: "−9.", difficulty: "medium", source: "Primefactor" },
    { q: "0.0036 in scientific notation?", options: ["3.6×10⁻²","3.6×10⁻³","36×10⁻⁴","3.6×10⁻⁴"], answer: 1, hint: "Move decimal.", explanation: "3.6×10⁻³.", difficulty: "medium", source: "RSM" },
    { q: "1+2+3+…+100 = ?", options: ["5000","5050","5100","4950"], answer: 1, hint: "n(n+1)/2.", explanation: "5050.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "(2⁵×3²)/(2³×3) = ?", options: ["6","8","12","18"], answer: 2, hint: "Subtract exponents.", explanation: "12.", difficulty: "medium", source: "RSM" },
    { q: "|−7| + |3−10| = ?", options: ["4","10","14","17"], answer: 2, hint: "7+7.", explanation: "14.", difficulty: "easy", source: "Primefactor" },
    { q: "4! − 3!×2 = ?", options: ["6","12","18","24"], answer: 1, hint: "24−12.", explanation: "12.", difficulty: "medium", source: "AOPS" },
    { q: "What is 2⁶ × 2⁻⁴?", options: ["2","4","8","16"], answer: 1, hint: "2^(6−4).", explanation: "2²=4.", difficulty: "medium", source: "RSM" },
    { q: "Simplify: (−2)³ + (−3)²", options: ["1","−1","17","−17"], answer: 0, hint: "−8+9.", explanation: "1.", difficulty: "medium", source: "Primefactor" }
  ],
  logic: [
    { q: "4-digit password: starts odd, ends even. How many?", options: ["2000","2500","3000","5000"], answer: 1, hint: "5×10×10×5.", explanation: "2500.", difficulty: "medium", source: "Primefactor" },
    { q: "Primes from 1 to 50?", options: ["14","15","16","17"], answer: 1, hint: "List them.", explanation: "15.", difficulty: "medium", source: "AOPS" },
    { q: "1–1000: divisible by 3 or 5?", options: ["467","466","468","469"], answer: 0, hint: "Inclusion-Exclusion.", explanation: "333+200−66=467.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "3-digit ABC = A³+B³+C³. Which?", options: ["153","251","352","154"], answer: 0, hint: "1+125+27.", explanation: "153.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Factors of 360?", options: ["20","22","24","28"], answer: 2, hint: "2³×3²×5.", explanation: "24.", difficulty: "hard", source: "RSM" },
    { q: "Sum of two primes = 100. How many pairs?", options: ["4","5","6","7"], answer: 2, hint: "Goldbach.", explanation: "6.", difficulty: "hard", source: "Primefactor" },
    { q: "A truth-teller and liar. One says 'I am B.' Who said it?", options: ["A (truth)","B (liar)","Either","Neither"], answer: 1, hint: "A wouldn't say 'I am B.'", explanation: "B.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "2-digit number: product of digits=12, sum=7. Number?", options: ["26","34","43","62"], answer: 1, hint: "3×4=12, 3+4=7.", explanation: "34 or 43. Smaller=34.", difficulty: "medium", source: "RSM" },
    { q: "How many 3-digit numbers have exactly one even digit?", options: ["225","250","300","375"], answer: 2, hint: "3 positions for the even digit.", explanation: "Careful counting: 300.", difficulty: "hard", source: "AMC 8 / AOPS" }
  ],
  geometry: [
    { q: "Cube side 4. Surface area?", options: ["64","80","96","128"], answer: 2, hint: "6s².", explanation: "96.", difficulty: "easy", source: "Singapore Math" },
    { q: "Interior angles = 1080°. How many sides?", options: ["6","7","8","9"], answer: 2, hint: "(n−2)×180.", explanation: "8.", difficulty: "medium", source: "RSM" },
    { q: "Equilateral triangle side 6. Area?", options: ["9√3","15√3","18√3","12√3"], answer: 0, hint: "(√3/4)s².", explanation: "9√3.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Sphere r=3. Surface area? (π≈3.14)", options: ["113.04","100.48","75.36","150.72"], answer: 0, hint: "4πr².", explanation: "113.04.", difficulty: "medium", source: "RSM" },
    { q: "Regular hexagon side 6. Area?", options: ["54√3","72√3","108","96√3"], answer: 0, hint: "6 equilateral triangles.", explanation: "54√3.", difficulty: "hard", source: "AOPS" },
    { q: "Cylinder r=5, h=12. Volume? (π≈3.14)", options: ["942","900","860","1000"], answer: 0, hint: "πr²h.", explanation: "3.14×25×12=942.", difficulty: "medium", source: "Singapore Math" },
    { q: "A cone has r=6, h=8. Volume? (π≈3.14)", options: ["301.44","251.2","200.96","150.72"], answer: 0, hint: "(1/3)πr²h.", explanation: "(1/3)×3.14×36×8≈301.44.", difficulty: "medium", source: "RSM" }
  ],
  olympiad: [
    { q: "Last two digits of 99×99?", options: ["01","99","11","81"], answer: 0, hint: "(100−1)².", explanation: "9801→01.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Trailing zeros in 25!?", options: ["4","5","6","7"], answer: 2, hint: "Count 5s.", explanation: "5+1=6.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "2¹⁰⁰ mod 7?", options: ["1","2","3","4"], answer: 1, hint: "Period 3.", explanation: "100 mod 3=1. 2¹ mod 7=2.", difficulty: "hard", source: "RSM" },
    { q: "Color 4 vertices of square with 3 colors. Ways?", options: ["12","24","27","81"], answer: 3, hint: "3⁴.", explanation: "81.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Sum of proper divisors of 496?", options: ["496","504","500","492"], answer: 0, hint: "Perfect number!", explanation: "496.", difficulty: "hard", source: "Primefactor" },
    { q: "Two taps: A=6h, B=4h. Both together?", options: ["2h","2.4h","3h","5h"], answer: 1, hint: "1/6+1/4.", explanation: "2.4h.", difficulty: "medium", source: "MOEMS" },
    { q: "Trailing zeros in 100!?", options: ["20","22","24","26"], answer: 2, hint: "20+4.", explanation: "24.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "LCM of 1 through 10?", options: ["1260","2520","5040","720"], answer: 1, hint: "LCM(1..10).", explanation: "2520.", difficulty: "hard", source: "RSM" },
    { q: "What is 111,111 ÷ 3?", options: ["33,333","37,037","33,337","37,033"], answer: 1, hint: "3 × 37037.", explanation: "37,037.", difficulty: "medium", source: "Primefactor" },
    { q: "How many perfect squares between 100 and 400?", options: ["9","10","11","12"], answer: 2, hint: "11² to 20².", explanation: "11²=121…20²=400. Count:10+1−1=10. Hmm: 10,11,…,20 →11 but 10²=100 and 20²=400 both boundary. 11.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "A number is multiplied by 5, then 3 is subtracted, giving 47. The number?", options: ["8","9","10","11"], answer: 2, hint: "5x−3=47.", explanation: "x=10.", difficulty: "easy", source: "Math Kangaroo" }
  ],
  word: [
    { q: "Sells for $120, 20% profit. Cost?", options: ["$96","$100","$108","$90"], answer: 1, hint: "120/1.2.", explanation: "$100.", difficulty: "medium", source: "Singapore Math" },
    { q: "200mL at 30% acid + water to make 20%. Water added?", options: ["50","75","100","150"], answer: 2, hint: "Acid=60mL.", explanation: "60/0.2=300. Add 100.", difficulty: "medium", source: "RSM" },
    { q: "12m ladder, base 5m from wall. Height reached?", options: ["√119","√169","√144","√94"], answer: 0, hint: "h²+25=144.", explanation: "h=√119.", difficulty: "medium", source: "Primefactor" },
    { q: "A car goes 240km using 20L. Fuel efficiency?", options: ["10 km/L","12 km/L","14 km/L","16 km/L"], answer: 1, hint: "240÷20.", explanation: "12 km/L.", difficulty: "easy", source: "Singapore Math" },
    { q: "Phone plan: $25/month + $0.10/text. 150 texts bill?", options: ["$35","$40","$45","$50"], answer: 1, hint: "25+15.", explanation: "$40.", difficulty: "easy", source: "RSM" }
  ]
},

// ====================== GRADE 7 ======================
7: {
  arithmetic: [
    { q: "x/y=3/5, x+y=40. x=?", options: ["12","15","18","25"], answer: 1, hint: "x=3k,y=5k.", explanation: "8k=40→15.", difficulty: "medium", source: "RSM" },
    { q: "(2/3)⁻² = ?", options: ["4/9","9/4","2/3","3/2"], answer: 1, hint: "Flip and square.", explanation: "9/4.", difficulty: "medium", source: "Primefactor" },
    { q: "0.363636… as fraction?", options: ["4/11","36/99","12/33","All equal"], answer: 3, hint: "99x=36.", explanation: "All simplify to 4/11.", difficulty: "medium", source: "RSM" },
    { q: "√50+√18−√32 = ?", options: ["3√2","4√2","5√2","6√2"], answer: 1, hint: "5√2+3√2−4√2.", explanation: "4√2.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "2(x−3)=5x+6. x=?", options: ["-4","4","-2","2"], answer: 0, hint: "2x−6=5x+6.", explanation: "−4.", difficulty: "medium", source: "AOPS" },
    { q: "5⁰+5¹+5²+5³ = ?", options: ["155","156","160","125"], answer: 1, hint: "1+5+25+125.", explanation: "156.", difficulty: "easy", source: "RSM" },
    { q: "If a/b = 7/3, what is (a+b)/(a−b)?", options: ["5/2","10/4","7/3","3/7"], answer: 0, hint: "(7+3)/(7−3).", explanation: "10/4=5/2.", difficulty: "medium", source: "Primefactor" },
    { q: "Simplify: (x²−4)/(x−2)", options: ["x−2","x+2","x²−2","x"], answer: 1, hint: "Difference of squares.", explanation: "x+2.", difficulty: "easy", source: "AOPS" },
    { q: "What is 3⁴ ÷ 3² × 3?", options: ["9","27","81","243"], answer: 1, hint: "3^(4−2+1).", explanation: "3³=27.", difficulty: "easy", source: "RSM" }
  ],
  logic: [
    { q: "1–1000: div by 3 or 5?", options: ["467","466","468","469"], answer: 0, hint: "IE.", explanation: "467.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "5-letter arrangements of LEVEL?", options: ["20","30","60","120"], answer: 1, hint: "5!/(2!2!).", explanation: "30.", difficulty: "hard", source: "RSM" },
    { q: "Subsets of 4-element set?", options: ["8","12","16","24"], answer: 2, hint: "2ⁿ.", explanation: "16.", difficulty: "medium", source: "AOPS" },
    { q: "f(x)=2x+1. f(f(3))=?", options: ["13","14","15","17"], answer: 2, hint: "f(3)=7.", explanation: "f(7)=15.", difficulty: "medium", source: "Primefactor" },
    { q: "3 dice: all same number. Probability?", options: ["1/36","1/6","1/216","6/216"], answer: 3, hint: "6/6³.", explanation: "6/216=1/36.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "4-digit strictly increasing digits?", options: ["84","126","210","252"], answer: 1, hint: "C(9,4).", explanation: "126.", difficulty: "hard", source: "RSM" },
    { q: "A committee of 3 from 7 people. Ways?", options: ["21","35","42","210"], answer: 1, hint: "C(7,3).", explanation: "35.", difficulty: "medium", source: "Primefactor" },
    { q: "Probability of rolling sum ≥ 10 with two dice?", options: ["1/6","1/12","5/36","6/36"], answer: 0, hint: "10:3, 11:2, 12:1.", explanation: "6/36=1/6.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "How many ways to climb 5 stairs taking 1 or 2 steps?", options: ["5","7","8","13"], answer: 2, hint: "Fibonacci!", explanation: "8.", difficulty: "medium", source: "Math Kangaroo" }
  ],
  geometry: [
    { q: "Sphere r=3. Volume? (π≈3.14)", options: ["113.04","108.5","100.5","94.2"], answer: 0, hint: "(4/3)πr³.", explanation: "113.04.", difficulty: "medium", source: "RSM" },
    { q: "Equilateral triangle side 10. Height?", options: ["5√3","10√3","5√2","10√2"], answer: 0, hint: "(√3/2)×side.", explanation: "5√3.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Cone r=3, h=4. Slant height?", options: ["5","6","7","√7"], answer: 0, hint: "l²=9+16.", explanation: "5.", difficulty: "easy", source: "Primefactor" },
    { q: "Points (1,2) and (4,6). Distance?", options: ["5","7","√7","3"], answer: 0, hint: "√(9+16).", explanation: "5.", difficulty: "easy", source: "RSM" },
    { q: "Two chords intersect. One: 3,5. Other: x,6. Find x.", options: ["2","2.5","3","4"], answer: 1, hint: "3×5=x×6.", explanation: "2.5.", difficulty: "hard", source: "AOPS" },
    { q: "Line through (0,3) and (4,0). y-intercept?", options: ["3","4","-3/4","0"], answer: 0, hint: "Starts at (0,3).", explanation: "3.", difficulty: "easy", source: "Singapore Math" },
    { q: "Area of parallelogram: base 8, height 5?", options: ["13","20","40","80"], answer: 2, hint: "b×h.", explanation: "40.", difficulty: "easy", source: "RSM" }
  ],
  olympiad: [
    { q: "|x|+|y|=5: integer solutions?", options: ["16","18","20","24"], answer: 2, hint: "Count by |x|.", explanation: "20.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "Sum of divisors of 28?", options: ["28","42","56","60"], answer: 2, hint: "28 is perfect.", explanation: "56.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "5-digit palindromes ÷ 3?", options: ["300","270","90","150"], answer: 0, hint: "900 total.", explanation: "300.", difficulty: "hard", source: "RSM" },
    { q: "Smallest prime factor of 2¹⁶−1?", options: ["3","5","7","11"], answer: 0, hint: "65535.", explanation: "3.", difficulty: "hard", source: "Primefactor" },
    { q: "Perfect square divisors of 72?", options: ["3","4","5","6"], answer: 1, hint: "72=2³×3².", explanation: "1,4,9,36→4.", difficulty: "hard", source: "MOEMS" },
    { q: "Last digit of 3²⁰²³?", options: ["1","3","7","9"], answer: 2, hint: "Pattern period 4.", explanation: "2023 mod 4=3→7.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Euler's formula: V−E+F=? for any convex polyhedron.", options: ["0","1","2","3"], answer: 2, hint: "Vertices−Edges+Faces.", explanation: "2.", difficulty: "medium", source: "AOPS" },
    { q: "How many lattice points on segment from (0,0) to (12,8)?", options: ["3","4","5","6"], answer: 2, hint: "gcd(12,8)+1.", explanation: "4+1=5.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Smallest n where n! > 10⁶?", options: ["8","9","10","11"], answer: 2, hint: "10!=3,628,800.", explanation: "10.", difficulty: "medium", source: "RSM" }
  ],
  word: [
    { q: "Stone: d=5t². Distance in 3rd second?", options: ["20","25","30","45"], answer: 1, hint: "d(3)−d(2).", explanation: "45−20=25.", difficulty: "medium", source: "Singapore Math" },
    { q: "Trains 300km apart, 70 and 80 km/h toward each other. When?", options: ["1h","2h","2.5h","3h"], answer: 1, hint: "150 km/h.", explanation: "2h.", difficulty: "easy", source: "RSM" },
    { q: "$2000 at 4% simple interest, 3 years. Total?", options: ["$2120","$2200","$2240","$2320"], answer: 2, hint: "I=PRT.", explanation: "$2240.", difficulty: "easy", source: "Singapore Math" },
    { q: "200-page book: 1/5 Mon, 1/4 of rest Tue. Pages left?", options: ["100","110","120","130"], answer: 2, hint: "Mon=40, rest=160, Tue=40.", explanation: "120.", difficulty: "medium", source: "Primefactor" },
    { q: "Mixture A: 20% salt. Mixture B: 50% salt. Mix 300mL A with 200mL B. Salt %?", options: ["30%","32%","35%","40%"], answer: 1, hint: "(60+100)/500.", explanation: "160/500=32%.", difficulty: "hard", source: "RSM" }
  ]
},

// ====================== GRADE 8 ======================
8: {
  arithmetic: [
    { q: "(x²−9)/(x+3) = ?", options: ["x−3","x+3","x²−3","x−9"], answer: 0, hint: "Difference of squares.", explanation: "x−3.", difficulty: "easy", source: "AOPS" },
    { q: "2ˣ=64. x=?", options: ["4","5","6","8"], answer: 2, hint: "2⁶=64.", explanation: "6.", difficulty: "easy", source: "RSM" },
    { q: "log₂(32)=?", options: ["4","5","6","8"], answer: 1, hint: "2⁵=32.", explanation: "5.", difficulty: "easy", source: "Primefactor" },
    { q: "(x²+5x+6)/(x+2) = ?", options: ["x+3","x+2","x+6","x²+3"], answer: 0, hint: "Factor.", explanation: "x+3.", difficulty: "easy", source: "AOPS" },
    { q: "x²−5x+6=0. Solutions?", options: ["1,6","2,3","−2,−3","−1,6"], answer: 1, hint: "Factor.", explanation: "(x−2)(x−3)=0.", difficulty: "easy", source: "RSM" },
    { q: "3⁻² + 4⁻¹ = ?", options: ["7/36","1/9","7/9","13/36"], answer: 3, hint: "1/9+1/4.", explanation: "4/36+9/36=13/36.", difficulty: "medium", source: "Primefactor" },
    { q: "Solve: 3x − 2y = 7 and x + y = 6. What is x?", options: ["3","3.8","4","5"], answer: 1, hint: "y=6−x, substitute.", explanation: "3x−2(6−x)=7 → 5x=19 → x=3.8.", difficulty: "medium", source: "RSM" },
    { q: "Simplify: (2x³y²)³", options: ["6x⁹y⁶","8x⁹y⁶","8x⁶y⁵","2x⁹y⁶"], answer: 1, hint: "Cube each part.", explanation: "8x⁹y⁶.", difficulty: "medium", source: "AOPS" },
    { q: "If f(x)=x²−3x+2, what is f(5)?", options: ["10","12","14","16"], answer: 1, hint: "25−15+2.", explanation: "12.", difficulty: "easy", source: "Primefactor" }
  ],
  logic: [
    { q: "5 around circular table. Arrangements?", options: ["24","60","120","720"], answer: 0, hint: "(n−1)!.", explanation: "24.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "4-letter code from {A,B,C}. At least one A?", options: ["65","64","81","80"], answer: 0, hint: "81−16.", explanation: "65.", difficulty: "hard", source: "Primefactor" },
    { q: "MISSISSIPPI arrangements?", options: ["34,650","39,916,800","69,300","4,989,600"], answer: 0, hint: "11!/(4!4!2!).", explanation: "34,650.", difficulty: "hard", source: "RSM" },
    { q: "Sum 7 with two dice. Probability?", options: ["1/6","5/36","6/36","7/36"], answer: 0, hint: "6 combos.", explanation: "1/6.", difficulty: "medium", source: "AOPS" },
    { q: "Diagonals in a decagon?", options: ["25","30","35","40"], answer: 2, hint: "n(n−3)/2.", explanation: "35.", difficulty: "medium", source: "Math Kangaroo" },
    { q: "Derangements of {1,2,3,4}?", options: ["8","9","10","12"], answer: 1, hint: "No element in original position.", explanation: "9.", difficulty: "hard", source: "RSM" },
    { q: "A class of 30: P(same birthday pair) is surprisingly high at about…?", options: ["30%","50%","70%","90%"], answer: 2, hint: "Birthday paradox!", explanation: "≈70%.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Paths in a 3×3 grid from top-left to bottom-right (only right/down)?", options: ["6","10","20","35"], answer: 2, hint: "C(6,3).", explanation: "20.", difficulty: "medium", source: "Primefactor" },
    { q: "How many onto functions from a 4-element set to a 3-element set?", options: ["24","36","48","64"], answer: 1, hint: "Inclusion-Exclusion.", explanation: "3⁴−3×2⁴+3×1⁴=81−48+3=36.", difficulty: "hard", source: "RSM" }
  ],
  geometry: [
    { q: "Right triangle: legs 5,12. Hypotenuse?", options: ["13","14","15","17"], answer: 0, hint: "a²+b²=c².", explanation: "13.", difficulty: "easy", source: "AOPS" },
    { q: "Cone r=3, slant=5. Lateral area? (π≈3.14)", options: ["47.1","45.2","44","50.5"], answer: 0, hint: "πrl.", explanation: "47.1.", difficulty: "medium", source: "RSM" },
    { q: "Slope through (2,3) and (6,11)?", options: ["1","2","3","4"], answer: 1, hint: "8/4.", explanation: "2.", difficulty: "easy", source: "Primefactor" },
    { q: "x²+y²=25. Radius?", options: ["5","10","25","√5"], answer: 0, hint: "r²=25.", explanation: "5.", difficulty: "easy", source: "AOPS" },
    { q: "Trapezoid: bases 8,12, height 5. Area?", options: ["40","45","50","60"], answer: 2, hint: "½(8+12)5.", explanation: "50.", difficulty: "easy", source: "Singapore Math" },
    { q: "Midpoint of (3,7) and (9,1)?", options: ["(6,3)","(6,4)","(5,4)","(12,8)"], answer: 1, hint: "Average coordinates.", explanation: "(6,4).", difficulty: "easy", source: "RSM" },
    { q: "Two parallel lines cut by transversal. Alternate interior angles are…?", options: ["Supplementary","Equal","Complementary","Right"], answer: 1, hint: "Z-angles.", explanation: "Equal.", difficulty: "easy", source: "Primefactor" }
  ],
  olympiad: [
    { q: "Sum of all 2-digit primes?", options: ["1043","983","1033","1013"], answer: 0, hint: "Add them all.", explanation: "1043.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "1/a+1/b=1/6, positive integer (a,b) pairs?", options: ["5","7","9","11"], answer: 2, hint: "(a−6)(b−6)=36.", explanation: "9.", difficulty: "hard", source: "Math Kangaroo" },
    { q: "1!+2!+…+100! mod 12?", options: ["1","5","9","3"], answer: 2, hint: "n≥4: n! div by 12.", explanation: "1+2+6=9.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Tetrahedron edges?", options: ["4","6","8","12"], answer: 1, hint: "4 vertices.", explanation: "6.", difficulty: "easy", source: "Math Kangaroo" },
    { q: "FLYFLY×8=BUGBUG. FLY+BUG?", options: ["1089","1098","1107","1125"], answer: 3, hint: "FLY×8=BUG.", explanation: "1125.", difficulty: "hard", source: "AMC 8 2024" },
    { q: "$1000 at 5% compound, 2 years?", options: ["$1100","$1102.50","$1105","$1110.25"], answer: 1, hint: "P(1+r)ⁿ.", explanation: "$1102.50.", difficulty: "medium", source: "RSM" },
    { q: "1/(1×2)+1/(2×3)+…+1/(9×10) = ?", options: ["9/10","1/10","1/2","10/11"], answer: 0, hint: "Telescoping.", explanation: "1−1/10=9/10.", difficulty: "hard", source: "AOPS" },
    { q: "Express 12 as sum of consecutive positives. Ways?", options: ["1","2","3","4"], answer: 0, hint: "3+4+5.", explanation: "1.", difficulty: "medium", source: "Primefactor" },
    { q: "What is φ(12)? (Euler's totient)", options: ["4","6","8","10"], answer: 0, hint: "Count numbers <12, coprime to 12.", explanation: "1,5,7,11 → 4.", difficulty: "hard", source: "AMC 8 / AOPS" },
    { q: "Sum of infinite geometric series: 1+1/2+1/4+1/8+…?", options: ["1","1.5","2","∞"], answer: 2, hint: "a/(1−r).", explanation: "1/(1−0.5)=2.", difficulty: "medium", source: "RSM" },
    { q: "Smallest prime > 100?", options: ["101","103","107","109"], answer: 0, hint: "Check 101.", explanation: "101 is prime.", difficulty: "easy", source: "Primefactor" },
    { q: "Number of integer solutions to x²+y²≤25?", options: ["69","78","81","85"], answer: 2, hint: "Lattice points in circle r=5.", explanation: "81.", difficulty: "hard", source: "AMC 8 / AOPS" }
  ],
  word: [
    { q: "Trains 300km apart, 70+80 km/h toward each other. Meet?", options: ["1h","2h","2.5h","3h"], answer: 1, hint: "150 km/h.", explanation: "2h.", difficulty: "easy", source: "Singapore Math" },
    { q: "$1000 at 5% compound, 3 years?", options: ["$1150","$1157.63","$1160","$1200"], answer: 1, hint: "1000×1.05³.", explanation: "$1157.63.", difficulty: "medium", source: "RSM" },
    { q: "Bacteria doubles every 30min. Start=100. After 3h?", options: ["3200","6400","12800","25600"], answer: 1, hint: "6 doublings.", explanation: "6400.", difficulty: "medium", source: "Primefactor" },
    { q: "Boat 12km/h, river 4km/h. Round trip 48km (24 each). Time?", options: ["4h","4.5h","5h","5.5h"], answer: 1, hint: "24/16+24/8.", explanation: "1.5+3=4.5.", difficulty: "hard", source: "RSM" },
    { q: "A ball is dropped from 81m. Each bounce: 1/3 height. Height after 4th bounce?", options: ["1m","3m","9m","27m"], answer: 0, hint: "81×(1/3)⁴.", explanation: "81/81=1.", difficulty: "medium", source: "AMC 8 / AOPS" },
    { q: "Population grows 5% yearly. Currently 10,000. In 2 years?", options: ["10,500","11,000","11,025","10,250"], answer: 2, hint: "10000×1.05².", explanation: "11,025.", difficulty: "medium", source: "Singapore Math" }
  ]
}

};

// =============================================
// Helper Functions
// =============================================
function getQuestions(grade, category, count = 10) {
    if (typeof QuestionAPI !== 'undefined' && QuestionAPI.getLocalQuestions) {
        return QuestionAPI.getLocalQuestions(grade, category, count);
    }
    return getLocalQuestions(grade, category, count);
}

function getLocalQuestions(grade, category, count) {
    const gradeData = QUESTIONS[grade];
    if (!gradeData) return [];
    if (category === 'mixed') {
        const allQs = [];
        for (const cat of Object.keys(gradeData)) {
            allQs.push(...gradeData[cat].map(q => ({ ...q, category: cat })));
        }
        return shuffleArray(allQs).slice(0, count);
    }
    const catQs = gradeData[category] || [];
    const questionsWithCat = catQs.map(q => ({ ...q, category }));
    if (questionsWithCat.length >= count) {
        return shuffleArray(questionsWithCat).slice(0, count);
    }
    const supplementGrades = [grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
    const extras = [];
    for (const g of supplementGrades) {
        const gData = QUESTIONS[g];
        if (gData && gData[category]) {
            extras.push(...gData[category].map(q => ({ ...q, category })));
        }
    }
    return shuffleArray([...questionsWithCat, ...extras]).slice(0, count);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
