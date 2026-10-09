import React, { useState, useEffect } from 'react';
import { User, Check, X, Sparkles, BookOpen } from 'lucide-react';

export default function UserModal({ isOpen, onClose, onSaveUser, currentUserName = '' }) {
  const [name, setName] = useState('');
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setName(currentUserName || '');
      try {
        const raw = localStorage.getItem('fides_quiz_attempts');
        if (raw) {
          const attempts = JSON.parse(raw);
          const uniqueNames = Array.from(new Set(attempts.map(a => a.username))).slice(0, 5);
          setRecentUsers(uniqueNames);
        }
      } catch (e) {
        setRecentUsers([]);
      }
    }
  }, [isOpen, currentUserName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveUser(name.trim());
      onClose();
    }
  };

  const handleSelectRecent = (recentName) => {
    onSaveUser(recentName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#14120e] border border-[#52402a] rounded-xl shadow-2xl p-6 relative overflow-hidden text-[#f4eedb]"
        style={{
          boxShadow: '0 0 35px rgba(197, 160, 89, 0.15), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]/60"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c5a059]/60"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c5a059]/60"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]/60"></div>

        {/* Close Button if user is already logged in */}
        {currentUserName && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8a7a63] hover:text-[#f4eedb] p-1 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#292015] border border-[#7d6037] flex items-center justify-center text-[#c5a059] shadow-inner">
            <User size={28} />
          </div>
          <h2 className="medieval-title text-xl sm:text-2xl font-bold gold-gradient-text">
            Identificação do Estudante
          </h2>
          <p className="manuscript-quote text-sm text-[#b5a990] mt-1">
            "Crede ut intelligas, intellige ut credas"
          </p>
          <p className="text-xs text-[#8a7c64] mt-1">
            Insira seu nome para registrar suas respostas e acompanhar seu progresso para o certificado. Não requer senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-1.5">
              Nome do Participante:
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Silva, Beatriz, Irmão Lucas..."
                autoFocus
                className="w-full bg-[#1e1a14] border border-[#4d3a24] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] rounded-lg px-4 py-3 text-[#f4eedb] placeholder-[#6d5f4c] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-[#0d0c0a] font-bold text-sm tracking-wide uppercase transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check size={18} />
            <span>Entrar e Começar</span>
          </button>
        </form>

        {/* Recent users list if any */}
        {recentUsers.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[#33281a]">
            <p className="text-[11px] font-semibold text-[#8a7c64] uppercase tracking-wider mb-2">
              Participantes recentes neste dispositivo:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recentUsers.map((u) => (
                <button
                  key={u}
                  onClick={() => handleSelectRecent(u)}
                  className="text-xs bg-[#221c15] hover:bg-[#382b1c] border border-[#443320] text-[#ded3be] px-2.5 py-1 rounded-md transition-colors"
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
