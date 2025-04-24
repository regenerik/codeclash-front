import React, {useState, useContext} from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router';

const LoginNew = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const ok = await actions.login(formData);    // <— IMPORTANTE: await!
      if (ok) {
        navigate('/lobbysection');
      } else {
        alert('Las credenciales son incorrectas. Volvé a intentarlo.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor. Intentá más tarde.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* ... matrix backdrops iguales ... */}
      <div className="relative z-10 max-w-md mx-auto p-8 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl mt-20 border border-green-500 border-opacity-30">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center font-mono tracking-wider">
          LOGIN CODECLASH
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-300 text-sm font-mono mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-green-300 text-sm font-mono mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition duration-200 shadow-lg hover:shadow-green-500/30"
          >
            INGRESAR
          </button>
        </form>
        {/* ... botones de registro y olvidar contraseña ... */}
      </div>
    </div>
  );
};

export default LoginNew;
