import React from 'react';
import { Shield, User, LogOut, Award, ArrowLeftRight } from 'lucide-react';

export default function Header({ 
  currentUser, 
  onOpenUserModal, 
  onLogoutUser, 
  onOpenAdmin,
  onGoHome,
  isAdminActive,
  onExitAdmin,
  completedCount = 0
}) {
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
