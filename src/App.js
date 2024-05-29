import Chat from './pages/Chat';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:id" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
