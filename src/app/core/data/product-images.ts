const ITEM_IMAGES: Record<string, string> = {
  'sword of valor':       '/images/Bee_Keeper.png',
  'shield of aegis':      '/images/Paladin_Shield.png',
  'potion of healing':    '/images/Healing_Potion.png',
  'mystic wand':          '/images/Magic_Missile.png',
  'ring of invisibility': '/images/Gold_Ring.png',
  'armor of fortitude':   '/images/Palladium_Breastplate.png',
  'boots of speed':       '/images/Hermes_Boots.png',
  'helmet of courage':    '/images/Viking_Helmet.png',
  'cape of shadows':      '/images/Mysterious_Cape.png',
  'gloves of dexterity':  '/images/Feral_glove.png',
};

const FALLBACK_IMAGES = Object.values(ITEM_IMAGES);

export function getItemImage(title: string, id: number): string {
  const key = title.toLowerCase().trim();
  return ITEM_IMAGES[key] ?? FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];
}
