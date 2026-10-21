import { createClient } from '@supabase/supabase-js';
import { DEFAULT_QUIZZES } from '../data/defaultQuizzes.js';

const STORAGE_KEYS = {
  CURRENT_USER: 'fides_current_user',
  QUIZZES: 'fides_quizzes_data',
  ATTEMPTS: 'fides_quiz_attempts',
  ADMIN_PIN: 'fides_admin_pin',
  SUPABASE_CONFIG: 'fides_supabase_config',
  USER_PROFILES: 'fides_user_profiles'
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

/**
 * Sincroniza as tentativas de um usuário da nuvem (Supabase) para o LocalStorage
 */
export async function syncUserAttemptsFromCloud(username) {
  const cleanUser = (username || '').trim();
  if (!cleanUser || !supabaseClient) return [];

  try {
    const { data, error } = await supabaseClient
      .from('attempts')
      .select('*')
      .ilike('username', cleanUser);

    if (!error && Array.isArray(data) && data.length > 0) {
      let localAttempts = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
        if (raw) localAttempts = JSON.parse(raw);
      } catch (e) {
        localAttempts = [];
      }

      data.forEach(item => {
        const cloudRecord = {
          id: `att-${item.id || Date.now()}`,
          username: item.username,
          quizId: item.quiz_id,
          highestScore: item.highest_score || 0,
          highestAcertos: item.highest_acertos || 0,
          totalQuestions: item.total_questions || 30,
          completed100: Boolean(item.completed_100),
          attemptsCount: item.attempts_count || 1,
          lastAttemptDate: item.last_attempt_date,
          lastAttemptScore: item.last_attempt_score || 0,
          answers: item.answers_payload || []
        };

        const existingIdx = localAttempts.findIndex(
          a => a.username.toLowerCase() === cleanUser.toLowerCase() && a.quizId === cloudRecord.quizId
        );

        if (existingIdx >= 0) {
          const curr = localAttempts[existingIdx];
          localAttempts[existingIdx] = {
            ...curr,
            highestScore: Math.max(curr.highestScore || 0, cloudRecord.highestScore),
            highestAcertos: Math.max(curr.highestAcertos || 0, cloudRecord.highestAcertos),
            completed100: curr.completed100 || cloudRecord.completed100,
            attemptsCount: Math.max(curr.attemptsCount || 1, cloudRecord.attemptsCount),
            lastAttemptDate: cloudRecord.lastAttemptDate || curr.lastAttemptDate
          };
        } else {
          localAttempts.push(cloudRecord);
        }
      });

      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(localAttempts));
      return localAttempts;
    }
  } catch (err) {
    console.warn('Erro ao sincronizar tentativas do Supabase:', err);
  }

  return [];
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

/* =========================================================
   SISTEMA DE GAMIFICAÇÃO SACRA & RPG (VOCAÇÕES, NÍVEIS E XP)
========================================================= */

export const LEVEL_THRESHOLDS = [
  { level: 1, xpRequired: 0, title: 'Iniciante' },
  { level: 2, xpRequired: 9000, title: 'Discípulo' },
  { level: 3, xpRequired: 22000, title: 'Bacharel' },
  { level: 4, xpRequired: 36000, title: 'Leitor' },
  { level: 5, xpRequired: 60000, title: 'Magister' },
  { level: 6, xpRequired: 90000, title: 'Mestre' },
  { level: 7, xpRequired: 130000, title: 'Doutor' },
];

export const VOCATION_TITLES = {
  intelectual: [
    'Ouvinte dos Preâmbulos',
    'Discípulo Escolástico',
    'Bacharel das Súmulas',
    'Leitor Sentenciário',
    'Magister Teológico',
    'Mestre Disputante',
    'Doutor da Igreja'
  ],
  mistica: [
    'Peregrino do Átrio',
    'Buscador do Recolhimento',
    'Habitante das Quintas Moradas',
    'Contemplador da Noite Escura',
    'Chama Viva de Amor',
    'Matrimônio Espiritual',
    'Doutor Místico'
  ],
  apologetica: [
    'Catecúmeno em Defesa',
    'Sentinela da Ortodoxia',
    'Polemosta da Verdade',
    'Escudo da Tradição',
    'Defensor Fidei',
    'Mártir da Razão',
    'Apologeta Iluminado'
  ],
  caritativa: [
    'Servidor dos Pobres',
    'Irmão Hospitaleiro',
    'Bálsamo dos Aflitos',
    'Arauto da Misericórdia',
    'Coluna da Basiliade',
    'Servo dos Servos de Deus',
    'Pai dos Desamparados'
  ],
  missionaria: [
    'Peregrino do Evangelho',
    'Semeador do Kerygma',
    'Voz no Areópago',
    'Desbravador dos Gentios',
    'Arauto das Nações',
    'Apóstolo dos Povos',
    'Patrono das Missões'
  ],
  pastoral: [
    'Catequista dos Simples',
    'Educador de Almas',
    'Pastor da Juventude',
    'Médico dos Penitentes',
    'Mestre do Sistema Preventivo',
    'Bom Pastor das Comunidades',
    'Patrono dos Pastores'
  ],
  artistica: [
    'Cantor do Santuário',
    'Artesão da Pedra e da Luz',
    'Iconógrafo do Mistério',
    'Harpa do Espírito Santo',
    'Mestre de Capela Celeste',
    'Poeta da Divina Comédia',
    'Artífice do Templo de Deus'
  ]
};

