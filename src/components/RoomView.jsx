import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import socket from '../socket'

export default function RoomView() {
  const { id } = useParams()
  const { state } = useLocation()
  const { difficulty, isHost } = state || {}
  const navigate = useNavigate()

  const goBack = () => {
    // Solo los invitados salen de la sala
    if (!isHost) {
      socket.emit('leave_room', { room_id: id })
    }
    navigate('/')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🎮 Sala {id}</h2>
      <p>Dificultad: <strong>{difficulty}</strong></p>
      <p>{isHost ? 'Vos sos el creador' : 'Estás invitado'}</p>
      <button onClick={goBack}>Volver al Lobby</button>
      {/* Aquí irán Ready, Chat, Editor… */}
    </div>
  )
}