import type { RhymeCluster } from "@/lib/types";

export const rhymeClusters: RhymeCluster[] = [
  {
    id: "pressure",
    coreWord: "pressure",
    rhymes: ["measure", "treasure", "lesser", "weather"],
    nearRhymes: ["pleasure", "forever", "endeavor", "confession"],
    mood: "dark",
  },
  {
    id: "light",
    coreWord: "light",
    rhymes: ["fight", "night", "sight", "flight"],
    nearRhymes: ["alive", "rise", "shine", "divine"],
    mood: "triumphant",
  },
  {
    id: "motion",
    coreWord: "motion",
    rhymes: ["ocean", "devotion", "promotion", "emotion"],
    nearRhymes: ["open", "chosen", "broken", "focused"],
    mood: "reflective",
  },
  {
    id: "flame",
    coreWord: "flame",
    rhymes: ["name", "game", "aim", "claim"],
    nearRhymes: ["pain", "rain", "change", "same"],
    mood: "aggressive",
  },
  {
    id: "alone",
    coreWord: "alone",
    rhymes: ["phone", "zone", "known", "throne"],
    nearRhymes: ["home", "soul", "ghost", "close"],
    mood: "romantic",
  },
];