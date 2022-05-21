import { useEffect, useState, useRef } from "react";
import socketClient from 'socket.io-client'
import Chat from "./components/Chat";
import Login from "./components/Login";

const ENDPOINT = "http://127.0.0.1:3001";
export const socket = socketClient(ENDPOINT)

function App() {

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');


  useEffect(() => {
    if(logged) {
      socket.emit('join', username);
    }
  }, [logged]);

  return (
    <>
      {logged ? <Chat user={username}/> : <Login login={setLogged} setUser={setUsername} />}
    </>
  );
}

export default App;
