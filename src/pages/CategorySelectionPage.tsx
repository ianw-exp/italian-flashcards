import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/flashcards";

export function CategorySelectionPage() {
  const { pathname } = useLocation();
  const isStudy = pathname.startsWith("/study");
  const basePath = isStudy ? "/study" : "/quiz";

  return (
    <div className="category-selection">
      <h1>{isStudy ? "Study Mode" : "Quiz Mode"}</h1>
      <p>Choose a category:</p>
      <ul className="category-list">
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <Link to={`${basePath}/${cat}`} className="category-link">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}
