import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Flashcard } from "../data/flashcards";

interface WrongCardsContextValue {
  /** Cards marked wrong in the last completed study session (used for redo). */
  wrongCards: Flashcard[];
  /** Store the wrong cards from a finished study session so user can redo them. */
  setWrongCardsFromSession: (cards: Flashcard[]) => void;
  /** Clear the stored wrong list so redo is no longer offered until next session. */
  resetWrongCards: () => void;
}

const WrongCardsContext = createContext<WrongCardsContextValue | null>(null);

export function WrongCardsProvider({ children }: { children: ReactNode }) {
  const [wrongCards, setWrongCards] = useState<Flashcard[]>([]);

  const setWrongCardsFromSession = useCallback((cards: Flashcard[]) => {
    setWrongCards(cards);
  }, []);

  const resetWrongCards = useCallback(() => {
    setWrongCards([]);
  }, []);

  return (
    <WrongCardsContext.Provider
      value={{
        wrongCards,
        setWrongCardsFromSession,
        resetWrongCards,
      }}
    >
      {children}
    </WrongCardsContext.Provider>
  );
}

export function useWrongCards(): WrongCardsContextValue {
  const ctx = useContext(WrongCardsContext);
  if (!ctx) {
    throw new Error("useWrongCards must be used within WrongCardsProvider");
  }
  return ctx;
}
