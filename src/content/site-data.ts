/**
 * Unique Coffee — Conteúdo centralizado do site.
 *
 * Fonte de verdade para todo o conteúdo textual.
 * Baseado na apresentação oficial "Apresentação Unique Coffee rev01".
 * Na Fase 2, será substituído por dados vindos do CMS/Admin.
 */

export const siteData = {
  brand: {
    name: "Unique Coffee",
    tagline: "O Sabor Único do Verdadeiro Café",
    url: "www.uniquecoffee.pt",
  },

  nav: {
    links: [
      { label: "Início", href: "/" },
      { label: "Sobre", href: "/sobre" },
      { label: "Conceito", href: "/conceito" },
      { label: "Grãos", href: "/graos" },
      { label: "Produtos", href: "/produtos" },
      { label: "Menu", href: "/menu" },
      { label: "Sobremesas", href: "/sobremesas" },
      { label: "Equipa", href: "/equipa" },
      { label: "Galeria", href: "/galeria" },
      { label: "Visite-nos", href: "/contacto" },
    ],
  },

  typography: {
    fonts: {
      display: "Playfair Display",
      body: "Lora",
      ui: "Raleway",
    },
    sizes: {
      heroTitle: "clamp(2.5rem, 5vw, 5rem)",
      sectionTitle: "clamp(1.75rem, 3vw, 3rem)",
      subtitle: "clamp(1.125rem, 1.5vw, 1.5rem)",
      body: "16px",
    },
  },

  colors: {
    dark: "#2C1810",
    accent: "#B87333",
    background: "#F5F0EB",
  },

  buttons: {
    defaultVariant: "primary" as const,
    borderRadius: "8px",
  },

  hiddenPages: [] as string[],

  hero: {
    title: "O Sabor Único do Verdadeiro Café",
    subtitle:
      "Sua cafetaria em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
    cta: "Descubra o nosso espaço",
    ctaLink: "/sobre",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&q=80",
  },

  sobreNos: {
    title: "Sobre Nós",
    paragraphs: [
      "A Unique Coffee nasceu da convicção de que o café é muito mais do que uma bebida. É um momento. Uma pausa. Um convite para abrandar o ritmo e estar presente.",
      "Mais do que servir café de elevada qualidade, a Unique Coffee foi criada para ser um espaço de acolhimento, onde cada pessoa se sinta confortável para ser quem é, ao seu próprio ritmo. Um lugar onde o tempo desacelera, as conversas acontecem com naturalidade, o trabalho flui com tranquilidade e os pequenos prazeres do dia ganham verdadeiro significado.",
      "Inspirada em memórias afectivas, boas conversas, família e na arte de preparar e servir café com respeito, a Unique Coffee alia sofisticação e simplicidade. Cada detalhe do espaço foi cuidadosamente pensado para proporcionar conforto, elegância e bem-estar, seja para quem vem trabalhar, relaxar, ler um livro, aproveitar os dias de sol no espaço exterior ou simplesmente saborear um bom café.",
    ],
    highlights: [
      "Aqui, pessoas e animais de estimação são bem-vindos.",
      "Aqui, sentir-se em casa faz parte da experiência.",
      "Aqui, cada visita é única, tal como cada pessoa que passa pela nossa porta.",
    ],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop&q=80",
    ctaText: "Conheça Nossa História",
    ctaLink: "/sobre",
  },

  missaoVisaoValores: {
    missao: {
      title: "Missão",
      text: "Proporcionar experiências únicas através do café, oferecendo um ambiente acolhedor, sofisticado e tranquilo, onde as pessoas se sintam em casa, criem boas memórias e desfrutem de momentos de qualidade.",
    },
    visao: {
      title: "Visão",
      text: "Ser reconhecida como uma cafetaria de referência em experiência, conforto e qualidade, valorizada por um público exclusivo, mantendo sempre a essência de um espaço humano, familiar e autêntico.",
    },
    valores: {
      title: "Valores",
      items: [
        {
          name: "Acolhimento",
          description:
            "Receber cada pessoa com atenção, respeito e cuidado, criando um ambiente onde todos se sintam verdadeiramente bem-vindos.",
        },
        {
          name: "Qualidade",
          description:
            "Excelência em cada detalhe, do café servido ao ambiente, do atendimento à experiência como um todo.",
        },
        {
          name: "Autenticidade",
          description:
            "Manter-nos fiéis à nossa essência, à nossa história e aos nossos valores, sem seguir modas ou excessos.",
        },
        {
          name: "Tranquilidade",
          description:
            "Valorizar o tempo, o silêncio e o bem-estar, oferecendo uma pausa do ritmo acelerado do dia a dia.",
        },
      ],
    },
  },

  conceito: {
    title: "Nosso Conceito",
    backgroundImage:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&h=1080&fit=crop&q=80",
    paragraphs: [
      "Na Unique Coffee, o conceito vai além do café. Assenta na forma como cada pessoa é recebida, no cuidado com os detalhes e na criação de uma experiência verdadeiramente diferenciadora.",
      "Acreditamos num atendimento atento, discreto e personalizado, onde cada cliente é tratado de forma única. Aqui, o serviço não é apressado nem impessoal. É pensado para quem valoriza qualidade, tranquilidade e um ambiente onde tudo acontece no tempo certo.",
      "A experiência Unique Coffee é marcada por exclusividade subtil, presente na selecção cuidada dos cafés, no ambiente elegante e acolhedor, na harmonia do espaço e na forma como cada momento é vivido. Não seguimos tendências passageiras. Privilegiamos a consistência, o conforto e a autenticidade.",
    ],
    ctaText: "Descubra o Nosso Conceito",
    ctaLink: "/conceito",
  },

  diferencial: {
    title: "Nosso Diferencial",
    intro:
      "Na Unique Coffee, o verdadeiro diferencial não está apenas no que servimos, mas na forma como fazemos sentir.",
    paragraphs: [
      "Criámos um espaço onde a experiência é pensada de forma intencional. Do atendimento atento e personalizado à selecção cuidada dos cafés, tudo foi desenhado para oferecer tranquilidade, conforto e qualidade sem excessos.",
      "Enquanto muitas cafetarias apostam na rapidez, a Unique Coffee valoriza o tempo. Aqui, cada cliente é recebido com atenção, cada momento é respeitado e cada detalhe contribui para uma experiência premium, discreta e autêntica.",
      "O ambiente acolhedor, pet friendly e familiar, aliado a um público exigente e especial, reforça um posicionamento claro: um lugar para quem aprecia qualidade, silêncio, boas conversas e uma experiência diferenciada.",
    ],
    closing: [
      "Cultivamos consistência, cuidado e identidade.",
      "É isso que torna a experiência Unique Coffee verdadeiramente única.",
    ],
  },

  graos: {
    title: "Grãos Especialmente Seleccionados",
    paragraphs: [
      "Na Unique Coffee, a qualidade começa na origem. Cada grão é escolhido com critério, respeito e atenção aos detalhes que fazem a diferença no sabor final.",
      "Trabalhamos com grãos cuidadosamente seleccionados, provenientes de produtores que valorizam boas práticas, consistência e excelência. A selecção tem em conta o equilíbrio, o aroma e a complexidade, garantindo um café harmonioso, marcante e elegante.",
    ],
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000&h=700&fit=crop&q=80",
    ctaText: "Saiba Mais Sobre os Nossos Grãos",
    ctaLink: "/graos",
  },

  produtos: {
    title: "Nossos Produtos",
    subtitle: "Uma seleção cuidadosa de cafés de especialidade e acessórios para quem valoriza cada detalhe na preparação do café perfeito.",
    items: [
      {
        name: "Café Honduras",
        slug: "cafe-honduras",
        image: "/images/produtos/1_800x1000.png",
        description: "Perfil: chocolate, amêndoa, frutos amarelos. Embalagem 250g.",
      },
      {
        name: "Café Rwanda",
        slug: "cafe-rwanda",
        image: "/images/produtos/2_800x1000.png",
        description: "Perfil: chocolate de leite, maçã, damasco. Embalagem 250g.",
      },
      {
        name: "Café Colombia Decaf",
        slug: "cafe-colombia-decaf",
        image: "/images/produtos/3_800x1000.png",
        description: "Perfil: especiarias, canela, mirtilo. Descafeinado natural.",
      },
      {
        name: "Hario V60 Dripper",
        slug: "hario-v60-dripper",
        image: "/images/produtos/4_800x1000.png",
        description: "Dripper cerâmico Hario V60 02 para extracção manual de café.",
      },
      {
        name: "Filtros Chemex",
        slug: "filtros-chemex",
        image: "/images/produtos/5_800x1000.png",
        description: "Filtros de papel para cafeteira Chemex. Design puro, filtragem perfeita.",
      },
      {
        name: "Filtros Hario V60",
        slug: "filtros-hario-v60",
        image: "/images/produtos/6_800x1000.png",
        description: "Filtros de papel Hario V60 02. Caixa com 100 unidades.",
      },
      {
        name: "Bialetti French Press",
        slug: "bialetti-french-press",
        image: "/images/produtos/7_800x1000.png",
        description: "French Press Bialetti Smart 350ml. Qualidade premium desde 1919.",
      },
      {
        name: "Hario V60 Drip Decanter",
        slug: "hario-v60-drip-decanter",
        image: "/images/produtos/8_800x1000.png",
        description: "Decanter com dripper integrado e filtros incluídos.",
      },
      {
        name: "Hario V60 Kit Completo",
        slug: "hario-v60-kit-completo",
        image: "/images/produtos/9_800x1000.png",
        description: "Kit com dripper cerâmico, servidor de vidro, colher e filtros.",
      },
      {
        name: "Hario V60 Craft Coffee Maker",
        slug: "hario-v60-craft-coffee-maker",
        image: "/images/produtos/10_800x1000.png",
        description: "Conjunto completo: dripper, servidor, colher e filtros de papel.",
      },
      {
        name: "AeroPress Micro-Filtros",
        slug: "aeropress-micro-filtros",
        image: "/images/produtos/11_800x1000.png",
        description: "Micro-filtros AeroPress. Absorvem óleos para um café mais limpo.",
      },
      {
        name: "Moccamaster Filtros No.4",
        slug: "moccamaster-filtros-no4",
        image: "/images/produtos/12_800x1000.png",
        description: "Filtros Technivorm Moccamaster No.4. Caixa com 100 unidades.",
      },
    ],
  },

  menu: {
    title: "Nosso Menu",
    subtitle: "E muito mais...",
    ctaText: "Ver Menu Completo",
    ctaLink: "https://drive.google.com/file/d/1jB79cR2MzS4jTJp6n4rfqp_kFQ_kxCol/view?usp=sharing",
    categories: [
      {
        name: "Tostas",
        slug: "tostas",
        image:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop&q=80",
        description:
          "As nossas tostas são preparadas com pão artesanal e ingredientes frescos seleccionados, para uma experiência de sabor autêntica.",
        items: [
          { name: "Tosta Mista", description: "Fiambre e queijo derretido em pão artesanal." },
          { name: "Tosta de Salmão", description: "Salmão fumado com cream cheese e rúcula." },
          { name: "Tosta Caprese", description: "Tomate, mozzarella fresca e manjericão." },
        ],
      },
      {
        name: "Doces",
        slug: "doces",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop&q=80",
        description:
          "Uma selecção de doces cuidadosamente escolhidos para acompanhar o seu café com a doçura certa.",
        items: [
          { name: "Bolo de Noz", description: "Receita caseira com nozes crocantes." },
          { name: "Tarte do Dia", description: "Preparada diariamente com ingredientes frescos." },
          { name: "Cookie Artesanal", description: "Cookie caseiro com pepitas de chocolate." },
        ],
      },
      {
        name: "Especialidades",
        slug: "especialidades",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&q=80",
        description:
          "Bebidas especiais que vão além do café tradicional, preparadas com técnica e criatividade.",
        items: [
          { name: "Matcha Latte", description: "Chá matcha japonês com leite vaporizado." },
          { name: "Chai Latte", description: "Especiarias aromáticas com leite cremoso." },
          { name: "Chocolate Quente", description: "Chocolate belga servido com espuma de leite." },
        ],
      },
      {
        name: "Cafés",
        slug: "cafes",
        image:
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&h=500&fit=crop&q=80",
        description:
          "Cafés de especialidade preparados com grãos seleccionados e técnicas apuradas.",
        items: [
          { name: "Espresso", description: "Extracção cuidada de café de especialidade." },
          { name: "Cappuccino", description: "Espresso com leite vaporizado e espuma cremosa." },
          { name: "Flat White", description: "Duplo espresso com micro-espuma aveludada." },
          { name: "V60 Pour Over", description: "Método de extracção manual para apreciar notas subtis." },
        ],
      },
    ],
  },

  sobremesas: {
    title: "Nossas Sobremesas",
    paragraphs: [
      "Na Unique Coffee, as sobremesas são pensadas como uma extensão natural da experiência. Não são apenas um complemento, são um momento a ser apreciado com calma.",
      "Cada sobremesa é escolhida com o mesmo cuidado que dedicamos ao café, privilegiando qualidade, equilíbrio de sabores e uma apresentação simples, mas elegante. Trabalhamos com receitas que valorizam ingredientes seleccionados, respeitando texturas, aromas e combinações que harmonizam com o café servido.",
    ],
    highlights: [
      "Aqui, cada detalhe conta.",
      "Aqui, o doce é servido no tempo certo.",
    ],
    ctaText: "Conheça Nossas Sobremesas",
    ctaLink: "/sobremesas",
    items: [
      {
        name: "Tarte do Dia",
        slug: "tarte-do-dia",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=500&fit=crop&q=80",
        description:
          "Preparada diariamente com ingredientes da estação, a nossa tarte do dia é uma surpresa que se renova. Cada fatia reflecte a dedicação e o cuidado que colocamos em cada detalhe.",
      },
      {
        name: "Bolo de Noz",
        slug: "bolo-de-noz",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop&q=80",
        description:
          "Uma receita caseira e reconfortante, com nozes crocantes e uma textura húmida que se desfaz na boca. O acompanhamento perfeito para um café longo e uma pausa merecida.",
      },
      {
        name: "Croissant Artesanal",
        slug: "croissant-artesanal",
        image:
          "https://images.unsplash.com/photo-1623334044303-241021148842?w=500&h=500&fit=crop&q=80",
        description:
          "Feito artesanalmente com manteiga francesa, o nosso croissant é folhado, dourado e irresistível. Simples na essência, sofisticado no sabor.",
      },
      {
        name: "Cheesecake",
        slug: "cheesecake",
        image:
          "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&h=500&fit=crop&q=80",
        description:
          "Cremosa e suave, a nossa cheesecake é preparada com queijo fresco de qualidade e uma base crocante. Um clássico servido com a elegância que merece.",
      },
      {
        name: "Brownie",
        slug: "brownie",
        image:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop&q=80",
        description:
          "Intenso e fudgy, o nosso brownie de chocolate é preparado com cacau de qualidade. Para quem aprecia um doce com personalidade.",
      },
      {
        name: "Scone de Frutos Vermelhos",
        slug: "scone-frutos-vermelhos",
        image:
          "https://images.unsplash.com/photo-1558303926-f5b2079ceee1?w=500&h=500&fit=crop&q=80",
        description:
          "Leve e perfumado, com frutos vermelhos naturais que trazem frescura a cada dentada. Ideal com um chá ou um café suave.",
      },
      {
        name: "Cookie Artesanal",
        slug: "cookie-artesanal",
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=500&fit=crop&q=80",
        description:
          "Crocante por fora, macio por dentro. O nosso cookie artesanal com pepitas de chocolate é feito em pequenas quantidades para garantir frescura.",
      },
      {
        name: "Muffin do Dia",
        slug: "muffin-do-dia",
        image:
          "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=500&fit=crop&q=80",
        description:
          "Uma surpresa que muda diariamente — mirtilos, maçã-canela ou chocolate. Sempre fofo, sempre fresco, sempre irresistível.",
      },
    ],
  },

  equipa: {
    title: "Nossa Equipa",
    members: [
      {
        name: "Priscila",
        role: "Fundadora",
        hasPhoto: true,
      },
      {
        name: "Maria",
        role: "Anfitriã de Sala",
        hasPhoto: false,
      },
      {
        name: "Juliana",
        role: "Barista Especializada",
        hasPhoto: false,
      },
      {
        name: "Helena",
        role: "Barista Especializada",
        hasPhoto: false,
      },
    ],
  },

  galeria: {
    title: "Nossa Galeria",
    ctaText: "Ver galeria completa",
    ctaLink: "/galeria",
    description: [
      "Cada imagem da Unique Coffee revela mais do que um espaço, revela sensações, detalhes e momentos vividos.",
      "A nossa galeria é um convite a conhecer o ambiente, a atmosfera e a essência que tornam cada visita única. Luz natural, linhas cuidadas, detalhes pensados e um equilíbrio entre conforto e elegância compõem um espaço onde tudo tem propósito.",
      "Mais do que imagens, são fragmentos da experiência Unique Coffee.",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop&q=80",
        alt: "Interior da Unique Coffee com luz natural",
      },
      {
        src: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop&q=80",
        alt: "Detalhe da decoração do espaço",
      },
      {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=800&fit=crop&q=80",
        alt: "Preparação de café de especialidade",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&q=80",
        alt: "Chávena de café servida com cuidado",
      },
      {
        src: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=800&fit=crop&q=80",
        alt: "Ambiente tranquilo e acolhedor",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80",
        alt: "Detalhe de sobremesa artesanal",
      },
    ],
  },

  visiteNos: {
    title: "Venha Conhecer",
    intro: "Sinta a experiência. Viva o momento.",
    description:
      "Visite a Unique Coffee e permita-se uma pausa onde o tempo abranda, o café é tratado com respeito e cada detalhe foi totalmente pensado para si.",
    cta: "Esperamos por si!",
    mapCtaText: "Como chegar",
    address: "R. Vitorino Fróis 12A, 2500-256 Caldas da Rainha",
    phone: "925 903 132",
    email: "hello@uniquecoffee.pt",
    website: "www.uniquecoffee.pt",
    hours: {
      weekdays: "Segunda a Sexta: 08h00 – 19h00",
      saturday: "Sábado: 09h00 – 19h00",
      sunday: "Domingo: 09h00 – 18h00",
    },
    badges: ["Pet Friendly", "Wi-Fi Gratuito", "Café de Especialidade"],
    social: {
      instagram: "https://instagram.com/uniquecoffee.cr",
      facebook: "",
    },
    mapCoordinates: {
      lat: 39.4036,
      lng: -9.1366,
    },
  },

  reviews: {
    mode: "manual" as const,
    title: "O Que Dizem Sobre Nós",
    manualReviews: [
      {
        author: "Ana M.",
        text: "O melhor café de especialidade em Caldas da Rainha. Ambiente acolhedor e atendimento impecável.",
        rating: 5,
        date: "2025-01-10",
        source: "manual" as const,
      },
      {
        author: "João P.",
        text: "Adorei o flat white e o croissant artesanal. Um espaço que convida a voltar.",
        rating: 5,
        date: "2025-02-05",
        source: "manual" as const,
      },
      {
        author: "Sofia R.",
        text: "O cheesecake é divinal e o café é servido com um cuidado que se nota. Recomendo!",
        rating: 5,
        date: "2025-01-22",
        source: "manual" as const,
      },
    ],
    google: { apiKey: "", placeId: "" },
    cachedGoogleReviews: [],
  },

  seo: {
    global: {
      title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
      description:
        "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
      keywords: [
        "café especialidade Caldas da Rainha",
        "cafeteria premium Portugal",
        "unique coffee",
        "melhor café Caldas da Rainha",
      ],
    },
    pages: {} as Record<string, { title: string; description: string }>,
    googleVerification: "",
  },

  footer: {
    copyright: "© 2025 Unique Coffee. Todos os direitos reservados.",
    location: "R. Vitorino Fróis 12A, 2500-256 Caldas da Rainha",
  },

  privacidade: {
    title: "Privacidade e Termos de Utilização",
    sections: [
      {
        heading: "1. Responsável pelo Tratamento",
        content: "O responsável pelo tratamento dos dados pessoais recolhidos neste website é a Unique Coffee, com sede na R. Vitorino Fróis 12A, 2500-256 Caldas da Rainha, Portugal.\n\nContacto: hello@uniquecoffee.pt",
      },
      {
        heading: "2. Dados Pessoais Recolhidos",
        content: "Este website pode recolher os seguintes dados pessoais:\n- Dados de navegação (cookies, endereço IP, tipo de browser)\n- Dados fornecidos voluntariamente pelo utilizador (nome, email, telefone) em formulários de contacto",
      },
      {
        heading: "3. Finalidade do Tratamento",
        content: "Os dados recolhidos são utilizados para:\n- Responder a pedidos de informação e contacto\n- Melhorar a experiência de navegação no site\n- Fins estatísticos e analíticos (de forma anonimizada)",
      },
      {
        heading: "4. Partilha de Dados",
        content: "Os dados pessoais não serão partilhados com terceiros, excepto quando necessário para cumprimento de obrigações legais ou com o consentimento explícito do utilizador.",
      },
      {
        heading: "5. Direitos do Titular",
        content: "Nos termos do Regulamento Geral sobre a Protecção de Dados (RGPD), o utilizador tem direito a:\n- Aceder aos seus dados pessoais\n- Solicitar a rectificação ou eliminação dos dados\n- Opor-se ao tratamento dos dados\n- Solicitar a portabilidade dos dados\n\nPara exercer estes direitos, contacte-nos em hello@uniquecoffee.pt.",
      },
      {
        heading: "6. Cookies",
        content: "Este website utiliza cookies. Para mais informações, consulte a nossa Política de Cookies.",
      },
      {
        heading: "7. Termos de Utilização",
        content: "O conteúdo deste website é propriedade da Unique Coffee e está protegido por direitos de autor. A reprodução total ou parcial do conteúdo sem autorização prévia é proibida.\n\nA Unique Coffee reserva-se o direito de alterar esta política a qualquer momento, sendo as alterações publicadas nesta página.",
      },
      {
        heading: "8. Legislação Aplicável",
        content: "Esta política rege-se pela legislação portuguesa e europeia, nomeadamente o Regulamento (UE) 2016/679 (RGPD) e a Lei n.º 58/2019 de 8 de agosto.",
      },
    ],
    lastUpdated: "Fevereiro de 2026",
  },

  cookies: {
    title: "Política de Cookies",
    sections: [
      {
        heading: "O que são Cookies?",
        content: "Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. São amplamente utilizados para garantir o funcionamento correcto dos sites, melhorar a experiência do utilizador e fornecer informações aos proprietários do site.",
      },
      {
        heading: "Cookies que Utilizamos",
        content: "Essenciais: Necessários para o funcionamento básico do site (sessão, preferências de cookies). Duração: Sessão / 1 ano.\n\nAnalíticos: Ajudam-nos a compreender como os visitantes interagem com o site (Google Analytics). Duração: Até 2 anos.",
      },
      {
        heading: "Gestão de Cookies",
        content: "Pode gerir as suas preferências de cookies a qualquer momento. A maioria dos browsers permite-lhe recusar ou eliminar cookies. Note que a desactivação de cookies pode afectar a funcionalidade de algumas partes do site.\n\nPara alterar as definições de cookies no seu browser:\n- Chrome: Definições > Privacidade e segurança > Cookies\n- Firefox: Definições > Privacidade e Segurança > Cookies\n- Safari: Preferências > Privacidade > Cookies\n- Edge: Definições > Privacidade > Cookies",
      },
      {
        heading: "Consentimento",
        content: "Ao continuar a navegar neste website após a apresentação do aviso de cookies, está a consentir a utilização de cookies de acordo com esta política.\n\nPode retirar o seu consentimento a qualquer momento limpando os cookies do seu browser.",
      },
      {
        heading: "Mais Informações",
        content: "Para questões sobre a nossa política de cookies, consulte a nossa Política de Privacidade ou contacte-nos em hello@uniquecoffee.pt.",
      },
    ],
    lastUpdated: "Fevereiro de 2026",
  },

  livroReclamacoes: {
    title: "Livro de Reclamações",
    link: "https://www.livroreclamacoes.pt/Inicio/",
    intro: "Em conformidade com o Decreto-Lei n.º 156/2005 e legislação subsequente, disponibilizamos o acesso ao Livro de Reclamações Electrónico.",
    sections: [
      {
        heading: "Livro de Reclamações Electrónico",
        content: "Pode apresentar a sua reclamação através do portal oficial do Governo de Portugal em https://www.livroreclamacoes.pt/Inicio/.",
      },
      {
        heading: "Contacto Directo",
        content: "Antes de recorrer ao livro de reclamações, pode contactar-nos directamente. Valorizamos o seu feedback e faremos o possível para resolver qualquer situação.\n\nEmail: hello@uniquecoffee.pt\nTelefone: 925 903 132\nMorada: R. Vitorino Fróis 12A, 2500-256 Caldas da Rainha",
      },
      {
        heading: "Entidade Reguladora",
        content: "A Unique Coffee está sujeita a fiscalização da ASAE — Autoridade de Segurança Alimentar e Económica.",
      },
    ],
    lastUpdated: "Fevereiro de 2026",
  },
} as const;

export type SiteData = typeof siteData;
