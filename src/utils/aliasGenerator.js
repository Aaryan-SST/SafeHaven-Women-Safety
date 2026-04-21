const ADJECTIVES = [
  'Brave', 'Swift', 'Calm', 'Bold', 'Wise', 'Kind', 'Fierce', 'Strong',
  'Bright', 'Free', 'Safe', 'Pure', 'Warm', 'Clear', 'True', 'Gentle',
  'Vivid', 'Noble', 'Serene', 'Radiant',
]

const ANIMALS = [
  'Eagle', 'Dove', 'Tiger', 'Lotus', 'Rose', 'Swan', 'Phoenix', 'Sparrow',
  'Deer', 'Flame', 'River', 'Star', 'Moon', 'Ember', 'Storm', 'Cloud',
  'Forest', 'Wave', 'Dawn', 'Bloom',
]

export function generateAlias(seed) {
  // Deterministic hash from seed string
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  const absHash = Math.abs(hash)
  const adj = ADJECTIVES[absHash % ADJECTIVES.length]
  const animal = ANIMALS[Math.floor(absHash / ADJECTIVES.length) % ANIMALS.length]
  const num = (absHash % 9000) + 1000
  return `${adj}${animal}#${num}`
}
