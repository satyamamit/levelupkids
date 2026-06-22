// =============================================================
// LevelUpKids - Reading Passage Sets (SBA ELA / FastBridge aReading)
// Each set = one passage (literary or informational) followed by
// several linked questions, mirroring the real Smarter Balanced and
// FastBridge aReading format: a shared text with comprehension items
// (main idea, inference, vocabulary-in-context, author's purpose,
// text structure, cite-the-evidence).
//
// Exposes:
//   READING_PASSAGES = { 4: [...sets], 5: [...sets] }
//   getReadingPassageQuestions(grade, count) -> flat question array
//     where each question carries { passage, passageTitle, passageType }
//     and questions from the same passage stay grouped & in order.
// Must load before question-api.js / app.js use it.
// =============================================================
(function () {
  const SRC = "SBA / FastBridge Reading";

  // Helper to keep each set compact to author.
  function set(o) { return o; }

  const READING_PASSAGES = {
    // ─────────────────────── GRADE 4 ───────────────────────
    4: [
      set({
        id: "g4-lit-marbles",
        title: "The Lost Marble",
        type: "Literary",
        grade: 4,
        passage:
          "Diego pressed his nose against the cold window and watched the rain streak down the glass. His prized blue marble — the one his grandfather had given him — was missing. He had searched every pocket, every drawer, and even under the couch cushions.\n\n" +
          "\"It has to be somewhere,\" he muttered, dropping to his knees to look beneath the bookshelf. Dust tickled his nose, but there was no flash of blue.\n\n" +
          "Just then, his little sister Lucia toddled into the room, giggling. In her tiny fist, she clutched something that glinted in the lamplight. Diego's heart leapt. He knelt down and gently opened her fingers. There, smudged with cracker crumbs, sat the blue marble.\n\n" +
          "\"Thank you, Lucia,\" he laughed, scooping her into a hug. He decided right then to keep the marble somewhere far safer — and to watch his curious little sister a bit more closely.",
        questions: [
          { q: "What is the main problem in the passage?", options: ["Diego is bored on a rainy day", "Diego has lost his grandfather's marble", "Lucia is crying", "Diego cannot find his sister"], answer: 1, hint: "What is Diego searching for?", explanation: "The central problem is that Diego's special blue marble is missing.", difficulty: "easy", skill: "RL.3 Problem" },
          { q: "Why is the blue marble important to Diego?", options: ["It is worth a lot of money", "It was a gift from his grandfather", "It is the only toy he owns", "It glows in the dark"], answer: 1, hint: "Who gave it to him?", explanation: "The text says his grandfather gave him the marble, making it meaningful.", difficulty: "easy", skill: "RL.1 Detail" },
          { q: "In the sentence 'Diego's heart leapt,' the word 'leapt' shows that he felt —", options: ["frightened", "suddenly excited and hopeful", "angry at Lucia", "sleepy"], answer: 1, hint: "He just spotted the marble.", explanation: "'Heart leapt' is figurative language showing a sudden burst of excitement and hope.", difficulty: "medium", skill: "RL.4 Vocab in context" },
          { q: "How did Diego most likely feel at the END of the passage?", options: ["Frustrated and worried", "Relieved and thankful", "Bored and tired", "Jealous of Lucia"], answer: 1, hint: "He hugs Lucia and laughs.", explanation: "Finding the marble and hugging his sister shows he feels relieved and grateful.", difficulty: "medium", skill: "RL.3 Character feeling" },
          { q: "What lesson does Diego learn by the end of the story?", options: ["Never trust little sisters", "Keep precious things safe and watch out for the curious", "Rainy days are boring", "Marbles are easy to lose"], answer: 1, hint: "Look at his decision in the last paragraph.", explanation: "Diego decides to store the marble safely and watch Lucia — the theme is about responsibility.", difficulty: "hard", skill: "RL.2 Theme" },
        ],
      }),
      set({
        id: "g4-info-octopus",
        title: "Masters of Disguise",
        type: "Informational",
        grade: 4,
        passage:
          "The octopus is one of the ocean's most amazing escape artists. With no bones in its soft body, an octopus can squeeze through a hole no larger than a coin. This helps it slip away from hungry predators and hide in tiny cracks among the rocks.\n\n" +
          "But the octopus has an even more surprising trick. Special cells in its skin, called chromatophores, allow it to change color in less than a second. An octopus can turn bright red when it is angry or fade to a sandy brown to blend in with the seafloor. Some species can even copy the bumpy texture of coral or rock.\n\n" +
          "If these defenses fail, the octopus has one last escape plan. It shoots out a cloud of dark ink, confusing its enemy. While the predator is distracted, the octopus jets away to safety. With all these clever tools, it is no wonder the octopus is called a master of disguise.",
        questions: [
          { q: "What is the MAIN idea of this passage?", options: ["Octopuses live in the ocean", "The octopus has many clever ways to protect itself", "Octopuses have no bones", "Ink is dark in color"], answer: 1, hint: "What do all three paragraphs describe?", explanation: "Each paragraph describes a different defense, so the main idea is the octopus's clever protections.", difficulty: "medium", skill: "RI.2 Main idea" },
          { q: "According to the passage, what allows an octopus to change color?", options: ["Its strong bones", "Special cells called chromatophores", "Its dark ink", "The sandy seafloor"], answer: 1, hint: "Look in paragraph two.", explanation: "The text states chromatophores in its skin let the octopus change color.", difficulty: "easy", skill: "RI.1 Detail" },
          { q: "Why can an octopus squeeze through a hole the size of a coin?", options: ["It is very small", "Its body has no bones", "It changes color", "It uses ink"], answer: 1, hint: "What does its soft body lack?", explanation: "With no bones, the soft body can fit through tiny spaces.", difficulty: "easy", skill: "RI.3 Cause/effect" },
          { q: "In paragraph three, the word 'distracted' most nearly means —", options: ["scared away forever", "having its attention pulled away", "swimming faster", "changing color"], answer: 1, hint: "The ink confuses the predator.", explanation: "The ink pulls the predator's attention away — 'distracted' means attention is diverted.", difficulty: "medium", skill: "RI.4 Vocab in context" },
          { q: "Why did the author MOST LIKELY write this passage?", options: ["To convince readers to buy an octopus", "To inform readers about how octopuses defend themselves", "To tell a funny story about the ocean", "To explain how to catch an octopus"], answer: 1, hint: "Is the author sharing facts or opinions?", explanation: "The passage gives facts about octopus defenses, so the author's purpose is to inform.", difficulty: "hard", skill: "RI.6 Author's purpose" },
        ],
      }),
      set({
        id: "g4-lit-science-fair",
        title: "The Wobbly Volcano",
        type: "Literary",
        grade: 4,
        passage:
          "Priya had spent two whole weeks building her volcano for the science fair. She mixed the paint just right and practiced the eruption again and again. But on the morning of the fair, disaster struck. As she lifted the heavy model onto the table, one side crumbled, leaving a giant crack down the middle.\n\n" +
          "Priya's eyes stung with tears. All that work, ruined. She wanted to grab her backpack and run home. Instead, she took a deep breath and remembered what her teacher always said: \"A scientist solves problems.\"\n\n" +
          "She borrowed tape from a friend, gathered some extra clay, and quietly rebuilt the broken side. By the time the judges arrived, the crack was hidden and the volcano was ready. When it erupted in a foamy red burst, the crowd cheered. Priya grinned. Her volcano wasn't perfect, but she had fixed it herself — and that felt even better than a blue ribbon.",
        questions: [
          { q: "What problem does Priya face on the morning of the science fair?", options: ["She forgets her project at home", "Her volcano model cracks and crumbles", "She is late for school", "Her paint is the wrong color"], answer: 1, hint: "What happens when she lifts the model?", explanation: "One side crumbles and a crack forms down the middle of her volcano.", difficulty: "easy", skill: "RL.3 Problem" },
          { q: "What does Priya do INSTEAD of running home?", options: ["She cries and gives up", "She takes a deep breath and fixes the volcano", "She asks the judges for more time", "She builds a new project"], answer: 1, hint: "Read the second and third paragraphs.", explanation: "She calms down and rebuilds the broken side rather than quitting.", difficulty: "easy", skill: "RL.1 Detail" },
          { q: "The teacher's words, 'A scientist solves problems,' help Priya by —", options: ["telling her to go home", "reminding her to stay calm and find a solution", "making her feel worse", "explaining how volcanoes erupt"], answer: 1, hint: "What does she do right after remembering them?", explanation: "The teacher's advice motivates Priya to solve her problem instead of giving up.", difficulty: "medium", skill: "RL.3 Character" },
          { q: "Why does Priya feel her fixed volcano is 'better than a blue ribbon'?", options: ["She won first place", "She solved the problem on her own", "The judges gave her candy", "The volcano was perfect"], answer: 1, hint: "What made her proud at the end?", explanation: "Her pride comes from fixing the problem herself, which means more to her than winning.", difficulty: "hard", skill: "RL.2 Theme" },
          { q: "Which word BEST describes Priya?", options: ["Careless", "Determined", "Shy", "Forgetful"], answer: 1, hint: "Think about how she handles trouble.", explanation: "She works hard and refuses to give up, showing she is determined.", difficulty: "medium", skill: "RL.3 Character trait" },
        ],
      }),
      set({
        id: "g4-info-honeybees",
        title: "The Busy World of Honeybees",
        type: "Informational",
        grade: 4,
        passage:
          "Inside a single beehive, tens of thousands of honeybees work together like one giant team. Each bee has a special job. The queen bee lays all the eggs — sometimes up to two thousand in a single day. Worker bees, which are all female, gather nectar, build the honeycomb, and guard the hive. The male bees, called drones, have just one task: to help the queen.\n\n" +
          "When a worker bee finds a patch of flowers, she flies back to the hive and performs a special 'waggle dance.' By moving in a figure-eight pattern, she tells the other bees exactly which direction to fly and how far to travel to reach the food.\n\n" +
          "Honeybees are not just busy — they are important. As they move from flower to flower collecting nectar, they spread pollen. This pollen helps plants make seeds and fruit. Without honeybees, many of the foods we eat, from apples to almonds, would be much harder to grow.",
        questions: [
          { q: "What is this passage MOSTLY about?", options: ["How bees make a waggle dance", "How honeybees work together and why they matter", "Why drones are lazy", "How to build a beehive"], answer: 1, hint: "Look at all three paragraphs together.", explanation: "The passage covers bee jobs, communication, and importance — overall how bees work together and matter.", difficulty: "medium", skill: "RI.2 Main idea" },
          { q: "According to the passage, what is the job of the worker bees?", options: ["To lay eggs", "To gather nectar, build the comb, and guard the hive", "To help the queen only", "To perform no work"], answer: 1, hint: "Re-read the sentence about worker bees.", explanation: "Worker bees gather nectar, build honeycomb, and guard the hive.", difficulty: "easy", skill: "RI.1 Detail" },
          { q: "What is the purpose of the 'waggle dance'?", options: ["To celebrate finding food", "To tell other bees where to find flowers", "To scare away predators", "To cool down the hive"], answer: 1, hint: "What does the dance tell the other bees?", explanation: "The waggle dance communicates the direction and distance to the flowers.", difficulty: "medium", skill: "RI.3 Text structure" },
          { q: "In the last paragraph, spreading pollen helps plants by —", options: ["making them taller", "helping them make seeds and fruit", "keeping them warm", "changing their color"], answer: 1, hint: "What does pollen help plants do?", explanation: "The passage states pollen helps plants make seeds and fruit.", difficulty: "easy", skill: "RI.3 Cause/effect" },
          { q: "Which sentence BEST supports the idea that honeybees are important to people?", options: ["The queen lays up to two thousand eggs a day.", "Worker bees are all female.", "Without honeybees, many foods would be much harder to grow.", "Drones have just one task."], answer: 2, hint: "Which sentence connects bees to our food?", explanation: "The sentence about foods being harder to grow shows the bees' importance to people.", difficulty: "hard", skill: "RI.1 Cite evidence" },
        ],
      }),
      set({
        id: "g4-lit-new-kid",
        title: "Sitting Alone",
        type: "Literary",
        grade: 4,
        passage:
          "On his first day at Maple Street School, Aiden carried his lunch tray across the noisy cafeteria, searching for a place to sit. Every table seemed full of kids who already knew one another, laughing at jokes he didn't understand. His stomach twisted into a knot.\n\n" +
          "Finally, he spotted an empty seat at the end of a table. He slid into it quietly, staring at his sandwich. Just as he was about to take a bite, a girl with bright orange sneakers plopped down across from him.\n\n" +
          "\"You're new, right? I'm Zoe,\" she said with a wide smile. \"I sat alone on my first day too. It's the worst.\" She slid a cookie across the table toward him. \"Want to sit with us tomorrow? We need someone for our kickball team.\"\n\n" +
          "Aiden felt the knot in his stomach loosen. For the first time all day, he smiled back.",
        questions: [
          { q: "How does Aiden feel at the BEGINNING of the passage?", options: ["Excited and confident", "Nervous and alone", "Angry at the other kids", "Bored and sleepy"], answer: 1, hint: "His stomach twists into a knot.", explanation: "Searching for a seat with a knotted stomach shows he feels nervous and alone.", difficulty: "easy", skill: "RL.3 Character feeling" },
          { q: "What does the phrase 'His stomach twisted into a knot' mean?", options: ["He was hungry", "He felt anxious and uneasy", "He had a stomachache from food", "He was excited to eat"], answer: 1, hint: "It describes a feeling, not real food.", explanation: "A 'stomach twisted into a knot' is figurative language for feeling anxious.", difficulty: "medium", skill: "RL.4 Figurative language" },
          { q: "Why does Zoe sit down with Aiden?", options: ["She wants his cookie", "She remembers sitting alone on her first day", "The teacher told her to", "There were no other seats"], answer: 1, hint: "What does Zoe say about her own first day?", explanation: "Zoe says she sat alone on her first day too, so she understands how he feels.", difficulty: "medium", skill: "RL.1 Detail" },
          { q: "What can the reader conclude about Zoe?", options: ["She is unfriendly", "She is kind and welcoming", "She is bossy", "She dislikes new students"], answer: 1, hint: "Look at her actions and words.", explanation: "Sharing a cookie and inviting Aiden shows Zoe is kind and welcoming.", difficulty: "medium", skill: "RL.3 Inference" },
          { q: "What is the THEME of this passage?", options: ["Always bring extra cookies", "A small act of kindness can make someone feel they belong", "New schools are scary", "Kickball is the best game"], answer: 1, hint: "What lesson does the ending show?", explanation: "Zoe's kindness changes Aiden's whole day, showing how kindness helps others belong.", difficulty: "hard", skill: "RL.2 Theme" },
        ],
      }),
    ],

    // ─────────────────────── GRADE 5 ───────────────────────
    5: [
      set({
        id: "g5-info-volcano",
        title: "When the Earth Roars",
        type: "Informational",
        grade: 5,
        passage:
          "Deep beneath the Earth's surface lies a layer of scorching, melted rock called magma. Most of the time, this molten rock stays trapped underground. But when pressure builds up, magma can force its way to the surface through a crack in the Earth's crust. This dramatic event is called a volcanic eruption.\n\n" +
          "Not all eruptions are the same. Some volcanoes ooze slow rivers of glowing lava that can be tracked for days, giving people time to move to safety. Others erupt with explosive force, blasting ash, rock, and gas high into the sky in a matter of seconds. The most violent eruptions can darken the sky for miles and reshape the land around them.\n\n" +
          "Although volcanoes can be destructive, they also create. Over thousands of years, cooled lava breaks down into rich, fertile soil where crops grow well. Volcanic islands, such as the Hawaiian Islands, were built entirely from layers of hardened lava. In this way, the same force that destroys can also build something new.",
        questions: [
          { q: "What is the central idea of this passage?", options: ["All volcanoes erupt the same way", "Volcanoes can be both destructive and creative", "Magma is always trapped underground", "Hawaii is a dangerous place"], answer: 1, hint: "Consider how the last paragraph balances the others.", explanation: "The passage explains volcanoes' destruction but also how they create soil and islands — both destructive and creative.", difficulty: "medium", skill: "RI.2 Central idea" },
          { q: "Based on the passage, why do slow lava eruptions give people 'time to move to safety'?", options: ["The lava is cold", "The lava moves slowly and can be tracked for days", "The lava is invisible", "Scientists stop the eruption"], answer: 1, hint: "Re-read the description of oozing eruptions.", explanation: "Slow rivers of lava can be tracked over days, allowing people time to evacuate.", difficulty: "medium", skill: "RI.1 Inference" },
          { q: "In paragraph one, the word 'molten' most nearly means —", options: ["frozen solid", "melted by extreme heat", "buried in dirt", "broken into pieces"], answer: 1, hint: "It describes magma, which is scorching.", explanation: "Context clues ('scorching, melted rock') show 'molten' means melted by heat.", difficulty: "medium", skill: "RI.4 Vocab in context" },
          { q: "How is the passage MAINLY organized?", options: ["By comparing two unrelated topics", "By describing a cause, then unrelated effects", "By explaining what eruptions are, their types, and their effects", "By listing events in the order they happened in one day"], answer: 2, hint: "What does each paragraph add?", explanation: "Paragraph 1 defines eruptions, paragraph 2 gives types, paragraph 3 gives effects — a description structure.", difficulty: "hard", skill: "RI.5 Text structure" },
          { q: "Which sentence BEST supports the idea that volcanoes can 'build something new'?", options: ["Magma stays trapped underground most of the time.", "Some eruptions blast ash high into the sky.", "Volcanic islands were built entirely from layers of hardened lava.", "The most violent eruptions can darken the sky."], answer: 2, hint: "Which sentence shows creation, not destruction?", explanation: "The sentence about volcanic islands being built from lava supports the 'building' idea.", difficulty: "hard", skill: "RI.1 Cite evidence" },
        ],
      }),
      set({
        id: "g5-lit-storm-sail",
        title: "Against the Wind",
        type: "Literary",
        grade: 5,
        passage:
          "Marisol gripped the rope as the small sailboat tilted hard to one side. Her grandfather had taught her to sail on calm summer mornings, but this was different. Gray clouds had swallowed the sun, and the wind howled like a living thing, snapping the sail back and forth.\n\n" +
          "\"Steady now,\" she told herself, repeating her grandfather's favorite words. \"The sea rewards the patient.\" Her hands ached, and salt spray stung her eyes, but she refused to panic. She remembered to point the bow toward the waves instead of letting them crash against the side.\n\n" +
          "Slowly, the little boat climbed each swell and slid down the other side. Marisol's arms trembled with effort, yet she held her course. After what felt like hours, the clouds began to thin, and a pale ribbon of shoreline appeared ahead. By the time she guided the boat to the dock, the storm had passed. She was soaked, exhausted, and prouder than she had ever been.",
        questions: [
          { q: "What challenge does Marisol face in this passage?", options: ["She forgot how to sail", "She must sail her boat through a sudden storm", "She lost her grandfather's rope", "She cannot find the dock"], answer: 1, hint: "What changes from the calm mornings she learned on?", explanation: "Marisol must handle the boat in a dangerous, unexpected storm.", difficulty: "easy", skill: "RL.3 Conflict" },
          { q: "What does the phrase 'the wind howled like a living thing' help the reader picture?", options: ["A gentle breeze", "A fierce, almost alive storm wind", "A quiet evening", "A pack of wolves on shore"], answer: 1, hint: "It is a simile describing the wind.", explanation: "The simile compares the wind to a living thing to show how fierce and wild it is.", difficulty: "medium", skill: "RL.4 Figurative language" },
          { q: "How does her grandfather's saying, 'The sea rewards the patient,' affect Marisol?", options: ["It frightens her more", "It helps her stay calm and keep trying", "It tells her to give up", "It reminds her to swim"], answer: 1, hint: "What does she do right after repeating it?", explanation: "The saying steadies her so she refuses to panic and keeps sailing carefully.", difficulty: "medium", skill: "RL.3 Character" },
          { q: "Which word BEST describes how Marisol acts during the storm?", options: ["Careless", "Courageous", "Cheerful", "Confused"], answer: 1, hint: "She is scared but keeps control.", explanation: "Despite fear and pain, she stays in control and faces danger — she is courageous.", difficulty: "medium", skill: "RL.3 Character trait" },
          { q: "What is the THEME of this passage?", options: ["Sailing is dangerous and should be avoided", "Staying calm and patient helps you overcome hardship", "Grandparents know everything", "Storms never last long"], answer: 1, hint: "Connect her grandfather's words to how she succeeds.", explanation: "Marisol succeeds by staying patient and steady, showing the theme about overcoming hardship through calm persistence.", difficulty: "hard", skill: "RL.2 Theme" },
        ],
      }),
      set({
        id: "g5-info-recycling",
        title: "A Second Life for Trash",
        type: "Informational",
        grade: 5,
        passage:
          "Every year, people around the world throw away billions of tons of garbage. Much of it ends up in landfills, where it can sit for hundreds of years without breaking down. A single plastic bottle, for example, may take more than 450 years to decompose. As landfills grow, they take up land and can pollute nearby soil and water.\n\n" +
          "Recycling offers a powerful solution. When materials like paper, glass, and aluminum are recycled, they are broken down and remade into new products instead of being buried. Recycling one aluminum can saves enough energy to power a television for three hours. Recycling also reduces the need to cut down trees and dig up the Earth for raw materials.\n\n" +
          "Still, recycling only works if people take part. Sorting waste correctly, rinsing containers, and avoiding single-use plastics all make a difference. Small daily choices, multiplied by millions of people, can keep mountains of trash out of landfills and protect the planet for the future.",
        questions: [
          { q: "What is the author's MAIN purpose in this passage?", options: ["To entertain readers with a story about trash", "To persuade readers that recycling is an important solution", "To describe how landfills are built", "To explain how to make aluminum cans"], answer: 1, hint: "Does the author want you to do something?", explanation: "The author presents the problem and urges readers to recycle, so the purpose is to persuade.", difficulty: "hard", skill: "RI.6 Author's purpose" },
          { q: "According to the passage, why are landfills a problem?", options: ["They are too colorful", "Garbage can sit for centuries and pollute soil and water", "They recycle too much", "They power televisions"], answer: 1, hint: "Re-read paragraph one.", explanation: "Landfills hold trash that won't break down for centuries and can pollute soil and water.", difficulty: "easy", skill: "RI.1 Detail" },
          { q: "The fact that recycling one can 'saves enough energy to power a television for three hours' is included to —", options: ["confuse the reader", "show how much energy recycling can save", "describe how televisions work", "explain how cans are made"], answer: 1, hint: "Why give that specific number?", explanation: "The author uses the example as evidence of how much energy recycling saves.", difficulty: "medium", skill: "RI.8 Evidence/reasoning" },
          { q: "In paragraph one, the word 'decompose' most nearly means —", options: ["to break down and rot away", "to grow larger", "to be recycled", "to float on water"], answer: 0, hint: "It describes what a bottle does over 450 years.", explanation: "Context (sitting for hundreds of years) shows 'decompose' means to break down and rot.", difficulty: "medium", skill: "RI.4 Vocab in context" },
          { q: "Based on the last paragraph, the author would MOST likely agree that —", options: ["recycling is the job of factories only", "individual choices can add up to a big difference", "single-use plastics are helpful", "one person cannot help the planet"], answer: 1, hint: "Read the final sentence carefully.", explanation: "The author stresses that small choices by millions of people make a difference.", difficulty: "hard", skill: "RI.1 Inference" },
        ],
      }),
      set({
        id: "g5-lit-grandfather-clock",
        title: "The Clockmaker's Gift",
        type: "Literary",
        grade: 5,
        passage:
          "When Grandpa Theo died, he left Nadia something strange: an old, broken grandfather clock that hadn't ticked in years. Her cousins received money and jewelry, but Nadia got a dusty wooden case taller than she was, with a cracked face and a silent pendulum.\n\n" +
          "At first, Nadia was disappointed. But as she dusted the clock, she found a folded note tucked behind the pendulum, written in her grandfather's careful handwriting. \"To fix what is broken,\" it read, \"you must first understand how it works.\"\n\n" +
          "Curious, Nadia began to study the clock's tangle of gears and springs. She checked out library books, watched videos, and spent weeks learning how each tiny piece fit together. Her fingers grew nimble and her patience grew deep. One quiet evening, she fitted the last gear into place and gently pushed the pendulum. Tick. Tock. The clock came alive.\n\n" +
          "Nadia realized her grandfather hadn't left her a broken clock at all. He had left her a puzzle, a challenge, and the joy of solving it herself. It was the best gift of all.",
        questions: [
          { q: "Why is Nadia disappointed at the start of the passage?", options: ["She received money instead of a clock", "She inherited an old, broken clock while her cousins got money and jewelry", "The clock was too small", "Grandpa Theo forgot her"], answer: 1, hint: "Compare what she got to what her cousins got.", explanation: "Nadia gets a broken clock while her cousins receive money and jewelry, which disappoints her.", difficulty: "easy", skill: "RL.1 Detail" },
          { q: "What does Grandpa Theo's note mean: 'To fix what is broken, you must first understand how it works'?", options: ["The clock cannot be fixed", "Understanding something is the first step to repairing it", "Only adults can fix clocks", "Broken things should be thrown away"], answer: 1, hint: "What does Nadia do after reading it?", explanation: "The note teaches that you must understand how something works before you can fix it.", difficulty: "medium", skill: "RL.2 Central message" },
          { q: "How does Nadia change over the course of the passage?", options: ["She becomes lazy and bored", "She grows more patient and skilled", "She gives up on the clock", "She becomes angry at her grandfather"], answer: 1, hint: "Look at how she works on the clock over weeks.", explanation: "As she studies and repairs the clock, her fingers grow nimble and her patience deepens.", difficulty: "medium", skill: "RL.3 Character change" },
          { q: "The author repeats the words 'Tick. Tock.' MOST likely to —", options: ["confuse the reader", "show that the clock has finally come alive", "describe the weather", "fill up space"], answer: 1, hint: "What just happened in the story?", explanation: "The 'Tick. Tock.' marks the moment the repaired clock starts working again.", difficulty: "hard", skill: "RL.4 Author's craft" },
          { q: "What is the THEME of this passage?", options: ["Money is the best gift", "The value of a gift can be the lesson and joy it brings", "Clocks are hard to fix", "Cousins are always luckier"], answer: 1, hint: "Why does Nadia call it the best gift?", explanation: "Nadia learns the true gift was the challenge and the joy of solving it — that's the theme.", difficulty: "hard", skill: "RL.2 Theme" },
        ],
      }),
      set({
        id: "g5-info-migration",
        title: "The Longest Journey",
        type: "Informational",
        grade: 5,
        passage:
          "Each year, the Arctic tern makes one of the most incredible journeys in the entire animal kingdom. This small seabird, no heavier than a baseball, travels from the Arctic, near the North Pole, all the way to Antarctica, near the South Pole — and then back again. In a single year, an Arctic tern may fly more than 40,000 miles.\n\n" +
          "Why would a bird travel so far? The answer is sunlight. By flying from one end of the planet to the other, the Arctic tern is able to enjoy two summers each year. More daylight means more time to hunt for the small fish and insects it eats. In its lifetime, a single tern may fly a distance equal to three trips to the Moon and back.\n\n" +
          "Scientists are still amazed by how these birds find their way across oceans without maps or signs. Some researchers believe the terns use the position of the sun and stars, while others think they can sense the Earth's magnetic field. However they do it, the Arctic tern proves that even the smallest travelers can accomplish the greatest journeys.",
        questions: [
          { q: "What is the central idea of this passage?", options: ["Arctic terns are heavy birds", "The Arctic tern makes an amazing long-distance migration each year", "Antarctica is colder than the Arctic", "Birds cannot find their way over oceans"], answer: 1, hint: "What does every paragraph keep returning to?", explanation: "The passage focuses on the tern's remarkable yearly migration between the poles.", difficulty: "medium", skill: "RI.2 Central idea" },
          { q: "According to the passage, WHY does the Arctic tern travel so far?", options: ["To escape other birds", "To follow sunlight and enjoy two summers", "To visit the Moon", "To find a warmer nest"], answer: 1, hint: "Re-read paragraph two.", explanation: "The tern flies pole to pole to follow sunlight, giving it two summers and more time to hunt.", difficulty: "easy", skill: "RI.1 Detail" },
          { q: "The author compares the tern's lifetime travel to 'three trips to the Moon and back' in order to —", options: ["explain how rockets work", "help readers picture an enormous distance", "prove birds visit space", "describe the color of the Moon"], answer: 1, hint: "Why use a comparison readers know?", explanation: "The comparison helps readers grasp just how far the tern flies in its life.", difficulty: "hard", skill: "RI.8 Author's craft" },
          { q: "In paragraph three, the phrase 'sense the Earth's magnetic field' suggests that terns —", options: ["carry a paper map", "may feel an invisible force that guides them", "can read road signs", "follow other birds only"], answer: 1, hint: "They travel without maps or signs.", explanation: "Sensing a magnetic field means feeling an invisible natural force for navigation.", difficulty: "medium", skill: "RI.4 Vocab in context" },
          { q: "Which detail BEST supports the idea that the Arctic tern's journey is remarkable for such a small bird?", options: ["It eats small fish and insects.", "It is no heavier than a baseball yet flies over 40,000 miles a year.", "It lives near the North Pole.", "Scientists study the tern."], answer: 1, hint: "Which detail contrasts its size with its distance?", explanation: "Being baseball-light yet flying 40,000 miles shows how remarkable the small bird's journey is.", difficulty: "hard", skill: "RI.1 Cite evidence" },
        ],
      }),
    ],
  };

  // Selector: returns a flat list of questions, grouped by passage and in
  // order, each carrying its passage text. Picks whole passage sets until
  // it reaches `count` questions. Falls back to an adjacent grade if needed.
  function getReadingPassageQuestions(grade, count) {
    count = count || 10;
    grade = parseInt(grade) || 4;

    const tryGrades = [grade, grade - 1, grade + 1, 4, 5];
    const sets = [];
    const usedIds = new Set();
    for (const g of tryGrades) {
      const list = READING_PASSAGES[g];
      if (!list) continue;
      for (const s of list) {
        if (!usedIds.has(s.id)) { sets.push(s); usedIds.add(s.id); }
      }
    }

    // Shuffle passage sets for variety, but keep each set's questions ordered.
    for (let i = sets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sets[i], sets[j]] = [sets[j], sets[i]];
    }

    const out = [];
    for (const s of sets) {
      if (out.length >= count) break;
      s.questions.forEach(q => {
        out.push(Object.assign({}, q, {
          passage: s.passage,
          passageTitle: s.title,
          passageType: s.type,
          source: SRC,
        }));
      });
    }
    return out.slice(0, Math.max(count, 0));
  }

  // Expose globally
  if (typeof window !== 'undefined') {
    window.READING_PASSAGES = READING_PASSAGES;
    window.getReadingPassageQuestions = getReadingPassageQuestions;
  }
})();
