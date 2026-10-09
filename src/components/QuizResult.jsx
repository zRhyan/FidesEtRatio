import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import FormattedText from './FormattedText';
import { 
  Award, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function QuizResult({ 
  quiz, 
  result, 
  username, 
  onRetryQuiz, 
  onBackToModules,
  onOpenCertificate
}) {
  const [showErrorReview, setShowErrorReview] = useState(false);

  const { score, totalQuestions, answers = [] } = result;
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = percentage === 100;
  // Mantém o número original da questão para a revisão (ex.: "Questão 12")
  const incorrectAnswers = answers
    .map((a, i) => ({ ...a, number: i + 1 }))
    .filter(a => !a.isCorrect);

  // Ao exibir o resultado, a tela deve começar no topo (e não onde estava a última questão)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Efeito de confetes festivos para quem atingiu 100%!
  useEffect(() => {
    if (isPerfectScore) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#c5a059', '#e6cb8e', '#7c1a2d', '#ffffff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c5a059', '#e6cb8e', '#7c1a2d', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isPerfectScore]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn text-[#f4eedb]">
      
      {/* Result Hero Banner */}
      <div 
        className={`parchment-card rounded-2xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden ${
          isPerfectScore ? "border-[#c5a059] border-2" : "border-[#4a3924]"
        }`}
      >
        {/* Glow background for 100% */}
        {isPerfectScore && (
          <div className="absolute inset-0 bg-radial from-[#c5a059]/10 via-transparent to-transparent pointer-events-none"></div>
        )}

        {/* Seal / Medal */}
        <div className="relative mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24">
          <div className="w-full h-full rounded-full border-2 border-[#c5a059] p-1 shadow-xl bg-[#1d1811] flex items-center justify-center">
            {isPerfectScore ? (
              <img 
                src="/images/fides_seal.jpg" 
                alt="Selo Fides et Ratio" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Award size={48} className="text-[#c5a059]" />
            )}
          </div>
          {isPerfectScore && (
            <div className="absolute -bottom-1 -right-1 bg-[#c5a059] text-black p-1.5 rounded-full shadow">
              <Sparkles size={16} />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          {isPerfectScore ? (
            <>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] px-3 py-1 rounded-full bg-[#352717] border border-[#5a4228] inline-block mb-1">
                Aprovado com Maestria
              </span>
              <h1 className="medieval-title text-2xl sm:text-4xl font-black gold-gradient-text">
                Parabéns, {username}!
              </h1>
              <p className="manuscript-quote text-base sm:text-lg text-[#e6cb8e] max-w-xl mx-auto mt-2">
                "Você atingiu 100% de aproveitamento e está formalmente apto para o Encontro 2!"
              </p>
            </>
          ) : (
            <>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a89880] px-3 py-1 rounded-full bg-[#201a14] border border-[#382b1d] inline-block mb-1">
                Tentativa Concluída
              </span>
              <h1 className="medieval-title text-2xl sm:text-3xl font-bold text-[#ded3be]">
                Bom esforço, {username}!
              </h1>
              <p className="text-sm text-[#b5a990] max-w-lg mx-auto mt-1">
                Para obter o certificado e a aprovação no módulo, é necessário atingir 100% de acerto. Revise seus erros abaixo e tente novamente!
              </p>
            </>
          )}
        </div>

        {/* Score Stats Grid */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto my-6 sm:my-8">
          <div className="bg-[#181510] border border-[#33281a] rounded-xl p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs text-[#8c7d66] uppercase tracking-wider block">
              <span className="sm:hidden">Nota</span>
              <span className="hidden sm:inline">Aproveitamento</span>
            </span>
            <span className={`medieval-title text-xl sm:text-3xl font-bold ${isPerfectScore ? "text-[#c5a059]" : "text-[#ded3be]"}`}>
              {percentage}%
            </span>
          </div>

          <div className="bg-[#181510] border border-[#33281a] rounded-xl p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs text-[#8c7d66] uppercase tracking-wider block">
              Acertos
            </span>
            <span className="medieval-title text-xl sm:text-3xl font-bold text-emerald-400">
              {score}
            </span>
          </div>

          <div className="bg-[#181510] border border-[#33281a] rounded-xl p-3 sm:p-4">
            <span className="text-[10px] sm:text-xs text-[#8c7d66] uppercase tracking-wider block">
              Erros
            </span>
            <span className="medieval-title text-xl sm:text-3xl font-bold text-rose-400">
              {totalQuestions - score}
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          
          {/* Botão Refazer Quiz (US06) */}
          <button
            onClick={onRetryQuiz}
            className={`w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
              isPerfectScore
                ? "bg-[#1c1813] hover:bg-[#28221a] text-[#b5a990] border border-[#3d2f1e]"
                : "bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-[#0d0c0a]"
            }`}
          >
            <RotateCcw size={16} />
            <span>Refazer Quiz Agora</span>
          </button>

          {/* Botão Ver Certificado se 100% */}
          {isPerfectScore && (
            <button
              onClick={() => onOpenCertificate({ quiz, record: { highestScore: 100, completed100: true }, username })}
              className="order-first w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-[#0d0c0a] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Award size={17} />
              <span>Visualizar Certificado</span>
            </button>
          )}

          {/* Botão Voltar aos Módulos */}
          <button
            onClick={onBackToModules}
            className="w-full sm:w-auto px-5 py-3.5 min-h-[48px] rounded-xl bg-[#1c1813] hover:bg-[#28221a] text-[#b5a990] border border-[#3d2f1e] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen size={16} />
            <span>Outros Módulos</span>
          </button>

        </div>

      </div>

      {/* Botão e Painel de Revisão de Erros (US05) */}
      {incorrectAnswers.length > 0 ? (
        <div className="parchment-card rounded-2xl p-5 sm:p-6 border border-[#522933]">
          
          <button
            onClick={() => setShowErrorReview(prev => !prev)}
            className="w-full flex items-center justify-between text-left p-2 rounded-lg hover:bg-[#201518] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3d151c] text-rose-400 flex items-center justify-center border border-[#70212f]">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-rose-200">
                  Revisar Questões Erradas ({incorrectAnswers.length})
                </h3>
                <p className="text-xs text-[#a89297]">
                  Clique para conferir as explicações doutrinárias de cada erro e aprender a resposta correta.
                </p>
              </div>
            </div>

            <span className="text-rose-400 p-1">
              {showErrorReview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>

          {showErrorReview && (
            <div className="mt-5 space-y-4 pt-4 border-t border-[#4d252e] animate-fadeIn">
              {incorrectAnswers.map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#181113] border border-[#52252e] rounded-xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#3b151d] text-rose-300 border border-[#6b2230] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <span className="sr-only">Questão </span>
                      {item.number}
                    </span>
                    <h4 className="flex-1 min-w-0 text-sm sm:text-base font-bold text-[#f2e6dc] leading-relaxed">
                      <FormattedText text={item.questionText} variant="review" />
                    </h4>
                  </div>

                  {/* Resposta que o aluno marcou incorretamente */}
                  <div className="p-3 sm:p-4 rounded-lg bg-[#2d1217]/70 border border-[#7c2132]/60 text-sm sm:text-base">
                    <div className="flex items-center gap-1.5 text-rose-300 font-bold mb-1 text-[11px] uppercase tracking-wider">
                      <XCircle size={14} />
                      <span>Sua resposta (Incorreta):</span>
                    </div>
                    <div className="text-rose-100">
                      <FormattedText text={item.selectedOptionText} variant="review" />
                    </div>
                    {item.selectedOptionExplanation && (
                      <p className="mt-2 text-[#d1b8bd] text-sm pt-2 border-t border-[#7c2132]/40">
                        <strong className="text-rose-200">Por que está incorreta: </strong>
                        {item.selectedOptionExplanation}
                      </p>
                    )}
                  </div>

                  {/* Resposta correta com explicação */}
                  <div className="p-3 sm:p-4 rounded-lg bg-emerald-950/40 border border-emerald-700/60 text-sm sm:text-base">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-1 text-[11px] uppercase tracking-wider">
                      <CheckCircle2 size={14} />
                      <span>Resposta Correta:</span>
                    </div>
                    <div className="text-emerald-100 font-medium">
                      <FormattedText text={item.correctOptionText} variant="review" />
                    </div>
                    {item.correctOptionExplanation && (
                      <p className="mt-2 text-[#bde0cc] text-sm pt-2 border-t border-emerald-800/40">
                        <strong className="text-emerald-300">Justificativa doutrinária: </strong>
                        {item.correctOptionExplanation}
                      </p>
                    )}
                  </div>

                </div>
              ))}

              <div className="pt-2 text-center">
                <button
                  onClick={onRetryQuiz}
                  className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-lg bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d6b46e] transition-colors"
                >
                  Tentar Novamente Agora
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-center text-xs text-emerald-300">
          ✨ Você acertou todas as questões! Não há erros a revisar nesta tentativa.
        </div>
      )}

    </div>
  );
}
