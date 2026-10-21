import React from 'react';
import { 
  Shield, 
  User, 
  LogOut, 
  Award, 
  ArrowLeftRight,
  BookOpen,
  Flame,
  HeartHandshake,
  Compass,
  Users,
  Palette,
  Sparkles
} from 'lucide-react';
import { getVocationById } from '../data/vocationsData.js';
import { getLevelInfo } from '../services/storage.js';

const VOCATION_ICONS = {
  BookOpen,
  Flame,
  Shield,
  HeartHandshake,
  Compass,
  Users,
  Palette
};

export default function Header({ 
  currentUser, 
  userProfile,
  onOpenVocations,
  onOpenUserModal, 
  onLogoutUser, 
  onOpenAdmin,
  onGoHome,
  isAdminActive,
  onExitAdmin,
  completedCount = 0
}) {
  const activeVocId = userProfile?.active_vocation || 'intelectual';
  const vocationObj = getVocationById(activeVocId);
  const currentVocXp = userProfile?.vocations_data?.[activeVocId]?.xp || 0;
  const currentLevelInfo = getLevelInfo(currentVocXp, activeVocId);
  const VocationIcon = VOCATION_ICONS[vocationObj?.iconName] || BookOpen;

  return (
    <header className="sticky top-0 z-40 bg-[#0f0e0c]/90 backdrop-blur-md border-b border-[#33281a] shadow-lg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Brand / Title with Sacred Seal (leva à lista de módulos) */}
        <button
          type="button"
          onClick={onGoHome}
          aria-label="Ir para a lista de módulos"
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-left min-w-0"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden border-2 border-[#c5a059] shadow-md group-hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/fides_seal.jpg" 
              alt="Selo Fides et Ratio" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Em telas muito estreitas (< 360px) apenas o selo é exibido, para caber o restante da barra */}
          <div className="max-[359px]:hidden">
            <div className="flex items-center gap-2">
              <span className="medieval-title text-sm min-[400px]:text-base sm:text-xl font-bold tracking-wider gold-gradient-text whitespace-nowrap">
                FIDES ET RATIO
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#382618] text-[#c5a059] border border-[#5a4228]">
                Catequese
              </span>
            </div>
            <p className="manuscript-quote text-[11px] sm:text-xs text-[#b5a990] hidden xs:block">
              Fé e Razão na busca da Verdade
            </p>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Badge de Vocação & Nível (abre o VocationModal) */}
          {currentUser && userProfile && (
            <button
              type="button"
              onClick={onOpenVocations}
              title={`Vocação ${vocationObj?.name || 'Consagrada'}. Toque para ver as 7 Vocações da Igreja`}
              className="flex items-center gap-1.5 sm:gap-2 min-h-[44px] bg-[#1a1510] hover:bg-[#251e16] border border-[#523e24] hover:border-[#c5a059] rounded-full px-2 sm:px-3 py-1 shadow transition-all group shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-[#2a2015] border border-[#c5a059]/60 flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform shrink-0">
                <VocationIcon size={13} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059] hidden min-[460px]:inline">
                    {vocationObj?.shortName || 'Vocação'}
                  </span>
                  <span className="text-[11px] font-bold text-[#f5ebd7]">
                    Nvl {currentLevelInfo.level}
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 mt-0.5">
                  <div className="w-14 h-1.5 bg-[#251d14] rounded-full overflow-hidden border border-[#4a3922]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8f6d2f] to-[#e6cb8e]"
                      style={{ width: `${currentLevelInfo.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-[#b3a186]">
                    {currentLevelInfo.progressPercent}%
                  </span>
                </div>
              </div>
            </button>
          )}

          {/* User Status / Badge (toda a área é clicável para trocar de estudante) */}
          {currentUser ? (
            <button
              type="button"
              onClick={onOpenUserModal}
              title="Trocar estudante"
              aria-label={`Estudante ${currentUser}. Toque para trocar de estudante`}
              className="flex items-center gap-1.5 sm:gap-2 min-h-[44px] bg-[#1c1813] hover:bg-[#241f17] border border-[#3d3021] rounded-full pl-1.5 pr-2.5 sm:pl-2 sm:pr-3 py-1 shadow-inner transition-colors"
            >
              <span className="w-7 h-7 shrink-0 rounded-full bg-[#382b1c] flex items-center justify-center text-[#c5a059]">
                <User size={14} />
              </span>
              <span className="text-left">
                <span className="text-xs sm:text-sm font-medium text-[#f4eedb] max-w-[84px] min-[400px]:max-w-[110px] sm:max-w-[130px] truncate block leading-tight">
                  {currentUser}
                </span>
                {completedCount > 0 && (
                  <span className="text-[10px] text-[#c5a059] flex items-center gap-0.5 leading-none mt-0.5">
                    <Award size={10} /> {completedCount} concluído{completedCount > 1 ? 's' : ''}
                  </span>
                )}
              </span>
              <span className="flex items-center gap-1 text-[#998b73] text-xs ml-0.5">
                <ArrowLeftRight size={13} />
                <span className="hidden sm:inline">Trocar</span>
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenUserModal}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 min-h-[44px] rounded-md bg-[#251e15] border border-[#4d3a24] text-[#e6cb8e] hover:bg-[#382a1a] transition-colors"
            >
              <User size={14} />
              <span>Identificar-se</span>
            </button>
          )}

          {/* Admin Toggle Button */}
          {isAdminActive ? (
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1 text-xs font-semibold px-3 min-h-[44px] rounded-md bg-[#7c1a2d] hover:bg-[#9c223a] text-white transition-colors border border-[#a82941] shadow-sm"
              title="Sair do Modo Catequista / Administrador"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sair do Painel</span>
              <span className="sm:hidden">Sair</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 min-h-[44px] min-w-[44px] rounded-md bg-[#1a1712] border border-[#443522] text-[#c5a059] hover:bg-[#2e2316] hover:border-[#c5a059] transition-all"
              title="Acessar Painel do Catequista / Admin"
              aria-label="Acessar Painel do Catequista"
            >
              <Shield size={16} />
              <span className="hidden sm:inline">Catequista</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
