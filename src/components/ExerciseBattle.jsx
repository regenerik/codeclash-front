import React, { useState, useEffect, useRef } from 'react'
import socket from '../socket'

export default function ExerciseBattle({ roomId, username, battleMinutes }) {
  // Ejercicio hardcodeado; después podés cargar dinámicamente
  const [exercise] = useState({
    title: 'Ejercicio: suma de números',
    description: 'Implementá la función `sum(a, b)` que devuelva la suma de ambos.'
  })
  const [ownCode, setOwnCode] = useState('')
  const [partnerCode, setPartnerCode] = useState('')
  const [finished, setFinished] = useState(false)
  const [opponentFinished, setOpponentFinished] = useState(false)
  const [gameResult, setGameResult] = useState(null)
  const [battleSeconds, setBattleSeconds] = useState(
    battleMinutes != null ? battleMinutes * 60 : null
  )
  const battleTimerRef = useRef(null)

  // Suscripciones socket
  useEffect(() => {
    socket.on('code_updated', ({ username: u, code }) => {
      if (u !== username) setPartnerCode(code)
    })
    socket.on('player_finished', ({ username: u }) => {
      if (u !== username) setOpponentFinished(true)
    })
    socket.on('game_started', ({ battleMinutes }) => {
      setBattleSeconds(battleMinutes * 60)
    })
    socket.on('both_finished', () => {
      clearTimeout(battleTimerRef.current)
      setBattleSeconds(null)
    })
    socket.on('game_result', ({ winner, justification }) => {
      setGameResult({ winner, justification })
    })
    return () => {
      socket.off('code_updated')
      socket.off('player_finished')
      socket.off('game_started')
      socket.off('both_finished')
      socket.off('game_result')
    }
  }, [username])

  // Sincronizar prop battleMinutes al iniciar o cambiar
  useEffect(() => {
    if (battleMinutes != null) {
      setBattleSeconds(battleMinutes * 60)
    }
  }, [battleMinutes])

  // Auto-submit al agotarse el tiempo
  useEffect(() => {
    if (battleSeconds == null) return
    if (battleSeconds <= 0) {
      if (!finished) onFinish()
      return
    }
    const t = setTimeout(() => setBattleSeconds(battleSeconds - 1), 1000)
    battleTimerRef.current = t
    return () => clearTimeout(t)
  }, [battleSeconds])

  const onOwnChange = e => {
    const code = e.target.value
    setOwnCode(code)
    socket.emit('update_code', { room_id: roomId, username, code })
  }

  const onFinish = () => {
    setFinished(true)
    socket.emit('submit_solution', { room_id: roomId, username, code: ownCode })
  }

  const formatTime = sec => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Si ya tenemos resultado, mostramos cartel y salimos
  if (gameResult) {
    return (
      <div style={{ padding: 20, border: '2px solid #28a745', borderRadius: 8, background: '#2d3748', color: '#fff' }}>
        <h2>🏆 Ganador: {gameResult.winner}</h2>
        <p>{gameResult.justification}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Mostrar cronómetro si corresponde */}
      {battleSeconds != null && (
        <div style={{ marginBottom: 10 }}>
          <strong style={{ color: '#fff' }}>Tiempo restante:</strong> {formatTime(battleSeconds)}
        </div>
      )}

      <h2 style={{ color: '#fff' }}>{exercise.title}</h2>
      <p style={{ color: '#fff' }}>{exercise.description}</p>

      {/* Tildazo si el rival terminó */}
      {opponentFinished && !finished && (
        <div style={{ color: 'green', marginBottom: 8 }}>
          ✔️ El rival terminó
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <textarea
          value={ownCode}
          onChange={onOwnChange}
          disabled={finished}
          placeholder="// tu código aquí"
          style={{
            flex: 1,
            height: 300,
            fontFamily: 'monospace',
            background: '#2d3748',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: 4,
            padding: 10
          }}
        />
        <textarea
          value={partnerCode}
          readOnly
          placeholder="// código del rival"
          style={{
            flex: 1,
            height: 300,
            fontFamily: 'monospace',
            background: '#2d3748',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: 4,
            padding: 10,
            filter: 'blur(4px)'
          }}
        />
      </div>

      <button
        onClick={onFinish}
        disabled={finished}
        style={{ marginTop: 10, background: '#374151', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        {finished ? 'Esperando oponente...' : 'Terminé'}
      </button>
    </div>
  )
}
