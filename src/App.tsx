import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WrongCardsProvider } from "./context/WrongCardsContext";
import { HomePage } from "./pages/HomePage";
import { CategorySelectionPage } from "./pages/CategorySelectionPage";
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
          <Route path="/quiz/category" element={<CategorySelectionPage />} />
          <Route path="/stats" element={<StatsPage />} />
          {/* Redo route must come before /study/:category so "redo" is not a category param */}
          <Route path="/study/redo" element={<RedoStudyPage />} />
          <Route path="/study/:category" element={<StudyPage />} />
          <Route path="/quiz/:category" element={<div>Quiz session — Phase 4</div>} />
        </Routes>
      </BrowserRouter>
    </WrongCardsProvider>
  );
}

export default App;
