// Mock data for Epic Games Store clone

export const featuredGames = [
  {
    id: 'fg1',
    title: 'STELLAR ODYSSEY',
    tagline: 'New Season Available Now',
    description: 'Journey across the fractured galaxies in an epic sci-fi adventure. New content, new heroes, new worlds await.',
    hero: 'https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8',
    logo: null,
    cta: 'Play Now',
    tag: 'FREE TO PLAY',
  },
  {
    id: 'fg2',
    title: 'NEON RUNNER 2077',
    tagline: 'Story Expansion Out Now',
    description: 'Dive into the neon-lit underworld of Nightspire City. A brand new chapter unfolds in the biggest cyberpunk RPG.',
    hero: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
    cta: 'Buy Now',
    tag: 'NEW RELEASE',
  },
  {
    id: 'fg3',
    title: 'DRAGONS OF ELDORIA',
    tagline: 'Available on Epic Games Store',
    description: 'Forge your legend in a fantasy realm ruled by dragons. Master ancient magic and command mythical creatures.',
    hero: 'https://images.unsplash.com/photo-1613346697264-350936cb3ba3',
    cta: 'Buy Now',
    tag: 'BEST SELLER',
  },
  {
    id: 'fg4',
    title: 'CYBER PROTOCOL',
    tagline: 'Season 3 Live Event',
    description: 'Hack, heist, and hustle your way through the futuristic streets in this multiplayer thriller.',
    hero: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
    cta: 'Play For Free',
    tag: 'FREE TO PLAY',
  },
  {
    id: 'fg5',
    title: 'BLADE OF THE FALLEN',
    tagline: 'A Souls-like Masterpiece',
    description: 'Prove your worth in a brutal fantasy world. Every death teaches, every victory legendary.',
    hero: 'https://images.unsplash.com/photo-1687567571600-4b5ad80665b8',
    cta: 'Buy Now',
    tag: 'EDITOR\'S CHOICE',
  },
];

export const freeGames = [
  {
    id: 'free1',
    title: 'Void Walker',
    image: 'https://images.unsplash.com/photo-1744113749099-4b7d3c26f8ee',
    status: 'FREE NOW',
    dates: 'Free Until Jul 25',
  },
  {
    id: 'free2',
    title: 'Ashen Kingdom',
    image: 'https://images.unsplash.com/photo-1460194436988-671f763436b7',
    status: 'FREE NOW',
    dates: 'Free Until Jul 25',
  },
  {
    id: 'free3',
    title: 'Chrome Legion',
    image: 'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62',
    status: 'COMING SOON',
    dates: 'Free Jul 25 - Aug 1',
  },
  {
    id: 'free4',
    title: 'Wyrm Hunter',
    image: 'https://images.pexels.com/photos/5926488/pexels-photo-5926488.jpeg',
    status: 'COMING SOON',
    dates: 'Free Aug 1 - Aug 8',
  },
];

