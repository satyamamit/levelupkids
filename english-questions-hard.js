// =============================================================
// LevelUpKids - HARD English Booster Pack (Competition Prep)
// Adds tougher, grade-level vocabulary, grammar, reading, and
// spelling questions for Grades 4, 5, and 6-8.
// Grades 7 and 8 share Grade 6's bank object, so pushing into
// Grade 6 automatically reaches Grades 7 and 8 as well.
// Must load AFTER english-questions.js.
// =============================================================
(function () {
  if (typeof ENGLISH_QUESTIONS === 'undefined') { return; }

  const SRC = "Competition Prep (Hard)";

  // Ensure a grade + its four subcategories exist before pushing.
  function ensureGrade(g) {
    if (!ENGLISH_QUESTIONS[g]) ENGLISH_QUESTIONS[g] = {};
    const gd = ENGLISH_QUESTIONS[g];
    ['vocabulary', 'grammar', 'reading', 'spelling'].forEach(c => {
      if (!Array.isArray(gd[c])) gd[c] = [];
    });
    return gd;
  }

  // Merge a {vocabulary, grammar, reading, spelling} pack into a grade,
  // stamping the shared source and avoiding duplicate question text.
  function addPack(g, pack) {
    const gd = ensureGrade(g);
    Object.keys(pack).forEach(cat => {
      if (!Array.isArray(gd[cat])) gd[cat] = [];
      const existing = new Set(gd[cat].map(q => q.q));
      pack[cat].forEach(q => {
        if (!existing.has(q.q)) {
          gd[cat].push(Object.assign({ source: SRC }, q));
          existing.add(q.q);
        }
      });
    });
  }

  // ==================== GRADE 4 (HARD) ====================
  addPack(4, {
    vocabulary: [
      { q: "The word 'brisk' most nearly means:", options: ["slow and tired", "quick and lively", "warm and cozy", "loud and angry"], answer: 1, hint: "A brisk walk is fast and energetic.", explanation: "Brisk means quick, active, and lively.", difficulty: "hard" },
      { q: "Which word is an antonym of 'generous'?", options: ["giving", "stingy", "kind", "caring"], answer: 1, hint: "The opposite of sharing freely.", explanation: "Stingy means unwilling to give — the opposite of generous.", difficulty: "hard" },
      { q: "In 'The fragile vase shattered on the floor,' 'fragile' means:", options: ["very strong", "easily broken", "brightly colored", "extremely heavy"], answer: 1, hint: "Why did it shatter so easily?", explanation: "Fragile means delicate and easily broken.", difficulty: "medium" },
      { q: "Which word means 'to give up or stop trying'?", options: ["pursue", "abandon", "gather", "attempt"], answer: 1, hint: "To leave something behind for good.", explanation: "Abandon means to give up completely.", difficulty: "hard" },
      { q: "Author is to book as artist is to ___.", options: ["reader", "painting", "museum", "frame"], answer: 1, hint: "What does an artist create?", explanation: "An author creates a book; an artist creates a painting.", difficulty: "hard" },
      { q: "The Latin root 'port' (as in transport, portable) means:", options: ["to see", "to carry", "to write", "to build"], answer: 1, hint: "A portable speaker can be carried.", explanation: "'Port' means to carry.", difficulty: "hard" },
      { q: "She was skeptical and refused to believe the story without proof. 'Skeptical' means:", options: ["trusting", "doubtful", "cheerful", "forgetful"], answer: 1, hint: "She wanted proof first.", explanation: "Skeptical means doubtful or not easily convinced.", difficulty: "hard" },
      { q: "Which sentence uses 'bark' the same way as 'The dog's bark was loud'?", options: ["The bark of the tree was rough", "I heard a sharp bark outside", "They sailed on a small bark", "Don't bark orders at me"], answer: 1, hint: "Which 'bark' is a sound an animal makes?", explanation: "'A sharp bark outside' uses bark as the animal sound.", difficulty: "hard" },
      { q: "After the long drought, the soil was too ___ to grow crops.", options: ["fertile", "barren", "moist", "rich"], answer: 1, hint: "A drought dries everything out.", explanation: "Barren means unable to produce plants or crops.", difficulty: "hard" },
      { q: "The prefix 'trans-' in 'transport' and 'translate' means:", options: ["before", "across or through", "against", "under"], answer: 1, hint: "Translate carries meaning across languages.", explanation: "'Trans-' means across or through.", difficulty: "hard" },
      { q: "Which word means nearly the same as 'enormous'?", options: ["average", "immense", "narrow", "brief"], answer: 1, hint: "Bigger than big.", explanation: "Immense means extremely large, like enormous.", difficulty: "medium" },
      { q: "A 'novice' is someone who is:", options: ["an expert", "a beginner", "a teacher", "a leader"], answer: 1, hint: "Just starting out.", explanation: "A novice is a beginner, new to something.", difficulty: "hard" },
    ],
    grammar: [
      { q: "Which sentence is punctuated correctly?", options: ["After we ate, we went home.", "After we ate we went, home.", "After, we ate we went home.", "After we ate we went home"], answer: 0, hint: "A comma follows an introductory phrase.", explanation: "A comma belongs after the introductory clause 'After we ate.'", difficulty: "hard" },
      { q: "Identify the verb tense: 'By noon, we had finished the project.'", options: ["simple past", "past perfect", "present perfect", "future"], answer: 1, hint: "'Had' + past participle.", explanation: "'Had finished' is the past perfect tense.", difficulty: "hard" },
      { q: "Which word is an adverb in 'The runner quickly passed the others'?", options: ["runner", "quickly", "passed", "others"], answer: 1, hint: "It describes HOW the runner passed.", explanation: "'Quickly' is an adverb modifying the verb 'passed.'", difficulty: "medium" },
      { q: "Choose the correct pronoun: 'Between you and ___, the secret is safe.'", options: ["I", "me", "myself", "mine"], answer: 1, hint: "After a preposition, use the object form.", explanation: "'Between you and me' — 'me' is the object of the preposition.", difficulty: "hard" },
      { q: "Which sentence has a compound subject?", options: ["The dog ran and barked.", "Maria and Jon built a fort.", "She sang loudly.", "They will leave soon."], answer: 1, hint: "Two subjects doing the action.", explanation: "'Maria and Jon' is a compound subject.", difficulty: "medium" },
      { q: "What is the correct plural of 'leaf'?", options: ["leafs", "leaves", "leafes", "leavs"], answer: 1, hint: "f changes to v.", explanation: "'Leaf' becomes 'leaves' in the plural.", difficulty: "medium" },
      { q: "Which sentence uses an apostrophe correctly?", options: ["The dogs bone is buried.", "The dog's bone is buried.", "The dogs' is buried.", "Its' a sunny day."], answer: 1, hint: "Possession by one dog.", explanation: "'Dog's bone' shows the bone belongs to one dog.", difficulty: "hard" },
      { q: "Identify the conjunction: 'I wanted to play, but it was raining.'", options: ["wanted", "play", "but", "raining"], answer: 2, hint: "It joins two ideas.", explanation: "'But' is a coordinating conjunction joining two clauses.", difficulty: "medium" },
      { q: "Comparative form: 'This puzzle is ___ than that one.'", options: ["difficult", "more difficult", "most difficult", "difficulty"], answer: 1, hint: "Comparing two puzzles.", explanation: "Use 'more difficult' to compare two things.", difficulty: "medium" },
      { q: "Fix the error: 'Each of the students have a book.' The correct verb is:", options: ["have", "has", "having", "had"], answer: 1, hint: "'Each' is singular.", explanation: "'Each' is singular, so it takes 'has.'", difficulty: "hard" },
      { q: "Which sentence is in the future tense?", options: ["She walks to school.", "She walked to school.", "She will walk to school.", "She is walking to school."], answer: 2, hint: "Look for 'will.'", explanation: "'Will walk' shows future tense.", difficulty: "medium" },
    ],
    reading: [
      { q: "'It was raining cats and dogs' is an example of:", options: ["a simile", "an idiom", "a metaphor", "alliteration"], answer: 1, hint: "It doesn't literally mean animals fall.", explanation: "An idiom is an expression whose meaning differs from its literal words.", difficulty: "hard" },
      { q: "Read: 'Maya clenched her fists and her face turned red as she read the note.' Maya most likely feels:", options: ["joyful", "angry", "sleepy", "curious"], answer: 1, hint: "Clenched fists and a red face.", explanation: "These details show Maya is angry.", difficulty: "hard" },
      { q: "'The wind howled and clawed at the windows' uses which technique?", options: ["personification", "simile", "onomatopoeia", "hyperbole"], answer: 0, hint: "Wind is given human/animal actions.", explanation: "Giving the wind human-like actions is personification.", difficulty: "hard" },
      { q: "An author who writes 'You should always recycle to save our planet' is trying to:", options: ["entertain", "persuade", "inform only", "tell a story"], answer: 1, hint: "They want you to act.", explanation: "The author is persuading the reader to recycle.", difficulty: "medium" },
      { q: "In a story, the 'climax' is:", options: ["the beginning", "the turning point of greatest tension", "the setting", "the list of characters"], answer: 1, hint: "The most exciting, tense moment.", explanation: "The climax is the high point of tension in a plot.", difficulty: "hard" },
      { q: "Read: 'Although Sam was exhausted, he finished the race.' The word 'although' signals:", options: ["a cause", "a contrast", "a sequence", "a comparison"], answer: 1, hint: "Tired BUT still finished.", explanation: "'Although' signals a contrast between two ideas.", difficulty: "hard" },
      { q: "Which sentence states a FACT, not an opinion?", options: ["Summer is the best season.", "Water freezes at 0 degrees Celsius.", "Pizza tastes amazing.", "Cats are cuter than dogs."], answer: 1, hint: "Which can be proven?", explanation: "Water freezing at 0 C can be proven; the others are opinions.", difficulty: "medium" },
      { q: "Read: 'The sky darkened and thunder rumbled in the distance.' This most likely foreshadows:", options: ["a sunny day", "an approaching storm", "a birthday party", "a long nap"], answer: 1, hint: "Darkening sky + thunder.", explanation: "These clues hint that a storm is coming (foreshadowing).", difficulty: "hard" },
      { q: "If a passage is told using 'I' and 'me,' it is written in:", options: ["first person", "second person", "third person", "no point of view"], answer: 0, hint: "The narrator is in the story.", explanation: "'I' and 'me' indicate first-person point of view.", difficulty: "medium" },
      { q: "The purpose of a glossary at the back of a book is to:", options: ["list page numbers", "define important words", "name the author", "show pictures"], answer: 1, hint: "Like a mini dictionary.", explanation: "A glossary defines key terms used in the book.", difficulty: "medium" },
    ],
    spelling: [
      { q: "Which word is spelled correctly?", options: ["definately", "definitely", "definatly", "definitley"], answer: 1, hint: "Contains the word 'finite.'", explanation: "'Definitely' contains 'finite.'", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["tomorow", "tommorow", "tomorrow", "tommorrow"], answer: 2, hint: "One m, two r's.", explanation: "'Tomorrow' has one m and two r's.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["wierd", "weird", "weerd", "weird"], answer: 1, hint: "An exception: e before i.", explanation: "'Weird' breaks the i-before-e rule.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["surprize", "suprise", "surprise", "surprice"], answer: 2, hint: "Don't forget the first r.", explanation: "'Surprise' has an r after 'su.'", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["familar", "familiar", "familair", "fimiliar"], answer: 1, hint: "Ends in -iar.", explanation: "'Familiar' ends in -iar.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["athlete", "athelete", "athleet", "athlate"], answer: 0, hint: "No extra 'e' in the middle.", explanation: "'Athlete' — ath + lete.", difficulty: "medium" },
      { q: "Which word is spelled correctly?", options: ["calender", "calandar", "calendar", "calemdar"], answer: 2, hint: "Ends in -dar.", explanation: "'Calendar' ends in -dar.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["embarass", "embarrass", "embaras", "embarras"], answer: 1, hint: "Double r, double s.", explanation: "'Embarrass' has two r's and two s's.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["goverment", "government", "govermant", "governmant"], answer: 1, hint: "Don't forget the 'n' in 'govern.'", explanation: "'Government' contains 'govern.'", difficulty: "medium" },
      { q: "Which word is spelled correctly?", options: ["libary", "library", "librery", "liberary"], answer: 1, hint: "Two r's.", explanation: "'Library' has an r in both syllables.", difficulty: "medium" },
    ],
  });

  // ==================== GRADE 5 (HARD) ====================
  addPack(5, {
    vocabulary: [
      { q: "Which word is the best synonym for 'meticulous'?", options: ["careless", "extremely careful", "quick", "lazy"], answer: 1, hint: "Paying attention to every detail.", explanation: "Meticulous means showing great attention to detail.", difficulty: "hard" },
      { q: "The root 'spect' (inspect, spectator) means:", options: ["to hear", "to look", "to move", "to speak"], answer: 1, hint: "A spectator watches.", explanation: "'Spect' means to look or see.", difficulty: "hard" },
      { q: "Which word means 'to make less severe'?", options: ["aggravate", "alleviate", "intensify", "provoke"], answer: 1, hint: "Medicine can ___ pain.", explanation: "Alleviate means to ease or lessen.", difficulty: "hard" },
      { q: "Confident is to insecure as generous is to ___.", options: ["kind", "stingy", "wealthy", "cheerful"], answer: 1, hint: "It's an antonym analogy.", explanation: "Confident/insecure are opposites; generous/stingy are opposites.", difficulty: "hard" },
      { q: "If an argument is 'valid,' it is:", options: ["false", "well-founded and logical", "confusing", "emotional"], answer: 1, hint: "It holds up to reason.", explanation: "A valid argument is sound and logical.", difficulty: "hard" },
      { q: "Which word means 'lasting a very short time'?", options: ["eternal", "fleeting", "permanent", "constant"], answer: 1, hint: "Gone in a moment.", explanation: "Fleeting means lasting only briefly.", difficulty: "hard" },
      { q: "The prefix 'circum-' (circumference) means:", options: ["around", "under", "against", "before"], answer: 0, hint: "To circumnavigate the globe is to go around it.", explanation: "'Circum-' means around.", difficulty: "hard" },
      { q: "A person who is 'indifferent' to something:", options: ["loves it deeply", "has no interest in it", "is afraid of it", "is an expert"], answer: 1, hint: "They don't care either way.", explanation: "Indifferent means having no particular interest or concern.", difficulty: "hard" },
      { q: "The witness gave a ___ account, leaving out no detail.", options: ["vague", "thorough", "brief", "careless"], answer: 1, hint: "Left nothing out.", explanation: "Thorough means complete and detailed.", difficulty: "medium" },
      { q: "'Benevolent' most nearly means:", options: ["cruel", "kind and charitable", "wealthy", "talkative"], answer: 1, hint: "Bene = good.", explanation: "Benevolent means well-meaning and kind.", difficulty: "hard" },
      { q: "Which word means 'to scatter or spread widely'?", options: ["gather", "disperse", "collect", "compress"], answer: 1, hint: "The crowd began to ___ after the show.", explanation: "Disperse means to spread out or scatter.", difficulty: "hard" },
      { q: "A 'tedious' task is one that is:", options: ["exciting", "long and boring", "dangerous", "easy"], answer: 1, hint: "It drags on and on.", explanation: "Tedious means tiresome and monotonous.", difficulty: "hard" },
    ],
    grammar: [
      { q: "Which sentence uses a colon correctly?", options: ["I need: eggs, milk, and bread.", "I need three things: eggs, milk, and bread.", "I need three things, eggs: milk, and bread.", "I: need three things."], answer: 1, hint: "A colon follows a complete sentence to introduce a list.", explanation: "A colon comes after a complete clause to introduce the list.", difficulty: "hard" },
      { q: "Identify the verb mood: 'If I were taller, I would dunk.'", options: ["indicative", "imperative", "subjunctive", "interrogative"], answer: 2, hint: "'If I were' expresses something hypothetical.", explanation: "The subjunctive mood expresses hypothetical or wishful situations.", difficulty: "hard" },
      { q: "Which sentence corrects 'Walking to school, the rain soaked Tom'?", options: ["Walking to school, the rain soaked Tom.", "Walking to school, Tom was soaked by the rain.", "The rain, walking to school, soaked Tom.", "Soaked by walking, the rain hit Tom."], answer: 1, hint: "Who was walking? Tom.", explanation: "The subject 'Tom' must follow the modifier 'Walking to school.'", difficulty: "hard" },
      { q: "Choose the correct word: 'The team celebrated ___ victory.'", options: ["it's", "its", "its'", "it is"], answer: 1, hint: "Possessive, not a contraction.", explanation: "'Its' is the possessive form; 'it's' means 'it is.'", difficulty: "hard" },
      { q: "Which is an independent clause?", options: ["when the bell rang", "because she was late", "the students cheered", "after the long day"], answer: 2, hint: "Can it stand alone as a sentence?", explanation: "'The students cheered' is a complete sentence.", difficulty: "medium" },
      { q: "Identify the appositive: 'My brother, a talented chef, cooked dinner.'", options: ["My brother", "a talented chef", "cooked dinner", "dinner"], answer: 1, hint: "It renames the noun beside it.", explanation: "'A talented chef' renames 'my brother' — it's an appositive.", difficulty: "hard" },
      { q: "Which sentence is correct?", options: ["Neither the players nor the coach were ready.", "Neither the players nor the coach was ready.", "Neither the players or the coach was ready.", "Neither the players nor the coach be ready."], answer: 1, hint: "The verb agrees with the nearer subject 'coach.'", explanation: "With 'neither...nor,' the verb agrees with the closest subject ('coach' = was).", difficulty: "hard" },
      { q: "Which word is a gerund in 'Swimming is great exercise'?", options: ["Swimming", "is", "great", "exercise"], answer: 0, hint: "An -ing verb acting as a noun.", explanation: "'Swimming' is a gerund — a verb form used as a noun.", difficulty: "hard" },
      { q: "Which sentence is in active voice?", options: ["The ball was thrown by Jen.", "The window was broken.", "Jen threw the ball.", "Mistakes were made."], answer: 2, hint: "The subject does the action.", explanation: "'Jen threw the ball' — the subject performs the action (active voice).", difficulty: "hard" },
      { q: "Identify the error: 'Me and him went to the park.' The correct subject is:", options: ["Me and him", "Him and me", "He and I", "I and he"], answer: 2, hint: "Use subject pronouns: he, I.", explanation: "'He and I' are subject pronouns in the conventional order.", difficulty: "hard" },
    ],
    reading: [
      { q: "'The classroom was a zoo during the party' is an example of:", options: ["a simile", "a metaphor", "an idiom", "alliteration"], answer: 1, hint: "It calls one thing another, no 'like' or 'as.'", explanation: "A metaphor directly states one thing IS another.", difficulty: "hard" },
      { q: "An author's 'tone' refers to:", options: ["the reader's emotion", "the author's attitude toward the subject", "the story's setting", "the number of characters"], answer: 1, hint: "How does the writer feel about the topic?", explanation: "Tone is the author's attitude conveyed through word choice.", difficulty: "hard" },
      { q: "Read: 'The new policy was, ironically, supposed to save time but wasted hours.' This is an example of:", options: ["a flashback", "irony", "foreshadowing", "a metaphor"], answer: 1, hint: "The opposite of what was intended happened.", explanation: "Irony is when the result is opposite to what is expected.", difficulty: "hard" },
      { q: "The central message or lesson of a story is called the:", options: ["plot", "theme", "setting", "climax"], answer: 1, hint: "The 'big idea' or moral.", explanation: "The theme is the underlying message of a story.", difficulty: "medium" },
      { q: "Read: 'Critics praised the film, but audiences found it dull.' This sentence shows:", options: ["cause and effect", "a contrast", "a sequence", "a definition"], answer: 1, hint: "Two opposite reactions.", explanation: "The word 'but' signals a contrast.", difficulty: "hard" },
      { q: "An 'inference' is:", options: ["a direct quote", "a conclusion drawn from clues", "the title", "a definition"], answer: 1, hint: "Reading between the lines.", explanation: "An inference is a conclusion based on evidence and reasoning.", difficulty: "hard" },
      { q: "Read: 'Hours felt like years as she waited for the results.' This is an example of:", options: ["hyperbole", "simile", "alliteration", "fact"], answer: 0, hint: "An obvious exaggeration.", explanation: "Hyperbole is deliberate exaggeration for effect.", difficulty: "hard" },
      { q: "A story told by a narrator who knows all characters' thoughts uses:", options: ["first-person", "second-person", "third-person limited", "third-person omniscient"], answer: 3, hint: "'Omniscient' means all-knowing.", explanation: "An omniscient narrator knows every character's thoughts.", difficulty: "hard" },
      { q: "Read: 'The leaves trembled and the branches sighed in the breeze.' This uses:", options: ["personification", "hyperbole", "simile", "onomatopoeia"], answer: 0, hint: "Trees given human actions.", explanation: "Giving human qualities (trembled, sighed) to trees is personification.", difficulty: "hard" },
      { q: "Which detail best supports the main idea 'Exercise improves health'?", options: ["Gyms can be expensive.", "Regular exercise strengthens the heart.", "Some people dislike running.", "Sneakers come in many colors."], answer: 1, hint: "Which supports the health claim?", explanation: "'Strengthens the heart' directly supports the main idea about health.", difficulty: "medium" },
    ],
    spelling: [
      { q: "Which word is spelled correctly?", options: ["recieve", "receive", "receeve", "reciave"], answer: 1, hint: "After c, e before i.", explanation: "'Receive' — e before i after c.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["concious", "conscious", "conscius", "conshious"], answer: 1, hint: "Contains 'sci.'", explanation: "'Conscious' contains 'sci.'", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["existance", "existence", "existense", "exsistence"], answer: 1, hint: "Ends in -ence.", explanation: "'Existence' ends in -ence.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["maintenence", "maintenance", "maintainance", "maintnance"], answer: 1, hint: "main + ten + ance.", explanation: "'Maintenance' is spelled main-ten-ance.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["occassion", "occasion", "ocasion", "occassionn"], answer: 1, hint: "Double c, one s.", explanation: "'Occasion' has two c's and one s.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["pronounciation", "pronunciation", "pronounciaton", "prononciation"], answer: 1, hint: "No 'o' after the first 'n.'", explanation: "'Pronunciation' drops the 'o' (unlike 'pronounce').", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["guarentee", "guarantee", "gaurantee", "garantee"], answer: 1, hint: "Starts like 'guard.'", explanation: "'Guarantee' begins with 'guar.'", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["perseverance", "perseverence", "perserverance", "perseveranse"], answer: 0, hint: "Ends in -ance.", explanation: "'Perseverance' ends in -ance.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["definitely", "definitly", "definately", "definetly"], answer: 0, hint: "Contains 'finite.'", explanation: "'Definitely' contains the word 'finite.'", difficulty: "medium" },
      { q: "Which word is spelled correctly?", options: ["neccessary", "necessary", "necesary", "necessery"], answer: 1, hint: "One c, two s's.", explanation: "'Necessary' — one c, two s's.", difficulty: "hard" },
    ],
  });

  // ============== GRADE 6-8 (HARD, shared object) ==============
  addPack(6, {
    vocabulary: [
      { q: "Which word is the best synonym for 'ubiquitous'?", options: ["rare", "omnipresent", "ancient", "fragile"], answer: 1, hint: "Found everywhere at once.", explanation: "Ubiquitous and omnipresent both mean present everywhere.", difficulty: "hard" },
      { q: "The root 'cred' (credible, incredible) means:", options: ["to build", "to believe", "to carry", "to break"], answer: 1, hint: "A credible witness is believable.", explanation: "'Cred' means to believe or trust.", difficulty: "hard" },
      { q: "A 'pragmatic' approach is one that is:", options: ["idealistic", "practical and realistic", "emotional", "theoretical"], answer: 1, hint: "It focuses on what actually works.", explanation: "Pragmatic means dealing with things practically.", difficulty: "hard" },
      { q: "'Verbose' most nearly means:", options: ["using few words", "using too many words", "silent", "truthful"], answer: 1, hint: "Wordy.", explanation: "Verbose means using more words than necessary.", difficulty: "hard" },
      { q: "Frugal is to wasteful as humble is to ___.", options: ["modest", "arrogant", "quiet", "generous"], answer: 1, hint: "Antonym analogy.", explanation: "Frugal/wasteful are opposites; humble/arrogant are opposites.", difficulty: "hard" },
      { q: "If a claim is 'plausible,' it is:", options: ["definitely false", "believable or reasonable", "impossible", "proven"], answer: 1, hint: "It could reasonably be true.", explanation: "Plausible means seeming reasonable or probable.", difficulty: "hard" },
      { q: "The prefix 'omni-' (omnivore, omnipotent) means:", options: ["none", "all", "half", "against"], answer: 1, hint: "An omnivore eats all kinds of food.", explanation: "'Omni-' means all.", difficulty: "hard" },
      { q: "Someone described as 'apathetic' is:", options: ["enthusiastic", "showing no interest or concern", "angry", "curious"], answer: 1, hint: "A = without; pathos = feeling.", explanation: "Apathetic means lacking interest or emotion.", difficulty: "hard" },
      { q: "Which word means 'to formally give up power or a position'?", options: ["acquire", "abdicate", "ascend", "assert"], answer: 1, hint: "A king might ___ the throne.", explanation: "Abdicate means to renounce a position of power.", difficulty: "hard" },
      { q: "'Ambiguous' instructions are:", options: ["very clear", "open to more than one meaning", "extremely long", "written neatly"], answer: 1, hint: "You can't tell exactly what is meant.", explanation: "Ambiguous means having more than one possible interpretation.", difficulty: "hard" },
      { q: "Which word means 'stubbornly refusing to change'?", options: ["flexible", "obstinate", "agreeable", "timid"], answer: 1, hint: "Won't budge.", explanation: "Obstinate means stubborn and unyielding.", difficulty: "hard" },
      { q: "A 'meticulous' editor is:", options: ["sloppy", "extremely precise and careful", "fast but careless", "unqualified"], answer: 1, hint: "Catches every tiny detail.", explanation: "Meticulous means very careful and precise.", difficulty: "hard" },
    ],
    grammar: [
      { q: "Which sentence uses 'whom' correctly?", options: ["Whom is at the door?", "Whom did the committee select?", "Whom will win the game?", "Whom is your friend?"], answer: 1, hint: "'Whom' replaces the object (him/her).", explanation: "'Whom did the committee select?' — whom is the object of 'select.'", difficulty: "hard" },
      { q: "Identify the clause type: 'whoever finishes first' in 'Whoever finishes first wins.'", options: ["adverb clause", "noun clause", "adjective clause", "prepositional phrase"], answer: 1, hint: "It acts as the subject (a noun).", explanation: "'Whoever finishes first' functions as a noun (the subject).", difficulty: "hard" },
      { q: "Which sentence maintains parallel structure?", options: ["He likes to hike, swimming, and to bike.", "He likes hiking, swimming, and biking.", "He likes hiking, to swim, and biking.", "He likes hike, swim, and to bike."], answer: 1, hint: "All items in the same form.", explanation: "'Hiking, swimming, biking' are all parallel gerunds.", difficulty: "hard" },
      { q: "Which sentence is correctly punctuated?", options: ["I finished my work, however I was still worried.", "I finished my work; however, I was still worried.", "I finished my work however; I was still worried.", "I finished my work, however; I was still worried."], answer: 1, hint: "Semicolon joins clauses; comma follows 'however.'", explanation: "Use a semicolon before and a comma after the conjunctive adverb 'however.'", difficulty: "hard" },
      { q: "What is the antecedent of 'they' in 'The dancers bowed because they were proud'?", options: ["bowed", "proud", "dancers", "because"], answer: 2, hint: "What does 'they' refer to?", explanation: "'They' refers back to 'dancers' — its antecedent.", difficulty: "medium" },
      { q: "Which verb completes: 'The number of errors ___ decreasing.'", options: ["are", "were", "is", "have been"], answer: 2, hint: "'The number' is singular.", explanation: "'The number' takes a singular verb: is.", difficulty: "hard" },
      { q: "Identify the participial phrase: 'Exhausted from the climb, she rested.'", options: ["Exhausted from the climb", "she rested", "from the climb", "she"], answer: 0, hint: "Begins with a past participle describing 'she.'", explanation: "'Exhausted from the climb' is a participial phrase modifying 'she.'", difficulty: "hard" },
      { q: "Which sentence is in the past perfect tense?", options: ["She has eaten lunch.", "She had eaten before the meeting.", "She will have eaten.", "She eats lunch."], answer: 1, hint: "'Had' + past participle.", explanation: "'Had eaten' is past perfect — completed before another past action.", difficulty: "hard" },
      { q: "Choose correctly: 'Either the teacher or the students ___ mistaken.'", options: ["is", "are", "was", "be"], answer: 1, hint: "Verb agrees with the nearer subject 'students.'", explanation: "With 'either...or,' the verb agrees with the closer subject ('students' = are).", difficulty: "hard" },
      { q: "Which sentence has NO error?", options: ["Their going to there house over they're.", "They're going to their house over there.", "There going to they're house over their.", "Their going to they're house over there."], answer: 1, hint: "they're = they are; their = possessive; there = place.", explanation: "'They're going to their house over there' uses each form correctly.", difficulty: "hard" },
    ],
    reading: [
      { q: "An 'allusion' in literature is:", options: ["a spelling error", "a reference to another work, person, or event", "the main character", "a type of rhyme"], answer: 1, hint: "It alludes to something outside the text.", explanation: "An allusion is an indirect reference to something well known.", difficulty: "hard" },
      { q: "Read: 'His words were a dagger to her heart.' This metaphor suggests his words were:", options: ["sharp and hurtful", "kind and gentle", "funny", "quiet"], answer: 0, hint: "A dagger cuts.", explanation: "The metaphor compares his hurtful words to a sharp dagger.", difficulty: "hard" },
      { q: "The difference between 'tone' and 'mood' is:", options: ["they are identical", "tone is the author's attitude; mood is the feeling created in the reader", "tone is setting; mood is plot", "tone is the title; mood is the theme"], answer: 1, hint: "Author vs. reader.", explanation: "Tone is the author's attitude; mood is the atmosphere felt by the reader.", difficulty: "hard" },
      { q: "A character who changes significantly over a story is called:", options: ["a static character", "a dynamic character", "a narrator", "an antagonist"], answer: 1, hint: "Dynamic = changing.", explanation: "A dynamic character undergoes important internal change.", difficulty: "hard" },
      { q: "An argument that relies on facts and statistics appeals primarily to:", options: ["emotion (pathos)", "logic (logos)", "authority (ethos)", "humor"], answer: 1, hint: "Logos = logic.", explanation: "Facts and statistics appeal to logic (logos).", difficulty: "hard" },
      { q: "Read: 'Little did she know, the decision would change everything.' This is an example of:", options: ["a flashback", "foreshadowing", "a simile", "irony"], answer: 1, hint: "It hints at future importance.", explanation: "This hints at future events — foreshadowing.", difficulty: "hard" },
      { q: "What is the BEST definition of 'theme'?", options: ["the sequence of events", "a universal message about life", "the time and place", "the narrator's identity"], answer: 1, hint: "Bigger than the plot.", explanation: "Theme is a universal idea or message a text conveys.", difficulty: "hard" },
      { q: "The quotation marks around 'fair' in 'the so-called \"fair\" decision favored the rich' suggest the author is being:", options: ["literal", "sarcastic or skeptical", "grateful", "unsure of spelling"], answer: 1, hint: "The decision wasn't really fair.", explanation: "The quotes signal irony or skepticism about the word 'fair.'", difficulty: "hard" },
      { q: "A 'counterargument' in persuasive writing is:", options: ["the main thesis", "an opposing viewpoint the writer addresses", "the conclusion", "a list of facts"], answer: 1, hint: "The other side's view.", explanation: "A counterargument presents and responds to the opposing position.", difficulty: "hard" },
      { q: "Which sentence shows objective (unbiased) writing?", options: ["The careless mayor ruined the city.", "The mayor's budget reduced park funding by 10 percent.", "Everyone hates the new budget.", "The budget is a disaster."], answer: 1, hint: "Which states verifiable fact without opinion?", explanation: "Stating a measurable fact is objective; the others show bias.", difficulty: "hard" },
    ],
    spelling: [
      { q: "Which word is spelled correctly?", options: ["conscientious", "consciencious", "conscientous", "consceintious"], answer: 0, hint: "Contains 'sci' + 'tious.'", explanation: "'Conscientious' is spelled con-sci-en-tious.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["entrepreneur", "entreprenuer", "entrepeneur", "entreprener"], answer: 0, hint: "French origin: -neur ending.", explanation: "'Entrepreneur' ends in -neur.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["liaison", "liason", "liasion", "liaisson"], answer: 0, hint: "Two i's: li-ai-son.", explanation: "'Liaison' is spelled li-ai-son.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["acquiesce", "aquiesce", "acquiese", "acquiess"], answer: 0, hint: "acq + uiesce.", explanation: "'Acquiesce' begins with 'acq' and ends '-uiesce.'", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["reminiscent", "reminescent", "reminiscant", "reminisent"], answer: 0, hint: "Contains 'minis.'", explanation: "'Reminiscent' is spelled re-min-is-cent.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["indispensable", "indispensible", "indispensabel", "indispensble"], answer: 0, hint: "Ends in -able.", explanation: "'Indispensable' ends in -able.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["questionnaire", "questionaire", "questionnair", "questionarre"], answer: 0, hint: "Double n, -aire ending.", explanation: "'Questionnaire' has two n's and ends in -aire.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["miscellaneous", "miscellanous", "misellaneous", "miscelaneous"], answer: 0, hint: "mis-cel-la-neous.", explanation: "'Miscellaneous' — two l's, -aneous ending.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["prevalent", "prevelant", "prevailent", "prevalant"], answer: 0, hint: "Ends in -lent.", explanation: "'Prevalent' ends in -lent.", difficulty: "hard" },
      { q: "Which word is spelled correctly?", options: ["bureaucracy", "beaurocracy", "buearucracy", "bereaucracy"], answer: 0, hint: "bureau + cracy.", explanation: "'Bureaucracy' starts with 'bureau.'", difficulty: "hard" },
    ],
  });

})();
