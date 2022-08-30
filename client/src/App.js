import React from 'react';
import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react'

const socket = io.connect('http://localhost:3001')

const App = () => {
  const [room, setRoom] = useState('');

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room) {
      socket.emit('join_room', room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", {message, room});
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])
  
  return (
    <div className='App'>
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder='Room number...' 
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message...' 
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  )
}

export default App