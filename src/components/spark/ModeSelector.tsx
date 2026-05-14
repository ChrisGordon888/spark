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

export function ModeSelector({
  modes,
  activeMode,
  onModeChange,
}: ModeSelectorProps) {
  const activeModeDetails = modes.find((mode) => mode.id === activeMode);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-2 shadow-lg shadow-violet-950/10 backdrop-blur">
      <div className="grid grid-cols-4 gap-1">
        {modes.map((mode) => {
          const isActive = mode.id === activeMode;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`rounded-2xl px-2 py-3 text-center text-xs font-semibold transition active:scale-[0.97] ${
                isActive
                  ? "bg-violet-300 text-black shadow-md shadow-violet-950/30"
                  : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
              }`}
            >
              {modeShortLabels[mode.id]}
            </button>
          );
        })}
      </div>

      <p className="px-2 pb-1 pt-2 text-xs leading-5 text-zinc-500">
        {activeModeDetails?.description}
      </p>
    </div>
  );
}