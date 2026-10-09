/**
 * Quizzes padrão para a plataforma Fides et Ratio.
 * Encontro 1: Fé, Razão, Propedêutica Lógica e os Preâmbulos da Fé.
 * 
 * Versão: v2.0.0-alta-dificuldade
 * 
 * Características:
 * - 30 Perguntas oficiais com distribuição balanceada de alternativas corretas (A, B, C, D).
 * - Distratores altamente elaborados, densos, teológica e filosoficamente fundamentados.
 * - Tamanho homogêneo entre as alternativas para eliminar dicas por extensão de texto.
 * - Justificativas pedagógicas ricas para cada alternativa (acerto e erros).
 */

export const DEFAULT_QUIZZES = [
  {
    id: "quiz-encontro-1",
    version: "v2.0.0-alta-dificuldade",
    title: "Encontro 1: A Harmonia entre Fé e Razão",
    subtitle: "Propedêutica Lógica, Preâmbulos da Fé e Confiabilidade Histórica",
    description: "Avaliação formativa avançada cobrindo os pilares do Fides et Ratio, lógica formal, combate ao fideísmo oportunista, ajuste fino, contingência leibniziana, argumento moral, fontes documentais, psicologia dos mártires e o trilema de Cristo.",
    moduleNumber: 1,
    passingScore: 100, // Requisito de 100% para conclusão/certificado
    coverImage: "/images/fides_hero.jpg",
    questions: [
      /* ===============================================================
         1. PILARES DO FIDES ET RATIO E EVANGELIZAÇÃO
         =============================================================== */
      {
        id: "q1",
        question: "O que é o projeto 'Fides et Ratio' e quais são os seus três pilares fundamentais apresentados na formação?",
        options: [
          {
            id: "q1-opt1",
            text: "Um movimento apologético de pura erudição acadêmica que busca substituir a vida litúrgica e os sacramentos por silogismos dedutivos, visando refutar céticos em debates públicos universitários.",
            isCorrect: false,
            explanation: "Incorreto. O projeto não é um clube puramente acadêmico e jamais substitui a oração, a graça sacramental ou a mística cristã por mero tecnicismo dialético."
          },
          {
            id: "q1-opt2",
            text: "Uma confraria teológica voltada a resgatar o fideísmo pietista primitivo, demonstrando que o intelecto decaído é incapaz de emitir juízos sadios e que a filosofia deve ser rejeitada como pecado de soberba.",
            isCorrect: false,
            explanation: "Incorreto. Essa posição defende o fideísmo radical, precisamente a deformação intelectual e moral que o Fides et Ratio visa combater e erradicar."
          },
          {
            id: "q1-opt3",
            text: "Uma catequese alicerçada em três pilares: responder perguntas sobre a fé (1 Pd 3, 15), evangelizar (Mc 16, 15) e combater o fideísmo oportunista, conciliando fé e intelecto no verdadeiro Evangelho.",
            isCorrect: true,
            explanation: "Correto! O projeto assenta-se no tripé: estar pronto para dar a razão da esperança (1 Pd 3, 15), cumprir o mandato da evangelização (Mc 16, 15) e desmascarar o fideísmo oportunista (postura de quem escolhe conveniências na fé para obter aceitação social), mostrando o acordo entre fé e reta razão."
          },
          {
            id: "q1-opt4",
            text: "Uma iniciativa pastoral e sociológica voltada a reinterpretar os dogmas da Igreja sob os parâmetros do secularismo contemporâneo, ajustando a fé católica aos consensos morais de cada época.",
            isCorrect: false,
            explanation: "Incorreto. Essa formulação expressa o modernismo relativista. O Fides et Ratio busca proclamar a verdade eterna de Cristo de forma íntegra, profunda e lúcida."
          }
        ]
      },
      {
        id: "q2",
        question: "Qual é a origem etimológica e o verdadeiro significado da palavra 'Evangelizar'?",
        options: [
          {
            id: "q2-opt1",
            text: "Origina-se do vocábulo grego 'euphonia' (boa sonoridade) e do hebraico 'gadol' (grandeza), designando a recitação de poemas litúrgicos e cânticos capazes de induzir a mente humana ao êxtase contemplativo.",
            isCorrect: false,
            explanation: "Incorreto. A raiz é 'euangelion' (boa nova), não 'euphonia'. Evangelizar é o anúncio objetivo da salvação e do Reino, não mera estimulação musical ou estética da alma."
          },
          {
            id: "q2-opt2",
            text: "Deriva do grego 'euangelion' (prefixo 'eu' = bem/bom e sufixo 'angelos' = mensageiro), significando levar a Boa Nova: anunciar o Reino dos Céus, nosso Salvador e os ensinamentos do Verbo feito carne.",
            isCorrect: true,
            explanation: "Correto! Evangelho traduz literalmente a 'Boa Nova' ou 'Boa Mensagem'. Evangelizar é agir como o mensageiro fiel que proclama a pessoa de Jesus Cristo ressurreto, os ensinamentos do Verbo Encarnado e a redenção da humanidade."
          },
          {
            id: "q2-opt3",
            text: "Vem do latim clássico 'evangeliarium', denotando a análise filológica rigorosa de códices primitivos com o objetivo de preservar os manuscritos antigos em bibliotecas e museus imperiais.",
            isCorrect: false,
            explanation: "Incorreto. 'Evangeliarium' é um termo eclesiástico posterior para o livro litúrgico dos Evangelhos; a ação de evangelizar é bíblica, apostólica e de natureza transmissora da fé viva."
          },
          {
            id: "q2-opt4",
            text: "Procede do grego 'episteme' associado a 'angelia', consistindo na imposição civil e institucional de mandamentos religiosos por meio da persuasão política coercitiva do Estado confessionário.",
            isCorrect: false,
            explanation: "Incorreto. O Evangelho é proclamado na liberdade e no amor ('se queres vir após mim...'), repudiando coerções políticas forçadas sobre a consciência individual."
          }
        ]
      },

      /* ===============================================================
         2. PROPEDÊUTICA E LÓGICA FORMAL (SEÇÃO 0 DO RESUMO)
         =============================================================== */
      {
        id: "q3",
        question: "Na propedêutica e lógica filosófica, o que é um argumento?",
        options: [
          {
            id: "q3-opt1",
            text: "É uma asserção isolada e indubitável cuja evidência intrínseca dispensa qualquer encadeamento lógico prévio, impondo-se à mente como um axioma metafísico de autoridade indiscutível.",
            isCorrect: false,
            explanation: "Incorreto. Uma afirmação isolada sem premissas de suporte é apenas uma proposição ou tese enunciativa, mas não constitui uma estrutura argumentativa completa."
          },
          {
            id: "q3-opt2",
            text: "É um conflito oratório entre dois debatedores antagônicos, no qual a validade da tese defendida é medida exclusivamente pela capacidade de persuasão retórica e empatia do orador perante a plateia.",
            isCorrect: false,
            explanation: "Incorreto. No sentido rigoroso da lógica, argumento não é disputa oratória subjetiva nem apelo emocional, mas uma estrutura relacional objetiva de inferência."
          },
          {
            id: "q3-opt3",
            text: "É um experimento laboratorial quantitativo no qual se isolam variáveis empíricas mensuráveis para verificar hipóteses científicas segundo os padrões da física materialista estrita.",
            isCorrect: false,
            explanation: "Incorreto. Argumentos pertencem ao domínio da lógica, do pensamento e da linguagem formal, existindo em qualquer ciência teórica e na filosofia, além de testes empíricos de bancada."
          },
          {
            id: "q3-opt4",
            text: "É uma estrutura constituída por um conjunto de premissas e uma conclusão, na qual as premissas são apresentadas com a intenção de fornecer suporte inferencial para a conclusão.",
            isCorrect: true,
            explanation: "Correto! Representado formalmente como ⟨Γ, ψ⟩, onde Γ é o conjunto de proposições antecedentes (premissas) e ψ é a conclusão inferida. Há argumento sempre que se articula esse vínculo de suporte lógico."
          }
        ]
      },
      {
        id: "q4",
        question: "O que define um argumento como sendo 'Válido'?",
        options: [
          {
            id: "q4-opt1",
            text: "Significa que a conclusão deriva logicamente das premissas (ou seja, a estrutura formal garante que, se as premissas fossem verdadeiras, a conclusão decorreria necessariamente delas).",
            isCorrect: true,
            explanation: "Correto! A validade é uma virtude puramente formal/estrutural do argumento. Diz respeito ao encadeamento inferencial: a forma do silogismo impede que as premissas sejam verdadeiras e a conclusão falsa ao mesmo tempo."
          },
          {
            id: "q4-opt2",
            text: "Significa que todas as premissas apresentadas no discurso descrevem fatos rigorosamente verdadeiros no mundo real, independentemente de haver conexão dedutiva com a conclusão.",
            isCorrect: false,
            explanation: "Incorreto. Se não há conexão dedutiva necessária entre premissas e conclusão, o argumento é inválido, ainda que as premissas expressem verdades empíricas no mundo."
          },
          {
            id: "q4-opt3",
            text: "Significa que a proposição final formulada é aceita como incontestável pela comunidade de especialistas ou confirmada por observação empírica direta no universo físico.",
            isCorrect: false,
            explanation: "Incorreto. A verdade empírica isolada da conclusão não confere validade se o salto dedutivo a partir das premissas for falacioso ou inexistente."
          },
          {
            id: "q4-opt4",
            text: "Significa que o argumento atende simultaneamente aos critérios de consistência formal dedutiva e de verdade material de todas as suas premissas na ordem ontológica da realidade.",
            isCorrect: false,
            explanation: "Incorreto. Essa é a definição de argumento Correto/Sólido (sound), que é um degrau acima da mera validade formal estrutural."
          }
        ]
      },
      {
        id: "q5",
        question: "O que significa dizer que um argumento é 'Correto' ou 'Sólido' (sound)?",
        options: [
          {
            id: "q5-opt1",
            text: "Significa que a conclusão deriva com perfeita necessidade geométrica das premissas, ainda que todas as premissas façam afirmações manifestamente falsas no mundo exterior.",
            isCorrect: false,
            explanation: "Incorreto. Se as premissas forem falsas no mundo real, o argumento pode ser válido formalmente, mas JAMAIS será sólido ou correto (sound)."
          },
          {
            id: "q5-opt2",
            text: "Significa que o argumento expressa uma verdade sublime da revelação mística cuja certeza sobrenatural dispensa a coerência lógica e as regras do silogismo racional ordinário.",
            isCorrect: false,
            explanation: "Incorreto. A solidez lógica exige estrita validade formal aliada à verdade material das premissas; argumentos irracionais ou contraditórios não são sólidos."
          },
          {
            id: "q5-opt3",
            text: "Significa que o argumento é estruturalmente válido E todas as suas premissas são, de fato, verdadeiras no mundo real (unindo a validade da dedução à verdade material).",
            isCorrect: true,
            explanation: "Correto! A solidez (soundness) exige duas condições simultâneas: 1) o argumento é formalmente válido; e 2) cada uma das premissas é factualmente verdadeira no universo real. Isso garante a verdade da conclusão."
          },
          {
            id: "q5-opt4",
            text: "Significa que o argumento possui premissas empiricamente provadas por levantamentos estatísticos, ainda que a conclusão seja apenas uma estimativa conjetural hipotética.",
            isCorrect: false,
            explanation: "Incorreto. Se a conclusão não decorre com necessidade lógica das premissas, o argumento não é válido e, por conseguinte, não pode ser correto/sólido."
          }
        ]
      },

      /* ===============================================================
         3. APLICAÇÕES PRÁTICAS DE AVALIAÇÃO DE ARGUMENTOS
         =============================================================== */
      {
        id: "q6",
        question: "Considere o seguinte argumento analisado em sala:\n• Premissa 1 (P1): Todos os cachorros são amarelos.\n• Premissa 2 (P2): Jack é um cachorro.\n• Conclusão (C): Logo, Jack é amarelo.\nComo esse argumento deve ser classificado na lógica formal?",
        options: [
          {
            id: "q6-opt1",
            text: "É um argumento Inválido e Não Sólido, visto que a falsidade óbvia da premissa P1 contamina e anula de imediato a estrutura relacional de derivação do silogismo.",
            isCorrect: false,
            explanation: "Incorreto. A falsidade fática de P1 não destrói a validade formal da inferência. Se todo cachorro fosse amarelo e Jack fosse cachorro, Jack seria necessariamente amarelo."
          },
          {
            id: "q6-opt2",
            text: "É um argumento VÁLIDO, porém NÃO é Correto/Sólido (pois, embora a conclusão derive logicamente das premissas, a premissa P1 é falsa no nosso mundo real).",
            isCorrect: true,
            explanation: "Correto! A estrutura dedutiva é impecável (Todo A é B; Jack é A; logo Jack é B = válido). No entanto, como P1 não é verdadeira no mundo real (há cães pretos, brancos, marrons), o argumento não é correto/sólido."
          },
          {
            id: "q6-opt3",
            text: "É um argumento Válido e Correto/Sólido no mundo real, porque a verdade da conclusão está contida hipoteticamente no sentido linguístico das palavras enunciadas.",
            isCorrect: false,
            explanation: "Incorreto. Para haver solidez factual no mundo real, a premissa maior 'todos os cachorros são amarelos' teria que ser uma verdade da nossa realidade, o que não ocorre."
          },
          {
            id: "q6-opt4",
            text: "Não pode ser aceito como argumento legítimo, visto que a lógica aristotélica clássica proíbe o uso de animais particulares como termos menores de proposições categóricas.",
            isCorrect: false,
            explanation: "Incorreto. É um silogismo perfeitamente legítimo da lógica clássica (modo Darii/Barbara adaptado com termo singular), constituindo um argumento formal autêntico."
          }
        ]
      },
      {
        id: "q7",
        question: "Avalie o seguinte conjunto de proposições:\n• Premissa 1 (P1): Maria não tem óculos.\n• Premissa 2 (P2): O céu está azul.\n• Conclusão (C): Logo, Maria não tem orelha.\nQual é a avaliação lógica rigorosa desse caso?",
        options: [
          {
            id: "q7-opt1",
            text: "Constitui um argumento, porém é INVÁLIDO (a conclusão não decorre das premissas) e NÃO é Correto/Sólido, carecendo de qualquer vínculo de suporte inferencial autêntico.",
            isCorrect: true,
            explanation: "Correto! É um argumento formal porque as premissas foram apresentadas com a intenção inferencial de justificar C (estrutura ⟨Γ, ψ⟩). Contudo, a conclusão sobre orelhas não tem nexo lógico dedutivo com óculos ou com o céu: é inválido e não sólido."
          },
          {
            id: "q7-opt2",
            text: "Não é um argumento sob nenhuma ótica, pois qualquer enunciado que não conduza a uma conclusão verdadeira é sumariamente excluído da definição de argumento.",
            isCorrect: false,
            explanation: "Incorreto. A definição formal de argumento exige apenas que premissas sejam apresentadas com a intenção de suportar uma conclusão, mesmo que o façam de modo falho."
          },
          {
            id: "q7-opt3",
            text: "É um argumento Válido, contanto que seja empíricamente verificado em uma tarde ensolarada que Maria de fato não esteja usando óculos no momento do enunciado.",
            isCorrect: false,
            explanation: "Incorreto. A verdade contingente pontual das premissas não cria validade dedutiva se a conclusão não fluir logicamente delas."
          },
          {
            id: "q7-opt4",
            text: "Trata-se de uma inferência Indutiva legítima, cuja probabilidade causal é mantida em aberto até que a anatomia facial de Maria seja submetida a exame médico.",
            isCorrect: false,
            explanation: "Incorreto. Não há nexo indutivo de repetição entre cor da atmosfera e ausência de aparelho auditivo externo; o raciocínio é um sofisma sem qualquer suporte."
          }
        ]
      },
      {
        id: "q8",
        question: "Examine o seguinte raciocínio dedutivo:\n• Premissa 1 (P1): Toda capital de um estado brasileiro localiza-se no Brasil.\n• Premissa 2 (P2): Belo Horizonte é a capital de um estado brasileiro.\n• Conclusão (C): Logo, Belo Horizonte localiza-se no Brasil.\nComo esse raciocínio se classifica?",
        options: [
          {
            id: "q8-opt1",
            text: "É um argumento Válido, mas Não Correto/Sólido, visto que a localização de fronteiras geográficas depende de decretos políticos humanos sujeitos a revogação temporal.",
            isCorrect: false,
            explanation: "Incorreto. A contingência de decretos políticos não impede que no presente mundo real as duas premissas sejam fatos verdadeiros. Logo, o argumento é plenamente sólido."
          },
          {
            id: "q8-opt2",
            text: "É um raciocínio Indutivo probabilístico, visto que a inclusão territorial de municípios é avaliada por amostragem cartográfica de alta margem de erro estatístico.",
            isCorrect: false,
            explanation: "Incorreto. A dedução não é probabilística nem por amostragem: a conclusão decorre com necessidade lógica universal da definição das premissas dadas."
          },
          {
            id: "q8-opt3",
            text: "É um argumento Inválido por cometer a falácia da petição de princípio, pressuponto na premissa maior a própria existência soberana do território federativo do Brasil.",
            isCorrect: false,
            explanation: "Incorreto. Não há petição de princípio; a premissa 1 estabelece a regra universal de pertencimento e a premissa 2 identifica a instância particular, gerando dedução válida."
          },
          {
            id: "q8-opt4",
            text: "É um argumento VÁLIDO e CORRETO/SÓLIDO (pois a inferência dedutiva é estritamente necessária e ambas as premissas correspondem a fatos verdadeiros no mundo real).",
            isCorrect: true,
            explanation: "Correto! O silogismo categórico é perfeitamente válido (Todo A é B; C é A; logo C é B) e ambas as premissas são verdades factuais incontestáveis da geografia real. Logo, a solidez é garantida."
          }
        ]
      },

      /* ===============================================================
         4. TIPOS DE ARGUMENTOS (DEDUTIVO, INDUTIVO, ABDUTIVO)
         =============================================================== */
      {
        id: "q9",
        question: "O que caracteriza rigorosamente um argumento 'Dedutivo'?",
        options: [
          {
            id: "q9-opt1",
            text: "A inferência que parte de amostras particulares observadas no passado para projetar leis gerais de alta probabilidade quantificável em gráficos científicos.",
            isCorrect: false,
            explanation: "Incorreto. Projetar regularidades a partir de amostras particulares observadas no tempo é a essência do método indutivo, não dedutivo."
          },
          {
            id: "q9-opt2",
            text: "A conclusão deriva de forma necessária e estritamente lógica das premissas, sendo impossível que a conclusão seja falsa se as premissas forem verdadeiras.",
            isCorrect: true,
            explanation: "Correto! No raciocínio dedutivo genuíno (como na geometria de Euclides ou na lógica clássica), a força de derivação é absoluta: a verdade das premissas força a verdade da conclusão por necessidade formal."
          },
          {
            id: "q9-opt3",
            text: "A seleção prudencial da hipótese explicativa mais econômica e plausível diante de vestígios enigmáticos constatados em um cenário investigativo complexo.",
            isCorrect: false,
            explanation: "Incorreto. A escolha da melhor hipótese para dar conta de indícios observados constitui a inferência abdutiva (abdução), não a dedução estrita."
          },
          {
            id: "q9-opt4",
            text: "O emprego de recursos de oratória e figuras de linguagem poéticas que visam suscitar adesão volitiva do ouvinte aos mandamentos éticos da tradição.",
            isCorrect: false,
            explanation: "Incorreto. A persuasão oratória pertence à retórica, enquanto a dedução é um encadeamento racional necessário de proposições lógicas."
          }
        ]
      },
      {
        id: "q10",
        question: "O que é um argumento 'Indutivo'?",
        options: [
          {
            id: "q10-opt1",
            text: "Um silogismo categórico fechado cujos axiomas impõem a verdade da conclusão com certeza matemática absoluta sem necessidade de testes factuais futuros.",
            isCorrect: false,
            explanation: "Incorreto. Certeza necessária absoluta fechada é própria da dedução lógica ou matemática, não da indução empírica."
          },
          {
            id: "q10-opt2",
            text: "Uma inferência metafísica apriorística que deduz a estrutura ontológica das criaturas a partir da essência divina sem apelo aos sentidos corporais.",
            isCorrect: false,
            explanation: "Incorreto. Isso seria uma dedução metafísica a priori; a indução apoia-se constitutivamente na apreensão empírica reiterada de dados sensíveis."
          },
          {
            id: "q10-opt3",
            text: "Um argumento cuja conclusão é uma projeção provável (geral ou específica) baseada na repetição de padrões e observações particulares da realidade sensível.",
            isCorrect: true,
            explanation: "Correto! A indução parte do acúmulo de instâncias observadas (ex: 'todos os cisnes vistos até hoje são brancos') para inferir uma regra provável. Ela expande o conhecimento, mas traz probabilidade, não necessidade dedutiva absoluta."
          },
          {
            id: "q10-opt4",
            text: "A escolha dialética de uma explicação que minimize contradições teológicas por meio da autoridade canônica dos concílios ecumênicos da Igreja.",
            isCorrect: false,
            explanation: "Incorreto. O argumento de autoridade magistral é um recurso teológico particular, que não se confunde com o conceito epistemológico de raciocínio indutivo."
          }
        ]
      },
      {
        id: "q11",
        question: "O que é um argumento 'Abdutivo' (Inferência para a Melhor Explicação)?",
        options: [
          {
            id: "q11-opt1",
            text: "Dado um evento ou dado observado, infere-se a hipótese que melhor o explica, a partir de um conjunto explícito de hipóteses concorrentes, avaliando seu poder explicativo.",
            isCorrect: true,
            explanation: "Correto! A abdução avalia um leque de hipóteses concorrentes frente a fatos ou pistas do mundo, selecionando aquela que explica os dados com maior abrangência, elegância e sem recorrer a hipóteses ad hoc absurdas."
          },
          {
            id: "q11-opt2",
            text: "É o cálculo que estabelece a probabilidade percentual de um evento futuro com base na contagem exata e exaustiva de todos os átomos presentes no sistema.",
            isCorrect: false,
            explanation: "Incorreto. A abdução não é uma contagem determinística exaustiva, mas a escolha da hipótese mais explicativa e razoável diante de dados observados."
          },
          {
            id: "q11-opt3",
            text: "É a demonstração apodíctica que deriva proposições derivadas partindo de axiomas imutáveis da geometria euclidiana sem nenhuma hipótese concorrente.",
            isCorrect: false,
            explanation: "Incorreto. Isso descreve o método axiomático-dedutivo da geometria e da matemática pura, onde não há comparação de hipóteses empíricas concorrentes."
          },
          {
            id: "q11-opt4",
            text: "É uma artimanha sofística utilizada para forçar o adversário a aceitar uma premissa duvidosa por meio do cansaço e do uso excessivo de termos técnicos arcaicos.",
            isCorrect: false,
            explanation: "Incorreto. A abdução é um método epistemológico respeitado e central no raciocínio científico, médico, histórico e apologético contemporâneo."
          }
        ]
      },
      {
        id: "q12",
        question: "Considere o caso exposto no resumo:\nVocê acorda, abre a porta e vê que a calçada, o asfalto, os telhados das casas e as folhas no alto das árvores estão uniformemente molhados. Diante de hipóteses como 'um vizinho lavou a calçada', 'um caminhão-pipa limpou a rua' ou 'choveu de madrugada', você infere que choveu.\nQue tipo de argumento foi estruturado?",
        options: [
          {
            id: "q12-opt1",
            text: "Argumento Dedutivo estrito, pois as leis termodinâmicas do estado líquido impõem como impossibilidade física absoluta que a água tenha vindo de outra fonte.",
            isCorrect: false,
            explanation: "Incorreto. Não é dedução necessária, pois seria teoricamente possível (embora implausível) que drones com mangueiras tivessem aspergido água sobre todo o bairro."
          },
          {
            id: "q12-opt2",
            text: "Argumento Indutivo de enumeração simples, pois limitou-se a quantificar o número de telhados atingidos e calcular uma média de pluviosidade para os próximos anos.",
            isCorrect: false,
            explanation: "Incorreto. O objetivo não foi projetar médias futuras por amostragem, mas sim descobrir a causa explicativa concreta que produziu o estado presente observado."
          },
          {
            id: "q12-opt3",
            text: "Argumento Abdutivo, pois confrontou hipóteses concorrentes e inferiu aquela que melhor e mais economicamente explica a totalidade e uniformidade dos dados visíveis.",
            isCorrect: true,
            explanation: "Correto! O vizinho não molharia copas de árvores e telhados; o caminhão-pipa não atinge o alto das casas. A hipótese da chuva de madrugada explica todos os dados sem exigir suposições bizarras: é a melhor explicação abdutiva."
          },
          {
            id: "q12-opt4",
            text: "Falácia da Falsa Causa (post hoc ergo propter hoc), desprovida de qualquer legitimidade epistemológica por não ter presenciado o instante da chuva com os olhos.",
            isCorrect: false,
            explanation: "Incorreto. Não presenciar o evento no momento não invalida a inferência; a ciência forense e a cosmologia operam precisamente via inferência abdutiva a partir dos efeitos remanescentes."
          }
        ]
      },

      /* ===============================================================
         5. ARGUMENTO DO AJUSTE FINO (FINE-TUNING)
         =============================================================== */
      {
        id: "q13",
        question: "No campo dos Preâmbulos da Fé, qual é o tipo e a finalidade do 'Argumento do Ajuste Fino' (Fine-Tuning)?",
        options: [
          {
            id: "q13-opt1",
            text: "É um argumento dedutivo que visa provar com necessidade matemática que o sistema solar foi criado há exatamente seis mil anos com a órbita atual dos planetas.",
            isCorrect: false,
            explanation: "Incorreto. O argumento do ajuste fino não tem vínculo com o criacionismo da terra jovem, partindo das constantes da física cósmica padrão do Big Bang."
          },
          {
            id: "q13-opt2",
            text: "É um argumento abdutivo que visa encontrar a melhor explicação para os dados extraordinariamente surpreendentes sobre o grau de ajuste fino que o universo possui para permitir a vida.",
            isCorrect: true,
            explanation: "Correto! Diante de dados da astrofísica que demonstram calibrações de estreiteza inacreditável em parâmetros primordiais, o argumento avalia qual hipótese fornece a explicação mais lúcida e satisfatória para essa ordem."
          },
          {
            id: "q13-opt3",
            text: "É um argumento indutivo que busca estimar a quantidade exata de espécies biológicas inteligentes que povoam os exoplanetas da constelação de Órion.",
            isCorrect: false,
            explanation: "Incorreto. O fine-tuning investiga os pré-requisitos biofísicos universais (como a síntese do carbono e estabilidade cósmica), não a biologia alienígena em constelações."
          },
          {
            id: "q13-opt4",
            text: "É uma recusa fideísta da física quântica, cujo objetivo é afirmar que as leis naturais são ilusórias e que a matéria obedece a caprichos mágicos sem leis de conservação.",
            isCorrect: false,
            explanation: "Incorreto. Pelo contrário: o argumento extrai sua força justamente da precisão implacável e matemática das leis fundamentais descobertas pela física moderna."
          }
        ]
      },
      {
        id: "q14",
        question: "Quais foram os quatro dados fundamentais expostos em aula como evidências incontestáveis do Ajuste Fino cósmico?",
        options: [
          {
            id: "q14-opt1",
            text: "1) A inclinação do eixo terrestre; 2) A composição de oxigênio na atmosfera; 3) A velocidade média das correntes marítimas; 4) A densidade do granito na crosta continental.",
            isCorrect: false,
            explanation: "Incorreto. Esses fatores são condições geofísicas e planetárias locais da Terra, e não constantes cosmológicas fundamentais do universo primordial."
          },
          {
            id: "q14-opt2",
            text: "1) A massa fixa dos dinossauros; 2) O ciclo de fotossíntese vegetal; 3) O congelamento da água a zero graus Celsius; 4) A velocidade de rotação da Lua ao redor da Terra.",
            isCorrect: false,
            explanation: "Incorreto. Propriedades termodinâmicas secundárias de substâncias terrestres e história fóssil não constituem o rol dos 4 pilares cosmológicos do fine-tuning."
          },
          {
            id: "q14-opt3",
            text: "1) O tempo de decaimento do urânio nas rochas; 2) A existência de estrelas anãs vermelhas; 3) A teoria heliocêntrica de Galileu; 4) A pressão hidrostática no fundo das fossas marinhas.",
            isCorrect: false,
            explanation: "Incorreto. Essa combinação reúne dados astronômicos e geológicos desconexos que não refletem a lista examinada no estudo apologético."
          },
          {
            id: "q14-opt4",
            text: "1) Eficiência da fusão nuclear e estado de ressonância de Hoyle; 2) Campo inflacionário e flutuações primordiais; 3) Constante cosmológica e densidade de energia do vácuo; 4) Baixa entropia inicial e volume de espaço de fase gravitacional.",
            isCorrect: true,
            explanation: "Correto! Esses quatro dados físicos (a ressonância do carbono-12 em 7,65 MeV, flutuações de 10⁻⁵ na inflação, o valor minimamente calibrado de Λ e a entropia calculada por Roger Penrose em 10^10^123) constituem a base científica examinada."
          }
        ]
      },
      {
        id: "q15",
        question: "Qual é o conjunto de hipóteses concorrentes (H) tradicionalmente formulado para explicar os dados do Ajuste Fino?",
        options: [
          {
            id: "q15-opt1",
            text: "H1 (Acaso fortuito), H2 (Necessidade física fundamental), H3 (Multiverso antrópico) e H4 (Inteligência Superior / Intelecto Criador Ordenador).",
            isCorrect: true,
            explanation: "Correto! Esse quarteto esgota os caminhos explicativos: ou ocorreu por sorte cega absurda (Acaso), ou as leis físicas só poderiam ser assim estruturalmente (Necessidade), ou há infinitos universos e calhou de estarmos no que deu certo (Multiverso), ou foram deliberadamente calibradas por um Criador (Inteligência Superior)."
          },
          {
            id: "q15-opt2",
            text: "H1 (Evolução química das galáxias), H2 (Matéria escura autoconsciente), H3 (Teoria da Terra Oca) e H4 (Reencarnação dos elementos astronômicos).",
            isCorrect: false,
            explanation: "Incorreto. Essa lista mistura conceitos pseudocientíficos que não fazem parte do debate formal da cosmologia e filosofia analítica da religião."
          },
          {
            id: "q15-opt3",
            text: "H1 (Gravidade estática), H2 (Geometria euclidiana obrigatória), H3 (Panteísmo grego antigo) e H4 (Ilusão subjetiva dos sentidos dos cientistas).",
            isCorrect: false,
            explanation: "Incorreto. Nenhuma dessas opções aborda a questão ontológica da calibração fina das forças e constantes da natureza."
          },
          {
            id: "q15-opt4",
            text: "H1 (Acaso absoluto) e H2 (Colapso quântico determinístico) apenas, sendo expressamente vetado à filosofia formular outras hipóteses causais.",
            isCorrect: false,
            explanation: "Incorreto. A filosofia da ciência reconhece legitimamente tanto o debate sobre necessidade estrutural quanto hipóteses de multiverso e causa inteligente transcendente."
          }
        ]
      },
      {
        id: "q16",
        question: "Ao avaliar criticamente as quatro hipóteses concorrentes do Ajuste Fino, qual foi a conclusão alcançada?",
        options: [
          {
            id: "q16-opt1",
            text: "O Acaso (H1) foi validado como a melhor resposta, visto que em um tempo cosmológico de bilhões de anos qualquer probabilidade, mesmo próxima de zero, torna-se certeza empírica.",
            isCorrect: false,
            explanation: "Incorreto. Probabilidades da ordem de 1 em 10^(10^123) (cálculo de Penrose para a baixa entropia) são tão gigantescamente improváveis que o tempo de existência do universo não chega perto de viabilizá-las por mero acaso."
          },
          {
            id: "q16-opt2",
            text: "A Necessidade (H2) encerra a controvérsia, pois a física quântica comprovou que é impossível as constantes fundamentais terem qualquer outro valor numérico nas equações.",
            isCorrect: false,
            explanation: "Incorreto. O consenso da física moderna aponta no sentido oposto: as constantes fundamentais são livres nas equações e poderiam assumir infinitos valores, provando sua contingência."
          },
          {
            id: "q16-opt3",
            text: "A Inteligência Superior (H4) é a melhor explicação abdutiva: o acaso é matematicamente nulo, a física aponta contingência (não necessidade) e o multiverso carece de provas além de exigir seu próprio ajuste fino gerador.",
            isCorrect: true,
            explanation: "Correto! Na nossa experiência universal, sistemas de altíssima precisão informacional decorrem de mentes. O acaso é nulo, a necessidade inexiste na física e o multiverso sem provas apenas transfere o problema (a 'fábrica de universos' precisaria de ajuste fino próprio). A mente criadora é a melhor explicação abdutiva."
          },
          {
            id: "q16-opt4",
            text: "O Multiverso (H3) consolidou-se como certeza factual indiscutível após imagens diretas de outras dimensões cósmicas capturadas pelo telescópio espacial James Webb.",
            isCorrect: false,
            explanation: "Incorreto. O telescópio espacial observa apenas o nosso universo observável; o multiverso continua sendo uma postulação metafísica especulativa sem evidência empírica."
          }
        ]
      },

      /* ===============================================================
         6. ARGUMENTO DA CONTINGÊNCIA DE LEIBNIZ (SEÇÃO 1.2)
         =============================================================== */
      {
        id: "q17",
        question: "No 'Argumento da Contingência' de Leibniz, qual é o papel do Princípio da Razão Suficiente e dos seres contingentes?",
        options: [
          {
            id: "q17-opt1",
            text: "Afirma que o cosmos é dotado de necessidade ontológica absoluta em virtude de sua energia total constante, descartando qualquer fundamento metafísico transcendente ao universo.",
            isCorrect: false,
            explanation: "Incorreto. Seres materiais são compostos, mutáveis e perecíveis. A conservação de energia não remove a contingência ontológica de o universo existir em vez do nada."
          },
          {
            id: "q17-opt2",
            text: "Pelo Princípio da Razão Suficiente, tudo o que existe contingentemente requer uma causa; sendo o cosmos contingente, a regressão causal exige uma Causa Primeira Necessária fora do tempo e da matéria: Deus.",
            isCorrect: true,
            explanation: "Correto! Leibniz divide o real entre seres necessários (cuja razão de ser está neles mesmos) e contingentes (que poderiam não existir e dependem de causas prévias). O cosmos físico é contingente; logo, sua razão de existir exige um Ser que existe necessariamente por Si: Deus."
          },
          {
            id: "q17-opt3",
            text: "Sustenta que a regressão causal do mundo pode prolongar-se infinitamente no passado sem que jamais seja necessário postular uma primeira causa ou um ponto de apoio metafísico.",
            isCorrect: false,
            explanation: "Incorreto. Uma série infinita de elementos dependentes ainda seria, em sua totalidade, dependente e contingente, permanecendo sem razão suficiente para existir."
          },
          {
            id: "q17-opt4",
            text: "Limita o Princípio da Razão Suficiente à psicologia humana, declarando que os objetos materiais e os átomos físicos existem sem motivo, propósito ou fundamentação causal.",
            isCorrect: false,
            explanation: "Incorreto. O Princípio da Razão Suficiente é uma lei metafísica do ser (ontológica), não uma mera regra psicológica restrita à subjetividade humana."
          }
        ]
      },

      /* ===============================================================
         7. ARGUMENTO MORAL METAÉTICO (SEÇÃO 1.3)
         =============================================================== */
      {
        id: "q18",
        question: "Como se formula o silogismo do 'Argumento Moral Metaético' a favor da existência de Deus?",
        options: [
          {
            id: "q18-opt1",
            text: "• Premissa 1 (P1): Se Deus não existe, então valores morais objetivos não existem.\n• Premissa 2 (P2): Valores morais objetivos existem.\n• Conclusão (C): Logo, Deus existe (argumento ontológico sobre a fonte do Bem).",
            isCorrect: true,
            explanation: "Correto! É um argumento de ordem ontológica (sobre o que ancora a realidade objetiva do Bem e do Mal no ser) e não epistemológica (como os homens aprendem valores na infância). Se há deveres morais que obrigam independentemente de convenções humanas, Deus é seu único fundamento estável."
          },
          {
            id: "q18-opt2",
            text: "• P1: Todo indivíduo que professa crer em Deus pratica apenas ações bondosas.\n• P2: Todos os ateus são desprovidos de virtudes cívicas.\n• C: Logo, as igrejas devem governar as nações civis.",
            isCorrect: false,
            explanation: "Incorreto. O argumento moral não afirma que crentes são moralmente perfeitos nem que ateus não possam agir bem; ele trata do fundamento ontológico da própria existência do certo e do errado."
          },
          {
            id: "q18-opt3",
            text: "• P1: Os valores éticos foram criados pelas civilizações da Idade do Bronze.\n• P2: As civilizações antigas desapareceram.\n• C: Logo, qualquer julgamento moral moderno é anacrônico.",
            isCorrect: false,
            explanation: "Incorreto. Esta é uma tese relativista e historicista, que nega a premissa de que existem valores morais objetivos e atemporais."
          },
          {
            id: "q18-opt4",
            text: "• P1: Se Deus existe, os códigos penais civis são desnecessários.\n• P2: Os tribunais humanos continuam aplicando sanções.\n• C: Logo, a moralidade é uma ficção jurídica do Estado.",
            isCorrect: false,
            explanation: "Incorreto. Essa formulação comete erro de categoria, confundindo a virtude moral ontológica com a jurisdição do direito penal positivo humano."
          }
        ]
      },
      {
        id: "q19",
        question: "Como o resumo refuta a objeção do 'desacordo cultural' e a 'objeção evolutiva' levantadas contra o Argumento Moral?",
        options: [
          {
            id: "q19-opt1",
            text: "Concede que a moral é inteiramente subjetiva e relativa a cada tribo, transferindo o fundamento da ética para acordos comerciais e tratados econômicos internacionais mutáveis.",
            isCorrect: false,
            explanation: "Incorreto. O resumo sustenta vigorosamente a objetividade ontológica dos valores morais, repudiando o relativismo cultural utilitarista."
          },
          {
            id: "q19-opt2",
            text: "Afirma que a seleção natural darwiniana fundamenta a dignidade humana, visto que os comportamentos que favorecem a proliferação da espécie são idênticos a mandamentos metafísicos.",
            isCorrect: false,
            explanation: "Incorreto. O resumo demonstra que a evolução explica apenas comportamentos biologicamente adaptativos, mas não pode fundamentar um dever moral normativo inviolável."
          },
          {
            id: "q19-opt3",
            text: "Sustenta que todas as sociedades humanas de todas as eras possuíam leis civis escritas rigorosamente idênticas para regular o comércio e a posse de bens materiais.",
            isCorrect: false,
            explanation: "Incorreto. Reconhece-se a enorme diversidade histórica de leis civis e costumes locais, diferenciando-as dos primeiros princípios universais da lei moral natural."
          },
          {
            id: "q19-opt4",
            text: "O desacordo cultural reflete divergências factuais secundárias (mantendo os princípios fundamentais) e a evolução biológica explica comportamentos de sobrevivência, não o dever ontológico normativo.",
            isCorrect: true,
            explanation: "Correto! Culturas diferentes concordam em princípios morais centrais (como honra, coragem e proteção à comunidade), divergindo em aplicações fáticas. E a seleção biológica ensina o que favorece passar genes adiante, mas é incapaz de conferir autoridade ontológica a um dever moral objetivo."
          }
        ]
      },
      {
        id: "q20",
        question: "Como a metafísica católica da 'Simplicidade Divina' supera o clássico 'Dilema de Eutífron' ('Algo é bom porque Deus o quer, ou Deus o quer porque é bom?')?",
        options: [
          {
            id: "q20-opt1",
            text: "Abraça o voluntarismo radical de Guilherme de Ockham: Deus cria o bem por pura arbitrariedade volitiva, podendo tornar o ódio e o perjúrio virtudes sagradas se assim deliberasse.",
            isCorrect: false,
            explanation: "Incorreto. O voluntarismo arbitrário é rejeitado pela doutrina católica clássica, pois em Deus a vontade é inseparável de Sua suprema sabedoria e perfeição essencial."
          },
          {
            id: "q20-opt2",
            text: "Supera a falsa dicotomia através da Simplicidade Divina: Deus não cria o bem arbitrariamente nem se submete a uma lei exterior a Si; a própria essência e natureza de Deus É a Bondade Perfeita.",
            isCorrect: true,
            explanation: "Correto! Na Simplicidade Divina, não há divisão entre o Ser de Deus e Seus atributos. Deus não 'tem' bondade ou inventa regras por capricho; Ele É o Bem Subsistente. Sua natureza é o referencial supremo, unificando valor moral e autoridade de dever."
          },
          {
            id: "q20-opt3",
            text: "Postula a existência de um princípio ontológico superior ao próprio Criador, ao qual a mente divina deve subordinar Seus mandamentos para não incorrer em erro moral.",
            isCorrect: false,
            explanation: "Incorreto. Se houvesse um princípio moral ontologicamente anterior e superior a Deus, esse princípio seria o verdadeiro Deus, e o Criador seria uma criatura subordinada."
          },
          {
            id: "q20-opt4",
            text: "Admite a impossibilidade de resposta racional, aconselhando o estudante cristão a ignorar os questionamentos metafísicos e apegar-se exclusivamente a emoções piedosas.",
            isCorrect: false,
            explanation: "Incorreto. O cristianismo escolástico e patrístico enfrenta e resolve o dilema com rigor conceitual na metafísica do Ato Puro, sem recorrer a evasivas fideístas."
          }
        ]
      },

      /* ===============================================================
         8. CONFIABILIDADE HISTÓRICA E ESCRITURÍSTICA (SEÇÕES 1.4 A 1.7)
         =============================================================== */
      {
        id: "q21",
        question: "No exame dos textos sagrados, em que consistem a 'Prova de Antecedência' e a 'Prova de Preservação' abordadas no estudo?",
        options: [
          {
            id: "q21-opt1",
            text: "Afirmam que o Antigo Testamento foi composto por monges medievais no século XII e que o Novo Testamento foi preservado em apenas três cópias latinas no Vaticano.",
            isCorrect: false,
            explanation: "Incorreto. As evidências arqueológicas de manuscritos remontam a séculos antes de Cristo (AT) e ao século I-II (NT), dispersos por todo o mundo mediterrâneo."
          },
          {
            id: "q21-opt2",
            text: "Sustentam que as profecias do templo foram destruídas no incêndio de Roma e que os apóstolos reinventaram o texto grego para obter tolerância civil perante o senado.",
            isCorrect: false,
            explanation: "Incorreto. A preservação textual em milhares de cópias independentes em grego, siríaco e copta refuta sumariamente teorias de invenção política do texto."
          },
          {
            id: "q21-opt3",
            text: "A Antecedência comprova que o AT foi fixado séculos antes de Cristo (Septuaginta LXX e Qumran); a Preservação atesta que o NT não sofreu corrupção progressiva (>5.800 manuscritos gregos sobreviventes).",
            isCorrect: true,
            explanation: "Correto! A tradução Septuaginta (séc. III a.C.) e os Manuscritos do Mar Morto (séc. II a.C. a I d.C.) provam que as profecias precedem a Cristo. E a dispersão de mais de 5.800 cópias gregas do NT torna impossível qualquer adulteração deliberada centralizada."
          },
          {
            id: "q21-opt4",
            text: "Provam que a Bíblia não possui variantes textuais e que todos os copistas da antiguidade receberam dons de infalibilidade ortográfica ao transcrever os pergaminhos.",
            isCorrect: false,
            explanation: "Incorreto. A crítica textual reconhece variantes ortográficas normais entre manuscritos, provando que a vasta pluralidade de linhas textuais preservou a substância imutável da mensagem."
          }
        ]
      },
      {
        id: "q22",
        question: "Quais autores seculares e pagãos dos séculos I e II atestam de maneira independente a historicidade de Jesus e da Igreja primitiva?",
        options: [
          {
            id: "q22-opt1",
            text: "Tácito (Anais 15,44 - menciona Christus executado por Pilatos sob Tibério), Plínio, o Jovem (Cartas a Trajano - culto a Cristo como a um Deus) e Luciano de Samósata (crucificação do mestre dos cristãos).",
            isCorrect: true,
            explanation: "Correto! Essas testemunhas romanas e gregas não-cristãs (e abertamente hostis aos cristãos) confirmam de forma independente a existência histórica de Jesus, Sua execução sob Pôncio Pilatos no principado de Tibério e o culto divino prestado a Ele desde o início."
          },
          {
            id: "q22-opt2",
            text: "Cícero (tratado sobre a condenação de Jesus), Virgílio (poemas místico-messiânicos sobre o batismo cristão) e Horácio (elegias ao túmulo vazio de Jerusalém).",
            isCorrect: false,
            explanation: "Incorreto. Cícero, Virgílio e Horácio viveram e faleceram antes do início do ministério público e crucificação de Jesus Cristo na Judeia."
          },
          {
            id: "q22-opt3",
            text: "Aristóteles e Platão, que debateram com os primeiros bispos cristãos no Areópago de Atenas sobre a ressurreição corpórea dos mortos.",
            isCorrect: false,
            explanation: "Incorreto. Platão e Aristóteles viveram mais de três séculos antes da era cristã; quem debateu no Areópago foi o apóstolo Paulo com filósofos estoicos e epicureus (Atos 17)."
          },
          {
            id: "q22-opt4",
            text: "Nenhum historiador pagão jamais registrou a existência de Jesus ou de cristãos até a promulgação do Édito de Tessalônica no ano 380 d.C.",
            isCorrect: false,
            explanation: "Incorreto. O mito da ausência de fontes seculares primitivas é cabalmente desmentido por historiadores romanos de elite como Tácito, Suetônio e Plínio."
          }
        ]
      },
      {
        id: "q23",
        question: "Sobre o 'Encaixe Profético', quais passagens do Antigo Testamento anteciparam a Paixão e Morte de Cristo séculos antes em detalhes fora do controle humano de Jesus?",
        options: [
          {
            id: "q23-opt1",
            text: "Cântico dos Cânticos 2 (a fuga de Pilatos), Eclesiastes 4 (o julgamento dos doze apóstolos em Roma) e Provérbios 10 (a confecção do sudário de linho).",
            isCorrect: false,
            explanation: "Incorreto. Esses textos da literatura sapiencial não descrevem a mecânica da execução romana nem as profecias messiânicas específicas da crucificação."
          },
          {
            id: "q23-opt2",
            text: "Gênesis 49 (o sepultamento no mar da Galileia), Levítico 16 (a fuga dos guardas do Sinédrio) e Deuteronômio 18 (o decreto do césar Augusto).",
            isCorrect: false,
            explanation: "Incorreto. As referências citadas tratam da história patriarcal e do culto mosaico, sem corresponder aos cumprimentos proféticos detalhados da Paixão."
          },
          {
            id: "q23-opt3",
            text: "O livro de Daniel apenas, que profetizou a data exata da invasão das legiões do general Tito contra os muros da cidadela de Jerusalém no ano 70 d.C.",
            isCorrect: false,
            explanation: "Incorreto. Embora Daniel traga profecias messiânicas, a mecânica anatômica da crucifixão e o túmulo do homem rico encontram-se no Salmo 22 e Isaías 53."
          },
          {
            id: "q23-opt4",
            text: "Salmo 22 (mãos e pés transpassados e sortes sobre as roupas), Isaías 53 (silêncio perante juízes e sepulcro com os ricos) e Zacarias 12 (olharão para aquele que transpassaram com a lança).",
            isCorrect: true,
            explanation: "Correto! O Salmo 22 antecipou a mecânica da crucificação antes de ela ser inventada pelos romanos; Isaías 53 profetizou o silêncio de Jesus e Seu sepultamento na tumba luxuosa de José de Arimateia; e Zacarias 12 previu o golpe da lança que substituiu a fratura das pernas (João 19)."
          }
        ]
      },

      /* ===============================================================
         9. PSICOLOGIA DO TESTEMUNHO E FATOS MÍNIMOS (SEÇÕES 1.8 E 1.9)
         =============================================================== */
      {
        id: "q24",
        question: "Na 'Psicologia do Testemunho dos Mártires' (Pedro, Paulo, Tiago), por que a hipótese de 'Fraude Consciente' (eles mentiram deliberadamente) é logicamente eliminada?",
        options: [
          {
            id: "q24-opt1",
            text: "Porque no Império Romano os mentirosos confessos eram automaticamente perdoados e recompensados com isenção perpétua de tributos municipais pelas cortes de Roma.",
            isCorrect: false,
            explanation: "Incorreto. Roma perseguia criminosos e revoltosos com crueldade letal; a renúncia ao testemunho empírico salvava a vida, mas ninguém ganhava fortunas por forjar seitas ilegais."
          },
          {
            id: "q24-opt2",
            text: "Porque ninguém morre por uma fraude voluntária tendo a 'porta de saída' romana (renunciar ao testemunho para salvar a vida); Pedro reverteu seu medo e Tiago converteu-se sem auferir ganhos mundanos.",
            isCorrect: true,
            explanation: "Correto! Homens podem morrer por erros sinceros, mas ninguém aceita torturas brutais por uma mentira que sabe conscientemente ser inventada, quando Roma oferecia formalmente o perdão a quem renunciasse à crença. A firmeza dos apóstolos torna o custo da fraude proibitivo."
          },
          {
            id: "q24-opt3",
            text: "Porque os discípulos de Jesus organizaram milícias armadas que intimidaram os governadores provinciais, garantindo a imunidade dos mártires nas arenas de leões.",
            isCorrect: false,
            explanation: "Incorreto. Os apóstolos eram desprovidos de armas, exércitos ou poder mundano, entregando-se pacífica e heroicamente à morte nas perseguições romanas."
          },
          {
            id: "q24-opt4",
            text: "Porque os manuscritos primitivos comprovam que os apóstolos enriqueceram com salários astronômicos pagos em ouro pelo imperador Cláudio.",
            isCorrect: false,
            explanation: "Incorreto. Os apóstolos viveram na mais estrita renúncia material e pobreza voluntária, sendo caçados e executados pelas autoridades públicas."
          }
        ]
      },
      {
        id: "q25",
        question: "Por que a hipótese de 'Delírio Sincero / Alucinação Coletiva' é considerada insustentável para explicar as aparições do Ressuscitado?",
        options: [
          {
            id: "q25-opt1",
            text: "Porque na civilização greco-romana distúrbios psiquiátricos e alucinações mentais eram biologicamente impossíveis em virtude da ausência de agrotóxicos na agricultura.",
            isCorrect: false,
            explanation: "Incorreto. A mente humana sempre esteve sujeita a afecções mentais e perturbações psicológicas em todas as épocas e culturas da história."
          },
          {
            id: "q25-opt2",
            text: "Porque as experiências duraram apenas frações de segundo na penumbra noturna, sem nenhum diálogo, ensino ou contato sensorial que permitisse reflexão clínica.",
            isCorrect: false,
            explanation: "Incorreto. As fontes atestam encontros prolongados em vigília plena, conversas teológicas, refeições partilhadas de peixe (Lc 24) e toque corpóreo nas chagas (São Tomé)."
          },
          {
            id: "q25-opt3",
            text: "Porque alucinações são fenômenos mentais individuais (não ocorrem coletivamente com o mesmo conteúdo simultâneo) e os perfis eram incompatíveis (Pedro em luto culpado, Tiago cético e Paulo perseguidor violento).",
            isCorrect: true,
            explanation: "Correto! A psiquiatria demonstra que alucinações são projeções subjetivas de cérebros individuais, não experiências partilhadas em massa com idêntica complexidade. Além disso, Pedro, Tiago e Paulo possuíam estados psicológicos opostos que tornam impossível um mesmo delírio condicionado."
          },
          {
            id: "q25-opt4",
            text: "Porque a crença geral de todos os judeus do século I já previa que o Messias ressuscitaria individualmente no meio da história para conviver com os homens.",
            isCorrect: false,
            explanation: "Incorreto. O judaísmo esperava apenas a ressurreição geral de todos os justos no Fim dos Tempos, não a ressurreição isolada e antecipada do Messias no meio da história; a crença dos apóstolos foi fruto da evidência presencial, não de expectativa prévia."
          }
        ]
      },
      {
        id: "q26",
        question: "No método dos 'Fatos Mínimos', o que demonstram o 'Critério do Constrangimento' e a 'Atestação Inimiga' a respeito do sepulcro vazio?",
        options: [
          {
            id: "q26-opt1",
            text: "Constrangimento: no século I o testemunho feminino tinha baixo valor legal (fraude não inventaria mulheres); Atestação Inimiga: os opositores propagaram que os discípulos 'roubaram o corpo', admitindo tacitamente que o túmulo estava de fato vazio.",
            isCorrect: true,
            explanation: "Correto! Na sociedade patriarcal do séc. I, o relato feminino desfavorecia a credibilidade jurídica de uma invenção dolosa. E se o corpo permanecesse na tumba, as autoridades precisariam apenas expô-lo para sufocar o cristianismo; ter que inventar a desculpa do roubo da guarda comprova que a tumba estava vazia."
          },
          {
            id: "q26-opt2",
            text: "Constrangimento: os discípulos sentiam vergonha de suas origens camponesas da Galileia; Atestação Inimiga: os centuriões romanos converteram-se e financiaram as epístolas de Paulo.",
            isCorrect: false,
            explanation: "Incorreto. Esses não são os sentidos dos critérios historiográficos; o constrangimento refere-se ao impacto de testemunhas femininas e a atestação inimiga refere-se à desculpa judaica oficial."
          },
          {
            id: "q26-opt3",
            text: "Constrangimento: o sepulcro pertencera a uma família pagã de Samaria; Atestação Inimiga: as autoridades de Roma declararam Jesus patrono do panteão imperial.",
            isCorrect: false,
            explanation: "Incorreto. O túmulo pertencia a José de Arimateia, membro ilustre do Sinédrio judaico, e Roma condenou o culto cristão como 'superstição ilícita'."
          },
          {
            id: "q26-opt4",
            text: "Comprovam que o corpo de Jesus foi atirado em uma vala comum e que o sepulcro de Arimateia foi um monumento alegórico construído dois séculos depois.",
            isCorrect: false,
            explanation: "Incorreto. A historiografia crítica contemporânea reconhece amplamente a historicidade do sepultamento singular de Jesus no jazigo novo de Arimateia."
          }
        ]
      },
      {
        id: "q27",
        question: "Ainda nos Fatos Mínimos, por que as conversões de Paulo e de Tiago não podem ser explicadas por 'pressão social de grupo' ou 'lavagem cerebral progressiva'?",
        options: [
          {
            id: "q27-opt1",
            text: "Porque Paulo e Tiago viviam em mosteiros isolados no Egito há mais de vinte anos, sem nenhum contato com as comunidades judaicas de Jerusalém.",
            isCorrect: false,
            explanation: "Incorreto. Paulo atuava no centro de Jerusalém como fariseu zeloso e Tiago convivia no ambiente judaico de Nazaré e da Judeia; os mosteiros cenobitas surgiram séculos mais tarde."
          },
          {
            id: "q27-opt2",
            text: "Porque ambos receberam incentivos fiscais e privilégios de cidadania romana concedidos pelo Sinédrio para assumirem a supervisão da Igreja em Roma.",
            isCorrect: false,
            explanation: "Incorreto. Converter-se a Cristo significava romper com a elite e enfrentar perda de status, perseguição e pena de morte pelo Estado."
          },
          {
            id: "q27-opt3",
            text: "Porque a legislação mosaica obrigava todo fariseu a experimentar novas seitas heréticas antes de assumir cargos nos tribunais locais.",
            isCorrect: false,
            explanation: "Incorreto. A ortodoxia farisaica era intransigente contra heresias, sendo Paulo comissionado justamente para erradicar o movimento cristão com prisões e mortes."
          },
          {
            id: "q27-opt4",
            text: "Porque não havia ambiente para socialização: Paulo era um algoz hostil a caminho de prisões e Tiago era um irmão cético durante a vida terrena de Jesus; suas transformações foram abruptas e com imediata ruptura de status.",
            isCorrect: true,
            explanation: "Correto! Processos de lavagem cerebral requerem isolamento prolongado e afeição grupal gradual. Paulo estava a caminho de Damasco para prender cristãos e Tiago desprezava o ministério do irmão em vida (Jo 7, 5). Suas conversões instantâneas decorreram de encontros com o Ressuscitado."
          }
        ]
      },

      /* ===============================================================
         10. O TRILEMA DE LEWIS-CHESTERTON E SÍNTESE FINAL (SEÇÃO 1.10)
         =============================================================== */
      {
        id: "q28",
        question: "Como se formula o célebre 'Trilema de Lewis-Chesterton' diante das afirmações contundentes de Jesus nos Evangelhos?",
        options: [
          {
            id: "q28-opt1",
            text: "Diante de Sua conduta pacífica, Jesus deve ser classificado como um líder revolucionário político, um reformador moral do judaísmo ou um filósofo estoico helenista.",
            isCorrect: false,
            explanation: "Incorreto. O trilema refuta justamente essa redução a 'mero bom mestre ético', demonstrando que Suas afirmações explícitas de divindade forçam uma escolha radical."
          },
          {
            id: "q28-opt2",
            text: "Dadas as Suas declarações radicais (declarar-se Deus, perdoar pecados e julgar a humanidade), Ele não permite a leitura de 'mero bom mestre': ou era Mentiroso, ou Lunático, ou o Senhor.",
            isCorrect: true,
            explanation: "Correto! C.S. Lewis e G.K. Chesterton apontam que um homem comum que afirmasse o que Jesus afirmou não seria um respeitável mestre moral: seria ou um farsante perverso, ou um demente grave. Descartadas ambas as hipóteses, Ele é necessariamente o Senhor."
          },
          {
            id: "q28-opt3",
            text: "Ou Jesus defendia a teocracia dos macabeus, ou Ele apoiava as leis civis de Augusto, ou Ele pretendia fundar uma escola de oratória platônica em Alexandria.",
            isCorrect: false,
            explanation: "Incorreto. Essas categorias políticas mundanas ignoram a substância das palavras explícitas e das reinvindicações de divindade de Cristo nos Evangelhos."
          },
          {
            id: "q28-opt4",
            text: "Ou os evangelistas escreveram narrativas puramente alegóricas sem base empírica, ou Jesus nunca esteve em Jerusalém, ou Sua ressurreição foi um mito astrológico.",
            isCorrect: false,
            explanation: "Incorreto. A historiografia crítica confirma a historicidade do ministério de Jesus na Judeia e a antiguidade dos relatos evangélicos."
          }
        ]
      },
      {
        id: "q29",
        question: "Por que a análise lógica e psicológica do comportamento de Jesus rejeita com firmeza que Ele tenha sido um 'Mentiroso' ou um 'Lunático'?",
        options: [
          {
            id: "q29-opt1",
            text: "Mentiroso cai porque golpistas buscam vantagens e não morrem na cruz em silêncio; Lunático cai porque o delírio grave fragmenta a fala e a lógica, ao passo que Jesus exibiu coerência e fundou a ética mais sólida do Ocidente.",
            isCorrect: true,
            explanation: "Correto! Farsantes mentem por dinheiro, glória ou poder, recuando diante da tortura; Jesus rejeitou coroas e aceitou a cruz sem renunciar à Verdade. E a insanidade mental grave produz colapso do ego e desordem retórica, enquanto Jesus desmontou as ciladas dos mais afiados juristas de Sua época com lucidez genial."
          },
          {
            id: "q29-opt2",
            text: "Mentiroso cai porque na província da Judeia o crime de falsidade religiosa não era punido pelo Sinédrio; Lunático cai porque a medicina romana curava patologias cerebrais com ervas.",
            isCorrect: false,
            explanation: "Incorreto. O Sinédrio punia a blasfêmia religiosa com pena capital de apedrejamento, e a medicina da época não possuía farmacologia para esquizofrenia ou delírios graves."
          },
          {
            id: "q29-opt3",
            text: "Mentiroso cai porque Jesus era protegido por guardas pretorianos romanos; Lunático cai porque todos os escribas fariseus concordavam publicamente com Suas pregações.",
            isCorrect: false,
            explanation: "Incorreto. Jesus não contava com guarda pretoriana e os escribas e fariseus eram Seus opositores ferrenhos, armando ciladas verbais contínuas contra Ele."
          },
          {
            id: "q29-opt4",
            text: "Mentiroso cai porque fraudes conscientes geram enriquecimento imediato na Judeia; Lunático cai porque os apóstolos substituíam Jesus durante os debates públicos difíceis.",
            isCorrect: false,
            explanation: "Incorreto. Jesus enfrentava pessoalmente os sábios, doutores e juristas do Templo com magistério próprio soberano e inigualável."
          }
        ]
      },
      {
        id: "q30",
        question: "Qual é a síntese final do Encontro 1 sobre a relação entre Fé e Razão (Fides et Ratio) defendida na formação?",
        options: [
          {
            id: "q30-opt1",
            text: "A razão humana deve ser aniquilada pelo crente, visto que o esforço intelectual e a investigação filosófica constituem pecado de soberba e impedem o florescimento da graça.",
            isCorrect: false,
            explanation: "Incorreto. Essa é a postura derrotista do fideísmo cego, condenada pela Igreja no Concílio Vaticano I e combatida energicamente pelo projeto Fides et Ratio."
          },
          {
            id: "q30-opt2",
            text: "A fé e a razão pertencem a duas verdades opostas que nunca devem dialogar, devendo o cristão viver como racionalista no ambiente de trabalho e fideísta dentro da igreja.",
            isCorrect: false,
            explanation: "Incorreto. A teoria da 'dupla verdade' é um erro herético combatido por São Tomás de Aquino: a Verdade é una, pois Deus é o mesmo e único Autor tanto da inteligência quanto da revelação."
          },
          {
            id: "q30-opt3",
            text: "Fé e Razão são duas asas complementares: a razão fundamenta a credibilidade dos preâmbulos e afasta o ceticismo; a fé purifica e eleva a inteligência para acolher os mistérios divinos de Cristo.",
            isCorrect: true,
            explanation: "Correto! Como consagrado por São João Paulo II na encíclica Fides et Ratio, fé e razão harmonizam-se sem confusão nem oposição. A razão demonstra que crer é sumamente razoável, e a fé sobrenatural cura, ilumina e coroa a inteligência humana na contemplação do Deus vivo."
          },
          {
            id: "q30-opt4",
            text: "A razão natural é autossuficiente para conhecer todos os mistérios da Trindade e da Encarnação, tornando a revelação divina e a graça sacramental prescindíveis para a salvação.",
            isCorrect: false,
            explanation: "Incorreto. Essa é a pretensão errônea do racionalismo estrito. Mistérios como a Santíssima Trindade e a Encarnação superam a razão natural e só são conhecidos pela divina Revelação acolhida na Fé."
          }
        ]
      }
    ]
  }
];
