import type { SparkMode, SparkModeOption } from "@/lib/types";

type ModeSelectorProps = {
  modes: SparkModeOption[];
  activeMode: SparkMode;
  onModeChange: (mode: SparkMode) => void;
};

export function ModeSelector({
  modes,
  activeMode,
  onModeChange,
}: ModeSelectorProps) {
  const activeModeDetails = modes.find((mode) => mode.id === activeMode);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3">
      <label
        htmlFor="spark-mode"
        className="mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-zinc-500"
      >
        Mode
      </label>

      <select
        id="spark-mode"
        value={activeMode}
        onChange={(event) => onModeChange(event.target.value as SparkMode)}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-violet-300/60"
      >
        {modes.map((mode) => (
          <option key={mode.id} value={mode.id} className="bg-black text-white">
            {mode.label}
          </option>
        ))}
      </select>

      <p className="mt-2 text-xs leading-5 text-zinc-500">
        {activeModeDetails?.description}
      </p>
    </div>
  );
}