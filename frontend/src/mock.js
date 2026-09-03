// Mock data for Pokémon TCG store

export const featuredGames = [
  {
    id: 'fg1',
    title: 'SCARLET & VIOLET — TERAPAGOS EX',
    tagline: 'Nova Expansão Disponível',
    description: 'Descubra os poderes cristalinos de Terapagos ex na mais nova expansão do TCG. Cartas holográficas, booster boxes e coleções elite disponíveis agora.',
    hero: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    cta: 'Comprar Agora',
    tag: 'LANÇAMENTO',
  },
  {
    id: 'fg2',
    title: 'CHARIZARD VMAX RAINBOW',
    tagline: 'Edição Colecionador',
    description: 'Uma das cartas mais raras e desejadas do TCG. Charizard VMAX arco-íris certificada e protegida em toploader premium.',
    hero: 'https://images.unsplash.com/photo-1611931960487-4932667079f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    cta: 'Ver Detalhes',
    tag: 'ULTRA RARO',
  },
  {
    id: 'fg3',
    title: 'BOOSTER BOX 151',
    tagline: 'Coleção Kanto Completa',
    description: 'Reviva a nostalgia dos 151 Pokémon originais. Booster box lacrada com 36 pacotes e cartas ilustradas exclusivas.',
    hero: 'https://images.unsplash.com/photo-1666302936888-d41e661bc3dd',
    cta: 'Adicionar ao Carrinho',
    tag: 'MAIS VENDIDO',
  },
  {
    id: 'fg4',
    title: 'ELITE TRAINER BOX — PARADOX RIFT',
    tagline: 'Kit Completo do Treinador',
    description: 'Inclui 9 booster packs, cartas de energia, moeda personalizada, dados de dano e caixa de armazenamento exclusiva.',
    hero: 'https://images.unsplash.com/photo-1621568670868-24a7dfc590e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHw0fHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    cta: 'Comprar Agora',
    tag: 'RECOMENDADO',
  },
  {
    id: 'fg5',
    title: 'PIKACHU ILLUSTRATOR',
    tagline: 'A Carta Mais Rara do Mundo',
    description: 'Uma peça histórica do TCG Pokémon. Consulte disponibilidade e certificado PSA antes da compra.',
    hero: 'https://images.pexels.com/photos/9661254/pexels-photo-9661254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    cta: 'Consultar',
    tag: 'LENDÁRIO',
  },
];

export const freeGames = [
  {
    id: 'free1',
    title: 'Booster Grátis: Paldea Evolved',
    image: 'https://images.unsplash.com/photo-1647892591711-f310c2a3ab7c',
    status: 'GRÁTIS AGORA',
    dates: 'Grátis nas compras acima de R$ 300',
  },
  {
    id: 'free2',
    title: 'Promo Card: Mew ex',
    image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    status: 'GRÁTIS AGORA',
    dates: 'Válido até 25/07',
  },
  {
    id: 'free3',
    title: 'Deck Box Oficial',
    image: 'https://images.pexels.com/photos/7708401/pexels-photo-7708401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    status: 'EM BREVE',
    dates: 'Disponível 25/07 - 01/08',
  },
  {
    id: 'free4',
    title: 'Sleeves Pikachu',
    image: 'https://images.unsplash.com/photo-1666302937150-44f5af2ab474',
    status: 'EM BREVE',
    dates: 'Disponível 01/08 - 08/08',
  },
];