export const DEFAULT_VOCATION_ID = 'intelectual';

/**
 * Calcula o nível (1 a 7) baseado no XP total
 */
export function calculateLevelFromXp(xp = 0) {
  const safeXp = Math.max(0, Number(xp) || 0);
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (safeXp >= LEVEL_THRESHOLDS[i].xpRequired) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
}

/**
 * Retorna o título honorífico sacro de uma vocação para dado nível
 */
export function getVocationTitle(vocationId, level = 1) {
  const titles = VOCATION_TITLES[vocationId] || VOCATION_TITLES[DEFAULT_VOCATION_ID];
  const safeLevel = Math.max(1, Math.min(7, Number(level) || 1));
  return titles[safeLevel - 1] || titles[0];
}

/**
 * Retorna métricas detalhadas sobre o nível e progresso até o próximo nível
 */
export function getLevelInfo(xp = 0, vocationId = DEFAULT_VOCATION_ID) {
  const safeXp = Math.max(0, Number(xp) || 0);
  const currentLevel = calculateLevelFromXp(safeXp);
  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1];
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] || null;
  const title = getVocationTitle(vocationId, currentLevel);

  let progressPercent = 100;
  let xpIntoLevel = 0;
  let xpForNextLevel = 0;
  let xpRemaining = 0;

  if (nextThreshold) {
    const range = nextThreshold.xpRequired - currentThreshold.xpRequired;
    xpIntoLevel = safeXp - currentThreshold.xpRequired;
    xpForNextLevel = range;
    xpRemaining = Math.max(0, nextThreshold.xpRequired - safeXp);
    progressPercent = range > 0 ? Math.min(100, Math.round((xpIntoLevel / range) * 100)) : 100;
  }

  return {
    level: currentLevel,
    title,
    xp: safeXp,
    progressPercent,
    xpIntoLevel,
    xpForNextLevel,
    xpRemaining,
    isMaxLevel: !nextThreshold,
    nextTitle: nextThreshold ? getVocationTitle(vocationId, currentLevel + 1) : null,
    nextThresholdXp: nextThreshold ? nextThreshold.xpRequired : null
  };
}

/**
 * Herança Sagrada: calcula 1/7 (~14.28%) do maior XP do usuário
 */
export function calculateInheritedXp(highestXp = 0) {
  return Math.floor(Math.max(0, Number(highestXp) || 0) / 7);
}

/**
 * Cria a estrutura base das 7 vocações
 */
function getInitialVocationsData() {
  const vocations = ['intelectual', 'mistica', 'apologetica', 'caritativa', 'missionaria', 'pastoral', 'artistica'];
  const data = {};
  vocations.forEach(v => {
    data[v] = {
      xp: 0,
      level: 1,
      visited: v === DEFAULT_VOCATION_ID
    };
  });
  return data;
}

/**
 * Retroatividade: calcula o XP que um usuário já deveria ter com base em suas tentativas anteriores
 */
function calculateRetroactiveXpForUser(username) {
  const attempts = getUserAllRecords(username);
  let retroactiveXp = 0;
  const completed100Quizzes = [];

  attempts.forEach(att => {
    const totalQ = att.totalQuestions || 30;
    if (att.completed100 || att.highestScore === 100) {
      if (!completed100Quizzes.includes(att.quizId)) {
        completed100Quizzes.push(att.quizId);
      }
      // 30 questões * 100 XP * 3.0 (multiplicador) = 9000 XP
      retroactiveXp += (totalQ * 100) * 3;
    } else if (att.highestAcertos > 0) {
      retroactiveXp += (att.highestAcertos * 100);
    }
  });

  return { retroactiveXp, completed100Quizzes };
}

/**
 * Busca ou inicializa o perfil do usuário (nuvem + local) com suporte a retroatividade e auto-sincronização
 */
