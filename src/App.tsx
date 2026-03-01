import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WrongCardsProvider } from "./context/WrongCardsContext";
import { HomePage } from "./pages/HomePage";
import { CategorySelectionPage } from "./pages/CategorySelectionPage";
import { QuizPage } from "./pages/QuizPage";
import { QuizSelectionPage } from "./pages/QuizSelectionPage";
import { RedoStudyPage } from "./pages/RedoStudyPage";
import { StatsPage } from "./pages/StatsPage";
import { StudyPage } from "./pages/StudyPage";
import "./App.css";

function App() {
  return (
    <WrongCardsProvider>
      <BrowserRouter>
        <Routes>
          {/* Entry points for study/quiz flows */}
          <Route path="/" element={<HomePage />} />
          <Route path="/study/category" element={<CategorySelectionPage />} />
          <Route path="/quiz/category" element={<QuizSelectionPage />} />
          <Route path="/stats" element={<StatsPage />} />
          {/* Redo route must come before /study/:category so "redo" is not a category param */}
          <Route path="/study/redo" element={<RedoStudyPage />} />
          <Route path="/study/:category" element={<StudyPage />} />
          <Route path="/quiz/:category/:quizType" element={<QuizPage />} />
        </Routes>
      </BrowserRouter>
    </WrongCardsProvider>
  );
}

export default App;
