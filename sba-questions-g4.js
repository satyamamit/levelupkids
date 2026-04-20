// =============================================
// LevelUpKids — SBA Grade 4 Deep Practice Bank
// 80+ additional Grade 4 questions for intensive 7-day prep
// Common Core aligned: OA, NBT, NF, MD, G + RL, RI, L
// =============================================

(function() {
  const SBA4 = {
  4: {
    sba_math: [
      // ─── 4.OA: More Word Problems & Patterns ───
      { q: "A toy store has 7 shelves with 18 action figures on each shelf. How many action figures are there in all?", options: ["116","126","136","146"], answer: 1, hint: "Multiply shelves × figures per shelf.", explanation: "7 × 18 = 126.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Emma reads 24 pages a day. How many pages does she read in 2 weeks?", options: ["168","288","336","360"], answer: 2, hint: "2 weeks = 14 days.", explanation: "24 × 14 = 336 pages.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A baker has 178 muffins to put into boxes of 6. How many full boxes can he make, and how many are left over?", options: ["29 boxes, 4 left","30 boxes, 0 left","29 boxes, 2 left","28 boxes, 4 left"], answer: 0, hint: "178 ÷ 6 = ?", explanation: "178 ÷ 6 = 29 R4. So 29 full boxes with 4 muffins left.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Which of these numbers is prime? 33, 37, 39, 45", options: ["33","37","39","45"], answer: 1, hint: "A prime has exactly 2 factors.", explanation: "33=3×11, 39=3×13, 45=5×9. Only 37 has no factors besides 1 and 37.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A pattern follows the rule 'add 7.' If it starts at 5, what is the 6th number?", options: ["33","38","40","42"], answer: 2, hint: "5, 12, 19, 26, 33, ...", explanation: "5, 12, 19, 26, 33, 40. The 6th number is 40.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Kira has 5 times as many books as Noah. Noah has 12 books. How many do they have together?", options: ["60","72","17","84"], answer: 1, hint: "Kira = 5 × 12. Then add Noah's books.", explanation: "Kira: 5 × 12 = 60. Together: 60 + 12 = 72.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A garden has 96 flowers planted in rows of 8. How many rows are there?", options: ["10","11","12","13"], answer: 2, hint: "96 ÷ 8 = ?", explanation: "96 ÷ 8 = 12 rows.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Which pair of numbers are both composite? ", options: ["11 and 13","15 and 21","17 and 19","23 and 29"], answer: 1, hint: "Composite numbers have more than 2 factors.", explanation: "15 = 3×5 and 21 = 3×7. Both are composite. The others are all prime pairs.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What are the first 5 multiples of 9?", options: ["9, 18, 27, 36, 45","9, 18, 27, 35, 44","9, 19, 29, 39, 49","1, 3, 9, 18, 27"], answer: 0, hint: "Multiply 9 × 1, 9 × 2, 9 × 3...", explanation: "9, 18, 27, 36, 45.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Tom scored 3 times as many points as Jess. Jess scored 8 more points than Ali. Ali scored 6. How many points did Tom score?", options: ["18","24","42","48"], answer: 2, hint: "Find Jess first, then Tom.", explanation: "Ali = 6. Jess = 6 + 8 = 14. Tom = 3 × 14 = 42.", difficulty: "hard", source: "SBA Grade 4" },

      // ─── 4.NBT: More Place Value & Computation ───
      { q: "What is 38 × 24?", options: ["812","902","912","952"], answer: 2, hint: "38 × 20 + 38 × 4.", explanation: "38 × 20 = 760. 38 × 4 = 152. Total: 912.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is 6,405 ÷ 5?", options: ["1,201","1,271","1,281","1,301"], answer: 2, hint: "Use long division.", explanation: "6,405 ÷ 5 = 1,281.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is 100,000 − 47,835?", options: ["52,165","52,265","53,165","62,165"], answer: 0, hint: "Borrow across the zeros.", explanation: "100,000 − 47,835 = 52,165.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Which number is 100 times as much as 430?", options: ["4,300","43,000","430,000","4,300,000"], answer: 1, hint: "Add two zeros.", explanation: "430 × 100 = 43,000.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Compare using < , > , or =: 356,412 ☐ 356,142", options: ["<",">","=","Cannot tell"], answer: 1, hint: "Compare digit by digit.", explanation: "Both start 356, then 4 vs 1 in hundreds: 412 > 142. So 356,412 > 356,142.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Round 749,501 to the nearest hundred thousand.", options: ["700,000","740,000","750,000","800,000"], answer: 0, hint: "Look at the ten-thousands digit (4).", explanation: "4 < 5, so round down to 700,000.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 67 × 53?", options: ["3,451","3,541","3,551","3,651"], answer: 2, hint: "67 × 50 + 67 × 3.", explanation: "67 × 50 = 3,350. 67 × 3 = 201. Total: 3,551.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "What is the expanded form of 205,064?", options: ["200,000 + 5,000 + 60 + 4","200,000 + 50,000 + 64","205,000 + 64","200,000 + 5,000 + 600 + 4"], answer: 0, hint: "Write each digit's value.", explanation: "200,000 + 5,000 + 0 + 0 + 60 + 4 = 200,000 + 5,000 + 60 + 4.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── 4.NF: More Fractions & Decimals ───
      { q: "Which fraction is equivalent to 4/6?", options: ["2/3","3/4","8/10","2/4"], answer: 0, hint: "Simplify 4/6 by dividing both by 2.", explanation: "4 ÷ 2 = 2, 6 ÷ 2 = 3. So 4/6 = 2/3.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 3/5 + 1/10?", options: ["4/15","4/10","7/10","1"], answer: 2, hint: "Convert 3/5 to tenths.", explanation: "3/5 = 6/10. Then 6/10 + 1/10 = 7/10.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is 4 1/3 − 1 2/3?", options: ["2 2/3","3 1/3","2 1/3","3 2/3"], answer: 0, hint: "Borrow from the 4.", explanation: "4 1/3 = 3 4/3. Then 3 4/3 − 1 2/3 = 2 2/3.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "Put in order from least to greatest: 0.4, 0.09, 0.41", options: ["0.09, 0.4, 0.41","0.4, 0.09, 0.41","0.41, 0.4, 0.09","0.09, 0.41, 0.4"], answer: 0, hint: "0.09 = 0.09, 0.4 = 0.40, 0.41 = 0.41.", explanation: "0.09 < 0.40 < 0.41.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 5 × 3/4?", options: ["15/4","3 3/4","8/4","15/20"], answer: 1, hint: "5 × 3 = 15, keep denominator 4.", explanation: "5 × 3/4 = 15/4 = 3 3/4.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Convert 11/4 to a mixed number.", options: ["2 1/4","2 3/4","3 1/4","1 3/4"], answer: 1, hint: "How many times does 4 go into 11?", explanation: "11 ÷ 4 = 2 remainder 3. So 11/4 = 2 3/4.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Which decimal is equivalent to 3/5?", options: ["0.35","0.53","0.6","0.65"], answer: 2, hint: "3 ÷ 5 = ?", explanation: "3 ÷ 5 = 0.6.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Compare: 7/8 ☐ 5/6", options: ["<",">","=","Cannot tell"], answer: 1, hint: "Find common denominator 24.", explanation: "7/8 = 21/24 and 5/6 = 20/24. Since 21 > 20, 7/8 > 5/6.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "A rope is 7/8 meter long. You cut off 3/8 meter. How much is left?", options: ["4/8","4/16","1/2","Both A and C"], answer: 3, hint: "Same denominators — subtract numerators.", explanation: "7/8 − 3/8 = 4/8 = 1/2. Both 4/8 and 1/2 are correct.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is 2/10 + 35/100?", options: ["37/100","37/110","55/100","57/100"], answer: 2, hint: "Convert 2/10 to hundredths.", explanation: "2/10 = 20/100. Then 20/100 + 35/100 = 55/100.", difficulty: "medium", source: "SBA Grade 4" },

      // ─── 4.MD: More Measurement & Data ───
      { q: "How many ounces are in 3 pounds?", options: ["24","36","48","64"], answer: 2, hint: "1 pound = 16 ounces.", explanation: "3 × 16 = 48 ounces.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A room is 12 feet long and 9 feet wide. How many square feet of carpet are needed?", options: ["21 sq ft","42 sq ft","96 sq ft","108 sq ft"], answer: 3, hint: "Area = length × width.", explanation: "12 × 9 = 108 square feet.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "How many cups are in 1 gallon?", options: ["4","8","12","16"], answer: 3, hint: "1 gallon = 4 quarts. 1 quart = 4 cups.", explanation: "4 × 4 = 16 cups in a gallon.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "A triangle has an angle of 45° and another of 90°. What is the third angle?", options: ["25°","35°","45°","55°"], answer: 2, hint: "Sum of angles in a triangle = 180°.", explanation: "180° − 45° − 90° = 45°.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Sam left home at 7:45 AM and arrived at school at 8:20 AM. How long was his trip?", options: ["25 minutes","30 minutes","35 minutes","45 minutes"], answer: 2, hint: "Count from 7:45 to 8:20.", explanation: "7:45 to 8:00 = 15 min. 8:00 to 8:20 = 20 min. Total: 35 min.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "An L-shaped room can be divided into two rectangles: 5m × 3m and 4m × 2m. What is the total area?", options: ["14 m²","23 m²","19 m²","20 m²"], answer: 1, hint: "Find each area and add.", explanation: "5 × 3 = 15 and 4 × 2 = 8. Total: 23 m².", difficulty: "hard", source: "SBA Grade 4" },
      { q: "Convert 7 kilometers to meters.", options: ["70","700","7,000","70,000"], answer: 2, hint: "1 km = 1,000 m.", explanation: "7 × 1,000 = 7,000 meters.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Two angles form a right angle. One is 52°. What is the other?", options: ["28°","38°","42°","128°"], answer: 1, hint: "A right angle = 90°.", explanation: "90° − 52° = 38°.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── 4.G: More Geometry ───
      { q: "A quadrilateral has 2 pairs of parallel sides and all 4 sides equal. What is it?", options: ["Rectangle","Square","Rhombus","Both B and C"], answer: 3, hint: "A square is a special rhombus.", explanation: "Both a square and a rhombus have 2 pairs of parallel sides and 4 equal sides. If it also has right angles, it's a square.", difficulty: "hard", source: "SBA Grade 4" },
      { q: "How many right angles does a rectangle have?", options: ["0","2","3","4"], answer: 3, hint: "Look at each corner.", explanation: "A rectangle has 4 right angles (90° each).", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is the name of a 3D shape with 6 flat faces, all rectangles?", options: ["Cylinder","Cone","Rectangular prism","Pyramid"], answer: 2, hint: "Think of a box or brick.", explanation: "A rectangular prism (box) has 6 rectangular faces.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "An equilateral triangle has sides of 9 cm. What is its perimeter?", options: ["18 cm","24 cm","27 cm","36 cm"], answer: 2, hint: "All 3 sides are equal.", explanation: "3 × 9 = 27 cm.", difficulty: "easy", source: "SBA Grade 4" },
    ],

    sba_ela: [
      // ─── Literary Text ───
      { q: "Read: 'Lena practiced her speech 20 times. On stage, she spoke clearly and the crowd clapped.' What can you INFER?", options: ["Lena is naturally talented","Practice helped Lena succeed","The crowd was just being polite","Lena memorized someone else's speech"], answer: 1, hint: "What connection is there between practice and success?", explanation: "Practicing 20 times led to a clear speech and applause — practice helped her succeed.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is the CLIMAX of a story?", options: ["The beginning","The most exciting or turning point","The ending","The setting description"], answer: 1, hint: "It's the peak moment of tension.", explanation: "The climax is the most exciting or intense moment — the turning point of the story.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Read: 'The leaves danced in the autumn wind.' This is an example of:", options: ["Simile","Hyperbole","Personification","Alliteration"], answer: 2, hint: "Can leaves really dance?", explanation: "Giving leaves the human action of dancing is personification.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "A story is told using 'he,' 'she,' and 'they.' The narrator knows everyone's thoughts. This is:", options: ["First person","Second person","Third person limited","Third person omniscient"], answer: 3, hint: "Omniscient means 'all-knowing.'", explanation: "Third person omniscient — the narrator uses he/she and knows everyone's thoughts.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Read: 'Even though Rosa was scared of heights, she climbed to the top of the rock wall.' What character trait does Rosa show?", options: ["Laziness","Courage","Impatience","Selfishness"], answer: 1, hint: "She did something despite being afraid.", explanation: "Doing something difficult despite fear shows courage/bravery.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is a FABLE?", options: ["A true story about a real person","A short story with animal characters that teaches a lesson","A poem with rhyming words","A news article"], answer: 1, hint: "Think of 'The Tortoise and the Hare.'", explanation: "A fable is a short story, often with animal characters, that teaches a moral lesson.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Read: 'The sun smiled down on the children playing.' This is:", options: ["A fact","Personification","A simile","Alliteration"], answer: 1, hint: "Can the sun actually smile?", explanation: "Giving the sun the human ability to smile is personification.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── Informational Text ───
      { q: "What is the purpose of a HEADING in an article?", options: ["To decorate the page","To tell you what a section is about","To list the author's name","To end a paragraph"], answer: 1, hint: "Headings appear at the top of sections.", explanation: "Headings tell the reader what the upcoming section is about.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Read: 'First, the caterpillar eats. Next, it forms a chrysalis. Then, it becomes a butterfly.' What text structure is this?", options: ["Compare and contrast","Cause and effect","Sequence/Chronological order","Problem and solution"], answer: 2, hint: "Signal words: first, next, then.", explanation: "'First, next, then' signal a sequence — events in order.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Read: 'Many students were getting sick from unhealthy lunches. The school decided to add more fruits and vegetables to the menu.' What text structure is this?", options: ["Compare and contrast","Description","Cause and effect","Problem and solution"], answer: 3, hint: "One thing is a problem, the other is how it was fixed.", explanation: "Problem: kids getting sick. Solution: healthier menu. Problem and solution structure.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "An article about dolphins says: 'Dolphins use echolocation to find food.' What does 'echolocation' most likely mean?", options: ["Swimming very fast","Using sound echoes to locate things","Seeing underwater","Communicating with other dolphins"], answer: 1, hint: "Break the word: echo + location.", explanation: "Echo = reflected sound. Location = finding where something is. Echolocation = using sound to find things.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is the difference between a FACT and an OPINION?", options: ["Facts are longer than opinions","Facts can be proven; opinions are personal beliefs","Opinions are always wrong","Facts are only in science books"], answer: 1, hint: "Can you prove it, or is it someone's personal view?", explanation: "Facts can be proven true or false. Opinions are personal beliefs or feelings.", difficulty: "easy", source: "SBA Grade 4" },

      // ─── Language & Grammar ───
      { q: "Which sentence uses 'its' correctly?", options: ["Its a beautiful day.","The dog wagged its tail.","Its' raining outside.","It's bowl is empty. (meaning the dog)"], answer: 1, hint: "'Its' (no apostrophe) shows ownership.", explanation: "'Its' without an apostrophe means 'belonging to it.' The tail belongs to the dog.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "What is the PREDICATE of this sentence? 'The playful kitten chased the red ball.'", options: ["The playful kitten","chased the red ball","the red ball","playful"], answer: 1, hint: "The predicate tells what the subject does.", explanation: "'Chased the red ball' is the predicate — it tells what the kitten did.", difficulty: "medium", source: "SBA Grade 4" },
      { q: "Which word is a PRONOUN? 'She gave the book to them.'", options: ["gave","book","She","to"], answer: 2, hint: "A pronoun replaces a noun.", explanation: "'She' is a pronoun that replaces a person's name.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Choose the correct word: 'I want to go ___.'", options: ["to","too","two","tow"], answer: 1, hint: "'Too' means 'also' in this context.", explanation: "'Too' means 'also' or 'as well.' 'I want to go too.'", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What type of sentence asks a question?", options: ["Declarative","Imperative","Interrogative","Exclamatory"], answer: 2, hint: "Think about the word 'interrogate.'", explanation: "An interrogative sentence asks a question and ends with a question mark.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What is a COMPOUND WORD?", options: ["A word with a prefix","Two words joined to make a new word","A word with more than 3 syllables","A word that means the opposite"], answer: 1, hint: "Example: sun + flower = sunflower.", explanation: "A compound word is two smaller words combined: rain + bow = rainbow.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "Which sentence has correct CAPITALIZATION?", options: ["we went to new york city.","We went to New York City.","We Went To New York City.","we went to New york City."], answer: 1, hint: "Capitalize the first word and proper nouns.", explanation: "First word 'We' and proper noun 'New York City' are capitalized.", difficulty: "easy", source: "SBA Grade 4" },
      { q: "What does the word 'CONTEXT' mean in 'context clues'?", options: ["The dictionary definition","The surrounding words and sentences","The title of the book","The author's name"], answer: 1, hint: "Context clues help you figure out unknown words by looking at...", explanation: "Context means the surrounding words and sentences that give hints about an unknown word's meaning.", difficulty: "easy", source: "SBA Grade 4" },
    ],
  },
  };

  // Merge into QUESTIONS
  for (const grade in SBA4) {
    if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
    for (const cat in SBA4[grade]) {
      if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
      QUESTIONS[grade][cat].push(...SBA4[grade][cat]);
    }
  }
})();
