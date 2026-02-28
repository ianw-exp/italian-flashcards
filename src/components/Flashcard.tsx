import { useState } from "react";
import type { Flashcard as FlashcardType } from "../data/flashcards";

interface FlashcardProps {
  card: FlashcardType;
  onRight: () => void;
  onWrong: () => void;
}

export function Flashcard({ card, onRight, onWrong }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    // Only flip from front to back; prevent accidental re-flip.
    if (!flipped) setFlipped(true);
  };

  const handleRight = (e: React.MouseEvent) => {
    // Keep the click from bubbling to the card and flipping it again.
    e.stopPropagation();
    onRight();
  };

  const handleWrong = (e: React.MouseEvent) => {
    // Keep the click from bubbling to the card and flipping it again.
    e.stopPropagation();
    onWrong();
  };

  return (
    <div className="flashcard-container">
      <button
        type="button"
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
        aria-label={flipped ? "Show Italian" : "Show English"}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <span className="flashcard-text">{card.italian}</span>
            {!flipped && <span className="flashcard-hint">Click to flip</span>}
          </div>
          <div className="flashcard-back">
            <span className="flashcard-text">{card.english}</span>
            {flipped && (
              // Actions live inside the back of the card once it's flipped.
              <div className="flashcard-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="flashcard-btn right"
                  onClick={handleRight}
                  aria-label="I got it right"
                >
                  ✅ Right
                </button>
                <button
                  type="button"
                  className="flashcard-btn wrong"
                  onClick={handleWrong}
                  aria-label="I got it wrong"
                >
                  ❌ Wrong
                </button>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
