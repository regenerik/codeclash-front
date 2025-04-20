// src/components/MatchControl.jsx
import React, { useState, useEffect } from 'react'
import socket from '../socket'

export default function MatchControl({ roomId, username, isHost, participants }) {
  const [timer, setTimer] = useState(5)
  const [readyStatus, setReadyStatus] = useState({})
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    socket.on('timer_updated', ({ minutes }) => setTimer(minutes))
    socket.on('ready_updated', ({ username: u, ready }) => {
      setReadyStatus(prev => ({ ...prev, [u]: ready }))
    })
    socket.on('start_countdown', ({ seconds }) => setCountdown(seconds))
    socket.on('cancel_countdown', () => setCountdown(null))
    return () => {
      socket.off('timer_updated')
      socket.off('ready_updated')
      socket.off('start_countdown')
      socket.off('cancel_countdown')
    }
  }, [])

  // countdown local
  useEffect(() => {
    if (countdown == null) return
    if (countdown <= 0) return setCountdown(null)
    const t = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleTimerChange = e => {
    const m = Number(e.target.value)
    setTimer(m)
    socket.emit('change_timer', { room_id: roomId, minutes: m })
  }

  const toggleReady = () => {
    const newReady = !readyStatus[username]
    setReadyStatus(prev => ({ ...prev, [username]: newReady }))
    socket.emit('toggle_ready', { room_id: roomId, ready: newReady })
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, marginTop: 20, borderRadius: 8, maxWidth: 500 }}>
      <div>
        <strong>Tiempo de partida:</strong>{' '}
        {isHost
          ? <select value={timer} onChange={handleTimerChange}>
              {[5, 10, 15, 20].map(v => <option key={v} value={v}>{v} min</option>)}
            </select>
          : <span>{timer} min</span>
        }
      </div>
      <div style={{ marginTop: 10 }}>
        {participants.map(u =>
          <div key={u}>{u} {readyStatus[u] ? '✔️' : '❌'}</div>
        )}
      </div>
      <button onClick={toggleReady} style={{ marginTop: 10 }}>
        {readyStatus[username] ? 'Todavía no' : 'Estoy list@'}
      </button>
      {countdown != null && (
        <div style={{ marginTop: 10, fontSize: '1.2em' }}>
          Comienza en: {countdown}...
        </div>
      )}
    </div>
  )
}
