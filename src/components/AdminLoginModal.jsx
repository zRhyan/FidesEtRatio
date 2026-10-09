import React, { useState } from 'react';
import { Shield, KeyRound, X, AlertCircle } from 'lucide-react';
import { verifyAdminPin } from '../services/storage';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pin.trim() || loading) return;

    setLoading(true);
    try {
      const isValid = await verifyAdminPin(pin);
      if (isValid) {
        setError(false);
        setPin('');
        onSuccess();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="w-full max-w-sm m-auto bg-[#14120e] border border-[#52402a] rounded-xl shadow-2xl p-6 relative text-[#f4eedb]"
        style={{
          boxShadow: '0 0 35px rgba(197, 160, 89, 0.15), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        <button 
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-[#8a7a63] hover:text-[#f4eedb] rounded-md transition-colors"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#291f13] border border-[#7d6037] flex items-center justify-center text-[#c5a059] shadow-inner">
            <Shield size={24} />
          </div>
          <h2 className="medieval-title text-xl font-bold gold-gradient-text">
            Acesso do Catequista
          </h2>
          <p className="text-xs text-[#a3947c] mt-1">
            Digite o PIN de administrador para gerenciar perguntas e acompanhar notas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="Digite o PIN de acesso..."
                autoFocus
                autoComplete="off"
                enterKeyHint="go"
                className="w-full bg-[#1e1a14] border border-[#4d3a24] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-4 py-3 text-[#f4eedb] placeholder-[#6d5f4c] outline-none transition-all text-sm text-center tracking-widest font-mono"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 justify-center">
                <AlertCircle size={13} />
                PIN incorreto. Verifique e tente novamente.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] text-[#0d0c0a] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-110'}`}
          >
            <KeyRound size={15} />
            <span>{loading ? 'Verificando...' : 'Acessar Painel'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
