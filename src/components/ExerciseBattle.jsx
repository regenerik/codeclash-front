// src/components/ExerciseBattle.jsx
import React, { useState, useEffect } from 'react'
import socket from '../socket'

export default function ExerciseBattle({ roomId, username }) {
  // Ejercicio hardcodeado; después podés cargar dinámicamente
  const [exercise] = useState({
    title: 'Ejercicio: suma de números',
    description: 'Implementá la función `sum(a, b)` que devuelva la suma de ambos.'
  })
  const [ownCode, setOwnCode] = useState('')
  const [partnerCode, setPartnerCode] = useState('')
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    // Actualizaciones del otro
    socket.on('code_updated', ({ username: u, code }) => {
      if (u !== username) setPartnerCode(code)
    })
    // Cuando ambos terminen
    socket.on('both_finished', ({ solutions }) => {
      console.log('Ambos terminaron:', solutions)
      // Podés redirigir o mostrar resultado aquí
    })
    return () => {
      socket.off('code_updated')
      socket.off('both_finished')
    }
  }, [username])

  const onOwnChange = e => {
    const code = e.target.value
    setOwnCode(code)
    socket.emit('update_code', { room_id: roomId, username, code })
  }

  const onFinish = () => {
    setFinished(true)
    socket.emit('submit_solution', { room_id: roomId, username, code: ownCode })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <textarea
          value={ownCode}
          onChange={onOwnChange}
          disabled={finished}
          placeholder="// tu código aquí"
          style={{ flex: 1, height: 300, fontFamily: 'monospace' }}
        />
        <textarea
          value={partnerCode}
          readOnly
          placeholder="// código del rival"
          style={{
            flex: 1,
            height: 300,
            fontFamily: 'monospace',
            filter: 'blur(4px)'
          }}
        />
      </div>
      <button onClick={onFinish} disabled={finished} style={{ marginTop: 10 }}>
        {finished ? 'Esperando oponente...' : 'Terminé'}
      </button>
    </div>
  )
}
