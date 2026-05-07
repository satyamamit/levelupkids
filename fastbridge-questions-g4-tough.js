// =============================================
// LevelUpKids — FastBridge Grade 4 TOUGH Questions
// Hard-level English (aReading) & Math (aMath) for 4th Grade
// Designed for advanced test prep & benchmark readiness
// =============================================

(function() {
  const FB4_TOUGH = {

  4: {
    arithmetic: [
      // ─── Tough aMath: Multi-step & Complex Reasoning ───
      { q: "Estimate: 78 × 42 ÷ 6 ≈ ?", options: ["400","500","550","650"], answer: 2, hint: "Round: 80 × 40 ÷ 6.", explanation: "80 × 40 = 3,200. 3,200 ÷ 6 ≈ 533, closest to 550.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "If n × 8 = 456, what is n?", options: ["54","56","57","58"], answer: 2, hint: "456 ÷ 8 = ?", explanation: "456 ÷ 8 = 57.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "[12 : 3] = [48 : ?]", options: ["4","8","12","16"], answer: 2, hint: "12 ÷ 4 = 3. Apply same to 48.", explanation: "Rule: ÷ 4. 48 ÷ 4 = 12.", difficulty: "hard", source: "CogAT Prep" },
      { q: "3, 5, 9, 15, 23, ?", options: ["31","33","35","37"], answer: 1, hint: "Differences: 2, 4, 6, 8, ...", explanation: "Differences increase by 2: 2, 4, 6, 8, 10. Next: 23 + 10 = 33.", difficulty: "hard", source: "HCP Prep" },
      { q: "[2 : 8] = [3 : 27] = [4 : ?]", options: ["32","36","48","64"], answer: 3, hint: "2³ = 8, 3³ = 27. So 4³ = ?", explanation: "Rule: cube. 4³ = 64.", difficulty: "hard", source: "CogAT Prep" },
      { q: "What is 125 × 16 using mental math?", options: ["1,500","1,800","2,000","2,500"], answer: 2, hint: "125 × 8 = 1,000. Then × 2.", explanation: "125 × 16 = 125 × 8 × 2 = 1,000 × 2 = 2,000.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A number doubled then increased by 15 equals 99. What is the number?", options: ["37","39","42","44"], answer: 2, hint: "2n + 15 = 99. Solve for n.", explanation: "2n = 99 − 15 = 84. n = 84 ÷ 2 = 42.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Estimate: 3,847 × 6 ≈ ?", options: ["18,000","21,000","24,000","28,000"], answer: 2, hint: "Round: 4,000 × 6.", explanation: "4,000 × 6 = 24,000.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "What are the next two numbers? 1, 2, 4, 7, 11, 16, ?, ?", options: ["20, 25","21, 27","22, 29","23, 30"], answer: 2, hint: "Differences: 1, 2, 3, 4, 5, ...", explanation: "Differences: +1,+2,+3,+4,+5,+6,+7. Next: 16+6=22, 22+7=29.", difficulty: "hard", source: "HCP Prep" },
      { q: "[7 : 49] = [11 : ?]", options: ["77","99","111","121"], answer: 3, hint: "7² = 49. So 11² = ?", explanation: "Rule: square. 11² = 121.", difficulty: "hard", source: "CogAT Prep" },
      { q: "I am a 4-digit number. My thousands digit is 3 more than my ones digit. My hundreds digit is twice my tens digit. My tens digit is 2 and my ones is 4. What am I?", options: ["7,424","7,244","7,442","4,724"], answer: 0, hint: "Ones=4, Tens=2, Hundreds=2×2=4, Thousands=4+3=7.", explanation: "Ones=4, Tens=2, Hundreds=4, Thousands=7 → 7,424.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "What is the remainder when 1,000 is divided by 7?", options: ["4","5","6","7"], answer: 2, hint: "7 × 142 = 994.", explanation: "7 × 142 = 994. 1,000 − 994 = 6. Remainder is 6.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "If the pattern is ×2, −3: starting at 5, what is the 5th number?", options: ["11","19","35","67"], answer: 2, hint: "5→7→11→19→35→67. Count carefully.", explanation: "5→(×2=10,−3=7)→(×2=14,−3=11)→(×2=22,−3=19)→(×2=38,−3=35). 5th is 35.", difficulty: "hard", source: "HCP Prep" },
      { q: "A number has 6 in the thousands place, 0 in the hundreds place, and is between 6,010 and 6,050. Which could it be?", options: ["6,005","6,032","6,103","6,500"], answer: 1, hint: "Must start with 60__ and be between 6,010 and 6,050.", explanation: "6,032 has 6 in thousands, 0 in hundreds, and is between 6,010 and 6,050.", difficulty: "hard", source: "FastBridge Prep" },
    ],
    geometry: [
      // ─── Tough Measurement & Geometry ───
      { q: "A rectangle has area 96 cm² and width 8 cm. What is its perimeter?", options: ["28 cm","32 cm","40 cm","48 cm"], answer: 2, hint: "Find length first: 96 ÷ 8.", explanation: "Length = 96 ÷ 8 = 12. Perimeter = 2(12+8) = 40 cm.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Convert 2 miles to feet.", options: ["5,280","8,400","10,560","15,840"], answer: 2, hint: "1 mile = 5,280 feet.", explanation: "2 × 5,280 = 10,560 feet.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A square garden has perimeter 100 feet. What is its area?", options: ["400 ft²","525 ft²","625 ft²","2,500 ft²"], answer: 2, hint: "Side = 100 ÷ 4 = 25. Area = side².", explanation: "Side = 25 ft. Area = 25 × 25 = 625 ft².", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Angle A = 47°, Angle B = 88°. Both are in a triangle. What is Angle C?", options: ["35°","45°","55°","65°"], answer: 1, hint: "Angles in a triangle sum to 180°.", explanation: "180 − 47 − 88 = 45°.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "An L-shaped figure: one part is 10m × 4m, the other is 6m × 3m. Total area?", options: ["52 m²","58 m²","62 m²","78 m²"], answer: 1, hint: "Add both rectangles' areas.", explanation: "10×4 = 40, 6×3 = 18. Total = 58 m².", difficulty: "hard", source: "FastBridge Prep" },
      { q: "How many milliliters in 4.5 liters?", options: ["45","450","4,500","45,000"], answer: 2, hint: "1 liter = 1,000 mL.", explanation: "4.5 × 1,000 = 4,500 mL.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "A hallway is 2 meters wide and 15 meters long. How many square tiles (50 cm × 50 cm) are needed to cover it?", options: ["60","100","120","240"], answer: 2, hint: "Convert to cm: 200 × 1500. Each tile covers 50×50=2,500 cm².", explanation: "Area = 200×1500 = 300,000 cm². Tiles = 300,000 ÷ 2,500 = 120.", difficulty: "hard", source: "FastBridge Prep" },
    ],
    word: [
      // ─── Tough Data & Problem Solving ───
      { q: "Scores: 72, 85, 91, 68, 94. What must a 6th score be to make the mean exactly 82?", options: ["80","82","84","82"], answer: 1, hint: "Total needed = 82 × 6. Subtract current sum.", explanation: "Need total = 492. Current = 410. Missing = 492 − 410 = 82.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A bag has 5 red, 3 blue, 2 green. You draw one, don't replace it, then draw again. P(red then blue)?", options: ["15/90","1/6","15/100","5/30"], answer: 1, hint: "P(red) × P(blue after red drawn).", explanation: "P(red)=5/10. P(blue|red drawn)=3/9. Product = 15/90 = 1/6.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Train A leaves at 9:15 AM going 60 mph. Train B leaves at 9:45 AM going 80 mph. When does B catch A?", options: ["10:45 AM","11:00 AM","11:15 AM","11:45 AM"], answer: 3, hint: "A has 30 min head start = 30 miles. B gains 20 mph.", explanation: "A's head start: 30 miles. B gains 20 mph. Time = 30÷20 = 1.5 hrs after 9:45 = 11:15 AM. Wait: let me recalculate. At 9:45, A is 30 mi ahead. B closes at 20 mph. 30÷20=1.5 hrs. 9:45+1:30=11:15. Answer is 11:15 AM.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A store has a 'buy 3, get 1 free' deal on $4 erasers. How much do 8 erasers cost?", options: ["$24","$28","$32","$20"], answer: 0, hint: "For every 4 erasers, you pay for 3.", explanation: "8 erasers = 2 groups of 4. Pay for 6: 6 × $4 = $24.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Data: 15, 22, 22, 18, 30, 22, 25. Mean − Mode = ?", options: ["0","1","2","3"], answer: 1, hint: "Find mean and mode separately.", explanation: "Mean = 154÷7 = 22. Mode = 22. Wait: Mean = (15+22+22+18+30+22+25)÷7 = 154÷7 = 22. Mode=22. Difference=0. Let me recheck: 15+22+22+18+30+22+25=154. 154÷7=22. Mode=22. 22−22=0.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A recipe for 6 cookies uses 2/3 cup sugar. How much sugar for 18 cookies?", options: ["1 cup","1½ cups","2 cups","2⅓ cups"], answer: 2, hint: "18 ÷ 6 = 3 batches.", explanation: "3 × 2/3 = 6/3 = 2 cups.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "In a class of 32, 3/8 chose pizza and 1/4 chose tacos. How many chose neither?", options: ["8","10","12","14"], answer: 2, hint: "Find pizza + tacos students, subtract from 32.", explanation: "Pizza: 3/8 × 32 = 12. Tacos: 1/4 × 32 = 8. Neither: 32−12−8 = 12.", difficulty: "hard", source: "FastBridge Prep" },
    ],

    // ─── Tough FastBridge English (aReading) for Grade 4 ───
    english: [
      // ─── Reading Comprehension & Inference ───
      { q: "Read: 'Marcus stared at the blank page, tapping his pencil. The clock ticked louder. Finally, he wrote one sentence and smiled.' What can you infer?", options: ["Marcus finished his homework early","Marcus was struggling but finally got started","Marcus doesn't like writing","The clock was broken"], answer: 1, hint: "What do the details suggest about his struggle?", explanation: "Staring at a blank page, tapping his pencil, and the clock ticking show struggle. Writing and smiling show he overcame it.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Read: 'The old house creaked in the wind. Dust danced in the dim light. No one had opened these doors in years.' The author's purpose is to:", options: ["Persuade you to buy the house","Create a mysterious, abandoned mood","Teach about old buildings","Make you laugh"], answer: 1, hint: "What feeling do the descriptions create?", explanation: "Words like 'creaked,' 'dust,' 'dim,' and 'no one' create a mysterious, eerie mood.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Which sentence contains a METAPHOR?", options: ["She ran like the wind.","The classroom was a zoo today.","He was very angry.","The stars twinkled brightly."], answer: 1, hint: "A metaphor says something IS something else (not 'like').", explanation: "'The classroom was a zoo' directly compares the classroom to a zoo without using 'like' or 'as.'", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Read: 'Despite the pouring rain, Aisha laced up her shoes and stepped outside for her daily run.' What character trait does Aisha show?", options: ["Carelessness","Determination","Confusion","Sadness"], answer: 1, hint: "She runs even in bad weather.", explanation: "Running despite rain shows determination and discipline.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "What does 'reading between the lines' mean?", options: ["Reading very carefully word by word","Understanding the hidden or implied meaning","Skipping lines while reading","Reading two books at once"], answer: 1, hint: "It's about finding meaning that isn't directly stated.", explanation: "It means understanding implied meaning — what the author suggests but doesn't say directly.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Read: 'The fox congratulated the crow on her beautiful voice and asked her to sing. When the crow opened her beak, the cheese fell.' What is the THEME?", options: ["Foxes are clever hunters","Crows shouldn't eat cheese","Don't trust flattery from those who want something","Singing is more important than eating"], answer: 2, hint: "Why did the fox compliment the crow?", explanation: "The fox used flattery to trick the crow. Theme: beware of those who flatter you to get what they want.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "In a story, the narrator says 'I felt my heart pound as I opened the envelope.' This is told from which point of view?", options: ["First person","Second person","Third person limited","Third person omniscient"], answer: 0, hint: "Look for 'I' or 'we.'", explanation: "The use of 'I' and describing personal feelings shows first person point of view.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Read: 'After weeks of saving every penny, Maya finally had enough to buy the telescope.' What can you conclude?", options: ["Maya is rich","The telescope was expensive for Maya","Maya doesn't like saving money","Someone gave Maya money"], answer: 1, hint: "She saved for WEEKS.", explanation: "Saving 'every penny' for 'weeks' shows the telescope was expensive relative to what Maya could earn.", difficulty: "hard", source: "FastBridge Prep" },

      // ─── Vocabulary in Context ───
      { q: "The hikers were EXHAUSTED after climbing the steep mountain. 'Exhausted' means:", options: ["Excited","Extremely tired","Lost","Hungry"], answer: 1, hint: "How would you feel after climbing a steep mountain?", explanation: "Exhausted means extremely tired, worn out — logical after a steep climb.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "'The evidence was SUFFICIENT to prove his innocence.' What does 'sufficient' mean?", options: ["Not enough","Fake","Enough","Confusing"], answer: 2, hint: "It was able to PROVE something.", explanation: "Sufficient means enough, adequate — there was enough evidence.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "The word 'UNPRECEDENTED' most likely means:", options: ["Very old","Never done before","Expected","Repeated many times"], answer: 1, hint: "Un- = not, precedent = something that came before.", explanation: "Un + precedented = not having happened before. Never done before.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "'She made a COMPELLING argument.' What does 'compelling' mean?", options: ["Weak and boring","Forceful and convincing","Short and simple","Funny and silly"], answer: 1, hint: "If an argument is compelling, you feel strongly pulled to agree.", explanation: "Compelling means convincing, persuasive — making you want to agree.", difficulty: "hard", source: "FastBridge Prep" },

      // ─── Text Structure & Features ───
      { q: "An article discusses how wolves and dogs are alike and different. This text structure is:", options: ["Cause and effect","Problem and solution","Compare and contrast","Chronological order"], answer: 2, hint: "Alike AND different = ?", explanation: "Discussing similarities and differences is compare and contrast structure.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Read: 'Ocean pollution kills marine life. Oil spills coat birds' feathers. Plastic bags choke sea turtles.' The author's purpose is to:", options: ["Entertain with ocean stories","Inform and persuade about ocean pollution","Describe a vacation at the beach","Compare different oceans"], answer: 1, hint: "The author is sharing harmful effects.", explanation: "The author informs about pollution's effects and implicitly persuades the reader it's a serious problem.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Which is the BEST summary of a passage about bees?", options: ["Bees are yellow and black insects that fly.","Bees play a crucial role in pollination, food production, and ecosystem health, but face threats from pesticides and habitat loss.","I think bees are interesting.","Bees make honey and live in hives with a queen."], answer: 1, hint: "A good summary covers the main idea and key details.", explanation: "Option B captures the main idea (importance of bees) and key details (threats) without being too broad or narrow.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "A timeline, numbered steps, and dates are clues that the text structure is:", options: ["Description","Compare/contrast","Sequence/chronological","Cause and effect"], answer: 2, hint: "These all relate to ORDER.", explanation: "Timelines, steps, and dates all indicate events in order — sequence/chronological structure.", difficulty: "medium", source: "FastBridge Prep" },

      // ─── Grammar & Language ───
      { q: "Which sentence uses a SEMICOLON correctly?", options: ["The dog barked; loudly.","I like pizza; it's my favorite food.","She went; to the store.","The cat; slept all day."], answer: 1, hint: "A semicolon joins two complete sentences.", explanation: "'I like pizza' and 'it's my favorite food' are both complete sentences joined by a semicolon.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Choose the correct sentence:", options: ["Me and him went to the park.","Him and I went to the park.","He and I went to the park.","He and me went to the park."], answer: 2, hint: "Use subject pronouns for the subject of the sentence.", explanation: "'He and I' are subject pronouns — correct for the subject of the sentence.", difficulty: "hard", source: "FastBridge Prep" },
      { q: "What is the ROOT WORD in 'unbelievable'?", options: ["un","believe","able","unbelieve"], answer: 1, hint: "Remove the prefix and suffix.", explanation: "Un- is the prefix, -able is the suffix. The root word is 'believe.'", difficulty: "medium", source: "FastBridge Prep" },
      { q: "Which word is an ADVERB? 'She quickly finished her homework.'", options: ["She","quickly","finished","homework"], answer: 1, hint: "Adverbs modify verbs and often end in -ly.", explanation: "'Quickly' describes HOW she finished — it modifies the verb.", difficulty: "medium", source: "FastBridge Prep" },
      { q: "'Their going to the store over they're.' Fix this sentence:", options: ["Their going to the store over there.","They're going to the store over their.","They're going to the store over there.","There going to the store over they're."], answer: 2, hint: "They're = they are. There = a place. Their = belonging to them.", explanation: "They're (they are) going to the store over there (a place).", difficulty: "hard", source: "FastBridge Prep" },
      { q: "Which sentence has a DEPENDENT CLAUSE?", options: ["The cat sat on the mat.","Because it was raining, we stayed inside.","I like apples and oranges.","She ran to school."], answer: 1, hint: "A dependent clause can't stand alone — it starts with words like 'because,' 'when,' 'if.'", explanation: "'Because it was raining' cannot stand alone — it's a dependent clause.", difficulty: "hard", source: "FastBridge Prep" },
    ],
  },

  };

  // ─── Merge into main QUESTIONS bank ─────────────────────
  if (typeof QUESTIONS !== 'undefined') {
    for (const grade in FB4_TOUGH) {
      if (!QUESTIONS[grade]) QUESTIONS[grade] = {};
      for (const cat in FB4_TOUGH[grade]) {
        if (!QUESTIONS[grade][cat]) QUESTIONS[grade][cat] = [];
        QUESTIONS[grade][cat].push(...FB4_TOUGH[grade][cat]);
      }
    }
  }

})();
