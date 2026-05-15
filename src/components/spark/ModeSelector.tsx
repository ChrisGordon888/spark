import type { SparkMode, SparkModeOption } from "@/lib/types";

type ModeSelectorProps = {
    modes: SparkModeOption[];
    activeMode: SparkMode;
    onModeChange: (mode: SparkMode) => void;
};

const modeShortLabels: Record<SparkMode, string> = {
    rhyme: "Rhyme",
    freestyle: "Flow",
    challenge: "Challenge",
    songStarter: "Starter",
};

const modeSubLabels: Record<SparkMode, string> = {
    rhyme: "Words",
    freestyle: "Pulse",
    challenge: "Test",
    songStarter: "Idea",
};

const modeSymbols: Record<SparkMode, string> = {
    rhyme: "◇",
    freestyle: "●",
    challenge: "◆",
    songStarter: "✦",
};

export function ModeSelector({
    modes,
    activeMode,
    onModeChange,
}: ModeSelectorProps) {
    return (
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.035] p-1.5 shadow-lg shadow-violet-950/10 backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.12),transparent_45%)]" />

            <div className="relative grid grid-cols-4 gap-1">
                {modes.map((mode) => {
                    const isActive = mode.id === activeMode;

                    return (
                        <button
                            key={mode.id}
                            type="button"
                            onClick={() => onModeChange(mode.id)}
                            aria-pressed={isActive}
                            className={`group relative overflow-hidden rounded-[1.2rem] px-1.5 py-2.5 text-center transition active:scale-[0.97] ${
                                isActive
                                    ? "bg-violet-300 text-black shadow-[0_10px_30px_rgba(109,40,217,0.28)]"
                                    : "text-zinc-500 hover:bg-white/[0.055] hover:text-zinc-200"
                            }`}
                        >
                            {isActive ? (
                                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_48%,rgba(0,0,0,0.08))]" />
                            ) : null}

                            <span className="relative flex flex-col items-center gap-1">
                                <span
                                    className={`text-[0.65rem] leading-none transition ${
                                        isActive
                                            ? "text-black/70"
                                            : "text-violet-300/45 group-hover:text-violet-200/70"
                                    }`}
                                >
                                    {modeSymbols[mode.id]}
                                </span>

                                <span className="text-xs font-bold leading-none">
                                    {modeShortLabels[mode.id]}
                                </span>

                                <span
                                    className={`hidden text-[0.6rem] font-medium uppercase leading-none tracking-[0.12em] sm:block ${
                                        isActive
                                            ? "text-black/55"
                                            : "text-zinc-600 group-hover:text-zinc-400"
                                    }`}
                                >
                                    {modeSubLabels[mode.id]}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}