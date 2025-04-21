# Genshin GuessMe Helper

> **⚠️ WARNING: This project relies heavily on AI-generated code. Use and distribute with care!**

> **Disclaimer:** Genshin Impact, its characters, and assets are the intellectual property of HoYoverse (miHoYo). This project is a fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by HoYoverse. All Genshin Impact content referenced herein belongs to its respective owner. Please support the official game!

---

## Project Description
Genshin GuessMe Helper is a (not-so-serious) helper app designed for a two-player guessing game with Genshin Impact characters. The app provides tools to quickly eliminate large groups of characters from the possible list, making the game faster and more fun (or at least more chaotic).

This project was whipped up in about 3 hours and, to be honest, after about 4 beers. Please set your expectations accordingly.

### Key Features
- Designed for two players playing in close proximity.
- Helper functions to bulk-remove characters from the possible list.
- Not optimized for mobile—unless you enjoy squinting and scrolling sideways.
- Built for Genshin Impact version 5.5. Future character releases will require updates or (ideally) an automated system to fetch new data.

---

## Dependencies
This project uses the following dependencies:

**Main:**
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `genshin-db` ^5.2.0
- `prop-types` ^15.8.1

**Development:**
- `vite` ^6.3.1
- `@vitejs/plugin-react` ^4.3.4
- `eslint` ^9.22.0
- `@eslint/js` ^9.22.0
- `eslint-plugin-react-hooks` ^5.2.0
- `eslint-plugin-react-refresh` ^0.4.19
- `@types/react` ^18.2.37
- `@types/react-dom` ^18.2.15
- `globals` ^16.0.0

---

## Avatar Images
The `genshin-db` avatar picture references are faulty and do not work for all characters. You **must** host avatar images locally for full functionality. Some portraits are already included, but for new ones, fallback initials will be shown. Please add missing images manually as needed.

---

## Version Note
This project was developed for Genshin Impact version 5.5. As new characters are released, you will need to update the local data or implement an automated fetcher to keep things current.

---

## Gameplay
- Meant for two players in the same room (or at least within shouting distance).
- The helper app provides functions to quickly eliminate large numbers of characters from the list of possible answers.

---

## Mobile Support
This project is **not** optimized for mobile devices. If you know how to fix that, please do! (And teach me your ways.)

---

## License
This project is for fun and educational purposes only. Please use and share responsibly.
