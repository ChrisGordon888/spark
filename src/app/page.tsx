"use client";

import { useState } from "react";
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

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/30 backdrop-blur">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                Core Word
              </p>

              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs capitalize text-violet-200">
                {cluster.mood}
              </span>
            </div>

            <h2 className="mb-8 text-center text-5xl font-bold tracking-tight text-white">
              {cluster.coreWord}
            </h2>

            <div className="space-y-5">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Rhymes
                </p>

                <div className="flex flex-wrap gap-2">
                  {cluster.rhymes.map((word) => (
                    <span
                      key={word}
                      className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Near Rhymes
                </p>

                <div className="flex flex-wrap gap-2">
                  {cluster.nearRhymes.map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpark}
          className="mt-8 w-full rounded-full bg-violet-300 px-6 py-4 text-base font-bold text-black shadow-lg shadow-violet-950/40 transition hover:scale-[1.02] hover:bg-violet-200 active:scale-[0.98]"
        >
          Spark Again
        </button>
      </section>
    </main>
  );
}