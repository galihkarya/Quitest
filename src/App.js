import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/';
import Login from './pages/login/';
import Quiz from './pages/quiz';
import Result from './pages/result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