export async function getUserProfile(username) {
  const cleanUser = (username || '').trim();
  if (!cleanUser) return null;

  // 1. Sincronizar tentativas do Supabase primeiro (garante que tentativas feitas no celular venham para o computador)
  if (supabaseClient) {
    try {
      await syncUserAttemptsFromCloud(cleanUser);
    } catch (e) {
      console.warn('Falha prévia ao sincronizar tentativas:', e);
    }
  }

  let profile = null;

  // 2. Tentar ler do Supabase com busca case-insensitive (ilike)
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('user_profiles')
        .select('*')
        .ilike('username', cleanUser)
        .maybeSingle();

      if (!error && data) {
        profile = {
          username: data.username,
          active_vocation: data.active_vocation || DEFAULT_VOCATION_ID,
          vocations_data: data.vocations_data || getInitialVocationsData(),
          completed_quizzes_100: Array.isArray(data.completed_quizzes_100) ? data.completed_quizzes_100 : [],
          updated_at: data.updated_at
        };

        // Atualizar o cache LocalStorage
        try {
          let map = {};
          const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILES);
          if (raw) map = JSON.parse(raw);
          map[cleanUser.toLowerCase()] = profile;
          localStorage.setItem(STORAGE_KEYS.USER_PROFILES, JSON.stringify(map));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Erro ao carregar user_profile do Supabase:', err);
    }
  }

  // 3. Fallback para LocalStorage se a nuvem ainda não tiver o perfil
  let loadedFromLocal = false;
  if (!profile) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILES);
      if (raw) {
        const map = JSON.parse(raw);
        if (map && map[cleanUser.toLowerCase()]) {
          profile = map[cleanUser.toLowerCase()];
          loadedFromLocal = true;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Se o perfil existia localmente (ex: celular) e a nuvem estava vazia, faz o upload imediato para o Supabase!
  if (loadedFromLocal && profile && supabaseClient) {
    saveUserProfile(profile).catch(err => console.warn('Falha no auto-upload do perfil local para a nuvem:', err));
  }

  // 4. Se ainda não existe perfil, cria com base nas tentativas anteriores já sincronizadas
  if (!profile) {
    const { retroactiveXp, completed100Quizzes } = calculateRetroactiveXpForUser(cleanUser);
    const initialVocData = getInitialVocationsData();
    initialVocData[DEFAULT_VOCATION_ID] = {
      xp: retroactiveXp,
      level: calculateLevelFromXp(retroactiveXp),
      visited: true
    };

    profile = {
      username: cleanUser,
      active_vocation: DEFAULT_VOCATION_ID,
      vocations_data: initialVocData,
      completed_quizzes_100: completed100Quizzes,
      updated_at: new Date().toISOString()
    };

    await saveUserProfile(profile);
  } else {
    // 5. Garantia de consistência: se o perfil tem MENOS XP do que as tentativas provam que ele já alcançou
    const { retroactiveXp, completed100Quizzes } = calculateRetroactiveXpForUser(cleanUser);
    const activeVoc = profile.active_vocation || DEFAULT_VOCATION_ID;
    const currentVocXp = profile.vocations_data?.[activeVoc]?.xp || 0;

    let modified = false;

    if (retroactiveXp > currentVocXp) {
      if (!profile.vocations_data[activeVoc]) {
        profile.vocations_data[activeVoc] = { xp: 0, level: 1, visited: true };
      }
      profile.vocations_data[activeVoc].xp = retroactiveXp;
      profile.vocations_data[activeVoc].level = calculateLevelFromXp(retroactiveXp);
      profile.vocations_data[activeVoc].visited = true;

      const mergedQuizzes = Array.from(new Set([
        ...(profile.completed_quizzes_100 || []),
        ...completed100Quizzes
      ]));
      profile.completed_quizzes_100 = mergedQuizzes;
      modified = true;
    }

    // Garante integridade de todas as 7 vocações
    const baseVocData = getInitialVocationsData();
    if (!profile.vocations_data) {
      profile.vocations_data = baseVocData;
      modified = true;
    } else {
      Object.keys(baseVocData).forEach(vKey => {
        if (!profile.vocations_data[vKey]) {
          profile.vocations_data[vKey] = baseVocData[vKey];
          modified = true;
        }
      });
    }

    if (modified) {
      await saveUserProfile(profile);
    }
  }

  return profile;
}

/**
 * Salva o perfil do usuário em LocalStorage e no Supabase com proteção contra duplicatas de maiúsculas/minúsculas
 */
export async function saveUserProfile(profile) {
  if (!profile || !profile.username) return null;
  const cleanUser = profile.username.trim();
  const now = new Date().toISOString();

  const safeProfile = {
    ...profile,
    username: cleanUser,
    active_vocation: profile.active_vocation || DEFAULT_VOCATION_ID,
    vocations_data: profile.vocations_data || getInitialVocationsData(),
    completed_quizzes_100: Array.isArray(profile.completed_quizzes_100) ? profile.completed_quizzes_100 : [],
    updated_at: now
  };

  // Salvar no LocalStorage
  try {
    let map = {};
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILES);
    if (raw) map = JSON.parse(raw);
    map[cleanUser.toLowerCase()] = safeProfile;
    localStorage.setItem(STORAGE_KEYS.USER_PROFILES, JSON.stringify(map));
  } catch (e) {
    console.error('Erro ao salvar user_profile no localStorage:', e);
  }

  // Sincronizar com Supabase se conectado
  if (supabaseClient) {
    try {
      // Manter o mesmo casing exato do usuário se ele já constar no banco
      let targetUsername = cleanUser;
      const { data: existing } = await supabaseClient
        .from('user_profiles')
        .select('username')
        .ilike('username', cleanUser)
        .maybeSingle();

      if (existing?.username) {
        targetUsername = existing.username;
      }

      await supabaseClient.from('user_profiles').upsert({
        username: targetUsername,
        active_vocation: safeProfile.active_vocation,
        vocations_data: safeProfile.vocations_data,
        completed_quizzes_100: safeProfile.completed_quizzes_100,
        updated_at: now
      }, { onConflict: 'username' });
    } catch (err) {
      console.warn('Falha ao salvar user_profile no Supabase:', err);
    }
  }

  return safeProfile;
}

