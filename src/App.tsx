
import './App.css'

import Start from './components/Start';
import Devices from './components/Devices';
import User from './components/User';
import Chat from './components/Chat';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HueComponent from './components/HueComponent';
// import { StompSessionProvider } from 'react-stomp-hooks';
// import ChangeListener from './components/websockets/ChangeListener';
// import HueComponent from './components/HueComponent';

function App() {
  
  const NavigationButtons = () => {
    return (
      <div>
        <Link to="/start"><button>Start</button></Link>
        <Link to="/devices"><button>Devices</button></Link>
        <Link to="/user"><button>User</button></Link>
        <Link to="/chat"><button>Chat</button></Link>
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
    <div>
    <HueComponent/>
    </div>
    </>
  );
}

export default App
