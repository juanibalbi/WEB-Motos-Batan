import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (status: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded auth for client-side demo
    // User: mbmotos, Pass: admin123
    if (username === 'mbmotos' && password === 'admin123') {
      onLogin(true);
      setError('');
      setUsername('');
      setPassword('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden">
        
        {/* Decorative header */}
        <div className="h-2 w-full bg-brand-red"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-gray-800 rounded-full mb-3 border border-gray-700">
              <Lock className="text-brand-red" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white brand-font tracking-wide">ACCESO ADMINISTRADOR</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Usuario</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-brand-red outline-none"
                placeholder="Usuario"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-brand-red outline-none"
                placeholder="••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-2 rounded transition-colors"
            >
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;