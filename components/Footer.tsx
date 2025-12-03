import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Clock } from 'lucide-react';

interface FooterProps {
  toggleAdmin: () => void;
  isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ toggleAdmin, isAdmin }) => {
  return (
    <footer id="nosotros" className="bg-black border-t-4 border-brand-red text-white pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h2 className="text-5xl brand-font font-bold mb-4">MB <span className="text-brand-red italic">MOTOS</span></h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Concesionario Multimarcas. Repuestos, Accesorios y Service Oficial.
              La mejor atención y el respaldo que necesitás.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-white hover:bg-brand-red/20 p-2 rounded-full transition"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-brand-red/20 p-2 rounded-full transition"><Instagram size={24} /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2 inline-block md:block">CONTACTO</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                <MapPin size={20} className="text-brand-red shrink-0" />
                <span>Av. Principal 1234, Batán</span>
              </li>
              <li className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                <Phone size={20} className="text-brand-red shrink-0" />
                <span className="font-mono text-lg">+549-223-5433958</span>
              </li>
              <li className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                <Clock size={20} className="text-brand-red shrink-0" />
                <span>Lun - Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2 inline-block md:block">ACCESOS</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-gray-400 hover:text-white transition py-2 block">Inicio</a></li>
              <li><a href="#catalogo" className="text-gray-400 hover:text-white transition py-2 block">Catálogo Completo</a></li>
              <li><button onClick={toggleAdmin} className="text-gray-600 hover:text-gray-400 text-sm mt-6 border border-gray-800 px-4 py-2 rounded">
                {isAdmin ? 'Cerrar Sesión Admin' : 'Acceso Propietario'}
              </button></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-900 pt-8 text-center text-gray-600 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} MB Motos Batán.
        </div>
      </div>
    </footer>
  );
};

export default Footer;