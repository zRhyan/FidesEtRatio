# Relatório Diagnóstico de Usabilidade — Fase 1

> **Projeto:** Fides et Ratio  
> **Data da varredura:** 09 de Outubro de 2026  
> **Referência normativa:** [`plano_fases_usabilidade_estetica.md`](./plano_fases_usabilidade_estetica.md)  
> **Método:** Varrer e Mapear → Documentar e Listar → Implementar e Validar

---

## 1. Escopo da Varredura

Arquivos lidos integralmente: `QuizPlayer.jsx`, `QuizResult.jsx`, `QuizList.jsx`, `Header.jsx`, `UserModal.jsx`, `AdminLoginModal.jsx`, `CertificateModal.jsx`, `AdminPanel.jsx`, `App.jsx`, `index.css`, `index.html` e `src/data/defaultQuizzes.js` (enunciados e alternativas).

**Causa-raiz do exemplo do silogismo:** os dados já contêm quebras de linha (`\n`) e marcadores (`• Premissa 1 (P1): ...`), porém o HTML colapsa `\n` em espaço. Afeta os enunciados **Q6, Q7, Q8 e Q12** e as 4 alternativas da **Q18**.

**Legenda de prioridade:** 🔴 Alta (atrapalha o uso real no celular) · 🟡 Média · 🟢 Baixa · 🔵 Decisão do usuário (muda comportamento do produto, não será implementado sem aprovação).

---

## 2. Achados

### Eixo A — Tipografia e Formatação Estruturada

| ID | Prio | Local | Problema | Solução proposta |
| :-: | :-: | :--- | :--- | :--- |
| A1 | 🔴 | `QuizPlayer.jsx` (enunciado), Q6/Q7/Q8, Q18 | Silogismos aparecem em texto corrido; `\n` ignorado. | Novo componente `FormattedText`: detecta linhas `•`, renderiza caixa de silogismo com selos **P1 / P2 / C**, conclusão destacada. |
| A2 | 🔴 | `QuizPlayer.jsx`, Q12 | Parágrafo de contexto longo renderizado em Cinzel negrito (difícil de ler). | Hierarquia: primeira e última linha em destaque (apresentação e pergunta); parágrafos intermediários em fonte de leitura. |
| A3 | 🟡 | `QuizPlayer.jsx` ("A alternativa correta era"), `QuizResult.jsx` (revisão) | Mesmo problema de texto corrido nas telas de feedback e revisão. | Reutilizar `FormattedText` em todos os pontos. |
| A4 | 🔴 | `AdminPanel.jsx` (editor) | Enunciado e alternativas são `<input type="text">` de uma linha: o catequista **não consegue** criar um novo silogismo formatado. | Trocar por `<textarea>` com dica da convenção (`• P1: ...`). |

### Eixo B — Ergonomia Touch

| ID | Prio | Local | Problema | Solução proposta |
| :-: | :-: | :--- | :--- | :--- |
| B1 | 🔴 | `QuizPlayer.jsx` | Alternativas e explicações em `text-xs` (12 px) no celular. | 14 px no mobile, 16 px a partir de `sm`. |
| B2 | 🟡 | Header ("Trocar"), "Abandonar Quiz", botões X dos modais, chips de usuários recentes | Alvos de toque de ~20–30 px (mínimo recomendado: 44 px). | Aumentar padding/altura mínima. |
| B3 | 🔴 | `QuizPlayer.jsx` | Após resposta com explicação longa, o botão "Próxima Questão" fica fora da tela. | Botão fixo (`sticky`) na base da tela. |
| B4 | 🟡 | `QuizPlayer.jsx`, logo do Header | "Abandonar Quiz" descarta o progresso sem confirmar (toque acidental). | Confirmação quando já houver respostas. |
| B5 | 🔵 | `QuizPlayer.jsx` | A resposta é definitiva no 1º toque (sem desfazer). Risco de toque errado no celular. | Opção: selecionar → botão "Confirmar resposta". **Aguardando decisão.** |

### Eixo C — Layout em Telas Estreitas (< 380 px)

