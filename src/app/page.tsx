"use client";

import { useState } from "react";
import { SparkButton } from "@/components/spark/SparkButton";
import { SparkCard } from "@/components/spark/SparkCard";
import { getRandomCluster } from "@/lib/sparkEngine";
import type { RhymeCluster } from "@/lib/types";

export default function Home() {
  const [cluster, setCluster] = useState<RhymeCluster>(() => getRandomCluster());

  function handleSpark() {
    setCluster(getRandomCluster());
  }

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-zinc-100">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-between">
        <div className="space-y-8">
          <header className="space-y-3 pt-6">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-violet-300">
              Spark
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white">
                Ignite your next line.
              </h1>

              <p className="text-base leading-7 text-zinc-400">
                A lightweight creative momentum app for rappers, songwriters,
                freestylers, and creators.
              </p>
            </div>
          </header>

          <SparkCard cluster={cluster} />
        </div>

        <SparkButton onClick={handleSpark} className="mt-8">
          Spark Again
        </SparkButton>
      </section>
    </main>
  );
}