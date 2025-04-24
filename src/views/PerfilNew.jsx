import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router';

export default function PerfilNew() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Inicializamos datos de usuario
  const initial = {
    name: store.user.name || '',
    email: store.user.email || '',
    level: store.user.level || '',
    url_image: store.user.url_image || ''
  };

  const [userData, setUserData] = useState(initial);
  const [editingField, setEditingField] = useState(null);
  const [savedField, setSavedField] = useState(null); // tilde verde para name/email/password

  // Estados de password
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Guardar name/email
  const handleSave = async (field) => {
    try {
      await actions.updateUser({ [field]: userData[field] });
      setSavedField(field);
      setTimeout(() => setSavedField(null), 3000);
    } catch (error) {
      alert(error.message);
    } finally {
      setEditingField(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleBackToLobby = () => navigate('/lobbysection');

  const resetPasswordFields = () => {
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setPassError('');
    setPassSuccess('');
    setEditingField(null);
  };

  const handleConfirmPassword = async () => {
    setPassError('');
    setPassSuccess('');
    if (newPass.length < 8) {
      setPassError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (!/\d/.test(newPass)) {
      setPassError('La contraseña debe incluir al menos un número');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('La confirmación no coincide');
      return;
    }
    try {
      const result = await actions.definePassword(currentPass, newPass);
      setPassSuccess(result.msg || 'Contraseña actualizada correctamente');
      setSavedField('password');
      setTimeout(() => setSavedField(null), 3000);
      resetPasswordFields();
    } catch (error) {
      setPassError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute text-green-400 opacity-20 text-xs font-mono" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animation: `float ${5+Math.random()*10}s infinite ease-in-out` }}>
            {`// ${['const','let','function','return','if','else'][Math.floor(Math.random()*6)]} ${Math.random().toString(36).substr(7)}`}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute border-t border-l border-green-500 opacity-10" style={{ width: `${Math.random()*200}px`, height: `${Math.random()*200}px`, left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, transform: `rotate(${Math.random()*360}deg)` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto p-8 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl mt-20 border border-green-500 border-opacity-30">
        {/* Volver */}
        <div className="cursor-pointer mb-4">
          <h6 onClick={handleBackToLobby} className="text-green-300 text-sm font-mono">Volver al lobby</h6>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img src={userData.url_image||`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name||'U')}&size=80&background=888888&color=ffffff`} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
        </div>

        {/* Nombre */}
        <h2 className="text-xl font-bold text-green-400 mb-6 text-center font-mono tracking-wider">{userData.name}</h2>

        {/* Campos */}
        <div className="space-y-4">
          {[
            { label: 'Usuario', field: 'name', editable: true },
            { label: 'Email', field: 'email', editable: true }
          ].map(({ label, field, editable }) => (
            <div key={field} className="flex items-center justify-between">
              <span className="text-green-300 text-sm font-mono">{label}</span>
              {editingField===field ? (
                <input type="text" name={field} value={userData[field]} onChange={handleChange} onBlur={()=>handleSave(field)} onKeyDown={e=>e.key==='Enter'&&handleSave(field)} autoFocus className="ml-2 px-2 py-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white flex-1" />
              ):(
                <div className="flex items-center">
                  <span className="text-white font-mono">{userData[field]}</span>
                  {editable && (
                    <>
                      <button onClick={()=>setEditingField(field)} className="ml-2 text-green-400 hover:text-green-300 text-lg">✏️</button>
                      {savedField===field && <span className="ml-2 text-green-400 font-bold">✓</span>}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Password Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-green-300 text-sm font-mono">Password</span>
              {!editingField ? (
                <div className="flex items-center">
                  <button onClick={()=>setEditingField('password')} className="text-green-400 hover:text-green-300 text-lg">✏️</button>
                  {savedField==='password' && <span className="ml-2 text-green-400 font-bold">✓</span>}
                </div>
              ) : null}
            </div>
            {editingField==='password' && (
              <div className="flex flex-col space-y-2">
                <input type="password" placeholder="Contraseña actual" value={currentPass} onChange={e=>setCurrentPass(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                <input type="password" placeholder="Nueva contraseña" value={newPass} onChange={e=>setNewPass(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                <input type="password" placeholder="Repetir nueva contraseña" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                {passError && <span className="text-red-500 text-sm font-mono">{passError}</span>}
                {passSuccess && <span className="text-green-400 text-sm font-mono">{passSuccess}</span>}
                <div className="flex justify-end space-x-2 mt-1">
                  <button onClick={resetPasswordFields} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition duration-200">Cancelar</button>
                  <button onClick={handleConfirmPassword} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition duration-200">Confirmar</button>
                </div>
              </div>
            )}

            {/* Nivel solo lectura */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-green-300 text-sm font-mono">Nivel</span>
              <span className="text-white font-mono">{userData.level | "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
