import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BikeCard from './components/BikeCard';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import EditModal from './components/EditModal';
import { INITIAL_BIKES, BRANDS, GOOGLE_FORM_URL } from './constants';
import { Bike, BrandFilter } from './types';
import { Search, ClipboardList } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from localStorage
  const [bikes, setBikes] = useState<Bike[]>(() => {
    try {
      const savedBikes = localStorage.getItem('mb-motos-catalog');
      return savedBikes ? JSON.parse(savedBikes) : INITIAL_BIKES;
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return INITIAL_BIKES;
    }
  });

  // Auth & UI States
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  // Filter States
  const [filterBrand, setFilterBrand] = useState<BrandFilter>('TODAS');
  const [searchTerm, setSearchTerm] = useState('');

  // Persist bikes
  useEffect(() => {
    localStorage.setItem('mb-motos-catalog', JSON.stringify(bikes));
  }, [bikes]);

  // Auth Handler
  const handleAuthRequest = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginOpen(false);
  };

  // CRUD Actions
  const handleAddBike = (newBike: Bike) => {
    setBikes([newBike, ...bikes]);
  };

  const handleRemoveBike = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta moto del catálogo?')) {
      setBikes(bikes.filter(bike => bike.id !== id));
    }
  };

  const handleEditBike = (bike: Bike) => {
    setEditingBike(bike);
  };

  const handleSaveEditedBike = (updatedBike: Bike) => {
    setBikes(bikes.map(b => b.id === updatedBike.id ? updatedBike : b));
    setEditingBike(null);
  };

  const handleResetCatalog = () => {
    if (confirm('¿Restaurar catálogo original? Se perderán los cambios.')) {
      setBikes(INITIAL_BIKES);
    }
  };

  // Filtering Logic
  const filteredBikes = bikes.filter(bike => {
    const matchesBrand = filterBrand === 'TODAS' || bike.brand === filterBrand;
    const matchesSearch = bike.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bike.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-brand-red selection:text-white overflow-x-hidden w-full">
      <Header toggleAdmin={handleAuthRequest} isAdmin={isAdmin} />
      
      <main className="flex-grow w-full">
        <Hero />

        <div id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 w-full">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-4xl md:text-5xl font-bold brand-font text-white mb-2">
              NUESTRO <span className="text-brand-red">CATÁLOGO</span>
            </h2>
            <div className="w-20 h-1.5 bg-brand-red mx-auto rounded-full mb-6"></div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-6 border border-red-900/50 rounded-xl p-4 bg-red-900/10 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Modo Admin
                </h3>
                <div className="flex gap-4">
                  <button onClick={handleResetCatalog} className="text-xs text-gray-500 hover:text-white underline p-2">Restaurar</button>
                  <button onClick={() => setIsAdmin(false)} className="text-xs text-red-400 hover:text-red-300 underline font-bold p-2">Salir</button>
                </div>
              </div>
              <AdminPanel onAddBike={handleAddBike} />
            </div>
          )}

          {/* Filters & Search - Mobile Optimized Stack */}
          <div className="mb-8 flex flex-col gap-4 bg-black/95 p-4 rounded-xl border border-gray-800 shadow-xl">
            
            {/* Search Input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:bg-black focus:border-brand-red focus:ring-1 focus:ring-brand-red text-base"
              />
            </div>

            {/* Brand Filter - Wrapped Grid (Vertical flow) */}
            <div className="flex flex-wrap gap-2 justify-center w-full">
              <button
                onClick={() => setFilterBrand('TODAS')}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition border grow md:grow-0 text-center uppercase tracking-wide ${
                  filterBrand === 'TODAS' 
                  ? 'bg-brand-red border-brand-red text-white shadow-md' 
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                TODAS
              </button>
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => setFilterBrand(brand)}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition border grow md:grow-0 text-center uppercase tracking-wide ${
                    filterBrand === brand
                    ? 'bg-brand-red border-brand-red text-white shadow-md' 
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredBikes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {filteredBikes.map(bike => (
                <BikeCard 
                  key={bike.id} 
                  bike={bike} 
                  isAdmin={isAdmin} 
                  onRemove={handleRemoveBike} 
                  onEdit={handleEditBike}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800 mx-4">
              <p className="text-gray-400 text-lg mb-2">No encontramos esa moto.</p>
              <button 
                onClick={() => {setFilterBrand('TODAS'); setSearchTerm('')}}
                className="text-brand-red hover:text-white font-bold underline py-2 px-4"
              >
                Ver catálogo completo
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer toggleAdmin={handleAuthRequest} isAdmin={isAdmin} />

      {/* Floating Action Button for Mobile - Form Link */}
      <a 
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-brand-red text-white p-4 rounded-full shadow-2xl shadow-red-900/50 hover:bg-red-700 transition-transform hover:scale-110 active:scale-90 flex items-center justify-center border-2 border-white/10 md:hidden"
        title="Llenar Formulario"
      >
        <ClipboardList size={28} />
      </a>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLoginSuccess} 
      />
      
      <EditModal
        isOpen={!!editingBike}
        bike={editingBike}
        onClose={() => setEditingBike(null)}
        onSave={handleSaveEditedBike}
      />

    </div>
  );
};

export default App;