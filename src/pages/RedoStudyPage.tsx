import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Flashcard } from "../components/Flashcard";
import { useWrongCards } from "../context/WrongCardsContext";
import type { Flashcard as FlashcardType } from "../data/flashcards";

/**
 * Study session that shows only cards marked wrong in the previous round.
 * Reuses the same Flashcard component as category study.
 */
export function RedoStudyPage() {
  const { wrongCards, setWrongCardsFromSession } = useWrongCards();
  const [sessionCards, setSessionCards] = useState<FlashcardType[]>([]);
  const [wrongThisRound, setWrongThisRound] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const skipInitRef = useRef(false);

  // Start redo session with a copy of the stored wrong cards when entering the page.
  // Skip when we just completed a redo (we updated context from this page).
  useEffect(() => {
    if (skipInitRef.current) {
      skipInitRef.current = false;
      return;
    }
    setSessionCards([...wrongCards]);
    setWrongThisRound([]);
    setCurrentIndex(0);
  }, [wrongCards]);

  const cards = sessionCards;
  const currentCard = cards[currentIndex];
  const isComplete = cards.length === 0 || currentIndex >= cards.length;

  const handleRight = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleWrong = () => {
    if (currentCard) {
      setWrongThisRound((prev) => [...prev, currentCard]);
    }
    setCurrentIndex((i) => i + 1);
  };

  // When redo session completes, update context so next redo (or summary) uses this round's wrong list.
  useEffect(() => {
    if (isComplete && cards.length > 0) {
      skipInitRef.current = true;
      setWrongCardsFromSession(wrongThisRound);
    }
  }, [isComplete, cards.length, wrongThisRound, setWrongCardsFromSession]);

  if (cards.length === 0 && wrongCards.length === 0) {
    return (
      <div className="study-page">
        <h1>Redo wrong cards</h1>
        <p>No wrong cards to redo. Complete a study session and mark some as wrong first.</p>
        <Link to="/study/category" className="nav-button study">
          Study a category
        </Link>
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <p>No cards in this redo set.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="study-page study-complete">
        <h1>Redo complete</h1>
        <p>
          You reviewed {cards.length} card{cards.length !== 1 ? "s" : ""}.
          {wrongThisRound.length > 0 && (
            <> {wrongThisRound.length} still marked as wrong.</>
          )}
        </p>
        <div className="study-complete-actions">
          {wrongThisRound.length > 0 && (
            <Link to="/study/redo" className="nav-button study">
              Redo wrong cards again
            </Link>
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
      <h1>Redo wrong cards</h1>
      <p className="study-progress">
        Card {currentIndex + 1} of {cards.length}
      </p>
      <Flashcard
        key={`${currentCard.italian}-${currentIndex}`}
        card={currentCard}
        onRight={handleRight}
        onWrong={handleWrong}
      />
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}
