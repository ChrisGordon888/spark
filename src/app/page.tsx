"use client";

import { useState } from "react";
import { ModeSelector } from "@/components/spark/ModeSelector";
import { SparkButton } from "@/components/spark/SparkButton";
import { SparkCard } from "@/components/spark/SparkCard";
import {
    getFreshRandomCluster,
    getRandomCluster,
    sparkModes,
} from "@/lib/sparkEngine";
import type { RhymeCluster, SparkMode } from "@/lib/types";

export default function Home() {
    const [activeMode, setActiveMode] = useState<SparkMode>("rhyme");
    const [recentClusterIds, setRecentClusterIds] = useState<string[]>([]);
    const [cluster, setCluster] = useState<RhymeCluster>(() => getRandomCluster());

    function handleSpark() {
        setCluster((currentCluster) => {
            const updatedRecentIds = [currentCluster.id, ...recentClusterIds].slice(0, 12);
            const nextCluster = getFreshRandomCluster(updatedRecentIds);

            setRecentClusterIds([nextCluster.id, ...updatedRecentIds].slice(0, 12));

            return nextCluster;
        });
    }

    function handleModeChange(mode: SparkMode) {
        setActiveMode(mode);
    }

    const buttonLabel = "Spark";

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-black px-4 py-4 text-zinc-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(167,139,250,0.22),transparent_34%),radial-gradient(circle_at_100%_30%,rgba(124,58,237,0.12),transparent_28%)]" />
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

            <section className="relative mx-auto w-full max-w-md space-y-4">
                <header className="space-y-4 px-1 pt-2">
                    <nav className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-[0.45em] text-violet-300">
                            Spark
                        </p>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/10 text-xs font-bold text-violet-100">
                            ✦
                        </div>
                    </nav>

                    <div className="space-y-3">
                        <h1 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white">
                            Ignite your next line.
                        </h1>

                        <p className="max-w-sm text-sm leading-6 text-zinc-400">
                            Choose a mode, enter flow, and generate a creative signal built
                            for the way you are writing.
                        </p>
                    </div>
                </header>

                <ModeSelector
                    modes={sparkModes}
                    activeMode={activeMode}
                    onModeChange={handleModeChange}
                />

                <a
                    href={activeMode === "freestyle" ? "#flow-cue-pulse" : "#spark-console"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300 transition hover:border-violet-300/30 hover:bg-violet-300/10 hover:text-violet-100"
                >
                    Enter Flow
                    <span className="text-violet-300">↓</span>
                </a>

                <section id="spark-console" className="scroll-mt-4 space-y-4 pt-2">
                    <SparkCard
                        cluster={cluster}
                        mode={activeMode}
                        onSpark={handleSpark}
                        actionLabel={buttonLabel}
                    />

                    <div className="sticky bottom-0 -mx-4 hidden bg-gradient-to-t from-black via-black/95 to-transparent px-4 pb-4 pt-3 sm:block">
                        <SparkButton onClick={handleSpark}>{buttonLabel}</SparkButton>
                    </div>
                </section>
            </section>
        </main>
    );
}