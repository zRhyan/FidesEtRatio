# CHANGELOGS - Fides et Ratio

Registro cronológico inverso de versões, modificações implementadas e marcos do projeto.

## [v1.4.2] - 26/10/2026
### Rotina Diária de Keep-Alive para o Supabase
- **Agendamento Diário Fora de Pico:** Atualização do cron em `.github/workflows/supabase-keep-alive.yml` para execução diária às 06:27 BRT (09:27 UTC), evitando filas de sobrecarga da virada de hora (`:00`) e prevenindo com folga a pausa por inatividade do plano gratuito do Supabase.
- **Log Detalhado de Resposta:** Registro do corpo de resposta do PostgREST no console da Action para auditoria imediata de conectividade.

---

## [v1.4.1] - 21/10/2026
### Sincronização Bidirecional e Auto-Upload em Nuvem
- **Auto-Upload de Cache Local:** Quando um dispositivo possui perfil com progresso local (ex: Nível 2) e a nuvem ainda não possui o registro, o sistema realiza o upload automático e silencioso para a tabela `user_profiles` no Supabase.
- **Sincronização de Tentativas da Nuvem (`syncUserAttemptsFromCloud`):** Ao identificar o usuário em qualquer aparelho, o sistema baixa as tentativas salvas no Supabase (`attempts`) e atualiza o `localStorage`, garantindo que certificados e histórico de 100% apareçam em todos os dispositivos.
- **Busca Insensível a Maiúsculas/Minúsculas (`ilike`):** Consultas ao Supabase normalizadas para evitar divergência de cadastro entre diferentes teclados e aparelhos (ex: `Rhyan` vs `rhyan`).
- **Garantia de Não-Regressão de XP:** Verificação de consistência que impede que o perfil em nuvem ou local fique com nível/XP inferior ao comprovado pelo histórico de tentativas do catequizando.

---

## [v1.4.0] - 21/10/2026
### Sistema de Gamificação Sacra, 7 Vocações e Progressão RPG
- **Catálogo das 7 Vocações da Igreja (`src/data/vocationsData.js`):** Implementação das vocações *Intelectual*, *Mística*, *Apologética*, *Caritativa*, *Missionária*, *Pastoral* e *Artística*, cada uma com axioma, oração patronal e escala de 7 graus/níveis de ascensão histórica.
- **Imagens Locais Autônomas dos 50 Expoentes:** Download de retratos e pinturas clássicas em domínio público de todos os 50 santos e pensadores para `public/assets/expoentes/` e `src/assets/expoentes/`, assegurando funcionamento offline irrestrito e eliminação de dependências externas.
- **Motor de Gamificação & Calibração de XP (`src/services/storage.js`):**
  - Conclusão de 100% dos 4 módulos oficiais (4 × 9.000 XP = 36.000 XP) atinge exatamente o Nível 4; níveis 5 a 7 (até 130.000 XP) incentivam repetição e estudo contínuo.
  - Multiplicador de **3.0x** concedido exclusivamente na primeira conclusão de um quiz com 100% de acerto.
  - Repetições de estudo concedem XP base pelas questões acertadas (sem o bônus de 3.0x).
  - Regra estrita de abandono: sair antes da conclusão descarta o XP acumulado na sessão.
  - Herança Sagrada: migração para uma vocação inédita herda 1/7 do maior XP histórico; retorno a uma vocação visitada restaura o progresso intacto.
  - Crédito retroativo de XP automático para usuários com tentativas pré-existentes.
  - Tabela `user_profiles` no Supabase com sincronização híbrida e fallback em `localStorage`.
- **Novos Componentes e Experiência do Usuário (UI/UX):**
  - `Header.jsx`: Badge dinâmico da vocação ativa com ícone litúrgico, nível atual e mini barra de progresso dourada com acesso rápido.
  - `VocationModal.jsx` & `SaintDetailModal.jsx`: Modal de navegação pelas 7 vocações, visualização da escada de níveis, prévia da herança e galeria de expoentes com modais biográficos aprofundados.
  - `QuizPlayer.jsx`: Modal de confirmação de saída com aviso explícito de perda de XP.
  - `QuizResult.jsx`: Card de XP conquistado, selo de maestria 3.0x e celebração animada de *LEVEL UP* com chuva de confetes sacros.
  - `AdminPanel.jsx`: Tabela desktop e cards mobile de alunos enriquecidos com vocação ativa, grau e XP acumulado; editor de quizzes com campo de recompensa personalizável de XP por pergunta (`xpReward`, padrão 100 XP).
- **Documentação de Arquitetura:** Criação do documento executivo [`docs/documento_executivo_gamificacao_rpg.md`](./documento_executivo_gamificacao_rpg.md).

---

## [v1.3.0] - 21/10/2026
### Marcador de Acertos e Erros em Tempo Real no Quiz
- **Feedback Contínuo de Desempenho (`src/components/QuizPlayer.jsx`):** Adição de marcador compacto no cabeçalho durante a resolução do quiz, exibindo a contagem acumulada de acertos em verde esmeralda (`Check`) e de erros em vermelho rubro (`X`).

---

