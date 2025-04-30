// src/components/RoomView.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import socket from '../socket'
import Chat from './Chat'
import MatchControl from './MatchControl'
import ExerciseBattle from './ExerciseBattle'

export default function RoomView() {
  const { id } = useParams()
  const { state } = useLocation() || {}
  const {
    roomName = `Sala ${id}`,
    difficulty,
    participants: initialParticipants = [],
    isHost,
    username
  } = state || {}
  const [participants, setParticipants] = useState(initialParticipants)
  const [gameStarted, setGameStarted] = useState(false)
  const [battleMinutes, setBattleMinutes] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const updateHandler = ({ participants }) => {
      setParticipants(participants)
    }
    const closedHandler = (data) => {
      console.log('recibí room_deleted', data)
      const closedId = data.room_id || data.roomId
      if (String(closedId) === id) {
        alert('La sala fue cerrada. Volviendo al Lobby.')
        navigate('/')
      }
    }

    socket.on('update_participants', updateHandler)
    socket.on('room_deleted', closedHandler)

    return () => {
      socket.off('update_participants', updateHandler)
      socket.off('room_deleted', closedHandler)
    }
  }, [id, navigate])

  const handleExit = () => {
    if (isHost) {
      if (window.confirm('¿Querés cerrar la sala y volver al lobby?')) {
        socket.emit('close_room', { room_id: id })
        navigate('/')
      }
    } else {
      socket.emit('leave_room', { room_id: id })
      navigate('/')
    }
  }

  // cuando cierra pestaña / recarga
  useEffect(() => {
    const onUnload = () => {
      socket.emit('leave_room', { room_id: id })
    }
    window.addEventListener('beforeunload', onUnload)
    return () => {
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [id])

  return (
    <div style={{ padding: 20 }}>
      <h2>🎮 Sala: {roomName}</h2>
      <h6>ID: {id}</h6>
      <p>
        Dificultad: <strong>{difficulty}</strong>
      </p>
      <h3>Jugadores conectados:</h3>
      <ul>
        {participants.length > 0
          ? participants.map((u, i) => <li key={i}>{u}</li>)
          : <li>(esperando jugadores…)</li>
        }
      </ul>
      <p>{isHost ? 'Vos sos el creador' : 'Estás invitado'}</p>
      <button onClick={handleExit}>
        {isHost ? 'Cerrar y salir al lobby' : 'Volver al Lobby'}
      </button>

      {!gameStarted
        ? <MatchControl
          roomId={id}
          username={username}
          isHost={isHost}
          participants={participants}
          onGameStart={(mins) => {
            setBattleMinutes(mins)
            setGameStarted(true)
          }}
        />
        : <ExerciseBattle roomId={id} username={username} battleMinutes={battleMinutes} />
      }
      <Chat roomId={id} username={username} />
    </div>
  )
}
