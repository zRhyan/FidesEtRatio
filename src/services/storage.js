import { createClient } from '@supabase/supabase-js';
import { DEFAULT_QUIZZES } from '../data/defaultQuizzes';

const STORAGE_KEYS = {
  CURRENT_USER: 'fides_current_user',
  QUIZZES: 'fides_quizzes_data',
  ATTEMPTS: 'fides_quiz_attempts',
  ADMIN_PIN: 'fides_admin_pin',
  SUPABASE_CONFIG: 'fides_supabase_config'
};

const DEFAULT_PIN = 'veritas';

// Inicialização segura do cliente Supabase
let supabaseClient = null;

export function getSupabaseConfig() {
  const envUrl = import.meta.env?.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        url: parsed.url || envUrl,
        anonKey: parsed.anonKey || envKey,
        isConfigured: Boolean((parsed.url || envUrl) && (parsed.anonKey || envKey))
      };
    }
  } catch (e) {
    console.error('Erro ao ler config do Supabase:', e);
  }

  return {
    url: envUrl,
    anonKey: envKey,
    isConfigured: Boolean(envUrl && envKey)
  };
}

export function saveSupabaseConfig(url, anonKey) {
  const config = { url: url.trim(), anonKey: anonKey.trim() };
  localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
  initSupabase();
  return getSupabaseConfig();
}

function initSupabase() {
  const cfg = getSupabaseConfig();
  if (cfg.url && cfg.anonKey) {
    try {
      supabaseClient = createClient(cfg.url, cfg.anonKey);
    } catch (err) {
      console.warn('Falha ao inicializar Supabase:', err);
      supabaseClient = null;
    }
  } else {
    supabaseClient = null;
  }
}

// Inicializar na carga do módulo
initSupabase();

/* =========================================================
   GESTÃO DE USUÁRIO CORRENTE
========================================================= */

export function getCurrentUser() {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '';
}

export function setCurrentUser(username) {
  const cleanName = (username || '').trim();
  if (cleanName) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, cleanName);
  }
  return cleanName;
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

/* =========================================================
   GESTÃO DO PIN DE ADMINISTRADOR (NUVEM + LOCAL)
========================================================= */

export async function getAdminPin() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('fides_settings')
        .select('value')
        .eq('key', 'admin_pin')
        .maybeSingle();

      if (!error && data && data.value) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, data.value);
        return data.value;
      }
    } catch (err) {
      console.warn('Erro ao buscar PIN no Supabase:', err);
    }
  }

  return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN;
}

export async function setAdminPin(newPin) {
  const pin = (newPin || '').trim();
  if (!pin) return false;

  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, pin);

  if (supabaseClient) {
    try {
      await supabaseClient
        .from('fides_settings')
        .upsert({
          key: 'admin_pin',
          value: pin,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });
    } catch (err) {
      console.warn('Erro ao salvar PIN no Supabase:', err);
    }
  }

  return true;
}

export async function verifyAdminPin(candidatePin) {
  const currentPin = await getAdminPin();
  return (candidatePin || '').trim().toLowerCase() === currentPin.toLowerCase();
}

/* =========================================================
   GESTÃO DE QUIZZES
========================================================= */

export async function getQuizzes() {
  // Se Supabase estiver conectado, tenta sincronizar
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('quizzes')
        .select('*')
        .order('moduleNumber', { ascending: true });

      if (!error && data && data.length > 0) {
        // Armazena cache local atualizado
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Erro ao carregar quizzes do Supabase, usando cache local:', err);
    }
  }

  // Fallback: carregar de localStorage ou DEFAULT_QUIZZES
  const local = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Se o quiz padrão Encontro 1 no cache estiver desatualizado (< questões ou versão anterior), atualiza-o
        const defaultEncontro1 = DEFAULT_QUIZZES.find(q => q.id === 'quiz-encontro-1');
        const cachedEncontro1 = parsed.find(q => q.id === 'quiz-encontro-1');
        if (defaultEncontro1 && cachedEncontro1 && (
          (cachedEncontro1.questions?.length || 0) < defaultEncontro1.questions.length ||
          cachedEncontro1.version !== defaultEncontro1.version
        )) {
          const updated = parsed.map(q => q.id === 'quiz-encontro-1' ? defaultEncontro1 : q);
          localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(updated));
          return updated;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Salvar padrões se vazio
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
  return DEFAULT_QUIZZES;
}

