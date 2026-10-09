import React, { useState, useEffect, useRef } from 'react';
import FormattedText from './FormattedText';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen,
  Award
} from 'lucide-react';

export default function QuizPlayer({ quiz, onFinishQuiz, onExit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Histórico detalhado para revisão final

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const feedbackRef = useRef(null);

  // Ao entrar no quiz, garante que a tela comece no topo
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Rolagem suave até a explicação assim que a resposta é registrada
  useEffect(() => {
    if (!isAnswerConfirmed) return undefined;
    const timer = setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
    return () => clearTimeout(timer);
  }, [isAnswerConfirmed]);

  // Evita perder o progresso por um toque acidental em "Abandonar"
  const handleExit = () => {
    if (
      userAnswers.length > 0 &&
      !window.confirm('Deseja abandonar o quiz? O progresso desta tentativa será perdido.')
    ) {
      return;
    }
    onExit();
  };

  // Selecionar uma alternativa
  const handleSelectOption = (optionId) => {
    if (isAnswerConfirmed) return; // Não permitir trocar após confirmação
    setSelectedOptionId(optionId);
    setIsAnswerConfirmed(true);

    const selectedOption = currentQuestion.options.find(o => o.id === optionId);
    const correctOption = currentQuestion.options.find(o => o.isCorrect);

    // Salvar registro desta resposta
    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId: optionId,
      selectedOptionText: selectedOption?.text,
      selectedOptionExplanation: selectedOption?.explanation,
      isCorrect: Boolean(selectedOption?.isCorrect),
      correctOptionId: correctOption?.id,
      correctOptionText: correctOption?.text,
      correctOptionExplanation: correctOption?.explanation
    };

    setUserAnswers(prev => [...prev, answerRecord]);
  };

  // Avançar para a próxima pergunta ou concluir
  const handleNext = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerConfirmed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Concluiu todas as questões
      const correctCount = userAnswers.filter(a => a.isCorrect).length;
      onFinishQuiz({
        score: correctCount,
        totalQuestions,
        answers: userAnswers
      });
    }
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-[#ded3be]">
        <p>Não há perguntas cadastradas neste módulo.</p>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-[#c5a059] text-black font-bold rounded">
          Voltar
        </button>
      </div>
    );
  }

  const selectedOptionObj = currentQuestion.options.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Top Navigation & Progress */}
      <div className="bg-[#14120e] border border-[#3d2f1e] rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleExit}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-[#a3947c] hover:text-[#c5a059] transition-colors min-h-[44px] px-2.5 -ml-2.5 rounded-md hover:bg-[#201a13]"
          >
            <ArrowLeft size={15} />
            <span>Abandonar Quiz</span>
          </button>

          <span className="hidden sm:block text-xs font-semibold uppercase tracking-widest text-[#c5a059] truncate">
            {quiz.title}
          </span>

          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#251e15] border border-[#4a3924] text-[#e6cb8e]">
            Questão {currentQuestionIndex + 1} de {totalQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label={`Progresso do quiz: questão ${currentQuestionIndex + 1} de ${totalQuestions}`}
          className="w-full bg-[#201a14] h-2 rounded-full overflow-hidden border border-[#3d2f1e]"
        >
          <div 
            className="h-full bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#f4d48f] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="parchment-card rounded-2xl p-5 sm:p-8 shadow-2xl">
        
        {/* Header of Question */}
        <div className="flex items-start gap-3 mb-5">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2a2015] border border-[#7a5d34] flex items-center justify-center text-xs font-bold text-[#c5a059] shrink-0 mt-0.5">
            {currentQuestionIndex + 1}
          </span>
          <h2 className="flex-1 min-w-0">
            <FormattedText text={currentQuestion.question} variant="question" />
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 sm:space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOptionId === option.id;
            
            let buttonStyle = "bg-[#181510] border-[#382b1b] text-[#ded3be] hover:border-[#c5a059]/60 hover:bg-[#201b13]";
            let badgeStyle = "bg-[#251d13] border-[#4d3a24] text-[#c5a059]";

            if (isAnswerConfirmed) {
              if (option.isCorrect) {
                // Alternativa correta sempre brilha em verde/dourado
                buttonStyle = "bg-emerald-950/40 border-emerald-600/80 text-emerald-100 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/50";
                badgeStyle = "bg-emerald-800 text-white border-emerald-500";
              } else if (isSelected && !option.isCorrect) {
                // Se o usuário selecionou esta errada, destaca em rubro
                buttonStyle = "bg-[#3d121a]/80 border-[#9c223a] text-rose-100 ring-1 ring-[#9c223a]/50";
                badgeStyle = "bg-[#7c1a2d] text-white border-[#9c223a]";
              } else {
                // Outras opções apagadas
                buttonStyle = "bg-[#13110d]/60 border-[#2a2217] text-[#6d614e] opacity-60";
                badgeStyle = "bg-[#1c1813] border-[#2e2417] text-[#554b3c]";
              }
            }

            return (
              <button
                key={option.id}
                disabled={isAnswerConfirmed}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-4 min-h-[56px] rounded-xl border transition-all duration-200 flex items-start gap-3.5 group relative ${buttonStyle} ${!isAnswerConfirmed ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
              >
                <span className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${badgeStyle}`}>
                  {letter}
                </span>

                <span className="text-sm sm:text-base leading-relaxed font-normal flex-1 min-w-0">
                  <FormattedText text={option.text} variant="option" />
                </span>

                {isAnswerConfirmed && (
                  <span className="shrink-0 mt-0.5">
                    {option.isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle size={18} className="text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pedagogical Explanation Box (Feedback Imediato US04) */}
        {isAnswerConfirmed && selectedOptionObj && (
          <div ref={feedbackRef} className="mt-6 pt-5 border-t border-[#382b1b] animate-fadeIn scroll-mt-24">
            <div 
              className={`p-4 sm:p-5 rounded-xl border ${
                selectedOptionObj.isCorrect 
                  ? "bg-emerald-950/30 border-emerald-700/60 text-emerald-100" 
                  : "bg-[#291319]/80 border-[#852336] text-rose-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-xs sm:text-sm uppercase tracking-wide">
                {selectedOptionObj.isCorrect ? (
                  <>
                    <CheckCircle2 size={17} className="text-emerald-400" />
                    <span className="text-emerald-300">Resposta Correta!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={17} className="text-rose-400" />
                    <span className="text-rose-300">Resposta Incorreta</span>
                  </>
                )}
              </div>

              {/* Justificativa detalhada da alternativa marcada */}
              <p className="text-sm sm:text-base text-[#ece4d0] leading-relaxed">
                {selectedOptionObj.explanation || (
                  selectedOptionObj.isCorrect 
                    ? "Esta alternativa expressa com exatidão a doutrina ensinada."
                    : "Esta proposição diverge do ensinamento filosófico e teológico apresentado na aula."
                )}
              </p>

              {/* Se errou, mostra também a explicação da alternativa que era a certa */}
              {!selectedOptionObj.isCorrect && (
                <div className="mt-3 pt-3 border-t border-[#852336]/40 text-sm sm:text-base text-emerald-200/90">
                  <span className="font-semibold block text-emerald-300 mb-1">
                    💡 A alternativa correta era:
                  </span>
                  <div className="text-[#d8cfbe]">
                    <FormattedText
                      text={currentQuestion.options.find(o => o.isCorrect)?.text}
                      variant="review"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Next Question / Finish Button */}
            <div className="mt-5 flex justify-end sticky bottom-3 z-10">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-[#0d0c0a] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>
                  {currentQuestionIndex + 1 < totalQuestions 
                    ? "Próxima Questão" 
                    : "Concluir e Ver Desfecho"}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
