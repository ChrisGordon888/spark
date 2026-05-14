import type { RhymeCluster } from "@/lib/types";

type SparkCardProps = {
  cluster: RhymeCluster;
};

export function SparkCard({ cluster }: SparkCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/30 backdrop-blur">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
          Core Word
        </p>

        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs capitalize text-violet-200">
          {cluster.mood}
        </span>
      </div>

      <h2 className="mb-8 text-center text-5xl font-bold tracking-tight text-white">
        {cluster.coreWord}
      </h2>

      <div className="space-y-5">
        <WordChipGroup title="Rhymes" words={cluster.rhymes} variant="primary" />

        <WordChipGroup
          title="Near Rhymes"
          words={cluster.nearRhymes}
          variant="secondary"
        />
      </div>
    </div>
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
      ? "rounded-full bg-white px-3 py-1.5 text-sm font-medium text-black"
      : "rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300";

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
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