export const discoverGames = [
  {
    id: 'd1', title: 'Booster Pack — Obsidian Flames', image: 'https://images.unsplash.com/photo-1647892591690-25cf830cda51',
    price: 29.9, oldPrice: null, discount: null, genre: 'Booster Pack', tags: ['Pack Individual'],
    year: 2023, stock: 42, manufacturer: 'The Pokémon Company', language: 'Inglês', condition: 'Lacrado',
    description: 'Pacote individual da expansão Obsidian Flames, com 10 cartas aleatórias por pacote, incluindo a chance de cartas raras, holográficas e ex.',
    buyLink: '',
  },
  {
    id: 'd2', title: 'Elite Trainer Box — 151', image: 'https://images.unsplash.com/photo-1666302936888-d41e661bc3dd',
    price: 449.9, oldPrice: null, discount: null, genre: 'Kit Colecionador', tags: ['ETB'],
    year: 2023, stock: 8, manufacturer: 'The Pokémon Company', language: 'Inglês', condition: 'Lacrado',
    description: 'Kit completo do treinador com 9 booster packs da coleção 151, moeda metálica exclusiva, dados de dano, marcadores e caixa de armazenamento.',
    buyLink: '',
  },
  {
    id: 'd3', title: 'Charizard ex — Holo Rainbow', image: 'https://images.unsplash.com/photo-1611931960487-4932667079f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    price: 899.0, oldPrice: 1299.0, discount: '-31%', genre: 'Ultra Rara', tags: ['Carta Avulsa'],
    year: 2024, stock: 3, manufacturer: 'The Pokémon Company', language: 'Inglês', condition: 'Nova (Near Mint)',
    description: 'Carta avulsa Charizard ex em holo rainbow, uma das ilustrações mais desejadas da coleção. Enviada em toploader rígido para proteção total.',
    buyLink: '',
  },
  {
    id: 'd4', title: 'Sleeves Pokébola x65', image: 'https://images.pexels.com/photos/8811594/pexels-photo-8811594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 39.9, oldPrice: null, discount: null, genre: 'Acessório', tags: ['Sleeve'],
    year: 2024, stock: 120, manufacturer: 'Ultra Pro', language: '—', condition: 'Novo',
    description: 'Pacote com 65 sleeves protetoras tamanho padrão, estampa Pokébola, encaixe perfeito para cartas do TCG Pokémon.',
    buyLink: '',
  },
  {
    id: 'd5', title: 'Booster Box — Paradox Rift', image: 'https://images.unsplash.com/photo-1666302937150-44f5af2ab474',
    price: 1099.0, oldPrice: null, discount: null, genre: 'Booster Box', tags: ['36 Pacotes'],
    year: 2023, stock: 5, manufacturer: 'The Pokémon Company', language: 'Inglês', condition: 'Lacrado',
    description: 'Caixa lacrada da expansão Paradox Rift, contém 36 pacotes com 10 cartas em cada. Ideal para quem busca completar coleções ou abrir boosters.',
    buyLink: '',
  },
  {
    id: 'd6', title: 'Mini Portfolio 4 pockets', image: 'https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE3ODY5OTMwMDF8MA&ixlib=rb-4.1.0&q=85',
    price: 89.9, oldPrice: 129.9, discount: '-30%', genre: 'Acessório', tags: ['Portfolio'],
    year: 2024, stock: 60, manufacturer: 'Ultra Pro', language: '—', condition: 'Novo',
    description: 'Portfólio compacto com 4 bolsos por página (8 cartas por folha), capacidade para até 160 cartas. Fecho com zíper e alça de mão.',
    buyLink: '',
  },
  {
    id: 'd7', title: 'Pikachu VMAX — Full Art', image: 'https://images.pexels.com/photos/9560279/pexels-photo-9560279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    price: 349.0, oldPrice: null, discount: null, genre: 'Ultra Rara', tags: ['Carta Avulsa'],
    year: 2022, stock: 6, manufacturer: 'The Pokémon Company', language: 'Inglês', condition: 'Nova (Near Mint)',
    description: 'Carta avulsa Pikachu VMAX em Full Art, arte estendida cobrindo toda a carta. Peça de destaque para qualquer coleção.',
    buyLink: '',
  },
  {
    id: 'd8', title: 'Deck Temático Mewtwo', image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85',
    price: 79.9, oldPrice: 99.9, discount: '-20%', genre: 'Deck Pronto', tags: ['Starter'],
    year: 2023, stock: 15, manufacturer: 'The Pokémon Company', language: 'Português', condition: 'Lacrado',
    description: 'Deck pronto para jogar com tema Mewtwo, 60 cartas balanceadas, ideal para iniciantes ou para expandir sua coleção de decks temáticos.',
    buyLink: '',
  },
];

export const topSellers = [
  { id: 't1', rank: 1, title: 'Booster Box 151', image: 'https://images.unsplash.com/photo-1666302936888-d41e661bc3dd', price: 999.0 },
  { id: 't2', rank: 2, title: 'Charizard ex Rainbow', image: 'https://images.unsplash.com/photo-1611931960487-4932667079f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85', price: 899.0 },
  { id: 't3', rank: 3, title: 'ETB Paradox Rift', image: 'https://images.unsplash.com/photo-1621568670868-24a7dfc590e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHw0fHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85', price: 379.0 },
  { id: 't4', rank: 4, title: 'Pikachu VMAX', image: 'https://images.pexels.com/photos/9560279/pexels-photo-9560279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', price: 349.0 },
  { id: 't5', rank: 5, title: 'Booster Obsidian Flames', image: 'https://images.unsplash.com/photo-1647892591690-25cf830cda51', price: 29.9 },
];

