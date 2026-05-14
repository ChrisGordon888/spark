import type { RhymeCluster } from "@/lib/types";
import { rhymeClusters } from "@/data/rhymeClusters";

export function getRandomCluster(): RhymeCluster {
  const randomIndex = Math.floor(Math.random() * rhymeClusters.length);
  return rhymeClusters[randomIndex];
}