import { FlowCueController } from "@/components/flow/FlowCueController";
import type { RhymeCluster, SparkMode } from "@/lib/types";

type SparkCardProps = {
    cluster: RhymeCluster;
    mode: SparkMode;
    onSpark?: () => void;
    actionLabel?: string;
};

export function SparkCard({
    cluster,
    mode,
    onSpark,
    actionLabel = "Spark Again",
}: SparkCardProps) {
    const cardCopy = getCardCopy(mode);

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.16),rgba(24,24,27,0.35)_38%,rgba(0,0,0,0.85)_100%)] p-4 shadow-2xl shadow-violet-950/30 sm:p-5">
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl" />

            <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-zinc-500">
                            {cardCopy.signalLabel}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                            {cardCopy.subtitle}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <SignalChip label={cluster.mood} tone="violet" />
                        <SignalChip label={cluster.energy} tone="zinc" />
                    </div>
                </div>

                {mode === "songStarter" ? (
                    <SongStarterLead
                        cluster={cluster}
                        onSpark={onSpark}
                        actionLabel={actionLabel}
                    />
                ) : (
                    <CoreWordPanel
                        cluster={cluster}
                        onSpark={onSpark}
                        actionLabel={actionLabel}
                    />
                )}

                <div className="mt-5 space-y-4">
                    {mode === "songStarter" ? (
                        <>
                            <AnglesBlock cluster={cluster} defaultOpen />
                            <LaneBlock cluster={cluster} />
                            <WordChipGroup
                                title="Rhyme Fuel"
                                words={[
                                    ...cluster.rhymes.slice(0, 3),
                                    ...cluster.nearRhymes.slice(0, 2),
                                ]}
                                variant="primary"
                            />
                        </>
                    ) : mode === "challenge" ? (
                        <>
                            <ChallengeWords cluster={cluster} />
                            <ChallengeRule />
                            <CoreWordMini cluster={cluster} />
                            <LaneBlock cluster={cluster} />
                            <AnglesBlock cluster={cluster} />
                        </>
                    ) : mode === "freestyle" ? (
                        <>
                            <FlowCueController
                                coreWord={cluster.coreWord}
                                onNextCue={onSpark}
                            />
                            <WordChipGroup
                                title="Rhymes"
                                words={cluster.rhymes}
                                variant="primary"
                            />
                            <WordChipGroup
                                title="Near / Slant"
                                words={[
                                    ...cluster.nearRhymes.slice(0, 3),
                                    ...cluster.slantWords.slice(0, 3),
                                ]}
                                variant="secondary"
                            />
                            <LaneBlock cluster={cluster} />
                            <AnglesBlock cluster={cluster} />
                        </>
                    ) : (
                        <>
                            <WordChipGroup
                                title="Rhymes"
                                words={cluster.rhymes}
                                variant="primary"
                            />
                            <WordChipGroup
                                title="Near / Slant"
                                words={[
                                    ...cluster.nearRhymes.slice(0, 3),
                                    ...cluster.slantWords.slice(0, 3),
                                ]}
                                variant="secondary"
                            />
                            <LaneBlock cluster={cluster} />
                            <AnglesBlock cluster={cluster} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function CoreWordPanel({
    cluster,
    onSpark,
    actionLabel,
}: {
    cluster: RhymeCluster;
    onSpark?: () => void;
    actionLabel: string;
}) {
    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-5 text-center">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-violet-200/70">
                Core Word
            </p>

            <h2 className="text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl">
                {cluster.coreWord}
            </h2>

            <p className="mt-2 text-[0.65rem] capitalize tracking-[0.25em] text-zinc-600">
                {cluster.difficulty} difficulty
            </p>

            {onSpark ? (
                <button
                    type="button"
                    onClick={onSpark}
                    className="mt-4 w-full rounded-full bg-violet-300 px-4 py-3 text-sm font-bold text-black shadow-lg shadow-violet-950/40 transition hover:bg-violet-200 active:scale-[0.98] sm:hidden"
                >
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}

function SongStarterLead({
    cluster,
    onSpark,
    actionLabel,
}: {
    cluster: RhymeCluster;
    onSpark?: () => void;
    actionLabel: string;
}) {
    const primaryAngle = cluster.relatedTopics[0];

    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-5">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.35em] text-violet-200/70">
                Creative Signal
            </p>

            <h2 className="text-3xl font-black tracking-[-0.04em] text-white">
                {capitalize(cluster.coreWord)} is the doorway.
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
                Follow the feeling before the structure. Let the first image,
                phrase, or memory pull the idea forward.
            </p>

            {primaryAngle ? (
                <div className="mt-4 rounded-2xl border border-violet-300/10 bg-violet-300/[0.04] p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
                        First Thread
                    </p>
                    <p className="mt-2 text-sm leading-5 text-zinc-200">
                        {primaryAngle}
                    </p>
                </div>
            ) : null}

            {onSpark ? (
                <button
                    type="button"
                    onClick={onSpark}
                    className="mt-4 w-full rounded-full bg-violet-300 px-4 py-3 text-sm font-bold text-black shadow-lg shadow-violet-950/40 transition hover:bg-violet-200 active:scale-[0.98] sm:hidden"
                >
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}

function ChallengeWords({ cluster }: { cluster: RhymeCluster }) {
    const words = [
        cluster.coreWord,
        ...cluster.rhymes.slice(0, 2),
        ...cluster.nearRhymes.slice(0, 2),
    ];

    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.35em] text-violet-200/70">
                Use These
            </p>

            <div className="flex flex-wrap gap-2">
                {words.map((word) => (
                    <span
                        key={word}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-black"
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ChallengeRule() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                Rule
            </p>
            <p className="mt-2 text-sm leading-5 text-zinc-300">
                Use all five words in one take. Keep moving even if the line is
                imperfect.
            </p>
        </div>
    );
}


function CoreWordMini({ cluster }: { cluster: RhymeCluster }) {
    return (
        <div>
            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                Core Word
            </p>
            <p className="text-2xl font-bold text-white">{cluster.coreWord}</p>
        </div>
    );
}

function LaneBlock({ cluster }: { cluster: RhymeCluster }) {
    return (
        <div>
            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                Lane
            </p>

            <div className="flex flex-wrap gap-2">
                {cluster.topics.map((topic) => (
                    <span
                        key={topic}
                        className="rounded-full border border-violet-300/20 bg-violet-300/5 px-3 py-1.5 text-xs capitalize text-violet-100"
                    >
                        {topic}
                    </span>
                ))}
            </div>
        </div>
    );
}

function AnglesBlock({
    cluster,
    defaultOpen = false,
}: {
    cluster: RhymeCluster;
    defaultOpen?: boolean;
}) {
    return (
        <details
            open={defaultOpen}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                    Angles
                </span>

                <span className="text-xs text-violet-300 transition group-open:rotate-180">
                    ↓
                </span>
            </summary>

            <div className="mt-3 space-y-2">
                {cluster.relatedTopics.slice(0, 3).map((topic) => (
                    <p key={topic} className="text-sm leading-5 text-zinc-300">
                        <span className="text-violet-300">↳</span> {topic}
                    </p>
                ))}
            </div>
        </details>
    );
}

function SignalChip({
    label,
    tone,
}: {
    label: string;
    tone: "violet" | "zinc";
}) {
    const className =
        tone === "violet"
            ? "border-violet-400/30 bg-violet-400/10 text-violet-200"
            : "border-white/10 bg-white/[0.03] text-zinc-400";

    return (
        <span
            className={`rounded-full border px-2.5 py-1 text-[0.65rem] capitalize ${className}`}
        >
            {label}
        </span>
    );
}

type WordChipGroupProps = {
    title: string;
    words: string[];
    variant: "primary" | "secondary";
};

function WordChipGroup({ title, words, variant }: WordChipGroupProps) {
    const chipClassName =
        variant === "primary"
            ? "rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-black shadow-sm shadow-white/10"
            : "rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-zinc-300";

    return (
        <div>
            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                {title}
            </p>

            <div className="flex flex-wrap gap-2">
                {words.map((word) => (
                    <span key={word} className={chipClassName}>
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCardCopy(mode: SparkMode) {
    switch (mode) {
        case "freestyle":
            return {
                signalLabel: "Flow Signal",
                subtitle: "Press play and rotate cues by BPM.",
            };
        case "challenge":
            return {
                signalLabel: "Challenge Signal",
                subtitle: "Use the word set in one take.",
            };
        case "songStarter":
            return {
                signalLabel: "Creative Signal",
                subtitle: "Catch the feeling before it becomes a song.",
            };
        case "rhyme":
        default:
            return {
                signalLabel: "Spark Signal",
                subtitle: "Build from the core word.",
            };
    }
}