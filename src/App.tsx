
import './App.css'

import Start from './components/Start';
import Devices from './components/Devices';
import User from './components/User';
import Chat from './components/Chat';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { StompSessionProvider } from 'react-stomp-hooks';
// import ChangeListener from './components/websockets/ChangeListener';
// import HueComponent from './components/HueComponent';

function App() {
  
  const NavigationButtons = () => {
    const navigate = useNavigate(); // Använd useNavigate för att navigera
  
    return (
      <div>
        <button onClick={() => navigate('/start')}>Start</button>
        <button onClick={() => navigate('/devices')}>Devices</button>
        <button onClick={() => navigate('/user')}>User</button>
        <button onClick={() => navigate('/chat')}>Chat</button>
      </div>
    );
  };

  return (
      <>
    <Router>
    <div>
      <h1>Home Controller</h1>
      <NavigationButtons/>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/user" element={<User />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App
