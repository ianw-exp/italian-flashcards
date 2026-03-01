import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/flashcards";

const QUIZ_TYPES = [
  { id: "multiple-choice", label: "Multiple Choice" },
  { id: "fill-in-blank", label: "Fill in the Blank" },
] as const;

/**
 * Lets the user pick a quiz type and a category before starting a quiz.
 * Meets Phase 4: "Page shows quiz types (Multiple Choice, Fill in the Blank) and categories to start the quiz."
 */
export function QuizSelectionPage() {
  return (
    <div className="category-selection quiz-selection">
      <h1>Quiz Mode</h1>
      <p>Choose a quiz type and category:</p>
      <div className="quiz-selection-grid">
        {QUIZ_TYPES.map((quizType) => (
          <div key={quizType.id} className="quiz-type-group">
            <h2 className="quiz-type-heading">{quizType.label}</h2>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/quiz/${cat}/${quizType.id}`}
                    className="category-link"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}
