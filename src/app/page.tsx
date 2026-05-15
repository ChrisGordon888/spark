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

const RECENT_HISTORY_LIMIT = 18;

const modeHeroCopy: Record<
    SparkMode,
    {
        title: string;
        description: string;
        enterLabel: string;
        actionLabel: string;
        enterHref: string;
    }
> = {
    rhyme: {
        title: "Find a word. Build the line.",
        description:
            "Get focused rhymes, slant words, lanes, and angles when you need a fast way into the next idea.",
        enterLabel: "Open Rhyme",
        actionLabel: "Spark Rhyme",
        enterHref: "#spark-console",
    },
    freestyle: {
        title: "Find the pocket. Spark your bars.",
        description:
            "Tap the tempo, follow the pulse, and let fresh cue words rotate by bars while you stay in flow.",
        enterLabel: "Enter Flow",
        actionLabel: "Spark Cue",
        enterHref: "#flow-cue-pulse",
    },
    challenge: {
        title: "Train your instincts. Keep flowing.",
        description:
            "Get a word set, use every cue, and practice finishing the take without stopping for perfection.",
        enterLabel: "Start Challenge",
        actionLabel: "New Challenge",
        enterHref: "#spark-console",
    },
    songStarter: {
        title: "Start with the thread. Follow the feeling.",
        description:
            "Use the thread, spark word, and lane to find a clear direction for a hook, verse, or first line.",
        enterLabel: "Start Signal",
        actionLabel: "New Signal",
        enterHref: "#spark-console",
    },
};

export default function Home() {
    const [activeMode, setActiveMode] = useState<SparkMode>("freestyle");
    const [recentClusterIds, setRecentClusterIds] = useState<string[]>([]);
    const [recentCoreWords, setRecentCoreWords] = useState<string[]>([]);
    const [cluster, setCluster] = useState<RhymeCluster>(() =>
        getRandomCluster()
    );

    const heroCopy = modeHeroCopy[activeMode];

    function handleSpark() {
        setCluster((currentCluster) => {
            const updatedRecentIds = [
                currentCluster.id,
                ...recentClusterIds,
            ].slice(0, RECENT_HISTORY_LIMIT);

            const updatedRecentCoreWords = [
                currentCluster.coreWord,
                ...recentCoreWords,
            ].slice(0, RECENT_HISTORY_LIMIT);

            const shouldPreferCurrentLane = activeMode === "freestyle";

            const nextCluster = getFreshRandomCluster({
                recentClusterIds: updatedRecentIds,
                recentCoreWords: updatedRecentCoreWords,
                preferredTopics: shouldPreferCurrentLane
                    ? currentCluster.topics
                    : [],
            });

            setRecentClusterIds(
                [nextCluster.id, ...updatedRecentIds].slice(
                    0,
                    RECENT_HISTORY_LIMIT
                )
            );

            setRecentCoreWords(
                [nextCluster.coreWord, ...updatedRecentCoreWords].slice(
                    0,
                    RECENT_HISTORY_LIMIT
                )
            );

            return nextCluster;
        });
    }

    function handleModeChange(mode: SparkMode) {
        setActiveMode(mode);
    }

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-black px-4 py-4 text-zinc-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(167,139,250,0.22),transparent_34%),radial-gradient(circle_at_100%_30%,rgba(124,58,237,0.12),transparent_28%)]" />
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

            <section className="relative mx-auto w-full max-w-md space-y-3.5">
                <header className="space-y-3 px-1 pt-2">
                    <nav className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-[0.45em] text-violet-300">
                            Spark
                        </p>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/10 text-xs font-bold text-violet-100">
                            ✦
                        </div>
                    </nav>

                    <div className="space-y-2.5">
                        <h1 className="max-w-sm text-[2rem] font-semibold leading-[1.08] tracking-tight text-white">
                            {heroCopy.title}
                        </h1>

                        <p className="max-w-sm text-sm leading-6 text-zinc-400">
                            {heroCopy.description}
                        </p>
                    </div>
                </header>

                <ModeSelector
                    modes={sparkModes}
                    activeMode={activeMode}
                    onModeChange={handleModeChange}
                />

                <a
                    href={heroCopy.enterHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300 transition hover:border-violet-300/30 hover:bg-violet-300/10 hover:text-violet-100"
                >
                    {heroCopy.enterLabel}
                    <span className="text-violet-300">↓</span>
                </a>

                <section
                    id="spark-console"
                    className="scroll-mt-4 space-y-4 pt-2"
                >
                    <SparkCard
                        cluster={cluster}
                        mode={activeMode}
                        onSpark={handleSpark}
                        actionLabel={heroCopy.actionLabel}
                    />

                    <div className="sticky bottom-0 -mx-4 hidden bg-gradient-to-t from-black via-black/95 to-transparent px-4 pb-4 pt-3 sm:block">
                        <SparkButton onClick={handleSpark}>
                            {heroCopy.actionLabel}
                        </SparkButton>
                    </div>
                </section>
            </section>
        </main>
    );
}