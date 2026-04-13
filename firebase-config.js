// =============================================
// Firebase Configuration & Auth + Firestore
// =============================================
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g., "MathChamp")
// 3. Enable Authentication → Sign-in method → Google → Enable
// 4. Enable Cloud Firestore → Create database → Start in test mode
// 5. Go to Project Settings → Your apps → Web app → Register app
// 6. Copy the firebaseConfig object and paste below
// 7. In Authentication → Settings → Authorized domains → Add your GitHub Pages domain
// =============================================

const firebaseConfig = {
    // ===>>> PASTE YOUR FIREBASE CONFIG HERE <<<===
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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

        // Enable offline persistence
        firebaseDb.enablePersistence({ synchronizeTabs: true }).catch(err => {
            if (err.code === 'failed-precondition') {
                console.warn('Firestore persistence failed: multiple tabs open');
            } else if (err.code === 'unimplemented') {
                console.warn('Firestore persistence not available in this browser');
            }
        });

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
            throw err;
        }
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
            name: user.displayName || 'Math Champion',
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
        if (!firebaseReady || !firebaseAuth.currentUser) return false;
        try {
            const uid = firebaseAuth.currentUser.uid;
            const docRef = firebaseDb.collection('players').doc(uid);
            await docRef.set({
                ...player,
                uid,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            return true;
        } catch (err) {
            console.error('Firestore save error:', err);
            return false;
        }
    },

    // Load player data from Firestore
    async loadPlayer(uid) {
        if (!firebaseReady) return null;
        try {
            const doc = await firebaseDb.collection('players').doc(uid).get();
            if (doc.exists) return doc.data();
            return null;
        } catch (err) {
            console.error('Firestore load error:', err);
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
    }
};
