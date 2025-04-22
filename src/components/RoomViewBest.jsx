import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket';
import Chat from './Chat';
import MatchControl from './MatchControl';
import ExerciseBattle from './ExerciseBattle';

export default function RoomViewBest() {
  const { id } = useParams();
  const { state } = useLocation() || {};
  const {
    roomName = `Sala ${id}`,
    difficulty,
    participants: initialParticipants = [],
    isHost,
    username
  } = state || {};

  const [participants, setParticipants] = useState(initialParticipants);
  const [gameStarted, setGameStarted] = useState(false);
  const [battleMinutes, setBattleMinutes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateHandler = ({ participants }) => {
      setParticipants(participants);
    };
    const closedHandler = (data) => {
      console.log('recibí room_deleted', data);
      const closedId = data.room_id ?? data.roomId;
      if (String(closedId) === id) {
        alert('La sala fue cerrada. Volviendo al Lobby.');
        navigate('/lobbysection');
      }
    };

    socket.on('update_participants', updateHandler);
    socket.on('room_deleted', closedHandler);

    return () => {
      socket.off('update_participants', updateHandler);
      socket.off('room_deleted', closedHandler);
    };
  }, [id, navigate]);

  useEffect(() => {
    const onUnload = () => {
      socket.emit('leave_room', { room_id: id });
    };
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [id]);

  const handleExit = () => {
    if (isHost) {
      if (window.confirm('¿Querés cerrar la sala y volver al lobby?')) {
        socket.emit('close_room', { room_id: id });
        navigate('/lobbysection');
      }
    } else {
      socket.emit('leave_room', { room_id: id });
      navigate('/lobbysection');
    }
  };

  const translateDifficulty = (d) => {
    if (d === 'easy') return 'Fácil';
    if (d === 'medium') return 'Medio';
    return 'Difícil';
  };

  return (
    <div className="relative min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Efecto de código flotante */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-400 font-mono text-xs md:text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          >
            {['function','const','return','if','else','console.log','import','export','useState','useEffect'][Math.floor(Math.random()*10)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header de la sala */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{roomName}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className={`px-3 py-1 text-sm rounded-full ${
                difficulty === 'easy' ? 'bg-green-500 text-green-900' :
                difficulty === 'medium' ? 'bg-yellow-500 text-yellow-900' : 'bg-red-500 text-red-900'
              }`}>
                {translateDifficulty(difficulty)}
              </span>
              <span className="text-white">
                {participants.length} {participants.length === 1 ? 'jugador' : 'jugadores'} conectados
              </span>
            </div>
          </div>
          <button
            onClick={handleExit}
            className={`mt-4 md:mt-0 px-6 py-2 rounded-lg font-medium ${
              isHost ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
            } transition-colors duration-200`}
          >
            {isHost ? 'Cerrar sala' : 'Volver al lobby'}
          </button>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de jugadores */}
          <div className="lg:col-span-1 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Jugadores</h2>
            <div className="space-y-3">
              {participants.length > 0 ? (
                participants.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-white">{p}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">(esperando jugadores…)</div>
              )}
            </div>
          </div>

          {/* Área principal */}
          <div className="lg:col-span-2 space-y-6 text-white">
            {!gameStarted ? (
              <>  
                <MatchControl
                  roomId={id}
                  username={username}
                  isHost={isHost}
                  participants={participants}
                  onGameStart={(mins) => {
                    setBattleMinutes(mins);
                    setGameStarted(true);
                  }}
                />
                <Chat roomId={id} username={username} />
              </>
            ) : (
              <ExerciseBattle roomId={id} username={username} battleMinutes={battleMinutes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
