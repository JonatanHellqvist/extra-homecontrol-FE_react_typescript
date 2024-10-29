import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start';
import Devices from './components/Devices';
import User from './components/User';
import Chat from './components/Chat';

function App() {
  
  const [admin, setAdmin] = useState<boolean>(false);
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    setAdmin(false);
  }, [])

  useEffect(() => {

    let pageUrl = page;

      if (!pageUrl) {
      
        const queryParams = new URLSearchParams(window.location.search);
        const getUrl = queryParams.get("page");
    
        if (getUrl) {
          pageUrl = getUrl;
          setPage(getUrl);
        } else {
          pageUrl = "start";
      } 
    } 

    window.history.pushState(
      null,
      "",
      "?page=" + pageUrl
    )
  }, [page])

  return (
    <>
    
    
    <h1>Home Controller</h1>
    <button onClick={() => setPage("start")}>Start</button>
    <button onClick={() => setPage("devices")}>Devices</button>
    <button onClick={() => setPage("user")}>User</button>
    <button onClick={() => setPage("chat")}>Chat</button>
    {/* <StompSessionProvider url={"http://localhost:8080/websocket"} >
    <ChangeListener/>
    </StompSessionProvider> */}
    {/* loginform / registerform /logoutform*/}
    {admin ? <button>Admin</button> : null}

    {/* <div>Page : {page}</div> */}
     {/* <HueDeviceList /> */}
    {
      {
        "start":<Start />,
        "devices":<Devices />,
        "user":<User />,
        "chat": <Chat />
      } [page]
    }


    </>
  )
}

export default App