export const mostPlayed = [
  { id: 'mp1', rank: 1, title: 'Terapagos ex Set', image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85', tag: 'Novo' },
  { id: 'mp2', rank: 2, title: 'Mew ex Promo', image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85', tag: 'Promo' },
  { id: 'mp3', rank: 3, title: 'Sleeves Pokébola', image: 'https://images.pexels.com/photos/8811594/pexels-photo-8811594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'Acessório' },
  { id: 'mp4', rank: 4, title: 'Booster Pack Avulso', image: 'https://images.unsplash.com/photo-1647892591711-f310c2a3ab7c', tag: 'Booster' },
  { id: 'mp5', rank: 5, title: 'Portfolio Colecionador', image: 'https://images.unsplash.com/photo-1628968434441-d9c1c66dcde7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE3ODY5OTMwMDF8MA&ixlib=rb-4.1.0&q=85', tag: 'Acessório' },
];

export const upcomingGames = [
  { id: 'u1', title: 'Twilight Masquerade', image: 'https://images.unsplash.com/photo-1666302937150-44f5af2ab474', releaseDate: 'Lança 12/08/2025' },
  { id: 'u2', title: 'Shrouded Fable', image: 'https://images.pexels.com/photos/7708401/pexels-photo-7708401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', releaseDate: 'Lança 03/09/2025' },
  { id: 'u3', title: 'Stellar Crown ETB', image: 'https://images.unsplash.com/photo-1621568670868-24a7dfc590e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHw0fHxwb2tlbW9uJTIwdHJhZGluZyUyMGNhcmR8ZW58MHx8fHwxNzg2OTkzMDAxfDA&ixlib=rb-4.1.0&q=85', releaseDate: 'Lança 15/10/2025' },
  { id: 'u4', title: 'Surging Sparks Box', image: 'https://images.unsplash.com/photo-1666302936888-d41e661bc3dd', releaseDate: 'Lança 21/11/2025' },
  { id: 'u5', title: 'Prismatic Evolutions', image: 'https://images.pexels.com/photos/9560279/pexels-photo-9560279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', releaseDate: 'Lança 09/12/2025' },
];

// Unified, search-friendly product list combining every catalog with
// a defined price into one consistent shape (id/title/image/price/
// oldPrice/discount/genre/tags) so the search page and GameCard can
// render any of them without special-casing missing fields.
export const searchCatalog = [
  ...discoverGames,
  ...topSellers.map((t) => ({
    id: t.id,
    title: t.title,
    image: t.image,
    price: t.price,
    oldPrice: null,
    discount: null,
    genre: 'Mais Vendido',
    tags: ['Mais Vendido'],
  })),
];

export const getProductById = (id) => {
  const full = discoverGames.find((p) => p.id === id);
  if (full) return full;

  const partial = searchCatalog.find((p) => p.id === id);
  if (!partial) return null;

  return {
    year: null,
    stock: 1,
    manufacturer: 'The Pokémon Company',
    language: 'Inglês',
    condition: 'Lacrado',
    description: '',
    buyLink: '',
    ...partial,
  };
};

export const genres = [
  'Fogo', 'Água', 'Grama', 'Elétrico', 'Psíquico', 'Lutador', 'Sombrio', 'Metálico', 'Dragão', 'Fada', 'Incolor', 'Ultra Raras', 'Full Art', 'Rainbow', 'Alt Art', 'Promo'
];

export const genreColors = {
  'Fogo': '#ef4444',
  'Água': '#3b82f6',
  'Grama': '#22c55e',
  'Elétrico': '#eab308',
  'Psíquico': '#ec4899',
  'Lutador': '#c2410c',
  'Sombrio': '#6b21a8',
  'Metálico': '#94a3b8',
  'Dragão': '#6366f1',
  'Fada': '#f472b6',
  'Incolor': '#a1a1aa',
  'Ultra Raras': '#f59e0b',
  'Full Art': '#14b8a6',
  'Rainbow': '#a855f7',
  'Alt Art': '#8b5cf6',
  'Promo': '#06b6d4',
};
export const navLinks = [
  { key: 'nav.explore', href: '/' },
  { key: 'nav.categories', href: '#' },
  { key: 'nav.news', href: '#' },
];

export const topBarLinks = [
  { key: 'topbar.store', href: '/' },
  { key: 'topbar.boosterPacks', href: '#' },
  { key: 'topbar.boosterBox', href: '#' },
  { key: 'topbar.eliteTrainerBox', href: '#' },
  { key: 'topbar.singleCards', href: '#' },
  { key: 'topbar.accessories', href: '#' },
  { key: 'topbar.readyDecks', href: '#' },
  { key: 'topbar.promoCards', href: '#' },
  { key: 'topbar.tournaments', href: '#' },
  { key: 'topbar.blog', href: '#' },
];
