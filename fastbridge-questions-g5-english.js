// =============================================
// LevelUpKids - FastBridge Grade 5 English Booster Pack
// Focus: vocabulary, grammar, reading, and spelling fluency
// =============================================

(function () {
  if (typeof ENGLISH_QUESTIONS === 'undefined') return;

  if (!ENGLISH_QUESTIONS[5]) {
    ENGLISH_QUESTIONS[5] = { vocabulary: [], grammar: [], reading: [], spelling: [] };
  }

  const grade5 = ENGLISH_QUESTIONS[5];
  if (!grade5.vocabulary) grade5.vocabulary = [];
  if (!grade5.grammar) grade5.grammar = [];
  if (!grade5.reading) grade5.reading = [];
  if (!grade5.spelling) grade5.spelling = [];

  const FB5_ENGLISH = {
    vocabulary: [
      { q: "What does 'analyze' mean?", options: ["To skip quickly", "To examine carefully", "To copy exactly", "To guess wildly"], answer: 1, hint: "Scientists and readers do this with information.", explanation: "Analyze means to examine closely and thoughtfully.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is the best synonym for 'essential'?", options: ["Optional", "Unimportant", "Necessary", "Ordinary"], answer: 2, hint: "Essential means required.", explanation: "Necessary is the closest synonym for essential.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "What does the prefix 're-' mean in 'rebuild'?", options: ["Under", "Again", "Not", "Across"], answer: 1, hint: "Think about doing something a second time.", explanation: "The prefix 're-' means again.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "If a person is 'reluctant,' they are:", options: ["Eager and excited", "Unwilling or hesitant", "Very confident", "Extremely fast"], answer: 1, hint: "They do not want to do it right away.", explanation: "Reluctant means hesitant or unwilling.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word best fits: 'The detective found a _____ clue hidden behind the painting.'", options: ["obvious", "tiny", "critical", "colorful"], answer: 2, hint: "It was very important to solving the case.", explanation: "Critical means very important.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "What does 'contrast' mean as a reading skill?", options: ["Tell events in order", "Show similarities", "Show differences", "State opinions"], answer: 2, hint: "Compare and contrast has two parts.", explanation: "To contrast means to point out differences.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "The root 'struct' in 'construction' most nearly means:", options: ["to write", "to build", "to run", "to draw"], answer: 1, hint: "Think of structures and buildings.", explanation: "The root 'struct' means build.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is an antonym of 'scarce'?", options: ["Limited", "Rare", "Plentiful", "Small"], answer: 2, hint: "Opposite of hard to find.", explanation: "Plentiful is the opposite of scarce.", difficulty: "medium", source: "FastBridge Grade 5 Booster" }
    ],
    grammar: [
      { q: "Choose the sentence with correct subject-verb agreement.", options: ["The list of items are on the desk.", "The list of items is on the desk.", "The list of items be on the desk.", "The list of items were on the desk."], answer: 1, hint: "Subject is 'list,' not 'items.'", explanation: "'List' is singular, so use 'is.'", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which sentence uses punctuation correctly?", options: ["After lunch we practiced spelling.", "After lunch, we practiced spelling.", "After, lunch we practiced spelling.", "After lunch we, practiced spelling."], answer: 1, hint: "Use a comma after an introductory phrase.", explanation: "'After lunch' is introductory, so it is followed by a comma.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "Select the correctly written compound sentence.", options: ["I finished my homework, and I played outside.", "I finished my homework and, I played outside.", "I finished my homework and I played, outside.", "I finished my homework and I, played outside."], answer: 0, hint: "Two complete thoughts joined by a conjunction.", explanation: "The first option correctly joins two independent clauses.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word correctly completes the sentence? 'Neither the coach nor the players _____ ready to quit.'", options: ["was", "is", "are", "be"], answer: 2, hint: "Verb agrees with the subject closest to it.", explanation: "The nearest subject is plural ('players'), so 'are' is correct.", difficulty: "hard", source: "FastBridge Grade 5 Booster" },
      { q: "Which sentence is in past tense?", options: ["They jog every morning.", "They are jogging every morning.", "They jogged every morning last year.", "They will jog every morning."], answer: 2, hint: "Look for a completed action in the past.", explanation: "'Jogged' marks past tense.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "Pick the sentence that uses its/it's correctly.", options: ["The dog wagged it's tail.", "The dog wagged its tail.", "Its raining outside.", "The school changed it's rules."], answer: 1, hint: "its = possession, it's = it is.", explanation: "'Its tail' is possessive and does not take an apostrophe.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which sentence correctly uses a semicolon?", options: ["I wanted to read; but I was too sleepy.", "I wanted to read; I was too sleepy.", "I wanted; to read I was too sleepy.", "I wanted to read; and."], answer: 1, hint: "Use it between two related complete sentences.", explanation: "Both parts are complete clauses, so a semicolon works.", difficulty: "hard", source: "FastBridge Grade 5 Booster" },
      { q: "Which is the best revision for clarity? 'The bike was fixed by Maya quickly.'", options: ["Quickly, fixed by Maya, the bike.", "Maya quickly fixed the bike.", "The bike quickly by Maya fixed.", "Fixed the bike was Maya quickly."], answer: 1, hint: "Choose the clearest word order.", explanation: "Active voice with straightforward order is clearest.", difficulty: "medium", source: "FastBridge Grade 5 Booster" }
    ],
    reading: [
      { q: "Read: 'When the warning siren sounded, the campers moved to the shelter without delay.' What can you infer?", options: ["The campers ignored instructions", "The campers acted quickly for safety", "The shelter was far away", "The siren was for lunch"], answer: 1, hint: "Focus on 'without delay.'", explanation: "The phrase shows they responded quickly and safely.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Read: 'First, Ella brainstormed ideas. Next, she drafted her essay. Finally, she revised for clarity.' Which text structure is used?", options: ["Cause and effect", "Sequence", "Compare and contrast", "Problem and solution"], answer: 1, hint: "Look at 'First, Next, Finally.'", explanation: "These signal words show sequence order.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "Read: 'The city's new bike lanes reduced traffic near schools and helped students arrive on time.' The central idea is:", options: ["Cities should remove sidewalks", "Bike lanes can improve transportation", "Students dislike biking", "Traffic never changes"], answer: 1, hint: "What is the sentence mostly saying?", explanation: "The passage explains benefits of bike lanes for traffic and school travel.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "A paragraph describes both desert foxes and arctic foxes, highlighting how each survives in different climates. What is the likely purpose?", options: ["To sequence events", "To compare and contrast adaptations", "To persuade readers to buy a fox", "To define one vocabulary word"], answer: 1, hint: "Two animals, similarities and differences.", explanation: "The paragraph compares survival traits in different environments.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Read: 'Lena clenched her jaw, reread the instructions, and started again from step one.' Which trait best describes Lena?", options: ["Careless", "Persistent", "Impulsive", "Forgetful"], answer: 1, hint: "She keeps trying after a setback.", explanation: "Restarting carefully shows persistence.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which question best helps identify the author's purpose?", options: ["What color is the cover?", "Why did the author write this text?", "How many pages are there?", "What font size is used?"], answer: 1, hint: "Purpose asks about intent.", explanation: "Author's purpose focuses on why the text was written.", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "Read: 'Because the bridge was closed, buses followed a longer route and arrived twenty minutes late.' This sentence mainly shows:", options: ["Compare and contrast", "Problem and solution", "Cause and effect", "Description"], answer: 2, hint: "What happened because of the closure?", explanation: "Bridge closure (cause) led to late arrivals (effect).", difficulty: "easy", source: "FastBridge Grade 5 Booster" },
      { q: "In an informational article, a caption below a photo usually:", options: ["Adds unrelated jokes", "Explains or adds context to the image", "Replaces all paragraphs", "States the author's opinion only"], answer: 1, hint: "Captions help readers understand visuals.", explanation: "Captions clarify what the image shows and why it matters.", difficulty: "easy", source: "FastBridge Grade 5 Booster" }
    ],
    spelling: [
      { q: "Which word is spelled correctly?", options: ["seperate", "separate", "seperete", "separite"], answer: 1, hint: "Think: sep-a-rate.", explanation: "'Separate' is the correct spelling.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is spelled correctly?", options: ["definate", "definite", "defenite", "definete"], answer: 1, hint: "Not 'definately.'", explanation: "'Definite' is spelled d-e-f-i-n-i-t-e.", difficulty: "hard", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is spelled correctly?", options: ["responsible", "responsable", "respinsible", "responsibel"], answer: 0, hint: "A responsible student is reliable.", explanation: "'Responsible' is correct.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is spelled correctly?", options: ["environment", "enviroment", "envirenment", "environmant"], answer: 0, hint: "The world around us.", explanation: "'Environment' includes 'n' before 'm'.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is spelled correctly?", options: ["principal", "principle", "prinsipal", "princple"], answer: 0, hint: "The principal leads a school.", explanation: "'Principal' is correct for a school leader.", difficulty: "hard", source: "FastBridge Grade 5 Booster" },
      { q: "Choose the correctly spelled word.", options: ["occurence", "occurrence", "occurance", "ocurrence"], answer: 1, hint: "Double c and double r.", explanation: "'Occurrence' is the correct spelling.", difficulty: "hard", source: "FastBridge Grade 5 Booster" },
      { q: "Which is spelled correctly?", options: ["argument", "arguement", "arguemant", "argumint"], answer: 0, hint: "No extra 'e' after g.", explanation: "'Argument' is the correct form.", difficulty: "medium", source: "FastBridge Grade 5 Booster" },
      { q: "Which word is spelled correctly?", options: ["rhythm", "rythm", "rhythym", "rythym"], answer: 0, hint: "A music pattern.", explanation: "'Rhythm' is the correct spelling.", difficulty: "hard", source: "FastBridge Grade 5 Booster" }
    ]
  };

  grade5.vocabulary.push(...FB5_ENGLISH.vocabulary);
  grade5.grammar.push(...FB5_ENGLISH.grammar);
  grade5.reading.push(...FB5_ENGLISH.reading);
  grade5.spelling.push(...FB5_ENGLISH.spelling);
})();
