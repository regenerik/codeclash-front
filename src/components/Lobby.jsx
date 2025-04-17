// src/components/Lobby.jsx
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import socket from '../socket'

export default function Lobby() {
  const [rooms, setRooms] = useState([])
  const roomsRef = useRef([])
  const [name, setName] = useState('')
  const [diff, setDiff] = useState('fácil')
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleRoomsList = ({ rooms }) => {
      console.log('📥 [Lobby] rooms_list', rooms)
      setRooms(rooms)
      roomsRef.current = rooms
    }
    const handleRoomCreated = (room) => {
      console.log('📥 [Lobby] room_created', room)
      navigate(`/room/${room.id}`, { state: { ...room, isHost: true } })
    }
    const handleJoinedRoom = ({ room_id }) => {
      const r = roomsRef.current.find(r => r.id === room_id)
      console.log('📥 [Lobby] joined_room', r)
      if (r) navigate(`/room/${room_id}`, { state: { ...r, isHost: false } })
    }
    const handleError = ({ msg }) => alert(msg)

    socket.on('rooms_list',    handleRoomsList)
    socket.on('room_created',  handleRoomCreated)
    socket.on('joined_room',   handleJoinedRoom)
    socket.on('error',         handleError)

    // Cada vez que entras al Lobby, pide el estado actual
    socket.emit('list_rooms')

    return () => {
      socket.off('rooms_list',    handleRoomsList)
      socket.off('room_created',  handleRoomCreated)
      socket.off('joined_room',   handleJoinedRoom)
      socket.off('error',         handleError)
    }
  }, [navigate])

  const createRoom = () => {
    if (!name.trim()) return alert('Tenés que poner un nombre.')
    socket.emit('create_room', {
      name,
      difficulty: diff,
      password: pwd || null
    })
    setName('')
    setPwd('')
  }
  const join = (r) => {
    if (r.count >= 2) return
    let pass = r.hasPassword ? prompt('Contraseña:') : null
    if (r.hasPassword && pass === null) return
    socket.emit('join_room', { room_id: r.id, password: pass })
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Lobby CodeClash</h1>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Nombre de la sala"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select
          value={diff}
          onChange={e => setDiff(e.target.value)}
          style={{ marginRight: 10 }}
        >
          <option>fácil</option>
          <option>medio</option>
          <option>difícil</option>
        </select>
        <input
          placeholder="Clave (opcional)"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={createRoom}>Crear sala</button>
      </div>
      <ul>
        {rooms.map(r => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <span style={{
              color:   r.count < 2 ? 'green' : 'red',
              fontSize:'1.2em',
              marginRight: 6
            }}>●</span>
            {r.count}/2 — <strong>{r.name}</strong> ({r.difficulty})
            {r.hasPassword && ' 🔒'}
            <button
              onClick={() => join(r)}
              disabled={r.count >= 2}
              style={{ marginLeft: 10 }}
            >
              {r.count >= 2 ? 'Llena' : 'Entrar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
