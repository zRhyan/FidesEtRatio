import { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Flame, 
  Shield, 
  HeartHandshake, 
  Compass, 
  Users, 
  Palette, 
  Check, 
  Sparkles, 
  Award, 
  ChevronRight,
  Info
} from 'lucide-react';
import { VOCATIONS_DATA, getVocationById } from '../data/vocationsData';
import { getLevelInfo, calculateInheritedXp } from '../services/storage';
import SaintDetailModal from './SaintDetailModal';

const VOCATION_ICONS = {
  BookOpen,
  Flame,
  Shield,
  HeartHandshake,
  Compass,
  Users,
  Palette
};

export default function VocationModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  onSelectVocation 
}) {
  const activeVocId = userProfile?.active_vocation || 'intelectual';
  const [selectedVocId, setSelectedVocId] = useState(activeVocId);
  const [selectedExponent, setSelectedExponent] = useState(null);
  const [confirmSwitch, setConfirmSwitch] = useState(false);

  // Sincroniza vocação selecionada com a ativa ao abrir
  useEffect(() => {
    if (isOpen) {
      setSelectedVocId(userProfile?.active_vocation || 'intelectual');
      setConfirmSwitch(false);
      setSelectedExponent(null);
    }
  }, [isOpen, userProfile?.active_vocation]);

  // Fechar com tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedExponent) {
          setSelectedExponent(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedExponent, onClose]);

  if (!isOpen) return null;

  const vocationsData = userProfile?.vocations_data || {};
  const currentSelectedVocation = getVocationById(selectedVocId);
  const isCurrentlyActive = selectedVocId === activeVocId;

  // Informações de nível e XP da vocação selecionada
  const selectedVocProgress = vocationsData[selectedVocId] || { xp: 0, level: 1, visited: false };
  const levelInfo = getLevelInfo(selectedVocProgress.xp, selectedVocId);

  // Maior XP entre todas as vocações do usuário (para cálculo de herança)
  const highestXp = Math.max(
    0,
    ...Object.values(vocationsData).map(v => Number(v.xp) || 0)
  );
  const potentialInheritedXp = calculateInheritedXp(highestXp);

  const handleSwitchVocation = async () => {
    if (isCurrentlyActive) return;
    await onSelectVocation(selectedVocId);
    setConfirmSwitch(false);
  };

  const SelectedIcon = VOCATION_ICONS[currentSelectedVocation.iconName] || BookOpen;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-4xl bg-[#120f0c] border border-[#5e4726] rounded-2xl shadow-2xl p-4 sm:p-7 space-y-6 my-auto max-h-[94vh] overflow-y-auto scrollbar-thin"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão Fechar com alvo de toque seguro */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 flex items-center justify-center rounded-xl bg-[#1f1912] border border-[#4a3924] text-[#a3947c] hover:text-[#c5a059] hover:bg-[#2b2216] transition-colors z-10"
            title="Fechar (Esc)"
          >
            <X size={20} />
          </button>

          {/* Cabeçalho do Modal */}
          <div className="text-center space-y-2 pt-1 sm:pt-0 pr-10 sm:pr-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#221a11] border border-[#6b522c] text-[#e6cb8e]">
              <Sparkles size={13} className="text-[#c5a059]" />
              <span>Caminhos de Santidade & Maturidade</span>
            </span>
            <h2 className="medieval-title text-xl sm:text-3xl font-bold text-[#f5ebd7]">
              As Sete Vocações da Igreja
            </h2>
            <p className="text-xs sm:text-sm text-[#a3947c] max-w-xl mx-auto">
              Cada alma trilha um itinerário espiritual singular. Escolha sua Vocação para direcionar sua ascensão doutrinária, herdar títulos sacros e acumular pontos de experiência.
            </p>
          </div>

          {/* Seletor em Carrossel/Abas das 7 Vocações */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
            {VOCATIONS_DATA.map((voc) => {
              const Icon = VOCATION_ICONS[voc.iconName] || BookOpen;
              const isSelected = voc.id === selectedVocId;
              const isActive = voc.id === activeVocId;
              const vocProg = vocationsData[voc.id];
              const hasVisited = Boolean(vocProg?.visited);

              return (
                <button
                  key={voc.id}
                  onClick={() => {
                    setSelectedVocId(voc.id);
                    setConfirmSwitch(false);
                  }}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 min-h-[90px] relative ${
                    isSelected
                      ? 'bg-[#291f13] border-[#c5a059] shadow-lg shadow-[#c5a059]/10 ring-1 ring-[#c5a059]/60'
                      : 'bg-[#18140f] border-[#382b1b] hover:border-[#5e4726] hover:bg-[#201a13]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c5a059] text-black flex items-center justify-center shadow">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#c5a059] text-black' : 'bg-[#251e15] text-[#c5a059]'
                  }`}>
                    <Icon size={16} />
                  </div>

                  <span className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 ${
                    isSelected ? 'text-[#f5ebd7]' : 'text-[#a3947c]'
                  }`}>
                    {voc.shortName}
                  </span>

                  <span className="text-[10px] text-[#7d6f5c] font-mono">
                    {hasVisited ? `Nível ${vocProg.level || 1}` : 'Noviço'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Painel da Vocação Selecionada */}
          <div className="bg-[#18140f] border border-[#3d2f1e] rounded-2xl p-4 sm:p-6 space-y-6">
            
            {/* Header da Vocação em Destaque */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#2d2316]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8f6d2b] flex items-center justify-center text-black shrink-0 shadow-md">
                  <SelectedIcon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="medieval-title text-lg sm:text-xl font-bold text-[#f5ebd7]">
                      {currentSelectedVocation.name}
                    </h3>
                    {isCurrentlyActive && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 border border-emerald-600/70 text-emerald-300">
                        Vocação Ativa
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#c5a059] italic">
                    {currentSelectedVocation.axiom}
                  </p>
                </div>
              </div>

              {/* Botão de Consagração / Ação */}
              <div className="w-full sm:w-auto shrink-0">
                {isCurrentlyActive ? (
                  <div className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#251d13] border border-[#4a3924] text-xs font-bold text-[#c5a059]">
                    <Check size={15} />
                    <span>Consagrado Atualmente</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmSwitch(true)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>Consagrar-se a esta Vocação</span>
                    <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Diálogo de Confirmação de Troca de Vocação */}
            {confirmSwitch && !isCurrentlyActive && (
              <div className="p-4 rounded-xl bg-[#2a1c10] border border-[#7a5423] space-y-3 animate-fadeIn">
                <div className="flex items-start gap-2.5 text-xs text-[#f0dfc0]">
                  <Info size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#e6cb8e] block mb-1">
                      Confirmação da Consagração:
                    </span>
                    {selectedVocProgress.visited ? (
                      <p>
                        Você já praticou a <strong>{currentSelectedVocation.shortName}</strong> anteriormente. Ao retornar, você recuperará exatamente seus <strong>{selectedVocProgress.xp.toLocaleString()} XP</strong> e o <strong>Nível {selectedVocProgress.level}</strong> que deixou intactos!
                      </p>
                    ) : (
                      <p>
                        Esta será sua primeira vez na <strong>{currentSelectedVocation.shortName}</strong>. Pela regra de Herança Sagrada, você herdará <strong>1/7 do XP da sua maior vocação (+{potentialInheritedXp.toLocaleString()} XP)</strong> para já iniciar com a bênção dos estudos passados!
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setConfirmSwitch(false)}
                    className="px-3.5 py-2 rounded-lg bg-[#1c160f] border border-[#3d2f1e] text-xs font-semibold text-[#a3947c] hover:text-[#ded3be]"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSwitchVocation}
                    className="px-4 py-2 rounded-lg bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110"
                  >
                    Confirmar Consagração
                  </button>
                </div>
              </div>
            )}

            {/* Descrição & Carisma da Vocação */}
            <p className="text-xs sm:text-sm text-[#d4c6af] leading-relaxed">
              {currentSelectedVocation.description}
            </p>

            {/* Card de Progresso do Aluno nesta Vocação */}
            <div className="bg-[#120f0c] border border-[#2d2316] rounded-xl p-3.5 sm:p-4 space-y-2.5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
                <div>
                  <span className="text-[#a3947c]">Grau Atual nesta Trilha: </span>
                  <span className="font-bold text-[#f5ebd7]">
                    Nível {levelInfo.level} — {levelInfo.title}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#c5a059]">
                  {levelInfo.xp.toLocaleString()} XP
                  {levelInfo.nextThresholdXp && ` / ${levelInfo.nextThresholdXp.toLocaleString()} XP`}
                </span>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full bg-[#201a14] h-2.5 rounded-full overflow-hidden border border-[#3d2f1e]">
                <div 
                  className="h-full bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#f4d48f] transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#7d6f5c]">
                <span>{levelInfo.progressPercent}% para o próximo grau</span>
                {levelInfo.nextTitle && (
                  <span>Próximo: <strong>{levelInfo.nextTitle}</strong> ({levelInfo.xpRemaining.toLocaleString()} XP restantes)</span>
                )}
              </div>
            </div>

            {/* Galeria de Todos os Expoentes Históricos desta Vocação */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059]">
                  <Award size={15} />
                  <span>Grandes Expoentes & Santos desta Vocação ({currentSelectedVocation.exponents.length})</span>
                </div>
                <span className="text-[11px] text-[#7d6f5c] hidden sm:inline">
                  Toque em um expoente para ler sua biografia
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentSelectedVocation.exponents.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExponent(exp)}
                    className="p-2.5 rounded-xl bg-[#13100c] border border-[#2e2417] hover:border-[#c5a059] hover:bg-[#1f1912] transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-2 group shadow-sm"
                  >
                    <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border border-[#4a3924] group-hover:border-[#c5a059] transition-colors bg-[#1a140d] shrink-0">
                      <img
                        src={exp.imageUrl}
                        alt={exp.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <h4 className="text-xs font-bold text-[#f5ebd7] group-hover:text-[#c5a059] line-clamp-1 transition-colors">
                        {exp.name}
                      </h4>
                      <p className="text-[10px] text-[#7d6f5c] font-mono">
                        {exp.dates}
                      </p>
                      {exp.facet && (
                        <p className="text-[10px] text-[#c5a059]/80 truncate pt-0.5">
                          {exp.facet}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escada de Graus da Vocação (Níveis 1 a 7) */}
            <div className="space-y-2 pt-2 border-t border-[#2d2316]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a3947c] block">
                Escada de Ascensão Espiritual desta Vocação
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentSelectedVocation.levels.map((lvl) => {
                  const isCurrent = levelInfo.level === lvl.level;
                  const isAchieved = levelInfo.level >= lvl.level;

                  return (
                    <div
                      key={lvl.level}
                      className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-[#251d13] border-[#c5a059] text-[#f5ebd7]'
                          : isAchieved
                          ? 'bg-[#18140f] border-[#382b1b] text-[#ded3be]'
                          : 'bg-[#110e0b] border-[#201911] text-[#6d5f4c]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        isCurrent
                          ? 'bg-[#c5a059] text-black'
                          : isAchieved
                          ? 'bg-[#3d2f1e] text-[#c5a059]'
                          : 'bg-[#18140e] text-[#554a3a]'
                      }`}>
                        {lvl.level}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold block truncate">
                          {lvl.title}
                        </span>
                        <span className="text-[10px] text-[#8f7f6a] block leading-tight">
                          {lvl.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Dedicado de Biografia do Expoente */}
      {selectedExponent && (
        <SaintDetailModal
          exponent={selectedExponent}
          vocation={currentSelectedVocation}
          onClose={() => setSelectedExponent(null)}
        />
      )}
    </>
  );
}
