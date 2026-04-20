// =============================================
// MathChamp v2 — Full Game Engine
// Leaderboard · XP & Levels · Daily Challenges
// Combo Streaks · Enhanced Rewards · Unlimited Questions
// =============================================

(function () {
    'use strict';

    // ===================== THEME TOGGLE =====================
    const THEME_KEY = 'levelupkids_theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        // Update all toggle button icons
        const icon = theme === 'light' ? '☀️' : '🌙';
        document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
            btn.textContent = icon;
            btn.title = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        });
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Apply saved theme immediately (default = dark)
    (function initTheme() {
        const saved = localStorage.getItem(THEME_KEY) || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        // Icons will be set once DOM is ready
    })();

    document.addEventListener('DOMContentLoaded', () => {
        // Set initial icons
        const saved = localStorage.getItem(THEME_KEY) || 'dark';
        applyTheme(saved);
        // Bind all toggle buttons
        document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });
    });

    // ===================== CONSTANTS =====================
    const POINTS_MAP = { easy: 2, medium: 5, hard: 10 };
    const WRONG_PENALTY = { easy: -1, medium: -3, hard: -5 };
    const HINT_PENALTY = 2;
    const QUESTIONS_PER_QUIZ = 20;
    const TIMED_SECONDS = 90;
    const DAILY_CHALLENGE_COUNT = 5;

    const CATEGORY_NAMES = {
        // ─── Math Exams ───────────────────────────────────────
        sba_math: '📊 SBA Math',
        fastbridge: '📋 FastBridge aMath',
        moems: '🏅 MOEMS',
        noetic: '✨ Noetic Math',
        olympiad: '🏆 Math Olympiad',
        mathcounts: '📐 Mathcounts',
        kangaroo: '🦘 Math Kangaroo',
        highcap: '🎯 High Cap Screening',
        cogat: '🧩 CogAT',
        imc: '🌍 IMC',
        aime: '🧠 AIME',
        math_challenge: '💪 Math Challenge',
        math_is_cool: '❄️ Math is Cool',
        singapore: '🇸🇬 Singapore Math',
        mixed: '🎲 Practice Blitz',
        // ─── English Exams ───────────────────────────────────
        sba_ela: '📊 SBA ELA',
        fb_reading: '📖 FastBridge aReading',
        spelling_bee: '🐝 Spelling Bee',
        // ─── High School Exams ──────────────────────────────
        sat_math: '📝 SAT Math',
        act_math: '📊 ACT Math',
        psat: '📋 PSAT Math',
        ap_calc: '📈 AP Calculus',
        ap_stats: '📉 AP Statistics',
        amc8: '🥇 AMC 8',
        amc10: '🏅 AMC 10',
        amc12: '🏆 AMC 12',
        cml: '📏 Continental Math League',
        math_league: '🧮 Math League',
        isee_math: '🏫 ISEE Math',
        ssat_math: '🏫 SSAT Math',
        // ─── Internal keys (still used for routing) ──────────
        arithmetic: '🔢 Arithmetic',
        logic: '🧩 Logic',
        geometry: '📐 Geometry',
        word: '📖 Word Problems',
        vocabulary: '📚 Vocabulary',
        grammar: '✏️ Grammar',
        reading: '📖 Reading',
        spelling: '🔤 Spelling',
        sat_english: '📖 SAT Reading & Writing',
        act_english: '📝 ACT English',
        ap_english: '📚 AP English',
        isee_verbal: '🏫 ISEE Verbal',
        ssat_verbal: '🏫 SSAT Verbal',
        wordly_wise: '📖 Wordly Wise',
    };

    // ─── ADMIN EMAILS (users who can see AI Admin panel) ─────
    const ADMIN_EMAILS = [
        'amit.satyam@gmail.com'
    ];

    // ─── LEVEL SYSTEM (based on total points earned) ──────
    const BONUS_QUIZ_COMPLETE = 10;
    const BONUS_PERFECT = 25;
    const BONUS_DAILY = 50;

    function getPointsForLevel(level) { return Math.floor(100 * Math.pow(1.15, level - 1)); }

    function getLevelFromPoints(totalPoints) {
        let level = 1, needed = 0;
        while (true) {
            const req = getPointsForLevel(level);
            if (needed + req > totalPoints) return { level, currentPoints: totalPoints - needed, nextLevelPoints: req };
            needed += req;
            level++;
        }
    }

    const TIERS = [
        { name: 'Bronze', emoji: '🥉', minLevel: 1, color: '#CD7F32' },
        { name: 'Silver', emoji: '🥈', minLevel: 5, color: '#C0C0C0' },
        { name: 'Gold', emoji: '🥇', minLevel: 10, color: '#FFD700' },
        { name: 'Platinum', emoji: '💠', minLevel: 20, color: '#E5E4E2' },
        { name: 'Diamond', emoji: '💎', minLevel: 35, color: '#B9F2FF' },
        { name: 'Master', emoji: '👑', minLevel: 50, color: '#FF6B9D' },
    ];

    function getTier(level) {
        let tier = TIERS[0];
        for (const t of TIERS) { if (level >= t.minLevel) tier = t; }
        return tier;
    }

    // ─── COMBO MULTIPLIER ───────────────────────────────────
    function getComboMultiplier(combo) {
        if (combo >= 10) return 2.0;
        if (combo >= 7) return 1.75;
        if (combo >= 5) return 1.5;
        if (combo >= 3) return 1.25;
        return 1.0;
    }

    // ─── ENHANCED REWARDS ───────────────────────────────────
    const REWARDS = {
        activities: [
            { id: 'gaming_time', emoji: '🎮', name: '1 Hour Extra Gaming', desc: 'Extra gaming session!', cost: 1500, tier: 'common' },
            { id: 'bike_ride', emoji: '🚲', name: 'Bike Ride Adventure', desc: 'Go on a bike ride to the park!', cost: 1200, tier: 'common' },
            { id: 'baking_day', emoji: '🧁', name: 'Baking Day', desc: 'Bake cookies or a cake together!', cost: 2000, tier: 'rare' },
            { id: 'board_game', emoji: '🎲', name: 'Board Game Night', desc: 'Pick the game for family game night!', cost: 1000, tier: 'common' },
            { id: 'craft_time', emoji: '✂️', name: 'Craft Project', desc: 'Pick a fun craft to make!', cost: 1500, tier: 'common' },
            { id: 'science_exp', emoji: '🔬', name: 'Science Experiment', desc: 'Do a cool science experiment at home!', cost: 2000, tier: 'rare' },
            { id: 'backyard_camp', emoji: '🏕️', name: 'Backyard Camping', desc: 'Tent, flashlights & s\'mores in the backyard!', cost: 2500, tier: 'rare' },
            { id: 'treasure_hunt', emoji: '🔦', name: 'Treasure Hunt', desc: 'Parent creates a treasure hunt just for you!', cost: 1800, tier: 'rare' },
            { id: 'pillow_fort', emoji: '🛋️', name: 'Pillow Fort Night', desc: 'Build a fort & sleep in it — no cleanup till morning!', cost: 1200, tier: 'common' },
            { id: 'star_gazing', emoji: '🌟', name: 'Star Gazing Night', desc: 'Stay up late to watch stars with hot chocolate!', cost: 2000, tier: 'rare' },
            { id: 'dance_party', emoji: '💃', name: 'Family Dance Party', desc: '30 min of dancing — parents MUST participate!', cost: 800, tier: 'common' },
            { id: 'fort_building', emoji: '🏗️', name: 'Fort Building Day', desc: 'Blankets + pillows everywhere — no cleanup for 24 hours!', cost: 1200, tier: 'common' },
            { id: 'cooking_together', emoji: '👨‍🍳', name: 'Cooking Together', desc: 'Pick a recipe & cook it with a parent!', cost: 1500, tier: 'common' },
            { id: 'photo_shoot', emoji: '📸', name: 'Phone Photo Shoot', desc: 'Borrow parent\'s phone for a fun photo session!', cost: 1000, tier: 'common' },
            { id: 'breakfast_dinner', emoji: '🥞', name: 'Breakfast for Dinner', desc: 'Pancakes at dinner time — rules reversed!', cost: 800, tier: 'common' },
        ],
        privileges: [
            { id: 'extra_screen', emoji: '📱', name: '30 Min Extra Screen Time', desc: 'Extra screen time for a day!', cost: 1200, tier: 'common' },
            { id: 'no_chores', emoji: '🏖️', name: 'Skip Chores Day', desc: 'One day free from chores!', cost: 1800, tier: 'common' },
            { id: 'stay_up_late', emoji: '🌙', name: 'Stay Up 30 Min Late', desc: 'Push bedtime by 30 minutes!', cost: 1200, tier: 'common' },
            { id: 'movie_night', emoji: '🎬', name: 'Movie Night Pick', desc: 'You pick the family movie!', cost: 2400, tier: 'rare' },
            { id: 'restaurant', emoji: '🍕', name: 'Restaurant Choice', desc: 'Pick where the family eats!', cost: 3000, tier: 'rare' },
            { id: 'breakfast_bed', emoji: '🥞', name: 'Breakfast in Bed', desc: 'Get breakfast served in bed!', cost: 1500, tier: 'common' },
            { id: 'no_veggies', emoji: '🍩', name: 'No Veggies Dinner', desc: 'One dinner with no vegetables!', cost: 1200, tier: 'common' },
            { id: 'music_choice', emoji: '🎵', name: 'DJ for a Day', desc: 'Pick the music in the car all day!', cost: 1050, tier: 'common' },
            { id: 'homework_break', emoji: '📚', name: 'Homework-Free Evening', desc: 'One evening off from extra homework!', cost: 2400, tier: 'rare' },
            { id: 'sleepover', emoji: '🏕️', name: 'Sleepover Permission', desc: 'Invite a friend for a sleepover!', cost: 4500, tier: 'epic' },
            { id: 'dessert_first', emoji: '🍰', name: 'Dessert Before Dinner', desc: 'Eat dessert first — rules reversed!', cost: 900, tier: 'common' },
            { id: 'pajama_day', emoji: '🛌', name: 'Pajama Day', desc: 'Stay in PJs all day — no getting dressed!', cost: 1050, tier: 'common' },
            { id: 'skip_bath', emoji: '🛁', name: 'Skip Bath Night', desc: 'One night off from bath/shower!', cost: 900, tier: 'common' },
            { id: 'backseat_driver', emoji: '🚙', name: 'Backseat Navigator', desc: 'You pick the route on the next car ride!', cost: 750, tier: 'common' },
            { id: 'lunch_choice', emoji: '🍱', name: 'Lunch Box Pick', desc: 'You design your own lunch for a week!', cost: 1800, tier: 'rare' },
            { id: 'stay_up_1hr', emoji: '🌃', name: 'Stay Up 1 Hour Late', desc: 'Push bedtime by a full hour!', cost: 2400, tier: 'rare' },
            { id: 'friend_playdate', emoji: '🤝', name: 'Friend Playdate', desc: 'Invite a friend over to play!', cost: 2100, tier: 'rare' },
            { id: 'no_reading', emoji: '📵', name: 'Screen Day Pass', desc: 'No reading time — extra screen time instead!', cost: 3000, tier: 'epic' },
            { id: 'role_swap', emoji: '🔄', name: 'Role Swap (30 min)', desc: 'YOU become the parent — tell them what to do!', cost: 1500, tier: 'common' },
            { id: 'rule_maker', emoji: '📜', name: 'Rule Maker for a Week', desc: 'Invent one new family rule that lasts a whole week!', cost: 4500, tier: 'epic' },
            { id: 'video_call', emoji: '📹', name: 'Video Call a Friend', desc: '30-minute video call with a friend — your time!', cost: 1050, tier: 'common' },
            { id: 'youtube_pick', emoji: '▶️', name: 'YouTube Family Pick', desc: 'Pick a 30-min video the whole family watches!', cost: 900, tier: 'common' },
            { id: 'special_seat', emoji: '🪑', name: 'VIP Dinner Seat', desc: 'Sit in the special VIP chair at dinner for a week!', cost: 1200, tier: 'common' },
            { id: 'smoothie_bar', emoji: '🥤', name: 'Smoothie Inventor', desc: 'Make your own smoothie with ANY ingredients!', cost: 900, tier: 'common' },
        ],
        toys: [
            { id: 'sticker_pack', emoji: '🌟', name: 'Sticker Pack', desc: 'A pack of 10 awesome stickers!', cost: 1800, tier: 'common' },
            { id: 'pokemon_cards', emoji: '🃏', name: 'Pokémon Card Pack', desc: '5 random Pokémon cards!', cost: 7500, tier: 'rare' },
            { id: 'puzzle_cube', emoji: '🧊', name: 'Speed Cube', desc: 'A competition-grade Rubik\'s cube', cost: 6000, tier: 'rare' },
            { id: 'art_supplies', emoji: '🎨', name: 'Art Supply Set', desc: 'Markers, crayons & more!', cost: 10500, tier: 'epic' },
            { id: 'book_choice', emoji: '📖', name: 'Book of Your Choice', desc: 'Pick any book from the bookstore!', cost: 9000, tier: 'epic' },
            { id: 'lego_set', emoji: '🧱', name: 'LEGO Mini Set', desc: 'Build & learn with LEGO!', cost: 18000, tier: 'legendary' },
        ],
        legendary: [
            { id: 'ice_cream', emoji: '🍦', name: 'Ice Cream Trip', desc: 'A trip to the ice cream shop!', cost: 5000, tier: 'rare' },
            { id: 'bowling', emoji: '🎳', name: 'Bowling Trip', desc: 'A trip to the bowling alley with friends!', cost: 12000, tier: 'epic' },
            { id: 'movie_theater', emoji: '🎬', name: 'Movie Theater Trip', desc: 'See a movie in theaters with popcorn!', cost: 15000, tier: 'epic' },
            { id: 'pizza_party', emoji: '🍕', name: 'Pizza Party', desc: 'Invite friends over for a pizza party!', cost: 20000, tier: 'legendary' },
            { id: 'boss_of_house', emoji: '👑', name: 'Boss of the House', desc: 'You make ALL the family decisions for an evening!', cost: 12000, tier: 'legendary' },
            { id: 'yes_day_legendary', emoji: '🎉', name: 'ULTIMATE YES Day', desc: 'Parents say YES to everything — the whole day!', cost: 30000, tier: 'legendary' },
        ]
    };

    // ─── ACHIEVEMENTS ───────────────────────────────────────
    const ACHIEVEMENTS = [
        { id: 'first_quiz', emoji: '🎯', name: 'First Steps', desc: 'Complete your first quiz', check: (p) => p.totalQuizzes >= 1 },
        { id: 'ten_quizzes', emoji: '🔟', name: 'Quiz Master', desc: 'Complete 10 quizzes', check: (p) => p.totalQuizzes >= 10 },
        { id: 'fifty_quizzes', emoji: '🏅', name: 'Math Machine', desc: 'Complete 50 quizzes', check: (p) => p.totalQuizzes >= 50 },
        { id: 'hundred_quizzes', emoji: '💯', name: 'Centurion', desc: 'Complete 100 quizzes', check: (p) => p.totalQuizzes >= 100 },
        { id: 'perfect_score', emoji: '💯', name: 'Perfect!', desc: 'Get 100% on any quiz', check: (p) => p.perfectScores >= 1 },
        { id: 'five_perfect', emoji: '⭐', name: 'Star Student', desc: 'Get 5 perfect scores', check: (p) => p.perfectScores >= 5 },
        { id: 'twenty_perfect', emoji: '🌟', name: 'Perfectionist', desc: 'Get 20 perfect scores', check: (p) => p.perfectScores >= 20 },
        { id: 'hundred_correct', emoji: '✅', name: 'Century', desc: 'Answer 100 questions correctly', check: (p) => p.totalCorrect >= 100 },
        { id: 'five_hundred_correct', emoji: '🏆', name: 'Half Millennium', desc: 'Answer 500 correctly', check: (p) => p.totalCorrect >= 500 },
        { id: 'thousand_correct', emoji: '👑', name: 'Millennium', desc: 'Answer 1,000 correctly', check: (p) => p.totalCorrect >= 1000 },
        { id: 'olympiad_master', emoji: '🥇', name: 'Olympiad Hero', desc: '80%+ on 5 Olympiad quizzes', check: (p) => (p.categoryHighScores?.olympiad || 0) >= 5 },
        { id: 'all_categories', emoji: '🌈', name: 'Well Rounded', desc: 'Play every category', check: (p) => p.categoriesPlayed && Object.keys(p.categoriesPlayed).length >= 5 },
        { id: 'streak_3', emoji: '🔥', name: 'On Fire!', desc: '3-day streak', check: (p) => p.maxStreak >= 3 },
        { id: 'streak_7', emoji: '💪', name: 'Unstoppable', desc: '7-day streak', check: (p) => p.maxStreak >= 7 },
        { id: 'streak_14', emoji: '🚀', name: 'Two Weeks Strong', desc: '14-day streak', check: (p) => p.maxStreak >= 14 },
        { id: 'streak_30', emoji: '🐲', name: 'Dragon Mode', desc: '30-day streak', check: (p) => p.maxStreak >= 30 },
        { id: 'earn_100', emoji: '🪙', name: 'Piggy Bank', desc: 'Earn 100 points', check: (p) => p.totalPointsEarned >= 100 },
        { id: 'earn_500', emoji: '💰', name: 'Money Bags', desc: 'Earn 500 points', check: (p) => p.totalPointsEarned >= 500 },
        { id: 'earn_1000', emoji: '🏦', name: 'Rich Scholar', desc: 'Earn 1,000 points', check: (p) => p.totalPointsEarned >= 1000 },
        { id: 'earn_5000', emoji: '💎', name: 'Math Millionaire', desc: 'Earn 5,000 points', check: (p) => p.totalPointsEarned >= 5000 },
        { id: 'earn_10000', emoji: '🏰', name: 'Math Tycoon', desc: 'Earn 10,000 points', check: (p) => p.totalPointsEarned >= 10000 },
        { id: 'first_redeem', emoji: '🎁', name: 'Shopper', desc: 'Redeem your first reward', check: (p) => p.totalRedemptions >= 1 },
        { id: 'no_hints', emoji: '🧠', name: 'Big Brain', desc: 'Quiz without any hints', check: (p) => p.quizzesWithNoHints >= 1 },
        { id: 'speed_demon', emoji: '⚡', name: 'Speed Demon', desc: 'Blitz with 80%+ accuracy', check: (p) => p.blitzHighAccuracy >= 1 },
        { id: 'hard_crusher', emoji: '💥', name: 'Hard Crusher', desc: '20 hard questions correct', check: (p) => p.hardCorrect >= 20 },
        { id: 'combo_5', emoji: '🔗', name: 'Chain Reaction', desc: 'Get a 5-combo streak', check: (p) => p.maxCombo >= 5 },
        { id: 'combo_10', emoji: '⛓️', name: 'Unstoppable Combo', desc: 'Get a 10-combo streak', check: (p) => p.maxCombo >= 10 },
        { id: 'level_10', emoji: '🎓', name: 'Scholar', desc: 'Reach Level 10', check: (p) => getLevelFromPoints(p.totalPointsEarned || 0).level >= 10 },
        { id: 'level_25', emoji: '🎖️', name: 'Expert', desc: 'Reach Level 25', check: (p) => getLevelFromPoints(p.totalPointsEarned || 0).level >= 25 },
        { id: 'daily_7', emoji: '📅', name: 'Week Warrior', desc: 'Complete 7 daily challenges', check: (p) => (p.dailyChallengesCompleted || 0) >= 7 },
    ];

    // ─── SIMULATED LEADERBOARD PLAYERS ──────────────────────
    const BOT_NAMES = [
        'MathWizard_22', 'CalculusKing', 'NumberNinja99', 'BrainStorm_X', 'AlgebraAce',
        'GeometryGuru', 'PuzzleMaster7', 'MathMaven_11', 'EinsteinJr', 'PiLover314',
        'FactorFrenzy', 'PrimeHunter', 'EquationEagle', 'LogicLion', 'FractionKing',
        'SymmetryStarr', 'DivisionDragon', 'MultiplyMaster', 'AnglePro360', 'RootFinder',
        'TriangleTitan', 'CircleChamp', 'PatternPro', 'DecimalDude', 'ExponentElf',
        'GraphGenie', 'CalcuNinja', 'MathPanda', 'BinaryBoss', 'ProofPilot',
    ];

    function generateBotPlayers(playerGrade) {
        const bots = [];
        const used = new Set();
        const count = 25;
        for (let i = 0; i < count; i++) {
            let name;
            do { name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)]; } while (used.has(name));
            used.add(name);
            const level = Math.max(1, Math.floor(Math.random() * 40) + 1);
            const totalPts = Array.from({ length: level }, (_, l) => getPointsForLevel(l + 1)).reduce((a, b) => a + b, 0) + Math.floor(Math.random() * getPointsForLevel(level + 1));
            const grade = Math.max(1, Math.min(12, playerGrade + Math.floor(Math.random() * 3) - 1));
            bots.push({
                name, grade, totalPointsEarned: totalPts, level,
                totalQuizzes: Math.floor(Math.random() * 100) + level * 3,
                totalCorrect: Math.floor(Math.random() * 500) + level * 15,
                totalAttempted: Math.floor(Math.random() * 600) + level * 20,
                maxStreak: Math.floor(Math.random() * 30) + 1,
                isBot: true
            });
        }
        return bots;
    }

    // ===================== STATE =====================
    let state = {
        currentScreen: 'welcome',
        player: null,
        quiz: null,
        timerInterval: null,
        bots: null,
        currentLBTab: 'global',
        authUser: null,  // Firebase auth user
        useFirebase: false // Whether Firebase is active
    };

    // ===================== DOM HELPERS =====================
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function showScreen(screenId) {
        $$('.screen').forEach(s => s.classList.remove('active'));
        const el = $(`#screen-${screenId}`);
        if (el) el.classList.add('active');
        state.currentScreen = screenId;
        window.scrollTo(0, 0);

        // Update URL hash for routing (skip quiz/results — transient screens)
        const routableScreens = ['dashboard', 'leaderboard', 'rewards', 'achievements', 'progress', 'challenge'];
        if (routableScreens.includes(screenId)) {
            const newHash = '#' + screenId;
            if (window.location.hash !== newHash) {
                history.pushState(null, '', newHash);
            }
        } else if (screenId === 'welcome') {
            if (window.location.hash) {
                history.pushState(null, '', window.location.pathname);
            }
        }
    }

    // ─── Hash-based Router ──────────────────────────────────
    function navigateToHash(hash) {
        const route = (hash || '').replace('#', '');
        if (route === 'reset') { resetAllData(); return; }
        if (!state.player) return;
        switch (route) {
            case 'dashboard':    showDashboard(); break;
            case 'leaderboard':  showLeaderboard(); break;
            case 'rewards':      showRewardsStore(); break;
            case 'achievements': showAchievements(); break;
            case 'progress':     showProgress(); break;
            case 'challenge':    showChallengeScreen(); break;
            default:             showDashboard(); break;
        }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        if (state.player) {
            navigateToHash(window.location.hash);
        }
    });

    // ===================== PLAYER DATA =====================
    function getDefaultPlayer(name, grade) {
        return {
            name, grade, points: 0, totalPointsEarned: 0,
            totalQuizzes: 0, totalCorrect: 0, totalAttempted: 0,
            perfectScores: 0, streak: 0, maxStreak: 0,
            lastPlayedDate: null, categoriesPlayed: {}, categoryStats: {},
            categoryHighScores: {}, sessions: [], redemptions: [],
            totalRedemptions: 0, quizzesWithNoHints: 0,
            blitzHighAccuracy: 0, hardCorrect: 0, maxCombo: 0,
            achievements: [], dailyChallengesCompleted: 0,
            dailyChallengeToday: null, dailyStreakDates: []
        };
    }

    function savePlayer() {
        if (!state.player || state._resetting) return;
        // Always save to localStorage (keyed by name AND uid if available)
        const all = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
        all[state.player.name.toLowerCase()] = state.player;
        if (state.authUser && state.authUser.uid) {
            all['__uid__' + state.authUser.uid] = state.player;
        }
        localStorage.setItem('mathchamp_players', JSON.stringify(all));
        localStorage.setItem('mathchamp_last_player', state.player.name);

        // Also save to Firestore if signed in
        if (state.useFirebase && state.authUser && typeof FirestoreDB !== 'undefined') {
            showSyncStatus('syncing');
            const cleanPlayer = { ...state.player };
            delete cleanPlayer.updatedAt;
            FirestoreDB.savePlayer({
                ...cleanPlayer,
                photoURL: state.authUser?.photoURL || null
            }).then(ok => {
                if (ok) showSyncStatus('synced');
                else showSyncStatus('offline');
            }).catch(() => showSyncStatus('offline'));
        }
    }

    function showSyncStatus(status) {
        let el = $('#sync-status');
        if (!el) {
            el = document.createElement('div');
            el.id = 'sync-status';
            el.className = 'sync-status';
            document.body.appendChild(el);
        }
        el.className = 'sync-status ' + status;
        el.textContent = status === 'synced' ? '☁️ Synced' : status === 'syncing' ? '⏳ Syncing...' : '📴 Offline';
        clearTimeout(el._timer);
        el._timer = setTimeout(() => { el.className = 'sync-status'; }, 2000);
    }

    function loadPlayer(name) {
        const all = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
        let player = all[name.toLowerCase()] || null;
        if (!player && state.authUser) {
            player = all['__uid__' + state.authUser.uid] || null;
        }
        return player;
    }

    // ─── Merge two player data objects, keeping the best of each ──
    function mergePlayerData(a, b) {
        const merged = { ...a };
        const maxFields = [
            'points', 'totalPointsEarned', 'totalQuizzes', 'totalCorrect', 'totalAttempted',
            'totalPointsEarned', 'streak', 'maxStreak', 'perfectScores',
            'quizzesWithNoHints', 'blitzHighAccuracy', 'hardCorrect', 'maxCombo',
            'dailyChallengesCompleted', 'totalRedemptions'
        ];
        for (const key of maxFields) {
            merged[key] = Math.max(a[key] || 0, b[key] || 0);
        }
        merged.achievements = [...new Set([...(a.achievements || []), ...(b.achievements || [])])];
        merged.categoriesPlayed = { ...(a.categoriesPlayed || {}), ...(b.categoriesPlayed || {}) };
        const aStats = a.categoryStats || {};
        const bStats = b.categoryStats || {};
        merged.categoryStats = { ...aStats };
        for (const cat in bStats) {
            if (!merged.categoryStats[cat] || (bStats[cat].attempted || 0) > (merged.categoryStats[cat].attempted || 0)) {
                merged.categoryStats[cat] = bStats[cat];
            }
        }
        merged.categoryHighScores = { ...(a.categoryHighScores || {}) };
        for (const cat in (b.categoryHighScores || {})) {
            merged.categoryHighScores[cat] = Math.max(merged.categoryHighScores[cat] || 0, b.categoryHighScores[cat]);
        }
        merged.dailyStreakDates = [...new Set([...(a.dailyStreakDates || []), ...(b.dailyStreakDates || [])])].sort();
        merged.redeemedRewards = (a.redeemedRewards || []).length >= (b.redeemedRewards || []).length
            ? (a.redeemedRewards || []) : (b.redeemedRewards || []);
        merged.sessions = (a.sessions || []).length >= (b.sessions || []).length
            ? (a.sessions || []) : (b.sessions || []);
        merged.name = a.name || b.name;
        merged.grade = a.grade || b.grade;
        if (a.lastPlayedDate && b.lastPlayedDate) {
            merged.lastPlayedDate = new Date(a.lastPlayedDate) > new Date(b.lastPlayedDate)
                ? a.lastPlayedDate : b.lastPlayedDate;
        }
        return merged;
    }

    // Force a full cloud sync
    let _syncInProgress = false;
    async function forceCloudSync(silent) {
        if (_syncInProgress || state._resetting) return;
        if (!state.useFirebase || !state.authUser || !state.player) {
            if (!silent) showToast('Not signed in to Google — cannot sync', 'error');
            return;
        }
        _syncInProgress = true;
        const syncBtn = $('#btn-sync-now');
        if (syncBtn) syncBtn.classList.add('syncing');
        showSyncStatus('syncing');
        try {
            const cloudPlayer = await FirestoreDB.loadPlayer(state.authUser.uid);
            if (cloudPlayer) {
                delete cloudPlayer.updatedAt;
                const merged = mergePlayerData(cloudPlayer, state.player);
                migratePlayer(merged);
                state.player = merged;
            }
            savePlayer();
            if (!silent) showToast('☁️ Data synced!', 'success');
            if (state.currentScreen === 'dashboard') showDashboard();
            else if (state.currentScreen === 'leaderboard') showLeaderboard();
        } catch (e) {
            console.error('🔄 Force sync failed:', e);
            if (!silent) showToast('Sync failed — check connection', 'error');
            showSyncStatus('offline');
        } finally {
            _syncInProgress = false;
            if (syncBtn) syncBtn.classList.remove('syncing');
        }
    }

    // Periodic sync every 2 minutes
    setInterval(() => {
        if (state.useFirebase && state.authUser && state.player && document.visibilityState === 'visible') {
            forceCloudSync(true);
        }
    }, 120000);

    // Sync when tab becomes visible (debounce: hidden for 5+ seconds)
    let _lastHiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            _lastHiddenAt = Date.now();
        } else if (document.visibilityState === 'visible' && state.useFirebase && state.authUser && state.player) {
            if (_lastHiddenAt > 0 && (Date.now() - _lastHiddenAt) > 5000) {
                forceCloudSync(true);
            }
        }
    });

    function getAllPlayerNames() {
        const all = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
        return Object.keys(all).map(k => all[k].name);
    }

    function updateStreak() {
        const today = new Date().toDateString();
        if (state.player.lastPlayedDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.player.lastPlayedDate === yesterday) {
            state.player.streak++;
        } else if (state.player.lastPlayedDate !== today) {
            state.player.streak = 1;
        }
        state.player.maxStreak = Math.max(state.player.maxStreak, state.player.streak);
        state.player.lastPlayedDate = today;
        savePlayer();
    }

    function checkLevelUp() {
        const p = state.player;
        const levelInfo = getLevelFromPoints(p.totalPointsEarned || 0);
        if (!p._lastLevel) p._lastLevel = 1;
        if (levelInfo.level > p._lastLevel) {
            showToast(`🎉 Level Up! You're now Level ${levelInfo.level}!`, 'success');
            launchConfetti();
        }
        p._lastLevel = levelInfo.level;
        savePlayer();
    }

    // ===================== WELCOME SCREEN =====================
    function migratePlayer(p) {
        // Legacy: if player had totalXP but not enough totalPointsEarned, sync up
        if (p.totalXP && (!p.totalPointsEarned || p.totalPointsEarned < p.totalXP)) {
            p.totalPointsEarned = p.totalXP;
        }
        if (!p.maxCombo) p.maxCombo = 0;
        if (!p.dailyChallengesCompleted) p.dailyChallengesCompleted = 0;
        if (!p.dailyStreakDates) p.dailyStreakDates = [];
        return p;
    }

    function initWelcome() {
        const nameInput = $('#player-name');
        const gradeButtons = $$('.grade-btn');
        const startBtn = $('#btn-start');
        const loadBtn = $('#btn-load-profile');
        const googleBtn = $('#btn-google-signin');
        const authUserInfo = $('#auth-user-info');
        const authSection = $('#auth-section');
        let selectedGrade = null;

        // ─── Initialize Firebase if available ───
        if (typeof initFirebase === 'function') {
            state.useFirebase = initFirebase();
        }

        // ─── Google Sign-In Button ───
        if (googleBtn) {
            googleBtn.addEventListener('click', async () => {
                if (!state.useFirebase) {
                    showToast('Google Sign-In not configured yet. Playing as guest.', 'info');
                    return;
                }
                try {
                    googleBtn.disabled = true;
                    googleBtn.textContent = 'Signing in...';
                    const user = await FirebaseAuthHelper.signInWithGoogle();
                    if (user) {
                        handleGoogleUser(user);
                    } else {
                        googleBtn.disabled = false;
                        googleBtn.innerHTML = getSVGGoogle() + ' Sign in with Google';
                    }
                } catch (e) {
                    console.error('Sign-in error:', e);
                    showToast('Sign-in failed. You can still play as guest!', 'error');
                    googleBtn.disabled = false;
                    googleBtn.innerHTML = getSVGGoogle() + ' Sign in with Google';
                }
            });
        }

        function getSVGGoogle() {
            return '<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
        }

        async function handleGoogleUser(user) {
            state.authUser = FirebaseAuthHelper.getUserInfo(user);

            // Update UI to show signed-in user
            if (authSection) authSection.style.display = 'none';
            if (authUserInfo) {
                authUserInfo.style.display = 'flex';
                const photo = $('#auth-user-photo');
                const nameEl = $('#auth-user-name');
                if (photo && user.photoURL) { photo.src = user.photoURL; photo.style.display = 'block'; }
                if (nameEl) nameEl.textContent = user.displayName || user.email;
            }

            // Pre-fill name
            const displayName = user.displayName || 'Math Champion';
            nameInput.value = displayName.split(' ')[0]; // Use first name
            nameInput.dispatchEvent(new Event('input'));

            // Try to load existing profile from Firestore
            let cloudPlayer = null;
            try { cloudPlayer = await FirestoreDB.loadPlayer(user.uid); } catch (e) { console.warn('Cloud load failed:', e); }

            // Also check localStorage
            const allLocal = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
            const localByUid = allLocal['__uid__' + user.uid] || null;
            const localByName = allLocal[(displayName.split(' ')[0]).toLowerCase()] || null;
            const localPlayer = localByUid || localByName;

            if (cloudPlayer && localPlayer) {
                state.player = mergePlayerData(cloudPlayer, localPlayer);
                migratePlayer(state.player);
                showToast(`Welcome back, ${state.player.name}! ☁️ Data synced & merged.`, 'success');
            } else if (cloudPlayer) {
                migratePlayer(cloudPlayer);
                state.player = cloudPlayer;
                showToast(`Welcome back, ${cloudPlayer.name}! ☁️ Data loaded from cloud.`, 'success');
            } else if (localPlayer) {
                migratePlayer(localPlayer);
                state.player = localPlayer;
                showToast(`Welcome back, ${localPlayer.name}! Local data found.`, 'success');
            } else {
                showToast('Welcome! Sign in successful. Choose your grade to start.', 'success');
            }

            if (state.player) {
                delete state.player.updatedAt;
                nameInput.value = state.player.name;
                nameInput.dispatchEvent(new Event('input'));
                if (state.player.grade) {
                    gradeButtons.forEach(b => {
                        b.classList.remove('selected');
                        if (parseInt(b.dataset.grade) === state.player.grade) {
                            b.classList.add('selected');
                            selectedGrade = state.player.grade;
                        }
                    });
                    checkReady();
                }
                savePlayer();
            }
        }

        // ─── Sign-out button ───
        const signOutBtn = $('#btn-auth-signout');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', async () => {
                if (state.useFirebase) await FirebaseAuthHelper.signOut();
                state.authUser = null;
                if (authSection) authSection.style.display = 'block';
                if (authUserInfo) authUserInfo.style.display = 'none';
                if (googleBtn) {
                    googleBtn.disabled = false;
                    googleBtn.innerHTML = getSVGGoogle() + ' Sign in with Google';
                }
                showToast('Signed out. You can still play as guest!', 'info');
            });
        }

        // ─── Auth state listener (for returning users / page refresh) ───
        if (state.useFirebase && typeof FirebaseAuthHelper !== 'undefined') {
            FirebaseAuthHelper.onAuthStateChanged(user => {
                if (user && !state.player) {
                    handleGoogleUser(user);
                }
            });
        }

        // ─── Standard form logic ───
        nameInput.addEventListener('input', checkReady);
        gradeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                gradeButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedGrade = parseInt(btn.dataset.grade);
                checkReady();
            });
        });

        function checkReady() {
            startBtn.disabled = !(nameInput.value.trim() && selectedGrade);
        }

        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (!name || !selectedGrade) return;

            // If we already loaded from cloud, just update grade
            if (state.player && state.authUser) {
                state.player.grade = selectedGrade;
                state.player.name = name;
            } else {
                let existing = loadPlayer(name);
                if (existing) {
                    existing.grade = selectedGrade;
                    migratePlayer(existing);
                    state.player = existing;
                } else {
                    state.player = getDefaultPlayer(name, selectedGrade);
                }
            }
            state.bots = generateBotPlayers(selectedGrade);
            updateStreak();
            savePlayer();
            if (window.location.hash && window.location.hash !== '#') {
                navigateToHash(window.location.hash);
            } else {
                showDashboard();
            }
        });

        loadBtn.addEventListener('click', () => {
            const names = getAllPlayerNames();
            if (names.length === 0) { showToast('No saved profiles found!', 'info'); return; }
            const choice = prompt(`Saved profiles:\n${names.join('\n')}\n\nType your name to load:`);
            if (choice) {
                const p = loadPlayer(choice);
                if (p) {
                    migratePlayer(p);
                    state.player = p;
                    nameInput.value = p.name;
                    gradeButtons.forEach(b => {
                        b.classList.remove('selected');
                        if (parseInt(b.dataset.grade) === p.grade) { b.classList.add('selected'); selectedGrade = p.grade; }
                    });
                    state.bots = generateBotPlayers(p.grade);
                    updateStreak();
                    savePlayer();
                    if (window.location.hash && window.location.hash !== '#') {
                        navigateToHash(window.location.hash);
                    } else {
                        showDashboard();
                    }
                } else { showToast('Profile not found!', 'error'); }
            }
        });
    }

    // ===================== EXAM-BASED CHALLENGE CARDS =====================
    // Every card = a real exam. Kids pick which exam to prep for.
    function getChallengeCards(grade) {
        const isElem = grade <= 5;
        const isHighSchool = grade >= 9;
        const cards = {
            math: [
                // ── School Testing ──
                { cat: 'sba_math', diff: 'medium', emoji: '📊', name: 'SBA Math',
                  desc: isElem ? 'Smarter Balanced: concepts & procedures, problem solving, reasoning — WA state test' : 'Smarter Balanced: expressions, equations, functions, geometry & statistics — WA state test',
                  diffLabel: '⭐⭐ State Test', pts: '+10 pts each', tag: 'School' },
                { cat: 'fastbridge', diff: 'medium', emoji: '📋', name: 'FastBridge aMath',
                  desc: isElem ? 'Estimation, number sense, data & measurement — LWSD benchmark' : 'Data analysis, proportional reasoning & statistics — LWSD benchmark',
                  diffLabel: '⭐⭐ School Test', pts: '+10 pts each', tag: 'School' },
                { cat: 'highcap', diff: 'hard', emoji: '🎯', name: 'High Cap Screening',
                  desc: isElem ? 'Gifted program screening: reasoning, patterns & quantitative thinking' : 'Highly Capable program: abstract reasoning & advanced problem-solving',
                  diffLabel: '⭐⭐⭐ Gifted', pts: '+20 pts each', tag: 'School' },
                { cat: 'cogat', diff: 'hard', emoji: '🧩', name: 'CogAT',
                  desc: isElem ? 'Number analogies, number series, number puzzles & quantitative reasoning' : 'Verbal analogies, figure matrices, number series & quantitative comparisons',
                  diffLabel: '⭐⭐⭐ CogAT', pts: '+20 pts each', tag: 'School' },
                // ── Math Competitions (all grades) ──
                { cat: 'moems', diff: 'hard', emoji: '🏅', name: isElem ? 'MOEMS Div E' : 'MOEMS Div M',
                  desc: isElem ? 'Creative problem-solving, counting & pattern puzzles' : 'Number theory, combinatorics & multi-step logic',
                  diffLabel: isElem ? 'Div E' : 'Div M', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'noetic', diff: 'hard', emoji: '✨', name: 'Noetic Math',
                  desc: isElem ? 'Non-routine reasoning, work backwards & creative counting' : 'Advanced reasoning, optimization & algebraic patterns',
                  diffLabel: '⭐⭐⭐ Noetic', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'kangaroo', diff: 'hard', emoji: '🦘', name: 'Math Kangaroo',
                  desc: isElem ? 'Fun visual puzzles, logic & creative thinking' : 'Multi-step puzzles, spatial reasoning & clever tricks',
                  diffLabel: '⭐⭐⭐ Kangaroo', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'imc', diff: 'hard', emoji: '🌍', name: 'IMC',
                  desc: isElem ? 'International competition: logic, number puzzles & creative problem-solving' : 'International competition: number theory, combinatorics & algebra',
                  diffLabel: '⭐⭐⭐ IMC', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'olympiad', diff: 'hard', emoji: '🏆', name: 'AMC 8 Prep',
                  desc: isElem ? 'Pre-AMC: logic, patterns & problem-solving' : 'AMC 8 style: number theory, counting & geometry',
                  diffLabel: '⭐⭐⭐ AMC', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'amc8', diff: 'hard', emoji: '🥇', name: 'AMC 8',
                  desc: 'Official AMC 8: 25 problems, 40 minutes — number sense, counting, geometry & logic',
                  diffLabel: '⭐⭐⭐ AMC 8', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'cml', diff: 'medium', emoji: '📏', name: 'Continental Math League',
                  desc: isElem ? 'Speed math, mental calculation & multi-step problems' : 'Algebraic thinking, geometry & number theory',
                  diffLabel: '⭐⭐ CML', pts: '+15 pts each', tag: 'Competition' },
                { cat: 'math_league', diff: 'hard', emoji: '🧮', name: 'Math League',
                  desc: isElem ? 'Number sense, problem-solving & creative math' : 'Algebra, geometry, counting & number theory',
                  diffLabel: '⭐⭐⭐ Math League', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'math_challenge', diff: 'hard', emoji: '💪', name: 'Math Challenge',
                  desc: isElem ? 'RSM & Continental Math League: speed math, problem-solving & mental math' : 'RSM & CML: algebra, geometry & multi-step challenge problems',
                  diffLabel: '⭐⭐⭐ Challenge', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'math_is_cool', diff: 'hard', emoji: '❄️', name: 'Math is Cool',
                  desc: isElem ? 'Individual & team rounds: mental math, estimation & logic' : 'Individual, team & relay: algebra, geometry & problem-solving',
                  diffLabel: '⭐⭐⭐ Cool', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'singapore', diff: 'medium', emoji: '🇸🇬', name: 'Singapore Math',
                  desc: isElem ? 'Bar models, mental math & multi-step word problems' : 'Heuristic problem-solving & model drawing',
                  diffLabel: '⭐⭐ Singapore', pts: '+10 pts each', tag: 'Competition' },
                { cat: 'isee_math', diff: 'hard', emoji: '🏫', name: 'ISEE Math',
                  desc: isElem ? 'Quantitative reasoning & math achievement — private school entrance' : 'Quantitative comparisons, algebra & data analysis — private school entrance',
                  diffLabel: '⭐⭐⭐ ISEE', pts: '+20 pts each', tag: 'Entrance Exam' },
                { cat: 'ssat_math', diff: 'hard', emoji: '🏫', name: 'SSAT Math',
                  desc: isElem ? 'Number concepts, operations & word problems — independent school admission' : 'Algebra, geometry & estimation — independent school admission',
                  diffLabel: '⭐⭐⭐ SSAT', pts: '+20 pts each', tag: 'Entrance Exam' },
            ],
            english: [
                { cat: 'sba_ela', diff: 'medium', emoji: '📊', name: 'SBA ELA',
                  desc: isElem ? 'Smarter Balanced: reading comprehension, writing, language conventions — WA state test' : 'Smarter Balanced: literary & informational text, research, writing & language — WA state test',
                  diffLabel: '⭐⭐ State Test', pts: '+10 pts each', tag: 'School', cssClass: 'challenge-card-english' },
                { cat: 'fb_reading', diff: 'medium', emoji: '📖', name: 'FastBridge aReading',
                  desc: isElem ? 'Vocabulary, grammar, reading comprehension & spelling — LWSD benchmark' : 'Context clues, inference, text structure & grammar — LWSD benchmark',
                  diffLabel: '⭐⭐ School Test', pts: '+10 pts each', tag: 'School', cssClass: 'challenge-card-english' },
                { cat: 'spelling_bee', diff: 'medium', emoji: '🐝', name: 'Spelling Bee',
                  desc: isElem ? 'Scripps-style: commonly misspelled words & phonics patterns' : 'Scripps-style: challenging roots, Latin/Greek origins & homophones',
                  diffLabel: '⭐⭐ Spelling Bee', pts: '+10 pts each', tag: 'Competition', cssClass: 'challenge-card-english' },
                { cat: 'wordly_wise', diff: 'medium', emoji: '📖', name: 'Wordly Wise',
                  desc: isElem ? 'Vocabulary in context, synonyms, antonyms & word associations' : 'Advanced vocabulary, context clues, word roots & analogies',
                  diffLabel: '⭐⭐ Wordly Wise', pts: '+10 pts each', tag: 'School', cssClass: 'challenge-card-english' },
                { cat: 'isee_verbal', diff: 'hard', emoji: '🏫', name: 'ISEE Verbal',
                  desc: isElem ? 'Synonyms & sentence completion — private school entrance' : 'Vocabulary, reading comprehension & verbal reasoning — private school entrance',
                  diffLabel: '⭐⭐⭐ ISEE', pts: '+20 pts each', tag: 'Entrance Exam', cssClass: 'challenge-card-english' },
                { cat: 'ssat_verbal', diff: 'hard', emoji: '🏫', name: 'SSAT Verbal',
                  desc: isElem ? 'Synonyms & analogies — independent school admission' : 'Vocabulary, analogies & reading comprehension — independent school admission',
                  diffLabel: '⭐⭐⭐ SSAT', pts: '+20 pts each', tag: 'Entrance Exam', cssClass: 'challenge-card-english' },
            ]
        };

        // Middle school only: Mathcounts and AIME
        if (!isElem && !isHighSchool) {
            cards.math.splice(cards.math.length - 1, 0, // before Singapore
                { cat: 'mathcounts', diff: 'hard', emoji: '📐', name: 'Mathcounts',
                  desc: 'Sprint, Target & Team round style — algebra, geometry & probability',
                  diffLabel: '⭐⭐⭐ Mathcounts', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'aime', diff: 'hard', emoji: '🧠', name: 'AIME',
                  desc: 'Advanced: multi-step number theory, algebra, combinatorics & geometry',
                  diffLabel: '⭐⭐⭐ AIME', pts: '+25 pts each', tag: 'Competition' }
            );
        }

        // High school (grades 9-12): SAT, ACT, AP, AMC 10/12
        if (isHighSchool) {
            // Replace elementary/middle cards with high school ones
            cards.math = [
                { cat: 'sat_math', diff: 'hard', emoji: '📝', name: 'SAT Math',
                  desc: 'Algebra, advanced math, problem solving & data analysis — College Board style',
                  diffLabel: '⭐⭐⭐ SAT', pts: '+20 pts each', tag: 'College Prep' },
                { cat: 'psat', diff: 'medium', emoji: '📋', name: 'PSAT / NMSQT',
                  desc: 'National Merit prep: algebra, data analysis & advanced math',
                  diffLabel: '⭐⭐ PSAT', pts: '+15 pts each', tag: 'College Prep' },
                { cat: 'act_math', diff: 'hard', emoji: '📊', name: 'ACT Math',
                  desc: 'Pre-algebra through trigonometry — 60 questions in 60 minutes style',
                  diffLabel: '⭐⭐⭐ ACT', pts: '+20 pts each', tag: 'College Prep' },
                { cat: 'amc10', diff: 'hard', emoji: '🏅', name: 'AMC 10',
                  desc: 'Algebra, counting, probability, number theory & geometry — competition math',
                  diffLabel: '⭐⭐⭐ AMC', pts: '+25 pts each', tag: 'Competition' },
                { cat: 'amc12', diff: 'hard', emoji: '🏆', name: 'AMC 12',
                  desc: 'Trigonometry, complex numbers, logarithms & advanced combinatorics',
                  diffLabel: '⭐⭐⭐ AMC', pts: '+25 pts each', tag: 'Competition' },
                { cat: 'aime', diff: 'hard', emoji: '🧠', name: 'AIME',
                  desc: 'Proof-level: number theory, advanced algebra, geometry & combinatorics',
                  diffLabel: '⭐⭐⭐ AIME', pts: '+25 pts each', tag: 'Competition' },
                { cat: 'ap_calc', diff: 'hard', emoji: '📈', name: 'AP Calculus',
                  desc: 'Limits, derivatives, integrals & applications — AB/BC prep',
                  diffLabel: '⭐⭐⭐ AP', pts: '+25 pts each', tag: 'AP Exam' },
                { cat: 'ap_stats', diff: 'hard', emoji: '📉', name: 'AP Statistics',
                  desc: 'Probability, distributions, inference, regression & experimental design',
                  diffLabel: '⭐⭐⭐ AP', pts: '+25 pts each', tag: 'AP Exam' },
                { cat: 'isee_math', diff: 'hard', emoji: '🏫', name: 'ISEE Math',
                  desc: 'Quantitative comparisons, algebra & data analysis — private school entrance',
                  diffLabel: '⭐⭐⭐ ISEE', pts: '+20 pts each', tag: 'Entrance Exam' },
                { cat: 'ssat_math', diff: 'hard', emoji: '🏫', name: 'SSAT Math',
                  desc: 'Algebra, geometry & estimation — independent school admission',
                  diffLabel: '⭐⭐⭐ SSAT', pts: '+20 pts each', tag: 'Entrance Exam' },
            ];
            cards.english = [
                { cat: 'sat_english', diff: 'hard', emoji: '📖', name: 'SAT Reading & Writing',
                  desc: 'Evidence-based reading, grammar rules, rhetoric & synthesis',
                  diffLabel: '⭐⭐⭐ SAT', pts: '+20 pts each', tag: 'College Prep', cssClass: 'challenge-card-english' },
                { cat: 'act_english', diff: 'hard', emoji: '📝', name: 'ACT English',
                  desc: 'Usage/mechanics, rhetorical skills, grammar & punctuation — 75 questions in 45 min style',
                  diffLabel: '⭐⭐⭐ ACT', pts: '+20 pts each', tag: 'College Prep', cssClass: 'challenge-card-english' },
                { cat: 'ap_english', diff: 'hard', emoji: '📚', name: 'AP English',
                  desc: 'AP Language & Literature: rhetoric, argumentation, literary analysis & close reading',
                  diffLabel: '⭐⭐⭐ AP', pts: '+25 pts each', tag: 'AP Exam', cssClass: 'challenge-card-english' },
                { cat: 'isee_verbal', diff: 'hard', emoji: '🏫', name: 'ISEE Verbal',
                  desc: 'Vocabulary, reading comprehension & verbal reasoning — private school entrance',
                  diffLabel: '⭐⭐⭐ ISEE', pts: '+20 pts each', tag: 'Entrance Exam', cssClass: 'challenge-card-english' },
                { cat: 'ssat_verbal', diff: 'hard', emoji: '🏫', name: 'SSAT Verbal',
                  desc: 'Vocabulary, analogies & reading comprehension — independent school admission',
                  diffLabel: '⭐⭐⭐ SSAT', pts: '+20 pts each', tag: 'Entrance Exam', cssClass: 'challenge-card-english' },
                { cat: 'spelling_bee', diff: 'hard', emoji: '🐝', name: 'Spelling Bee',
                  desc: 'Advanced: Latin/Greek roots, etymology & championship-level words',
                  diffLabel: '⭐⭐⭐ Spelling Bee', pts: '+20 pts each', tag: 'Competition', cssClass: 'challenge-card-english' },
            ];
        }

        // Practice Blitz — at the end of math
        cards.math.push(
            { cat: 'mixed', diff: 'mixed', emoji: '🎲', name: 'Practice Blitz',
              desc: 'Mixed questions from all exams — timed challenge!',
              diffLabel: '⚡ Timed', pts: '+5-25 pts each', special: true }
        );

        return cards;
    }

    function renderChallengeCards(grade) {
        const cards = getChallengeCards(grade);

        function buildCardHTML(c) {
            const tagClass = c.tag === 'Competition' ? 'comp-tag' : c.tag === 'School' ? 'fb-tag' : 'comp-tag';
            const tagHTML = c.tag ? `<span class="${tagClass}">${c.tag}</span>` : '';
            const specialClass = c.special ? ' challenge-card-special' : '';
            const cssExtra = c.cssClass ? ` ${c.cssClass}` : '';
            return `
                <div class="challenge-card${specialClass}${cssExtra}" data-category="${c.cat}" data-difficulty="${c.diff}">
                    ${tagHTML}
                    <div class="challenge-emoji">${c.emoji}</div>
                    <h3>${c.name}</h3>
                    <p>${c.desc}</p>
                    <div class="challenge-meta">
                        <span class="difficulty ${c.diff}">${c.diffLabel}</span>
                        <span class="points-badge">${c.pts}</span>
                    </div>
                </div>`;
        }

        const mathGrid = $('#math-challenge-grid');
        const engGrid = $('#english-challenge-grid');
        if (mathGrid) mathGrid.innerHTML = cards.math.map(buildCardHTML).join('');
        if (engGrid) engGrid.innerHTML = cards.english.map(buildCardHTML).join('');
    }

    // ===================== DASHBOARD =====================
    function showDashboard() {
        showScreen('dashboard');
        const p = state.player;
        const levelInfo = getLevelFromPoints(p.totalPointsEarned || 0);
        const tier = getTier(levelInfo.level);

        // Top nav
        $('#nav-player-name').textContent = p.name;
        $('#nav-grade-badge').textContent = `Grade ${p.grade}`;
        $('#nav-points').textContent = p.points.toLocaleString();

        // User avatar
        const navAvatar = $('#nav-user-avatar');
        if (navAvatar && state.authUser && state.authUser.photoURL) {
            navAvatar.src = state.authUser.photoURL;
            navAvatar.style.display = 'block';
        } else if (navAvatar) {
            navAvatar.style.display = 'none';
        }

        // Level Banner
        $('#dash-rank-badge').textContent = tier.emoji;
        $('#dash-level').textContent = levelInfo.level;
        $('#dash-rank-title').textContent = tier.name;
        $('#dash-xp').textContent = levelInfo.currentPoints;
        $('#dash-xp-next').textContent = levelInfo.nextLevelPoints;
        $('#dash-xp-bar').style.width = Math.min(100, (levelInfo.currentPoints / levelInfo.nextLevelPoints) * 100) + '%';

        // Multiplier based on streak
        const streakMult = p.streak >= 7 ? '×2' : p.streak >= 3 ? '×1.5' : '×1';
        $('#dash-multiplier').textContent = streakMult;

        // Stats
        $('#dash-points').textContent = p.points.toLocaleString();
        $('#dash-streak').textContent = p.streak;
        $('#dash-solved').textContent = p.totalCorrect;
        const accuracy = p.totalAttempted ? Math.round((p.totalCorrect / p.totalAttempted) * 100) : 0;
        $('#dash-accuracy').textContent = accuracy + '%';

        // Daily challenge
        renderDailyChallenge();

        // Smart recommendation based on category stats
        const recEl = $('#smart-rec');
        if (recEl) {
            const cs = p.categoryStats || {};
            const played = Object.entries(cs).filter(([, s]) => s.attempted >= 3);
            if (played.length > 0) {
                // Find weakest category
                let weakCat = null, weakAcc = 101;
                // Find strongest
                let strongCat = null, strongAcc = -1;
                // Find never-played categories
                const allCats = ['fastbridge','moems','noetic','kangaroo','olympiad','imc','math_challenge','math_is_cool','highcap','cogat','fb_reading','spelling_bee'];
                const unplayed = allCats.filter(c => !cs[c] || cs[c].attempted === 0);

                played.forEach(([cat, s]) => {
                    const acc = Math.round((s.correct / s.attempted) * 100);
                    if (acc < weakAcc) { weakAcc = acc; weakCat = cat; }
                    if (acc > strongAcc) { strongAcc = acc; strongCat = cat; }
                });

                let recHTML = '';
                if (weakCat && weakAcc < 65) {
                    recHTML = `<span class="rec-emoji">🎯</span> <strong>Suggested:</strong> Practice <strong>${CATEGORY_NAMES[weakCat] || weakCat}</strong> — you're at ${weakAcc}% accuracy. <button class="rec-btn" data-rec-cat="${weakCat}">Let's go!</button>`;
                } else if (unplayed.length > 0) {
                    const tryCat = unplayed[Math.floor(Math.random() * unplayed.length)];
                    recHTML = `<span class="rec-emoji">✨</span> <strong>Try something new:</strong> ${CATEGORY_NAMES[tryCat] || tryCat}! <button class="rec-btn" data-rec-cat="${tryCat}">Start</button>`;
                } else if (strongCat && strongAcc >= 85) {
                    recHTML = `<span class="rec-emoji">🚀</span> You're rocking ${CATEGORY_NAMES[strongCat] || strongCat} at ${strongAcc}%! Try <strong>Hard</strong> mode. <button class="rec-btn" data-rec-cat="${strongCat}" data-rec-diff="hard">Challenge me!</button>`;
                }
                if (recHTML) {
                    recEl.innerHTML = recHTML;
                    recEl.style.display = 'block';
                    const recBtn = recEl.querySelector('.rec-btn');
                    if (recBtn) {
                        recBtn.onclick = () => startQuiz(recBtn.dataset.recCat, recBtn.dataset.recDiff || 'medium');
                    }
                } else {
                    recEl.style.display = 'none';
                }
            } else {
                // New user / reset user — suggest a random exam to try
                const allCats = ['fastbridge','moems','noetic','kangaroo','olympiad','imc','math_challenge','math_is_cool','highcap','cogat','fb_reading','spelling_bee'];
                const tryCat = allCats[Math.floor(Math.random() * allCats.length)];
                recEl.innerHTML = `<span class="rec-emoji">🌟</span> <strong>Get started:</strong> Try <strong>${CATEGORY_NAMES[tryCat] || tryCat}</strong> — a great way to warm up! <button class="rec-btn" data-rec-cat="${tryCat}">Let's go!</button>`;
                recEl.style.display = 'block';
                const recBtn = recEl.querySelector('.rec-btn');
                if (recBtn) {
                    recBtn.onclick = () => startQuiz(recBtn.dataset.recCat, recBtn.dataset.recDiff || 'medium');
                }
            }
        }

        // Render grade-appropriate challenge cards
        renderChallengeCards(p.grade);

        // Subject tab switcher (Math ↔ English)
        window.switchSubject = function(subject) {
            $$('.subject-tab').forEach(t => t.classList.toggle('active', t.dataset.subject === subject));
            $$('.subject-panel').forEach(p => p.classList.toggle('active', p.dataset.subject === subject));
        };

        // Challenge card clicks
        $$('.challenge-card').forEach(card => {
            card.onclick = () => {
                const category = card.dataset.category;
                const difficulty = card.dataset.difficulty;
                startQuiz(category, difficulty);
            };
        });

        // Bottom buttons
        $('#btn-leaderboard').onclick = showLeaderboard;
        $('#btn-rewards').onclick = showRewardsStore;
        $('#btn-achievements').onclick = showAchievements;
        $('#btn-history').onclick = showProgress;

        // Challenge a Friend
        const challengeCard = $('#challenge-friend-card');
        if (challengeCard) challengeCard.onclick = showChallengeScreen;

        // Edit profile
        $('#btn-edit-profile').onclick = openEditProfile;

        // Feedback button
        const feedbackBtn = $('#btn-feedback');
        if (feedbackBtn) feedbackBtn.onclick = openFeedback;

        // Show cloud sync status
        showSyncStatus(state.useFirebase && state.authUser ? 'synced' : 'offline');
        const syncVisible = (state.useFirebase && state.authUser) ? 'inline-block' : 'none';
        const syncBtn = $('#btn-sync-now');
        if (syncBtn) {
            syncBtn.style.display = syncVisible;
            syncBtn.onclick = () => forceCloudSync(false);
        }
        // Sync button on all shared screens too
        document.querySelectorAll('.shared-sync-btn').forEach(btn => {
            btn.style.display = syncVisible;
            btn.onclick = () => forceCloudSync(false);
        });

        // Wire up shared sign-out buttons on all screens
        document.querySelectorAll('.shared-signout-btn').forEach(btn => {
            btn.onclick = () => $('#btn-logout').click();
        });

        // Show admin tab for admin users
        const adminTab = $('#btn-admin');
        if (adminTab) {
            const isAdmin = state.authUser && ADMIN_EMAILS.includes((state.authUser.email || '').toLowerCase());
            adminTab.style.display = isAdmin ? 'flex' : 'none';
            if (isAdmin) {
                adminTab.onclick = showAdmin;
            }
        }

        // Start background AI question generation if API key is set
        if (typeof GeminiQuestionEngine !== 'undefined' && GeminiQuestionEngine.hasApiKey()) {
            GeminiQuestionEngine.startBackgroundGeneration(state.player.grade);
        }

        $('#btn-logout').onclick = async () => {
            savePlayer();
            state.player = null;
            localStorage.removeItem('mathchamp_last_player');
            if (state.useFirebase && typeof FirebaseAuthHelper !== 'undefined') {
                await FirebaseAuthHelper.signOut();
            }
            state.authUser = null;
            // Reset welcome screen UI
            const authSection = $('#auth-section');
            const authUserInfo = $('#auth-user-info');
            if (authSection) authSection.style.display = 'block';
            if (authUserInfo) authUserInfo.style.display = 'none';
            const googleBtn = $('#btn-google-signin');
            if (googleBtn) { googleBtn.disabled = false; }
            history.pushState(null, '', window.location.pathname);
            showScreen('welcome');
        };
    }

    // ===================== EDIT PROFILE =====================
    function openEditProfile() {
        const modal = $('#edit-profile-modal');
        const nameInput = $('#edit-profile-name');
        const gradeGrid = $('#edit-grade-grid');
        const saveBtn = $('#btn-save-profile');
        const cancelBtn = $('#btn-cancel-profile');

        // Pre-fill current values
        nameInput.value = state.player.name || '';

        // Build grade buttons
        gradeGrid.innerHTML = '';
        let selectedGrade = state.player.grade;
        for (let g = 1; g <= 12; g++) {
            const btn = document.createElement('button');
            btn.className = 'grade-btn' + (g === selectedGrade ? ' selected' : '');
            btn.textContent = g;
            btn.dataset.grade = g;
            btn.type = 'button';
            btn.onclick = () => {
                gradeGrid.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedGrade = g;
            };
            gradeGrid.appendChild(btn);
        }

        modal.style.display = 'flex';

        saveBtn.onclick = () => {
            const newName = nameInput.value.trim();
            if (!newName) { showToast('Please enter a name!', 'error'); return; }
            if (!selectedGrade) { showToast('Please select a grade!', 'error'); return; }

            const oldName = state.player.name;
            state.player.name = newName;
            state.player.grade = selectedGrade;
            state.bots = generateBotPlayers(selectedGrade);

            // Update localStorage key if name changed
            if (oldName && oldName.toLowerCase() !== newName.toLowerCase()) {
                const all = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
                delete all[oldName.toLowerCase()];
                all[newName.toLowerCase()] = state.player;
                localStorage.setItem('mathchamp_players', JSON.stringify(all));
                localStorage.setItem('mathchamp_last_player', newName);
            }

            savePlayer();
            modal.style.display = 'none';
            showToast('Profile updated! \u2705', 'success');
            showDashboard();
        };

        cancelBtn.onclick = () => {
            modal.style.display = 'none';
        };

        // Close on overlay click
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    // ===================== FEEDBACK =====================
    function openFeedback() {
        const modal = $('#feedback-modal');
        if (!modal) return;

        const typeSelect = $('#feedback-type');
        const textArea = $('#feedback-text');
        const charCount = $('#feedback-char');
        const sendBtn = $('#btn-send-feedback');
        const cancelBtn = $('#btn-cancel-feedback');

        // Reset form
        if (typeSelect) typeSelect.value = 'bug';
        if (textArea) { textArea.value = ''; }
        if (charCount) charCount.textContent = '0';

        // Character counter
        if (textArea) {
            textArea.oninput = () => {
                if (charCount) charCount.textContent = textArea.value.length;
            };
        }

        modal.style.display = 'flex';

        sendBtn.onclick = async () => {
            const type = typeSelect ? typeSelect.value : 'other';
            const text = textArea ? textArea.value.trim() : '';

            if (!text) {
                showToast('Please enter some feedback details!', 'error');
                return;
            }

            sendBtn.disabled = true;
            sendBtn.textContent = '⏳ Sending...';

            const feedbackData = {
                type,
                text,
                playerName: state.player ? state.player.name : 'Unknown',
                grade: state.player ? state.player.grade : 0,
                email: state.authUser ? state.authUser.email : 'anonymous',
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                url: window.location.href,
            };

            let saved = false;

            // Try saving to Firestore
            if (typeof firebaseDb !== 'undefined' && firebaseDb) {
                try {
                    await firebaseDb.collection('feedback').add({
                        ...feedbackData,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    saved = true;
                } catch (e) {
                    console.warn('Firestore feedback save failed:', e);
                }
            }

            // Fallback: save to localStorage
            if (!saved) {
                try {
                    const existing = JSON.parse(localStorage.getItem('levelupkids_feedback') || '[]');
                    existing.push(feedbackData);
                    localStorage.setItem('levelupkids_feedback', JSON.stringify(existing));
                    saved = true;
                } catch (e) { /* ignore */ }
            }

            sendBtn.disabled = false;
            sendBtn.textContent = '📤 Send Feedback';

            if (saved) {
                showToast('Thank you for your feedback! 💛', 'success');
                modal.style.display = 'none';
            } else {
                showToast('Could not send feedback. Please try again.', 'error');
            }
        };

        cancelBtn.onclick = () => {
            modal.style.display = 'none';
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    // ===================== DAILY CHALLENGE =====================
    function getDailyCategory() {
        const dayOfWeek = new Date().getDay();
        // Rotate through real exams so kids get exposure to different test formats
        const cats = ['fastbridge', 'moems', 'noetic', 'kangaroo', 'olympiad', 'cogat', 'fb_reading'];
        return cats[dayOfWeek];
    }

    function renderDailyChallenge() {
        const p = state.player;
        const today = new Date().toDateString();
        const cat = getDailyCategory();
        const catName = CATEGORY_NAMES[cat] || cat;

        // Check if already completed today
        const dailyDone = p.dailyChallengeToday === today;
        const completed = dailyDone ? DAILY_CHALLENGE_COUNT : 0;

        $('#daily-challenge-desc').textContent = dailyDone
            ? `✅ Today's ${catName} challenge complete! Come back tomorrow!`
            : `Today's challenge: ${catName} — Solve ${DAILY_CHALLENGE_COUNT} problems for 2× bonus!`;

        const pct = (completed / DAILY_CHALLENGE_COUNT) * 100;
        $('#daily-progress-fill').style.width = pct + '%';
        $('#daily-progress-text').textContent = `${completed} / ${DAILY_CHALLENGE_COUNT} completed`;

        const btn = $('#btn-daily-challenge');
        btn.disabled = dailyDone;
        btn.textContent = dailyDone ? '✅ Completed Today!' : '⚡ Start Daily Challenge';
        btn.onclick = dailyDone ? null : () => startQuiz(cat, 'mixed', true);

        // Bonus badge
        const streakMult = p.streak >= 7 ? 3 : p.streak >= 3 ? 2 : 2;
        $('#daily-bonus-badge').textContent = `+${streakMult}× Bonus`;

        // Streak calendar (last 7 days)
        const calContainer = $('#daily-streak-calendar');
        calContainer.innerHTML = '';
        for (let i = 6; i >= 0; i--) {
            const d = new Date(Date.now() - i * 86400000);
            const dateStr = d.toDateString();
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const el = document.createElement('div');
            el.className = 'cal-day';
            if (i === 0) el.classList.add('today');
            if ((p.dailyStreakDates || []).includes(dateStr)) el.classList.add('completed');
            el.textContent = dayNames[d.getDay()];
            calContainer.appendChild(el);
        }
    }

    // ===================== QUIZ ENGINE =====================
    async function startQuiz(category, difficulty, isDaily = false) {
        // Show loading state
        showScreen('quiz');
        $('#quiz-category-label').textContent = CATEGORY_NAMES[category] || category;
        $('#quiz-progress').textContent = 'Loading...';
        $('#question-text').textContent = '⏳ Loading questions...';
        $('#answers-grid').innerHTML = '';

        const count = isDaily ? DAILY_CHALLENGE_COUNT : QUESTIONS_PER_QUIZ;

        // Helper: race a promise against a timeout
        function withTimeout(promise, ms) {
            return Promise.race([
                promise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
            ]);
        }

        // Collect seen question hashes for dedup
        const seenHashes = new Set(state.player.seenQuestions || []);

        let questions;
        try {
            // Use QuestionAPI — 3s timeout so quiz doesn't hang on slow external APIs
            if (typeof QuestionAPI !== 'undefined' && QuestionAPI.getQuestions) {
                questions = await withTimeout(QuestionAPI.getQuestions(state.player.grade, category, count, seenHashes), 3000);
            } else {
                questions = getQuestions(state.player.grade, category, count);
            }
        } catch (e) {
            console.warn('Question fetch error or timeout, using local fallback:', e);
            questions = typeof QuestionAPI !== 'undefined' && QuestionAPI.getLocalQuestions
                ? QuestionAPI.getLocalQuestions(state.player.grade, category, count)
                : (typeof getLocalQuestions === 'function'
                    ? getLocalQuestions(state.player.grade, category, count)
                    : getQuestions(state.player.grade, category, count));
        }

        // Mix in AI-generated questions (non-blocking, 2s timeout)
        // All students can READ from Firestore — no API key needed
        if (typeof GeminiQuestionEngine !== 'undefined') {
            try {
                const aiCount = Math.ceil(count * 0.4); // 40% AI questions
                const aiQuestions = await withTimeout(
                    GeminiQuestionEngine.getUniqueQuestions(state.player.grade, category, aiCount), 2000
                );
                if (aiQuestions && aiQuestions.length > 0) {
                    // Filter out seen AI questions too
                    const hashFn = (typeof QuestionAPI !== 'undefined' && QuestionAPI.hashQ) ? QuestionAPI.hashQ : null;
                    const freshAI = hashFn
                        ? aiQuestions.filter(q => !seenHashes.has(hashFn(q.q)))
                        : aiQuestions;
                    const aiToUse = freshAI.length > 0 ? freshAI : aiQuestions;
                    // Replace some regular questions with AI ones to maintain total count
                    const regularSlice = (questions || []).slice(0, count - aiToUse.length);
                    questions = [...regularSlice, ...aiToUse];
                    // Shuffle so AI questions are mixed in randomly
                    for (let i = questions.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [questions[i], questions[j]] = [questions[j], questions[i]];
                    }
                    console.log(`🤖 Mixed ${aiQuestions.length} AI questions into quiz`);
                }
            } catch (e) {
                console.warn('AI question mixing skipped (timeout or error):', e.message);
            }
        }

        // Last resort: if no questions, fall back to mixed/general pool
        if (!questions || questions.length === 0) {
            console.warn(`⚠️ No questions for ${category}, falling back to mixed pool`);
            try {
                if (typeof QuestionAPI !== 'undefined' && QuestionAPI.getLocalQuestions) {
                    questions = QuestionAPI.getLocalQuestions(state.player.grade, 'mixed', count);
                } else if (typeof getLocalQuestions === 'function') {
                    questions = getLocalQuestions(state.player.grade, 'mixed', count);
                }
            } catch (e) { /* ignore */ }
        }

        if (!questions || questions.length === 0) {
            showToast('No questions available for this category yet!', 'info');
            showDashboard();
            return;
        }

        state.quiz = {
            category, difficulty, questions, isDaily,
            currentIndex: 0, score: 0, pointsEarned: 0,
            results: [], hintsUsed: 0,
            hintUsedThisQuestion: false, answered: false,
            startTime: Date.now(), timedMode: category === 'mixed' && !isDaily,
            timeLeft: TIMED_SECONDS, combo: 0, maxCombo: 0
        };

        $('#quiz-live-points').textContent = '0';

        if (state.quiz.timedMode) {
            $('#timer-container').style.display = 'block';
            startTimer();
        } else {
            $('#timer-container').style.display = 'none';
        }

        showQuestion();
    }

    function showQuestion() {
        const quiz = state.quiz;
        const q = quiz.questions[quiz.currentIndex];

        quiz.answered = false;
        quiz.hintUsedThisQuestion = false;

        $('#question-number').textContent = `Question ${quiz.currentIndex + 1}`;
        $('#quiz-progress').textContent = `${quiz.currentIndex + 1} / ${quiz.questions.length}`;
        $('#question-text').innerHTML = q.q;

        // Difficulty badge
        const diff = q.difficulty || 'medium';
        const diffEmoji = diff === 'easy' ? '⭐' : diff === 'medium' ? '⭐⭐' : '⭐⭐⭐';
        const diffLabel = diff === 'easy' ? 'Warm Up' : diff === 'medium' ? 'Challenging' : 'Extreme';
        const pts = POINTS_MAP[diff] || 10;
        $('#question-difficulty').innerHTML = `<span class="difficulty ${diff}">${diffEmoji} ${diffLabel}</span> <span class="points-badge">+${pts} pts</span>`;

        // Source badge
        const sourceBadge = $('#source-badge');
        if (sourceBadge && q.source) {
            const isAI = q._aiGenerated || q.source === '🤖 AI Generated';
            const sourceIcons = {
                'AMC 8 / AOPS': '🏆', 'AMC 8 2024': '🏆', 'AOPS': '🏆',
                'Math Kangaroo': '🦘', 'RSM': '🧮', 'Primefactor': '🔢',
                'Singapore Math': '🇸🇬', 'MOEMS': '🏅', 'Mathcounts': '📐', 'IMC': '🌍',
                'Noetic Math': '✨', 'CogAT Prep': '🧩', 'CogAT': '🧩', 'HCP Prep': '🎯',
                'FastBridge Prep': '📋', 'Spelling Bee': '🐝',
                'OpenTDB': '📚', 'Generated': '🧮', 'Competition Style': '🏆',
                'Olympiad Style': '🥇', 'Word Problem': '📖', 'NumbersAPI': '🔢',
                '🤖 AI Generated': '🤖'
            };
            const icon = sourceIcons[q.source] || '📚';
            sourceBadge.innerHTML = `${icon} ${q.source}`;
            sourceBadge.style.display = 'inline-block';
            sourceBadge.className = isAI ? 'source-badge ai-source' : 'source-badge';
        } else if (sourceBadge) {
            sourceBadge.style.display = 'none';
            sourceBadge.className = 'source-badge';
        }

        // Image (supports both URL images and inline SVG for CogAT visual questions)
        const imgEl = $('#question-image');
        if (imgEl) {
            if (q.imageSVG) {
                imgEl.innerHTML = q.imageSVG;
                imgEl.style.display = 'block';
                imgEl.style.textAlign = 'center';
                imgEl.style.margin = '12px auto';
            } else if (q.image) {
                imgEl.innerHTML = `<img src="${q.image}" alt="Question image">`;
                imgEl.style.display = 'block';
            } else {
                imgEl.innerHTML = '';
                imgEl.style.display = 'none';
            }
        }

        // Combo display
        if (quiz.combo >= 3) {
            showComboDisplay(quiz.combo);
        }

        // Answers
        const grid = $('#answers-grid');
        grid.innerHTML = '';
        const labels = ['A', 'B', 'C', 'D'];
        const isVisual = q.isVisual;
        if (isVisual) grid.classList.add('visual-answers');
        else grid.classList.remove('visual-answers');
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn' + (isVisual ? ' answer-btn-visual' : '');
            btn.innerHTML = `<span class="answer-label">${labels[i]}</span>${opt}`;
            btn.addEventListener('click', () => handleAnswer(i));
            grid.appendChild(btn);
        });

        // Reset hint / feedback / next
        $('#hint-area').style.display = 'none';
        $('#feedback-area').style.display = 'none';
        $('#btn-next').style.display = 'none';
        $('#btn-hint').style.display = 'inline-flex';
        $('#btn-hint').disabled = false;
    }

    function showComboDisplay(combo) {
        // Create or update combo display
        let el = $('#combo-display');
        if (!el) {
            el = document.createElement('div');
            el.id = 'combo-display';
            el.className = 'combo-display';
            document.body.appendChild(el);
        }
        const mult = getComboMultiplier(combo);
        el.innerHTML = `
            <div class="combo-count">${combo}🔥</div>
            <div class="combo-label">COMBO!</div>
            <div class="combo-multiplier">×${mult} Points</div>
        `;
        el.classList.add('active');
        setTimeout(() => el.classList.remove('active'), 2000);
    }

    function handleAnswer(selected) {
        const quiz = state.quiz;
        if (quiz.answered) return;
        quiz.answered = true;

        const q = quiz.questions[quiz.currentIndex];
        const diff = q.difficulty || 'medium';
        const correct = selected === q.answer;
        const basePoints = POINTS_MAP[diff] || 10;
        let pointsEarned = 0;

        // Mark buttons
        const buttons = $$('.answer-btn');
        buttons.forEach((btn, i) => {
            btn.classList.add('disabled');
            if (i === q.answer) btn.classList.add('show-correct');
            if (i === selected && !correct) btn.classList.add('wrong');
            if (i === selected && correct) btn.classList.add('correct');
        });

        if (correct) {
            // Combo
            quiz.combo++;
            quiz.maxCombo = Math.max(quiz.maxCombo, quiz.combo);

            // Points with multipliers
            const comboMult = getComboMultiplier(quiz.combo);
            const streakMult = state.player.streak >= 7 ? 1.25 : state.player.streak >= 3 ? 1.1 : 1;
            const dailyMult = quiz.isDaily ? 2 : 1;

            pointsEarned = Math.round(basePoints * comboMult * streakMult * dailyMult);
            if (quiz.hintUsedThisQuestion) pointsEarned = Math.max(1, pointsEarned - HINT_PENALTY);

            quiz.score++;
            quiz.pointsEarned += pointsEarned;
            state.player.totalCorrect++;
            if (diff === 'hard') state.player.hardCorrect = (state.player.hardCorrect || 0) + 1;
        } else {
            // Negative marking: deduct points for wrong answer
            pointsEarned = WRONG_PENALTY[diff] || -1;
            quiz.pointsEarned += pointsEarned;
            // Reset combo
            quiz.combo = 0;
        }

        state.player.totalAttempted++;

        quiz.results.push({
            question: q.q, correct, selected: q.options[selected],
            answer: q.options[q.answer], pointsEarned, difficulty: diff,
            hint: q.hint || '', explanation: q.explanation || '', options: q.options, correctIndex: q.answer
        });

        showFeedback(correct, q, pointsEarned, quiz.combo);
        $('#quiz-live-points').textContent = quiz.pointsEarned;
        $('#btn-hint').style.display = 'none';
        $('#btn-next').style.display = 'inline-flex';

        if (quiz.currentIndex >= quiz.questions.length - 1) {
            $('#btn-next').textContent = '🏁 See Results';
        } else {
            $('#btn-next').textContent = 'Next Question ➡️';
        }
    }

    function showFeedback(correct, question, points, combo) {
        const area = $('#feedback-area');
        const box = $('#feedback-box');

        area.style.display = 'block';
        box.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');

        if (correct) {
            const phrases = ['🎉 Brilliant!', '🌟 Amazing!', '💪 Nailed it!', '🔥 You\'re on fire!', '✨ Fantastic!', '🧠 Big brain move!'];
            const comboText = combo >= 3 ? ` (${combo}× Combo! 🔥)` : '';
            $('#feedback-icon').textContent = '✅';
            $('#feedback-message').textContent = phrases[Math.floor(Math.random() * phrases.length)] + comboText;
            $('#feedback-points').textContent = `+${points} points!`;
            $('#feedback-points').style.color = '#2E7D32';
        } else {
            const phrases = ['😮 Not quite!', '🤔 Close one!', '💡 Good try!', '📚 Keep learning!'];
            $('#feedback-icon').textContent = '❌';
            $('#feedback-message').textContent = phrases[Math.floor(Math.random() * phrases.length)];
            $('#feedback-points').textContent = `${points} point${points === -1 ? '' : 's'} ⚠️`;
            $('#feedback-points').style.color = '#C62828';
        }

        $('#feedback-explanation').textContent = question.explanation || '';
    }

    // ===================== HINTS =====================
    function initHintButton() {
        $('#btn-hint').addEventListener('click', () => {
            const quiz = state.quiz;
            if (!quiz || quiz.answered || quiz.hintUsedThisQuestion) return;
            const q = quiz.questions[quiz.currentIndex];
            if (!q.hint) { showToast('No hint available.', 'info'); return; }
            quiz.hintUsedThisQuestion = true;
            quiz.hintsUsed++;
            $('#hint-text').textContent = q.hint;
            $('#hint-area').style.display = 'block';
            $('#btn-hint').disabled = true;
        });
    }

    function initNextButton() {
        $('#btn-next').addEventListener('click', () => {
            const quiz = state.quiz;
            if (!quiz) return;
            quiz.currentIndex++;
            if (quiz.currentIndex >= quiz.questions.length) {
                finishQuiz();
            } else {
                showQuestion();
            }
        });
    }

    function initQuitButton() {
        $('#btn-quit-quiz').addEventListener('click', () => {
            if (confirm('Quit? Your progress for this quiz will be lost.')) {
                stopTimer();
                showDashboard();
            }
        });
    }

    // ===================== TIMER =====================
    function startTimer() {
        const quiz = state.quiz;
        quiz.timeLeft = TIMED_SECONDS;
        updateTimerDisplay();
        state.timerInterval = setInterval(() => {
            quiz.timeLeft--;
            updateTimerDisplay();
            if (quiz.timeLeft <= 0) { stopTimer(); finishQuiz(); }
        }, 1000);
    }

    function updateTimerDisplay() {
        const quiz = state.quiz;
        const pct = (quiz.timeLeft / TIMED_SECONDS) * 100;
        $('#timer-bar').style.width = pct + '%';
        $('#timer-text').textContent = quiz.timeLeft + 's';
        if (quiz.timeLeft <= 10) $('#timer-bar').style.background = 'var(--secondary)';
        else if (quiz.timeLeft <= 30) $('#timer-bar').style.background = 'var(--accent-yellow)';
    }

    function stopTimer() {
        if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
    }

    // ===================== FINISH QUIZ =====================
    function finishQuiz() {
        stopTimer();
        const quiz = state.quiz;
        const p = state.player;

        // Calculate total points: quiz points + bonuses
        let bonusPoints = BONUS_QUIZ_COMPLETE; // Completion bonus
        if (quiz.score === quiz.questions.length) {
            bonusPoints += BONUS_PERFECT;
            p.perfectScores = (p.perfectScores || 0) + 1;
        }
        if (quiz.isDaily) {
            const today = new Date().toDateString();
            p.dailyChallengeToday = today;
            p.dailyChallengesCompleted = (p.dailyChallengesCompleted || 0) + 1;
            if (!p.dailyStreakDates) p.dailyStreakDates = [];
            if (!p.dailyStreakDates.includes(today)) p.dailyStreakDates.push(today);
            if (p.dailyStreakDates.length > 30) p.dailyStreakDates = p.dailyStreakDates.slice(-30);
            bonusPoints += BONUS_DAILY;
        }

        const totalEarned = quiz.pointsEarned + bonusPoints;
        p.points = Math.max(0, p.points + totalEarned);
        p.totalPointsEarned = Math.max(0, (p.totalPointsEarned || 0) + totalEarned);
        p.totalQuizzes++;

        checkLevelUp();

        // No hints?
        if (quiz.hintsUsed === 0 && quiz.questions.length > 0) {
            p.quizzesWithNoHints = (p.quizzesWithNoHints || 0) + 1;
        }

        // Combo tracking
        p.maxCombo = Math.max(p.maxCombo || 0, quiz.maxCombo);

        // Category tracking
        if (!p.categoriesPlayed) p.categoriesPlayed = {};
        p.categoriesPlayed[quiz.category] = (p.categoriesPlayed[quiz.category] || 0) + 1;

        if (!p.categoryStats) p.categoryStats = {};
        if (!p.categoryStats[quiz.category]) p.categoryStats[quiz.category] = { correct: 0, attempted: 0 };
        p.categoryStats[quiz.category].correct += quiz.score;
        p.categoryStats[quiz.category].attempted += quiz.results.length;

        // Olympiad high scores
        if (quiz.category === 'olympiad') {
            const acc = quiz.results.length > 0 ? quiz.score / quiz.results.length : 0;
            if (acc >= 0.8) {
                p.categoryHighScores = p.categoryHighScores || {};
                p.categoryHighScores.olympiad = (p.categoryHighScores.olympiad || 0) + 1;
            }
        }

        // Blitz
        if (quiz.category === 'mixed') {
            const acc = quiz.results.length > 0 ? quiz.score / quiz.results.length : 0;
            if (acc >= 0.8) p.blitzHighAccuracy = (p.blitzHighAccuracy || 0) + 1;
        }

        // Session history
        if (!p.sessions) p.sessions = [];
        p.sessions.unshift({
            date: new Date().toISOString(), category: quiz.category,
            correct: quiz.score, total: quiz.results.length,
            points: totalEarned, combo: quiz.maxCombo
        });
        if (p.sessions.length > 50) p.sessions = p.sessions.slice(0, 50);

        // Track seen questions for dedup (rolling window of 300)
        if (!p.seenQuestions) p.seenQuestions = [];
        const hashFn = (typeof QuestionAPI !== 'undefined' && QuestionAPI.hashQ) ? QuestionAPI.hashQ : null;
        if (hashFn) {
            quiz.questions.forEach(q => {
                const h = hashFn(q.q);
                if (!p.seenQuestions.includes(h)) p.seenQuestions.push(h);
            });
            // Keep only last 300 to avoid localStorage bloat
            if (p.seenQuestions.length > 300) p.seenQuestions = p.seenQuestions.slice(-300);
        }

        checkAchievements();
        savePlayer();

        // If this was a challenge quiz, show challenge results instead
        if (quiz.isChallenge && state.pendingChallenge) {
            showChallengeResults(quiz);
        } else {
            showResults(quiz, totalEarned, bonusPoints);
        }
    }

    function showResults(quiz, totalEarned, bonusPoints) {
        showScreen('results');
        const total = quiz.results.length;
        const correct = quiz.score;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

        let emoji, title;
        if (accuracy === 100) { emoji = '🏆'; title = 'PERFECT SCORE!'; }
        else if (accuracy >= 80) { emoji = '🌟'; title = 'Excellent Work!'; }
        else if (accuracy >= 60) { emoji = '👏'; title = 'Good Job!'; }
        else if (accuracy >= 40) { emoji = '💪'; title = 'Keep Practicing!'; }
        else { emoji = '📚'; title = 'Never Give Up!'; }

        $('#results-emoji').textContent = emoji;
        $('#results-title').textContent = title;
        $('#results-subtitle').textContent = `${CATEGORY_NAMES[quiz.category]} • Grade ${state.player.grade}${quiz.isDaily ? ' • Daily Challenge' : ''}`;
        $('#result-correct').textContent = correct;
        $('#result-total').textContent = total;
        $('#result-points-earned').textContent = totalEarned >= 0 ? `+${totalEarned}` : `${totalEarned}`;
        $('#result-accuracy').textContent = accuracy + '%';

        // Breakdown
        const breakdown = $('#results-breakdown');
        breakdown.innerHTML = `
            <h3 style="margin-bottom:12px;font-family:var(--font-display);">Question Breakdown</h3>
            <div style="text-align:center;margin-bottom:12px;color:var(--primary);font-weight:700;">
                ${totalEarned >= 0 ? '+' : ''}${totalEarned} points (${quiz.pointsEarned >= 0 ? '+' : ''}${quiz.pointsEarned} from questions + ${bonusPoints} bonus)${quiz.maxCombo >= 3 ? ` | Max Combo: ${quiz.maxCombo}🔥` : ''}
            </div>`;

        const wrongOnes = [];
        quiz.results.forEach((r, i) => {
            const item = document.createElement('div');
            item.className = `result-item ${r.correct ? 'result-correct' : 'result-wrong'}`;
            if (!r.correct) {
                // Clickable wrong answers — tap to expand review
                item.style.cursor = 'pointer';
                item.innerHTML = `
                    <span class="result-item-status">❌</span>
                    <span class="result-item-text">Q${i + 1}: ${truncate(r.question, 60)}</span>
                    <span class="result-item-pts" style="color:var(--primary);font-size:0.75rem;">tap to review</span>
                `;
                const detail = document.createElement('div');
                detail.className = 'result-review-detail';
                detail.style.cssText = 'display:none;padding:10px 12px;margin:4px 0 8px;border-radius:10px;background:rgba(108,99,255,0.08);font-size:0.88rem;line-height:1.5;';
                detail.innerHTML = `
                    <div style="margin-bottom:6px;"><strong>Q:</strong> ${r.question}</div>
                    <div style="color:#C62828;margin-bottom:4px;">Your answer: <strong>${r.selected}</strong></div>
                    <div style="color:#2E7D32;margin-bottom:6px;">Correct answer: <strong>${r.answer}</strong></div>
                    ${r.hint ? `<div style="margin-bottom:4px;">💡 <em>${r.hint}</em></div>` : ''}
                    ${r.explanation ? `<div>📖 ${r.explanation}</div>` : ''}
                `;
                item.onclick = () => { detail.style.display = detail.style.display === 'none' ? 'block' : 'none'; };
                breakdown.appendChild(item);
                breakdown.appendChild(detail);
                wrongOnes.push(r);
            } else {
                item.innerHTML = `
                    <span class="result-item-status">✅</span>
                    <span class="result-item-text">Q${i + 1}: ${truncate(r.question, 60)}</span>
                    <span class="result-item-pts">+${r.pointsEarned} pts</span>
                `;
                breakdown.appendChild(item);
            }
        });

        // Smart "Next Step" recommendation
        const recBox = document.createElement('div');
        recBox.style.cssText = 'margin-top:18px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,rgba(108,99,255,0.1),rgba(46,213,115,0.1));text-align:center;';
        const catStats = (state.player.categoryStats || {})[quiz.category] || { correct: 0, attempted: 0 };
        const catAcc = catStats.attempted > 0 ? Math.round((catStats.correct / catStats.attempted) * 100) : 0;

        let recText = '', recAction = null;
        if (accuracy >= 90 && quiz.difficulty !== 'hard') {
            recText = `🚀 You crushed it at ${accuracy}%! Ready for a harder challenge?`;
            const nextDiff = quiz.difficulty === 'easy' ? 'medium' : 'hard';
            recAction = { label: `Try ${nextDiff.charAt(0).toUpperCase() + nextDiff.slice(1)}`, cat: quiz.category, diff: nextDiff };
        } else if (accuracy < 50) {
            // Find their strongest category to boost confidence
            const cs = state.player.categoryStats || {};
            let bestCat = null, bestAcc = 0;
            for (const [c, s] of Object.entries(cs)) {
                if (c !== quiz.category && s.attempted >= 5) {
                    const a = Math.round((s.correct / s.attempted) * 100);
                    if (a > bestAcc) { bestAcc = a; bestCat = c; }
                }
            }
            if (bestCat) {
                recText = `💪 Tough round! Try ${CATEGORY_NAMES[bestCat] || bestCat} where you're at ${bestAcc}% — build momentum!`;
                recAction = { label: `Play ${CATEGORY_NAMES[bestCat] || bestCat}`, cat: bestCat, diff: 'medium' };
            } else {
                recText = `💪 Keep going! Practice makes perfect. Try again?`;
            }
        } else if (wrongOnes.length > 0) {
            recText = `📝 ${wrongOnes.length} question${wrongOnes.length > 1 ? 's' : ''} to review — tap the ❌ items above to study the explanations!`;
        } else {
            recText = `⭐ Perfect score! Your ${CATEGORY_NAMES[quiz.category] || quiz.category} accuracy is now ${catAcc}% overall.`;
        }
        recBox.innerHTML = `<div style="font-weight:600;margin-bottom:6px;">${recText}</div>`;
        if (recAction) {
            const btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.style.cssText = 'margin-top:8px;padding:8px 20px;font-size:0.9rem;';
            btn.textContent = recAction.label;
            btn.onclick = () => startQuiz(recAction.cat, recAction.diff);
            recBox.appendChild(btn);
        }
        breakdown.appendChild(recBox);

        // Tiered celebration
        if (accuracy === 100) {
            launchConfetti(300); // massive
            setTimeout(() => launchConfetti(200), 600); // second wave
            showCelebrationBanner('🏆 PERFECT SCORE! 🏆', '#FFD700');
        } else if (accuracy >= 80) {
            launchConfetti(150);
            showCelebrationBanner('🌟 Excellent! 🌟', '#2ED573');
        } else if (accuracy >= 60) {
            launchConfetti(80);
        }

        $('#btn-play-again').onclick = () => startQuiz(quiz.category, quiz.difficulty, quiz.isDaily);
        $('#btn-back-dashboard').onclick = showDashboard;
    }

    function truncate(str, len) { return str.length > len ? str.slice(0, len) + '...' : str; }

    // ===================== CHALLENGE A FRIEND =====================
    function showChallengeScreen() {
        showScreen('challenge');
        $('#btn-back-from-challenge').onclick = showDashboard;
        $('#btn-create-challenge').onclick = createChallenge;
        $('#btn-join-challenge').onclick = joinChallenge;
        $('#challenge-code-input').value = '';
        $('#challenge-join-status').style.display = 'none';

        // Load my challenges
        loadMyChallenges();

        // Check URL for challenge code
        const params = new URLSearchParams(window.location.search);
        const urlCode = params.get('challenge');
        if (urlCode) {
            $('#challenge-code-input').value = urlCode;
            joinChallenge();
        }
    }

    async function loadMyChallenges() {
        const container = $('#my-challenges-list');
        if (!container) return;
        container.innerHTML = '<span style="color:var(--text-dim);">Loading...</span>';

        const uid = state.authUser?.uid;
        if (!uid) {
            container.innerHTML = '<span style="color:var(--text-dim);">Sign in to see your challenges.</span>';
            return;
        }

        const challenges = await FirestoreDB.getMyChallenges(uid, 10);
        if (!challenges || challenges.length === 0) {
            container.innerHTML = '<span style="color:var(--text-dim);">No challenges yet. Create one above! 🎯</span>';
            return;
        }

        container.innerHTML = '';
        challenges.forEach(c => {
            const card = document.createElement('div');
            card.style.cssText = 'padding:14px;border-radius:12px;background:rgba(108,99,255,0.06);margin-bottom:10px;border:1px solid var(--border);';

            const catName = CATEGORY_NAMES[c.category] || c.category;
            const myScore = c.creatorResult;
            const theirScore = c.challengerResult;
            const hasResult = !!theirScore;

            let statusHTML;
            if (hasResult) {
                const iWin = myScore && myScore.score > theirScore.score;
                const tie = myScore && myScore.score === theirScore.score;
                const icon = iWin ? '🏆' : tie ? '🤝' : '😤';
                const label = iWin ? 'You won!' : tie ? 'Tie!' : `${theirScore.name || 'Friend'} won!`;
                statusHTML = `
                    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;">
                        <span style="font-size:1.2rem;">${icon}</span>
                        <span style="font-weight:700;color:${iWin ? '#2ED573' : tie ? 'var(--primary)' : '#FF6B6B'};">${label}</span>
                        <span style="margin-left:auto;font-size:0.85rem;color:var(--text-dim);">
                            You: ${myScore ? myScore.score + '/' + myScore.total : '?'} vs ${theirScore.name || 'Friend'}: ${theirScore.score}/${theirScore.total}
                        </span>
                    </div>`;
            } else {
                statusHTML = `
                    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;">
                        <span style="font-size:1rem;">⏳</span>
                        <span style="color:var(--text-dim);">Waiting for challenger...</span>
                        <span style="margin-left:auto;font-size:0.8rem;font-weight:700;color:var(--primary);cursor:pointer;" data-code="${c.code}" class="copy-challenge-code">📋 ${c.code}</span>
                    </div>`;
            }

            card.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <div>
                        <span style="font-weight:700;">${catName}</span>
                        <span style="color:var(--text-dim);font-size:0.8rem;margin-left:8px;">Grade ${c.grade} • ${c.questionCount || '?'} Qs</span>
                    </div>
                    <span style="font-size:0.75rem;color:var(--text-dim);">${c.code}</span>
                </div>
                ${statusHTML}
            `;
            container.appendChild(card);
        });

        // Wire up copy buttons for pending challenges
        container.querySelectorAll('.copy-challenge-code').forEach(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                const code = el.dataset.code;
                navigator.clipboard.writeText(code).then(() => {
                    el.textContent = '✅ Copied!';
                    setTimeout(() => { el.textContent = `📋 ${code}`; }, 1500);
                }).catch(() => showToast('Code: ' + code, 'info'));
            };
        });
    }

    async function createChallenge() {
        const category = $('#challenge-category').value || 'mixed';
        const btn = $('#btn-create-challenge');
        btn.disabled = true;
        btn.textContent = '⏳ Generating questions...';

        try {
            const grade = state.player.grade;
            const count = 10;

            // Get questions for the challenge
            let questions;
            if (typeof QuestionAPI !== 'undefined' && QuestionAPI.getQuestions) {
                questions = await QuestionAPI.getQuestions(grade, category, count);
            }
            if (!questions || questions.length === 0) {
                showToast('Could not generate questions. Try again!', 'error');
                btn.disabled = false;
                btn.textContent = '⚔️ Create Challenge & Play First!';
                return;
            }

            // Strip non-serializable fields for Firestore
            const cleanQs = questions.map(q => ({
                q: q.q, options: q.options, answer: q.answer,
                hint: q.hint || '', explanation: q.explanation || '',
                difficulty: q.difficulty || 'medium'
            }));

            // Save challenge to Firestore
            const code = await FirestoreDB.createChallenge({
                creatorUid: state.authUser?.uid || 'anon',
                creatorName: state.player.name,
                grade, category, questions: cleanQs,
                questionCount: cleanQs.length
            });

            if (!code) {
                showToast('Could not create challenge. Check your connection!', 'error');
                btn.disabled = false;
                btn.textContent = '⚔️ Create Challenge & Play First!';
                return;
            }

            // Store the code so we can show results after quiz
            state.pendingChallenge = { code, isCreator: true };

            // Start the quiz with these exact questions
            showScreen('quiz');
            $('#quiz-category-label').textContent = `⚔️ Challenge: ${CATEGORY_NAMES[category] || category}`;
            $('#quiz-progress').textContent = `1 / ${cleanQs.length}`;
            $('#question-text').textContent = '';
            $('#answers-grid').innerHTML = '';

            state.quiz = {
                category, difficulty: 'medium', questions: cleanQs, isDaily: false,
                isChallenge: true, challengeCode: code,
                currentIndex: 0, score: 0, pointsEarned: 0,
                results: [], hintsUsed: 0,
                hintUsedThisQuestion: false, answered: false,
                startTime: Date.now(), timedMode: false,
                timeLeft: 0, combo: 0, maxCombo: 0
            };

            $('#timer-container').style.display = 'none';
            $('#quiz-live-points').textContent = '0';
            showQuestion();
        } catch (e) {
            console.error('Create challenge error:', e);
            showToast('Something went wrong!', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '⚔️ Create Challenge & Play First!';
        }
    }

    async function joinChallenge() {
        const code = ($('#challenge-code-input').value || '').trim().toUpperCase();
        if (code.length < 4) {
            showToast('Please enter a valid challenge code', 'error');
            return;
        }

        const status = $('#challenge-join-status');
        status.style.display = 'block';
        status.innerHTML = '⏳ Loading challenge...';
        status.style.color = 'var(--text-dim)';

        try {
            const challenge = await FirestoreDB.getChallenge(code);
            if (!challenge) {
                status.innerHTML = '❌ Challenge not found. Check the code and try again.';
                status.style.color = '#C62828';
                return;
            }

            // Check if already completed by someone else
            if (challenge.challengerResult) {
                status.innerHTML = '⚠️ This challenge has already been played by someone!';
                status.style.color = '#F57F17';
                return;
            }

            // Check if creator is trying to play their own challenge
            if (challenge.creatorUid === (state.authUser?.uid || 'anon') && challenge.creatorUid !== 'anon') {
                status.innerHTML = '😅 You can\'t play your own challenge! Share the code with a friend.';
                status.style.color = '#F57F17';
                return;
            }

            // Store challenge context
            state.pendingChallenge = { code, isCreator: false, creatorName: challenge.creatorName, creatorResult: challenge.creatorResult };

            // Start quiz with the exact same questions
            const questions = challenge.questions;
            showScreen('quiz');
            $('#quiz-category-label').textContent = `⚔️ vs ${challenge.creatorName}`;
            $('#quiz-progress').textContent = `1 / ${questions.length}`;

            state.quiz = {
                category: challenge.category, difficulty: 'medium', questions, isDaily: false,
                isChallenge: true, challengeCode: code,
                currentIndex: 0, score: 0, pointsEarned: 0,
                results: [], hintsUsed: 0,
                hintUsedThisQuestion: false, answered: false,
                startTime: Date.now(), timedMode: false,
                timeLeft: 0, combo: 0, maxCombo: 0
            };

            $('#timer-container').style.display = 'none';
            $('#quiz-live-points').textContent = '0';
            showQuestion();
        } catch (e) {
            console.error('Join challenge error:', e);
            status.innerHTML = '❌ Error loading challenge. Try again.';
            status.style.color = '#C62828';
        }
    }

    function showChallengeResults(quiz) {
        const pc = state.pendingChallenge;
        if (!pc) { showDashboard(); return; }

        const myResult = {
            name: state.player.name,
            score: quiz.score,
            total: quiz.results.length,
            accuracy: quiz.results.length > 0 ? Math.round((quiz.score / quiz.results.length) * 100) : 0,
            time: Math.round((Date.now() - quiz.startTime) / 1000)
        };

        showScreen('challenge-results');

        if (pc.isCreator) {
            // Creator just finished — save their result, show share screen
            FirestoreDB.submitChallengeResult(pc.code, null); // Reserve the doc
            // Update creator result
            if (typeof firebaseDb !== 'undefined') {
                try {
                    firebaseDb.collection('challenges').doc(pc.code).update({ creatorResult: myResult });
                } catch (e) { /* ok */ }
            }

            $('#challenge-result-emoji').textContent = '🎯';
            $('#challenge-result-title').textContent = 'Challenge Created!';
            $('#challenge-result-subtitle').textContent = `You scored ${myResult.score}/${myResult.total} (${myResult.accuracy}%) — now share the code!`;

            const comparison = $('#challenge-result-comparison');
            comparison.innerHTML = `
                <div style="text-align:center;padding:24px;background:var(--card-bg);border-radius:16px;box-shadow:var(--card-shadow);">
                    <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:8px;">Your Challenge Code</div>
                    <div id="challenge-code-display" style="font-size:2.5rem;font-weight:900;letter-spacing:8px;color:var(--primary);font-family:var(--font-display);margin-bottom:16px;">${pc.code}</div>
                    <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:16px;">Share this code with a friend — they'll play the same questions and you'll see who wins!</p>
                    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                        <button id="btn-copy-code" class="btn-primary" style="padding:10px 20px;">📋 Copy Code</button>
                        <button id="btn-share-link" class="btn-secondary" style="padding:10px 20px;">🔗 Share Link</button>
                    </div>
                </div>
            `;

            const shareSection = $('#challenge-share-section');
            shareSection.innerHTML = '';

            setTimeout(() => {
                const copyBtn = $('#btn-copy-code');
                const shareBtn = $('#btn-share-link');
                if (copyBtn) copyBtn.onclick = () => {
                    navigator.clipboard.writeText(pc.code).then(() => {
                        copyBtn.textContent = '✅ Copied!';
                        setTimeout(() => { copyBtn.textContent = '📋 Copy Code'; }, 2000);
                    }).catch(() => showToast('Copy the code: ' + pc.code, 'info'));
                };
                if (shareBtn) shareBtn.onclick = () => {
                    const url = `${window.location.origin}${window.location.pathname}?challenge=${pc.code}`;
                    if (navigator.share) {
                        navigator.share({ title: 'LevelUpKids Challenge!', text: `I challenge you! Can you beat my score? 🏆`, url });
                    } else {
                        navigator.clipboard.writeText(url).then(() => {
                            shareBtn.textContent = '✅ Link Copied!';
                            setTimeout(() => { shareBtn.textContent = '🔗 Share Link'; }, 2000);
                        }).catch(() => showToast('Share this link: ' + url, 'info'));
                    }
                };
            }, 100);

        } else {
            // Challenger finished — show comparison
            const creator = pc.creatorResult || { name: pc.creatorName || 'Friend', score: 0, total: myResult.total, accuracy: 0 };
            const iWin = myResult.score > creator.score;
            const tie = myResult.score === creator.score;

            // Submit result to Firestore
            FirestoreDB.submitChallengeResult(pc.code, myResult);

            $('#challenge-result-emoji').textContent = iWin ? '🏆' : tie ? '🤝' : '💪';
            $('#challenge-result-title').textContent = iWin ? 'You Win!' : tie ? 'It\'s a Tie!' : `${creator.name} Wins!`;
            $('#challenge-result-subtitle').textContent = tie
                ? 'Great minds think alike!'
                : iWin ? 'Amazing job beating the challenge!' : 'So close! Try creating your own challenge!';

            if (iWin || tie) launchConfetti(200);

            const comparison = $('#challenge-result-comparison');
            comparison.innerHTML = `
                <div style="display:flex;gap:12px;justify-content:center;align-items:stretch;">
                    <div style="flex:1;max-width:200px;background:${!iWin && !tie ? 'linear-gradient(135deg,rgba(108,99,255,0.15),rgba(108,99,255,0.05))' : 'var(--card-bg)'};border-radius:16px;padding:20px;text-align:center;box-shadow:var(--card-shadow);${!iWin && !tie ? 'border:2px solid var(--primary);' : ''}">
                        <div style="font-size:1.5rem;margin-bottom:4px;">${!iWin && !tie ? '🏆' : '👤'}</div>
                        <div style="font-weight:700;font-size:0.95rem;margin-bottom:10px;">${creator.name}</div>
                        <div style="font-size:2rem;font-weight:900;color:var(--primary);">${creator.score}/${creator.total}</div>
                        <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px;">${creator.accuracy}%</div>
                    </div>
                    <div style="display:flex;align-items:center;font-size:1.5rem;font-weight:900;color:var(--text-dim);">VS</div>
                    <div style="flex:1;max-width:200px;background:${iWin ? 'linear-gradient(135deg,rgba(46,213,115,0.15),rgba(46,213,115,0.05))' : 'var(--card-bg)'};border-radius:16px;padding:20px;text-align:center;box-shadow:var(--card-shadow);${iWin ? 'border:2px solid #2ED573;' : ''}">
                        <div style="font-size:1.5rem;margin-bottom:4px;">${iWin ? '🏆' : '💪'}</div>
                        <div style="font-weight:700;font-size:0.95rem;margin-bottom:10px;">You</div>
                        <div style="font-size:2rem;font-weight:900;color:${iWin ? '#2ED573' : 'var(--primary)'};">${myResult.score}/${myResult.total}</div>
                        <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px;">${myResult.accuracy}%</div>
                    </div>
                </div>
            `;

            $('#challenge-share-section').innerHTML = '';
        }

        $('#btn-challenge-home').onclick = showDashboard;
        state.pendingChallenge = null;
    }

    // ===================== LEADERBOARD =====================
    function showLeaderboard() {
        showScreen('leaderboard');
        const p = state.player;
        const levelInfo = getLevelFromPoints(p.totalPointsEarned || 0);
        const tier = getTier(levelInfo.level);

        $('#lb-points').textContent = p.points.toLocaleString();
        $('#lb-your-name').textContent = p.name;
        $('#lb-your-tier').textContent = `${tier.emoji} ${tier.name}`;
        $('#lb-your-xp').textContent = `${p.points.toLocaleString()} pts`;
        $('#lb-your-level').textContent = `Level ${levelInfo.level}`;

        // Stats
        const acc = p.totalAttempted ? Math.round((p.totalCorrect / p.totalAttempted) * 100) : 0;
        $('#lb-stat-quizzes').textContent = p.totalQuizzes;
        $('#lb-stat-accuracy').textContent = acc + '%';
        $('#lb-stat-streak').textContent = p.maxStreak;
        $('#lb-stat-level').textContent = levelInfo.level;

        // Tab clicks
        $$('.lb-tab').forEach(tab => {
            tab.onclick = () => {
                $$('.lb-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.currentLBTab = tab.dataset.lbTab;
                renderLeaderboardList();
            };
        });

        renderLeaderboardList();
        $('#btn-back-from-leaderboard').onclick = showDashboard;
    }

    async function renderLeaderboardList() {
        const p = state.player;
        const tab = state.currentLBTab;
        const list = $('#lb-list');
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary)">Loading...</div>';

        // Try to get real players from Firestore
        let realPlayers = [];
        if (state.useFirebase && typeof FirestoreDB !== 'undefined') {
            try {
                if (tab === 'grade') {
                    realPlayers = await FirestoreDB.getLeaderboard(50, p.grade);
                } else if (tab === 'weekly') {
                    realPlayers = await FirestoreDB.getWeeklyLeaderboard(50);
                } else {
                    realPlayers = await FirestoreDB.getLeaderboard(50);
                }
            } catch (e) {
                console.warn('Firestore leaderboard fetch failed:', e);
            }
        }

        // Build the combined list
        let allPlayers;
        const myUid = state.authUser?.uid;

        if (realPlayers.length > 0) {
            // Use real players from Firestore, mark current user
            allPlayers = realPlayers.map(pl => ({
                ...pl,
                pts: pl.points || pl.totalPointsEarned || pl.totalXP || 0,
                level: getLevelFromPoints(pl.totalPointsEarned || pl.totalXP || 0).level,
                isYou: pl.uid === myUid,
                isBot: false
            }));
            // Ensure current player is in the list
            const meInList = allPlayers.find(pl => pl.isYou);
            if (!meInList) {
                const levelInfo = getLevelFromPoints(p.totalPointsEarned || 0);
                allPlayers.push({
                    name: p.name, grade: p.grade, pts: p.points,
                    level: levelInfo.level, totalQuizzes: p.totalQuizzes,
                    totalCorrect: p.totalCorrect, totalAttempted: p.totalAttempted,
                    maxStreak: p.maxStreak, isBot: false, isYou: true,
                    photoURL: state.authUser?.photoURL || null
                });
            } else {
                meInList.pts = p.points; // Use local spendable balance
            }
        } else {
            // Fallback to bots
            allPlayers = [...(state.bots || [])].map(b => ({ ...b, pts: b.totalPointsEarned || 0 }));
            const levelInfo = getLevelFromPoints(p.totalPointsEarned || 0);
            allPlayers.push({
                name: p.name, grade: p.grade, pts: p.points,
                level: levelInfo.level, totalQuizzes: p.totalQuizzes,
                totalCorrect: p.totalCorrect, totalAttempted: p.totalAttempted,
                maxStreak: p.maxStreak, isBot: false, isYou: true
            });

            if (tab === 'grade') {
                allPlayers = allPlayers.filter(pl => pl.grade === p.grade);
            } else if (tab === 'weekly') {
                allPlayers = allPlayers.map(pl => ({
                    ...pl,
                    weeklyPts: pl.isYou ? Math.floor(p.points * 0.15) : Math.floor((pl.pts || 0) * (0.05 + Math.random() * 0.2))
                }));
            }
        }

        // Sort
        if (tab === 'weekly' && !realPlayers.length) {
            allPlayers.sort((a, b) => (b.weeklyPts || b.pts || 0) - (a.weeklyPts || a.pts || 0));
        } else {
            allPlayers.sort((a, b) => (b.pts || 0) - (a.pts || 0));
        }

        // Find player rank
        const playerIdx = allPlayers.findIndex(pl => pl.isYou);
        const rank = playerIdx + 1;
        $('#lb-your-rank').textContent = `#${rank}`;

        // Render list
        list.innerHTML = '';

        if (allPlayers.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary)">No players yet. Be the first!</div>';
            return;
        }

        allPlayers.slice(0, 25).forEach((pl, i) => {
            const plLevel = pl.level || getLevelFromPoints(pl.pts || 0).level;
            const plTier = getTier(plLevel);
            const topClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';
            const youClass = pl.isYou ? 'is-you' : '';
            const ptsVal = tab === 'weekly' && pl.weeklyPts != null ? pl.weeklyPts : (pl.pts || 0);
            const ptsDisplay = `${ptsVal.toLocaleString()} pts`;

            // Avatar: use photo if available, otherwise tier emoji
            const avatarContent = pl.photoURL
                ? `<img src="${pl.photoURL}" alt="">`
                : plTier.emoji;

            const row = document.createElement('div');
            row.className = `lb-row ${topClass} ${youClass}`;
            row.innerHTML = `
                <div class="lb-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</div>
                <div class="lb-avatar">${avatarContent}</div>
                <div class="lb-player-info">
                    <div class="lb-player-name">${pl.name}${pl.isYou ? ' (You)' : ''}${!pl.isBot && !pl.isYou ? '<span class="lb-online-dot"></span>' : ''}</div>
                    <div class="lb-player-meta">Level ${plLevel} · Grade ${pl.grade || '?'}</div>
                </div>
                <div class="lb-score">
                    <div class="lb-score-value">${ptsDisplay}</div>
                    <div class="lb-score-label">${plTier.name}</div>
                </div>
            `;
            list.appendChild(row);
        });
    }

    // ===================== REWARDS STORE =====================
    function showRewardsStore() {
        showScreen('rewards');
        const p = state.player;

        $('#rewards-points').textContent = p.points.toLocaleString();
        $('#rewards-balance').textContent = p.points.toLocaleString();

        renderRewardSection('rewards-activities', REWARDS.activities);
        renderRewardSection('rewards-privileges', REWARDS.privileges);
        renderRewardSection('rewards-toys', REWARDS.toys);
        renderRewardSection('rewards-legendary', REWARDS.legendary);
        renderRedemptionHistory();

        $('#btn-back-from-rewards').onclick = showDashboard;
    }

    function renderRewardSection(containerId, items) {
        const container = $(`#${containerId}`);
        if (!container) return;
        container.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = `reward-card ${item.tier === 'legendary' ? 'legendary' : ''}`;
            const canAfford = state.player.points >= item.cost;
            const tierClass = `tier-${item.tier || 'common'}`;

            card.innerHTML = `
                <div class="reward-tier-badge ${tierClass}">${(item.tier || 'common').toUpperCase()}</div>
                <div class="reward-emoji">${item.emoji}</div>
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="reward-cost">🪙 ${item.cost.toLocaleString()} pts</div>
                <button class="btn-redeem" ${canAfford ? '' : 'disabled'}>
                    ${canAfford ? '🎁 Redeem' : '🔒 Need ' + (item.cost - state.player.points).toLocaleString() + ' more'}
                </button>
            `;

            const btn = card.querySelector('.btn-redeem');
            if (canAfford) btn.addEventListener('click', () => showRedeemConfirm(item));
            container.appendChild(card);
        });
    }

    function showRedeemConfirm(item) {
        const overlay = $('#modal-overlay');
        overlay.style.display = 'flex';
        $('#modal-icon').textContent = item.emoji;
        $('#modal-title').textContent = 'Redeem Reward?';
        $('#modal-message').textContent = `Spend ${item.cost.toLocaleString()} points to get "${item.name}"?`;
        $('#modal-cancel').onclick = () => { overlay.style.display = 'none'; };
        $('#modal-confirm').onclick = () => { overlay.style.display = 'none'; redeemReward(item); };
    }

    function redeemReward(item) {
        const p = state.player;
        if (p.points < item.cost) { showToast('Not enough points!', 'error'); return; }
        p.points -= item.cost;
        p.totalRedemptions = (p.totalRedemptions || 0) + 1;
        if (!p.redemptions) p.redemptions = [];
        p.redemptions.unshift({ date: new Date().toISOString(), item: item.name, emoji: item.emoji, cost: item.cost });
        checkAchievements();
        savePlayer();
        showToast(`🎉 You redeemed "${item.name}"! Show this to your parents!`, 'success');
        launchConfetti();
        showRewardsStore();
    }

    function renderRedemptionHistory() {
        const container = $('#redemption-history');
        const redemptions = state.player.redemptions || [];
        if (redemptions.length === 0) {
            container.innerHTML = `<div class="empty-state"><div class="empty-state-emoji">🛍️</div><p>No redemptions yet. Solve problems to earn points!</p></div>`;
            return;
        }
        container.innerHTML = '';
        redemptions.slice(0, 10).forEach(r => {
            const item = document.createElement('div');
            item.className = 'redemption-item';
            const date = new Date(r.date).toLocaleDateString();
            item.innerHTML = `
                <div class="redemption-item-left"><span>${r.emoji}</span><span>${r.item}</span></div>
                <span class="redemption-date">${date}</span>
                <span class="redemption-cost">-${r.cost} pts</span>
            `;
            container.appendChild(item);
        });
    }

    // ===================== ACHIEVEMENTS =====================
    function showAchievements() {
        showScreen('achievements');
        const p = state.player;
        $('#ach-points').textContent = p.points.toLocaleString();
        const grid = $('#achievements-grid');
        grid.innerHTML = '';

        ACHIEVEMENTS.forEach(ach => {
            const unlocked = p.achievements && p.achievements.includes(ach.id);
            const card = document.createElement('div');
            card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
            card.innerHTML = `
                <div class="achievement-emoji">${unlocked ? ach.emoji : '🔒'}</div>
                <h4>${ach.name}</h4>
                <p>${ach.desc}</p>
                <div class="achievement-status ${unlocked ? 'earned' : 'locked-status'}">
                    ${unlocked ? '✅ Earned!' : '🔒 Locked'}
                </div>
            `;
            grid.appendChild(card);
        });

        $('#btn-back-from-achievements').onclick = showDashboard;
    }

    function checkAchievements() {
        const p = state.player;
        if (!p.achievements) p.achievements = [];
        let newUnlocks = 0;
        ACHIEVEMENTS.forEach(ach => {
            if (!p.achievements.includes(ach.id) && ach.check(p)) {
                p.achievements.push(ach.id);
                newUnlocks++;
                showToast(`🏅 Achievement Unlocked: ${ach.name}!`, 'success');
            }
        });
        if (newUnlocks > 0) savePlayer();
    }

    // ===================== PROGRESS =====================
    function showProgress() {
        showScreen('progress');
        const p = state.player;
        $('#prog-points').textContent = p.points.toLocaleString();

        // Category bars — show ALL categories the student has played, grouped by subject
        const barsContainer = $('#category-bars');
        barsContainer.innerHTML = '';
        const cs = p.categoryStats || {};
        const played = Object.keys(cs).filter(c => cs[c].attempted > 0);

        if (played.length === 0) {
            barsContainer.innerHTML = '<div style="text-align:center;padding:16px;color:var(--text-secondary);">No quizzes taken yet — start a challenge!</div>';
        } else {
            // Sort: weakest first so they stand out
            const sorted = played.map(cat => {
                const s = cs[cat];
                return { cat, correct: s.correct, attempted: s.attempted, pct: Math.round((s.correct / s.attempted) * 100) };
            }).sort((a, b) => a.pct - b.pct);

            // Weak-area callout
            const weakest = sorted[0];
            if (weakest.pct < 70 && weakest.attempted >= 3) {
                const callout = document.createElement('div');
                callout.style.cssText = 'padding:12px 14px;margin-bottom:14px;border-radius:12px;background:linear-gradient(135deg,rgba(255,107,107,0.12),rgba(255,165,2,0.12));cursor:pointer;';
                callout.innerHTML = `
                    <div style="font-weight:700;margin-bottom:4px;">🎯 Focus Area: ${CATEGORY_NAMES[weakest.cat] || weakest.cat}</div>
                    <div style="font-size:0.88rem;color:var(--text-secondary);">Accuracy: ${weakest.pct}% (${weakest.correct}/${weakest.attempted}) — practice to improve!</div>
                `;
                callout.onclick = () => startQuiz(weakest.cat, 'medium');
                barsContainer.appendChild(callout);
            }

            sorted.forEach(({ cat, pct, correct, attempted }) => {
                const name = CATEGORY_NAMES[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
                const barColor = pct >= 80 ? '#2ED573' : pct >= 60 ? '#FFA502' : '#FF6B6B';
                const row = document.createElement('div');
                row.className = 'bar-row';
                row.innerHTML = `
                    <span class="bar-label" style="min-width:130px;font-size:0.85rem;">${name}</span>
                    <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${barColor};">${pct}%</div></div>
                    <span style="font-size:0.75rem;color:var(--text-secondary);min-width:45px;text-align:right;">${correct}/${attempted}</span>
                `;
                barsContainer.appendChild(row);
            });
        }

        // Session history
        const sessContainer = $('#session-history');
        const sessions = p.sessions || [];
        if (sessions.length === 0) {
            sessContainer.innerHTML = `<div class="empty-state"><div class="empty-state-emoji">📊</div><p>No sessions yet. Start a challenge!</p></div>`;
        } else {
            sessContainer.innerHTML = '';
            const catEmojis = { fastbridge: '📋', moems: '🏅', noetic: '✨', olympiad: '🏆', kangaroo: '🦘',
                mathcounts: '📐', singapore: '🇸🇬', highcap: '🎯', cogat: '🧩', imc: '🌍', aime: '🧠',
                math_challenge: '💪', math_is_cool: '❄️', mixed: '🎲',
                fb_reading: '📖', spelling_bee: '🐝',
                arithmetic: '🔢', logic: '🧩', geometry: '📐', word: '📖',
                vocabulary: '📚', grammar: '✏️', reading: '📖', spelling: '🔤' };
            sessions.slice(0, 15).forEach(s => {
                const item = document.createElement('div');
                item.className = 'session-item';
                const date = new Date(s.date).toLocaleDateString();
                item.innerHTML = `
                    <div class="session-left">
                        <span class="session-cat-emoji">${catEmojis[s.category] || '📝'}</span>
                        <div>
                            <div class="session-cat-name">${CATEGORY_NAMES[s.category] || s.category}</div>
                            <div class="session-date">${date}</div>
                        </div>
                    </div>
                    <div class="session-right">
                        <span class="session-score">${s.correct}/${s.total}</span>
                        <span class="session-pts">+${s.points} pts${s.combo >= 3 ? ' 🔥' + s.combo : ''}</span>
                    </div>
                `;
                sessContainer.appendChild(item);
            });
        }

        $('#btn-back-from-progress').onclick = showDashboard;
    }

    // ===================== TOASTS =====================
    function showToast(message, type = 'info') {
        const container = $('#toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        toast.innerHTML = `<span class="toast-emoji">${emoji}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ===================== CONFETTI =====================
    function launchConfetti(count = 150) {
        const canvas = $('#confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#6C63FF', '#FF6B6B', '#2ED573', '#FFA502', '#1E90FF', '#FF6B9D', '#A855F7', '#FFD700'];
        const shapes = ['rect', 'circle', 'star'];

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                vx: (Math.random() - 0.5) * 6,
                vy: Math.random() * 4 + 2,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed; p.vy += 0.05;
                p.vx *= 0.999; // slight air drag
                if (frame > 120) p.opacity -= 0.015;
                if (p.opacity <= 0) return;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'star') {
                    drawStar(ctx, 0, 0, 5, p.w / 2, p.w / 4);
                } else {
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                }
                ctx.restore();
            });
            if (frame < 250 && particles.some(p => p.opacity > 0)) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        animate();
    }

    function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
        let rot = Math.PI / 2 * 3, step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerR);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
            rot += step;
            ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
            rot += step;
        }
        ctx.closePath();
        ctx.fill();
    }

    function showCelebrationBanner(text, color) {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position:fixed;top:0;left:0;width:100%;z-index:10000;
            display:flex;align-items:center;justify-content:center;
            padding:16px;font-size:1.4rem;font-weight:800;
            font-family:var(--font-display);color:#fff;
            background:${color};text-shadow:0 2px 8px rgba(0,0,0,0.3);
            transform:translateY(-100%);transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
            pointer-events:none;
        `;
        banner.textContent = text;
        document.body.appendChild(banner);
        requestAnimationFrame(() => { banner.style.transform = 'translateY(0)'; });
        setTimeout(() => {
            banner.style.transform = 'translateY(-100%)';
            setTimeout(() => banner.remove(), 600);
        }, 2500);
    }

    // ===================== INIT =====================
    // Full data reset — clears localStorage + Firestore + signs out
    async function resetAllData() {
        if (!confirm('⚠️ This will delete ALL your progress on this device and in the cloud. Are you sure?')) {
            if (state.player) showDashboard();
            return;
        }

        // IMMEDIATELY prevent any further saves/syncs
        state.player = null;
        state.authUser = null;
        state._resetting = true;

        console.log('🗑️ Step 1: Clearing localStorage...');
        localStorage.clear();
        console.log('🗑️ localStorage keys remaining:', Object.keys(localStorage).length);

        console.log('🗑️ Step 2: Init Firebase if needed...');
        if (!state.useFirebase && typeof initFirebase === 'function') {
            state.useFirebase = initFirebase();
        }

        // Get UID
        let uid = null;
        if (state.useFirebase && typeof firebase !== 'undefined') {
            try {
                const user = firebase.auth().currentUser;
                if (user) {
                    uid = user.uid;
                } else {
                    // Wait for auth
                    const resolved = await new Promise((resolve) => {
                        const unsub = firebase.auth().onAuthStateChanged(u => { unsub(); resolve(u); });
                        setTimeout(() => resolve(null), 3000);
                    });
                    if (resolved) uid = resolved.uid;
                }
            } catch (e) { console.warn('Auth error:', e); }
        }

        console.log('🗑️ Step 3: Delete Firestore doc for uid:', uid);
        if (uid && state.useFirebase && typeof FirestoreDB !== 'undefined') {
            try {
                const ok = await FirestoreDB.resetPlayer(uid);
                console.log('🗑️ Firestore delete:', ok ? '✅ Success' : '❌ Failed');
            } catch (e) { console.error('🗑️ Firestore delete error:', e); }
        }

        console.log('🗑️ Step 4: Sign out...');
        if (state.useFirebase && typeof firebase !== 'undefined') {
            try { await firebase.auth().signOut(); } catch (e) {}
        }

        console.log('🗑️ Step 5: Final localStorage clear + reload');
        localStorage.clear(); // One more time for safety
        sessionStorage.clear();
        window.location.href = window.location.pathname; // Clean URL, no hash
    }
    // Expose globally for console access
    window.resetMathChamp = resetAllData;

    function init() {
        // ─── #reset route: wipe all local + cloud data ───
        if (window.location.hash === '#reset') {
            resetAllData();
            return;
        }

        initWelcome();
        initHintButton();
        initNextButton();
        initQuitButton();
        initAdmin();
        window.addEventListener('resize', () => {
            const canvas = $('#confetti-canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // ─── Auto-login returning user from localStorage ───
        const savedPlayers = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
        const lastPlayerName = localStorage.getItem('mathchamp_last_player');
        if (lastPlayerName && savedPlayers[lastPlayerName.toLowerCase()]) {
            const p = savedPlayers[lastPlayerName.toLowerCase()];
            migratePlayer(p);
            state.player = p;
            state.bots = generateBotPlayers(p.grade);

            // Initialize Firebase for auto-login users too
            if (!state.useFirebase && typeof initFirebase === 'function') {
                state.useFirebase = initFirebase();
            }

            // Listen for Firebase auth to restore authUser and sync
            if (state.useFirebase && typeof FirebaseAuthHelper !== 'undefined') {
                FirebaseAuthHelper.onAuthStateChanged(async (user) => {
                    if (user) {
                        state.authUser = FirebaseAuthHelper.getUserInfo(user);
                        console.log('🔑 Auth restored for:', user.displayName);

                        const syncBtn = $('#btn-sync-now');
                        if (syncBtn) { syncBtn.style.display = 'inline-block'; syncBtn.onclick = () => forceCloudSync(false); }

                        // Sync latest data from cloud
                        try {
                            const cloudPlayer = await FirestoreDB.loadPlayer(user.uid);
                            if (cloudPlayer) {
                                delete cloudPlayer.updatedAt;
                                const merged = mergePlayerData(cloudPlayer, state.player);
                                migratePlayer(merged);
                                state.player = merged;
                                savePlayer();
                                if (state.currentScreen === 'dashboard') showDashboard();
                                else if (state.currentScreen === 'leaderboard') showLeaderboard();
                            } else {
                                savePlayer();
                            }
                        } catch (e) {
                            console.warn('Cloud sync on auto-login failed:', e);
                        }
                    }
                });
            }

            updateStreak();

            // Check for challenge code in URL
            const urlParams = new URLSearchParams(window.location.search);
            const challengeCode = urlParams.get('challenge');

            if (challengeCode) {
                // Clean URL
                history.replaceState(null, '', window.location.pathname + window.location.hash);
                showChallengeScreen();
                // Auto-fill and join
                setTimeout(() => {
                    const input = $('#challenge-code-input');
                    if (input) { input.value = challengeCode; joinChallenge(); }
                }, 300);
            } else if (window.location.hash && window.location.hash !== '#') {
                navigateToHash(window.location.hash);
            } else {
                showDashboard();
            }
        }
    }

    // ===================== AI ADMIN PANEL =====================
    function showAdmin() {
        showScreen('admin');
        const p = state.player;
        if (p) $('#admin-points').textContent = p.points.toLocaleString();
        refreshAdminStats();
    }

    async function refreshAdminStats() {
        if (typeof GeminiQuestionEngine === 'undefined') return;

        const stats = GeminiQuestionEngine.getStats();

        // Update stat cards
        $('#admin-total-local').textContent = stats.totalCached;
        $('#admin-total-generated').textContent = stats.totalGenerated;
        $('#admin-total-served').textContent = stats.totalServed;
        $('#admin-total-errors').textContent = stats.totalErrors;
        $('#admin-generating').textContent = stats.isGenerating ? 'Yes ⚡' : 'No';

        // Cloud count
        try {
            const cloudCount = await GeminiQuestionEngine.getFirestoreCount();
            $('#admin-total-cloud').textContent = cloudCount;
        } catch (e) {
            $('#admin-total-cloud').textContent = 'N/A';
        }

        // 429 Cooldown banner
        const cooldownBanner = $('#admin-cooldown-banner');
        if (cooldownBanner) {
            if (stats.rateLimitedUntil && Date.now() < stats.rateLimitedUntil) {
                const waitMin = Math.round((stats.rateLimitedUntil - Date.now()) / 60000);
                const cooldownText = $('#admin-cooldown-text');
                cooldownText.textContent = `🛑 API rate-limited (429 hit #${stats.consecutive429s}). Cooldown: ~${waitMin} min remaining.`;
                cooldownBanner.style.display = 'flex';
            } else {
                cooldownBanner.style.display = 'none';
            }
        }

        // API Key status with model name and rate limit
        const keyStatus = $('#admin-key-status');
        const keyInput = $('#admin-api-key');
        if (stats.hasApiKey) {
            const rl = stats.rateLimit || {};
            keyStatus.textContent = `✅ Key set · Model: ${stats.model || 'unknown'} · Today: ${rl.today || 0}/${rl.limit || '?'} requests (${rl.remaining || '?'} left)`;
            keyStatus.className = 'admin-key-status active';
            if (keyInput) keyInput.placeholder = '••••••••••••••• (key saved)';
        } else {
            keyStatus.textContent = '❌ No key set';
            keyStatus.className = 'admin-key-status inactive';
        }

        // Breakdown by grade
        const gradeContainer = $('#admin-by-grade');
        gradeContainer.innerHTML = '';
        if (Object.keys(stats.byGrade).length === 0) {
            gradeContainer.innerHTML = '<span style="color:var(--text-secondary);font-size:0.85rem;">No AI questions yet. Generate some!</span>';
        } else {
            Object.entries(stats.byGrade).sort((a, b) => a[0] - b[0]).forEach(([grade, count]) => {
                const el = document.createElement('div');
                el.className = 'admin-breakdown-item';
                el.innerHTML = `Grade ${grade} <span class="admin-breakdown-count">${count}</span>`;
                gradeContainer.appendChild(el);
            });
        }

        // Breakdown by category
        const catContainer = $('#admin-by-category');
        catContainer.innerHTML = '';
        if (Object.keys(stats.byCategory).length === 0) {
            catContainer.innerHTML = '<span style="color:var(--text-secondary);font-size:0.85rem;">No AI questions yet.</span>';
        } else {
            Object.entries(stats.byCategory).forEach(([cat, count]) => {
                const el = document.createElement('div');
                el.className = 'admin-breakdown-item';
                el.innerHTML = `${cat} <span class="admin-breakdown-count">${count}</span>`;
                catContainer.appendChild(el);
            });
        }

        // Recent questions
        renderAdminRecentQuestions();

        // Generation log
        renderAdminGenLog(stats.recentLog);
    }

    function renderAdminRecentQuestions() {
        const container = $('#admin-recent-questions');
        const questions = GeminiQuestionEngine.getRecentQuestions(20);

        if (questions.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary);">No AI questions generated yet. Use the form above to generate some!</div>';
            return;
        }

        container.innerHTML = '';
        questions.forEach(q => {
            const card = document.createElement('div');
            card.className = 'admin-question-card';
            const diffClass = q.difficulty === 'easy' ? 'diff-tag' : q.difficulty === 'hard' ? 'diff-tag' : 'diff-tag';
            card.innerHTML = `
                <div class="admin-q-header">
                    <div class="admin-q-tags">
                        <span class="admin-q-tag ai-tag">🤖 AI</span>
                        <span class="admin-q-tag grade-tag">Grade ${q._grade || '?'}</span>
                        <span class="admin-q-tag cat-tag">${q._category || 'mixed'}</span>
                        <span class="admin-q-tag ${diffClass}">${q.difficulty || 'medium'}</span>
                    </div>
                </div>
                <div class="admin-q-text">${q.q}</div>
                <div class="admin-q-options">
                    ${(q.options || []).map((opt, i) => 
                        `<div class="admin-q-option ${i === q.answer ? 'correct' : ''}">${['A','B','C','D'][i]}: ${opt}</div>`
                    ).join('')}
                </div>
                <div class="admin-q-actions">
                    <button class="admin-q-btn delete" data-id="${q._id}" title="Delete this question">🗑️ Delete</button>
                </div>
            `;
            // Delete handler
            const deleteBtn = card.querySelector('.admin-q-btn.delete');
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    if (confirm('Delete this AI question?')) {
                        GeminiQuestionEngine.deleteQuestion(q._id);
                        showToast('Question deleted', 'info');
                        renderAdminRecentQuestions();
                        refreshAdminStats();
                    }
                };
            }
            container.appendChild(card);
        });
    }

    function renderAdminGenLog(log) {
        const container = $('#admin-gen-log');
        if (!log || log.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:10px;color:var(--text-secondary);font-size:0.85rem;">No generation logs yet.</div>';
            return;
        }

        container.innerHTML = '';
        [...log].reverse().forEach(entry => {
            const el = document.createElement('div');
            el.className = 'admin-log-item';
            const time = new Date(entry.time).toLocaleString();
            const duration = entry.durationMs ? `${(entry.durationMs / 1000).toFixed(1)}s` : '';
            if (entry.error) {
                el.innerHTML = `
                    <span class="admin-log-time">${time}</span>
                    <span class="admin-log-info">Grade ${entry.grade} / ${entry.category} — <span class="admin-log-error">❌ ${entry.error}</span></span>
                    <span class="admin-log-duration">${duration}</span>
                `;
            } else {
                el.innerHTML = `
                    <span class="admin-log-time">${time}</span>
                    <span class="admin-log-info">Grade ${entry.grade} / ${entry.category} — <span class="admin-log-count">✅ ${entry.count} questions</span></span>
                    <span class="admin-log-duration">${duration}</span>
                `;
            }
            container.appendChild(el);
        });
    }

    function initAdmin() {
        // Save API Key
        const saveKeyBtn = $('#btn-admin-save-key');
        if (saveKeyBtn) {
            saveKeyBtn.onclick = () => {
                const keyInput = $('#admin-api-key');
                const key = keyInput.value.trim();
                if (key) {
                    GeminiQuestionEngine.setApiKey(key);
                    keyInput.value = '';
                    showToast('✅ Gemini API key saved!', 'success');
                    refreshAdminStats();
                } else {
                    showToast('Please enter an API key', 'error');
                }
            };
        }

        // Clear cooldown button
        const clearCooldownBtn = $('#btn-admin-clear-cooldown');
        if (clearCooldownBtn) {
            clearCooldownBtn.onclick = () => {
                if (typeof GeminiQuestionEngine !== 'undefined' && GeminiQuestionEngine.clearCooldown) {
                    GeminiQuestionEngine.clearCooldown();
                    showToast('✅ 429 cooldown cleared! You can generate again.', 'success');
                    refreshAdminStats();
                }
            };
        }

        // Generate button
        const genBtn = $('#btn-admin-generate');
        if (genBtn) {
            genBtn.onclick = async () => {
                const grade = parseInt($('#admin-gen-grade').value);
                const category = $('#admin-gen-category').value;
                const count = parseInt($('#admin-gen-count').value) || 10;
                const statusEl = $('#admin-gen-status');

                if (!GeminiQuestionEngine.hasApiKey()) {
                    statusEl.textContent = '❌ Please set a Gemini API key first!';
                    statusEl.className = 'admin-gen-status error';
                    return;
                }

                // Check 429 cooldown
                const stats0 = GeminiQuestionEngine.getStats();
                if (stats0.rateLimitedUntil && Date.now() < stats0.rateLimitedUntil) {
                    const waitMin = Math.round((stats0.rateLimitedUntil - Date.now()) / 60000);
                    statusEl.textContent = `🛑 API rate-limited (429 cooldown). Try again in ~${waitMin} minutes.`;
                    statusEl.className = 'admin-gen-status error';
                    return;
                }

                // Check free-tier daily limit
                const rl = GeminiQuestionEngine.getRateLimitInfo();
                if (rl.remaining <= 0) {
                    statusEl.textContent = `🛑 Daily free-tier limit reached (${rl.today}/${rl.limit}). Resets at midnight PT.`;
                    statusEl.className = 'admin-gen-status error';
                    return;
                }

                genBtn.disabled = true;
                statusEl.textContent = `🤖 Generating ${count} questions for Grade ${grade} / ${category}... (${rl.remaining} API calls left today)`;
                statusEl.className = 'admin-gen-status loading';

                try {
                    const questions = await GeminiQuestionEngine.generateQuestions(grade, category, count);
                    if (questions.length > 0) {
                        statusEl.textContent = `✅ Generated ${questions.length} questions! They are now available for students.`;
                        statusEl.className = 'admin-gen-status success';
                        showToast(`🤖 Generated ${questions.length} AI questions!`, 'success');
                    } else {
                        // Show actual error instead of generic message
                        const lastErr = GeminiQuestionEngine.getLastError ? GeminiQuestionEngine.getLastError() : null;
                        statusEl.textContent = lastErr
                            ? `⚠️ Generation failed: ${lastErr}`
                            : '⚠️ No questions generated. The API returned an empty or unparseable response.';
                        statusEl.className = 'admin-gen-status error';
                    }
                } catch (e) {
                    statusEl.textContent = `❌ Error: ${e.message}`;
                    statusEl.className = 'admin-gen-status error';
                }

                genBtn.disabled = false;
                refreshAdminStats();
            };
        }

        // Background generation
        const bgStartBtn = $('#btn-admin-bg-start');
        const bgStopBtn = $('#btn-admin-bg-stop');
        const bgStatus = $('#admin-bg-status');
        if (bgStartBtn) {
            bgStartBtn.onclick = () => {
                if (!GeminiQuestionEngine.hasApiKey()) {
                    showToast('Set a Gemini API key first!', 'error');
                    return;
                }
                const grade = state.player ? state.player.grade : 3;
                GeminiQuestionEngine.startBackgroundGeneration(grade);
                bgStatus.textContent = 'Running ⚡';
                bgStatus.className = 'admin-bg-status running';
                showToast('Background AI generation started!', 'success');
            };
        }
        if (bgStopBtn) {
            bgStopBtn.onclick = () => {
                GeminiQuestionEngine.stopBackgroundGeneration();
                bgStatus.textContent = 'Stopped';
                bgStatus.className = 'admin-bg-status';
                showToast('Background generation stopped', 'info');
            };
        }

        // Purge buttons
        const purgeBtn = $('#btn-admin-purge');
        if (purgeBtn) {
            purgeBtn.onclick = () => {
                if (confirm('⚠️ Delete ALL locally cached AI questions? This cannot be undone.')) {
                    GeminiQuestionEngine.purgeAllQuestions();
                    showToast('🗑️ All local AI questions purged', 'info');
                    refreshAdminStats();
                }
            };
        }

        const purgeCloudBtn = $('#btn-admin-purge-cloud');
        if (purgeCloudBtn) {
            purgeCloudBtn.onclick = async () => {
                if (confirm('⚠️ Delete ALL AI questions from cloud (Firestore)? This cannot be undone.')) {
                    await GeminiQuestionEngine.purgeFirestore();
                    showToast('🗑️ Cloud AI questions purged', 'info');
                    refreshAdminStats();
                }
            };
        }

        // Refresh button
        const refreshBtn = $('#btn-admin-refresh');
        if (refreshBtn) {
            refreshBtn.onclick = () => {
                refreshAdminStats();
                showToast('Stats refreshed!', 'info');
            };
        }

        // Back button
        const backBtn = $('#btn-back-from-admin');
        if (backBtn) {
            backBtn.onclick = showDashboard;
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
