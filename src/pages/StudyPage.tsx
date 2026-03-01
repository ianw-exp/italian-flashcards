import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Flashcard } from "../components/Flashcard";
import { useStats } from "../context/StatsContext";
import { useWrongCards } from "../context/WrongCardsContext";
import {
  getCardsByCategory,
  type Flashcard as FlashcardType,
  type Category,
  CATEGORIES,
} from "../data/flashcards";

function isValidCategory(param: string | undefined): param is Category {
  // Guard against unknown categories so we can show a friendly message.
  return param !== undefined && CATEGORIES.includes(param as Category);
}

export function StudyPage() {
  const { category } = useParams<{ category: string }>();
  const { setWrongCardsFromSession, resetWrongCards } = useWrongCards();
  const { recordAnswer } = useStats();
  // Track any cards the user marks incorrect for the end-of-session summary and redo.
  const [wrongCards, setWrongCards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Persist wrong cards to context when session ends so redo mode can use them.
  useEffect(() => {
    if (!category || !CATEGORIES.includes(category as Category) || wrongCards.length === 0)
      return;
    const cardsForSession = getCardsByCategory(category as Category);
    if (currentIndex >= cardsForSession.length) {
      setWrongCardsFromSession(wrongCards);
    }
  }, [category, wrongCards, currentIndex, setWrongCardsFromSession]);

  if (!isValidCategory(category)) {
    return (
      <div className="study-page">
        <p>Invalid category.</p>
        <Link to="/study/category">Choose category</Link>
      </div>
    );
  }

  const cards = getCardsByCategory(category);
  const currentCard = cards[currentIndex];
  // Session ends when we've advanced past the last card.
  const isComplete = cards.length === 0 || currentIndex >= cards.length;

  const handleRight = () => {
    recordAnswer(category, true); // Update stats for Statistics page
    setCurrentIndex((i) => i + 1);
  };

  const handleWrong = () => {
    if (currentCard) {
      setWrongCards((prev) => [...prev, currentCard]);
      recordAnswer(category, false); // Update stats for Statistics page
    }
    setCurrentIndex((i) => i + 1);
  };

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <p>No cards in this category.</p>
        <Link to="/study/category">← Back to categories</Link>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="study-page study-complete">
        <h1>Session complete</h1>
        <p>
          You reviewed {cards.length} card{cards.length !== 1 ? "s" : ""}.
          {wrongCards.length > 0 && (
            <> {wrongCards.length} marked as wrong.</>
          )}
        </p>
        <div className="study-complete-actions">
          {wrongCards.length > 0 && (
            <>
              <Link to="/study/redo" className="nav-button study">
                Redo wrong cards
              </Link>
              <button
                type="button"
                className="back-link"
                onClick={resetWrongCards}
              >
                Reset wrong list
              </button>
            </>
          )}
          <Link to="/study/category" className="nav-button study">
            Study another category
          </Link>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="study-page">
      <p className="study-progress">
        Card {currentIndex + 1} of {cards.length}
      </p>
      <Flashcard
        key={`${currentCard.italian}-${currentIndex}`}
        card={currentCard}
        onRight={handleRight}
        onWrong={handleWrong}
      />
      <Link to="/study/category" className="back-link">
        ← Back to categories
      </Link>
    </div>
  );
}
