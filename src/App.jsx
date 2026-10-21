import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserModal from './components/UserModal';
import QuizList from './components/QuizList';
import QuizPlayer from './components/QuizPlayer';
import QuizResult from './components/QuizResult';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal from './components/AdminLoginModal';
import CertificateModal from './components/CertificateModal';
import VocationModal from './components/VocationModal';
import { 
  getCurrentUser, 
  setCurrentUser, 
  clearCurrentUser, 
  getQuizzes, 
  recordQuizAttempt,
  getUserAllRecords,
  getUserProfile,
  creditQuizCompletionXp,
  switchUserVocation
} from './services/storage';

export default function App() {
  const [currentUser, setLocalCurrentUser] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeResult, setActiveResult] = useState(null);
  const [lastFinishedQuiz, setLastFinishedQuiz] = useState(null);

  // Modais e telas
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isVocationModalOpen, setIsVocationModalOpen] = useState(false);

  // Estatística de módulos concluídos pelo aluno atual
  const [completedCount, setCompletedCount] = useState(0);

  const loadProfile = async (username) => {
    if (!username) {
      setUserProfile(null);
      return;
    }
    try {
      const profile = await getUserProfile(username);
      setUserProfile(profile);
      const records = getUserAllRecords(username);
      const count = records.filter(r => r.completed100 || r.highestScore === 100).length;
      setCompletedCount(count);
    } catch (err) {
      console.warn('Erro ao carregar perfil do usuário:', err);
    }
  };

  useEffect(() => {
    // Carregar usuário ativo
    const user = getCurrentUser();
    if (user) {
      setLocalCurrentUser(user);
      loadProfile(user);
    } else {
      // Se for primeiro acesso, convidar a se identificar
      setIsUserModalOpen(true);
    }

    // Carregar quizzes
    loadQuizzesList();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const records = getUserAllRecords(currentUser);
      const count = records.filter(r => r.completed100 || r.highestScore === 100).length;
      setCompletedCount(count);
    } else {
      setCompletedCount(0);
    }
  }, [currentUser, quizzes, activeResult]);

  const loadQuizzesList = async () => {
    try {
      const list = await getQuizzes();
      setQuizzes(list);
    } finally {
      setQuizzesLoading(false);
    }
  };

  const handleSaveUser = async (name) => {
    const saved = setCurrentUser(name);
    setLocalCurrentUser(saved);
    if (saved) {
      await loadProfile(saved);
    }
  };

  const handleLogoutUser = () => {
    clearCurrentUser();
    setLocalCurrentUser('');
    setUserProfile(null);
    setIsUserModalOpen(true);
  };

  const handleSelectQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setActiveResult(null);
    setLastFinishedQuiz(null);
  };

  const handleFinishQuiz = async ({ score, totalQuestions, answers }) => {
    const quizBeingFinished = activeQuiz;
    setLastFinishedQuiz(quizBeingFinished);

    let xpResult = null;
    if (currentUser && quizBeingFinished) {
      await recordQuizAttempt({
        username: currentUser,
        quizId: quizBeingFinished.id,
        score,
        totalQuestions,
        answers
      });

      // Calcula o XP base somando o xpReward individual de cada questão acertada
      let customBaseXp = 0;
      if (Array.isArray(quizBeingFinished.questions) && answers) {
        quizBeingFinished.questions.forEach((q, idx) => {
          const ans = answers[idx];
          if (ans && ans.isCorrect) {
            customBaseXp += (Number(q.xpReward) || 100);
          }
        });
      } else {
        customBaseXp = score * 100;
      }

      // Credita XP com a regra estrita de conclusão e multiplicador 3.0x
      try {
        xpResult = await creditQuizCompletionXp({
          username: currentUser,
          quizId: quizBeingFinished.id,
          score,
          totalQuestions,
          xpPerQuestion: 100,
          customBaseXp
        });
        await loadProfile(currentUser);
      } catch (err) {
        console.warn('Erro ao creditar XP:', err);
      }
    }

    setActiveResult({ score, totalQuestions, answers, xpResult });
    setActiveQuiz(null);
    await loadQuizzesList();
  };

  const handleSelectVocation = async (targetVocationId) => {
    if (!currentUser) return;
    try {
      const updated = await switchUserVocation(currentUser, targetVocationId);
      setUserProfile(updated);
    } catch (err) {
      console.warn('Erro ao trocar vocação:', err);
    }
  };

  const handleRetryQuiz = () => {
    if (lastFinishedQuiz) {
      setActiveQuiz(lastFinishedQuiz);
      setActiveResult(null);
    }
  };

  const handleBackToModules = () => {
    setActiveQuiz(null);
    setActiveResult(null);
    setLastFinishedQuiz(null);
  };

  // Toque no logo: volta à lista de módulos (confirmando se houver quiz em andamento)
  const handleGoHome = () => {
    if (activeQuiz && !window.confirm('Deseja sair do quiz em andamento? O progresso desta tentativa será perdido.')) {
      return;
    }
    setIsAdminActive(false);
    handleBackToModules();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#f4eedb] flex flex-col justify-between selection:bg-[#c5a059] selection:text-black">
      
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        userProfile={userProfile}
        onOpenVocations={() => setIsVocationModalOpen(true)}
        onOpenUserModal={() => setIsUserModalOpen(true)}
        onLogoutUser={handleLogoutUser}
        onOpenAdmin={() => setIsAdminLoginModalOpen(true)}
        onGoHome={handleGoHome}
        isAdminActive={isAdminActive}
        onExitAdmin={() => setIsAdminActive(false)}
        completedCount={completedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8">
        
        {/* Modo Administrador */}
        {isAdminActive ? (
          <AdminPanel
            quizzes={quizzes}
            onRefreshQuizzes={loadQuizzesList}
            onClose={() => setIsAdminActive(false)}
            onOpenCertificate={(data) => setCertificateData(data)}
          />
        ) : activeQuiz ? (
          /* Modo Execução de Quiz (Quiz Player) */
          <QuizPlayer
            quiz={activeQuiz}
            onFinishQuiz={handleFinishQuiz}
            onExit={handleBackToModules}
          />
        ) : activeResult && lastFinishedQuiz ? (
          /* Modo Tela de Desfecho & Revisão de Erros */
          <QuizResult
            quiz={lastFinishedQuiz}
            result={activeResult}
            username={currentUser || 'Participante'}
            onRetryQuiz={handleRetryQuiz}
            onBackToModules={handleBackToModules}
            onOpenCertificate={(data) => setCertificateData(data)}
          />
        ) : (
          /* Modo Lista de Módulos (Área do Estudante) */
          <QuizList
            quizzes={quizzes}
            isLoading={quizzesLoading}
            currentUser={currentUser}
            onSelectQuiz={handleSelectQuiz}
            onOpenUserModal={() => setIsUserModalOpen(true)}
            onOpenCertificate={(data) => setCertificateData(data)}
          />
        )}

      </main>

      {/* Modais do Sistema */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSaveUser={handleSaveUser}
        currentUserName={currentUser}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setIsAdminActive(true);
        }}
      />

      <CertificateModal
        isOpen={Boolean(certificateData)}
        onClose={() => setCertificateData(null)}
        data={certificateData}
      />

      <VocationModal
        isOpen={isVocationModalOpen}
        onClose={() => setIsVocationModalOpen(false)}
        userProfile={userProfile}
        onSelectVocation={handleSelectVocation}
      />

      {/* Footer Sacro Medieval */}
      <footer className="border-t border-[#261e14] bg-[#090807] py-6 sm:py-8 text-center text-xs text-[#8c7d66] space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
          <span className="medieval-title tracking-wider text-[#ded3be]">Fides et Ratio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
        </div>
        <p className="manuscript-quote text-[#a8977c]">
          "Omnis homo naturaliter scire desiderat" — Todo homem tem, por natureza, o desejo de conhecer. (Aristóteles & Santo Tomás)
        </p>
        <p className="text-[11px] text-[#635745]">
          Apostolado Catequético & Apologético • Preparação para o Encontro 2
        </p>
      </footer>

    </div>
  );
}
