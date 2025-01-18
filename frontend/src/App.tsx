import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [messages, setMessages] = useState(['welcome to anom.ly!']);
  const wsRef = useRef();

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({
        type: 'join',
        payload: {
          roomId: 'red'
        }
      }))
    }

    newSocket.onmessage = (message) => {
      console.log('Message Received: ', message.data);
      setMessages(m => [...m, message.data])
    }

    wsRef.current = newSocket;

    return () => {
      newSocket.close()
    }

  }, [])

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='h-2/3 w-[580px] bg-[#C5BAFF] rounded-xl border-4 border-[#9884fc]'>
        <h2 className='text-[#9884fc] font-bold text-xl pt-4'>Anom.ly</h2>
        <div className='h-4/5 bg-[#FBFBFB] mx-4 my-2 rounded-xl '>
        {messages.map((message, index) => (
          <div className="flex flex-col" key={index}>
            <span
              className={`p-3 rounded-xl m-2 ${
                index % 2 === 0 ? 'bg-[#9884fc]' : 'bg-[#fcd484]'
              }`}
            >
              {message}
            </span>
          </div>
        ))}
        </div>
        <div className='w-full flex px-4'>
          <input id='message' type="text" className='flex-1 rounded-xl mr-2' />
          <button className='bg-purple-500 text-white p-4 rounded-xl font-semibold' onClick={
            () => {
              const message = document.getElementById('message')?.value;
              wsRef.current.send(JSON.stringify({
                type: 'chat',
                payload: {
                  message: message
                }
              }))
            }
          }>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
