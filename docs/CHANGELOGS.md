# CHANGELOGS - Projeto Fides et Ratio
> **Registro Histórico de Implementações, Arquitetura e Próximos Passos**

---

| Metadado | Informação |
| :--- | :--- |
| **Projeto** | Fides et Ratio (Fé e Razão) |
| **Data do Registro** | 09 de Outubro de 2026 |
| **Versão Atual** | v1.0.0 (Release Oficial de Produção) |
| **Status Geral** | 🟢 **Sistema 100% Completo, Integrado e em Produção** |
| **Ambiente Alvo** | GitHub + Netlify + Supabase (Mobile-First) |

---

## 1. Implementações Já Concluídas

### 1.1 Documentação e Metodologia Ágil (Scrum)
- [x] **Documento Executivo Completo (`docs/documento_executivo.md`):**
  - Levantamento e detalhamento de todas as Histórias de Usuário do Aluno (US01 a US06) e do Administrador/Catequista (US07 e US08).
  - Definição dos Requisitos Não-Funcionais (estética sacra medieval, mobile-first, performance e persistência de dados).
  - Modelagem do banco de dados relacional (entidades `Usuario`, `Quiz`, `Pergunta`, `Alternativa`, `Tentativa_Quiz`).

### 1.2 Setup e Arquitetura do Projeto
- [x] **Stack Tecnológica Moderna:**
  - Inicialização com **Vite 5** e **React 18**.
  - Configuração do **Tailwind CSS v4** integrado nativamente ao build do Vite (`@tailwindcss/vite`).
  - Instalação e integração de ícones sagrados/litúrgicos com **Lucide-React**.
  - Biblioteca **Canvas-Confetti** para animação comemorativa dos 100%.
  - Cliente oficial **@supabase/supabase-js** para suporte a banco de dados em nuvem.

### 1.3 Identidade Visual Sacra Medieval
- [x] **Artes Clássicas Geradas Exclusivamente:**
  - **Banner Hero (`public/images/fides_hero.jpg`):** Pintura a óleo barroca/renascentista retratando Santo Agostinho e São Tomás de Aquino no scriptorium monástico estudando o manuscrito iluminado *Fides et Ratio*.
  - **Selo Sacro (`public/images/fides_seal.jpg` e `public/favicon.jpg`):** Selo pontifício/acadêmico em cera e ouro iluminado com o lema *Fides et Ratio*, cruz e livro sagrado da sabedoria.
- [x] **Tipografia & Design System:**
  - Fontes clássicas do Google Fonts: **Cinzel**, **Cinzel Decorative**, **Cormorant Garamond** (serifada escolástica) e **Inter** (leitura mobile).
  - Paleta litúrgica medieval: pergaminho nobre (`#0d0c0a` / `#161410`), ouro sacramental (`#c5a059`), vinho carmesim (`#7c1a2d`), azul lápis-lazúli (`#16263d`).
  - Bordas iluminadas e efeitos de manuscrito medieval (`border-gold-glow`, `parchment-card`).

### 1.4 Banco de Dados & Camada de Persistência (`src/services/storage.js`)
- [x] **Sincronização Híbrida (Nuvem + Local):**
  - Suporte completo ao **Supabase** (PostgreSQL em nuvem) para que as notas de múltiplos celulares sejam visíveis no painel do catequista em tempo real.
  - Fallback automático e transparente para **LocalStorage** (o app funciona 100% offline mesmo sem configurar nuvem).
- [x] **Regra de Negócio de Nota Mais Alta (High Score):**
  - Implementação estrita da regra solicitada: a nota mais alta histórica do aluno é sempre retida. Se ele obtiver 100% na primeira tentativa e depois fizer outra com 80%, o sistema preserva os 100% para o certificado e liberação para a próxima aula.

### 1.5 Módulo de Perguntas e Explicações Pedagógicas (`src/data/defaultQuizzes.js`)
- [x] **Quiz Modelo do Encontro 1:**
  - Perguntas ricas sobre Fé e Razão, o erro do Fideísmo, a Suma Teológica de São Tomás de Aquino, as vias do movimento/causalidade e Santo Agostinho (*Crede ut intelligas*).
  - **Explicação individualizada por alternativa:** cada opção (seja a correta ou cada uma das incorretas) possui sua justificativa pedagógica e teológica já cadastrada.

### 1.6 Componentes da Interface (UI/UX)
- [x] **`Header.jsx`:** Barra de navegação com o selo iluminado, identificação do catequizando logado, contagem de módulos concluídos e botão de acesso ao modo Catequista.
- [x] **`UserModal.jsx`:** Fluxo de identificação descomplicado por nome, sem senha, com suporte a seleção de usuários recentes do aparelho.
- [x] **`QuizList.jsx`:** Tela inicial com o banner de Santo Tomás e Santo Agostinho, lista de módulos com badges de aprovação, estatísticas de acerto e botão de início.
- [x] **`QuizPlayer.jsx` (Experiência do Quiz):**
  - Barra de progresso visual fluida e indicador "Questão X de Y".
  - Feedback imediato: ao clicar numa alternativa, ela se ilumina (verde para acerto, rubro para erro) e as opções travam.
  - Card pedagógico explicativo renderizado imediatamente abaixo, detalhando o porquê do acerto ou o fundamento do erro.
  - Botão de avançar para a próxima questão ou concluir.
