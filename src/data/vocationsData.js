/**
 * Catálogo Oficial das 7 Vocações da Igreja Católica e seus Expoentes Históricos
 * Projeto: Fides et Ratio (Fé e Razão)
 * Fonte de referência: docs/vocacoes-e-expoentes.md
 */

export const VOCATIONS_DATA = [
  {
    id: 'intelectual',
    name: 'Vocação Intelectual',
    subtitle: 'Teológica, Filosófica e Científica',
    shortName: 'Intelectual',
    axiom: 'Fides quaerens intellectum — A fé que busca compreender.',
    patronQuote: 'A graça não destrói a natureza, mas a aperfeiçoa; e a razão humana serve à fé.',
    patronName: 'Santo Anselmo & Santo Tomás de Aquino',
    iconName: 'BookOpen',
    themeColor: 'from-[#c5a059] to-[#9b7834]',
    badgeBg: 'bg-[#2a2215] border-[#5e4726] text-[#e6cb8e]',
    accentColor: '#c5a059',
    description: 
      'A vocação intelectual na Igreja fundamenta-se na certeza de que a razão não é inimiga da fé, mas dom divino chamado a investigar a estrutura do cosmos e as profundezas da Revelação. O intelectual católico serve purificando a fé de superstições, sistematizando o dogma e dialogando com a ciência e a filosofia de sua época.',
    levels: [
      { level: 1, title: 'Ouvinte dos Preâmbulos', desc: 'Iniciação nas verdades fundamentais da razão natural.' },
      { level: 2, title: 'Discípulo Escolástico', desc: 'Domínio dos primeiros princípios e da lógica aristotélico-tomista.' },
      { level: 3, title: 'Bacharel das Súmulas', desc: 'Compreensão articulada das sentenças e das questões disputadas.' },
      { level: 4, title: 'Leitor Sentenciário', desc: 'Capacidade de interpretar e comentar as fontes teológicas primárias.' },
      { level: 5, title: 'Magister Teológico', desc: 'Formação sólida em metafísica, dogmática e revelação divina.' },
      { level: 6, title: 'Mestre Disputante', desc: 'Habilidade dialética para confrontar e harmonizar teses complexas.' },
      { level: 7, title: 'Doutor da Igreja', desc: 'Ápice da maturidade doutrinária e sabedoria especulativa cristã.' }
    ],
    exponents: [
      {
        id: 'santo-agostinho-intelectual',
        name: 'Santo Agostinho de Hipona',
        dates: '354–430',
        facet: 'Facetas Teológica e Filosófica',
        summary: 'O maior intelecto da Patrística Latina; uniu o neoplatonismo cristão à metafísica do tempo, da memória e da Trindade.',
        imageUrl: '/assets/expoentes/santo-agostinho-intelectual.jpg',
        bio: 'O maior intelecto da Patrística Latina. Passando pelo maniqueísmo e pelo neoplatonismo antes da conversão, estabeleceu as bases de toda a filosofia e teologia ocidentais. Em Sobre a Trindade (De Trinitate), formulou as analogias psicológicas da mente humana (memória, inteligência e vontade) para perscrutar o mistério trinitário, além de inaugurar a filosofia da história e a reflexão metafísica sobre o tempo e a eternidade.'
      },
      {
        id: 'sao-basilio-intelectual',
        name: 'São Basílio Magno',
        dates: '329–379',
        facet: 'Faceta Teológica e Cosmológica',
        summary: 'Líder dos Padres Capadócios; estabeleceu a distinção trinitária entre ousia e hypostasis e autor do Hexaemeron.',
        imageUrl: '/assets/expoentes/sao-basilio-intelectual.jpg',
        bio: 'Líder dos Padres Capadócios, formado nas melhores escolas de retórica e filosofia de Atenas. Foi o grande arquiteto da distinção filosófico-teológica entre ousia (natureza) e hypostasis (pessoa), fórmula que permitiu à Igreja resolver as crises trinitárias do século IV e definir a divindade do Espírito Santo. Escreveu também o Hexaemeron, monumental comentário cosmológico sobre a criação.'
      },
      {
        id: 'santa-hildegarda-intelectual',
        name: 'Santa Hildegarda de Bingen',
        dates: '1098–1179',
        facet: 'Faceta Científica e Cosmológica',
        summary: 'Doutora da Igreja e abadessa beneditina; enciclopedista pioneira em medicina natural, botânica e antropologia.',
        imageUrl: '/assets/expoentes/santa-hildegarda-intelectual.jpg',
        bio: 'Antes mesmo das universidades medievais, esta abadessa beneditina e Doutora da Igreja produziu tratados enciclopédicos de ciências naturais e medicina: Physica e Causae et Curae. Neles catalogou centenas de plantas e minerais, descreveu propriedades farmacológicas e articulou uma profunda antropologia que via corpo e alma em harmonia ecológica com o cosmos (viriditas).'
      },
      {
        id: 'santo-alberto-magno',
        name: 'Santo Alberto Magno',
        dates: 'c. 1200–1280',
        facet: 'Faceta Científica e Aristotélica',
        summary: 'Doctor Universalis e mestre de Tomás de Aquino; pioneiro do método empírico observacional na botânica e zoologia.',
        imageUrl: '/assets/expoentes/santo-alberto-magno.jpg',
        bio: 'Mestre de Tomás de Aquino e chamado de Doctor Universalis. Além de teólogo e comentador de toda a obra de Aristóteles, foi um cientista empírico pioneiro na botânica, zoologia, mineralogia e astronomia, defendendo que a investigação da natureza pelo método observacional é um caminho autônomo e legítimo para conhecer o Criador.'
      },
      {
        id: 'santo-tomas-intelectual',
        name: 'Santo Tomás de Aquino',
        dates: '1225–1274',
        facet: 'Faceta Filosófica e Sistemática',
        summary: 'Doutor Angélico; cume da arquitetura escolástica, harmonizou a razão clássica aristotélica e a Revelação cristã.',
        imageUrl: '/assets/expoentes/santo-tomas-intelectual.jpg',
        bio: 'Frade dominicano e "Doutor Angélico". Em um período em que a redescoberta das obras de Aristóteles ameaçava desestabilizar a cristandade, Tomás realizou uma síntese monumental entre razão e fé. Sua Suma Teológica e suas Questões Disputadas permanecem como o ápice da arquitetura escolástica e da metafísica do ser (actus essendi).'
      },
      {
        id: 'sao-boaventura-intelectual',
        name: 'São Boaventura de Bagnoregio',
        dates: '1221–1274',
        facet: 'Faceta Escolástica e Exemplarismo',
        summary: 'Doutor Seráfico; amigo de Santo Tomás, estruturou a escola franciscana e a filosofia do exemplarismo.',
        imageUrl: '/assets/expoentes/sao-boaventura-intelectual.jpg',
        bio: 'Contemporâneo e amigo de Tomás de Aquino na Universidade de Paris, o "Doutor Seráfico" estruturou a teologia franciscana. Em obras como o Brevilóquio e o Comentário às Sentenças, desenvolveu a filosofia do exemplarismo (todas as criaturas como vestígios e imagens do Verbo) e a teoria da iluminação intelectual.'
      },
      {
        id: 'beato-ramon-llull-intelectual',
        name: 'Beato Ramon Llull',
        dates: '1232–1316',
        facet: 'Faceta Filosófica e Lógica',
        summary: 'Polímata catalão; criador da Ars Magna, precursor da ciência da computação e da lógica combinatória.',
        imageUrl: '/assets/expoentes/beato-ramon-llull-intelectual.jpg',
        bio: 'Polímata maiorquino autor de mais de 260 obras em catalão, árabe e latim, precursor da lógica formal e da ciência da computação. Concebeu a Ars Magna, sistema mecânico e lógico-combinatório de conceitos universais que buscava unificar todos os ramos do saber sob os princípios primeiros da metafísica.'
      },
      {
        id: 'beato-duns-escoto',
        name: 'Beato João Duns Escoto',
        dates: 'c. 1266–1308',
        facet: 'Faceta Metafísica e Dogmática',
        summary: 'Doctor Subtilis; mestre do rigor analítico, formulou a fundamentação teológica da Imaculada Conceição.',
        imageUrl: '/assets/expoentes/beato-duns-escoto.jpg',
        bio: 'Franciscano escocês conhecido como o "Doutor Sutil" pela extrema precisão lógica de seus argumentos. Desenvolveu conceitos metafísicos originais (haecceitas e a univocidade do ser) e forneceu a solução teológica definitiva para o dogma da Imaculada Conceição (a redenção preservativa).'
      },
      {
        id: 'sao-joao-damasceno-intelectual',
        name: 'São João Damasceno',
        dates: 'c. 676–749',
        facet: 'Faceta Sistemática Oriental',
        summary: 'O Tomás de Aquino do Oriente; autor da primeira grande suma teológica sistemática do cristianismo.',
        imageUrl: '/assets/expoentes/sao-joao-damasceno-intelectual.jpg',
        bio: 'Considerado o "São Tomás de Aquino do Oriente", este monge sírio e Doutor da Igreja escreveu a Fonte do Conhecimento (Pege Gnoseos), cuja terceira parte, A Exposição Exata da Fé Ortodoxa, foi a primeira grande suma teológica sistemática cristã, servindo de base direta para a escolástica latina.'
      },
      {
        id: 'francisco-suarez',
        name: 'Francisco Suárez',
        dates: '1548–1617',
        facet: 'Faceta Metafísica e Jurídica',
        summary: 'Líder da Segunda Escolástica de Salamanca; suas Disputações Metafísicas fundaram as bases do direito internacional.',
        imageUrl: '/assets/expoentes/francisco-suarez.jpg',
        bio: 'Padre jesuíta espanhol e principal expoente da Escola de Salamanca. Suas Disputações Metafísicas influenciaram Descartes e Leibniz, e seus tratados jurídicos sobre o ius gentium lançaram as bases do direito internacional moderno e da teoria da soberania popular.'
      },
      {
        id: 'blaise-pascal-intelectual',
        name: 'Blaise Pascal',
        dates: '1623–1662',
        facet: 'Faceta Científica e Epistemológica',
        summary: 'Gênio matemático e físico; inventor da Pascalina, pioneiro das probabilidades e da física dos fluidos.',
        imageUrl: '/assets/expoentes/blaise-pascal-intelectual.jpg',
        bio: 'Prodígio francês que inventou a calculadora mecânica aos 19 anos, lançou as bases do cálculo de probabilidades, formulou o Princípio de Pascal na hidrostática e comprovou o vácuo atmosférico, refletindo profundamente sobre os limites do método geométrico diante das verdades do coração.'
      },
      {
        id: 'john-henry-newman-intelectual',
        name: 'São John Henry Newman',
        dates: '1801–1890',
        facet: 'Faceta Epistemológica e Teológica',
        summary: 'Cardeal e Doutor da Igreja; autor de Gramática do Assentimento e da doutrina do desenvolvimento do dogma.',
        imageUrl: '/assets/expoentes/john-henry-newman-intelectual.jpg',
        bio: 'Teólogo britânico canonizado. Em Gramática do Assentimento, investigou a epistemologia da crença (o "sentido ilativo" para alcançar a certeza concreta), revolucionou a compreensão histórica do desenvolvimento do dogma e defendeu o modelo da universidade em A Ideia de uma Universidade.'
      },
      {
        id: 'edith-stein-intelectual',
        name: 'Santa Teresa Benedita da Cruz (Edith Stein)',
        dates: '1891–1942',
        facet: 'Faceta Fenomenológica e Ontológica',
        summary: 'Assistente de Husserl e carmelita mártir; uniu a fenomenologia moderna à metafísica de Santo Tomás.',
        imageUrl: '/assets/expoentes/edith-stein-intelectual.jpg',
        bio: 'Filósofa judia alemã, aluna e assistente de Edmund Husserl. Sua tese Sobre o Problema da Empatia é clássico da fenomenologia. Convertida, escreveu Ser Finito e Ser Eterno, diálogo monumental entre a fenomenologia e a ontologia tomista, sendo pioneira na antropologia sobre a dignidade da mulher.'
      }
    ]
  },
  {
    id: 'mistica',
    name: 'Vocação Mística e Contemplativa',
    subtitle: 'Ascese, Silêncio e União Espiritual',
    shortName: 'Mística',
    axiom: 'Solo Dios basta — Quem a Deus tem, nada lhe falta.',
    patronQuote: 'Na tarde desta vida seremos julgados pelo amor.',
    patronName: 'Santa Teresa de Ávila & São João da Cruz',
    iconName: 'Flame',
    themeColor: 'from-[#7c1a2d] to-[#450e18]',
    badgeBg: 'bg-[#291319] border-[#6b1e2c] text-[#f2aab6]',
    accentColor: '#b82944',
    description: 
      'A vocação mística responde ao chamado de habitar no coração do mistério divino. Mais do que produzir conceitos sobre Deus, o místico busca a união transformante da vontade humana com a vontade divina por meio da ascese, do silêncio orante e da oração infusa. A mística autêntica é fornalha de caridade que sustenta invisivelmente a Igreja.',
    levels: [
      { level: 1, title: 'Peregrino do Átrio', desc: 'Despertar da alma para a oração e combate às distrações sensíveis.' },
      { level: 2, title: 'Buscador do Recolhimento', desc: 'Entrada na cela interior e prática da meditação afetiva.' },
      { level: 3, title: 'Habitante das Quintas Moradas', desc: 'Experiência da oração de quietude e repouso no beneplácito divino.' },
      { level: 4, title: 'Contemplador da Noite Escura', desc: 'Purificação passiva dos sentidos e do espírito na aridez fecunda.' },
      { level: 5, title: 'Chama Viva de Amor', desc: 'Abrasamento do afeto na ferida de amor e desapego total do ego.' },
      { level: 6, title: 'Matrimônio Espiritual', desc: 'Desposório místico da alma com o Verbo divino no fundo do ser.' },
      { level: 7, title: 'Doutor Místico', desc: 'Plena união transformante e participação das luzes eternas da Trindade.' }
    ],
    exponents: [
      {
        id: 'santa-teresa-avila',
        name: 'Santa Teresa de Jesus (de Ávila)',
        dates: '1515–1582',
        facet: 'Mestra da Oração e das Sete Moradas',
        summary: 'Reformadora do Carmelo e primeira mulher Doutora da Igreja; mapeou os graus da oração em O Castelo Interior.',
        imageUrl: '/assets/expoentes/santa-teresa-avila.jpg',
        bio: 'Reformadora do Carmelo e primeira mulher Doutora da Igreja. Em O Castelo Interior (As Moradas), mapeou com precisão inigualável os sete graus da oração interior (da meditação discursiva ao matrimônio espiritual com a Santíssima Trindade).'
      },
      {
        id: 'sao-joao-da-cruz',
        name: 'São João da Cruz',
        dates: '1542–1591',
        facet: 'O Doutor Místico',
        summary: 'Doutor Místico por excelência; sistematizou as noites escuras dos sentidos e do espírito rumo à Chama Viva.',
        imageUrl: '/assets/expoentes/sao-joao-da-cruz.jpg',
        bio: 'Frade carmelita e "Doutor Místico" por excelência. Em Subida do Monte Carmelo, Noite Escura e Chama Viva de Amor, sistematizou as purificações ativas e passivas pelas quais Deus despoja a alma de todo apego criado para transformá-la em Si por amor.'
      },
      {
        id: 'santa-teresinha',
        name: 'Santa Teresinha do Menino Jesus',
        dates: '1873–1897',
        facet: 'A Pequena Via da Infância Espiritual',
        summary: 'Doutora da Igreja; revolucionou a mística cristã com a via da confiança cega e solidariedade na noite da fé.',
        imageUrl: '/assets/expoentes/santa-teresinha.jpg',
        bio: 'Monja carmelita enclausurada em Lisieux e Doutora da Igreja. Revolucionou a espiritualidade mística com a "Pequena Via": a descoberta de que a união com Deus não exige feitos extraordinários, mas o abandono filial no Amor Misericordioso.'
      },
      {
        id: 'santo-agostinho-mistica',
        name: 'Santo Agostinho de Hipona',
        dates: '354–430',
        facet: 'O Êxtase de Óstia',
        summary: 'Autor das Confissões; colóquio ininterrupto com a Beleza Suprema e o célebre arrebatamento místico com Santa Mônica.',
        imageUrl: '/assets/expoentes/santo-agostinho-mistica.jpg',
        bio: 'Frequentemente lembrado apenas como teólogo, viveu altíssima contemplação mística. Suas Confissões culminam no célebre "Êxtase de Óstia", quando tocou por um instante a Sabedoria incriada ao lado de sua mãe, Santa Mônica, dias antes de sua morte.'
      },
      {
        id: 'sao-gregorio-magno-mistica',
        name: 'São Gregório Magno',
        dates: 'c. 540–604',
        facet: 'O Doutor Contemplativo',
        summary: 'Papa beneditino que ensinou como a alma passa da purificação pelo sofrimento à fresta da luz divina.',
        imageUrl: '/assets/expoentes/sao-gregorio-magno-mistica.jpg',
        bio: 'Monge beneditino que se tornou Papa com nostalgia perpétua do silêncio do claustro. Seus Morais sobre Jó e Homilias sobre Ezequiel foram a principal fonte da teologia mística ocidental medieval, ensinando a contemplação na "fresta" da oração.'
      },
      {
        id: 'sao-gregorio-narek-mistica',
        name: 'São Gregório de Narek',
        dates: 'c. 951–1003',
        facet: 'O Clamor do Coração Armênio',
        summary: 'Doutor da Igreja armênio; autor do Livro de Lamentações, colóquio inflamado do abismo humano no abismo divino.',
        imageUrl: '/assets/expoentes/sao-gregorio-narek-mistica.jpg',
        bio: 'Monge armênio e Doutor da Igreja. Seu Livro de Lamentações (Narek) é monumento da mística oriental: 95 colóquios nos quais a consciência do abismo do pecado humano se funde no abismo ainda maior da luz incriada e da misericórdia de Deus.'
      },
      {
        id: 'santa-catarina-sena',
        name: 'Santa Catarina de Sena',
        dates: '1347–1380',
        facet: 'A Cela Interior e o Diálogo Divino',
        summary: 'Doutora da Igreja; leiga dominicana dos estigmas invisíveis que ditou em êxtase O Diálogo da Divina Providência.',
        imageUrl: '/assets/expoentes/santa-catarina-sena.jpg',
        bio: 'Leiga dominicana e Doutora da Igreja. Construiu uma "cela interior" na mente, viveu o casamento místico com Cristo, recebeu os estigmas invisíveis, alimentou-se por anos apenas da Eucaristia e ditou em êxtase O Diálogo da Divina Providência.'
      },
      {
        id: 'sao-carlos-foucauld',
        name: 'São Carlos de Foucauld',
        dates: '1858–1916',
        facet: 'A Vida Oculta e Adoração no Deserto',
        summary: 'Eremita do Saara; viveu prostrado diante da Eucaristia entre os tuaregues, legando a Oração do Abandono.',
        imageUrl: '/assets/expoentes/sao-carlos-foucauld.jpg',
        bio: 'Ex-oficial francês que buscou a "vida oculta de Jesus em Nazaré". Viveu no deserto do Saara como eremita pobre entre os tuaregues muçulmanos, passando horas diárias prostrado diante do Santíssimo e deixando a Oração do Abandono.'
      }
    ]
  },
  {
    id: 'apologetica',
    name: 'Vocação Apologética',
    subtitle: 'Defesa Racional da Fé e Combate a Sofismas',
    shortName: 'Apologética',
    axiom: 'Parati semper ad defensionem — Prontos a dar a razão da vossa esperança.',
    patronQuote: 'A Igreja não pede aos homens que calem a razão, mas que a usem até o fim.',
    patronName: 'São Pedro (1 Pd 3,15) & G. K. Chesterton',
    iconName: 'Shield',
    themeColor: 'from-[#1b3b6f] to-[#0f2140]',
    badgeBg: 'bg-[#152338] border-[#294a7a] text-[#a9cbfa]',
    accentColor: '#3273dc',
    description: 
      'A vocação apologética situa-se na fronteira entre a Igreja e o mundo. O apologeta traduz as verdades sagradas para a linguagem de quem não crê, refuta calúnias históricas e filosóficas, corrige distorções heréticas e remove os obstáculos intelectuais que impedem o assentimento da fé.',
    levels: [
      { level: 1, title: 'Catecúmeno em Defesa', desc: 'Identificação das principais objeções contra a fé católica.' },
      { level: 2, title: 'Sentinela da Ortodoxia', desc: 'Clareza dogmática sobre as resoluções conciliares fundamentais.' },
      { level: 3, title: 'Polemosta da Verdade', desc: 'Desmonte analítico das falácias do materialismo e relativismo.' },
      { level: 4, title: 'Escudo da Tradição', desc: 'Manejo das evidências históricas da Ressurreição e Patrística.' },
      { level: 5, title: 'Defensor Fidei', desc: 'Defesa pública com elegância, caridade e solidez intelectual.' },
      { level: 6, title: 'Mártir da Razão', desc: 'Testemunho inabalável da verdade perante a perseguição ideológica.' },
      { level: 7, title: 'Apologeta Iluminado', desc: 'Síntese magistral entre firmeza doutrinária e cortesia evangélica.' }
    ],
    exponents: [
      {
        id: 'sao-justino-martir',
        name: 'São Justino Mártir',
        dates: 'c. 100–165',
        facet: 'O Filósofo com Manto Cristão',
        summary: 'Pioneiro da apologia cristã; demonstrou aos imperadores que as "sementes do Verbo" culminam em Cristo.',
        imageUrl: '/assets/expoentes/sao-justino-martir.jpg',
        bio: 'Filósofo pagão que buscou a verdade entre estoicos e platônicos até encontrar Cristo. Vestindo o manto de filósofo em Roma, escreveu Apologias aos imperadores demonstrando que todas as "sementes do Verbo" (Logos spermatikos) culminavam no Evangelho.'
      },
      {
        id: 'santo-irineu-lyon',
        name: 'Santo Irineu de Lyon',
        dates: 'c. 130–202',
        facet: 'Martelo do Gnosticismo',
        summary: 'Discípulo de Policarpo; em Contra as Heresias fundamentou a regra da fé e a sucessão apostólica.',
        imageUrl: '/assets/expoentes/santo-irineu-lyon.jpg',
        bio: 'Discípulo de São Policarpo (que fora discípulo do Apóstolo João). Em Contra as Heresias (Adversus Haereses), desmontou minuciosamente os sistemas gnósticos, estabelecendo os critérios da sucessão apostólica, da regra da fé e do cânon bíblico.'
      },
      {
        id: 'sao-roberto-belarmino',
        name: 'São Roberto Belarmino',
        dates: '1542–1621',
        facet: 'O Erudito das Controvérsias',
        summary: 'Cardeal jesuíta e Doutor da Igreja; sistematizou a mais vasta defesa da eclesiologia e dos sacramentos.',
        imageUrl: '/assets/expoentes/sao-roberto-belarmino.jpg',
        bio: 'Cardeal jesuíta e Doutor da Igreja. Escreveu As Controvérsias, a mais erudita defesa da eclesiologia, do papado e da tradição católica na era pós-reforma, notável pela honestidade com que expunha os argumentos adversários antes de refutá-los.'
      },
      {
        id: 'sao-francisco-sales-apologetica',
        name: 'São Francisco de Sales',
        dates: '1567–1622',
        facet: 'Apologética da Doçura',
        summary: 'Padroeiro dos Jornalistas; converteu dezenas de milhares deslizando folhetos manuscritos sob as portas.',
        imageUrl: '/assets/expoentes/sao-francisco-sales-apologetica.jpg',
        bio: 'Enviado para a região calvinista do Chablais, redigiu folhetos concisos que deslizava por baixo das portas das casas à noite. Seu estilo unia lógica irrefutável e cortesia ("pega-se mais moscas com uma colher de mel do que com um barril de vinagre").'
      },
      {
        id: 'gk-chesterton',
        name: 'G. K. Chesterton',
        dates: '1874–1936',
        facet: 'O Príncipe do Paradoxo',
        summary: 'Proclamado Defensor Fidei; demoliu o pessimismo materialista com humor, Ortodoxia e bom senso cristão.',
        imageUrl: '/assets/expoentes/gk-chesterton.jpg',
        bio: 'Jornalista inglês proclamado Defensor Fidei pelo Papa Pio XI. Em Ortodoxia e O Homem Eterno, apresentou a fé como aventura intelectual vibrante, cheia de assombro e common sense, decisivo para a conversão de C. S. Lewis e Ronald Knox.'
      },
      {
        id: 'fulton-sheen',
        name: 'Venerável Fulton J. Sheen',
        dates: '1895–1979',
        facet: 'O Apologeta das Comunicações de Massa',
        summary: 'Arcebispo filósofo; atraiu 30 milhões de espectadores semanais rebatendo o comunismo e o relativismo moral.',
        imageUrl: '/assets/expoentes/fulton-sheen.jpg',
        bio: 'Arcebispo doutor em filosofia pela Univ. de Lovaina e pioneiro da apologética nos meios de massa. Seu programa Life Is Worth Living atraía 30 milhões de espectadores semanais, rebatendo o comunismo e o cientificismo e conduzindo milhares à fé.'
      }
    ]
  },
  {
    id: 'caritativa',
    name: 'Vocação Caritativa e Social',
    subtitle: 'Misericórdia Operante e Defesa dos Desamparados',
    shortName: 'Caritativa',
    axiom: 'Inasmuch as ye have done it unto one of the least of these — A mim o fizestes.',
    patronQuote: 'A caridade é o único argumento que os céticos não conseguem refutar.',
    patronName: 'São Vicente de Paulo & Santa Teresa de Calcutá',
    iconName: 'HeartHandshake',
    themeColor: 'from-[#1e5e3a] to-[#0e331f]',
    badgeBg: 'bg-[#14291c] border-[#2c5c3e] text-[#a1e8bc]',
    accentColor: '#25854f',
    description: 
      'Fundamentada nas palavras de Cristo no Juízo Final (Mt 25), esta vocação traduz a fé em obras corporais e espirituais de misericórdia. Os santos da caridade foram os grandes pioneiros dos hospitais modernos, orfanatos, ambulâncias, resgate de escravizados e da defesa incondicional dos vulneráveis.',
    levels: [
      { level: 1, title: 'Servidor dos Pobres', desc: 'Desprendimento material e socorro aos pequenos necessitados.' },
      { level: 2, title: 'Irmão Hospitaleiro', desc: 'Cuidado afetuoso com doentes, enlutados e enfermos.' },
      { level: 3, title: 'Bálsamo dos Aflitos', desc: 'Consolação espiritual e presença concreta nas feridas sociais.' },
      { level: 4, title: 'Arauto da Misericórdia', desc: 'Organização comunitária de obras duradouras de socorro.' },
      { level: 5, title: 'Coluna da Basiliade', desc: 'Construção de refúgios e defesa dos marginalizados.' },
      { level: 6, title: 'Servo dos Servos de Deus', desc: 'Heroísmo no serviço aos sofredores mesmo com risco de vida.' },
      { level: 7, title: 'Pai dos Desamparados', desc: 'Consumação da caridade perfeita que espelha o Coração de Jesus.' }
    ],
    exponents: [
      {
        id: 'sao-basilio-caritativa',
        name: 'São Basílio Magno',
        dates: '329–379',
        facet: 'Fundador da Basiliade',
        summary: 'Criou a primeira "cidade da caridade" da história com hospital, leprosário e albergue em Cesareia.',
        imageUrl: '/assets/expoentes/sao-basilio-caritativa.jpg',
        bio: 'Vendeu sua herança na fome de 368 para alimentar a população e fundou a Basiliade: a primeira cidade da caridade contendo hospital geral, leprosário e escolas de ofícios, onde o próprio bispo cuidava pessoalmente dos leprosos.'
      },
      {
        id: 'sao-vicente-paulo',
        name: 'São Vicente de Paulo',
        dates: '1581–1660',
        facet: 'O Apóstolo da Caridade',
        summary: 'Revolucionou a assistência social; fundou as Filhas da Caridade que tinham "as ruas por claustro".',
        imageUrl: '/assets/expoentes/sao-vicente-paulo.jpg',
        bio: 'Fundou as Confrarias da Caridade e as Filhas da Caridade (ao lado de Santa Luísa de Marillac), a primeira congregação feminina não enclausurada cujas irmãs tinham "as ruas da cidade por claustro", socorrendo órfãos e condenados às galés.'
      },
      {
        id: 'sao-camilo-lellis',
        name: 'São Camilo de Léllis',
        dates: '1550–1614',
        facet: 'Pioneiro das Ambulâncias e da Cruz Vermelha',
        summary: 'Instituiu o quarto voto de assistir os enfermos infectados e criou o socorro médico nos campos de batalha.',
        imageUrl: '/assets/expoentes/sao-camilo-lellis.jpg',
        bio: 'Ex-soldado que fundou os Camilianos, criou o primeiro serviço organizado de ambulâncias nos campos de batalha (com cruz vermelha na batina séculos antes da Cruz Vermelha) e instituiu o voto de servir os doentes mesmo com risco da própria vida.'
      },
      {
        id: 'sao-pedro-claver',
        name: 'São Pedro Claver',
        dates: '1580–1654',
        facet: 'Escravo dos Escravos para Sempre',
        summary: 'Viveu 40 anos nos porões fétidos dos navios negreiros em Cartagena curando e defendendo escravizados.',
        imageUrl: '/assets/expoentes/sao-pedro-claver.jpg',
        bio: 'Jesuíta que fez o voto perpétuo de ser "escravo dos negros para sempre". Viveu 40 anos no porto escravista de Cartagena das Índias, descendo aos porões fétidos dos navios para lavar chagas infeccionadas e defender a dignidade dos africanos.'
      },
      {
        id: 'santa-dulce-pobres',
        name: 'Santa Dulce dos Pobres',
        dates: '1914–1992',
        facet: 'O Anjo Bom da Bahia',
        summary: 'Transformou um galinheiro em um dos maiores complexos hospitalares 100% gratuitos do Brasil.',
        imageUrl: '/assets/expoentes/santa-dulce-pobres.jpg',
        bio: 'Religiosa baiana que personificou a caridade operante: abrigou doentes em um galinheiro abandonado que se tornou as Obras Sociais Irmã Dulce, um dos maiores complexos de saúde filantrópicos e gratuitos do Brasil.'
      },
      {
        id: 'madre-teresa-calcuta',
        name: 'Santa Teresa de Calcutá',
        dates: '1910–1997',
        facet: 'O Lápis nas Mãos de Deus',
        summary: 'Fundadora das Missionárias da Caridade; recolheu moribundos nas sarjetas para que partissem em paz.',
        imageUrl: '/assets/expoentes/madre-teresa-calcuta.jpg',
        bio: 'Recolheu milhares de moribundos, leprosos e crianças abandonadas das calçadas da Índia para que pudessem viver e morrer com a dignidade de filhos amados de Deus, fundando as Missionárias da Caridade pelo mundo inteiro.'
      }
    ]
  },
  {
    id: 'missionaria',
    name: 'Vocação Querigmática e Missionária',
    subtitle: 'Primeiro Anúncio e Evangelização ad Gentes',
    shortName: 'Missionária',
    axiom: 'Euntes in mundum universum — Ide por todo o mundo e pregai.',
    patronQuote: 'Ai de mim se eu não evangelizar!',
    patronName: 'São Paulo Apóstolo & São Francisco Xavier',
    iconName: 'Compass',
    themeColor: 'from-[#8a4b16] to-[#472407]',
    badgeBg: 'bg-[#291b10] border-[#5e3818] text-[#e8b98b]',
    accentColor: '#c46b21',
    description: 
      'O carisma missionário brota do mandato apostólico de Cristo (Mc 16,15). Esta vocação exige despojamento pessoal e cultural: o missionário parte para onde o Senhor não é conhecido, aprende línguas nativas e realiza a inculturação da fé, elevando tudo o que há de bom e belo nos povos.',
    levels: [
      { level: 1, title: 'Peregrino do Evangelho', desc: 'Disposição para sair da zona de conforto e proclamar a Cristo.' },
      { level: 2, title: 'Semeador do Kerygma', desc: 'Transmissão límpida do núcleo da salvação: Paixão e Ressurreição.' },
      { level: 3, title: 'Voz no Areópago', desc: 'Capacidade de diálogo e inculturação com mundos não evangelizados.' },
      { level: 4, title: 'Desbravador dos Gentios', desc: 'Superação de barreiras culturais e linguísticas pela fé.' },
      { level: 5, title: 'Arauto das Nações', desc: 'Fundação de novas comunidades de fé e santificação dos povos.' },
      { level: 6, title: 'Apóstolo dos Povos', desc: 'Desgaste heróico e viagens incansáveis pelo Reino de Deus.' },
      { level: 7, title: 'Patrono das Missões', desc: 'Testemunho consumado de entrega irrestrita à redenção dos gentios.' }
    ],
    exponents: [
      {
        id: 'sao-paulo-apostolo',
        name: 'São Paulo Apóstolo',
        dates: 'c. 5–67',
        facet: 'O Apóstolo dos Gentios',
        summary: 'Paradigma da missão cristã; percorreu milhares de quilômetros fundando comunidades do Oriente a Roma.',
        imageUrl: '/assets/expoentes/sao-paulo-apostolo.jpg',
        bio: 'O paradigma de toda vocação missionária. Cidadão romano de formação rabínica, percorreu milhares de quilômetros pela Ásia Menor, Grécia e Roma. Seu discurso no Areópago de Atenas estabeleceu o modelo clássico de anúncio querigmático e diálogo com culturas pagãs.'
      },
      {
        id: 'sao-francisco-xavier',
        name: 'São Francisco Xavier',
        dates: '1506–1552',
        facet: 'Gigante do Oriente',
        summary: 'Cofundador jesuíta; evangelizou a Índia, Malásia, Molucas e foi o primeiro missionário a entrar no Japão.',
        imageUrl: '/assets/expoentes/sao-francisco-xavier.jpg',
        bio: 'Cofundador da Companhia de Jesus. Em 11 anos de missão no Oriente, percorreu a Índia, Malásia, Molucas e foi o primeiro missionário a pisar no Japão, morrendo de febre na ilha de Sanchoão, às portas da China.'
      },
      {
        id: 'matteo-ricci',
        name: 'Venerável Matteo Ricci',
        dates: '1552–1610',
        facet: 'O Mandarim de Deus',
        summary: 'Mestre da inculturação; adotou os trajes confucianos e dialogou com a dinastia Ming pelo saber astronômico.',
        imageUrl: '/assets/expoentes/matteo-ricci.jpg',
        bio: 'Jesuíta que protagonizou epopeia de inculturação: adotou o traje dos mandarins confucianos, dominou o chinês clássico, introduziu a cartografia europeia na corte imperial e escreveu em chinês O Verdadeiro Sentido do Senhor do Céu.'
      },
      {
        id: 'jose-anchieta',
        name: 'São José de Anchieta',
        dates: '1534–1597',
        facet: 'O Apóstolo do Brasil',
        summary: 'Escreveu a primeira gramática da língua tupi, catequizou indígenas e pacificou conflitos coloniais.',
        imageUrl: '/assets/expoentes/jose-anchieta.jpg',
        bio: 'O "Apóstolo do Brasil". Escreveu a primeira gramática da língua tupi, catequizou indígenas e colonos nas praias e selvas, compôs o célebre Poema à Virgem na areia de Ubatuba e articulou a histórica paz de Iperoig.'
      },
      {
        id: 'cirilo-metodio',
        name: 'Santos Cirilo e Metódio',
        dates: '815–885',
        facet: 'Apóstolos dos Eslavos',
        summary: 'Criadores do alfabeto glagolítico/cirílico; traduziram a Bíblia e a liturgia para a língua dos povos eslavos.',
        imageUrl: '/assets/expoentes/cirilo-metodio.jpg',
        bio: 'Irmãos gregos e "Apóstolos dos Eslavos". Criaram o alfabeto glagolítico (origem do cirílico) para traduzir a Bíblia e os textos litúrgicos para a língua eslava, defendendo perante Roma o direito dos povos rezarem no próprio idioma.'
      }
    ]
  },
  {
    id: 'pastoral',
    name: 'Vocação Pastoral, Educativa e Formadora',
    subtitle: 'Cura d’Almas, Catequese e Pedagogia do Coração',
    shortName: 'Pastoral',
    axiom: 'Bonus pastor animam suam dat pro ovibus — O bom pastor dá a vida pelas ovelhas.',
    patronQuote: 'A educação é coisa do coração, e só Deus tem a chave dele.',
    patronName: 'São Gregório Magno & São João Bosco',
    iconName: 'Users',
    themeColor: 'from-[#4a2e6b] to-[#251538]',
    badgeBg: 'bg-[#221630] border-[#4c2d6e] text-[#d6b7f7]',
    accentColor: '#7b48b5',
    description: 
      'A vocação pastoral dedica-se ao cultivo paciente da comunidade cristã. É o cura d’almas: o governo espiritual, o confessionário, o consolo na tribulação, a catequese dos simples e a educação integral da juventude pelo afeto, pela razão e pela religião.',
    levels: [
      { level: 1, title: 'Catequista dos Simples', desc: 'Capacidade de transmitir o Evangelho com clareza e paciência.' },
      { level: 2, title: 'Educador de Almas', desc: 'Direção moral e formação de hábitos de virtude nos estudantes.' },
      { level: 3, title: 'Pastor da Juventude', desc: 'Acolhimento amável dos jovens prevenindo desvios espirituais.' },
      { level: 4, title: 'Médico dos Penitentes', desc: 'Compreensão compassiva da fraqueza humana e reconciliação.' },
      { level: 5, title: 'Mestre do Sistema Preventivo', desc: 'Pedagogia integral fundada na Fé, Razão e Amabilidade.' },
      { level: 6, title: 'Bom Pastor das Comunidades', desc: 'Governo espiritual zeloso e união das ovelhas em torno do altar.' },
      { level: 7, title: 'Patrono dos Pastores', desc: 'Doação incansável e paternal pelo rebanho à imagem do Cristo Bom Pastor.' }
    ],
    exponents: [
      {
        id: 'sao-gregorio-pastoral',
        name: 'São Gregório Magno',
        dates: 'c. 540–604',
        facet: 'Autor da Regra Pastoral',
        summary: 'Escreveu o manual do pastor e médico das almas que moldou o episcopado por mais de mil anos.',
        imageUrl: '/assets/expoentes/sao-gregorio-pastoral.jpg',
        bio: 'Seu tratado Regra Pastoral foi o manual definitivo do sacerdócio por milênios. Na obra analisa 36 pares de caracteres humanos (ricos/pobres, alegres/tristes), ensinando como o pastor deve adaptar sua palavra e remédio a cada ovelha.'
      },
      {
        id: 'sao-joao-bosco',
        name: 'São João Bosco',
        dates: '1815–1888',
        facet: 'Pai e Mestre da Juventude',
        summary: 'Fundador salesiano; criou o Sistema Preventivo baseado no tripé Razão, Religião e Amabilidade.',
        imageUrl: '/assets/expoentes/sao-joao-bosco.jpg',
        bio: 'Recolheu órfãos e operários nas ruas de Turim. Criou o Sistema Preventivo, método pedagógico baseado exclusivamente em Razão, Religião e Amabilidade (Amorevolezza), rejeitando castigos corporais e formando cidadãos íntegros.'
      },
      {
        id: 'cura-dars',
        name: 'São João Maria Vianney (Cura d’Ars)',
        dates: '1786–1859',
        facet: 'Padroeiro Universal dos Párocos',
        summary: 'Atendia penitentes no confessionário por 18 horas diárias, convertendo toda a França a partir de Ars.',
        imageUrl: '/assets/expoentes/cura-dars.jpg',
        bio: 'Padroeiro dos Párocos. Tendo grande dificuldade inicial nos estudos de latim, transformou a descristianizada aldeia de Ars pelo confessionário, onde atendia peregrinos vindos de toda a Europa por até 18 horas diárias.'
      },
      {
        id: 'sao-carlos-borromeu-pastoral',
        name: 'São Carlos Borromeu',
        dates: '1538–1584',
        facet: 'O Pastor do Concílio de Trento',
        summary: 'Criou os seminários modernos, coordenou o Catecismo Romano e socorreu Milão durante a peste.',
        imageUrl: '/assets/expoentes/sao-carlos-borromeu-pastoral.jpg',
        bio: 'Arcebispo de Milão e executor de Trento. Fundou os primeiros seminários diocesanos modernos, coordenou o Catecismo Romano, criou escolas dominicais para 40 mil crianças pobres e socorreu famintos descalço na peste de 1576.'
      },
      {
        id: 'sao-filipe-neri',
        name: 'São Filipe Néri',
        dates: '1515–1595',
        facet: 'O Santo da Alegria',
        summary: 'O Apóstolo de Roma; renovou a vida católica pelo diálogo descontraído, amizade e o Oratório.',
        imageUrl: '/assets/expoentes/sao-filipe-neri.jpg',
        bio: 'O "Apóstolo de Roma". Começou reunindo jovens leigos em um quarto para ler vidas de santos, conversar com simplicidade e cantar. Fundou o Oratório, transformando a cidade pela amizade espiritual, confessionário e alegria santa.'
      },
      {
        id: 'sao-joao-batista-la-salle',
        name: 'São João Batista de La Salle',
        dates: '1651–1719',
        facet: 'Padroeiro dos Educadores',
        summary: 'Fundou os Irmãos das Escolas Cristãs e as primeiras escolas normais de formação de professores.',
        imageUrl: '/assets/expoentes/sao-joao-batista-la-salle.jpg',
        bio: 'Fundou os Irmãos das Escolas Cristãs, criou as primeiras escolas normais de professores, substituiu o ensino individual em latim pelo ensino simultâneo em salas no idioma materno e foi proclamado Padroeiro dos Educadores.'
      }
    ]
  },
  {
    id: 'artistica',
    name: 'Vocação Artística, Poética e Litúrgica',
    subtitle: 'Via Pulchritudinis, Beleza Sacra e Ícones do Mistério',
    shortName: 'Artística',
    axiom: 'Pulchritudo tam antiqua et tam nova — Ó Beleza tão antiga e tão nova!',
    patronQuote: 'A beleza é o esplendor da verdade.',
    patronName: 'Santo Efrém, Fra Angelico & Dante Alighieri',
    iconName: 'Palette',
    themeColor: 'from-[#805d15] to-[#422e05]',
    badgeBg: 'bg-[#291f0c] border-[#614917] text-[#edd598]',
    accentColor: '#d19f36',
    description: 
      'A matéria pode ser veículo da graça salvífica. A vocação artística e litúrgica serve à via pulchritudinis (o caminho da beleza): onde o argumento filosófico encontra resistência e a moralidade encontra fadiga, a música sacra, a pintura, a arquitetura e a poesia desarmam o coração humano e o elevam ao transcendente.',
    levels: [
      { level: 1, title: 'Cantor do Santuário', desc: 'Sensibilidade para o ritmo, a métrica sagrada e a ordem cósmica.' },
      { level: 2, title: 'Artesão da Pedra e da Luz', desc: 'Capacidade de talhar formas materiais como reflexo do invisível.' },
      { level: 3, title: 'Iconógrafo do Mistério', desc: 'Pintura contemplativa em oração traduzindo os dogmas da fé.' },
      { level: 4, title: 'Harpa do Espírito Santo', desc: 'Composição de hinos e poesia doutrinal que inflamam o povo.' },
      { level: 5, title: 'Mestre de Capela Celeste', desc: 'Harmonia polifônica pura que eleva os corações ao trono de Deus.' },
      { level: 6, title: 'Poeta da Divina Comédia', desc: 'Construção poética monumental abrangendo o cosmos e a Trindade.' },
      { level: 7, title: 'Artífice do Templo de Deus', desc: 'Criação de sinfonias de luz e pedra que antecipam a Jerusalém Celeste.' }
    ],
    exponents: [
      {
        id: 'fra-angelico',
        name: 'Beato Fra Angelico',
        dates: 'c. 1395–1455',
        facet: 'Padroeiro dos Artistas Católicos',
        summary: 'Frade dominicano que nunca pintou um crucifixo sem chorar; autor dos afrescos de São Marcos.',
        imageUrl: '/assets/expoentes/fra-angelico.jpg',
        bio: 'Frade dominicano florentino e Padroeiro dos Artistas. Nunca pintava um crucifixo sem derramar lágrimas e considerava cada pincelada oração; seus afrescos no Convento de São Marcos foram feitos especificamente para a contemplação.'
      },
      {
        id: 'andrei-rublev',
        name: 'Santo Andrei Rublev',
        dates: 'c. 1360–1430',
        facet: 'O Cume da Iconografia Oriental',
        summary: 'Monge pintor russo autor do célebre Ícone da Santíssima Trindade (a hospitalidade de Abraão).',
        imageUrl: '/assets/expoentes/andrei-rublev.jpg',
        bio: 'Monge e o maior iconógrafo da história russa. Pintou o célebre Ícone da Santíssima Trindade (a hospitalidade de Abraão), considerada a mais perfeita e sublime tradução visual do dogma trinitário já realizada pelo engenho humano.'
      },
      {
        id: 'dante-alighieri',
        name: 'Dante Alighieri',
        dates: '1265–1321',
        facet: 'O Poeta Supremo da Cristandade',
        summary: 'Autor da Divina Comédia; transformou a teologia tomista e a mística de Claraval em versos imortais.',
        imageUrl: '/assets/expoentes/dante-alighieri.jpg',
        bio: 'Leigo florentino franciscano. Sua Divina Comédia é uma "Suma Teológica em versos" onde a filosofia de Tomás de Aquino e a mística de São Bernardo tornam-se uma jornada épica em terza rima do Inferno ao Paraíso.'
      },
      {
        id: 'palestrina',
        name: 'Giovanni Pierluigi da Palestrina',
        dates: 'c. 1525–1594',
        facet: 'O Príncipe da Música Sacra',
        summary: 'Mestre da polifonia renascentista; uniu a mais alta beleza harmônica à perfeita clareza litúrgica.',
        imageUrl: '/assets/expoentes/palestrina.jpg',
        bio: 'Mestre de capela em Roma. Autor da Missa do Papa Marcelo, demonstrou no Concílio de Trento que a polifonia polifônica a várias vozes podia aliar beleza musical e absoluta reverência e clareza do texto sagrado.'
      },
      {
        id: 'antoni-gaudi',
        name: 'Servo de Deus Antoni Gaudí',
        dates: '1852–1926',
        facet: 'O Arquiteto de Deus',
        summary: 'Dedicou a vida ao Templo Expiatório da Sagrada Família, concebido como uma grande Bíblia de pedra.',
        imageUrl: '/assets/expoentes/antoni-gaudi.jpg',
        bio: 'Arquiteto catalão que viveu em extrema pobreza e oração eucarística, dedicando-se inteiramente à Sagrada Família em Barcelona — concebida como uma "Bíblia de pedra" onde cada fachada proclama a criação e a glória de Deus.'
      },
      {
        id: 'abade-suger',
        name: 'Abade Suger de Saint-Denis',
        dates: 'c. 1081–1151',
        facet: 'O Mentor da Arquitetura Gótica',
        summary: 'Reconstruiu a Basílica de Saint-Denis criando a teologia da luz através de ogivas e vitrais monumentais.',
        imageUrl: '/assets/expoentes/abade-suger.jpg',
        bio: 'Monge beneditino mentor teológico da arquitetura gótica. Ao reconstruir Saint-Denis com ogivas e vitrais, aplicou a teologia da luz (lux nova) do Pseudo-Dionísio para elevar a mente dos fiéis das realidades materiais às celestiais.'
      }
    ]
  }
];

export function getVocationById(vocationId) {
  return VOCATIONS_DATA.find(v => v.id === vocationId) || VOCATIONS_DATA[0];
}

export function getAllVocations() {
  return VOCATIONS_DATA;
}
