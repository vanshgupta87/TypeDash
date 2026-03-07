<div align="center">

# T Y P E  D A S H

**The high-performance typing suite built for speed demons and word warriors.**

<br/>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequests.com)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=flat-square)](package.json)
[![Client Side](https://img.shields.io/badge/runs-client--side-orange.svg?style=flat-square)](#)

<br/>

*Practice. Compete. Dominate.*

</div>

---

## ➡️ What is Type Dash?

Type Dash is a **pure client-side typing application** — no server, no dependencies, no sign-up. Open the file and start typing.

Whether you're grinding solo sessions to push past your WPM ceiling, or staging a local duel against a friend on the same screen, Type Dash keeps everything out of your way. The UI fades when you type, the numbers update live, and the only thing that matters is how fast your fingers move.

---

## ➡️ Feature Overview

### ⚔️ Duel Mode — Local 1v1 Battles

Turn-based combat for keyboard warriors. Two players. One screen. No mercy.

| Feature | Description |
|---|---|
| **Color-coded turns** | The entire UI shifts from **Crimson Red** (Player 1) to **Electric Blue** (Player 2) on each turn — zero ambiguity about who's up |
| **Custom player names** | A setup modal lets you initialize with personalized callsigns before the match begins |
| **Automatic scoring** | When both turns are complete, Type Dash instantly calculates the winner with full performance breakdowns |

### 🧘 Practice Mode

Solo drilling, optimized for flow state.

- **Three difficulty tiers** — Easy, Medium, and Hard text libraries to match your current skill level
- **Flexible heat durations** — Choose 15s, 30s, or 60s sessions to fit your schedule

### 📊 Real-Time Analytics

Numbers that update as you type, not after.

- **Live WPM** — Words-per-minute calculated continuously throughout the session
- **Accuracy rating** — Character-level tracking with no rounding
- **Error highlighting** — Mistakes are flagged instantly in red; correct characters confirm in green
- **Animated caret** — Smooth caret movement with no jitter

---

## ➡️ Getting Started

Type Dash runs entirely in your browser. No installs, no build steps, no accounts.

### Prerequisites

- Any modern browser (Chrome, Firefox, Safari, Edge)
- That's it.


> **No npm install. No build process. No server.** Just open and type.

---

## ➡️ How to Play

### 🧘 Practice Mode

1. Select your **difficulty** (Easy / Medium / Hard) from the settings panel
2. Choose a **duration** (15s / 30s / 60s)
3. Click anywhere on the text prompt to begin — the timer starts on your first keystroke
4. Type until the timer runs out. Your WPM and accuracy are shown at the end

### ⚔️ Duel Mode

1. Click **Duel** from the main menu
2. Enter **Player 1** and **Player 2** names in the setup modal
3. Player 1 types against the red-tinted UI — timer starts on first keystroke
4. When Player 1 finishes, the UI shifts blue for **Player 2's turn**
5. Both players complete the same text prompt under the same conditions
6. Results and winner are announced automatically

---

## ➡️ Scoring & Metrics

```
WPM  = (Characters Typed ÷ 5) ÷ Elapsed Minutes
Accuracy = (Correct Characters ÷ Total Characters Typed) × 100
```

Duel winner is determined by **WPM**. Accuracy is shown as a tiebreaker stat.

---

## ➡️ Project Structure

```
type-dash/
├── index.html           # Landing page — mode selection, settings, duel setup
├── home.css            # Landing page styles, theme variables, animations
├── home.js             # Menu logic, duel name initialization, routing
├── game.html           # Active typing session — prompt display, caret, timer
├── game.css            # Game UI styles, error/correct highlights, fade effects
├── game.js             # Core engine: WPM calc, accuracy tracking, duel state machine
└── README.md
```

---


<div align="center">
Built for people who take typing seriously.
</div>
