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

        // Enable offline persistence
        firebaseDb.enablePersistence({ synchronizeTabs: true }).catch(err => {
            if (err.code === 'failed-precondition') {
                console.warn('Firestore persistence: multiple tabs open, only one can use offline.');
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
    }
};
