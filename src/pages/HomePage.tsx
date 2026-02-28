import { Link } from "react-router-dom";
import { useWrongCards } from "../context/WrongCardsContext";

export function HomePage() {
  const { wrongCards, resetWrongCards } = useWrongCards();
  const hasWrongCards = wrongCards.length > 0;

  return (
    <div className="home-page">
      <h1>Italian Flashcards</h1>
      <p className="welcome">Welcome! Choose how you want to practice.</p>
      <nav className="home-nav">
        <Link to="/study/category" className="nav-button study">
          Study Mode
        </Link>
        <Link to="/quiz/category" className="nav-button quiz">
          Quiz Mode
        </Link>
        <Link to="/stats" className="nav-button stats">
          Stats Page
        </Link>
        {hasWrongCards && (
          <>
            <Link to="/study/redo" className="nav-button study">
              Redo wrong cards
            </Link>
            <button
              type="button"
              className="nav-button"
              onClick={resetWrongCards}
            >
              Reset wrong list
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
