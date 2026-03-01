import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useStats } from "../context/StatsContext";
import {
  getCardsByCategory,
  type Flashcard as FlashcardType,
  type Category,
  CATEGORIES,
} from "../data/flashcards";

const QUIZ_TYPES = ["multiple-choice", "fill-in-blank"] as const;
type QuizType = (typeof QUIZ_TYPES)[number];

function isValidCategory(param: string | undefined): param is Category {
  return param !== undefined && CATEGORIES.includes(param as Category);
}

function isValidQuizType(param: string | undefined): param is QuizType {
  return param !== undefined && QUIZ_TYPES.includes(param as QuizType);
}

/** Shuffle array and return a new array (Fisher–Yates). */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function QuizPage() {
  const { category, quizType } = useParams<{ category: string; quizType: string }>();
  const { recordAnswer } = useStats();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillInAnswer, setFillInAnswer] = useState("");

  if (!isValidCategory(category) || !isValidQuizType(quizType)) {
    return (
      <div className="study-page quiz-page">
        <p>Invalid quiz or category.</p>
        <Link to="/quiz/category">Choose quiz</Link>
      </div>
    );
  }

  const cards = getCardsByCategory(category);
  const currentCard = cards[index];
  const isComplete = cards.length === 0 || index >= cards.length;

  // Shuffle options once per question for multiple choice.
  const shuffledOptions = useMemo(() => {
    if (!currentCard || quizType !== "multiple-choice") return [];
    return shuffle(currentCard.quiz.options);
  }, [currentCard, quizType, index]);

  const handleMultipleChoice = (selected: string) => {
    if (feedback !== null) return;
    setSelectedOption(selected);
    const correct = selected === currentCard.english;
    recordAnswer(category as Category, correct); // Update stats for Statistics page
    setFeedback(correct ? "correct" : "wrong");
  };

  const handleFillInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback !== null) return;
    const normalized = fillInAnswer.trim().toLowerCase();
    const correct = normalized === currentCard.english.toLowerCase();
    recordAnswer(category as Category, correct); // Update stats for Statistics page
    setFeedback(correct ? "correct" : "wrong");
  };

  const goNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    setFillInAnswer("");
    setIndex((i) => i + 1);
  };

  if (cards.length === 0) {
    return (
      <div className="study-page quiz-page">
        <p>No cards in this category.</p>
        <Link to="/quiz/category">← Back to quiz selection</Link>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="study-page study-complete quiz-page">
        <h1>Quiz complete</h1>
        <p>You answered all {cards.length} question{cards.length !== 1 ? "s" : ""}.</p>
        <div className="study-complete-actions">
          <Link to="/quiz/category" className="nav-button study">
            Another quiz
          </Link>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const showNextButton = feedback !== null;

  return (
    <div className="study-page quiz-page">
      <h1>Quiz: {quizType === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"}</h1>
      <p className="study-progress">
        Question {index + 1} of {cards.length}
      </p>
      <p className="quiz-prompt" aria-label="Italian word">
        {currentCard.italian}
      </p>

      {quizType === "multiple-choice" && (
        <div className="quiz-options" role="listbox" aria-label="English options">
          {shuffledOptions.map((option) => {
            const isCorrectAnswer = option === currentCard.english;
            const isSelected = option === selectedOption;
            const showCorrect = feedback !== null && isCorrectAnswer;
            const showWrong = feedback === "wrong" && isSelected && !isCorrectAnswer;
            return (
              <button
                key={option}
                type="button"
                className={`quiz-option ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`}
                disabled={feedback !== null}
                onClick={() => handleMultipleChoice(option)}
                role="option"
                aria-selected={isSelected}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {quizType === "fill-in-blank" && (
        <form onSubmit={handleFillInSubmit} className="quiz-fill-form">
          <label htmlFor="quiz-answer" className="visually-hidden">
            Type the English translation
          </label>
          <input
            id="quiz-answer"
            type="text"
            className="quiz-input"
            value={fillInAnswer}
            onChange={(e) => setFillInAnswer(e.target.value)}
            disabled={feedback !== null}
            placeholder="Type in English..."
            autoComplete="off"
          />
          <button type="submit" className="nav-button study" disabled={feedback !== null}>
            Submit
          </button>
        </form>
      )}

      {feedback === "correct" && (
        <p className="quiz-feedback correct" role="status">
          Correct!
        </p>
      )}
      {feedback === "wrong" && (
        <p className="quiz-feedback wrong" role="status">
          Wrong — the answer was: {currentCard.english}
        </p>
      )}

      {showNextButton && (
        <button type="button" className="nav-button study" onClick={goNext}>
          Next question
        </button>
      )}

      <Link to="/quiz/category" className="back-link">
        ← Back to quiz selection
      </Link>
    </div>
  );
}