- [x] **`QuizResult.jsx` (Tela Final & Revisão de Erros):**
  - Efeito de confetes e parabéns para aproveitamento de 100%.
  - Resumo de acertos, erros e porcentagem.
  - **Botão "Refazer Quiz"** para tentar alcançar 100% imediatamente (US06).
  - **Botão e Sanfona "Revisar Questões Erradas" (US05):** lista todas as questões erradas, exibindo a alternativa que o estudante marcou com o motivo do erro, e a alternativa correta com sua explicação doutrinária.
- [x] **`AdminPanel.jsx` (Painel do Catequista):**
  - **Aba de Alunos (US08):** Tabela consolidada de todos os participantes com nota máxima histórica, status "Apto p/ Aula 2 (100%)", total de tentativas e busca por nome.
  - **Aba de Gestão de Quizzes (US07):** Criação e edição dinâmica de quizzes, permitindo adicionar perguntas, alternativas e as explicações de erro/acerto de cada opção.
  - **Aba de Configurações:** Configuração direta de URL/Chave do Supabase, script SQL pronto e alteração do PIN do administrador.
- [x] **`AdminLoginModal.jsx`:** Proteção do painel de administração via PIN mestre (padrão: `veritas`).
- [x] **`CertificateModal.jsx`:** Certificado sacro medieval iluminado para os estudantes aprovados com 100%, pronto para impressão ou exportação em PDF.
- [x] **`App.jsx`:** Gerenciamento central de estados e transições de tela.

### 1.7 Banco de Questões Oficiais do Encontro 1 (`src/data/defaultQuizzes.js`) — v0.4.0
- [x] **30 Questões Oficiais Rigorosamente Estruturadas:**
  - **Q1 a Q2 (Identidade & Missão):** Projeto Fides et Ratio (3 pilares: 1 Pd 3,15, Mc 16,15 e combate ao fideísmo oportunista) e etimologia/significado de Evangelizar (*euangelion*).
  - **Q3 a Q5 (Propedêutica Lógica):** Definição formal de argumento $\langle\Gamma, \psi\rangle$, argumento válido e argumento correto/sólido (*sound*).
  - **Q6 a Q8 (Prática Lógica):** Avaliação de argumentos reais (Jack/cachorros amarelos = válido não sólido; Maria/orelhas = inválido; Capitais brasileiras = válido e sólido).
  - **Q9 a Q12 (Tipos de Inferência):** Dedução (necessidade lógica), indução (projeção provável), abdução (inferência para a melhor explicação) e exercício prático do evento da chuva/asfalto molhado.
  - **Q13 a Q16 (Argumento do Ajuste Fino):** Natureza abdutiva, os 4 dados físicos (ressonância de Hoyle do Carbono-12, inflação primordial $10^{-5}$, constante cosmológica $\Lambda$, baixa entropia de Penrose $10^{10^{123}}$), o quarteto de hipóteses (Acaso, Necessidade, Multiverso, Inteligência Superior) e a conclusão abdutiva irrefutável.
  - **Q17 (Contingência de Leibniz):** Princípio da Razão Suficiente e a necessidade ontológica de uma Causa Primeira Necessária (Deus).
  - **Q18 a Q20 (Argumento Moral Metaético):** Estrutura silogística ontológica, refutação do desacordo cultural e da objeção evolutiva, resposta a Wielenberg e superação do Dilema de Eutífron pela Simplicidade Divina.
  - **Q21 a Q23 (Confiabilidade Histórica & Profecias):** Prova de antecedência (Septuaginta LXX e Qumran), prova de preservação (>5.800 manuscritos gregos), fontes pagãs/seculares (Tácito, Plínio o Jovem, Luciano) e encaixe profético milenar (Salmo 22, Isaías 53, Zacarias 12).
  - **Q24 a Q27 (Psicologia dos Mártires & Fatos Mínimos):** Descarte da fraude/mentira (porta de saída romana, reversão de Pedro, Tiago cético), descarte da alucinação coletiva, critério do constrangimento (mulheres no sepulcro), atestação inimiga (desculpa do roubo) e conversões abruptas (Paulo e Tiago).
  - **Q28 a Q30 (Trilema de Cristo & Síntese Final):** Trilema de Lewis-Chesterton (Mentiroso, Lunático ou Senhor), descarte de loucura ou farsa, e síntese de *Fides et Ratio* (as duas asas da Verdade).