/**
 * Troca a vocação ativa do usuário, aplicando a herança de 1/7 se for a primeira vez
 */
export async function switchUserVocation(username, targetVocationId) {
  const profile = await getUserProfile(username);
  if (!profile) return null;

  const vocData = profile.vocations_data || getInitialVocationsData();
  const currentTarget = vocData[targetVocationId] || { xp: 0, level: 1, visited: false };

  // Se a vocação nunca foi visitada, aplica herança sagrada de 1/7 da maior vocação!
  if (!currentTarget.visited) {
    const highestXp = Math.max(
      ...Object.values(vocData).map(v => Number(v.xp) || 0)
    );
    const inheritedXp = calculateInheritedXp(highestXp);
    vocData[targetVocationId] = {
      xp: inheritedXp,
      level: calculateLevelFromXp(inheritedXp),
      visited: true
    };
  }

  profile.active_vocation = targetVocationId;
  profile.vocations_data = vocData;

  return await saveUserProfile(profile);
}

/**
 * Credita o XP ao concluir um quiz e retorna o resumo com multiplicador e level up
 */
export async function creditQuizCompletionXp({ username, quizId, score, totalQuestions, xpPerQuestion = 100, customBaseXp = null }) {
  const cleanUser = (username || '').trim();
  if (!cleanUser || !quizId) return null;

  const profile = await getUserProfile(cleanUser);
  if (!profile) return null;

  const activeVocId = profile.active_vocation || DEFAULT_VOCATION_ID;
  const vocRecord = profile.vocations_data[activeVocId] || { xp: 0, level: 1, visited: true };

  const is100 = score === totalQuestions && totalQuestions > 0;
  const completedList = profile.completed_quizzes_100 || [];
  const isFirst100 = is100 && !completedList.includes(quizId);

  let multiplier = 1.0;
  const baseXp = customBaseXp !== null ? customBaseXp : (score * xpPerQuestion);
  let earnedXp = baseXp;

  if (isFirst100) {
    multiplier = 3.0;
    earnedXp = baseXp * 3;
    completedList.push(quizId);
    profile.completed_quizzes_100 = completedList;
  }

  const oldXp = vocRecord.xp || 0;
  const oldLevel = vocRecord.level || 1;
  const newXp = oldXp + earnedXp;
  const newLevel = calculateLevelFromXp(newXp);

  vocRecord.xp = newXp;
  vocRecord.level = newLevel;
  vocRecord.visited = true;
  profile.vocations_data[activeVocId] = vocRecord;

  await saveUserProfile(profile);

  return {
    earnedXp,
    multiplier,
    isFirst100,
    is100,
    oldXp,
    newXp,
    oldLevel,
    newLevel,
    leveledUp: newLevel > oldLevel,
    activeVocation: activeVocId,
    vocationTitle: getVocationTitle(activeVocId, newLevel)
  };
}

/**
 * Retorna todos os perfis cadastrados (para a aba de alunos do AdminPanel)
 */
export async function getAllUserProfiles() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('user_profiles')
        .select('*');

      if (!error && data && data.length > 0) {
        const map = {};
        data.forEach(item => {
          map[item.username.toLowerCase()] = item;
        });
        return map;
      }
    } catch (err) {
      console.warn('Erro ao carregar lista de user_profiles do Supabase:', err);
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }

  return {};
}

