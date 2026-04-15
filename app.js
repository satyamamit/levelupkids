// =============================================
// MathChamp v2 — Full Game Engine
// Leaderboard · XP & Levels · Daily Challenges
// Combo Streaks · Enhanced Rewards · Unlimited Questions
// =============================================

(function () {
    'use strict';

    // ===================== CONSTANTS =====================
    const POINTS_MAP = { easy: 5, medium: 10, hard: 20 };
    const HINT_PENALTY = 2;
    const QUESTIONS_PER_QUIZ = 10;
    const TIMED_SECONDS = 90;
    const DAILY_CHALLENGE_COUNT = 5;

    const CATEGORY_NAMES = {
        // ─── Math Exams ───────────────────────────────────────
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
        fb_reading: '📖 FastBridge aReading',
        spelling_bee: '🐝 Spelling Bee',
        // ─── Internal keys (still used for routing) ──────────
        arithmetic: '🔢 Arithmetic',
        logic: '🧩 Logic',
        geometry: '📐 Geometry',
        word: '📖 Word Problems',
        vocabulary: '📚 Vocabulary',
        grammar: '✏️ Grammar',
        reading: '📖 Reading',
        spelling: '🔤 Spelling',
    };

    // ─── ADMIN EMAILS (users who can see AI Admin panel) ─────
    const ADMIN_EMAILS = [
        'amit.satyam@gmail.com'
    ];

    // ─── XP & LEVEL SYSTEM ─────────────────────────────────
    const XP_PER_CORRECT = { easy: 10, medium: 20, hard: 40 };
    const XP_QUIZ_COMPLETE = 25;
    const XP_PERFECT_BONUS = 50;
    const XP_DAILY_BONUS = 100;

    function getXPForLevel(level) { return Math.floor(100 * Math.pow(1.15, level - 1)); }

    function getLevelFromXP(totalXP) {
        let level = 1, xpNeeded = 0;
        while (true) {
            const req = getXPForLevel(level);
            if (xpNeeded + req > totalXP) return { level, currentXP: totalXP - xpNeeded, nextLevelXP: req };
            xpNeeded += req;
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
        if (combo >= 10) return 3.0;
        if (combo >= 7) return 2.5;
        if (combo >= 5) return 2.0;
        if (combo >= 3) return 1.5;
        return 1.0;
    }

    // ─── ENHANCED REWARDS ───────────────────────────────────
    const REWARDS = {
        gaming: [
            { id: 'roblox_100', emoji: '🎮', name: '100 Robux', desc: 'Roblox digital currency!', cost: 300, tier: 'rare' },
            { id: 'roblox_400', emoji: '🎮', name: '400 Robux', desc: 'Even more Roblox fun!', cost: 1000, tier: 'epic' },
            { id: 'minecraft', emoji: '⛏️', name: 'Minecraft Skin Pack', desc: 'Cool skins for Minecraft', cost: 250, tier: 'rare' },
            { id: 'vbucks_1000', emoji: '🎯', name: '1000 V-Bucks', desc: 'Fortnite V-Bucks card', cost: 800, tier: 'epic' },
            { id: 'nintendo_eshop', emoji: '🕹️', name: '$10 Nintendo eShop', desc: 'Get new games!', cost: 500, tier: 'rare' },
            { id: 'gaming_time', emoji: '🎮', name: '1 Hour Extra Gaming', desc: 'Extra gaming session!', cost: 150, tier: 'common' },
        ],
        giftcards: [
            { id: 'amazon_5', emoji: '📦', name: '$5 Amazon Gift Card', desc: 'Shop anything on Amazon!', cost: 200, tier: 'common' },
            { id: 'amazon_10', emoji: '📦', name: '$10 Amazon Gift Card', desc: 'More shopping power!', cost: 400, tier: 'rare' },
            { id: 'amazon_25', emoji: '📦', name: '$25 Amazon Gift Card', desc: 'Big shopping spree!', cost: 1000, tier: 'epic' },
            { id: 'amazon_50', emoji: '📦', name: '$50 Amazon Gift Card', desc: 'The ultimate Amazon reward!', cost: 2000, tier: 'legendary' },
            { id: 'target_10', emoji: '🎯', name: '$10 Target Gift Card', desc: 'Target shopping!', cost: 400, tier: 'rare' },
            { id: 'walmart_10', emoji: '🛒', name: '$10 Walmart Gift Card', desc: 'Walmart goodies!', cost: 400, tier: 'rare' },
        ],
        toys: [
            { id: 'sticker_pack', emoji: '🌟', name: 'Sticker Pack', desc: 'A pack of 10 awesome stickers!', cost: 50, tier: 'common' },
            { id: 'pokemon_cards', emoji: '🃏', name: 'Pokémon Card Pack', desc: '5 random Pokémon cards!', cost: 200, tier: 'rare' },
            { id: 'puzzle_cube', emoji: '🧊', name: 'Speed Cube', desc: 'A competition-grade Rubik\'s cube', cost: 150, tier: 'common' },
            { id: 'lego_set', emoji: '🧱', name: 'LEGO Mini Set', desc: 'Build & learn with LEGO!', cost: 500, tier: 'epic' },
            { id: 'science_kit', emoji: '🔬', name: 'Science Kit', desc: 'Cool experiments at home!', cost: 750, tier: 'epic' },
            { id: 'art_supplies', emoji: '🎨', name: 'Art Supply Set', desc: 'Markers, crayons & more!', cost: 300, tier: 'rare' },
        ],
        privileges: [
            { id: 'extra_screen', emoji: '📱', name: '30 Min Extra Screen Time', desc: 'Extra screen time for a day!', cost: 100, tier: 'common' },
            { id: 'no_chores', emoji: '🏖️', name: 'Skip Chores Day', desc: 'One day free from chores!', cost: 150, tier: 'common' },
            { id: 'movie_night', emoji: '🎬', name: 'Movie Night Pick', desc: 'You pick the family movie!', cost: 200, tier: 'rare' },
            { id: 'restaurant', emoji: '🍕', name: 'Restaurant Choice', desc: 'Pick where the family eats!', cost: 250, tier: 'rare' },
            { id: 'sleepover', emoji: '🏕️', name: 'Sleepover Permission', desc: 'Invite a friend for a sleepover!', cost: 400, tier: 'epic' },
            { id: 'ice_cream', emoji: '🍦', name: 'Ice Cream Trip', desc: 'A trip to the ice cream shop!', cost: 120, tier: 'common' },
            { id: 'stay_up_late', emoji: '🌙', name: 'Stay Up 30 Min Late', desc: 'Push bedtime by 30 minutes!', cost: 100, tier: 'common' },
        ],
        legendary: [
            { id: 'trip_choice', emoji: '🎢', name: 'Fun Trip Choice', desc: 'Choose a family outing!', cost: 1500, tier: 'legendary' },
            { id: 'ipad_time', emoji: '📲', name: '1 Hour iPad Time', desc: 'Full hour of iPad freedom!', cost: 500, tier: 'epic' },
            { id: 'pet_day', emoji: '🐶', name: 'Pet Store Visit', desc: 'Visit the pet store (just looking!)', cost: 600, tier: 'epic' },
            { id: 'trampoline', emoji: '🤸', name: 'Trampoline Park Visit', desc: 'Jump around for an hour!', cost: 1000, tier: 'legendary' },
            { id: 'pizza_party', emoji: '🍕', name: 'Pizza Party', desc: 'Invite friends for pizza!', cost: 2000, tier: 'legendary' },
            { id: 'toy_store_50', emoji: '🏪', name: '$50 Toy Store Trip', desc: 'The ULTIMATE reward!', cost: 5000, tier: 'legendary' },
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
        { id: 'level_10', emoji: '🎓', name: 'Scholar', desc: 'Reach Level 10', check: (p) => getLevelFromXP(p.totalXP || 0).level >= 10 },
        { id: 'level_25', emoji: '🎖️', name: 'Expert', desc: 'Reach Level 25', check: (p) => getLevelFromXP(p.totalXP || 0).level >= 25 },
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
            const totalXP = Array.from({ length: level }, (_, l) => getXPForLevel(l + 1)).reduce((a, b) => a + b, 0) + Math.floor(Math.random() * getXPForLevel(level + 1));
            const grade = Math.max(1, Math.min(8, playerGrade + Math.floor(Math.random() * 3) - 1));
            bots.push({
                name, grade, totalXP, level,
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
    }

    // ===================== PLAYER DATA =====================
    function getDefaultPlayer(name, grade) {
        return {
            name, grade, points: 0, totalPointsEarned: 0, totalXP: 0,
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
        if (!state.player) return;
        // Always save to localStorage as fallback
        const all = JSON.parse(localStorage.getItem('mathchamp_players') || '{}');
        all[state.player.name.toLowerCase()] = state.player;
        localStorage.setItem('mathchamp_players', JSON.stringify(all));

        // Also save to Firestore if Firebase is active
        if (state.useFirebase && typeof FirestoreDB !== 'undefined') {
            FirestoreDB.savePlayer({
                ...state.player,
                photoURL: state.authUser?.photoURL || null
            }).then(ok => {
                if (ok) showSyncStatus('synced');
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
        return all[name.toLowerCase()] || null;
    }

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

    function addXP(amount) {
        const p = state.player;
        const oldLevel = getLevelFromXP(p.totalXP || 0).level;
        p.totalXP = (p.totalXP || 0) + amount;
        const newInfo = getLevelFromXP(p.totalXP);
        if (newInfo.level > oldLevel) {
            showToast(`🎉 Level Up! You're now Level ${newInfo.level}!`, 'success');
            launchConfetti();
        }
        savePlayer();
    }

    // ===================== WELCOME SCREEN =====================
    function migratePlayer(p) {
        if (!p.totalXP) p.totalXP = (p.totalPointsEarned || 0) * 2;
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
            const cloudPlayer = await FirestoreDB.loadPlayer(user.uid);
            if (cloudPlayer) {
                migratePlayer(cloudPlayer);
                state.player = cloudPlayer;
                nameInput.value = cloudPlayer.name;
                nameInput.dispatchEvent(new Event('input'));
                // Auto-select grade
                if (cloudPlayer.grade) {
                    gradeButtons.forEach(b => {
                        b.classList.remove('selected');
                        if (parseInt(b.dataset.grade) === cloudPlayer.grade) {
                            b.classList.add('selected');
                            selectedGrade = cloudPlayer.grade;
                        }
                    });
                    checkReady();
                }
                showToast(`Welcome back, ${cloudPlayer.name}! ☁️ Data synced from cloud.`, 'success');
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
            showDashboard();
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
                    showDashboard();
                } else { showToast('Profile not found!', 'error'); }
            }
        });
    }

    // ===================== EXAM-BASED CHALLENGE CARDS =====================
    // Every card = a real exam. Kids pick which exam to prep for.
    function getChallengeCards(grade) {
        const isElem = grade <= 5;
        const cards = {
            math: [
                // ── School Testing ──
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
                { cat: 'math_challenge', diff: 'hard', emoji: '💪', name: 'Math Challenge',
                  desc: isElem ? 'RSM & Continental Math League: speed math, problem-solving & mental math' : 'RSM & CML: algebra, geometry & multi-step challenge problems',
                  diffLabel: '⭐⭐⭐ Challenge', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'math_is_cool', diff: 'hard', emoji: '❄️', name: 'Math is Cool',
                  desc: isElem ? 'Individual & team rounds: mental math, estimation & logic' : 'Individual, team & relay: algebra, geometry & problem-solving',
                  diffLabel: '⭐⭐⭐ Cool', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'singapore', diff: 'medium', emoji: '🇸🇬', name: 'Singapore Math',
                  desc: isElem ? 'Bar models, mental math & multi-step word problems' : 'Heuristic problem-solving & model drawing',
                  diffLabel: '⭐⭐ Singapore', pts: '+10 pts each', tag: 'Competition' },
            ],
            english: [
                { cat: 'fb_reading', diff: 'medium', emoji: '📖', name: 'FastBridge aReading',
                  desc: isElem ? 'Vocabulary, grammar, reading comprehension & spelling — LWSD benchmark' : 'Context clues, inference, text structure & grammar — LWSD benchmark',
                  diffLabel: '⭐⭐ School Test', pts: '+10 pts each', tag: 'School', cssClass: 'challenge-card-english' },
                { cat: 'spelling_bee', diff: 'medium', emoji: '🐝', name: 'Spelling Bee',
                  desc: isElem ? 'Scripps-style: commonly misspelled words & phonics patterns' : 'Scripps-style: challenging roots, Latin/Greek origins & homophones',
                  diffLabel: '⭐⭐ Spelling Bee', pts: '+10 pts each', tag: 'Competition', cssClass: 'challenge-card-english' },
            ]
        };

        // Middle school only: Mathcounts and AIME
        if (!isElem) {
            cards.math.splice(cards.math.length - 1, 0, // before Singapore
                { cat: 'mathcounts', diff: 'hard', emoji: '📐', name: 'Mathcounts',
                  desc: 'Sprint, Target & Team round style — algebra, geometry & probability',
                  diffLabel: '⭐⭐⭐ Mathcounts', pts: '+20 pts each', tag: 'Competition' },
                { cat: 'aime', diff: 'hard', emoji: '🧠', name: 'AIME',
                  desc: 'Advanced: multi-step number theory, algebra, combinatorics & geometry',
                  diffLabel: '⭐⭐⭐ AIME', pts: '+25 pts each', tag: 'Competition' }
            );
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
        const levelInfo = getLevelFromXP(p.totalXP || 0);
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

        // XP Banner
        $('#dash-rank-badge').textContent = tier.emoji;
        $('#dash-level').textContent = levelInfo.level;
        $('#dash-rank-title').textContent = tier.name;
        $('#dash-xp').textContent = levelInfo.currentXP;
        $('#dash-xp-next').textContent = levelInfo.nextLevelXP;
        $('#dash-xp-bar').style.width = Math.min(100, (levelInfo.currentXP / levelInfo.nextLevelXP) * 100) + '%';

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
                recEl.style.display = 'none';
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
            showScreen('welcome');
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
        $('#question-text').textContent = '⏳ Generating questions...';
        $('#answers-grid').innerHTML = '';

        const count = isDaily ? DAILY_CHALLENGE_COUNT : QUESTIONS_PER_QUIZ;

        let questions;
        try {
            // Use QuestionAPI for async questions
            if (typeof QuestionAPI !== 'undefined' && QuestionAPI.getQuestions) {
                questions = await QuestionAPI.getQuestions(state.player.grade, category, count);
            } else {
                questions = getQuestions(state.player.grade, category, count);
            }
        } catch (e) {
            console.warn('Question fetch error, using fallback:', e);
            questions = typeof getLocalQuestions === 'function'
                ? getLocalQuestions(state.player.grade, category, count)
                : getQuestions(state.player.grade, category, count);
        }

        // Mix in AI-generated questions for uniqueness
        // All students get AI questions from Firestore — no API key needed to READ
        // API key is only needed for GENERATING new questions (admin only)
        if (typeof GeminiQuestionEngine !== 'undefined') {
            try {
                const aiCount = Math.ceil(count * 0.4); // 40% AI questions
                const aiQuestions = await GeminiQuestionEngine.getUniqueQuestions(state.player.grade, category, aiCount);
                if (aiQuestions && aiQuestions.length > 0) {
                    // Replace some regular questions with AI ones to maintain total count
                    const regularSlice = (questions || []).slice(0, count - aiQuestions.length);
                    questions = [...regularSlice, ...aiQuestions];
                    // Shuffle so AI questions are mixed in randomly
                    for (let i = questions.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [questions[i], questions[j]] = [questions[j], questions[i]];
                    }
                    console.log(`🤖 Mixed ${aiQuestions.length} AI questions into quiz`);
                }
            } catch (e) {
                console.warn('AI question mixing failed (non-critical):', e);
            }
        }

        if (!questions || questions.length === 0) {
            showToast('No questions available for this category yet!', 'info');
            showDashboard();
            return;
        }

        state.quiz = {
            category, difficulty, questions, isDaily,
            currentIndex: 0, score: 0, pointsEarned: 0,
            xpEarned: 0, results: [], hintsUsed: 0,
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

        // Image
        const imgEl = $('#question-image');
        if (imgEl) imgEl.innerHTML = q.image ? `<img src="${q.image}" alt="Question image">` : '';

        // Combo display
        if (quiz.combo >= 3) {
            showComboDisplay(quiz.combo);
        }

        // Answers
        const grid = $('#answers-grid');
        grid.innerHTML = '';
        const labels = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
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
        let xpEarned = 0;

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
            const streakMult = state.player.streak >= 7 ? 1.5 : state.player.streak >= 3 ? 1.25 : 1;
            const dailyMult = quiz.isDaily ? 2 : 1;

            pointsEarned = Math.round(basePoints * comboMult * streakMult * dailyMult);
            if (quiz.hintUsedThisQuestion) pointsEarned = Math.max(1, pointsEarned - HINT_PENALTY);
            if (diff === 'hard') pointsEarned += 5;

            xpEarned = Math.round((XP_PER_CORRECT[diff] || 20) * comboMult);

            quiz.score++;
            quiz.pointsEarned += pointsEarned;
            quiz.xpEarned += xpEarned;
            state.player.totalCorrect++;
            if (diff === 'hard') state.player.hardCorrect = (state.player.hardCorrect || 0) + 1;
        } else {
            // Reset combo
            quiz.combo = 0;
        }

        state.player.totalAttempted++;

        quiz.results.push({
            question: q.q, correct, selected: q.options[selected],
            answer: q.options[q.answer], pointsEarned, xpEarned, difficulty: diff,
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
            $('#feedback-points').textContent = 'No points this time';
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

        // Update stats
        p.points += quiz.pointsEarned;
        p.totalPointsEarned += quiz.pointsEarned;
        p.totalQuizzes++;

        // XP
        let totalXP = quiz.xpEarned + XP_QUIZ_COMPLETE;
        if (quiz.score === quiz.questions.length) {
            totalXP += XP_PERFECT_BONUS;
            p.perfectScores = (p.perfectScores || 0) + 1;
        }

        // Daily challenge completion
        if (quiz.isDaily) {
            const today = new Date().toDateString();
            p.dailyChallengeToday = today;
            p.dailyChallengesCompleted = (p.dailyChallengesCompleted || 0) + 1;
            if (!p.dailyStreakDates) p.dailyStreakDates = [];
            if (!p.dailyStreakDates.includes(today)) p.dailyStreakDates.push(today);
            // Keep only last 30 days
            if (p.dailyStreakDates.length > 30) p.dailyStreakDates = p.dailyStreakDates.slice(-30);
            totalXP += XP_DAILY_BONUS;
        }

        addXP(totalXP);

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
            points: quiz.pointsEarned, xp: totalXP, combo: quiz.maxCombo
        });
        if (p.sessions.length > 50) p.sessions = p.sessions.slice(0, 50);

        checkAchievements();
        savePlayer();
        showResults(quiz, totalXP);
    }

    function showResults(quiz, totalXP) {
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
        $('#result-points-earned').textContent = `+${quiz.pointsEarned}`;
        $('#result-accuracy').textContent = accuracy + '%';

        // Breakdown
        const breakdown = $('#results-breakdown');
        breakdown.innerHTML = `
            <h3 style="margin-bottom:12px;font-family:var(--font-display);">Question Breakdown</h3>
            <div style="text-align:center;margin-bottom:12px;color:var(--primary);font-weight:700;">
                +${totalXP} XP earned${quiz.maxCombo >= 3 ? ` | Max Combo: ${quiz.maxCombo}🔥` : ''}
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

        if (accuracy >= 80) launchConfetti();

        $('#btn-play-again').onclick = () => startQuiz(quiz.category, quiz.difficulty, quiz.isDaily);
        $('#btn-back-dashboard').onclick = showDashboard;
    }

    function truncate(str, len) { return str.length > len ? str.slice(0, len) + '...' : str; }

    // ===================== LEADERBOARD =====================
    function showLeaderboard() {
        showScreen('leaderboard');
        const p = state.player;
        const levelInfo = getLevelFromXP(p.totalXP || 0);
        const tier = getTier(levelInfo.level);

        $('#lb-points').textContent = p.points.toLocaleString();
        $('#lb-your-name').textContent = p.name;
        $('#lb-your-tier').textContent = `${tier.emoji} ${tier.name}`;
        $('#lb-your-xp').textContent = `${(p.totalXP || 0).toLocaleString()} XP`;
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
                level: getLevelFromXP(pl.totalXP || 0).level,
                isYou: pl.uid === myUid,
                isBot: false
            }));
            // Ensure current player is in the list
            const meInList = allPlayers.find(pl => pl.isYou);
            if (!meInList) {
                const levelInfo = getLevelFromXP(p.totalXP || 0);
                allPlayers.push({
                    name: p.name, grade: p.grade, totalXP: p.totalXP || 0,
                    level: levelInfo.level, totalQuizzes: p.totalQuizzes,
                    totalCorrect: p.totalCorrect, totalAttempted: p.totalAttempted,
                    maxStreak: p.maxStreak, isBot: false, isYou: true,
                    photoURL: state.authUser?.photoURL || null
                });
            }
        } else {
            // Fallback to bots
            allPlayers = [...(state.bots || [])];
            const levelInfo = getLevelFromXP(p.totalXP || 0);
            allPlayers.push({
                name: p.name, grade: p.grade, totalXP: p.totalXP || 0,
                level: levelInfo.level, totalQuizzes: p.totalQuizzes,
                totalCorrect: p.totalCorrect, totalAttempted: p.totalAttempted,
                maxStreak: p.maxStreak, isBot: false, isYou: true
            });

            if (tab === 'grade') {
                allPlayers = allPlayers.filter(pl => pl.grade === p.grade);
            } else if (tab === 'weekly') {
                allPlayers = allPlayers.map(pl => ({
                    ...pl,
                    weeklyXP: pl.isYou ? Math.floor((p.totalXP || 0) * 0.15) : Math.floor(pl.totalXP * (0.05 + Math.random() * 0.2))
                }));
            }
        }

        // Sort
        if (tab === 'weekly' && !realPlayers.length) {
            allPlayers.sort((a, b) => (b.weeklyXP || b.totalXP) - (a.weeklyXP || a.totalXP));
        } else {
            allPlayers.sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0));
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
            const plLevel = pl.level || getLevelFromXP(pl.totalXP || 0).level;
            const plTier = getTier(plLevel);
            const topClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';
            const youClass = pl.isYou ? 'is-you' : '';
            const xpVal = tab === 'weekly' && pl.weeklyXP != null ? pl.weeklyXP : (pl.totalXP || 0);
            const xpDisplay = `${xpVal.toLocaleString()} XP`;

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
                    <div class="lb-score-value">${xpDisplay}</div>
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

        renderRewardSection('rewards-gaming', REWARDS.gaming);
        renderRewardSection('rewards-giftcards', REWARDS.giftcards);
        renderRewardSection('rewards-toys', REWARDS.toys);
        renderRewardSection('rewards-privileges', REWARDS.privileges);
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
    function launchConfetti() {
        const canvas = $('#confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#6C63FF', '#FF6B6B', '#2ED573', '#FFA502', '#1E90FF', '#FF6B9D', '#A855F7', '#FFD700'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
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
                if (frame > 100) p.opacity -= 0.02;
                if (p.opacity <= 0) return;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (frame < 200 && particles.some(p => p.opacity > 0)) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        animate();
    }

    // ===================== INIT =====================
    function init() {
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
                        statusEl.textContent = '⚠️ No questions generated. Check your API key and try again.';
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
