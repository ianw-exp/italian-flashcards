import { Link } from "react-router-dom";
import { useStats } from "../context/StatsContext";
import { CATEGORIES } from "../data/flashcards";
import type { Category } from "../data/flashcards";

function formatCategory(cat: Category): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

/** Displays overall and per-category stats (from StatsContext / localStorage). */
export function StatsPage() {
  const { stats } = useStats();

  const totalStudied = CATEGORIES.reduce(
    (sum, cat) => sum + stats[cat].correct + stats[cat].incorrect,
    0
  );
  const totalCorrect = CATEGORIES.reduce((sum, cat) => sum + stats[cat].correct, 0);
  const totalIncorrect = CATEGORIES.reduce((sum, cat) => sum + stats[cat].incorrect, 0);
  const accuracy =
    totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : 0;

  if (totalStudied === 0) {
    return (
      <div className="stats-page">
        <h1>Statistics</h1>
        <p>No cards studied yet. Start with Study Mode or Quiz Mode to see your stats here.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <h1>Statistics</h1>

      <section className="stats-summary">
        <h2>Overall</h2>
        <p>
          <strong>Total cards studied:</strong> {totalStudied}
        </p>
        <p>
          <strong>Correct:</strong> {totalCorrect} &nbsp;|&nbsp; <strong>Incorrect:</strong>{" "}
          {totalIncorrect}
        </p>
        <p>
          <strong>Accuracy:</strong> {accuracy}%
        </p>
      </section>

      <section className="stats-by-category">
        <h2>By category</h2>
        <ul className="stats-category-list">
          {CATEGORIES.map((cat) => {
            const { correct, incorrect } = stats[cat];
            const studied = correct + incorrect;
            const catAccuracy = studied > 0 ? Math.round((correct / studied) * 100) : 0;
            return (
              <li key={cat} className="stats-category-item">
                <strong>{formatCategory(cat)}</strong>: {studied} studied, {correct} correct (
                {catAccuracy}%)
              </li>
            );
          })}
        </ul>
      </section>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}
