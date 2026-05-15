export const DEFAULT_BPM = 90;
export const DEFAULT_BARS_PER_CUE = 4;
export const BEATS_PER_BAR = 4;

export function getSecondsPerBeat(bpm: number): number {
    return 60 / bpm;
}

export function getSecondsPerBar(bpm: number): number {
    return getSecondsPerBeat(bpm) * BEATS_PER_BAR;
}

export function getSecondsPerCue(bpm: number, barsPerCue: number): number {
    return getSecondsPerBar(bpm) * barsPerCue;
}

export function formatCueSeconds(seconds: number): string {
    return `${seconds.toFixed(1)}s`;
}