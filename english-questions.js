// =============================================
// MathChamp — English Question Bank
// Vocabulary · Reading · Grammar · Spelling
// Aligned with FastBridge aReading standards
// =============================================

const ENGLISH_QUESTIONS = {

// ====================== GRADE 1 ======================
1: {
  vocabulary: [
    { q: "What does the word 'big' mean?", options: ["Small","Large","Fast","Slow"], answer: 1, hint: "An elephant is ___.", explanation: "Big means large in size.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is the opposite of 'happy'?", options: ["Glad","Sad","Mad","Funny"], answer: 1, hint: "Think of a frown.", explanation: "Sad is the opposite of happy.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'tiny' mean?", options: ["Very big","Very small","Very tall","Very loud"], answer: 1, hint: "An ant is ___.", explanation: "Tiny means very small.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word means 'to run fast'?", options: ["Walk","Crawl","Sprint","Sit"], answer: 2, hint: "Faster than jogging.", explanation: "Sprint means to run very fast.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'kind' mean?", options: ["Mean","Nice","Loud","Quiet"], answer: 1, hint: "Sharing toys is being ___.", explanation: "Kind means nice and caring.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is the opposite of 'hot'?", options: ["Warm","Cold","Wet","Dry"], answer: 1, hint: "Ice is ___.", explanation: "Cold is the opposite of hot.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'brave' mean?", options: ["Scared","Not afraid","Angry","Tired"], answer: 1, hint: "A firefighter is ___.", explanation: "Brave means not afraid, courageous.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means the same as 'start'?", options: ["End","Begin","Stop","Finish"], answer: 1, hint: "The race is about to ___.", explanation: "Begin means the same as start.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'quiet' mean?", options: ["Loud","Silent","Fast","Happy"], answer: 1, hint: "The library is ___.", explanation: "Quiet means making little or no noise.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is the opposite of 'up'?", options: ["Down","Over","Under","Left"], answer: 0, hint: "A ball falls ___.", explanation: "Down is the opposite of up.", difficulty: "easy", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Which sentence is correct?", options: ["I is happy.","I am happy.","I are happy.","I be happy."], answer: 1, hint: "I ___ happy.", explanation: "'I am' is the correct form.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Fill in: The cat ___ on the mat.", options: ["sit","sat","sitted","sits"], answer: 1, hint: "Past tense of sit.", explanation: "Sat is the past tense of sit.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which is a complete sentence?", options: ["The big dog.","Running fast.","She runs fast.","Very happy today."], answer: 2, hint: "Needs a subject AND a verb.", explanation: "'She runs fast' has a subject (She) and a verb (runs).", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Choose the correct word: She ___ to the store.", options: ["goed","went","goed","wented"], answer: 1, hint: "Past tense of 'go'.", explanation: "'Went' is the past tense of 'go'.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is a noun?", options: ["Run","Happy","Dog","Quickly"], answer: 2, hint: "A person, place, or thing.", explanation: "Dog is a noun (a thing).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Fill in: ___ are my friends.", options: ["They","Them","Their","There"], answer: 0, hint: "Subject of the sentence.", explanation: "'They' is the subject pronoun.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which sentence uses a period correctly?", options: ["I like cats","I like cats.","I like. cats","I. like cats"], answer: 1, hint: "Period goes at the end.", explanation: "A period goes at the end of a sentence.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What type of word is 'red'?", options: ["Noun","Verb","Adjective","Adverb"], answer: 2, hint: "It describes a color.", explanation: "'Red' is an adjective — it describes things.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Choose the correct word: I ___ two cats.", options: ["has","have","having","haves"], answer: 1, hint: "I ___.", explanation: "'I have' is correct.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word starts a question?", options: ["The","Because","What","And"], answer: 2, hint: "___ is your name?", explanation: "'What' is a question word.", difficulty: "easy", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "Read: 'The dog ran to the park. He played with a ball.' What did the dog do at the park?", options: ["Slept","Played with a ball","Ate food","Read a book"], answer: 1, hint: "Look at the second sentence.", explanation: "The dog played with a ball.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'It was raining. Sam took his umbrella.' Why did Sam take his umbrella?", options: ["It was sunny","It was raining","It was cold","He was bored"], answer: 1, hint: "Look at the first sentence.", explanation: "Sam took his umbrella because it was raining.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'The cat is black. It has green eyes.' What color are the cat's eyes?", options: ["Black","Blue","Green","Brown"], answer: 2, hint: "Read the second sentence.", explanation: "The cat has green eyes.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Mom made cookies. They smelled good. I ate three.' How many cookies did I eat?", options: ["One","Two","Three","Four"], answer: 2, hint: "Look at the last sentence.", explanation: "I ate three cookies.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Ben is sad. His toy broke.' Why is Ben sad?", options: ["He is hungry","His toy broke","He lost his hat","He is tired"], answer: 1, hint: "What happened to his toy?", explanation: "Ben is sad because his toy broke.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Fish live in water. Birds live in nests.' Where do fish live?", options: ["In nests","In trees","In water","On land"], answer: 2, hint: "First sentence.", explanation: "Fish live in water.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'I brush my teeth every morning.' When do I brush my teeth?", options: ["At night","Every morning","After lunch","Never"], answer: 1, hint: "Look for the time word.", explanation: "I brush my teeth every morning.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'The sun is hot. Wear a hat outside.' Why should you wear a hat?", options: ["It's cold","It's raining","The sun is hot","It's windy"], answer: 2, hint: "What does the first sentence say?", explanation: "Wear a hat because the sun is hot.", difficulty: "easy", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["caat","cat","kat","catt"], answer: 1, hint: "A pet that meows.", explanation: "'Cat' is the correct spelling.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["hous","howse","house","hoose"], answer: 2, hint: "Where you live.", explanation: "'House' is the correct spelling.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["frend","freind","frind","friend"], answer: 3, hint: "Someone you play with.", explanation: "'Friend' is correct — i before e.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["skool","school","scool","schol"], answer: 1, hint: "Where you learn.", explanation: "'School' is the correct spelling.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["becuz","becaus","because","becose"], answer: 2, hint: "I stayed home ___ I was sick.", explanation: "'Because' is the correct spelling.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["peple","people","peeple","pepol"], answer: 1, hint: "Men, women, and children.", explanation: "'People' is the correct spelling.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["said","sed","sayed","sayd"], answer: 0, hint: "'She ___ hello.'", explanation: "'Said' is the correct spelling.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["ther","thier","their","theer"], answer: 2, hint: "___ house is big.", explanation: "'Their' is the correct spelling.", difficulty: "medium", source: "FastBridge Prep" },
  ]
},

// ====================== GRADE 2 ======================
2: {
  vocabulary: [
    { q: "What does 'enormous' mean?", options: ["Tiny","Very big","Colorful","Quiet"], answer: 1, hint: "A dinosaur is ___.", explanation: "Enormous means extremely large.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word means the opposite of 'easy'?", options: ["Simple","Difficult","Quick","Light"], answer: 1, hint: "A hard test is ___.", explanation: "Difficult is the opposite of easy.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'curious' mean?", options: ["Bored","Angry","Wanting to learn","Tired"], answer: 2, hint: "Asking lots of questions.", explanation: "Curious means wanting to know or learn.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'very cold'?", options: ["Boiling","Warm","Freezing","Melting"], answer: 2, hint: "Ice is ___.", explanation: "Freezing means very cold.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'ancient' mean?", options: ["New","Very old","Fast","Bright"], answer: 1, hint: "Dinosaurs are ___.", explanation: "Ancient means very, very old.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is a synonym for 'happy'?", options: ["Sad","Joyful","Angry","Bored"], answer: 1, hint: "Smiling and ___.", explanation: "Joyful means happy.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'swift' mean?", options: ["Slow","Heavy","Fast","Tall"], answer: 2, hint: "A cheetah is ___.", explanation: "Swift means moving very quickly.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'to look at closely'?", options: ["Ignore","Examine","Throw","Hide"], answer: 1, hint: "Scientists ___ things.", explanation: "Examine means to look at closely.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Choose the correct plural: one fox, two ___", options: ["foxs","foxes","foxies","fox"], answer: 1, hint: "Add -es after x.", explanation: "'Foxes' — add -es to words ending in x.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which sentence uses 'their' correctly?", options: ["Their going home.","Their house is big.","They went their.","Their happy."], answer: 1, hint: "'Their' shows ownership.", explanation: "'Their house' — possessive form.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Fill in: She ___ to the park yesterday.", options: ["walk","walked","walking","walks"], answer: 1, hint: "Yesterday = past tense.", explanation: "'Walked' is the past tense.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is a verb?", options: ["Table","Jump","Blue","Slowly"], answer: 1, hint: "An action word.", explanation: "'Jump' is a verb — it's an action.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Choose the correct contraction for 'do not':", options: ["dont","do'nt","don't","donot"], answer: 2, hint: "Apostrophe replaces the 'o'.", explanation: "'Don't' is the contraction of 'do not'.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Fill in: The children ___ playing outside.", options: ["is","are","am","be"], answer: 1, hint: "Children is plural.", explanation: "'Are' is used with plural subjects.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which sentence has correct capitalization?", options: ["i like dogs.","I Like Dogs.","I like dogs.","i Like Dogs."], answer: 2, hint: "Capitalize the first word and names.", explanation: "Only the first word needs a capital.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What punctuation ends a question?", options: ["Period (.)","Comma (,)","Question mark (?)","Exclamation (!)"], answer: 2, hint: "What is your name___", explanation: "Questions end with a question mark (?).", difficulty: "easy", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "Read: 'The rabbit hid in its hole when the fox came.' Why did the rabbit hide?", options: ["It was sleepy","The fox came","It was hungry","It was playing"], answer: 1, hint: "What happened when the fox came?", explanation: "The rabbit hid because the fox came (danger).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Lily planted seeds. She watered them every day. Soon flowers grew.' What grew?", options: ["Trees","Vegetables","Flowers","Grass"], answer: 2, hint: "Last sentence.", explanation: "Flowers grew from the seeds.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Tom's favorite color is blue. His room is painted blue.' What color is Tom's room?", options: ["Red","Green","Blue","Yellow"], answer: 2, hint: "Second sentence.", explanation: "Tom's room is painted blue.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'First, crack the eggs. Next, stir the batter. Then, bake for 20 minutes.' What do you do first?", options: ["Stir the batter","Bake for 20 minutes","Crack the eggs","Add sugar"], answer: 2, hint: "Look for 'First'.", explanation: "First, you crack the eggs.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Maria smiled when she saw her birthday cake.' How does Maria feel?", options: ["Sad","Angry","Happy","Scared"], answer: 2, hint: "She smiled.", explanation: "Smiling = happy. Maria is happy.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Bears sleep all winter. This is called hibernation.' What is hibernation?", options: ["Eating all winter","Sleeping all winter","Running all winter","Playing all winter"], answer: 1, hint: "Bears sleep all winter.", explanation: "Hibernation is sleeping all winter.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["beautful","beautiful","beutiful","beautifull"], answer: 1, hint: "A ___ sunset.", explanation: "'Beautiful' is correct.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["diffrent","diferent","different","differant"], answer: 2, hint: "Not the same.", explanation: "'Different' is correct.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["togather","togehter","together","togeter"], answer: 2, hint: "Let's play ___.", explanation: "'Together' is correct.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["writing","writeing","writting","writng"], answer: 0, hint: "I am ___ a letter.", explanation: "'Writing' — drop the e, add -ing.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["enugh","enough","enuf","enogh"], answer: 1, hint: "I've had ___.", explanation: "'Enough' is correct.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["realy","really","relly","reely"], answer: 1, hint: "I ___ like pizza.", explanation: "'Really' — real + ly.", difficulty: "easy", source: "FastBridge Prep" },
  ]
},

// ====================== GRADE 3 ======================
3: {
  vocabulary: [
    { q: "What does 'tremendous' mean?", options: ["Tiny","Very great or large","Slow","Quiet"], answer: 1, hint: "A ___ explosion.", explanation: "Tremendous means extremely great or large.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is an antonym of 'generous'?", options: ["Kind","Selfish","Giving","Warm"], answer: 1, hint: "Opposite of sharing.", explanation: "Selfish is the opposite of generous.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'observe' mean?", options: ["To ignore","To watch carefully","To break","To hide"], answer: 1, hint: "Scientists ___ experiments.", explanation: "Observe means to watch carefully.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word means 'to make better'?", options: ["Worsen","Improve","Destroy","Forget"], answer: 1, hint: "Practice helps ___ your skills.", explanation: "Improve means to make better.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'fragile' mean?", options: ["Strong","Easily broken","Heavy","Large"], answer: 1, hint: "Handle with care!", explanation: "Fragile means easily broken or damaged.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "A 'decade' is how many years?", options: ["5","10","20","100"], answer: 1, hint: "Dec- means ten.", explanation: "A decade is 10 years.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'hesitate' mean?", options: ["Rush","Pause before acting","Celebrate","Sleep"], answer: 1, hint: "She ___d before jumping.", explanation: "Hesitate means to pause or be unsure.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is a synonym for 'angry'?", options: ["Calm","Furious","Gentle","Pleased"], answer: 1, hint: "Very, very mad.", explanation: "Furious means extremely angry.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'predict' mean?", options: ["Remember","Guess what will happen","Forget","Explain"], answer: 1, hint: "Weather forecasters ___.", explanation: "Predict means to say what will happen in the future.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'very important'?", options: ["Trivial","Crucial","Minor","Small"], answer: 1, hint: "It is ___ to study.", explanation: "Crucial means extremely important.", difficulty: "hard", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Which sentence uses commas correctly?", options: ["I like dogs cats, and fish.","I like dogs, cats, and fish.","I like, dogs cats and fish.","I, like dogs cats and fish."], answer: 1, hint: "Commas separate items in a list.", explanation: "Use commas between items in a list.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is the past tense of 'run'?", options: ["Runned","Ran","Runed","Running"], answer: 1, hint: "Yesterday, I ___.", explanation: "'Ran' is the irregular past tense of 'run'.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which word is an adverb?", options: ["Quick","Quickly","Quicker","Quickest"], answer: 1, hint: "Describes how something is done.", explanation: "'Quickly' — adverbs often end in -ly.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Fill in: The team ___ their best.", options: ["did","does","done","doing"], answer: 0, hint: "Past tense.", explanation: "'Did' is the correct past tense.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which is a compound sentence?", options: ["The cat slept.","The cat slept, and the dog played.","Sleeping cat.","The big fluffy cat."], answer: 1, hint: "Two complete ideas joined.", explanation: "A compound sentence has two clauses joined by 'and', 'but', or 'or'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "'She plays piano well.' What part of speech is 'well'?", options: ["Noun","Verb","Adjective","Adverb"], answer: 3, hint: "It describes HOW she plays.", explanation: "'Well' is an adverb — it describes the verb 'plays'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Choose the correct possessive: The ___ toy is broken.", options: ["childs","child's","childrens","childs'"], answer: 1, hint: "One child owns the toy.", explanation: "Child's — add 's for singular possession.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which sentence is correct?", options: ["Me and him went.","Him and I went.","He and I went.","Me and he went."], answer: 2, hint: "Subject pronouns: I, he, she.", explanation: "'He and I went' uses correct subject pronouns.", difficulty: "hard", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "Read: 'The leaves turned orange and red. Squirrels gathered nuts.' What season is it?", options: ["Spring","Summer","Fall","Winter"], answer: 2, hint: "Leaves change color in ___.", explanation: "Fall — leaves change color and squirrels prepare.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Sarah practiced piano every day. At the recital, she played perfectly.' Why did Sarah play well?", options: ["She was lucky","She practiced every day","The piano was new","Her mom helped"], answer: 1, hint: "What did she do every day?", explanation: "She played well because she practiced every day.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Read: 'Penguins can't fly, but they are excellent swimmers.' What are penguins good at?", options: ["Flying","Running","Swimming","Climbing"], answer: 2, hint: "They are excellent ___.", explanation: "Penguins are excellent swimmers.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'The boy looked at the cloudy sky and grabbed his raincoat.' What can you infer?", options: ["It's sunny","It might rain","It's snowing","It's nighttime"], answer: 1, hint: "Cloudy sky + raincoat = ?", explanation: "Cloudy sky + raincoat suggests rain is expected.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Read: 'Bees make honey. They visit flowers to collect nectar.' Where do bees get nectar?", options: ["From trees","From honey","From flowers","From water"], answer: 2, hint: "They visit ___.", explanation: "Bees collect nectar from flowers.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What is the main idea of: 'Dogs are loyal pets. They protect their owners and love to play.'?", options: ["Dogs can run","Dogs eat bones","Dogs are loyal pets","Dogs like water"], answer: 2, hint: "First sentence usually has the main idea.", explanation: "The main idea is that dogs are loyal pets.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["Wednesday","Wensday","Wendesday","Wednsday"], answer: 0, hint: "The day after Tuesday.", explanation: "'Wednesday' — silent 'd'.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["definately","defanitely","definitely","definetly"], answer: 2, hint: "For sure, ___.", explanation: "'Definitely' — remember: finite.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["libary","library","liberry","libery"], answer: 1, hint: "Where you borrow books.", explanation: "'Library' has two r's.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["February","Febuary","Feburary","Febrary"], answer: 0, hint: "The second month.", explanation: "'February' — don't forget the first 'r'.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["surprize","surprise","surprice","suprise"], answer: 1, hint: "An unexpected gift.", explanation: "'Surprise' is correct.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["recieve","receive","receve","receeve"], answer: 1, hint: "To get something.", explanation: "'Receive' — i before e except after c.", difficulty: "medium", source: "FastBridge Prep" },
  ]
},

// ====================== GRADE 4 ======================
4: {
  vocabulary: [
    { q: "What does 'abundant' mean?", options: ["Rare","Plentiful","Empty","Small"], answer: 1, hint: "There is an ___ supply of water.", explanation: "Abundant means more than enough, plentiful.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is a synonym for 'courageous'?", options: ["Cowardly","Brave","Shy","Weak"], answer: 1, hint: "A hero is ___.", explanation: "Courageous means brave.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'migrate' mean?", options: ["Stay in one place","Move to a new area","Build a nest","Sleep all winter"], answer: 1, hint: "Birds ___ south in winter.", explanation: "Migrate means to move from one area to another.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'to destroy completely'?", options: ["Build","Create","Demolish","Repair"], answer: 2, hint: "A wrecking ball can ___ a building.", explanation: "Demolish means to destroy completely.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'annual' mean?", options: ["Daily","Weekly","Monthly","Yearly"], answer: 3, hint: "An ___ event happens once a year.", explanation: "Annual means happening once every year.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "The prefix 'un-' means:", options: ["Again","Before","Not","After"], answer: 2, hint: "Unhappy = ___ happy.", explanation: "Un- means 'not' (unhappy = not happy).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'resemble' mean?", options: ["To look like","To forget","To build","To break"], answer: 0, hint: "She ___s her mother.", explanation: "Resemble means to look similar to.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'short-lived'?", options: ["Permanent","Temporary","Eternal","Constant"], answer: 1, hint: "Not lasting forever.", explanation: "Temporary means lasting for a limited time.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'conclude' mean?", options: ["Start","End","Continue","Pause"], answer: 1, hint: "To ___ a speech.", explanation: "Conclude means to bring to an end.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "The suffix '-less' means:", options: ["Full of","Without","More","Again"], answer: 1, hint: "Careless = care + ___.", explanation: "-less means 'without' (careless = without care).", difficulty: "easy", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Which sentence uses 'affect' correctly?", options: ["The affect was strong.","Rain can affect the game.","I saw the affect.","What a nice affect."], answer: 1, hint: "'Affect' is a verb.", explanation: "'Affect' is a verb meaning to influence.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Identify the subject: 'The clever fox jumped over the fence.'", options: ["clever","fox","jumped","fence"], answer: 1, hint: "Who did the action?", explanation: "'Fox' is the subject (who jumped).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which is a run-on sentence?", options: ["I like pizza, and she likes pasta.","I like pizza she likes pasta.","I like pizza.","She likes pasta."], answer: 1, hint: "Two sentences with no punctuation.", explanation: "Run-on: two complete sentences joined without punctuation.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Choose the correct homophone: 'I can see the ___ over ___.'", options: ["sea, their","see, there","sea, there","see, their"], answer: 2, hint: "Sea = ocean, there = location.", explanation: "Sea (ocean) over there (that place).", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What type of sentence is: 'Wow, that's amazing!'?", options: ["Declarative","Interrogative","Imperative","Exclamatory"], answer: 3, hint: "It shows strong emotion.", explanation: "Exclamatory sentences show strong feelings and end with '!'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Fill in: 'Neither the dog ___ the cat was outside.'", options: ["or","and","nor","but"], answer: 2, hint: "Neither... ___.", explanation: "'Neither...nor' is the correct pairing.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is a conjunction?", options: ["Quickly","Because","Happy","Dog"], answer: 1, hint: "Connects ideas.", explanation: "'Because' is a conjunction that connects clauses.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What is the predicate in: 'The students finished their homework'?", options: ["The students","finished their homework","homework","The"], answer: 1, hint: "What did the subject do?", explanation: "The predicate is 'finished their homework'.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "Read: 'The early bird catches the worm.' This means:", options: ["Birds eat worms","Wake up early to eat","Being early gives an advantage","Worms come out early"], answer: 2, hint: "It's a proverb (life lesson).", explanation: "This proverb means arriving first gives you an advantage.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Read: 'Jake sighed, stared at the math test, and chewed his pencil.' How does Jake feel?", options: ["Excited","Nervous or frustrated","Happy","Bored"], answer: 1, hint: "Sighing + chewing pencil = stress.", explanation: "These actions show Jake is nervous or frustrated.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is a 'summary'?", options: ["A guess about what happens next","A brief retelling of main points","A list of characters","A type of poem"], answer: 1, hint: "Short version of a story.", explanation: "A summary briefly retells the main points.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Read: 'Recycling helps the Earth. It reduces waste in landfills.' The author's purpose is to:", options: ["Entertain","Persuade","Inform","Confuse"], answer: 2, hint: "The text gives facts.", explanation: "The author's purpose is to inform (give information).", difficulty: "medium", source: "FastBridge Prep" },
    { q: "In fiction, the 'setting' is:", options: ["The main problem","Where and when the story takes place","The main character","The lesson learned"], answer: 1, hint: "Time and place.", explanation: "Setting is where and when a story takes place.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which is an opinion?", options: ["The Earth orbits the Sun.","Water boils at 100°C.","Pizza is the best food.","The Moon reflects sunlight."], answer: 2, hint: "Can't be proven true.", explanation: "'Pizza is the best food' is an opinion — it's personal.", difficulty: "easy", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["necessary","neccessary","necesary","neccesary"], answer: 0, hint: "One C, two S's.", explanation: "'Necessary' — one c, two s's.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["occured","occurred","ocurred","occurrd"], answer: 1, hint: "It ___ yesterday.", explanation: "'Occurred' — double c, double r.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["separate","seperate","separite","seprate"], answer: 0, hint: "To divide apart.", explanation: "'Separate' — par in the middle.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["enviroment","environment","enviorment","envirement"], answer: 1, hint: "Nature around us.", explanation: "'Environment' — remember the 'n' before 'm'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["knowledge","knowlege","knowladge","knowlidge"], answer: 0, hint: "What you learn.", explanation: "'Knowledge' has a silent 'k'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["rhythm","rythm","rhythem","rythym"], answer: 0, hint: "Music has a ___.", explanation: "'Rhythm' — no normal vowels!", difficulty: "hard", source: "FastBridge Prep" },
  ]
},

// ====================== GRADE 5 ======================
5: {
  vocabulary: [
    { q: "What does 'elaborate' mean?", options: ["Simple","Detailed and complex","Small","Quick"], answer: 1, hint: "An ___ plan.", explanation: "Elaborate means detailed and complicated.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'to hold back'?", options: ["Release","Restrain","Encourage","Assist"], answer: 1, hint: "Hold yourself back.", explanation: "Restrain means to hold back or control.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'chronological' mean?", options: ["Random","In time order","Alphabetical","By size"], answer: 1, hint: "Chrono = time.", explanation: "Chronological means arranged in time order.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "The root 'bio' means:", options: ["Earth","Water","Life","Fire"], answer: 2, hint: "Biology = study of ___.", explanation: "Bio means life (biology = study of life).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'reluctant' mean?", options: ["Eager","Unwilling","Happy","Fast"], answer: 1, hint: "Hesitant to do something.", explanation: "Reluctant means unwilling or hesitant.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'happening at the same time'?", options: ["Sequential","Simultaneous","Separate","Alternating"], answer: 1, hint: "At the exact same moment.", explanation: "Simultaneous means occurring at the same time.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "What does 'vivid' mean?", options: ["Dull","Bright and clear","Quiet","Dark"], answer: 1, hint: "___ colors.", explanation: "Vivid means producing strong, clear images.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "The prefix 'mis-' means:", options: ["Again","Before","Wrongly","Under"], answer: 2, hint: "Mistake = ___ + take.", explanation: "Mis- means wrongly (mistake = wrong take).", difficulty: "easy", source: "FastBridge Prep" },
    { q: "What does 'persevere' mean?", options: ["Give up","Keep trying","Forget","Avoid"], answer: 1, hint: "Never give up!", explanation: "Persevere means to keep going despite difficulty.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'to come before'?", options: ["Follow","Precede","Succeed","Chase"], answer: 1, hint: "Pre- means before.", explanation: "Precede means to come before.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Which sentence uses a semicolon correctly?", options: ["I like cats; and dogs.","I like cats; they are cute.","I like; cats.","I; like cats."], answer: 1, hint: "Joins two related complete sentences.", explanation: "A semicolon joins two related independent clauses.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "What is the comparative form of 'good'?", options: ["Gooder","More good","Better","Goodest"], answer: 2, hint: "Good, ___, best.", explanation: "'Better' is the comparative form of 'good'.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "Which sentence is in passive voice?", options: ["The dog chased the cat.","The cat was chased by the dog.","The dog is fast.","Cats run quickly."], answer: 1, hint: "Subject receives the action.", explanation: "'Was chased by' — the subject (cat) receives the action.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Identify the prepositional phrase: 'The book on the shelf is mine.'", options: ["The book","on the shelf","is mine","The book is"], answer: 1, hint: "Starts with a preposition.", explanation: "'On the shelf' — 'on' is the preposition.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word correctly completes: 'She is the ___ of the three sisters.'?", options: ["taller","tallest","most tall","more tall"], answer: 1, hint: "Comparing three = superlative.", explanation: "'Tallest' — use superlative for 3+ comparisons.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is a 'clause'?", options: ["A type of punctuation","A group of words with a subject and verb","A single word","A type of paragraph"], answer: 1, hint: "Has a subject and verb.", explanation: "A clause is a group of words containing a subject and verb.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "What does 'point of view' mean in a story?", options: ["The setting","Who is telling the story","The ending","The problem"], answer: 1, hint: "First person, third person.", explanation: "Point of view is the perspective from which a story is told.", difficulty: "easy", source: "FastBridge Prep" },
    { q: "'Actions speak louder than words' means:", options: ["Talk loudly","What you do matters more than what you say","Action movies are loud","Words are quiet"], answer: 1, hint: "It's an idiom.", explanation: "This idiom means what you DO is more important than what you SAY.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is a 'theme' in a story?", options: ["The setting","The main character","The central message or lesson","The title"], answer: 2, hint: "The big idea or moral.", explanation: "Theme is the central message or lesson of a story.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Read: 'Despite the rain, the team won the championship.' What does 'despite' mean?", options: ["Because of","Even though","After","During"], answer: 1, hint: "The rain didn't stop them.", explanation: "'Despite' means 'even though' or 'in spite of'.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which text structure uses 'first, next, then, finally'?", options: ["Compare/contrast","Cause/effect","Sequence","Problem/solution"], answer: 2, hint: "Events in order.", explanation: "Sequence structure puts events in order.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "An author writes to 'persuade' when they want to:", options: ["Make you laugh","Teach you facts","Convince you of something","Tell a story"], answer: 2, hint: "Change your mind.", explanation: "Persuade = convince the reader to agree or act.", difficulty: "easy", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["accomodate","accommodate","acommodate","acomodate"], answer: 1, hint: "Double c, double m.", explanation: "'Accommodate' — two c's and two m's.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["conscience","concience","consience","concsience"], answer: 0, hint: "Your inner sense of right.", explanation: "'Conscience' — sci in the middle.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["exaggerate","exagerate","exaggeratte","exaggarate"], answer: 0, hint: "To overstate.", explanation: "'Exaggerate' — double g.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["mischievous","mischievious","mischevous","mischevious"], answer: 0, hint: "Playfully naughty.", explanation: "'Mischievous' — no 'i' after the 'v'.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["privilege","priviledge","privelege","privlege"], answer: 0, hint: "A special right.", explanation: "'Privilege' — no 'd'.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["occurence","occurrence","occurance","occurrance"], answer: 1, hint: "An event.", explanation: "'Occurrence' — double c, double r.", difficulty: "hard", source: "FastBridge Prep" },
  ]
},

// ====================== GRADE 6-8 (Shared Advanced) ======================
6: {
  vocabulary: [
    { q: "What does 'ubiquitous' mean?", options: ["Rare","Found everywhere","Hidden","Ancient"], answer: 1, hint: "Smartphones are ___.", explanation: "Ubiquitous means present everywhere.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word means 'unclear or vague'?", options: ["Precise","Ambiguous","Obvious","Clear"], answer: 1, hint: "Has more than one meaning.", explanation: "Ambiguous means open to more than one interpretation.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "The root 'bene' means:", options: ["Bad","Good","Big","New"], answer: 1, hint: "Benefit = something ___.", explanation: "Bene means good (benefit = good result).", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'inevitable' mean?", options: ["Avoidable","Certain to happen","Unlikely","Surprising"], answer: 1, hint: "Can't be prevented.", explanation: "Inevitable means unavoidable, certain to happen.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'to summarize briefly'?", options: ["Elaborate","Paraphrase","Expand","Complicate"], answer: 1, hint: "Restate in your own words.", explanation: "Paraphrase means to restate in different words.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'benevolent' mean?", options: ["Evil","Kind and generous","Strict","Lazy"], answer: 1, hint: "Bene = good.", explanation: "Benevolent means well-meaning and kind.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word means 'a false belief'?", options: ["Fact","Illusion","Truth","Reality"], answer: 1, hint: "Not real.", explanation: "An illusion is a false impression or belief.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What does 'diligent' mean?", options: ["Lazy","Hardworking","Careless","Quick"], answer: 1, hint: "A ___ student studies hard.", explanation: "Diligent means showing careful and persistent effort.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  grammar: [
    { q: "Which sentence correctly uses 'who' vs 'whom'?", options: ["Whom is calling?","Who did you see?","To whom did you speak?","Whom likes pizza?"], answer: 2, hint: "'Whom' = object (him/her).", explanation: "'To whom' — whom is used as an object.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "What is a 'dangling modifier'?", options: ["A long sentence","A modifier without a clear subject","A type of verb","A punctuation mark"], answer: 1, hint: "'Running quickly, the door was opened.'", explanation: "A dangling modifier doesn't clearly modify any word.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which sentence uses parallel structure?", options: ["She likes swimming, biking, and to run.","She likes swimming, biking, and running.","She likes to swim, biking, and running.","She likes swim, bike, run."], answer: 1, hint: "Same form for all items.", explanation: "Parallel: swimming, biking, running (all -ing).", difficulty: "hard", source: "FastBridge Prep" },
    { q: "What type of clause is 'because it was raining'?", options: ["Independent","Dependent","Compound","Simple"], answer: 1, hint: "Can't stand alone.", explanation: "Dependent clause — it can't stand alone as a sentence.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Choose correctly: 'The data ___ the theory.'", options: ["supports","support","supporting","supportive"], answer: 1, hint: "Data is plural.", explanation: "'Data' is traditionally plural: data support.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which is an example of personification?", options: ["Fast as a cheetah","The wind whispered","Very very tall","A sea of troubles"], answer: 1, hint: "Giving human qualities to non-human things.", explanation: "'The wind whispered' — wind can't actually whisper.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  reading: [
    { q: "What is an 'unreliable narrator'?", options: ["A boring narrator","A narrator whose account can't be fully trusted","A third-person narrator","The author"], answer: 1, hint: "Can you trust everything they say?", explanation: "An unreliable narrator's perspective may be biased or inaccurate.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "What is 'foreshadowing'?", options: ["A flashback","Hints about what will happen later","The ending","Character description"], answer: 1, hint: "Clues about the future.", explanation: "Foreshadowing gives hints about future events.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "'All that glitters is not gold' means:", options: ["Gold is shiny","Not everything that looks good IS good","Silver is better","Gold doesn't glitter"], answer: 1, hint: "Appearances can be deceiving.", explanation: "This means things aren't always as good as they appear.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is 'irony'?", options: ["A funny joke","When the opposite of what's expected happens","A sad ending","Repetition"], answer: 1, hint: "A fire station burning down.", explanation: "Irony is when the outcome is opposite to expectations.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "What is the difference between 'tone' and 'mood'?", options: ["They're the same","Tone = author's attitude, mood = reader's feeling","Tone = setting, mood = theme","Tone = plot, mood = conflict"], answer: 1, hint: "Author vs. reader.", explanation: "Tone is the author's attitude; mood is how the reader feels.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "A 'thesis statement' is:", options: ["The first sentence","The main argument of an essay","A question","The conclusion"], answer: 1, hint: "What the essay argues.", explanation: "A thesis statement presents the main argument.", difficulty: "medium", source: "FastBridge Prep" },
  ],
  spelling: [
    { q: "Which word is spelled correctly?", options: ["bureaucracy","beaurocracy","buearucracy","bereaucracy"], answer: 0, hint: "Government administration.", explanation: "'Bureaucracy' — bureau + cracy.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["maintainance","maintenance","maintenence","maintanance"], answer: 1, hint: "Keeping in good condition.", explanation: "'Maintenance' — main + ten + ance.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["independent","independant","indipendent","independint"], answer: 0, hint: "Free and self-reliant.", explanation: "'Independent' — ends in -ent.", difficulty: "medium", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["harassment","harrassment","harasment","harassmant"], answer: 0, hint: "One r, two s's.", explanation: "'Harassment' — one r, two s's.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["millenium","millennium","milenium","milennium"], answer: 1, hint: "1000 years.", explanation: "'Millennium' — double l, double n.", difficulty: "hard", source: "FastBridge Prep" },
    { q: "Which word is spelled correctly?", options: ["acquaintance","aquaintance","acquantance","acquaintence"], answer: 0, hint: "Someone you know slightly.", explanation: "'Acquaintance' — acq + uaint + ance.", difficulty: "hard", source: "FastBridge Prep" },
  ]
}

};

// Share grades 6 content with grades 7 and 8
ENGLISH_QUESTIONS[7] = ENGLISH_QUESTIONS[6];
ENGLISH_QUESTIONS[8] = ENGLISH_QUESTIONS[6];

// =============================================
// Helper: Get English Questions
// =============================================
function getEnglishQuestions(grade, category, count = 10) {
    const gradeData = ENGLISH_QUESTIONS[grade];
    if (!gradeData) return [];

    if (category === 'english_mixed') {
        const allQs = [];
        for (const cat of Object.keys(gradeData)) {
            allQs.push(...gradeData[cat].map(q => ({ ...q, category: 'english_' + cat })));
        }
        return shuffleArray(allQs).slice(0, count);
    }

    // Strip "english_" prefix to get subcategory
    const subCat = category.replace('english_', '');
    const catQs = gradeData[subCat] || [];
    const questionsWithCat = catQs.map(q => ({ ...q, category }));

    if (questionsWithCat.length >= count) {
        return shuffleArray(questionsWithCat).slice(0, count);
    }

    // Supplement from adjacent grades
    const supplementGrades = [grade - 1, grade + 1].filter(g => g >= 1 && g <= 8);
    const extras = [];
    for (const g of supplementGrades) {
        const gData = ENGLISH_QUESTIONS[g];
        if (gData && gData[subCat]) {
            extras.push(...gData[subCat].map(q => ({ ...q, category })));
        }
    }
    return shuffleArray([...questionsWithCat, ...extras]).slice(0, count);
}
