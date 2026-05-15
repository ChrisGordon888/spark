"use client";

import { useState } from "react";
import { TapTempo } from "@/components/flow/TapTempo";
import { useFlowPulse } from "@/hooks/useFlowPulse";
import {
    DEFAULT_BARS_PER_CUE,
    DEFAULT_BPM,
    formatCueSeconds,
    getSecondsPerCue,
} from "@/lib/timing";

const MIN_BPM = 60;
const MAX_BPM = 200;
const BEATS_PER_BAR = 4;
const BAR_OPTIONS = [2, 4, 8] as const;
const PULSE_OPTIONS = ["off", "subtle", "strong"] as const;

type PulseMode = (typeof PULSE_OPTIONS)[number];

type FlowCueControllerProps = {
    coreWord: string;
    onNextCue?: () => void;
};

export function FlowCueController({
    coreWord,
    onNextCue,
}: FlowCueControllerProps) {
    const [bpmInput, setBpmInput] = useState(String(DEFAULT_BPM));
    const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
    const [barsPerCue, setBarsPerCue] = useState<number>(DEFAULT_BARS_PER_CUE);
    const [pulseMode, setPulseMode] = useState<PulseMode>("subtle");

    const secondsPerCue = getSecondsPerCue(bpm, barsPerCue);

    const { isPlaying, elapsedMs, play, pause, reset, nextCue } = useFlowPulse({
        bpm,
        barsPerCue,
        onCueComplete: onNextCue,
    });

    const beatInfo = getBeatInfo({
        elapsedMs,
        bpm,
        barsPerCue,
    });

    function handleBpmChange(value: string) {
        setBpmInput(value);

        const parsedValue = Number(value);

        if (
            !Number.isNaN(parsedValue) &&
            parsedValue >= MIN_BPM &&
            parsedValue <= MAX_BPM
        ) {
            setBpm(parsedValue);
        }
    }

    function handleBpmBlur() {
        const parsedValue = Number(bpmInput);

        if (Number.isNaN(parsedValue)) {
            applyBpm(DEFAULT_BPM);
            return;
        }

        const clampedBpm = Math.min(
            MAX_BPM,
            Math.max(MIN_BPM, Math.round(parsedValue))
        );

        applyBpm(clampedBpm);
    }

    function applyBpm(nextBpm: number) {
        const clampedBpm = Math.min(
            MAX_BPM,
            Math.max(MIN_BPM, Math.round(nextBpm))
        );

        setBpm(clampedBpm);
        setBpmInput(String(clampedBpm));
    }

    return (
        <div
            id="flow-cue-pulse"
            className="scroll-mt-4 rounded-[1.5rem] border border-white/10 bg-black/30 p-4"
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-violet-200/70">
                        Cue Pulse
                    </p>

                    <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-white">
                        {coreWord}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-zinc-500">
                        {bpm} BPM · cue changes every {barsPerCue} bars ·{" "}
                        {formatCueSeconds(secondsPerCue)}
                    </p>
                </div>

                <PulseLight
                    isPlaying={isPlaying}
                    beatInfo={beatInfo}
                    mode={pulseMode}
                />
            </div>

            <BeatBarStatus
                isPlaying={isPlaying}
                beatInfo={beatInfo}
                barsPerCue={barsPerCue}
            />

            <details className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                        Flow Settings
                    </span>

                    <span className="text-xs text-violet-300">
                        BPM · Bars · Pulse
                    </span>
                </summary>

                <div className="mt-3 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <label
                            htmlFor="flow-bpm"
                            className="mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500"
                        >
                            BPM
                        </label>

                        <input
                            id="flow-bpm"
                            type="number"
                            min={MIN_BPM}
                            max={MAX_BPM}
                            value={bpmInput}
                            onChange={(event) =>
                                handleBpmChange(event.target.value)
                            }
                            onBlur={handleBpmBlur}
                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base font-bold text-white outline-none transition focus:border-violet-300/60"
                            inputMode="numeric"
                        />

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                            Match your instrumental. Range: {MIN_BPM}–{MAX_BPM}.
                        </p>
                    </div>

                    <TapTempo onApplyBpm={applyBpm} />

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                            Cue Changes Every
                        </p>

                        <div className="grid grid-cols-3 gap-2">
                            {BAR_OPTIONS.map((option) => {
                                const isActive = option === barsPerCue;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setBarsPerCue(option)}
                                        className={`rounded-full px-3 py-2 text-xs font-bold transition active:scale-[0.98] ${
                                            isActive
                                                ? "bg-violet-300 text-black"
                                                : "border border-white/10 bg-black/30 text-zinc-300 hover:bg-white/[0.06]"
                                        }`}
                                    >
                                        {option} Bars
                                    </button>
                                );
                            })}
                        </div>

                        <p className="mt-2 text-xs leading-5 text-zinc-500">
                            The light counts beats 1–4. Spark rotates words
                            after the selected number of bars.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                        <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                            Light Pulse
                        </p>

                        <div className="grid grid-cols-3 gap-2">
                            {PULSE_OPTIONS.map((option) => {
                                const isActive = option === pulseMode;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setPulseMode(option)}
                                        className={`rounded-full px-3 py-2 text-xs font-bold capitalize transition active:scale-[0.98] ${
                                            isActive
                                                ? "bg-violet-300 text-black"
                                                : "border border-white/10 bg-black/30 text-zinc-300 hover:bg-white/[0.06]"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </details>

            <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                    type="button"
                    onClick={isPlaying ? pause : play}
                    className="rounded-full bg-violet-300 px-3 py-2 text-xs font-bold text-black transition hover:bg-violet-200 active:scale-[0.98]"
                >
                    {isPlaying ? "Pause" : "Start"}
                </button>

                <button
                    type="button"
                    onClick={nextCue}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/[0.08] active:scale-[0.98]"
                >
                    Cue
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
                Beat 1 starts each bar. Bar 1 starts the next cue cycle.
            </p>
        </div>
    );
}

type BeatInfo = {
    beatInBar: number;
    barInCue: number;
    beatProgress: number;
    isDownbeat: boolean;
    isCueDownbeat: boolean;
};

function getBeatInfo({
    elapsedMs,
    bpm,
    barsPerCue,
}: {
    elapsedMs: number;
    bpm: number;
    barsPerCue: number;
}): BeatInfo {
    const beatDurationMs = 60000 / bpm;
    const beatIndex = Math.floor(elapsedMs / beatDurationMs);
    const beatProgress = (elapsedMs % beatDurationMs) / beatDurationMs;

    const beatInBar = (beatIndex % BEATS_PER_BAR) + 1;
    const barIndex = Math.floor(beatIndex / BEATS_PER_BAR);
    const barInCue = (barIndex % barsPerCue) + 1;

    const isDownbeat = beatInBar === 1;
    const isCueDownbeat = isDownbeat && barInCue === 1;

    return {
        beatInBar,
        barInCue,
        beatProgress,
        isDownbeat,
        isCueDownbeat,
    };
}

function BeatBarStatus({
    isPlaying,
    beatInfo,
    barsPerCue,
}: {
    isPlaying: boolean;
    beatInfo: BeatInfo;
    barsPerCue: number;
}) {
    return (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-black/30 p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
                        Beat
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                        {isPlaying ? beatInfo.beatInBar : "—"}
                    </p>
                    <p className="text-xs text-zinc-500">of 4</p>
                </div>

                <div className="rounded-2xl bg-black/30 p-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
                        Bar
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                        {isPlaying ? beatInfo.barInCue : "—"}
                    </p>
                    <p className="text-xs text-zinc-500">of {barsPerCue}</p>
                </div>
            </div>

            <div className="mt-3 flex gap-1">
                {Array.from({ length: barsPerCue }).map((_, index) => {
                    const barNumber = index + 1;
                    const isActive =
                        isPlaying && barNumber === beatInfo.barInCue;

                    return (
                        <div
                            key={barNumber}
                            className={`h-1.5 flex-1 rounded-full transition ${
                                isActive ? "bg-violet-300" : "bg-white/10"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function PulseLight({
    isPlaying,
    beatInfo,
    mode,
}: {
    isPlaying: boolean;
    beatInfo: BeatInfo;
    mode: PulseMode;
}) {
    const isOff = mode === "off";

    const pulseFalloff = Math.pow(1 - beatInfo.beatProgress, 3);

    const baseStrength = mode === "strong" ? 1.15 : 0.55;
    const downbeatBoost = beatInfo.isCueDownbeat
        ? 1.1
        : beatInfo.isDownbeat
        ? 0.55
        : 0;

    const scale =
        isPlaying && !isOff
            ? 1 + pulseFalloff * (baseStrength + downbeatBoost)
            : 1;

    const glowOpacity = isOff
        ? 0.12
        : isPlaying
        ? 0.2 + pulseFalloff * (beatInfo.isCueDownbeat ? 0.75 : 0.45)
        : 0.2;

    const coreScale =
        isPlaying && !isOff
            ? 1 + pulseFalloff * (beatInfo.isCueDownbeat ? 0.9 : 0.45)
            : 1;

    return (
        <div
            className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border bg-white/[0.03] transition ${
                beatInfo.isCueDownbeat && isPlaying
                    ? "border-violet-200/60"
                    : beatInfo.isDownbeat && isPlaying
                    ? "border-violet-300/30"
                    : "border-white/10"
            }`}
        >
            {!isOff ? (
                <div
                    className="absolute h-11 w-11 rounded-full bg-violet-300 blur-2xl transition-transform duration-75"
                    style={{
                        opacity: glowOpacity,
                        transform: `scale(${scale})`,
                    }}
                />
            ) : null}

            <div
                className={`relative flex h-7 w-7 items-center justify-center rounded-full transition duration-75 ${
                    isPlaying
                        ? "bg-violet-200 text-black shadow-[0_0_24px_rgba(196,181,253,0.9)]"
                        : "bg-zinc-600 text-zinc-900"
                }`}
                style={{
                    transform: `scale(${coreScale})`,
                }}
            >
                <span className="text-[0.65rem] font-black">
                    {isPlaying ? beatInfo.beatInBar : "•"}
                </span>
            </div>

            {isPlaying && beatInfo.isCueDownbeat && !isOff ? (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-violet-200 shadow-[0_0_16px_rgba(196,181,253,0.9)]" />
            ) : null}
        </div>
    );
}