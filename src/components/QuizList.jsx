import React from 'react';
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { getUserRecordForQuiz } from '../services/storage';

export default function QuizList({ 
  quizzes = [], 
  isLoading = false,
  currentUser, 
  onSelectQuiz, 
  onOpenUserModal,
  onOpenCertificate
}) {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Section with Scholastic Artwork */}
      <div className="relative rounded-2xl overflow-hidden border border-[#4d3a24] shadow-2xl bg-[#14120e]">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img 
            src="/images/fides_hero.jpg" 
            alt="Santo Tomás de Aquino e Santo Agostinho - Fides et Ratio" 
            className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1]"
          />
          {/* Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09] via-[#0e0c09]/60 to-black/30"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a1e12]/80 border border-[#6b4f2c] text-[#e6cb8e] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm mb-2 w-fit">
              <Sparkles size={13} className="text-[#c5a059]" />
              Formação Catequética & Apologética
            </div>
            
            <h1 className="medieval-title text-2xl sm:text-4xl md:text-5xl font-black text-[#fbf8ee] tracking-tight max-w-3xl leading-tight">
              Fides et Ratio
            </h1>
            
            <p className="manuscript-quote text-base sm:text-xl text-[#ded3be] max-w-2xl mt-1 leading-snug">
              "A fé e a razão constituem como que as duas asas pelas quais o espírito humano se eleva para a contemplação da verdade."
            </p>
            <p className="text-xs text-[#a09077] mt-1 font-sans">
              — São João Paulo II & São Tomás de Aquino
            </p>
          </div>
        </div>
      </div>

      {/* User Welcome / Status Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#171410] border border-[#3d2f1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {currentUser ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                Participante Ativo
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[#f4eedb] flex items-center gap-2">
                Salve, {currentUser}!
              </h2>
              <p className="text-xs text-[#b5a990] mt-0.5">
                Escolha o módulo da aula que deseja realizar. É necessário obter 100% de acertos para liberação do certificado.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                Aviso de Identificação
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[#f4eedb]">
                Identifique-se para registrar seu progresso
              </h2>
              <p className="text-xs text-[#b5a990] mt-0.5">
                Coloque apenas o seu nome para que suas notas e certificados fiquem registrados.
              </p>
            </div>
          )}
        </div>

        {!currentUser && (
          <button
            onClick={onOpenUserModal}
            className="w-full sm:w-auto px-5 py-3 min-h-[48px] rounded-lg bg-[#c5a059] hover:bg-[#d6b46e] text-[#0d0c0a] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md"
          >
            Identificar-se Agora
          </button>
        )}
      </div>

      {/* Quizzes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="medieval-title text-xl sm:text-2xl font-bold text-[#e6cb8e] flex items-center gap-2">
            <BookOpen size={22} className="text-[#c5a059]" />
            Módulos de Formação & Quizzes
          </h2>
          <span className="text-xs text-[#8c7e68]">
            {isLoading
              ? 'Carregando...'
              : `${quizzes.length} módulo${quizzes.length > 1 ? 's' : ''} disponível${quizzes.length > 1 ? 'is' : ''}`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {isLoading && quizzes.length === 0 && (
            <div
              role="status"
              aria-live="polite"
              className="md:col-span-2 parchment-card rounded-xl p-8 text-center text-sm text-[#b5a990] animate-pulse"
            >
              📜 Carregando os módulos de formação...
            </div>
          )}
          {quizzes.map((quiz) => {
            const userRecord = currentUser ? getUserRecordForQuiz(currentUser, quiz.id) : null;
            const hasCompleted100 = userRecord?.completed100 || userRecord?.highestScore === 100;
            const highestScore = userRecord?.highestScore;

            return (
              <div 
                key={quiz.id}
                className="group parchment-card rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-[#c5a059]/60 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Module Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#292015] text-[#c5a059] border border-[#4a3924]">
                      Módulo {quiz.moduleNumber || 1}
                    </span>

                    {hasCompleted100 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-700/60 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={13} />
                        100% Concluído
                      </span>
                    ) : highestScore !== undefined ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded-full">
                        Melhor: {highestScore}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#7a6f5e] italic">
                        Não iniciado
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="medieval-title text-lg sm:text-xl font-bold text-[#f4eedb] group-hover:text-[#e6cb8e] transition-colors leading-snug">
                    {quiz.title}
                  </h3>
                  
                  {quiz.subtitle && (
                    <p className="manuscript-quote text-sm text-[#c5a059] font-medium mt-1">
                      {quiz.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#b5a990] mt-2 line-clamp-3 leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#8c7d66] mt-4 pt-3 border-t border-[#292218]">
                    <span>
                      📜 {quiz.questions?.length || 0} questões
                    </span>
                    <span>
                      🎯 Meta: 100% de acerto
                    </span>
                    {userRecord?.attemptsCount && (
                      <span>
                        🔄 {userRecord.attemptsCount} tentativa{userRecord.attemptsCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenUserModal();
                      } else {
                        onSelectQuiz(quiz);
                      }
                    }}
                    className={`flex-1 min-w-[10rem] py-3 min-h-[48px] px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      hasCompleted100
                        ? "bg-[#292218] hover:bg-[#382d1f] text-[#e6cb8e] border border-[#5c472d]"
                        : "bg-gradient-to-r from-[#9b7834] to-[#c5a059] hover:brightness-110 text-[#0d0c0a]"
                    }`}
                  >
                    <span>
                      {hasCompleted100 
                        ? "Refazer para Praticar" 
                        : highestScore !== undefined 
                          ? "Tentar Novamente (Buscar 100%)" 
                          : "Iniciar Quiz"}
                    </span>
                    <ArrowRight size={14} />
                  </button>

                  {hasCompleted100 && (
                    <button
                      onClick={() => onOpenCertificate({ quiz, record: userRecord, username: currentUser })}
                      className="py-3 min-h-[48px] px-4 rounded-lg bg-[#3a2c1a] hover:bg-[#4d3a24] text-[#ffd983] border border-[#7a5d34] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Ver Certificado de Aprovação"
                    >
                      <Award size={15} />
                      <span>Certificado</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
