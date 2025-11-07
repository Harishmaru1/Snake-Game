# Snake-Game 🐍

Simple, addictive Snake game built with plain HTML, CSS and JavaScript.  
Play in your browser — eat food, grow the snake, avoid hitting walls & yourself. Includes sound effects for food, move and game over.

---

## ▶️ Live Demo
**Play the game online for free:**  
[Click here to play Snake-Game](https://snakegameharish.vercel.app/)

---

## 🔥 Features & Notes
- Pure HTML / CSS / JavaScript — no build tools required.  
- Sound effects for eating, moving and game over (works best when served over HTTP).  
- Smooth controls using arrow keys (works on desktop).  
- Simple scoring and restart — press any key to start or restart.  
- Lightweight and fast — good for learning game loops and basic collision detection.  
- Mobile: basic support, but touch controls are not implemented (touch support can be added as an improvement).  
- Audio: Browsers may block autoplay; click on the page if audio doesn't play immediately.  
- Performance: If audio causes delay on local file open, run a local server (see Run Locally section).

---

## 🕹️ How to Play
- Use arrow keys to move the snake (Up / Down / Left / Right).  
- Eat the food to grow and score points.  
- If snake hits wall or itself — game over.  
- Press any key to start/restart the game.

---

## 🛠️ Run Locally (quick)
**Option A — open directly (no server needed)**  
1. Download/clone the repo.  
2. Open `index.html` in your browser (double click).

**Option B — run a local HTTP server (recommended for correct audio behavior)**  
Using Python 3:
```bash
# from inside the project folder
python -m http.server 5500
# then open http://localhost:5500 in browser
