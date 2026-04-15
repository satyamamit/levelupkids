// =============================================
// LevelUpKids — Competition-Level Word Problems
// Multi-step, tricky, competition-style for all grades
// MOEMS · AMC 8 · Math Kangaroo · Noetic · Singapore
// =============================================

(function() {
  const WORD_PROBLEMS = {

  // ====================== GRADE 1 ======================
  1: {
    word: [
      { q: "Maya has 3 red balloons and 4 blue ones. She gives 2 red and 1 blue to her friend. How many balloons does Maya have now?", options: ["3","4","5","6"], answer: 1, hint: "Start with 7, give away 3.", explanation: "(3+4)−(2+1) = 7−3 = 4.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "A train has 3 cars. The first car has 5 people, the second has 3 more than the first, and the third has 2 less than the second. How many people total?", options: ["17","18","19","21"], answer: 2, hint: "First=5, Second=8, Third=6.", explanation: "5+8+6 = 19.", difficulty: "medium", source: "MOEMS" },
      { q: "Sam has some stickers. He gives 4 to his sister and has 7 left. How many did he start with?", options: ["3","7","10","11"], answer: 3, hint: "Work backwards: 7+4.", explanation: "7+4 = 11.", difficulty: "medium", source: "Noetic Math" },
      { q: "There are 6 birds on a tree. 2 fly away, then 5 more land. Then 3 fly away. How many birds are on the tree?", options: ["4","5","6","8"], answer: 2, hint: "6−2+5−3.", explanation: "6−2=4, 4+5=9, 9−3=6.", difficulty: "medium", source: "Singapore Math" },
      { q: "A jar has 15 marbles. 8 are red and the rest are blue. Leo takes 3 blue marbles. How many blue marbles are left?", options: ["3","4","5","7"], answer: 1, hint: "Blue=15−8=7, then 7−3.", explanation: "15−8=7 blue, 7−3=4 left.", difficulty: "medium", source: "Noetic Math" },
      { q: "Ava reads 3 pages on Monday, 5 on Tuesday, and 4 on Wednesday. She needs to read 20 pages total by Friday. How many pages does she still need to read?", options: ["6","7","8","10"], answer: 2, hint: "3+5+4=12, need 20−12.", explanation: "12 read, 20−12=8 more.", difficulty: "medium", source: "Singapore Math" },
      { q: "A baker makes 12 cookies. He puts them in boxes of 4. Then he makes 8 more cookies and fills more boxes of 4. How many boxes total?", options: ["3","4","5","6"], answer: 2, hint: "12÷4=3, 8÷4=2.", explanation: "3+2 = 5 boxes.", difficulty: "hard", source: "MOEMS" },
      { q: "There are 5 children in line. Kai is 3rd. How many children are behind Kai?", options: ["1","2","3","4"], answer: 1, hint: "5 total, 3rd position.", explanation: "Behind Kai: 4th and 5th = 2 children.", difficulty: "easy", source: "Math Kangaroo" },
    ]
  },

  // ====================== GRADE 2 ======================
  2: {
    word: [
      { q: "A toy store has 48 teddy bears. They sell 15 on Monday and 12 on Tuesday, then receive 20 new ones. How many do they have now?", options: ["31","38","41","43"], answer: 2, hint: "48−15−12+20.", explanation: "48−15=33, 33−12=21, 21+20=41.", difficulty: "medium", source: "Singapore Math" },
      { q: "Emma has twice as many stickers as Lily. Together they have 18 stickers. How many does Emma have?", options: ["6","8","10","12"], answer: 3, hint: "Emma=2×Lily, total=18.", explanation: "Lily=6, Emma=12. 6+12=18. ✓", difficulty: "hard", source: "Noetic Math" },
      { q: "A school bus picks up 8 kids at stop 1, 6 at stop 2, drops off 4 at stop 3, and picks up 5 at stop 4. How many kids are on the bus?", options: ["13","15","17","19"], answer: 1, hint: "8+6−4+5.", explanation: "8+6=14, 14−4=10, 10+5=15.", difficulty: "medium", source: "MOEMS" },
      { q: "A necklace pattern goes: 2 red, 1 blue, 2 red, 1 blue… If the necklace has 24 beads, how many are blue?", options: ["6","8","10","12"], answer: 1, hint: "Pattern repeats every 3 beads.", explanation: "24÷3=8 repeats. 1 blue each = 8 blue.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "Tom is 7 years old. His dad is 4 times as old. How old will Tom's dad be when Tom is 12?", options: ["28","30","33","35"], answer: 2, hint: "Dad now=28. In 5 years...", explanation: "Dad=28 now. In 5 years: 28+5=33.", difficulty: "hard", source: "Noetic Math" },
      { q: "A rope is 50 cm long. You cut it into 2 pieces. The longer piece is 14 cm longer than the shorter. How long is the shorter piece?", options: ["14","16","18","20"], answer: 2, hint: "Short+Long=50, Long=Short+14.", explanation: "2×Short+14=50, Short=18.", difficulty: "hard", source: "Singapore Math" },
      { q: "Priya collects coins. She has 5 dimes and 8 nickels. How much money does she have in cents?", options: ["80¢","85¢","90¢","95¢"], answer: 2, hint: "Dimes=10¢, Nickels=5¢.", explanation: "5×10+8×5 = 50+40 = 90¢.", difficulty: "medium", source: "MOEMS" },
      { q: "A farmer has chickens and cows. There are 10 animals and 28 legs total. How many chickens?", options: ["4","5","6","7"], answer: 2, hint: "Chickens have 2 legs, cows have 4.", explanation: "6 chickens(12 legs)+4 cows(16 legs)=28. ✓", difficulty: "hard", source: "Math Kangaroo" },
    ]
  },

  // ====================== GRADE 3 ======================
  3: {
    word: [
      { q: "A farmer has chickens and rabbits. Together they have 20 heads and 56 legs. How many rabbits are there?", options: ["6","8","10","12"], answer: 1, hint: "If all were chickens: 40 legs. Extra legs = rabbits.", explanation: "56−40=16 extra legs. 16÷2=8 rabbits.", difficulty: "hard", source: "Singapore Math" },
      { q: "Three friends share some stickers. Ava gets twice as many as Ben. Ben gets 3 more than Chloe. Chloe gets 5. How many stickers total?", options: ["24","27","29","31"], answer: 2, hint: "Chloe=5, Ben=8, Ava=16.", explanation: "C=5, B=5+3=8, A=2×8=16. Total=29.", difficulty: "hard", source: "MOEMS" },
      { q: "A rectangular garden is 3 times as long as it is wide. The perimeter is 48 meters. What is the area?", options: ["96 m²","108 m²","120 m²","144 m²"], answer: 1, hint: "2(L+W)=48, L=3W.", explanation: "2(3W+W)=48 → W=6, L=18. Area=108.", difficulty: "hard", source: "Noetic Math" },
      { q: "A store sells pencils for 25¢ each and pens for 75¢ each. Sam buys some of each for exactly $3.00. He buys 6 items total. How many pens did he buy?", options: ["1","2","3","4"], answer: 2, hint: "P pens + (6−P) pencils = 300¢.", explanation: "75P+25(6−P)=300 → 50P=150 → P=3.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A clock shows 3:45. What is the angle between the hour and minute hands?", options: ["157.5°","172.5°","180°","190°"], answer: 0, hint: "Minute at 270°, hour moves past 90°.", explanation: "Hour at 3×30+45×0.5=112.5°. Minute at 270°. Diff=157.5°.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "A snail climbs 3 feet up a wall during the day but slides back 2 feet at night. The wall is 10 feet tall. How many days does it take to reach the top?", options: ["7","8","9","10"], answer: 1, hint: "Net gain 1 ft/day, but on the last day it reaches the top.", explanation: "After 7 days: 7 ft. Day 8: climbs to 10 ft. Done!", difficulty: "hard", source: "Math Kangaroo" },
      { q: "Two numbers add up to 100. One number is 24 more than the other. What is the smaller number?", options: ["34","36","38","40"], answer: 2, hint: "x+(x+24)=100.", explanation: "2x=76, x=38.", difficulty: "medium", source: "Singapore Math" },
      { q: "A baker uses 2 eggs for each cake and 3 eggs for each pie. He uses 25 eggs to make 10 items. How many cakes did he make?", options: ["3","4","5","6"], answer: 2, hint: "2c+3p=25, c+p=10.", explanation: "p=10−c, 2c+3(10−c)=25 → c=5.", difficulty: "hard", source: "MOEMS" },
      { q: "A train leaves City A at 9:00 AM going 60 km/h. Another train leaves City B (180 km away) at 9:00 AM going 30 km/h toward City A. When do they meet?", options: ["10:00 AM","10:30 AM","11:00 AM","11:30 AM"], answer: 2, hint: "Combined speed = 90 km/h.", explanation: "180÷90 = 2 hours. Meet at 11:00 AM.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "I am thinking of a number. If I double it and add 7, I get 31. What is my number?", options: ["10","11","12","13"], answer: 2, hint: "Work backwards: (31−7)÷2.", explanation: "31−7=24, 24÷2=12.", difficulty: "medium", source: "Noetic Math" },
    ]
  },

  // ====================== GRADE 4 ======================
  4: {
    word: [
      { q: "A pool fills with Pipe A in 6 hours and Pipe B in 3 hours. How long to fill using both pipes?", options: ["1.5 hours","2 hours","2.5 hours","3 hours"], answer: 1, hint: "A fills 1/6 per hour, B fills 1/3.", explanation: "1/6+1/3 = 1/2 per hour. Total: 2 hours.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A rectangle's length is decreased by 20% and width increased by 25%. What happens to the area?", options: ["Stays same","Decreases 5%","Increases 5%","Decreases 10%"], answer: 0, hint: "0.8L × 1.25W = ?", explanation: "0.8×1.25 = 1.0. Area stays the same!", difficulty: "hard", source: "Math Kangaroo" },
      { q: "At a party, everyone shakes hands with everyone else exactly once. With 8 people, how many handshakes?", options: ["24","28","32","36"], answer: 1, hint: "C(8,2).", explanation: "8×7÷2 = 28.", difficulty: "hard", source: "MOEMS" },
      { q: "A shop gives 'buy 3 get 1 free.' Apples cost 50¢ each. How much for 12 apples?", options: ["$4.00","$4.50","$5.00","$6.00"], answer: 1, hint: "You pay for 9 out of 12.", explanation: "12 apples: pay for 9. 9×50¢ = $4.50.", difficulty: "medium", source: "Singapore Math" },
      { q: "A number when divided by 5 gives remainder 3, and when divided by 7 gives remainder 4. What is the smallest such number?", options: ["18","23","28","53"], answer: 0, hint: "Try numbers: 3, 8, 13, 18...", explanation: "18÷5=3r3 ✓, 18÷7=2r4 ✓. Smallest=18.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A car travels 40 km/h for 1.5 hours, then 60 km/h for 2 hours. What is the average speed for the whole trip?", options: ["48 km/h","50 km/h","51.4 km/h","54.3 km/h"], answer: 2, hint: "Average speed = Total distance ÷ Total time.", explanation: "60+120=180 km in 3.5h. 180÷3.5≈51.4 km/h.", difficulty: "hard", source: "Singapore Math" },
      { q: "In a class of 30 students, 18 like math, 15 like science, and 5 like neither. How many like both?", options: ["5","7","8","10"], answer: 2, hint: "Use inclusion-exclusion.", explanation: "Like at least one: 30−5=25. Both: 18+15−25=8.", difficulty: "hard", source: "MOEMS" },
      { q: "Anna is 3 times as old as her brother Ben. In 6 years, she will be twice as old. How old is Ben now?", options: ["4","5","6","8"], answer: 2, hint: "Now: A=3B. In 6 years: 3B+6=2(B+6).", explanation: "3B+6=2B+12 → B=6.", difficulty: "hard", source: "Noetic Math" },
      { q: "A book has pages numbered 1 to 100. How many times does the digit '7' appear?", options: ["10","19","20","21"], answer: 2, hint: "Count 7 in ones place + tens place.", explanation: "Ones: 7,17,27...97 = 10. Tens: 70-79 = 10. Total=20.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "3 workers can build a wall in 12 days. How many days would 4 workers take?", options: ["8","9","10","16"], answer: 1, hint: "Work = workers × days.", explanation: "3×12=36 worker-days. 36÷4=9 days.", difficulty: "medium", source: "Singapore Math" },
    ]
  },

  // ====================== GRADE 5 ======================
  5: {
    word: [
      { q: "A tank is 1/3 full. After adding 40 liters, it becomes 5/6 full. What is the tank's capacity?", options: ["60","72","80","96"], answer: 2, hint: "40 liters = 5/6 − 1/3 of tank.", explanation: "5/6−1/3 = 1/2 of tank = 40L. Total = 80L.", difficulty: "hard", source: "Singapore Math" },
      { q: "If the price of a shirt increased by 25% and then decreased by 20%, what is the net change?", options: ["0%","5% increase","5% decrease","No change"], answer: 0, hint: "1.25 × 0.80 = ?", explanation: "1.25 × 0.80 = 1.00. No change!", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A mixture has milk and water in ratio 3:2. If 10 liters of water is added, the ratio becomes 3:4. How much milk was there?", options: ["12","15","18","20"], answer: 1, hint: "Milk stays the same.", explanation: "M/W=3/2, M/(W+10)=3/4. M=3k, W=2k. 3k/(2k+10)=3/4 → k=5. Milk=15.", difficulty: "hard", source: "Singapore Math" },
      { q: "Two trains start 600 km apart heading toward each other at 70 and 80 km/h. A bee (150 km/h) flies back and forth between them until they meet. How far does the bee fly?", options: ["500 km","550 km","600 km","650 km"], answer: 2, hint: "How long until trains meet?", explanation: "Trains meet in 600/150=4h. Bee flies 150×4=600 km.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A rectangular field is 50% longer than it is wide. The area is 600 m². What is the perimeter?", options: ["90 m","100 m","110 m","120 m"], answer: 1, hint: "L=1.5W, L×W=600.", explanation: "1.5W²=600, W²=400, W=20, L=30. P=2(20+30)=100.", difficulty: "hard", source: "Noetic Math" },
      { q: "A candle burns 1/4 of its length per hour. A second candle burns 1/3 per hour. Both lit at same time. When is candle 1 twice the length of candle 2?", options: ["1 hour","1.5 hours","2 hours","2.5 hours"], answer: 2, hint: "After t hours: (1−t/4)=2(1−t/3).", explanation: "1−t/4=2−2t/3 → 5t/12=1 → t=2.4... closest=2h.", difficulty: "hard", source: "Math Kangaroo" },
      { q: "Ava scores 85, 90, 78, and 92 on four tests. What must she score on the 5th test to have an average of exactly 88?", options: ["93","95","97","99"], answer: 1, hint: "Total needed: 88×5=440.", explanation: "85+90+78+92=345. Need 440−345=95.", difficulty: "medium", source: "MOEMS" },
      { q: "A store offers 30% off, then an additional 10% off the sale price. What is the total discount?", options: ["33%","36%","37%","40%"], answer: 2, hint: "0.7 × 0.9 = ?", explanation: "0.7×0.9=0.63. Discount=37%.", difficulty: "hard", source: "Singapore Math" },
      { q: "Working together, Ali and Bob can paint a room in 6 hours. Ali alone takes 10 hours. How long does Bob take alone?", options: ["12 hours","15 hours","18 hours","20 hours"], answer: 1, hint: "1/10 + 1/B = 1/6.", explanation: "1/B = 1/6−1/10 = 1/15. Bob: 15 hours.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A 200-page book: Raj reads 1/5 on Day 1, then 1/4 of the remaining on Day 2, then 1/3 of the remaining on Day 3. How many pages are left?", options: ["60","70","80","90"], answer: 2, hint: "Track remaining after each day.", explanation: "D1: 200−40=160. D2: 160−40=120. D3: 120−40=80.", difficulty: "hard", source: "Noetic Math" },
    ]
  },

  // ====================== GRADE 6 ======================
  6: {
    word: [
      { q: "A boat goes 24 km upstream in 3 hours and 24 km downstream in 2 hours. Find the speed of the current.", options: ["1 km/h","2 km/h","3 km/h","4 km/h"], answer: 1, hint: "Upstream speed=24/3=8, downstream=24/2=12.", explanation: "Current = (12−8)/2 = 2 km/h.", difficulty: "hard", source: "Singapore Math" },
      { q: "A group of people share a bill equally. If 3 more people join, each person pays $6 less. If 2 leave, each pays $10 more. How many people originally?", options: ["10","12","15","18"], answer: 2, hint: "Let n=people, T=total bill.", explanation: "T/n − T/(n+3)=6 and T/(n−2)−T/n=10. n=15, T=450.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A clock gains 5 minutes every hour. It is set correctly at noon. What time does it show when the actual time is 6:00 PM?", options: ["6:24 PM","6:30 PM","6:36 PM","6:40 PM"], answer: 1, hint: "6 hours × 5 extra minutes.", explanation: "Gains 5min/hr × 6hr = 30min. Shows 6:30 PM.", difficulty: "medium", source: "Math Kangaroo" },
      { q: "A 20% profit on cost price A equals a 16⅔% loss on cost price B. Find the ratio A:B.", options: ["4:5","5:6","5:8","6:5"], answer: 1, hint: "1.2A = 0.8333B.", explanation: "1.2A = (5/6)B → A/B = 5/6.", difficulty: "hard", source: "Singapore Math" },
      { q: "Three pipes can fill a pool: A in 10h, B in 12h, C in 15h. All three open together, how long to fill?", options: ["3 hours","4 hours","5 hours","6 hours"], answer: 1, hint: "1/10 + 1/12 + 1/15 per hour.", explanation: "6/60+5/60+4/60 = 15/60 = 1/4 per hour. 4 hours.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A and B start running around a 400m track. A runs at 5 m/s, B at 3 m/s in the same direction. When does A first lap B?", options: ["100s","150s","200s","250s"], answer: 2, hint: "A gains 2 m/s on B.", explanation: "A needs to gain 400m. 400÷2 = 200 seconds.", difficulty: "hard", source: "Noetic Math" },
      { q: "An alloy of gold and silver weighs 20g. Gold costs $50/g, silver costs $10/g. The alloy is worth $520. How many grams of gold?", options: ["6","8","10","12"], answer: 1, hint: "50g + 10(20−g) = 520.", explanation: "50g+200−10g=520 → 40g=320 → g=8.", difficulty: "hard", source: "MOEMS" },
      { q: "Walking at 4 km/h, you arrive 10 min late. At 6 km/h, you arrive 10 min early. What is the distance?", options: ["3 km","4 km","5 km","6 km"], answer: 1, hint: "d/4 − d/6 = 20 min = 1/3 hour.", explanation: "d/4−d/6=1/3 → d/12=1/3 → d=4 km.", difficulty: "hard", source: "Singapore Math" },
    ]
  },

  // ====================== GRADE 7 ======================
  7: {
    word: [
      { q: "A bacteria population triples every 2 hours. Starting with 100, how many after 8 hours?", options: ["2700","5400","8100","10800"], answer: 2, hint: "4 doublings of 2 hours each.", explanation: "4 triplings: 100×3⁴ = 100×81 = 8100.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A and B invest $3000 and $5000 respectively. After a year they earn $2400 profit. If A invested for 12 months and B for 8 months, how should the profit be split for A?", options: ["$800","$900","$1000","$1100"], answer: 1, hint: "Weighted by money×time.", explanation: "A: 3000×12=36000, B: 5000×8=40000. A's share: (36/76)×2400=$900.", difficulty: "hard", source: "Singapore Math" },
      { q: "A cistern has a leak that empties it in 8 hours. A pipe fills it in 6 hours. If both are open, how long to fill?", options: ["12 hours","18 hours","24 hours","48 hours"], answer: 2, hint: "Net rate = 1/6 − 1/8.", explanation: "1/6−1/8 = 1/24 per hour. Takes 24 hours.", difficulty: "hard", source: "MOEMS" },
      { q: "Train A (60 km/h) starts 2 hours before Train B (80 km/h) from the same station in the same direction. When does B catch A?", options: ["4 hours","5 hours","6 hours","8 hours"], answer: 2, hint: "A has a 120 km head start.", explanation: "A leads 120km. B gains 20km/h. 120÷20=6 hours after B starts.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A can of paint covers 50 m². A room is 5m×4m×3m (L×W×H). How many cans to paint all 4 walls and the ceiling?", options: ["2","3","4","5"], answer: 1, hint: "Walls + ceiling area.", explanation: "Walls: 2(5×3)+2(4×3)=54. Ceiling: 20. Total=74. 74÷50→2 cans.", difficulty: "medium", source: "Singapore Math" },
      { q: "A sells an item at 20% profit to B, who sells it at 25% profit to C for $150. What did A pay?", options: ["$90","$95","$100","$105"], answer: 2, hint: "Work backwards from C.", explanation: "B's cost: 150/1.25=120. A's cost: 120/1.20=100.", difficulty: "hard", source: "Singapore Math" },
      { q: "The sum of three consecutive even numbers is 78. What is the product of the smallest and largest?", options: ["640","672","704","728"], answer: 1, hint: "Middle number = 78÷3.", explanation: "Numbers: 24, 26, 28. Product: 24×28=672.", difficulty: "medium", source: "MOEMS" },
      { q: "A fruit seller buys 120 oranges. 20% are rotten. He sells the rest at $2 each and makes $32 profit. What was his cost per orange?", options: ["$1.50","$1.60","$1.67","$1.73"], answer: 1, hint: "Good oranges: 96. Revenue: $192.", explanation: "Revenue=96×2=192. Cost=192−32=160. Per orange: 160÷100=1.60.", difficulty: "hard", source: "Noetic Math" },
    ]
  },

  // ====================== GRADE 8 ======================
  8: {
    word: [
      { q: "Two pipes together fill a tank in 12 minutes. One pipe is 10 min faster than the other alone. How long does the faster pipe take alone?", options: ["15 min","20 min","25 min","30 min"], answer: 1, hint: "Let slower=t, faster=t−10. 1/t+1/(t−10)=1/12.", explanation: "1/t+1/(t−10)=1/12 → t=30, fast=20 min.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A boat takes 4 hours upstream and 3 hours downstream for the same 60 km. Find the boat's speed in still water.", options: ["15 km/h","17.5 km/h","20 km/h","22.5 km/h"], answer: 1, hint: "Upstream: 60/4=15. Downstream: 60/3=20.", explanation: "Still water = (15+20)/2 = 17.5 km/h.", difficulty: "hard", source: "Singapore Math" },
      { q: "A shopkeeper marks up goods by 50% then offers 20% discount. What is his profit percentage?", options: ["10%","15%","20%","30%"], answer: 2, hint: "Mark up then discount.", explanation: "Cost=100. Marked=150. Selling=150×0.8=120. Profit=20%.", difficulty: "hard", source: "Singapore Math" },
      { q: "In a class, 60% passed math, 70% passed science, and 50% passed both. What % failed both?", options: ["10%","15%","20%","25%"], answer: 2, hint: "Use inclusion-exclusion.", explanation: "Passed at least one: 60+70−50=80%. Failed both: 20%.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A ladder 25 ft long leans against a wall. The bottom is 7 ft from the wall. How high does it reach?", options: ["18 ft","20 ft","22 ft","24 ft"], answer: 3, hint: "Pythagorean theorem.", explanation: "h²+7²=25² → h²=625−49=576 → h=24.", difficulty: "medium", source: "MOEMS" },
      { q: "An investment of $P doubles in 5 years at compound interest. How many years to become 8P?", options: ["10","12","15","20"], answer: 2, hint: "Doubles every 5 years.", explanation: "2P in 5yr, 4P in 10yr, 8P in 15yr.", difficulty: "hard", source: "AMC 8 / AOPS" },
      { q: "A cone and a cylinder have the same base radius and height. The cylinder holds 90 ml. How much does the cone hold?", options: ["22.5 ml","30 ml","45 ml","60 ml"], answer: 1, hint: "V_cone = ⅓ × V_cylinder.", explanation: "Cone = 90÷3 = 30 ml.", difficulty: "medium", source: "Singapore Math" },
      { q: "The product of two numbers is 192. Their HCF is 4. The numbers are in ratio 3:4. Find the larger number.", options: ["12","16","20","24"], answer: 1, hint: "Numbers = 3k and 4k where k is a multiple of HCF.", explanation: "3k×4k=192, and HCF=4. Numbers: 12 and 16.", difficulty: "hard", source: "MOEMS" },
      { q: "A man rows 8 km downstream in 40 min and 8 km upstream in 1 hour. Find the speed of the stream.", options: ["1 km/h","2 km/h","3 km/h","4 km/h"], answer: 1, hint: "Downstream=12km/h, Upstream=8km/h.", explanation: "Stream = (12−8)/2 = 2 km/h.", difficulty: "hard", source: "Singapore Math" },
      { q: "Three numbers are in AP. Their sum is 27 and product is 648. Find the largest.", options: ["11","12","13","14"], answer: 1, hint: "Let them be a−d, a, a+d.", explanation: "3a=27 → a=9. 9(81−d²)=648 → d²=9 → d=3. Numbers: 6,9,12.", difficulty: "hard", source: "AMC 8 / AOPS" },
    ]
  }

  };

  // Merge into main QUESTIONS bank
  for (const grade in WORD_PROBLEMS) {
    if (typeof QUESTIONS === 'undefined') break;
    if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
    for (const cat in WORD_PROBLEMS[grade]) {
      if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
      QUESTIONS[grade][cat].push(...WORD_PROBLEMS[grade][cat]);
    }
  }
})();
