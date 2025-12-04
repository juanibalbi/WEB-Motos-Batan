import React, { useState } from 'react';
import { Bike } from '../types';
import { GOOGLE_FORM_URL } from '../constants';
import { Trash2, Pencil, ChevronRight } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
  isAdmin: boolean;
  onRemove: (id: string) => void;
  onEdit: (bike: Bike) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, isAdmin, onRemove, onEdit }) => {
  const [imgSrc, setImgSrc] = useState(bike.imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(`https://placehold.co/600x400/111/fff?text=${encodeURIComponent(bike.model)}`);
    }
  };

  return (
    <div className="group relative bg-brand-gray rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex flex-col transform transition-all hover:border-gray-600">
      
      {/* Admin Controls */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <button 
            onClick={() => onEdit(bike)}
            className="bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition"
            title="Editar moto"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => onRemove(bike.id)}
            className="bg-red-600 text-white p-2.5 rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition"
            title="Eliminar moto"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Image Container */}
      <div className="bg-white relative p-4 flex items-center justify-center min-h-[220px]">
        <img 
          src={imgSrc} 
          alt={`${bike.brand} ${bike.model}`} 
          onError={handleError}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
           <span className="text-[10px] font-black text-white tracking-widest uppercase bg-brand-dark px-2 py-1 rounded shadow-sm">
             {bike.brand}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col bg-brand-gray border-t border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6 brand-font leading-none tracking-wide">
          {bike.model}
        </h3>
        
        <div className="mt-auto">
          <a 
            href={GOOGLE_FORM_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-3.5 rounded-xl uppercase text-sm tracking-wide hover:bg-red-700 active:bg-red-800 transition-colors shadow-lg shadow-red-900/20 active:scale-[0.98]"
          >
            CONSULTAR
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;