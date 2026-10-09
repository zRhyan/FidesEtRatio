import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Award, 
  Search, 
  Filter, 
  Save, 
  X, 
  Settings, 
  Database, 
  Key, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  Download
} from 'lucide-react';
import { 
  getAllAttemptsSummary, 
  saveQuiz, 
  deleteQuiz, 
  getAdminPin, 
  setAdminPin,
  getSupabaseConfig,
  saveSupabaseConfig
} from '../services/storage';

export default function AdminPanel({ 
  quizzes = [], 
  onRefreshQuizzes, 
  onClose,
  onOpenCertificate
}) {
  const [activeTab, setActiveTab] = useState('scores'); // 'scores' | 'quizzes' | 'settings'
  const [attempts, setAttempts] = useState([]);
  const [selectedQuizFilter, setSelectedQuizFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | '100' | 'pending'
  const [searchQuery, setSearchQuery] = useState('');

  // Estados de Criação / Edição de Quiz
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [editingQuizData, setEditingQuizData] = useState(null);

  // Estados de Configuração
  const [currentPin, setCurrentPin] = useState('...');
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState(false);
  const [pinUpdating, setPinUpdating] = useState(false);

  // Estados de Supabase
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [supabaseSavedMsg, setSupabaseSavedMsg] = useState(false);

  useEffect(() => {
    loadAttempts();
    loadPin();
    const cfg = getSupabaseConfig();
    setSupabaseUrl(cfg.url || '');
    setSupabaseKey(cfg.anonKey || '');
  }, []);

  const loadPin = async () => {
    const pin = await getAdminPin();
    setCurrentPin(pin);
  };

  const loadAttempts = async () => {
    const data = await getAllAttemptsSummary();
    setAttempts(data);
  };

  // Filtragem dos registros de pontuação
  const filteredAttempts = attempts.filter(att => {
    const matchesQuiz = selectedQuizFilter === 'all' || att.quizId === selectedQuizFilter;
    const is100 = att.completed100 || att.highestScore === 100;
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === '100' && is100) || 
      (statusFilter === 'pending' && !is100);
    const matchesSearch = att.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuiz && matchesStatus && matchesSearch;
  });

  // Estatísticas do topo
  const totalStudents = new Set(attempts.map(a => a.username.toLowerCase())).size;
  const certifiedStudents = new Set(
    attempts.filter(a => a.completed100 || a.highestScore === 100).map(a => a.username.toLowerCase())
  ).size;

  // Iniciar criação de novo quiz
  const handleStartCreateQuiz = () => {
    setEditingQuizData({
      id: `quiz-aula-${quizzes.length + 1}`,
      title: `Encontro ${quizzes.length + 1}: Novo Tema`,
      subtitle: 'Subtítulo da Aula',
      description: 'Descrição sucinta dos temas abordados neste encontro formativo.',
      moduleNumber: quizzes.length + 1,
      passingScore: 100,
      coverImage: '/images/fides_hero.jpg',
      questions: [
        {
          id: `q-${Date.now()}-1`,
          question: 'Enunciado da primeira questão...',
          options: [
            {
              id: `opt-1`,
              text: 'Alternativa A (Exemplo)',
              isCorrect: true,
              explanation: 'Explicação detalhada do porquê esta alternativa é correta.'
            },
            {
              id: `opt-2`,
              text: 'Alternativa B (Exemplo)',
              isCorrect: false,
              explanation: 'Explicação pedagógica do porquê esta alternativa está errada.'
            },
            {
              id: `opt-3`,
              text: 'Alternativa C (Exemplo)',
              isCorrect: false,
              explanation: 'Explicação pedagógica do porquê esta alternativa está errada.'
            },
            {
              id: `opt-4`,
              text: 'Alternativa D (Exemplo)',
              isCorrect: false,
              explanation: 'Explicação pedagógica do porquê esta alternativa está errada.'
            }
          ]
        }
      ]
    });
    setIsEditingQuiz(true);
  };

  // Iniciar edição de quiz existente
  const handleStartEditQuiz = (quiz) => {
    // Clonar dados para não mutar diretamente
    setEditingQuizData(JSON.parse(JSON.stringify(quiz)));
    setIsEditingQuiz(true);
  };

  // Salvar Quiz
  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    if (!editingQuizData.title.trim()) {
      alert('Por favor, informe o título do quiz.');
      return;
    }
    await saveQuiz(editingQuizData);
    await onRefreshQuizzes();
    setIsEditingQuiz(false);
    setEditingQuizData(null);
  };

  // Excluir Quiz
  const handleDeleteQuiz = async (quizId) => {
    if (confirm('Tem certeza de que deseja excluir este quiz?')) {
      await deleteQuiz(quizId);
      await onRefreshQuizzes();
    }
  };

  // Atualizar PIN (Nuvem + Local)
  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (!newPin.trim() || pinUpdating) return;

    setPinUpdating(true);
    try {
      const trimmed = newPin.trim();
      await setAdminPin(trimmed);
      setCurrentPin(trimmed);
      setNewPin('');
      setPinSuccessMsg(true);
      setTimeout(() => setPinSuccessMsg(false), 3000);
    } catch (err) {
      console.error('Erro ao atualizar PIN:', err);
    } finally {
      setPinUpdating(false);
    }
  };

  // Salvar Supabase Config
  const handleSaveSupabase = (e) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseUrl, supabaseKey);
    setSupabaseSavedMsg(true);
    setTimeout(() => setSupabaseSavedMsg(false), 3000);
  };

  // Adicionar pergunta ao quiz em edição
  const handleAddQuestion = () => {
    const newQ = {
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      question: '',
      options: [
        { id: `opt-1`, text: '', isCorrect: true, explanation: '' },
        { id: `opt-2`, text: '', isCorrect: false, explanation: '' },
        { id: `opt-3`, text: '', isCorrect: false, explanation: '' },
        { id: `opt-4`, text: '', isCorrect: false, explanation: '' }
      ]
    };
    setEditingQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQ]
    }));
  };

  // Remover pergunta
  const handleRemoveQuestion = (qIndex) => {
    setEditingQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== qIndex)
    }));
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn text-[#f4eedb]">
      
      {/* Top Banner do Painel */}
      <div className="bg-[#171410] border border-[#4d3a24] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c5a059] px-2.5 py-0.5 rounded-full bg-[#2a1e12] border border-[#5a4228] mb-1">
            <Award size={13} />
            Mesa do Formador
          </div>
          <h1 className="medieval-title text-2xl sm:text-3xl font-bold gold-gradient-text">
            Painel do Catequista
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a990] mt-0.5">
            Gerenciamento de módulos, acompanhamento de notas máximas e controle de certificados para o Encontro 2.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-[#221c15] hover:bg-[#2e251a] text-[#ded3be] border border-[#4d3a24] text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Voltar à Área do Aluno
        </button>
      </div>

      {/* Tabs de Navegação do Painel */}
      <div className="flex border-b border-[#33281a] gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => { setActiveTab('scores'); setIsEditingQuiz(false); }}
          className={`px-4 py-2.5 rounded-t-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'scores' && !isEditingQuiz
              ? "bg-[#251e15] border-t border-x border-[#5c472d] text-[#e6cb8e]"
              : "text-[#8c7d66] hover:text-[#ded3be]"
          }`}
        >
          <Users size={16} />
          <span>Acompanhamento de Alunos ({attempts.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('quizzes'); }}
          className={`px-4 py-2.5 rounded-t-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'quizzes' || isEditingQuiz
              ? "bg-[#251e15] border-t border-x border-[#5c472d] text-[#e6cb8e]"
              : "text-[#8c7d66] hover:text-[#ded3be]"
          }`}
        >
          <BookOpen size={16} />
          <span>Gestão de Quizzes ({quizzes.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('settings'); setIsEditingQuiz(false); }}
          className={`px-4 py-2.5 rounded-t-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? "bg-[#251e15] border-t border-x border-[#5c472d] text-[#e6cb8e]"
              : "text-[#8c7d66] hover:text-[#ded3be]"
          }`}
        >
          <Settings size={16} />
          <span>Nuvem & Configurações</span>
        </button>
      </div>

      {/* =========================================================
          ABA 1: ACOMPANHAMENTO DE NOTAS E ALUNOS (US08)
      ========================================================= */}
      {activeTab === 'scores' && !isEditingQuiz && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Métricas Resumidas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#14120e] border border-[#33281a] rounded-xl p-4">
              <span className="text-xs text-[#8c7d66] uppercase tracking-wider block">
                Total de Alunos Únicos
              </span>
              <span className="medieval-title text-2xl font-bold text-[#ded3be] mt-1 block">
                {totalStudents}
              </span>
            </div>

            <div className="bg-[#14120e] border border-[#5a4228] rounded-xl p-4 bg-gradient-to-br from-[#1a150e] to-[#251c12]">
              <span className="text-xs text-[#c5a059] uppercase tracking-wider block font-semibold flex items-center gap-1">
                <Award size={14} /> Aprovados com 100%
              </span>
              <span className="medieval-title text-2xl font-bold text-[#e6cb8e] mt-1 block">
                {certifiedStudents}
              </span>
              <span className="text-[11px] text-[#a8977c]">
                Aptos ao certificado e Encontro 2
              </span>
            </div>

            <div className="bg-[#14120e] border border-[#33281a] rounded-xl p-4">
              <span className="text-xs text-[#8c7d66] uppercase tracking-wider block">
                Total de Tentativas Registradas
              </span>
              <span className="medieval-title text-2xl font-bold text-[#ded3be] mt-1 block">
                {attempts.reduce((acc, a) => acc + (a.attemptsCount || 1), 0)}
              </span>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="bg-[#14120e] border border-[#33281a] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Input de Busca */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7d6f5c]" />
              <input
                type="text"
                placeholder="Buscar por nome do aluno..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Filtro de Quiz */}
            <select
              value={selectedQuizFilter}
              onChange={(e) => setSelectedQuizFilter(e.target.value)}
              className="bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
            >
              <option value="all">Todos os Quizzes</option>
              {quizzes.map(q => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>

            {/* Filtro de Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
            >
              <option value="all">Todos os Status</option>
              <option value="100">Apenas 100% (Aprovados)</option>
              <option value="pending">Em Progresso (&lt;100%)</option>
            </select>

          </div>

          {/* Tabela de Resultados */}
          <div className="bg-[#14120e] border border-[#33281a] rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1b1712] text-[#c5a059] border-b border-[#33281a] uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-bold">Aluno / Participante</th>
                    <th className="py-3 px-4 font-bold">Módulo / Quiz</th>
                    <th className="py-3 px-4 font-bold text-center">Nota Mais Alta (Recorde)</th>
                    <th className="py-3 px-4 font-bold text-center">Status de Aprovação</th>
                    <th className="py-3 px-4 font-bold text-center">Tentativas</th>
                    <th className="py-3 px-4 font-bold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#251d14]">
                  {filteredAttempts.length > 0 ? (
                    filteredAttempts.map((att, idx) => {
                      const is100 = att.completed100 || att.highestScore === 100;
                      const quizObj = quizzes.find(q => q.id === att.quizId);

                      return (
                        <tr key={idx} className="hover:bg-[#1a1610] transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#f4eedb] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#292015] border border-[#4a3924] flex items-center justify-center text-[11px] text-[#c5a059]">
                              {att.username.charAt(0).toUpperCase()}
                            </span>
                            <span>{att.username}</span>
                          </td>

                          <td className="py-3.5 px-4 text-[#ded3be]">
                            {quizObj ? quizObj.title : att.quizId}
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex items-center gap-1.5 font-bold">
                              <span className={`medieval-title text-sm ${is100 ? "text-[#c5a059]" : "text-[#ded3be]"}`}>
                                {att.highestScore}%
                              </span>
                              <span className="text-[10px] text-[#7d6f5c]">
                                ({att.highestAcertos}/{att.totalQuestions})
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            {is100 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-600/70 text-emerald-300 font-bold text-[11px]">
                                <Award size={13} className="text-[#c5a059]" />
                                Apto p/ Aula 2 (100%)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/30 border border-amber-800/50 text-amber-300 text-[11px]">
                                <Clock size={12} />
                                Em Progresso
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-center text-[#998b75]">
                            {att.attemptsCount || 1}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {is100 && (
                              <button
                                onClick={() => onOpenCertificate({ quiz: quizObj, record: att, username: att.username })}
                                className="px-2.5 py-1 rounded bg-[#332517] hover:bg-[#4d3720] text-[#ffd983] border border-[#6b4e2a] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                                title="Ver e imprimir certificado"
                              >
                                <Award size={13} />
                                <span>Certificado</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#7d6f5c]">
                        Nenhum registro encontrado com os filtros atuais.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================
          ABA 2: GESTÃO E CRIAÇÃO DE QUIZZES (US07)
      ========================================================= */}
      {(activeTab === 'quizzes' || isEditingQuiz) && (
        <div className="space-y-6 animate-fadeIn">
          
          {!isEditingQuiz ? (
            /* Lista de Quizzes para gerenciar */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="medieval-title text-xl font-bold text-[#e6cb8e]">
                  Quizzes Disponíveis no Sistema
                </h2>
                <button
                  onClick={handleStartCreateQuiz}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] text-[#0d0c0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition-all shadow-md"
                >
                  <Plus size={16} />
                  <span>Criar Novo Quiz</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {quizzes.map((q) => (
                  <div 
                    key={q.id}
                    className="p-5 rounded-xl bg-[#14120e] border border-[#3d2f1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#292015] text-[#c5a059] border border-[#4a3924]">
                          Módulo {q.moduleNumber || 1}
                        </span>
                        <span className="text-xs text-[#8c7d66]">
                          {q.questions?.length || 0} questões cadastradas
                        </span>
                      </div>
                      <h3 className="medieval-title text-lg font-bold text-[#f4eedb] mt-1">
                        {q.title}
                      </h3>
                      <p className="text-xs text-[#b5a990] mt-0.5">
                        {q.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleStartEditQuiz(q)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-[#251e15] hover:bg-[#382a1a] text-[#e6cb8e] border border-[#52402a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 size={14} />
                        <span>Editar Perguntas</span>
                      </button>

                      {quizzes.length > 1 && (
                        <button
                          onClick={() => handleDeleteQuiz(q.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#2e1318] hover:bg-[#471821] text-rose-300 border border-[#6b2230] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          title="Excluir este quiz"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Formulário de Criação / Edição do Quiz (US07) */
            <form onSubmit={handleSaveQuiz} className="space-y-6 parchment-card p-6 sm:p-8 rounded-2xl border border-[#52402a]">
              <div className="flex items-center justify-between border-b border-[#3d2f1e] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059]">
                    Editor de Formação
                  </span>
                  <h2 className="medieval-title text-xl sm:text-2xl font-bold gold-gradient-text">
                    Configurar Quiz & Justificativas
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => { setIsEditingQuiz(false); setEditingQuizData(null); }}
                  className="text-[#8c7d66] hover:text-[#f4eedb] p-2 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Informações Básicas do Quiz */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-1">
                    Título da Aula / Quiz:
                  </label>
                  <input
                    type="text"
                    value={editingQuizData.title}
                    onChange={(e) => setEditingQuizData({ ...editingQuizData, title: e.target.value })}
                    required
                    className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-1">
                    Subtítulo Temático:
                  </label>
                  <input
                    type="text"
                    value={editingQuizData.subtitle || ''}
                    onChange={(e) => setEditingQuizData({ ...editingQuizData, subtitle: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-1">
                    Descrição Geral:
                  </label>
                  <textarea
                    rows={2}
                    value={editingQuizData.description || ''}
                    onChange={(e) => setEditingQuizData({ ...editingQuizData, description: e.target.value })}
                    className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Lista de Perguntas */}
              <div className="space-y-6 pt-4 border-t border-[#382b1b]">
                <div className="flex items-center justify-between">
                  <h3 className="medieval-title text-lg font-bold text-[#e6cb8e]">
                    Perguntas & Explicações ({editingQuizData.questions.length})
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-1.5 rounded-lg bg-[#251e15] hover:bg-[#382a1a] text-[#c5a059] border border-[#5c472d] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Adicionar Pergunta</span>
                  </button>
                </div>

                {editingQuizData.questions.map((q, qIndex) => (
                  <div 
                    key={q.id || qIndex}
                    className="p-4 sm:p-5 rounded-xl bg-[#17140f] border border-[#3d2e1c] space-y-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                        Questão {qIndex + 1}
                      </span>
                      {editingQuizData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="text-rose-400 hover:text-rose-300 p-1 text-xs flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                          <span>Remover</span>
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#a3947c] uppercase font-semibold mb-1">
                        Enunciado da Pergunta:
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...editingQuizData.questions];
                          updated[qIndex].question = e.target.value;
                          setEditingQuizData({ ...editingQuizData, questions: updated });
                        }}
                        placeholder="Ex: O que é o Fideísmo e por que deve ser combatido?"
                        required
                        className="w-full bg-[#1e1a14] border border-[#4d3a24] rounded-lg px-3 py-2 text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
                      />
                    </div>

                    {/* Alternativas da Pergunta */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-[11px] text-[#c5a059] uppercase font-bold">
                        Alternativas (Selecione o botão da correta e preencha a explicação de cada uma):
                      </label>

                      {q.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        return (
                          <div 
                            key={opt.id || optIndex}
                            className={`p-3 rounded-lg border space-y-2 transition-all ${
                              opt.isCorrect 
                                ? "bg-emerald-950/20 border-emerald-700/60" 
                                : "bg-[#1f1a14] border-[#382b1b]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {/* Rádio para marcar correta */}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...editingQuizData.questions];
                                  updated[qIndex].options = updated[qIndex].options.map((o, idx) => ({
                                    ...o,
                                    isCorrect: idx === optIndex
                                  }));
                                  setEditingQuizData({ ...editingQuizData, questions: updated });
                                }}
                                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border transition-colors ${
                                  opt.isCorrect
                                    ? "bg-emerald-600 border-emerald-400 text-white"
                                    : "bg-[#2a2217] border-[#4a3924] text-[#8c7d66] hover:border-[#c5a059]"
                                }`}
                                title="Marcar como alternativa correta"
                              >
                                {letter}
                              </button>

                              <input
                                type="text"
                                value={opt.text}
                                onChange={(e) => {
                                  const updated = [...editingQuizData.questions];
                                  updated[qIndex].options[optIndex].text = e.target.value;
                                  setEditingQuizData({ ...editingQuizData, questions: updated });
                                }}
                                placeholder={`Texto da alternativa ${letter}...`}
                                required
                                className="flex-1 bg-[#14120e] border border-[#3d2f1e] rounded-md px-3 py-1.5 text-xs sm:text-sm text-[#f4eedb] outline-none focus:border-[#c5a059]"
                              />

                              {opt.isCorrect && (
                                <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 whitespace-nowrap">
                                  ✓ Correta
                                </span>
                              )}
                            </div>

                            {/* Campo de Justificativa Pedagógica individual da alternativa */}
                            <div>
                              <input
                                type="text"
                                value={opt.explanation || ''}
                                onChange={(e) => {
                                  const updated = [...editingQuizData.questions];
                                  updated[qIndex].options[optIndex].explanation = e.target.value;
                                  setEditingQuizData({ ...editingQuizData, questions: updated });
                                }}
                                placeholder={
                                  opt.isCorrect
                                    ? "Explicação do porquê está correta (ex: Santo Tomás ensina que...)"
                                    : "Explicação do porquê está errada (ex: Esta ideia confunde fideísmo com racionalismo...)"
                                }
                                className="w-full bg-[#17140f] border border-[#2e2316] rounded-md px-3 py-1.5 text-xs text-[#b5a990] placeholder-[#6d5f4c] outline-none focus:border-[#c5a059]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ))}

              </div>

              {/* Botões do Formulário */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3d2f1e]">
                <button
                  type="button"
                  onClick={() => { setIsEditingQuiz(false); setEditingQuizData(null); }}
                  className="px-4 py-2.5 rounded-lg bg-[#201a14] hover:bg-[#2c2319] text-[#b5a990] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#9b7834] via-[#c5a059] to-[#9b7834] hover:brightness-110 text-[#0d0c0a] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <Save size={16} />
                  <span>Salvar Quiz Completo</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* =========================================================
          ABA 3: NUVEM (SUPABASE) & CONFIGURAÇÕES
      ========================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-2xl animate-fadeIn">
          
          {/* Configuração do Supabase */}
          <div className="bg-[#14120e] border border-[#3d2f1e] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#c5a059]">
              <Database size={20} />
              <h3 className="medieval-title text-base sm:text-lg font-bold">
                Conexão com Banco em Nuvem (Supabase)
              </h3>
            </div>

            <p className="text-xs text-[#a3947c] leading-relaxed">
              Para sincronizar as notas de todos os celulares dos participantes com o seu computador em tempo real, configure sua chave gratuita do Supabase. Se deixar vazio, o sistema funciona perfeitamente em modo local.
            </p>

            <form onSubmit={handleSaveSupabase} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#c5a059] uppercase tracking-wider mb-1">
                  Supabase Project URL:
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#c5a059] uppercase tracking-wider mb-1">
                  Supabase Anon Key:
                </label>
                <input
                  type="password"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#c5a059] hover:bg-[#d6b46e] text-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Salvar Credenciais
                </button>
                {supabaseSavedMsg && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check size={14} /> Configurações salvas com sucesso!
                  </span>
                )}
              </div>
            </form>

            {/* Script SQL para o Supabase */}
            <div className="mt-4 pt-4 border-t border-[#292218]">
              <span className="text-[11px] font-semibold text-[#c5a059] block mb-1">
                Comando SQL para criação de tabelas no Supabase (Opcional):
              </span>
              <pre className="bg-[#0b0a08] border border-[#2b2114] p-3 rounded-lg text-[10px] text-[#b8a78d] overflow-x-auto font-mono">
{`-- Cole no SQL Editor do Supabase se desejar persistência em nuvem:
CREATE TABLE IF NOT EXISTS attempts (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  highest_score INT DEFAULT 0,
  highest_acertos INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  completed_100 BOOLEAN DEFAULT false,
  attempts_count INT DEFAULT 1,
  last_attempt_score INT DEFAULT 0,
  last_attempt_date TIMESTAMPTZ DEFAULT NOW(),
  answers_payload JSONB,
  UNIQUE(username, quiz_id)
);

ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Attempts" ON attempts FOR ALL USING (true) WITH CHECK (true);

-- Tabela para guardar configurações globais (PIN mestre sincronizado):
CREATE TABLE IF NOT EXISTS fides_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fides_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Settings" ON fides_settings FOR ALL USING (true) WITH CHECK (true);`}
              </pre>
            </div>
          </div>

          {/* Alteração de PIN de Administrador */}
          <div className="bg-[#14120e] border border-[#3d2f1e] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-[#c5a059]">
              <Key size={20} />
              <h3 className="medieval-title text-base sm:text-lg font-bold">
                Segurança & PIN do Administrador (Sincronizado na Nuvem)
              </h3>
            </div>

            <p className="text-xs text-[#a3947c]">
              O PIN atual é: <code className="text-[#c5a059] font-mono font-bold">{currentPin}</code>. Ao alterar aqui, a nova senha é propagada na nuvem para qualquer aparelho ou navegador.
            </p>

            <form onSubmit={handleUpdatePin} className="flex gap-2">
              <input
                type="text"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Novo PIN (ex: veritas)"
                className="flex-1 bg-[#1b1712] border border-[#3d2f1e] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f4eedb] outline-none font-mono"
              />
              <button
                type="submit"
                disabled={pinUpdating}
                className={`px-4 py-2 rounded-lg bg-[#382b1c] text-[#ffd983] border border-[#6b502e] text-xs font-semibold uppercase tracking-wider transition-colors ${pinUpdating ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#4d3a24]'}`}
              >
                {pinUpdating ? 'Salvando...' : 'Alterar PIN'}
              </button>
            </form>

            {pinSuccessMsg && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <Check size={14} /> PIN alterado com sucesso!
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
