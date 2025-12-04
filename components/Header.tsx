import React from 'react';
import { Menu, X, ClipboardList, MessageCircle, Wrench } from 'lucide-react';
import { GOOGLE_FORM_URL, WHATSAPP_SALES_URL, WHATSAPP_WORKSHOP_URL } from '../constants';

interface HeaderProps {
  toggleAdmin: () => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleAdmin, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/95 border-b border-brand-red backdrop-blur-md shadow-lg shadow-red-900/10 supports-[backdrop-filter]:bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section - Redirects to top/home */}
          <div className="flex-shrink-0 flex items-center cursor-pointer select-none" onClick={() => window.location.href = '/'}>
            {/* MB Motos stylized logo */}
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-red blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-black border-[3px] border-brand-red px-2 py-0.5 md:px-3 md:py-1 skew-x-[-10deg]">
                  <span className="brand-font text-3xl md:text-4xl text-white font-bold tracking-tighter block skew-x-[10deg]">MB</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                 <span className="brand-font text-2xl md:text-3xl text-white italic font-bold leading-none tracking-wider">MOTOS</span>
                 <span className="text-[10px] md:text-xs text-brand-red uppercase tracking-[0.2em] leading-none font-bold">Concesionario & Taller</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#catalogo" className="text-gray-300 hover:text-brand-red px-2 py-2 rounded-md text-base font-medium transition-colors brand-font tracking-wide">CATÁLOGO</a>
            <a href="#nosotros" className="text-gray-300 hover:text-brand-red px-2 py-2 rounded-md text-base font-medium transition-colors brand-font tracking-wide">NOSOTROS</a>
            
            {/* WhatsApp Buttons Desktop */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-800">
                <a 
                  href={WHATSAPP_SALES_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                  title="Contactar Ventas"
                >
                    <MessageCircle size={14} /> VENTAS
                </a>
                <a 
                  href={WHATSAPP_WORKSHOP_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded transition-colors border border-gray-700"
                  title="Contactar Taller"
                >
                    <Wrench size={14} /> TALLER
                </a>
            </div>

            <a 
              href={GOOGLE_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-red-700 text-white px-5 py-2 rounded transform skew-x-[-10deg] hover:skew-x-[-5deg] transition-all duration-300 group shadow-lg shadow-brand-red/20 ml-2"
            >
              <div className="flex items-center gap-2 skew-x-[10deg] group-hover:skew-x-[5deg]">
                <ClipboardList size={18} />
                <span className="font-bold font-sans text-sm">FORMULARIO</span>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-white hover:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Menu Principal"
            >
              {isMenuOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl animate-fade-in flex flex-col overflow-y-auto">
          <div className="px-4 py-6 space-y-4 flex-1">
            <a 
              href="#catalogo" 
              className="text-white hover:text-brand-red block px-4 py-4 rounded-xl text-2xl font-bold brand-font tracking-wide border-b border-gray-800 active:bg-gray-900 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              CATÁLOGO
            </a>
            <a 
              href="#nosotros" 
              className="text-white hover:text-brand-red block px-4 py-4 rounded-xl text-2xl font-bold brand-font tracking-wide border-b border-gray-800 active:bg-gray-900 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              NOSOTROS
            </a>
            
            {/* Mobile Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
                <a 
                  href={WHATSAPP_SALES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg font-bold text-sm"
                >
                    <MessageCircle size={18} /> VENTAS
                </a>
                <a 
                  href={WHATSAPP_WORKSHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 text-white p-3 rounded-lg font-bold text-sm"
                >
                    <Wrench size={18} /> TALLER
                </a>
            </div>

            <div className="pt-2">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full text-white bg-brand-red block px-4 py-4 rounded-xl text-lg font-bold shadow-lg shadow-red-900/30 text-center active:scale-95 transition-transform"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-center gap-3">
                   <ClipboardList size={24} /> LLENAR FORMULARIO
                </div>
              </a>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-900 bg-gray-950">
            <button 
              onClick={() => { toggleAdmin(); setIsMenuOpen(false); }}
              className={`text-sm block py-3 w-full text-center font-medium ${isAdmin ? 'text-red-500' : 'text-gray-500'}`}
            >
              {isAdmin ? 'CERRAR SESIÓN ADMIN' : 'ACCESO PROPIETARIO'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;