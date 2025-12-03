import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-brand-dark overflow-hidden min-h-[60vh] md:min-h-[500px] flex items-center lg:block lg:min-h-0">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center">
        <div className="relative z-10 w-full pb-8 bg-transparent lg:bg-brand-dark sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 lg:pt-0 px-4 sm:px-6 lg:px-8">
          {/* Slanted background clip - Only visible on Desktop */}
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-brand-dark transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-0 mx-auto max-w-7xl relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl brand-font drop-shadow-xl lg:drop-shadow-none leading-none mb-4">
              <span className="block">TU PRÓXIMA MOTO</span>
              <span className="block text-brand-red">ESTÁ EN MB MOTOS</span>
            </h1>
            <p className="mt-4 text-base text-gray-200 lg:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl font-medium lg:font-normal drop-shadow-md lg:drop-shadow-none max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Somos Concesionario Oficial y <span className="text-white font-bold">Taller Multimarca Especializado</span>. 
              Ofrecemos servicio técnico integral, mantenimiento preventivo y el mejor <span className="text-brand-red font-bold">Respaldo Post-Venta</span>. 
              Contamos con repuestos y accesorios originales para todo tipo de motos.
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <a
                href="#catalogo"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-black rounded-lg text-brand-dark bg-white hover:bg-gray-200 uppercase tracking-widest transition-transform active:scale-95 shadow-xl"
              >
                Ver Catálogo
              </a>
            </div>
          </main>
        </div>
      </div>
      
      {/* Background Image Logic */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Taller de motos y concesionario"
        />
        {/* Mobile Overlay: Darker for readability */}
        <div className="absolute inset-0 bg-black/85 lg:bg-gradient-to-r lg:from-brand-dark lg:to-transparent lg:via-brand-dark/20"></div>
      </div>
    </div>
  );
};

export default Hero;