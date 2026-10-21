import { useEffect, useState } from 'react';
import { X, BookOpen, Flame, Shield, HeartHandshake, Compass, Users, Palette, Sparkles } from 'lucide-react';

const VOCATION_ICONS = {
  BookOpen,
  Flame,
  Shield,
  HeartHandshake,
  Compass,
  Users,
  Palette
};

export default function SaintDetailModal({ exponent, vocation, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [exponent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!exponent) return null;

  const IconComponent = VOCATION_ICONS[vocation?.iconName] || Sparkles;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#14110d] border border-[#5e4726] rounded-2xl shadow-2xl p-5 sm:p-8 space-y-6 my-auto max-h-[92vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar com alvo de toque seguro */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center rounded-xl bg-[#201a13] border border-[#4a3924] text-[#a3947c] hover:text-[#c5a059] hover:bg-[#2b2216] transition-colors z-10"
          title="Fechar (Esc)"
        >
          <X size={20} />
        </button>

        {/* Cabeçalho do Expoente */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2 sm:pt-0">
          {/* Retrato / Pintura com Moldura Sacra */}
          <div className="relative shrink-0">
            <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 border-[#c5a059]/60 shadow-lg bg-[#1c1610] flex items-center justify-center">
              {!imgError && exponent.imageUrl ? (
                <img
                  src={exponent.imageUrl}
                  alt={exponent.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center text-[#c5a059]/70 space-y-1">
                  <IconComponent size={32} />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Expoente Sacro</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#201a13] border border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow">
              <IconComponent size={14} />
            </div>
          </div>

          {/* Dados e Títulos */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#251d13] border border-[#523e24] text-[#e6cb8e]">
              <IconComponent size={12} className="text-[#c5a059]" />
              <span>{vocation?.shortName || 'Vocação'}</span>
            </div>

            <h3 className="medieval-title text-xl sm:text-2xl font-bold text-[#f5ebd7] leading-tight">
              {exponent.name}
            </h3>

            <p className="text-xs text-[#a3947c] font-mono">
              {exponent.dates}
            </p>

            {exponent.facet && (
              <p className="text-xs sm:text-sm font-semibold text-[#c5a059]">
                {exponent.facet}
              </p>
            )}

            {exponent.summary && (
              <p className="text-xs sm:text-sm text-[#d4c6af] italic leading-relaxed pt-1 border-t border-[#382b1b]/80">
                "{exponent.summary}"
              </p>
            )}
          </div>
        </div>

        {/* Biografia Aprofundada & Faceta Espiritual */}
        <div className="bg-[#1a1510] border border-[#3d2f1e] rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059]">
            <Sparkles size={14} />
            <span>Vida, Faceta & Testemunho na Vocação</span>
          </div>

          <p className="text-sm sm:text-base text-[#ded3be] leading-relaxed text-justify whitespace-pre-line font-serif sm:font-normal">
            {exponent.bio}
          </p>
        </div>

        {/* Axioma da Vocação e Fechamento */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-[#a3947c] border-t border-[#382b1b]">
          <span className="italic text-center sm:text-left">
            "{vocation?.axiom}"
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#251e15] border border-[#4a3924] text-[#e6cb8e] hover:bg-[#33281b] hover:text-[#f7e4be] transition-colors font-bold text-xs uppercase tracking-wider"
          >
            Concluir Leitura
          </button>
        </div>
      </div>
    </div>
  );
}
