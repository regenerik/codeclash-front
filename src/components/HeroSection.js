import React from 'react'
import { useNavigate } from 'react-router';

const HeroSection = () => {

  let navigate = useNavigate()

  const handleToLobby = () => {
    navigate('/lobbysection')
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900 pt-12 px-4 sm:px-6 lg:px-8">
      {/* Efecto de líneas de código flotantes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
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
            {['const', 'function', 'return', 'if', 'else', 'console.log', 'import', 'export', 'useState', 'useEffect'][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>

      {/* Efecto de partículas */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-500"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 lg:mt-12 lg:px-8 xl:mt-14">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">CodeClash</span>
                <span className="block text-indigo-400">Batallas de código evaluadas por IA</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Demuestra tus habilidades, compite contra otros desarrolladores y deja que nuestra IA determine quién escribe el mejor código según criterios profesionales.
              </p>


              {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center sm:items-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105">
                    Registrarse ahora
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button onClick={handleToLobby} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                    Test Lobby
                  </button>
                </div>
              </div> */}

              <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center sm:justify-center lg:justify-start gap-y-3 sm:gap-y-0 sm:gap-x-3">
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105">
                    Registrarse ahora
                  </button>
                </div>
                <div>
                  <button  onClick={handleToLobby} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300">
                    Test Lobby
                  </button>
                </div>
              </div>



            </div>
          </main>
        </div>
      </div>

      {/* Efecto de IA futurista */}
      <div className="absolute right-10 bottom-10 opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0V50M100 150V200M0 100H50M150 100H200M28 28L64 64M172 28L136 64M172 172L136 136M28 172L64 136" stroke="url(#paint0_linear)" strokeWidth="2" />
          <circle cx="100" cy="100" r="30" fill="url(#paint1_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="70" y1="70" x2="130" y2="130" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
