import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/';
import Login from './pages/login/';
import Quiz from './pages/quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