export const discoverGames = [
  { id: 'd1', title: 'Nebula Strike', image: 'https://images.unsplash.com/photo-1633355194356-1a2b1995cc62', price: 29.99, oldPrice: null, discount: null, genre: 'Action, Sci-Fi', tags: ['Base Game'] },
  { id: 'd2', title: 'Iron Fist Chronicles', image: 'https://images.unsplash.com/photo-1700234272632-9f7a43b84e1c', price: 49.99, oldPrice: null, discount: null, genre: 'RPG, Adventure', tags: ['Base Game'] },
  { id: 'd3', title: 'Skyfall Legacy', image: 'https://images.unsplash.com/photo-1634585738250-09ee92cae0f8', price: 19.99, oldPrice: 39.99, discount: '-50%', genre: 'Open World', tags: ['Base Game'] },
  { id: 'd4', title: 'Nightspire', image: 'https://images.pexels.com/photos/8108327/pexels-photo-8108327.jpeg', price: 0, oldPrice: null, discount: null, genre: 'Multiplayer, Shooter', tags: ['Free'] },
  { id: 'd5', title: 'Emberdown', image: 'https://images.pexels.com/photos/12650746/pexels-photo-12650746.jpeg', price: 24.99, oldPrice: null, discount: null, genre: 'Fantasy, RPG', tags: ['Base Game'] },
  { id: 'd6', title: 'Aurora Protocol', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf', price: 14.99, oldPrice: 29.99, discount: '-50%', genre: 'Puzzle, Indie', tags: ['Base Game'] },
];

export const topSellers = [
  { id: 't1', rank: 1, title: 'Blade of the Fallen', image: 'https://images.unsplash.com/photo-1687567571600-4b5ad80665b8', price: 59.99 },
  { id: 't2', rank: 2, title: 'Neon Runner 2077', image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16', price: 39.99 },
  { id: 't3', rank: 3, title: 'Dragons of Eldoria', image: 'https://images.unsplash.com/photo-1613346697264-350936cb3ba3', price: 49.99 },
  { id: 't4', rank: 4, title: 'Nebula Strike', image: 'https://images.unsplash.com/photo-1633355194356-1a2b1995cc62', price: 29.99 },
  { id: 't5', rank: 5, title: 'Void Walker', image: 'https://images.unsplash.com/photo-1744113749099-4b7d3c26f8ee', price: 0 },
];

export const mostPlayed = [
  { id: 'mp1', rank: 1, title: 'Stellar Odyssey', image: 'https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8', tag: 'Free' },
  { id: 'mp2', rank: 2, title: 'Cyber Protocol', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455', tag: 'Free' },
  { id: 'mp3', rank: 3, title: 'Nightspire', image: 'https://images.pexels.com/photos/8108327/pexels-photo-8108327.jpeg', tag: 'Free' },
  { id: 'mp4', rank: 4, title: 'Chrome Legion', image: 'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62', tag: 'Free' },
  { id: 'mp5', rank: 5, title: 'Wyrm Hunter', image: 'https://images.pexels.com/photos/5926488/pexels-photo-5926488.jpeg', tag: 'Free' },
];

export const upcomingGames = [
  { id: 'u1', title: 'Aetheris Rising', image: 'https://images.unsplash.com/photo-1700234272632-9f7a43b84e1c', releaseDate: 'Aug 12, 2025' },
  { id: 'u2', title: 'Silent Dominion', image: 'https://images.unsplash.com/photo-1634585738250-09ee92cae0f8', releaseDate: 'Sep 03, 2025' },
  { id: 'u3', title: 'Ironclad Saga', image: 'https://images.pexels.com/photos/12650746/pexels-photo-12650746.jpeg', releaseDate: 'Oct 15, 2025' },
  { id: 'u4', title: 'Quantum Drift', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf', releaseDate: 'Nov 21, 2025' },
  { id: 'u5', title: 'Wildfire', image: 'https://images.unsplash.com/photo-1460194436988-671f763436b7', releaseDate: 'Dec 09, 2025' },
];

export const genres = [
  'Action', 'Adventure', 'Racing', 'Sports', 'Shooter', 'First Person', 'City Builder', 'RPG', 'Puzzle', 'Simulation', 'Strategy', 'Fantasy', 'Sci-Fi', 'Open World', 'Multiplayer', 'Indie'
];

export const navLinks = [
  { label: 'Discover', href: '#' },
  { label: 'Browse', href: '#' },
  { label: 'News', href: '#' },
];

export const topBarLinks = [
  { label: 'Store', href: '#' },
  { label: 'Fab', href: '#' },
  { label: 'Sketchfab', href: '#' },
  { label: 'ArtStation', href: '#' },
  { label: 'RealityScan', href: '#' },
  { label: 'Rad Game Tools', href: '#' },
  { label: 'MetaHuman', href: '#' },
  { label: 'Twinmotion', href: '#' },
  { label: 'Megascans', href: '#' },
  { label: 'Unreal Engine', href: '#' },
];
