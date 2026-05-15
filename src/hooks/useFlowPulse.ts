"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSecondsPerCue } from "@/lib/timing";

type UseFlowPulseOptions = {
    bpm: number;
    barsPerCue: number;
    onCueComplete?: () => void;
};

export function useFlowPulse({
    bpm,
    barsPerCue,
    onCueComplete,
}: UseFlowPulseOptions) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsedMs, setElapsedMs] = useState(0);

    const lastTickRef = useRef<number | null>(null);
    const onCueCompleteRef = useRef(onCueComplete);

    const cueDurationMs = useMemo(
        () => getSecondsPerCue(bpm, barsPerCue) * 1000,
        [bpm, barsPerCue]
    );

    useEffect(() => {
        onCueCompleteRef.current = onCueComplete;
    }, [onCueComplete]);

    useEffect(() => {
        setElapsedMs(0);
        lastTickRef.current = null;
    }, [bpm, barsPerCue]);

    useEffect(() => {
        if (!isPlaying) {
            lastTickRef.current = null;
            return;
        }

        const intervalId = window.setInterval(() => {
            const now = Date.now();

            if (lastTickRef.current === null) {
                lastTickRef.current = now;
                return;
            }

            const delta = now - lastTickRef.current;
            lastTickRef.current = now;

            setElapsedMs((previousElapsedMs) => {
                const nextElapsedMs = previousElapsedMs + delta;

                if (nextElapsedMs >= cueDurationMs) {
                    onCueCompleteRef.current?.();
                    return nextElapsedMs % cueDurationMs;
                }

                return nextElapsedMs;
            });
        }, 100);

        return () => window.clearInterval(intervalId);
    }, [cueDurationMs, isPlaying]);

    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setElapsedMs(0);
        lastTickRef.current = null;
    }, []);

    const nextCue = useCallback(() => {
        onCueCompleteRef.current?.();
        setElapsedMs(0);
        lastTickRef.current = null;
    }, []);

    const progress = cueDurationMs > 0 ? elapsedMs / cueDurationMs : 0;

    return {
        isPlaying,
        elapsedMs,
        cueDurationMs,
        progress: Math.min(progress, 1),
        play,
        pause,
        reset,
        nextCue,
    };
}