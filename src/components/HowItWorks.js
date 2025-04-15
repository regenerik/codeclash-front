const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      name: 'Regístrate',
      description: 'Crea tu cuenta en menos de un minuto y accede a todas las funcionalidades.',
    },
    {
      id: 2,
      name: 'Elige un desafío',
      description: 'Selecciona entre cientos de desafíos en diferentes lenguajes y categorías.',
    },
    {
      id: 3,
      name: 'Codifica y envía',
      description: 'Resuelve el problema y envía tu solución para que sea evaluada por nuestra IA.',
    },
    {
      id: 4,
      name: 'Compara y mejora',
      description: 'Recibe feedback detallado y compara tu solución con la de otros desarrolladores.',
    },
  ];

  return (
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">¿Cómo funciona?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            En solo 4 pasos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Empieza a competir y mejora tus habilidades como desarrollador.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-16">
              {steps.map((step) => (
                <div key={step.id} className="relative group">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
                      <span className="text-white font-bold">{step.id}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{step.name}</h3>
                      <p className="mt-2 text-base text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;