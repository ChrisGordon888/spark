export type SparkMood =
  | "dark"
  | "focused"
  | "romantic"
  | "aggressive"
  | "reflective"
  | "triumphant"
  | "calm";

export type SparkEnergy =
  | "low"
  | "steady"
  | "urgent"
  | "explosive"
  | "smooth";

export type SparkDifficulty = "easy" | "medium" | "advanced";

export type SparkTopic =
  | "ambition"
  | "pressure"
  | "love"
  | "heartbreak"
  | "growth"
  | "confidence"
  | "survival"
  | "reflection"
  | "night"
  | "legacy"
  | "focus"
  | "healing";

export type SparkMode = "rhyme" | "freestyle" | "challenge" | "songStarter";

export type SparkModeOption = {
  id: SparkMode;
  label: string;
  description: string;
};

export type RhymeCluster = {
  id: string;
  coreWord: string;
  rhymes: string[];
  nearRhymes: string[];
  slantWords: string[];
  relatedTopics: string[];
  mood: SparkMood;
  energy: SparkEnergy;
  difficulty: SparkDifficulty;
  topics: SparkTopic[];
};

export type FlowSettings = {
  bpm: number;
  barsPerWord: number;
  sessionLengthSeconds: number;
  topicLock: boolean;
};

export type SparkSession = {
  id: string;
  mode: SparkMode;
  createdAt: string;
  clusters: RhymeCluster[];
  notes?: string;
  flowSettings?: FlowSettings;
  durationSeconds?: number;
};