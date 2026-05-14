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

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs capitalize text-violet-200">
            {cluster.mood}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-zinc-400">
            {cluster.energy}
          </span>
        </div>
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

        <WordChipGroup
          title="Slant Words"
          words={cluster.slantWords}
          variant="secondary"
        />

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
            Topic Lane
          </p>

          <div className="flex flex-wrap gap-2">
            {cluster.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-violet-300/20 bg-violet-300/5 px-3 py-1.5 text-sm capitalize text-violet-100"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
            Creative Angles
          </p>

          <ul className="space-y-1.5 text-sm leading-6 text-zinc-300">
            {cluster.relatedTopics.map((topic) => (
              <li key={topic}>• {topic}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-center text-xs capitalize tracking-[0.2em] text-zinc-600">
        {cluster.difficulty} difficulty
      </p>
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