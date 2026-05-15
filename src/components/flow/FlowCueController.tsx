"use client";

import { useFlowPulse } from "@/hooks/useFlowPulse";
import {
    DEFAULT_BARS_PER_CUE,
    DEFAULT_BPM,
    formatCueSeconds,
    getSecondsPerCue,
} from "@/lib/timing";

type FlowCueControllerProps = {
    coreWord: string;
    onNextCue?: () => void;
};

export function FlowCueController({
    coreWord,
    onNextCue,
}: FlowCueControllerProps) {
    const bpm = DEFAULT_BPM;
    const barsPerCue = DEFAULT_BARS_PER_CUE;
    const secondsPerCue = getSecondsPerCue(bpm, barsPerCue);

    const { isPlaying, progress, play, pause, reset, nextCue } = useFlowPulse({
        bpm,
        barsPerCue,
        onCueComplete: onNextCue,
    });

    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-violet-200/70">
                        Cue Pulse
                    </p>

                    <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-white">
                        {coreWord}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                        New cue every {barsPerCue} bars at {bpm} BPM.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-right">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                        Pulse
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-200">
                        {bpm} BPM
                    </p>
                    <p className="text-xs text-zinc-500">
                        {formatCueSeconds(secondsPerCue)}
                    </p>
                </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full rounded-full bg-violet-300 transition-[width]"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                    type="button"
                    onClick={isPlaying ? pause : play}
                    className="rounded-full bg-violet-300 px-3 py-2 text-xs font-bold text-black transition hover:bg-violet-200 active:scale-[0.98]"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>

                <button
                    type="button"
                    onClick={nextCue}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/[0.08] active:scale-[0.98]"
                >
                    Next Cue
                </button>

                <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-400 transition hover:bg-white/[0.08] active:scale-[0.98]"
                >
                    Reset
                </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-500">
                Open-ended flow. Match the instrumental, then let Spark rotate
                cues every few bars.
            </p>
        </div>
    );
}