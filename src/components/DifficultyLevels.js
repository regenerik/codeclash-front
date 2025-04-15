const DifficultyLevels = () => {
  const levels = [
    {
      name: 'Principiante',
      description: 'Perfecto para quienes están empezando en el mundo de la programación.',
      icon: '👶',
      color: 'from-green-400 to-blue-500',
    },
    {
      name: 'Intermedio',
      description: 'Para desarrolladores con experiencia que buscan mejorar sus habilidades.',
      icon: '💪',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'Avanzado',
      description: 'Desafíos complejos para los programadores más experimentados.',
      icon: '🧠',
      color: 'from-red-500 to-purple-600',
    },
    {
      name: 'Élite',
      description: 'Solo para los mejores. ¿Tienes lo que se necesita?',
      icon: '🏆',
      color: 'from-purple-500 to-indigo-600',
    },
  ];

  return (
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Niveles</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Elige tu categoría
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Compite contra desarrolladores de tu mismo nivel y sube de categoría.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <div key={level.name} className="pt-6">
              <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div>
                    <span className={`inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-gradient-to-r ${level.color}`}>
                      <span className="text-3xl">{level.icon}</span>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{level.name}</h3>
                  <p className="mt-5 text-base text-gray-300">{level.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultyLevels;