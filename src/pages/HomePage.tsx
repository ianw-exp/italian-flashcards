import { Link } from "react-router-dom";

export function HomePage() {
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
      </nav>
    </div>
  );
}
