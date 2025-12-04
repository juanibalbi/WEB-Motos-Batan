import React, { useState } from 'react';
import { Bike } from '../types';
import { BRANDS, UPLOAD_API_URL } from '../constants';
import { PlusCircle, Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

interface AdminPanelProps {
  onAddBike: (bike: Bike) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddBike }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const [newBike, setNewBike] = useState<Partial<Bike>>({
    brand: BRANDS[0],
    model: '',
    imageUrl: ''
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validaciones Cliente
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo es demasiado grande (Máximo 5MB).");
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("Formato no válido. Usa JPG, PNG o WEBP.");
      return;
    }

    // 2. Subida al Servidor
    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('foto', file);

    try {
      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.ok) {
        // Asignar URL retornada por el servidor
        setNewBike(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        throw new Error(data.error || 'Error al subir la imagen');
      }
    } catch (error: any) {
      console.error("Error upload:", error);
      setUploadError(error.message || 'Error de conexión con el servidor');
      alert(`Error: ${error.message || 'No se pudo subir la imagen'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBike.brand && newBike.model) {
      onAddBike({
        id: Date.now().toString(),
        brand: newBike.brand,
        model: newBike.model,
        imageUrl: newBike.imageUrl || `https://placehold.co/600x400/png?text=${encodeURIComponent(newBike.model || 'Moto')}`
      });
      // Reset form
      setNewBike({ brand: BRANDS[0], model: '', imageUrl: '' });
      setIsOpen(false);
      setImageMode('url');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-brand-red font-bold hover:text-red-400 mb-4 bg-gray-900 p-3 rounded-lg border border-red-900 shadow-lg transition-all"
      >
        <PlusCircle /> {isOpen ? 'Cerrar Panel' : 'Agregar Nueva Moto'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <h3 className="text-xl font-bold text-white mb-6 brand-font flex items-center gap-2">
            <PlusCircle className="text-brand-red" size={20} />
            Agregar Moto al Catálogo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Marca</label>
                <select 
                  value={newBike.brand}
                  onChange={(e) => setNewBike({...newBike, brand: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:ring-brand-red focus:border-brand-red outline-none transition"
                >
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Modelo</label>
                <input 
                  type="text"
                  placeholder="Ej: ZB 110 C"
                  value={newBike.model}
                  onChange={(e) => setNewBike({...newBike, model: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:ring-brand-red focus:border-brand-red outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Right Column: Image Handling */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <label className="block text-sm font-medium text-gray-400 mb-3">Imagen de la Moto</label>
              
              {/* Image Source Toggle */}
              <div className="flex bg-gray-900 rounded-lg p-1 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-sm rounded-md transition ${imageMode === 'url' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <LinkIcon size={14} /> URL Externa
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-sm rounded-md transition ${imageMode === 'file' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Upload size={14} /> Subir Archivo
                </button>
              </div>

              {imageMode === 'url' ? (
                <div className="animate-fade-in">
                  <input 
                    type="text"
                    placeholder="https://ejemplo.com/foto.jpg"
                    value={newBike.imageUrl}
                    onChange={(e) => setNewBike({...newBike, imageUrl: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-sm focus:border-brand-red outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">Copia y pega el enlace directo de la imagen.</p>
                </div>
              ) : (
                <div className={`animate-fade-in text-center border-2 border-dashed ${uploadError ? 'border-red-500' : 'border-gray-600'} rounded-lg p-4 hover:border-gray-400 transition cursor-pointer relative`}>
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-2">
                      <Loader2 className="animate-spin text-brand-red mb-2" size={32} />
                      <span className="text-sm text-gray-300">Subiendo imagen...</span>
                    </div>
                  ) : (
                    <>
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-gray-400 mb-2" size={24} />
                        <span className="text-sm text-gray-300 font-medium">Click para subir foto</span>
                        <span className="text-xs text-gray-500 mt-1">Máximo 5MB (JPG, PNG)</span>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {uploadError && <p className="text-xs text-red-500 mt-2 text-center">{uploadError}</p>}

              {/* Preview */}
              {newBike.imageUrl && !isUploading && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-1">Vista Previa:</p>
                  <div className="h-24 w-full bg-white rounded flex items-center justify-center overflow-hidden border border-gray-600">
                    <img src={newBike.imageUrl} alt="Preview" className="h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
             <button 
              type="submit"
              disabled={isUploading}
              className={`bg-brand-red hover:bg-red-700 text-white font-bold py-2 px-8 rounded shadow-lg shadow-red-900/20 transition-transform hover:scale-105 active:scale-95 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading ? 'Esperando imagen...' : 'Guardar Moto'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;