import React from 'react';
import { X, Printer, Award, Sparkles, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const { quiz, record, username } = data;
  const dateFormatted = record?.lastAttemptDate 
    ? new Date(record.lastAttemptDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="max-w-2xl w-full my-auto space-y-4">
        
        {/* Controls Bar (Not printed) */}
        <div className="flex items-center justify-between print:hidden text-[#ded3be]">
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold flex items-center gap-1.5">
            <Award size={16} /> Certificado de Formação Catequética
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#d6b46e] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Printer size={15} />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#221c15] hover:bg-[#382b1c] text-[#ded3be] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Certificate Parchment Document */}
        <div 
          id="printable-certificate"
          className="bg-[#faf6e9] text-[#1a140d] p-8 sm:p-12 rounded-xl border-8 border-[#3b2b16] relative shadow-2xl overflow-hidden print:m-0 print:border-4"
          style={{
            backgroundImage: 'radial-gradient(#ece1c8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Inner Golden Filigree Border */}
          <div className="border-2 border-[#b89547] p-6 sm:p-8 rounded-lg relative">
            
            {/* Ornamental Corners */}
            <div className="absolute top-2 left-2 text-[#b89547] text-lg font-serif">❖</div>
            <div className="absolute top-2 right-2 text-[#b89547] text-lg font-serif">❖</div>
            <div className="absolute bottom-2 left-2 text-[#b89547] text-lg font-serif">❖</div>
            <div className="absolute bottom-2 right-2 text-[#b89547] text-lg font-serif">❖</div>

            {/* Seal and Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border-2 border-[#b89547] shadow-md">
                <img 
                  src="/images/fides_seal.jpg" 
                  alt="Selo Fides et Ratio" 
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#826127] block font-serif">
                Apostolado Catequético & Apologético
              </span>

              <h1 className="medieval-title text-2xl sm:text-4xl font-extrabold text-[#2b1f10] tracking-wide">
                FIDES ET RATIO
              </h1>

              <div className="w-32 h-0.5 bg-[#b89547] mx-auto my-2"></div>

              <p className="font-serif italic text-sm text-[#54432c]">
                "Crede ut intelligas, intellige ut credas" — Santo Agostinho
              </p>
            </div>

            {/* Certificate Body */}
            <div className="my-8 text-center space-y-4">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#695439] font-sans">
                Certifica-se formalmente que
              </p>

              <h2 className="medieval-title text-2xl sm:text-3xl font-bold text-[#6b1d2f] underline decoration-[#b89547] decoration-2 underline-offset-8">
                {username}
              </h2>

              <p className="text-xs sm:text-sm text-[#382b1d] max-w-lg mx-auto leading-relaxed font-serif">
                concluiu com êxito e obteve <strong className="text-[#6b1d2f]">100% de aproveitamento</strong> na avaliação formativa do módulo:
              </p>

              <div className="p-3 bg-[#ede2c7]/60 rounded-md border border-[#cbb382] max-w-md mx-auto">
                <p className="medieval-title text-base sm:text-lg font-bold text-[#2a1d0f]">
                  {quiz?.title || "Encontro 1: A Harmonia entre Fé e Razão"}
                </p>
                <p className="text-xs italic text-[#594429] mt-0.5">
                  {quiz?.subtitle || "Combate ao Fideísmo e Provas da Existência de Deus"}
                </p>
              </div>

              <p className="text-xs text-[#52412e] font-serif max-w-md mx-auto">
                Demonstrando domínio das vias da razão natural e dos preâmbulos da fé, encontrando-se plenamente apto para a continuação no próximo módulo.
              </p>
            </div>

            {/* Date & Signature */}
            <div className="mt-8 pt-6 border-t border-[#cbb382] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-serif text-[#4d3a24]">
              <div>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-[#826127]">
                  Data de Conclusão:
                </p>
                <p>{dateFormatted}</p>
              </div>

              <div className="text-center sm:text-right">
                <div className="w-48 h-0.5 bg-[#4d3a24]/40 mb-1 mx-auto sm:ml-auto"></div>
                <p className="font-bold text-xs uppercase tracking-wider text-[#2e2112]">
                  Coordenação Catequética
                </p>
                <p className="text-[10px] italic text-[#6e5436]">
                  Apostolado Fides et Ratio
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
