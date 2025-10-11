export const data = [
  {
    src: 'https://julianvossandreae.com/wp-content/gallery/currentinventory/438_Contrapposto.jpg',
    id: 'Contrapposto',
    media: [
      'https://julianvossandreae.com/wp-content/gallery/currentinventory/438_Contrapposto.jpg',
      'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/02_2002_LargeFirAlphaHelix_c.jpg',
      'https://julianvossandreae.com/wp-content/gallery/currentinventory/158_Quantum_Nefertiti_5.jpg',
      '/chess.mov',
      'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/379_Superwoman2.jpg',
    ],
  },
  {
    src: 'https://julianvossandreae.com/wp-content/gallery/currentinventory/158_Quantum_Nefertiti_5.jpg',
    id: 'Nefertiti',
    media: [
      'https://julianvossandreae.com/wp-content/gallery/currentinventory/158_Quantum_Nefertiti_5.jpg',
      '/chess.mov',
      'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/02_2002_LargeFirAlphaHelix_c.jpg',
      'https://julianvossandreae.com/wp-content/gallery/currentinventory/158_Quantum_Nefertiti_5.jpg',
      'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/379_Superwoman2.jpg',
    ],
  },
] as const

export type SculptureData = (typeof data)[number]