export async function saveQuiz(quiz) {
  const currentQuizzes = await getQuizzes();
  const existingIndex = currentQuizzes.findIndex(q => q.id === quiz.id);
  let updatedList;

  if (existingIndex >= 0) {
    updatedList = [...currentQuizzes];
    updatedList[existingIndex] = { ...quiz, updatedAt: new Date().toISOString() };
  } else {
    updatedList = [
      ...currentQuizzes,
      {
        ...quiz,
        id: quiz.id || `quiz-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // Salvar no LocalStorage
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(updatedList));

  // Salvar no Supabase se configurado
  if (supabaseClient) {
    try {
      await supabaseClient.from('quizzes').upsert({
        id: quiz.id,
        title: quiz.title,
        subtitle: quiz.subtitle,
        description: quiz.description,
        moduleNumber: quiz.moduleNumber || 1,
        passingScore: quiz.passingScore || 100,
        coverImage: quiz.coverImage || '',
        questions: quiz.questions,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Falha ao salvar quiz no Supabase:', err);
    }
  }

  return updatedList;
}

export async function deleteQuiz(quizId) {
  const currentQuizzes = await getQuizzes();
  const updatedList = currentQuizzes.filter(q => q.id !== quizId);
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(updatedList));

  if (supabaseClient) {
    try {
      await supabaseClient.from('quizzes').delete().eq('id', quizId);
    } catch (err) {
      console.warn('Falha ao excluir quiz no Supabase:', err);
    }
  }

  return updatedList;
}

/* =========================================================
   GESTÃO DE TENTATIVAS E NOTAS MAIS ALTAS (HIGH SCORES)
========================================================= */

export async function recordQuizAttempt({ username, quizId, score, totalQuestions, answers }) {
  const cleanUser = (username || '').trim();
  if (!cleanUser || !quizId) return null;

  const percentage = Math.round((score / totalQuestions) * 100);
  const now = new Date().toISOString();

  // Ler tentativas existentes
  let attempts = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (raw) attempts = JSON.parse(raw);
  } catch (e) {
    attempts = [];
  }

  // Encontrar histórico existente do aluno para este quiz
  const existingRecordIndex = attempts.findIndex(
    a => a.username.toLowerCase() === cleanUser.toLowerCase() && a.quizId === quizId
  );

  let updatedRecord;

  if (existingRecordIndex >= 0) {
    const current = attempts[existingRecordIndex];
    // A nota mais alta NUNCA é rebaixada! Se já tirou 100%, permanece 100%!
    const isNewHighScore = percentage > current.highestScore;
    const highestScore = Math.max(current.highestScore || 0, percentage);
    const highestAcertos = highestScore === percentage 
      ? score 
      : Math.max(current.highestAcertos || 0, score);
    const completed100 = current.completed100 || percentage === 100;

    updatedRecord = {
      ...current,
      highestScore,
      highestAcertos,
      totalQuestions,
      completed100,
      attemptsCount: (current.attemptsCount || 1) + 1,
      lastAttemptScore: percentage,
      lastAttemptAcertos: score,
      lastAttemptDate: now,
      history: [
        ...(current.history || []),
        { score, percentage, date: now, answers }
      ]
    };

    attempts[existingRecordIndex] = updatedRecord;
  } else {
    updatedRecord = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      username: cleanUser,
      quizId,
      highestScore: percentage,
      highestAcertos: score,
      totalQuestions,
      completed100: percentage === 100,
      attemptsCount: 1,
      lastAttemptScore: percentage,
      lastAttemptAcertos: score,
      lastAttemptDate: now,
      history: [
        { score, percentage, date: now, answers }
      ]
    };
    attempts.push(updatedRecord);
  }

  // Salvar no LocalStorage
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

  // Sincronizar com Supabase se configurado
  if (supabaseClient) {
    try {
      await supabaseClient.from('attempts').upsert({
        username: cleanUser,
        quiz_id: quizId,
        highest_score: updatedRecord.highestScore,
        highest_acertos: updatedRecord.highestAcertos,
        total_questions: totalQuestions,
        completed_100: updatedRecord.completed100,
        attempts_count: updatedRecord.attemptsCount,
        last_attempt_score: percentage,
        last_attempt_date: now,
        answers_payload: answers
      }, { onConflict: 'username,quiz_id' });
    } catch (err) {
      console.warn('Falha ao sincronizar tentativa no Supabase:', err);
    }
  }

  return updatedRecord;
}

export function getUserRecordForQuiz(username, quizId) {
  if (!username || !quizId) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (!raw) return null;
    const attempts = JSON.parse(raw);
    return attempts.find(
      a => a.username.toLowerCase() === username.trim().toLowerCase() && a.quizId === quizId
    ) || null;
  } catch (e) {
    return null;
  }
}

export function getUserAllRecords(username) {
  if (!username) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (!raw) return [];
    const attempts = JSON.parse(raw);
    return attempts.filter(
      a => a.username.toLowerCase() === username.trim().toLowerCase()
    );
  } catch (e) {
    return [];
  }
}

export async function getAllAttemptsSummary() {
  let attempts = [];

  // Tenta buscar do Supabase se disponível
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('attempts')
        .select('*')
        .order('last_attempt_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          username: item.username,
          quizId: item.quiz_id,
          highestScore: item.highest_score,
          highestAcertos: item.highest_acertos,
          totalQuestions: item.total_questions,
          completed100: item.completed_100,
          attemptsCount: item.attempts_count,
          lastAttemptDate: item.last_attempt_date,
          lastAttemptScore: item.last_attempt_score
        }));
      }
    } catch (err) {
      console.warn('Erro ao buscar tentativas do Supabase:', err);
    }
  }

  // Fallback LocalStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (raw) attempts = JSON.parse(raw);
  } catch (e) {
    attempts = [];
  }

  return attempts;
}
