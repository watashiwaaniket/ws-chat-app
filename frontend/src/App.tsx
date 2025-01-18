import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection Established');
    }

    newSocket.onmessage = (message) => {
      console.log('Message Received: ', message.data);
    }

    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      <div>
        <p>hello there</p>
      </div>
    </>
  )
}

export default App
