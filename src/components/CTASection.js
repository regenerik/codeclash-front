const CTASection = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-700 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-32 w-32 text-white opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
            ¿Listo para competir?
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Únete a la comunidad
          </p>
          <p className="mt-3 text-lg text-gray-300">
            Regístrate ahora y comienza a mejorar tus habilidades de programación compitiendo contra otros desarrolladores.
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                Crear cuenta gratis
                <svg className="ml-3 -mr-1 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;