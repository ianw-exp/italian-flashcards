# Italian Flashcards

A front-end web app for learning Italian vocabulary. Study with flashcards, take quizzes, and track your progress—all in the browser with no backend or account required.

## What it does

- **Study mode** — Flip cards to see Italian → English; mark each as right or wrong.
- **Quiz mode** — Multiple choice or fill-in-the-blank (planned).
- **Categories** — Cards are grouped into **Animals**, **Food**, and **Verbs**.
- **Statistics** — View how many cards you’ve studied and your accuracy (planned).

Built with **Vite**, **React**, and **TypeScript**. Data is static (no server or database).

## Quick start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Install and run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server (HMR)   |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Project structure

```
src/
├── components/   # Reusable UI components
├── data/        # Static flashcard data (e.g. flashcards.ts)
├── pages/       # Route-level views (Home, CategorySelection, Stats, etc.)
├── App.tsx      # Root app and routing
└── main.tsx     # Entry point
```

## License

MIT
