/**
 * Stats context: per-category correct/incorrect counts for study and quiz.
 * Persisted in localStorage so stats survive refresh; StudyPage, RedoStudyPage, and QuizPage call recordAnswer.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Category } from "../data/flashcards";
import { CATEGORIES } from "../data/flashcards";

const STORAGE_KEY = "italian-flashcards-stats";

export interface CategoryStats {
  correct: number;
  incorrect: number;
}

export type Stats = Record<Category, CategoryStats>;

function defaultStats(): Stats {
  return Object.fromEntries(
    CATEGORIES.map((c) => [c, { correct: 0, incorrect: 0 }])
  ) as Stats;
}

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw) as Record<string, { correct: number; incorrect: number }>;
    const stats = defaultStats();
    for (const cat of CATEGORIES) {
      if (parsed[cat]) {
        stats[cat] = {
          correct: Math.max(0, Number(parsed[cat].correct) || 0),
          incorrect: Math.max(0, Number(parsed[cat].incorrect) || 0),
        };
      }
    }
    return stats;
  } catch {
    return defaultStats();
  }
}

function saveStats(stats: Stats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage errors
  }
}

interface StatsContextValue {
  stats: Stats;
  /** Record one correct or incorrect answer for a category (study or quiz). */
  recordAnswer: (category: Category, correct: boolean) => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>(defaultStats);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const recordAnswer = useCallback((category: Category, correct: boolean) => {
    setStats((prev) => {
      const next = { ...prev };
      next[category] = { ...next[category] };
      if (correct) {
        next[category].correct += 1;
      } else {
        next[category].incorrect += 1;
      }
      saveStats(next);
      return next;
    });
  }, []);

  return (
    <StatsContext.Provider value={{ stats, recordAnswer }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats(): StatsContextValue {
  const ctx = useContext(StatsContext);
  if (!ctx) {
    throw new Error("useStats must be used within StatsProvider");
  }
  return ctx;
}
