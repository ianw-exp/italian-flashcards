import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CategorySelectionPage } from "./pages/CategorySelectionPage";
import { StatsPage } from "./pages/StatsPage";
import { StudyPage } from "./pages/StudyPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study/category" element={<CategorySelectionPage />} />
        <Route path="/quiz/category" element={<CategorySelectionPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Placeholder routes for Phase 2+ (study/quiz per category) */}
        <Route path="/study/:category" element={<StudyPage />} />
        <Route path="/quiz/:category" element={<div>Quiz session — Phase 4</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
