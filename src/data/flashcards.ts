/**
 * Flashcard data: Italian → English, grouped by category.
 * Each card has italian, english, category, and quiz (for multiple-choice options).
 */
export interface QuizOption {
  type: "multiple-choice";
  options: [string, string, string, string]; // 1 correct + 3 distractors
}

export interface Flashcard {
  category: "animals" | "food" | "verbs";
  italian: string;
  english: string;
  quiz: QuizOption;
}

export const flashcards: Flashcard[] = [
  // Animals
  {
    category: "animals",
    italian: "il gatto",
    english: "the cat",
    quiz: {
      type: "multiple-choice",
      options: ["the dog", "the house", "the cat", "the bird"],
    },
  },
  {
    category: "animals",
    italian: "il cane",
    english: "the dog",
    quiz: {
      type: "multiple-choice",
      options: ["the cat", "the dog", "the fish", "the horse"],
    },
  },
  {
    category: "animals",
    italian: "l'uccello",
    english: "the bird",
    quiz: {
      type: "multiple-choice",
      options: ["the bird", "the snake", "the mouse", "the cow"],
    },
  },
  {
    category: "animals",
    italian: "il pesce",
    english: "the fish",
    quiz: {
      type: "multiple-choice",
      options: ["the cat", "the bird", "the fish", "the dog"],
    },
  },
  // Food
  {
    category: "food",
    italian: "la mela",
    english: "the apple",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the apple", "the milk", "the cheese"],
    },
  },
  {
    category: "food",
    italian: "il pane",
    english: "the bread",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the water", "the pasta", "the rice"],
    },
  },
  {
    category: "food",
    italian: "l'acqua",
    english: "the water",
    quiz: {
      type: "multiple-choice",
      options: ["the wine", "the water", "the coffee", "the juice"],
    },
  },
  {
    category: "food",
    italian: "il formaggio",
    english: "the cheese",
    quiz: {
      type: "multiple-choice",
      options: ["the cheese", "the meat", "the butter", "the egg"],
    },
  },
  // Verbs
  {
    category: "verbs",
    italian: "mangiare",
    english: "to eat",
    quiz: {
      type: "multiple-choice",
      options: ["to drink", "to eat", "to sleep", "to run"],
    },
  },
  {
    category: "verbs",
    italian: "bere",
    english: "to drink",
    quiz: {
      type: "multiple-choice",
      options: ["to eat", "to drink", "to cook", "to read"],
    },
  },
  {
    category: "verbs",
    italian: "dormire",
    english: "to sleep",
    quiz: {
      type: "multiple-choice",
      options: ["to sleep", "to wake", "to work", "to play"],
    },
  },
  {
    category: "verbs",
    italian: "leggere",
    english: "to read",
    quiz: {
      type: "multiple-choice",
      options: ["to write", "to read", "to speak", "to listen"],
    },
  },
];

export const CATEGORIES = ["animals", "food", "verbs"] as const;
export type Category = (typeof CATEGORIES)[number];

export function getCardsByCategory(category: Category): Flashcard[] {
  return flashcards.filter((c) => c.category === category);
}
