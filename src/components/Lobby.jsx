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
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleRoomsList = ({ rooms }) => {
      console.log('📥 [Lobby] rooms_list', rooms)
      setRooms(rooms)
      roomsRef.current = rooms
    }
    const handleRoomCreated = ({ id, roomName, difficulty, participants }) => {
      const [creator] = participants
      navigate(`/room/${id}`, {
        state: { roomName, difficulty, participants, isHost: true,username: creator }
      })
    }
    const handleError = ({ msg }) => alert(msg)

    socket.on('rooms_list', handleRoomsList)
    socket.on('room_created', handleRoomCreated)
    socket.on('error', handleError)
    socket.emit('list_rooms')

    return () => {
      socket.off('rooms_list', handleRoomsList)
      socket.off('room_created', handleRoomCreated)
      socket.off('error', handleError)
    }
  }, [navigate])

  const createRoom = () => {
    if (!name.trim()) return alert('Tenés que poner un nombre.')
    socket.emit('create_room', {
      name,
      difficulty: diff,
      password: pwd || null,
      username: user
    })
    setName('')
    setPwd('')
  }

  const join = (r) => {
    if (r.count >= 2) return
    const username = prompt('Tu nombre de usuario:')
    if (!username) return
    const pass = r.hasPassword ? prompt('Contraseña:') : null
    if (r.hasPassword && pass === null) return
    // socket.emit('join_room', { room_id: r.id, password: pass, username })
    // navigate(`/room/${r.id}`, {
    //   state: {
    //     roomName: r.name,
    //     difficulty: r.difficulty,
    //     participants: [...(Array.isArray(r.participants) ? r.participants : []), username],
    //     isHost: false,
    //     username
    //   }
    // })
    socket.emit(
      'join_room',
      { room_id: r.id, password: pass, username },
      (res) => {           // callback
        if (res.success) {
          navigate(`/room/${r.id}`, { state: {
            roomName: r.name,
            difficulty: r.difficulty,
            participants: [...r.participants, username],
            isHost: false,
            username
          }})
        }
      }
    )
  }

  const handlerGoToNewLobby = () =>{
    navigate('/lobbysection')
  }
  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Lobby CodeClash</h1>
      <button onClick={handlerGoToNewLobby}>ir al nuevo lobby</button>
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
          placeholder="Tu nombre de usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Clave (opcional)"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={createRoom}>Crear sala</button>
      </div>
      <ul>
        {rooms.map(r => {
          const parts = Array.isArray(r.participants) ? r.participants : []
          return (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <span
                style={{
                  color: r.count < 2 ? 'green' : 'red',
                  fontSize: '1.2em',
                  marginRight: 6
                }}
              >
                ●
              </span>
              {r.count === 2
                ? `${parts[0] || '?'} vs ${parts[1] || '?'}`
                : `${r.count}/2 — ${r.name}`}
              <span style={{ marginLeft: 8, fontStyle: 'italic' }}>
                [dificultad: {r.difficulty}]
              </span>
              {r.hasPassword && (
                <span style={{ marginLeft: 8 }}>🔒</span>
              )}
              <button
                onClick={() => join(r)}
                disabled={r.count >= 2}
                style={{ marginLeft: 10 }}
              >
                {r.count >= 2 ? 'Llena' : 'Entrar'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
