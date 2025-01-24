import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import QuestionnairePage from "./components/QuestionnairePage";
import Loading from "./components/LoadingPage";
import Result from "./components/Result";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/loading" element={<Loading/>} />
        <Route path="/result" element={<Result/>} />
      </Routes>
    </Router>
  );
}

export default App;
