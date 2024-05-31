import Chat from './pages/Chat';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import EndedChat from './pages/EndedChats';
import Activity from './pages/Activity';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:id" element={<Chat />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/endedChats" element={<EndedChat />} />
      </Routes>
    </Router>
  );
}

export default App;
