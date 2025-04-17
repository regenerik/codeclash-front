import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import socket from '../socket'

export default function RoomView() {
  const { id } = useParams()
  const { state } = useLocation() || {}
  const {
    roomName = `Sala ${id}`,
    difficulty,
    participants: initialParticipants = [],
    isHost
  } = state || {}
  const [participants, setParticipants] = useState(initialParticipants)
  const navigate = useNavigate()

  useEffect(() => {
    // Escucho actualizaciones
    const handler = ({ participants }) => {
      setParticipants(participants)
    }
    socket.on('update_participants', handler)

    return () => {
      socket.off('update_participants', handler)
    }
  }, [])

  const goBack = () => {
    // tanto host como invitado emiten leave_room
    socket.emit('leave_room', { room_id: id })
    navigate('/')
  }

  return (
    <div style={{ padding:20 }}>
      <h2>🎮 Sala: {roomName}</h2>
      <h6>Número de sala: {id}</h6>
      <p>Dificultad: <strong>{difficulty}</strong></p>

      <h3>Jugadores conectados:</h3>
      <ul>
        {participants.length > 0
          ? participants.map((u,i) => <li key={i}>{u}</li>)
          : <li>(esperando jugadores…)</li>
        }
      </ul>

      <p>{isHost ? 'Vos sos el creador' : 'Estás invitado'}</p>
      <button onClick={goBack}>Volver al Lobby</button>
    </div>
  )
}
