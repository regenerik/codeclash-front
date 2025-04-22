import React, { useState, useEffect } from 'react'
import socket from '../socket'

export default function MatchControl({ roomId, username, isHost, participants, onGameStart }) {
  const [timer, setTimer] = useState(5)
  const [readyStatus, setReadyStatus] = useState({})
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    socket.on('timer_updated', ({ minutes }) => setTimer(minutes))
    socket.on('ready_updated', ({ username: u, ready }) => setReadyStatus(prev => ({ ...prev, [u]: ready })))
    socket.on('start_countdown', ({ seconds }) => {
      console.log('[MatchControl] start_countdown llegó al cliente:', seconds)
      setCountdown(seconds)
    })
    socket.on('cancel_countdown', () => setCountdown(null))
    socket.on('game_started', ({ battleMinutes }) => {
      console.log('[MatchControl] game_started llegó al cliente:', battleMinutes)
      onGameStart?.(battleMinutes)
    })

    return () => {
      socket.off('timer_updated')
      socket.off('ready_updated')
      socket.off('start_countdown')
      socket.off('cancel_countdown')
      socket.off('game_started')
    }
  }, [onGameStart])

  useEffect(() => {
    if (countdown == null) return
    if (countdown <= 0) {
      onGameStart?.(timer)
      setCountdown(null)
      return
    }
    const t = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, onGameStart, timer])

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
    <div style={{ border: '1px solid #555', padding: 12, marginTop: 20, borderRadius: 8, maxWidth: 500, background: '#2d3748' }}>
      <div>
        <strong style={{ color: '#fff' }}>Tiempo de partida:</strong>{' '}
        {isHost
          ? (
            <select
              value={timer}
              onChange={handleTimerChange}
              style={{ background: '#374151', color: '#fff', border: '1px solid #555', borderRadius: 4, padding: '4px 8px' }}
            >
              {[5, 10, 15, 20].map(v => <option key={v} value={v}>{v} min</option>)}
            </select>
          )
          : <span style={{ color: '#fff' }}>{timer} min</span>
        }
      </div>
      <div style={{ marginTop: 10 }}>
        {participants.map(u => (
          <div key={u} style={{ color: '#fff' }}>{u} {readyStatus[u] ? '✔️' : '❌'}</div>
        ))}
      </div>
      <button
        onClick={toggleReady}
        style={{ marginTop: 10, background: '#374151', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        {readyStatus[username] ? 'Todavía no' : 'Estoy list@'}
      </button>
      {countdown != null && (
        <div style={{ marginTop: 10, fontSize: '1.2em', color: '#fff' }}>
          Comienza en: {countdown}...
        </div>
      )}
    </div>
  )
}