| ID | Prio | Local | Problema | Solução proposta |
| :-: | :-: | :--- | :--- | :--- |
| C1 | 🔴 | `Header.jsx` | Marca + selo + crachá do aluno + "Trocar" + botão do catequista somam ~420 px: estoura em 320–360 px. | Crachá inteiro clicável (sem texto "Trocar" no mobile), nome menor, texto da marca oculto abaixo de 360 px. |
| C2 | 🟡 | `Header.jsx` | Clicar no logo executa `window.location.hash = ''` (sem efeito). | Logo leva à lista de módulos (com confirmação se houver quiz em andamento). |
| C3 | 🟡 | `QuizResult.jsx` | Rótulo "APROVEITAMENTO" (10 px, maiúsculo) não cabe na coluna de ~64 px. | Rótulo curto "Nota" no mobile. |
| C4 | 🔴 | `AdminPanel.jsx` (tabela) | `<td className="flex ...">` quebra o layout de tabela (coluna do aluno desalinha). Seis colunas ilegíveis no celular. | Corrigir o `td`; em `< md` exibir **cartões** por aluno. |
| C5 | 🟡 | `QuizList.jsx` | Linha de metadados sem quebra; botão "Certificado" mostra só ícone no mobile. | `flex-wrap`; rótulo sempre visível. |
| C6 | 🟡 | `QuizPlayer.jsx` (barra superior) | Abandonar + título do módulo + contador em uma linha de 320 px. | Ocultar título no mobile (contador e progresso permanecem). |
| C7 | 🟡 | `CertificateModal.jsx` | Barra de controles estoura; sem fechar por Esc/clique fora. | `flex-wrap`, rótulo curto, Esc e clique no fundo. |
| C8 | 🔴 | `index.css` / `CertificateModal.jsx` | **Não existe CSS de impressão**: "Imprimir / Salvar PDF" imprime a página inteira, não só o certificado. | `@media print` isolando `#printable-certificate`. |
| C9 | 🟡 | `UserModal.jsx`, `AdminLoginModal.jsx` | Overlay sem rolagem: com o teclado virtual aberto, parte do modal fica inacessível. | Overlay com `overflow-y-auto` e centralização segura. |

### Eixo D — Feedback Cognitivo e Estados

| ID | Prio | Local | Problema | Solução proposta |
| :-: | :-: | :--- | :--- | :--- |
| D1 | 🔴 | `QuizPlayer.jsx` | Após marcar a alternativa, a explicação aparece abaixo da dobra sem rolar. | Rolagem suave até o feedback. |
| D2 | 🔴 | `QuizPlayer.jsx`, `QuizResult.jsx` | Ao entrar no quiz e ao ver o resultado, a rolagem permanece onde estava. | `scrollTo(0)` ao montar. |
| D3 | 🟡 | `QuizResult.jsx` | Revisão numera os erros 1, 2, 3… em vez do número real da questão. | Exibir o número original ("Questão 12"). |
| D4 | 🟡 | `QuizList.jsx`, `App.jsx` | Enquanto carrega (Supabase), mostra "0 módulo disponível" e grade vazia. | Estado de carregamento. |
| D5 | 🟢 | `QuizResult.jsx` | Com 100%, o botão principal ainda é "Refazer Quiz". | Certificado como ação primária. |
| D6 | 🟡 | `AdminLoginModal.jsx` | A tela pública diz "(Padrão: veritas)" e "Tente 'veritas'": revela o PIN e fica errado após a troca. | Remover as dicas. |

### Eixo E — Fluxo de Entrada e Sessão

| ID | Prio | Local | Problema | Solução proposta |
| :-: | :-: | :--- | :--- | :--- |
| E1 | 🔴 | Todos os `<input>` (`text-sm`/`text-xs`) | Em iPhone/Safari, campos com fonte < 16 px provocam **zoom automático** ao focar. | CSS global: `font-size: 16px` em `input/select/textarea` abaixo de 640 px. |
| E2 | 🟡 | `UserModal.jsx` | Campo de nome sem atributos de teclado mobile. | `autoCapitalize="words"`, `autoComplete="off"`, `enterKeyHint`, `maxLength`. |
| E3 | 🔵 | `App.jsx` | Sem histórico de navegação: o botão Voltar do Android sai do site no meio do quiz; atualizar a página perde o progresso. | Usar History API / persistir progresso. **Aguardando decisão.** |
| E4 | 🔵 | `storage.js` | O progresso do aluno só é lido do `localStorage` do aparelho: ao trocar de celular perde-se "100% concluído" e o certificado (embora estejam no Supabase). | Ler o histórico do aluno do Supabase ao se identificar. **Aguardando decisão.** |
| E5 | 🔵 | `storage.js` | "Carlos" e "carlos" viram linhas distintas no Supabase (`UNIQUE` sensível a maiúsculas). | Normalizar nome. **Aguardando decisão.** |

---

## 3. Observações Fora do Escopo da Fase 1

* **🔒 Segurança (recomendado tratar antes de divulgar amplamente):** as políticas RLS `FOR ALL USING (true)` permitem que qualquer pessoa com a chave anônima (que fica embutida no JavaScript do site) **leia o PIN** em `fides_settings` e leia/altere `attempts`. Mitigação futura: verificar o PIN via função no servidor (RPC/Edge Function) e restringir as políticas.
* **🎨 Para a Fase 2 (estética):** o slogan "Fé e Razão na busca da Verdade" no `Header.jsx` usa a classe `xs:block`, inexistente no Tailwind v4, e portanto nunca é exibido.

---

## 4. Registro de Execução

**Execução em 09/10/2026.** ✅ implementado · 🔵 aguardando decisão do usuário.

| Item | Status | Onde foi feito |
| :-: | :-: | :--- |
| A1 | ✅ | Novo [`FormattedText.jsx`](../src/components/FormattedText.jsx), usado no enunciado e alternativas do `QuizPlayer.jsx` |
| A2 | ✅ | `FormattedText` (variante `question`): destaque só na 1ª/última linha; contexto em fonte de leitura |
| A3 | ✅ | `QuizPlayer.jsx` ("alternativa correta era") e `QuizResult.jsx` (revisão) |
| A4 | ✅ | `AdminPanel.jsx`: `<textarea>` no enunciado e nas alternativas, com dica da convenção `• P1:` / `• C:` |
| B1 | ✅ | `QuizPlayer.jsx`, `QuizResult.jsx`: 14 px no mobile, 16 px a partir de `sm` |
| B2 | ✅ | Altura mínima de 44–48 px em botões, chips, crachá, modais e botões de fechar |
| B3 | ✅ | `QuizPlayer.jsx`: botão "Próxima Questão" `sticky` na base |
| B4 | ✅ | `QuizPlayer.jsx` e `App.jsx`: confirmação ao abandonar com progresso |
| B5 | 🔵 | Não implementado (muda o comportamento do quiz) |
| C1 | ✅ | `Header.jsx`: reescrito para caber em 320 px |
| C2 | ✅ | `Header.jsx` + `App.jsx` (`handleGoHome`) |
| C3 | ✅ | `QuizResult.jsx`: rótulo "Nota" no mobile |
| C4 | ✅ | `AdminPanel.jsx`: `td` corrigido + cartões em `< md` |
| C5 | ✅ | `QuizList.jsx` |
| C6 | ✅ | `QuizPlayer.jsx`: título do módulo oculto no mobile |
| C7 | ✅ | `CertificateModal.jsx`: controles com quebra, Esc e clique fora |
| C8 | ✅ | `index.css`: `@media print` isolando `#printable-certificate` |
| C9 | ✅ | `UserModal.jsx`, `AdminLoginModal.jsx`, `CertificateModal.jsx` |
| D1 | ✅ | `QuizPlayer.jsx`: `scrollIntoView` até o feedback |
| D2 | ✅ | `QuizPlayer.jsx`, `QuizResult.jsx`: `scrollTo(0)` ao montar |
| D3 | ✅ | `QuizResult.jsx`: número original da questão |
| D4 | ✅ | `App.jsx` + `QuizList.jsx`: estado "Carregando..." |
| D5 | ✅ | `QuizResult.jsx`: certificado como ação primária com 100% |
| D6 | ✅ | `AdminLoginModal.jsx`: dicas do PIN removidas |
| E1 | ✅ | `index.css`: `font-size: 16px` em campos abaixo de 640 px |
| E2 | ✅ | `UserModal.jsx` |
| E3 | 🔵 | Não implementado (requer decisão) |
| E4 | 🔵 | Não implementado (requer decisão) |
| E5 | 🔵 | Não implementado (requer decisão) |

### Validações realizadas
* `npm run build`: ✅ sem erros.
* Verificação do parser com os dados reais: as **21 linhas com `•`** (Q6, Q7, Q8 e as 4 alternativas da Q18) foram reconhecidas com os rótulos P1/P2/C corretos.
* ⚠️ **Verificação visual no navegador não executada:** o navegador de testes automatizado falhou ao iniciar (erro 404 ao baixar o driver do Playwright). Recomenda-se conferir manualmente em um celular real (ou no modo responsivo do navegador, 360 px) os itens A1, B3, C1, C4, C8 e D1.
