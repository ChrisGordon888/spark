"use client";

import { useState } from "react";
import { ModeSelector } from "@/components/spark/ModeSelector";
import { SparkButton } from "@/components/spark/SparkButton";
import { SparkCard } from "@/components/spark/SparkCard";
import {
  getRandomCluster,
  getRandomClusterExcluding,
  sparkModes,
} from "@/lib/sparkEngine";
import type { RhymeCluster, SparkMode } from "@/lib/types";

export default function Home() {
  const [activeMode, setActiveMode] = useState<SparkMode>("rhyme");
  const [cluster, setCluster] = useState<RhymeCluster>(() => getRandomCluster());

  function handleSpark() {
    setCluster((currentCluster) =>
      getRandomClusterExcluding(currentCluster.id)
    );
  }

  function handleModeChange(mode: SparkMode) {
    setActiveMode(mode);
    setCluster((currentCluster) =>
      getRandomClusterExcluding(currentCluster.id)
    );
  }

  const buttonLabel =
    activeMode === "rhyme"
      ? "Spark Again"
      : activeMode === "freestyle"
      ? "Preview Flow"
      : activeMode === "challenge"
      ? "Preview Challenge"
      : "Preview Starter";

  return (
    <main className="min-h-screen bg-black px-4 py-4 text-zinc-100">
      <section className="mx-auto w-full max-w-md space-y-4">
        <header className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-300">
              Spark
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Ignite your next line.
            </h1>
          </div>

          <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-violet-200">
            V1
          </span>
        </header>

        <p className="text-sm leading-6 text-zinc-400">
          Fast rhyme clusters, flow prompts, and creative momentum for artists
          in motion.
        </p>

        <ModeSelector
          modes={sparkModes}
          activeMode={activeMode}
          onModeChange={handleModeChange}
        />

        <SparkCard cluster={cluster} />

        <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-black via-black/95 to-transparent px-4 pb-4 pt-3">
          <SparkButton onClick={handleSpark}>{buttonLabel}</SparkButton>
        </div>
      </section>
    </main>
  );
}