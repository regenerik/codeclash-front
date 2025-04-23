import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router';


const RegisterNew = () => {

    let navigate = useNavigate()
    let { actions } = useContext(Context)

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit =async (e) => {
        try {
            e.preventDefault();
            if (formData.password !== formData.repeatPassword) {
                alert("Las contraseñas no coinciden!");
                return;
            }
            let result = await actions.register(formData)
            if(result){
                alert("Felicitaciones. Usuario creado. Redirigiendo a log-in")
                navigate('/login-new')
            }else{
                alert("Emm,..Creo que se algo malió sal. Es lo primero que sale mal...")
            }
        } catch (error) {
            console.error(error)
        }


    };

    const handlerLogin = () => {
        navigate('/login-new')
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
                    REGISTRO CODECLASH
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-green-300 text-sm font-mono mb-1">Nickname</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            required
                        />
                    </div>

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

                    <div>
                        <label className="block text-green-300 text-sm font-mono mb-1">Repetir Contraseña</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition duration-200 shadow-lg hover:shadow-green-500/30"
                    >
                        CREAR CUENTA
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={handlerLogin}
                        className="text-green-400 hover:text-green-300 text-sm font-mono underline"
                    >
                        ¿Ya tenés cuenta? Logueate acá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterNew;