import React, { useState, useEffect } from 'react';
import { Bike } from '../types';
import { BRANDS, UPLOAD_API_URL } from '../constants';
import { X, Save, Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

interface EditModalProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBike: Bike) => void;
}

const EditModal: React.FC<EditModalProps> = ({ bike, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Bike>>({});
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (bike) {
      setFormData({ ...bike });
      // If the image is NOT a data URL, assume it's a normal URL
      setImageMode('url'); 
    }
  }, [bike]);

  if (!isOpen || !bike) return null;

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
    
    const uploadData = new FormData();
    uploadData.append('foto', file);

    try {
      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();

      if (data.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setImageMode('file'); 
      } else {
        throw new Error(data.error || 'Error al subir');
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error.message);
      alert("Error al subir imagen: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.brand && formData.model && formData.imageUrl) {
      onSave(formData as Bike);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-800">
          <h2 className="text-lg md:text-xl font-bold text-white brand-font tracking-wide flex items-center gap-2">
            <span className="text-brand-red">EDITAR</span> <span className="truncate max-w-[150px] md:max-w-none">{bike.model}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-2">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto">
          <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Marca</label>
                <select 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded p-3 md:p-2 text-white focus:border-brand-red outline-none text-base"
                >
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Modelo</label>
                <input 
                  type="text" 
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded p-3 md:p-2 text-white focus:border-brand-red outline-none text-base"
                />
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <label className="block text-sm font-medium text-gray-400 mb-3">Imagen de la Moto</label>
              
              <div className="flex bg-gray-900 rounded-lg p-1 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 md:py-1.5 text-sm rounded-md transition ${imageMode === 'url' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <LinkIcon size={14} /> URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 md:py-1.5 text-sm rounded-md transition ${imageMode === 'file' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Upload size={14} /> Subir Foto
                </button>
              </div>

              {imageMode === 'url' ? (
                <div>
                  <input 
                    type="text"
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-sm focus:border-brand-red outline-none"
                  />
                </div>
              ) : (
                <div className={`text-center border-2 border-dashed ${uploadError ? 'border-red-500' : 'border-gray-600'} rounded-lg p-4 hover:border-gray-400 transition cursor-pointer relative`}>
                  
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-2">
                      <Loader2 className="animate-spin text-brand-red mb-2" size={32} />
                      <span className="text-sm text-gray-300">Subiendo...</span>
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
                        <span className="text-sm text-gray-300">Click para cambiar foto</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {uploadError && <p className="text-xs text-red-500 mt-2 text-center">{uploadError}</p>}

              {formData.imageUrl && !isUploading && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-1">Vista Previa:</p>
                  <div className="h-32 w-full bg-white rounded flex items-center justify-center overflow-hidden border border-gray-600">
                    <img src={formData.imageUrl} alt="Preview" className="h-full object-contain" />
                  </div>
                </div>
              )}
            </div>

          </form>
        </div>

        <div className="p-4 md:p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition"
          >
            Cancelar
          </button>
          <button 
            form="edit-form"
            type="submit"
            disabled={isUploading}
            className={`bg-brand-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save size={18} /> {isUploading ? 'Subiendo...' : 'Guardar'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditModal;