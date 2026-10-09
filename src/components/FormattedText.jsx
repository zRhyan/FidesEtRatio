import React from 'react';

/**
 * Renderiza textos de enunciados e alternativas respeitando a estrutura lógica.
 *
 * Convenção dos dados (defaultQuizzes.js e editor do catequista):
 *  - Cada linha é separada por "\n".
 *  - Linhas iniciadas por "•" formam uma caixa de argumento/silogismo.
 *    Ex.: "• Premissa 1 (P1): ...", "• P2: ...", "• Conclusão (C): ...", "• C: ..."
 *  - Demais linhas são parágrafos.
 *
 * Usa apenas <span> (display block) para poder ser inserido dentro de <button>, <h2> e <p>.
 *
 * variant:
 *  - "question": primeiro e último parágrafos em destaque; parágrafos intermediários em fonte de leitura.
 *  - "option" | "review": parágrafos simples (herdam a cor do contêiner).
 */

const LABEL_RE = /^•\s*(?:Premissa\s*(\d+)\s*\(P\d+\)|P(\d+)|(Conclusão)\s*\(C\)|(C))\s*:\s*(.+)$/i;

function parseBullet(line) {
  const match = line.match(LABEL_RE);
  if (!match) {
    return { label: null, isConclusion: false, text: line.replace(/^•\s*/, '') };
  }
  const premiseNumber = match[1] || match[2];
  const isConclusion = Boolean(match[3] || match[4]);
  return {
    label: isConclusion ? 'C' : `P${premiseNumber}`,
    isConclusion,
    text: match[5]
  };
}

export function parseBlocks(text) {
  const lines = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks = [];
  lines.forEach((line) => {
    if (line.startsWith('•')) {
      const item = parseBullet(line);
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'list') {
        last.items.push(item);
      } else {
        blocks.push({ type: 'list', items: [item] });
      }
    } else {
      blocks.push({ type: 'text', text: line });
    }
  });
  return blocks;
}

export default function FormattedText({ text, variant = 'option' }) {
  const blocks = parseBlocks(text);
  const textBlockCount = blocks.filter((b) => b.type === 'text').length;
  let textIndex = -1;

  return (
    <>
      {blocks.map((block, blockIndex) => {
        if (block.type === 'list') {
          return (
            <span
              key={blockIndex}
              className="block my-2.5 rounded-lg border border-[#4a3924] border-l-4 border-l-[#c5a059] bg-black/25 divide-y divide-[#33281a]/70 overflow-hidden text-left"
            >
              {block.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className={`flex items-start gap-2.5 px-3 py-2.5 ${
                    item.isConclusion ? 'bg-[#c5a059]/10' : ''
                  }`}
                >
                  {item.label ? (
                    <span
                      className={`shrink-0 mt-0.5 min-w-[1.9rem] text-center text-[11px] font-bold font-sans normal-case tracking-normal rounded px-1.5 py-0.5 border ${
                        item.isConclusion
                          ? 'bg-[#c5a059] text-[#0d0c0a] border-[#e6cb8e]'
                          : 'bg-[#251d13] text-[#c5a059] border-[#5a4228]'
                      }`}
                    >
                      {item.isConclusion ? '∴ C' : item.label}
                    </span>
                  ) : (
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  )}
                  <span
                    className={`flex-1 font-sans font-normal normal-case tracking-normal [text-shadow:none] text-sm sm:text-base leading-relaxed ${
                      item.isConclusion ? 'font-semibold' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                </span>
              ))}
            </span>
          );
        }

        textIndex += 1;

        if (variant === 'question') {
          const isEdge = textIndex === 0 || textIndex === textBlockCount - 1;
          if (isEdge) {
            return (
              <span
                key={blockIndex}
                className="block medieval-title text-base sm:text-xl font-bold text-[#fbf8ee] leading-relaxed"
              >
                {block.text}
              </span>
            );
          }
          return (
            <span
              key={blockIndex}
              className="block my-2.5 pl-3 border-l-2 border-[#4a3924] font-sans font-normal normal-case tracking-normal [text-shadow:none] text-sm sm:text-base text-[#d8cfbe] leading-relaxed"
            >
              {block.text}
            </span>
          );
        }

        return (
          <span key={blockIndex} className="block leading-relaxed">
            {block.text}
          </span>
        );
      })}
    </>
  );
}
