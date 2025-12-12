// Asset map for BrokeCoder
// Centralizes main key art, character portraits, and location art. The main hero image (broke_coder_main.*)
// is used for title and loading screens, while /media/characters feeds dialogue portraits and roster cards.

const MAIN_IMAGE_CANDIDATES = [
  "./media/game/brokecodermain.png",
  "./media/game/broke_coder_main.png",
  "./media/game/broke_coder_main.jpg",
  "./media/game/broke_coder_main.jpeg",
  "./media/game/loading screen-phone-era.png",
  "./media/game/brokecodermain.jpg",
  "./media/game/brokecodermain.jpeg",
];

export const CHARACTER_IMAGES = [
  { id: "charlie", name: "Charlie (Broke Coder)", path: "./media/characters/hero.png" },
  { id: "charlie_portrait", name: "Charlie - Phone Grind", path: "./media/characters/main character portrait.png" },
  { id: "title_art", name: "Title Screen Art", path: "./media/characters/Main title screen art.png" },
  { id: "zoom_lady", name: "Zoom Lady", path: "./media/characters/zoom lady npc.png" },
  { id: "raccoon", name: "Raccoon Mini Boss", path: "./media/characters/raccoon mini boss.png" },
  { id: "meth_samurai", name: "Meth Samurai Enemy", path: "./media/characters/meth samurai enemy.png" },
  { id: "crack_zombie", name: "Crack Zombie Enemy", path: "./media/characters/crack zombie enemy.png" },
  { id: "disgruntled_weird", name: "Disgruntled Weird Guy", path: "./media/characters/disgruntedweirdguy.png" },
  { id: "weird_guy", name: "Weird Guy", path: "./media/characters/weirdguy.png" },
  { id: "weird_hacker", name: "Weird Hacker", path: "./media/characters/weirdhacker.png" },
  { id: "weird_lazy", name: "Weird Lazy Guy", path: "./media/characters/weirdlazyguy.png" },
  { id: "weird_party", name: "Weird Party Guy", path: "./media/characters/weirdpartyguy.png" },
  { id: "woman1", name: "Rooftop Mentor", path: "./media/characters/woman1.png" },
  { id: "woman2", name: "Motel Manager", path: "./media/characters/woman2.png" },
  { id: "woman3", name: "Planet Fitness Guardian", path: "./media/characters/woman3.png" },
  { id: "woman4", name: "Gig App Recruiter", path: "./media/characters/woman4.png" },
];

// Default to the expected broke_coder_main.* hero art, but resolve at runtime to whatever exists.
export const GAME_MAIN_IMAGE = MAIN_IMAGE_CANDIDATES[0];

export const LOCATION_IMAGES = {
  motel: "./media/locations/motel room (player base early game) season 3.png",
  planet_fitness: "./media/locations/planet fitness safe zone.png",
  client_house: "./media/locations/first client house background.png",
  alley: "./media/game/brokecodermain.png",
  coffee: "./media/game/brokecodermain.png",
  electronics: "./media/game/brokecodermain.png",
};

export function getCharacterById(id) {
  return CHARACTER_IMAGES.find((c) => c.id === id) || null;
}

function tryLoadImage(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ok: true, path });
    img.onerror = () => resolve({ ok: false, path });
    img.src = path;
  });
}

export async function resolveMainImage() {
  for (const path of MAIN_IMAGE_CANDIDATES) {
    const result = await tryLoadImage(path);
    if (result.ok) return result.path;
  }
  return MAIN_IMAGE_CANDIDATES[0];
}

export function preloadImages(paths, onProgress) {
  const uniquePaths = Array.from(new Set(paths));
  if (!uniquePaths.length) return Promise.resolve();

  return new Promise((resolve) => {
    let loaded = 0;
    const total = uniquePaths.length;

    const markLoaded = () => {
      loaded += 1;
      const percent = Math.round((loaded / total) * 100);
      if (onProgress) onProgress(percent);
      if (loaded >= total) resolve();
    };

    uniquePaths.forEach((path) => {
      const img = new Image();
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = path;
    });
  });
}
