# Italian Flashcards

A front-end web app for learning Italian vocabulary. Study with flashcards, take quizzes, and track your progress—all in the browser with no backend or account required.

## What it does

- **Study mode** — Flip cards to see Italian → English; mark each as right or wrong.
- **Redo mode** — Study only the cards you marked wrong in the last session; reset the list anytime.
- **Quiz mode** — Multiple choice (4 options) or fill-in-the-blank (type the answer, case-insensitive).
- **Categories** — Cards are grouped into **Animals**, **Food**, and **Verbs**.
- **Statistics** — View how many cards you’ve studied and your accuracy (persisted in localStorage).

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

Open the URL shown in the terminal (Vite typically uses port 5173, or the next free port if that’s in use).

### Other commands

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server (HMR)   |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |
| `npm run test:e2e` | Run Playwright e2e tests |
| `npm run test:e2e:ui` | Run e2e tests with UI mode |

## Project structure

```
src/
├── components/   # Reusable UI (e.g. Flashcard)
├── context/     # React context (WrongCards for redo, Stats for statistics + localStorage)
├── data/        # Static flashcard data (flashcards.ts)
├── pages/       # Route-level views (Home, Study, Redo, Quiz, QuizSelection, Stats, etc.)
├── App.tsx      # Root app, providers, and routing
└── main.tsx     # Entry point
```

## License

MIT
