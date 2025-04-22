import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

export default function LobbySection() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [rooms, setRooms] = useState([]);
  const roomsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRoomsList = ({ rooms }) => {
      console.log('📥 [LobbySection] rooms_list', rooms);
      setRooms(rooms);
      roomsRef.current = rooms;
    };

    const handleRoomCreated = ({ id, roomName, difficulty, participants }) => {
      const [creator] = participants;
      navigate(`/roomviewbest/${id}`, {
        state: { roomName, difficulty, participants, isHost: true, username: creator }
      });
    };

    const handleError = ({ msg }) => alert(msg);

    socket.on('rooms_list', handleRoomsList);
    socket.on('room_created', handleRoomCreated);
    socket.on('error', handleError);
    socket.emit('list_rooms');

    return () => {
      socket.off('rooms_list', handleRoomsList);
      socket.off('room_created', handleRoomCreated);
      socket.off('error', handleError);
    };
  }, [navigate]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!roomName.trim() || !username.trim()) return alert('Tenés que completar todos los campos.');

    socket.emit('create_room', {
      name: roomName,
      difficulty,
      password: password || null,
      username
    });

    setRoomName('');
    setPassword('');
  };

  const joinRoom = (room) => {
    if ((room.participants || []).length >= 2) return;
    const user = username || prompt('Tu nombre de usuario:');
    if (!user) return;
    const pass = room.hasPassword ? prompt('Contraseña:') : null;
    if (room.hasPassword && pass === null) return;

    socket.emit(
      'join_room',
      { room_id: room.id, password: pass, username: user },
      (res) => {
        if (res.success) {
          navigate(`/roomviewbest/${room.id}`, {
            state: {
              roomName: room.name,
              difficulty: room.difficulty,
              participants: [...(room.participants || []), user],
              isHost: false,
              username: user
            }
          });
        }
      }
    );
  };

  const translateDifficulty = (d) => {
    if (d === 'easy') return 'Fácil';
    if (d === 'medium') return 'Medio';
    return 'Difícil';
  };

  return (
    <div className="relative bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Lobby</h2>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Salas de Batalla
          </h1>
          <p className="mt-3 max-w-2xl text-xl text-gray-300 mx-auto">
            Crea tu sala o únete a una batalla existente
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 mb-12 shadow-xl border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-4">Crear Nueva Sala</h3>
          <form onSubmit={handleCreateRoom} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="room-name" className="block text-sm font-medium text-gray-300 mb-1">
                Nombre de Sala
              </label>
              <input
                id="room-name"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Ej: Duelo de Titanes"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
                Dificultad
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Medio</option>
                <option value="hard">Difícil</option>
              </select>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Tu Nombre
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña (opcional)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Opcional"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="lg:col-span-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Crear Sala
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Salas Disponibles</h3>
          <div className="grid grid-cols-1 gap-4">
            {rooms.map((room) => {
              const count = (room.participants || []).length;
              return (
                <div
                  key={room.id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{room.name}</h4>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          room.difficulty === 'easy' ? 'bg-green-500 text-green-900' :
                          room.difficulty === 'medium' ? 'bg-yellow-500 text-yellow-900' : 'bg-red-500 text-red-900'
                        }`}> {translateDifficulty(room.difficulty)} </span>
                        <span className="text-gray-300 text-sm">
                          {count} {count === 1 ? 'jugador' : 'jugadores'}
                        </span>
                        {room.hasPassword && (
                          <span className="text-gray-400 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Con contraseña
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => joinRoom(room)}
                      disabled={count >= 2}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {count >= 2 ? 'Llena' : 'Unirse'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}