import React, { useState, useEffect, useRef } from 'react'
import socket from '../socket'

export default function Chat({ roomId, username }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const boxRef = useRef()

  useEffect(() => {
    console.log('🔌 Chat montado en sala', roomId, 'como', username)
    const onNewMsg = (data) => {
      console.log('📥 new_message', data)
      setMessages((prev) => [...prev, data])
      setTimeout(() => {
        if (boxRef.current) {
          boxRef.current.scrollTop = boxRef.current.scrollHeight
        }
      }, 50)
    }
    socket.on('new_message', onNewMsg)
    return () => socket.off('new_message', onNewMsg)
  }, [roomId, username])

  const send = () => {
    if (!input.trim()) return
    socket.emit('send_message', {
      room_id: roomId,
      username,
      message: input
    })
    setInput('')
  }

  const onKey = (e) => { if (e.key === 'Enter') send() }

  return (
    <div style={{
      border: '1px solid #555',
      borderRadius: 8,
      width: '100%',
      maxWidth: 500,
      height: 350,
      display: 'flex',
      flexDirection: 'column',
      background: '#374151',
      marginTop: 20
    }}>
      <div
        ref={boxRef}
        style={{
          flex: 1,
          padding: 12,
          overflowY: 'auto',
          fontSize: '0.9em',
          background: '#2d3748',
          borderRadius: 4,
          margin: 10,
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
          color: '#fff'
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: '#bbb', textAlign: 'center' }}>No hay mensajes aún.</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong style={{ color: '#fff' }}>{m.username}:</strong>
              <span style={{ marginLeft: 6, color: '#fff' }}>{m.message}</span>
            </div>
          ))
        )}
      </div>
      <div style={{
        display: 'flex',
        padding: '0 10px 10px',
        alignItems: 'center',
        background: '#374151'
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Escribí algo..."
          style={{
            flex: 1,
            padding: 8,
            background: '#2d3748',
            border: '1px solid #555',
            borderRadius: 4,
            marginRight: 6,
            color: '#fff'
          }}
        />
        <button
          onClick={send}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: 4,
            background: '#28a745',
            color: 'white',
            cursor: 'pointer'
          }}
        >Enviar</button>
      </div>
    </div>
  )
}