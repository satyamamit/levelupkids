// =============================================
// Firebase Configuration & Auth + Firestore
// =============================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g., "LevelUpKids")
// 3. Enable Authentication → Sign-in method → Google → Enable
// 4. Enable Cloud Firestore → Create database → Start in test mode
// 5. Go to Project Settings → Your apps → Web app → Register app
// 6. Copy the firebaseConfig object and paste below
// 7. In Authentication → Settings → Authorized domains → Add your GitHub Pages domain
// =============================================

const firebaseConfig = {
    apiKey: "AIzaSyDG4NIyK2ynoEa6iwGN7J7u7yXjmBaP4BE",
    authDomain: "mathchamp-fe813.firebaseapp.com",
    projectId: "mathchamp-fe813",
    storageBucket: "mathchamp-fe813.firebasestorage.app",
    messagingSenderId: "10027016866",
    appId: "1:10027016866:web:cc9740458f4b3c9daeadfb",
    measurementId: "G-ZD96RYVD6M"
};

// ─── Initialize Firebase ────────────────────────────────────
let firebaseApp, firebaseAuth, firebaseDb;
let firebaseReady = false;

function initFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded — running in offline/localStorage mode');
            return false;
        }
        firebaseApp = firebase.initializeApp(firebaseConfig);
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.firestore();

        // Note: Skipping enablePersistence() — it's deprecated in SDK 10.12+ 
        // and causes "client is offline" errors. Firestore works fine without it
        // for this app since we already have localStorage as a fallback.

        firebaseReady = true;
        console.log('✅ Firebase initialized');
        return true;
    } catch (e) {
        console.warn('Firebase init error:', e);
        return false;
    }
}

// ─── Auth Helpers ───────────────────────────────────────────
const FirebaseAuthHelper = {
    // Sign in with Google popup
    async signInWithGoogle() {
        if (!firebaseReady) return null;
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await firebaseAuth.signInWithPopup(provider);
            return result.user;
        } catch (err) {
            console.error('Google sign-in error:', err);
            if (err.code === 'auth/popup-closed-by-user') return null;
            if (err.code === 'auth/cancelled-popup-request') return null;
            if (err.code === 'auth/popup-blocked') {
                // Show a helpful message instead of using redirect (which breaks in partitioned browsers)
                alert('Pop-up was blocked! Please allow pop-ups for this site and try again.\n\nIn Chrome: click the pop-up blocked icon in the address bar → Always allow.');
                return null;
            }
            throw err;
        }
    },

    // No longer using redirect — removed to avoid storage-partitioned browser errors
    async getRedirectResult() {
        return null;
    },

    // Sign out
    async signOut() {
        if (!firebaseReady) return;
        try {
            await firebaseAuth.signOut();
        } catch (err) {
            console.error('Sign-out error:', err);
        }
    },

    // Get current user
    getCurrentUser() {
        if (!firebaseReady) return null;
        return firebaseAuth.currentUser;
    },

    // Listen to auth state changes
    onAuthStateChanged(callback) {
        if (!firebaseReady) return () => {};
        return firebaseAuth.onAuthStateChanged(callback);
    },

    // Get user display info
    getUserInfo(user) {
        if (!user) return null;
        return {
            uid: user.uid,
            name: user.displayName || 'LevelUp Kid',
            email: user.email,
            photoURL: user.photoURL,
            isAnonymous: false
        };
    }
};

