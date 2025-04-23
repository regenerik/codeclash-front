import React, {useState, useContext} from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router';

const LoginNew = ({ setCurrentView }) => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    let navigate = useNavigate()
    let { actions } = useContext(Context)
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Datos de login:', formData);
        try {
            let result = actions.login(formData)
            if(result){
                navigate('/lobbysection')
            }else{
                alert("Error al loguearse. Intentá en un ratito.")
            }
        } catch (error) {
            console.error(error)
        }


    };

    const handleBackToRegister = () => {
        navigate('/register')
    }
  
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-green-400 opacity-20 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`
              }}
            >
              {`// ${['const', 'let', 'function', 'return', 'if', 'else'][Math.floor(Math.random() * 6)]} ${Math.random().toString(36).substring(7)}`}
            </div>
          ))}
        </div>
  
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute border-t border-l border-green-500 opacity-10"
              style={{
                width: `${Math.random() * 200}px`,
                height: `${Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
  
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
          
          <div className="mt-4 text-center">
            <button
              onClick={handleBackToRegister}
              className="text-green-400 hover:text-green-300 text-sm font-mono underline"
            >
              ¿No tenés cuenta? Registrate
            </button>
          </div>
          
          <div className="mt-2 text-center">
            <button
              onClick={() => console.log('Olvidé contraseña')}
              className="text-green-400 hover:text-green-300 text-sm font-mono underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default LoginNew;