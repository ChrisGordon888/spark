export type SparkMood =
  | "dark"
  | "focused"
  | "romantic"
  | "aggressive"
  | "reflective"
  | "triumphant"
  | "calm";

export type SparkMode = "rhyme" | "freestyle" | "songStarter" | "challenge";

export type RhymeCluster = {
  id: string;
  coreWord: string;
  rhymes: string[];
  nearRhymes: string[];
  mood: SparkMood;
};