// ─── Firestore Player Data ──────────────────────────────────
const FirestoreDB = {
    // Save player data to Firestore
    async savePlayer(player) {
        if (!firebaseReady || !firebaseAuth.currentUser) {
            console.warn('Firestore save skipped: firebaseReady=', firebaseReady, 'currentUser=', !!firebaseAuth?.currentUser);
            return false;
        }
        try {
            const uid = firebaseAuth.currentUser.uid;
            const docRef = firebaseDb.collection('players').doc(uid);
            // Clean the data — remove undefined values and non-serializable fields
            const cleanData = {};
            for (const [key, value] of Object.entries(player)) {
                if (value !== undefined && key !== 'updatedAt') {
                    cleanData[key] = value;
                }
            }
            await docRef.set({
                ...cleanData,
                uid,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            console.log('✅ Firestore save successful for uid:', uid);
            return true;
        } catch (err) {
            console.error('❌ Firestore save error:', err.code, err.message);
            // Check for common issues
            if (err.code === 'permission-denied') {
                console.error('🔒 Firestore security rules are blocking writes! Update rules in Firebase Console → Firestore → Rules');
            }
            return false;
        }
    },

    // Load player data from Firestore
    async loadPlayer(uid) {
        if (!firebaseReady) {
            console.warn('Firestore load skipped: not ready');
            return null;
        }
        try {
            const doc = await firebaseDb.collection('players').doc(uid).get();
            if (doc.exists) {
                const data = doc.data();
                console.log('✅ Firestore load successful for uid:', uid);
                // Convert Firestore Timestamp to string for serialization
                if (data.updatedAt && data.updatedAt.toDate) {
                    data.updatedAt = data.updatedAt.toDate().toISOString();
                }
                return data;
            }
            console.log('ℹ️ No Firestore data found for uid:', uid);
            return null;
        } catch (err) {
            console.error('❌ Firestore load error:', err.code, err.message);
            if (err.code === 'permission-denied') {
                console.error('🔒 Firestore security rules are blocking reads! Update rules in Firebase Console → Firestore → Rules');
            }
            return null;
        }
    },

    // Get leaderboard (top N players)
    async getLeaderboard(limit = 50, gradeFilter = null) {
        if (!firebaseReady) return [];
        try {
            let query = firebaseDb.collection('players')
                .orderBy('totalXP', 'desc')
                .limit(limit);

            if (gradeFilter) {
                query = firebaseDb.collection('players')
                    .where('grade', '==', gradeFilter)
                    .orderBy('totalXP', 'desc')
                    .limit(limit);
            }

            const snapshot = await query.get();
            const players = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                players.push({
                    uid: doc.id,
                    name: data.name || 'Unknown',
                    grade: data.grade || 1,
                    totalXP: data.totalXP || 0,
                    totalQuizzes: data.totalQuizzes || 0,
                    totalCorrect: data.totalCorrect || 0,
                    totalAttempted: data.totalAttempted || 0,
                    maxStreak: data.maxStreak || 0,
                    photoURL: data.photoURL || null,
                    isBot: false
                });
            });
            return players;
        } catch (err) {
            console.error('Firestore leaderboard error:', err);
            return [];
        }
    },

    // Get weekly leaderboard (players active in last 7 days)
    async getWeeklyLeaderboard(limit = 50) {
        if (!firebaseReady) return [];
        try {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);

            const snapshot = await firebaseDb.collection('players')
                .where('updatedAt', '>=', weekAgo)
                .orderBy('updatedAt', 'desc')
                .limit(limit)
                .get();

            const players = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                players.push({
                    uid: doc.id,
                    name: data.name || 'Unknown',
                    grade: data.grade || 1,
                    totalXP: data.totalXP || 0,
                    totalQuizzes: data.totalQuizzes || 0,
                    totalCorrect: data.totalCorrect || 0,
                    totalAttempted: data.totalAttempted || 0,
                    maxStreak: data.maxStreak || 0,
                    photoURL: data.photoURL || null,
                    isBot: false
                });
            });
            // Sort by XP since Firestore can't do compound where + orderBy on different fields easily
            players.sort((a, b) => b.totalXP - a.totalXP);
            return players;
        } catch (err) {
            console.error('Firestore weekly leaderboard error:', err);
            return [];
        }
    },

    // Reset player data in Firestore (overwrite with empty data)
    async resetPlayer(uid) {
        if (!firebaseReady || !uid) { console.warn('🗑️ resetPlayer: not ready or no uid'); return false; }
        try {
            // Overwrite with zeroed data instead of deleting (delete may be blocked by security rules)
            await firebaseDb.collection('players').doc(uid).set({
                name: 'RESET',
                grade: 0,
                points: 0,
                totalPointsEarned: 0,
                totalXP: 0,
                totalQuizzes: 0,
                totalCorrect: 0,
                totalAttempted: 0,
                perfectScores: 0,
                streak: 0,
                maxStreak: 0,
                maxCombo: 0,
                achievements: [],
                sessions: [],
                categoriesPlayed: {},
                categoryHighScores: {},
                dailyStreakDates: [],
                totalRedemptions: 0,
                quizzesWithNoHints: 0,
                blitzHighAccuracy: 0,
                hardCorrect: 0,
                dailyChallengesCompleted: 0,
                _resetAt: new Date().toISOString(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('🗑️ Firestore data RESET (overwritten with zeros) for uid:', uid);
            // Also try to delete
            try {
                await firebaseDb.collection('players').doc(uid).delete();
                console.log('🗑️ Firestore doc DELETED for uid:', uid);
            } catch (delErr) {
                console.warn('🗑️ Delete blocked (overwrite succeeded):', delErr.code);
            }
            return true;
        } catch (err) {
            console.error('❌ Firestore reset error:', err.code, err.message);
            return false;
        }
    },

    // ─── Challenge a Friend ─────────────────────────────────────
    async createChallenge(challengeData) {
        if (!firebaseReady || !firebaseDb) return null;
        try {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            await firebaseDb.collection('challenges').doc(code).set({
                ...challengeData,
                code,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48hr expiry
            });
            return code;
        } catch (err) {
            console.error('Challenge create error:', err);
            return null;
        }
    },

    async getChallenge(code) {
        if (!firebaseReady || !firebaseDb) return null;
        try {
            const doc = await firebaseDb.collection('challenges').doc(code.toUpperCase()).get();
            return doc.exists ? doc.data() : null;
        } catch (err) {
            console.error('Challenge load error:', err);
            return null;
        }
    },

    async submitChallengeResult(code, resultData) {
        if (!firebaseReady || !firebaseDb) return false;
        try {
            const ref = firebaseDb.collection('challenges').doc(code.toUpperCase());
            await ref.update({
                challengerResult: resultData,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (err) {
            console.error('Challenge result submit error:', err);
            return false;
        }
    },

    async getMyChallenges(uid, limit = 10) {
        if (!firebaseReady || !firebaseDb || !uid) return [];
        try {
            const snapshot = await firebaseDb.collection('challenges')
                .where('creatorUid', '==', uid)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            const challenges = [];
            snapshot.forEach(doc => challenges.push(doc.data()));
            return challenges;
        } catch (err) {
            console.error('Get my challenges error:', err);
            return [];
        }
    }
};