- [x] **Explicação Individualizada Completa:** Cada alternativa (tanto a correta quanto os distratores) conta com justificativa pedagógica e doutrinária personalizada.
- [x] **Mecanismo de Auto-Atualização de Cache:** `src/services/storage.js` atualizado para sincronizar automaticamente os clientes que já possuíam a versão de teste de 5 questões em cache.

### 1.8 Calibração de Alta Dificuldade & Balanceamento das Questões (`v0.5.0` - `quiz v2.0.0`)
- [x] **Distratores Ricos e Sofisticados:** Reformulação completa de todas as alternativas incorretas em todas as 30 perguntas. Os distratores deixaram de ser frases curtas e caricaturais para se tornarem argumentos densos, eruditos e sedutores (incorporando erros clássicos do pensamento como voluntarismo de Ockham, racionalismo cartesiano estrito, cientificismo materialista, relativismo pós-moderno, e fideísmo pietista).
- [x] **Homogeneização de Extensão (Eliminação de Dicas Visuais):** O tamanho e o grau de detalhe de todas as 4 alternativas em cada questão foram equalizados (todas com extensão equilibrada entre 180 e 280 caracteres), impossibilitando identificar a resposta certa apenas por ser "a mais longa".
- [x] **Distribuição Aleatória das Alternativas Corretas:** As respostas certas foram redistribuídas de forma equilibrada entre as posições A, B, C e D (eliminando o padrão onde a primeira opção era sempre a correta).
- [x] **Sincronização Automática por Versão (`v2.0.0-alta-dificuldade`):** A camada de persistência agora compara o campo `version` do quiz para substituir imediatamente o cache do navegador sem necessidade de limpeza manual.

### 1.9 Sincronização em Nuvem do PIN Mestre do Administrador (`v0.6.0`)
- [x] **Persistência Global de Configurações no Supabase:**
  - Criação da tabela `fides_settings` para armazenar parâmetros globais compartilhados (incluindo `admin_pin`).
  - As funções `getAdminPin()`, `setAdminPin()` e `verifyAdminPin()` em `src/services/storage.js` foram tornadas assíncronas, consultando o Supabase com fallback transparente para o `localStorage`.
  - Quando o catequista atualiza o PIN no painel de administração em um navegador, a nova senha é propagada instantaneamente para todos os dispositivos, abas anônimas e celulares.
  - Interface do modal de login (`AdminLoginModal.jsx`) e do painel (`AdminPanel.jsx`) atualizadas com feedback de carregamento (*"Verificando..."* / *"Salvando..."*).

---

## 2. Status do Roadmap & Entregas
*Todas as metas do projeto foram alcançadas com êxito:*

| Item | Descrição | Status | Detalhes |
| :--- | :--- | :---: | :--- |
| **1. Conexão do Projeto Supabase** | Projeto criado em São Paulo, tabelas `attempts` e `fides_settings` configuradas. | ✅ Concluído | Conectado via Netlify Env Vars e sincronizando em tempo real |
| **2. Repositório Git Local** | Inicialização do branch `main`, configuração de `.gitignore` e commits estruturados. | ✅ Concluído | Histórico preservado na branch `main` |
| **3. Repositório Remoto no GitHub** | Repositório `zRhyan/FidesEtRatio` conectado e sincronizado. | ✅ Concluído | [github.com/zRhyan/FidesEtRatio](https://github.com/zRhyan/FidesEtRatio) |
| **4. Deploy no Netlify** | Aplicação publicada e acessível publicamente via Netlify com CI/CD. | ✅ Concluído | Site no ar com build automatizado |

---

## 3. Conclusão da Entrega Central
> 🏆 **Sistema 100% Completo, Integrado e Operacional!**
> 
> * **Interface:** Estética sacra medieval imersiva, responsiva e mobile-first.
> * **Pedagogia:** 30 questões de alta dificuldade calibradas com explicações doutrinárias profundas para acertos e distratores.
> * **Nuvem & Persistência:** PostgreSQL no Supabase com fallback offline, painel do catequista em tempo real e sincronização global de PIN.
> * **Pronto para uso** na formação e nos encontros de catequese!

---

## 4. Ciclo de Refinamento Final Pré-Lançamento (Em Andamento)
> Consulte o documento normativo: [`docs/plano_fases_usabilidade_estetica.md`](./plano_fases_usabilidade_estetica.md)

1. **Fase 1: Melhorias de Usabilidade (UX/Mobile):** 🟡 **Em Planejamento e Varredura Ativa**
   - Varredura de experiência em smartphones.
   - Formatação estruturada de silogismos e passagens lógicas (quebra de linha e legibilidade).
   - Ergonomia touch (zonas de toque e prevenção de cliques involuntários).
   - Responsividade em telas estreitas (< 380px) e fluidez de navegação.
2. **Fase 2: Melhorias de Estética (UI Sacra Medieval):** ⏳ **Aguardando Conclusão da Fase 1**
   - Polimento visual sacro, micro-interações litúrgicas, contrastes nobres e refinamento do certificado iluminado.
