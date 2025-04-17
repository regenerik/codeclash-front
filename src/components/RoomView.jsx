// src/components/RoomView.jsx
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
    // 1) Escucho actualizaciones de lista
    const updateHandler = ({ participants }) => {
      setParticipants(participants)
    }
    socket.on('update_participants', updateHandler)

    // 2) Escucho si borran la sala
    const deletedHandler = ({ room_id }) => {
        if (String(room_id) === id) {
          alert('La sala fue eliminada. Volviendo al Lobby.')
          navigate('/')
        }
      }
    socket.on('room_deleted', deletedHandler)

    return () => {
      socket.off('update_participants', updateHandler)
      socket.off('room_deleted', deletedHandler)
    }
  }, [id, navigate])

  const goBack = () => {
    // TANTO host como invitado emiten leave_room
    socket.emit('leave_room', { room_id: id })
    navigate('/')
  }

  const deleteRoom = () => {
    if (window.confirm('¿Estás seguro que querés eliminar esta sala?')) {
      socket.emit('delete_room', { room_id: id })
      // la instancia de room_deleted también te llevará al lobby
    }
  }

  return (
    <div style={{ padding:20 }}>
      <h2 style={{ display:'inline' }}>🎮 Sala: {roomName}</h2>
      {isHost && (
        <button
          onClick={deleteRoom}
          title="Eliminar sala"
          style={{
            marginLeft:12,
            background:'none',
            border:'none',
            cursor:'pointer',
            fontSize:'1.2em',
            color:'#c00'
          }}
        >
          🗑️
        </button>
      )}
      <h6>Número de sala: {id}</h6>
      <p>Dificultad: <strong>{difficulty}</strong></p>

      <h3>Jugadores conectados:</h3>
      <ul>
        {participants.length > 0
          ? participants.map((u, i) => <li key={i}>{u}</li>)
          : <li>(esperando jugadores…)</li>
        }
      </ul>

      <p>{isHost ? 'Vos sos el creador' : 'Estás invitado'}</p>
      <button onClick={goBack}>Volver al Lobby</button>
    </div>
  )
}
