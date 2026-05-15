"use client";

import { useMemo, useState } from "react";

const MIN_BPM = 60;
const MAX_BPM = 200;
const MAX_TAPS = 8;
const TAP_RESET_MS = 2500;

type TapTempoProps = {
    onApplyBpm: (bpm: number) => void;
};

export function TapTempo({ onApplyBpm }: TapTempoProps) {
    const [tapTimes, setTapTimes] = useState<number[]>([]);

    const estimatedBpm = useMemo(() => {
        if (tapTimes.length < 2) {
            return null;
        }

        const intervals = tapTimes
            .slice(1)
            .map((tapTime, index) => tapTime - tapTimes[index])
            .filter((interval) => interval > 0);

        if (intervals.length === 0) {
            return null;
        }

        const averageInterval =
            intervals.reduce((total, interval) => total + interval, 0) /
            intervals.length;

        const bpm = Math.round(60000 / averageInterval);

        if (bpm < MIN_BPM || bpm > MAX_BPM) {
            return null;
        }

        return bpm;
    }, [tapTimes]);

    function handleTap() {
        const now = Date.now();
        const previousTap = tapTimes[tapTimes.length - 1];
        const shouldReset =
            previousTap !== undefined && now - previousTap > TAP_RESET_MS;

        setTapTimes((currentTapTimes) => {
            if (shouldReset) {
                return [now];
            }

            return [...currentTapTimes, now].slice(-MAX_TAPS);
        });
    }

    function handleReset() {
        setTapTimes([]);
    }

    function handleApply() {
        if (estimatedBpm === null) {
            return;
        }

        onApplyBpm(estimatedBpm);
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500">
                        Tap Tempo
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Tap along with the beat to estimate BPM.
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                        Estimate
                    </p>

                    <p className="mt-1 text-lg font-black text-white">
                        {estimatedBpm ?? "—"}
                    </p>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-2">
                <button
                    type="button"
                    onClick={handleTap}
                    className="rounded-full bg-violet-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-violet-200 active:scale-[0.98]"
                >
                    Tap Beat
                </button>

                <button
                    type="button"
                    onClick={handleApply}
                    disabled={estimatedBpm === null}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/[0.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Use
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-400 transition hover:bg-white/[0.08] active:scale-[0.98]"
                >
                    Reset
                </button>
            </div>

            <div className="mt-3 flex gap-1">
                {Array.from({ length: MAX_TAPS }).map((_, index) => {
                    const isActive = index < tapTimes.length;

                    return (
                        <div
                            key={index}
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