## [v1.2.0] - 21/10/2026
### Rotina Automatizada de Keep-Alive para o Supabase
- **Workflow Agendado no GitHub Actions (`.github/workflows/supabase-keep-alive.yml`):** Automação com execução 2 vezes por semana (segundas e quintas às 09:00 BRT) via `curl` na API PostgREST, registrando atividade contínua no PostgreSQL e prevenindo a pausa automática do plano gratuito do Supabase.

---

## [v1.1.0] - 21/10/2026
### Usabilidade Mobile e Formatação de Silogismos
- **Formatação de Silogismos (`src/components/FormattedText.jsx`):** Renderização estilizada de premissas e conclusões lógicas através de selos (`• P1:`, `• P2:`, `• C:`) em enunciados, alternativas, feedbacks e revisão de erros.
- **Otimização de Alvos de Toque no Mobile:** Áreas de clique aumentadas para 44–48 px e botão de avanço de questão reposicionado para alcance confortável no smartphone.
- **Rolagem Automática:** Scroll automático até o card pedagógico de feedback após responder e retorno ao topo ao iniciar ou concluir um quiz.
- **Prevenção de Zoom no iOS/Safari:** Aplicação de regra CSS (`font-size: 16px` em telas `< 640px`) em campos de entrada para impedir o zoom automático de tela.
- **Impressão Isolada de Certificado:** Regras CSS `@media print` para exportação limpa do certificado iluminado sem elementos da interface.
- **Editor do Catequista Multilinha:** Campos de texto adaptados para permitir inserção e edição de silogismos formatados diretamente pelo painel administrativo.

---

## [v1.0.0] - 21/10/2026
### Marco de Conclusão da Entrega Central
- **Marco do Projeto:** Sistema central completo, integrado e operacional para a catequese.
- **Sincronização Híbrida (Supabase + LocalStorage):** Banco PostgreSQL em nuvem para acompanhamento das notas em tempo real pelo catequista, com funcionamento offline transparente via `localStorage`.
- **Certificado Sacro Iluminado (`src/components/CertificateModal.jsx`):** Emissão de certificado em estética de manuscrito medieval para alunos que atingem 100% de aproveitamento.
- **Regra de High Score Permanente:** Preservação estrita da maior nota histórica obtida pelo catequizando.

---

## [v0.6.0] - 21/10/2026
### Sincronização em Nuvem do PIN do Administrador
- **Tabela `fides_settings` no Supabase:** Armazenamento global do PIN mestre do catequista (`admin_pin`), com propagação instantânea entre aparelhos e navegadores anônimos ao ser alterado no painel.

---

## [v0.5.0] - 21/10/2026
### Calibração de Alta Dificuldade e Balanceamento das Questões
- **Distratores Eruditos:** Reformulação profunda de todas as alternativas incorretas das 30 questões, incorporando argumentos densos e erros históricos (nominalismo, racionalismo cartesiano estrito, fideísmo pietista e relativismo).
- **Equalização de Extensão:** Tamanho de todas as alternativas padronizado entre 180 e 280 caracteres, eliminando pistas visuais por extensão de texto.
- **Distribuição Equilibrada de Respostas:** Alternativas corretas redistribuídas de forma aleatória e uniforme entre as opções A, B, C e D.
- **Sincronização de Cache por Versão:** Controle automático de cache no navegador via hash de versão (`v2.0.0-alta-dificuldade`).

---

## [v0.4.0] - 21/10/2026
### Banco de Questões Oficiais do Encontro 1
- **30 Questões Estruturadas (`src/data/defaultQuizzes.js`):** Elaboração das 30 questões do Módulo 1 divididas em 10 blocos doutrinários (Identidade & Missão, Propedêutica Lógica, Inferência Abdutiva, Ajuste Fino Cosmológico, Contingência de Leibniz, Argumento Moral Metaético, Confiabilidade Histórica e Profecias, Fatos Mínimos da Ressurreição, Trilema de Cristo e Síntese de Fé e Razão).
- **Explicações Pedagógicas Detalhadas:** Redação de justificativas teológicas individualizadas para cada alternativa correta e cada um dos distratores.

---

## [v0.1.0 - v0.3.0] - 21/10/2026
### Fundação, Identidade Visual Sacra e Arquitetura Base
- **Stack Tecnológica:** Inicialização do projeto com Vite 5, React 18, Tailwind CSS v4, Lucide-React, Canvas-Confetti e cliente Supabase JS.
- **Identidade Visual Sacra Medieval:** Paleta litúrgica (pergaminho, ouro sacramental, carmesim, lápis-lazúli) e tipografia clássica (Cinzel, Cinzel Decorative, Cormorant Garamond e Inter).
- **Pinturas Clássicas Exclusivas:** Banner hero monástico com Santo Agostinho e Santo Tomás de Aquino (`public/images/fides_hero.jpg`) e selo iluminado pontifício (`public/images/fides_seal.jpg`).
- **Componentes Estruturais Iniciais:** Construção de `Header`, `QuizList`, `QuizPlayer`, `QuizResult`, `AdminPanel`, `AdminLoginModal` e `UserModal`.
- **Documento Executivo Inicial:** Criação de [`docs/documento_executivo.md`](./documento_executivo.md) com histórias de usuário e requisitos não-funcionais.
