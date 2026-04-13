# MathChamp 🧠

A **LeetCode-style competitive math practice platform** for kids (Grades 1–8).

## Features
- 🎮 **Unlimited Math Questions** — 40+ dynamic generators + OpenTDB API + 725 curated competition problems
- 🏆 **LeetCode-Style Leaderboard** — Global, per-grade, and weekly rankings with real-time Firestore sync
- 📈 **XP & Level System** — 6 rank tiers (Bronze → Master) with exponential leveling
- 🔥 **Daily Challenges** — Rotating daily category with bonus multipliers
- ⚡ **Combo System** — Consecutive correct answers build combo multipliers (up to 3×)
- 🎁 **30+ Rewards** — Roblox, Amazon Gift Cards, LEGO, Pokemon, privileges, and legendary items
- 🏅 **30 Achievements** — Track milestones and unlock badges
- 🔐 **Google Sign-In** — Cloud-synced progress via Firebase
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## Competition Sources
AMC 8 · AOPS · Math Kangaroo · RSM · Primefactor · Singapore Math · MOEMS · Mathcounts · IMC

## Quick Start

1. Clone this repo
2. Open `index.html` in a browser, or serve locally:
   ```bash
   npx http-server -p 8080
   ```

## Firebase Setup (Optional — for Google Sign-In & Cloud Leaderboard)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project → **MathChamp**
3. Enable **Authentication** → Sign-in method → **Google** → Enable
4. Enable **Cloud Firestore** → Create database → Start in **test mode**
5. Go to Project Settings → Your apps → **Web app** → Register
6. Copy the config object into `firebase-config.js`
7. In Auth → Settings → **Authorized domains** → add your GitHub Pages domain

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to repo Settings → Pages → Source → **GitHub Actions**
3. The included workflow will auto-deploy on every push to `main`

## Tech Stack
- Pure HTML/CSS/JS (no frameworks)
- Firebase Auth + Firestore (optional)
- GitHub Pages hosting
