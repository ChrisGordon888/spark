import { rhymeClusters } from "../src/data/rhymeClusters";

const VALID_MOODS = new Set([
  "dark",
  "triumphant",
  "reflective",
  "romantic",
  "aggressive",
  "focused",
  "calm",
]);

const VALID_ENERGIES = new Set(["low", "steady", "urgent", "smooth", "explosive"]);

const VALID_DIFFICULTIES = new Set(["easy", "medium", "advanced"]);

let errorCount = 0;
let warningCount = 0;

const idCounts = new Map<string, number>();
const coreWordCounts = new Map<string, number>();

let rhymeCount = 0;
let nearRhymeCount = 0;
let slantWordCount = 0;
let relatedTopicCount = 0;
let topicTagCount = 0;

function error(message: string) {
  errorCount += 1;
  console.error(`❌ ${message}`);
}

function warning(message: string) {
  warningCount += 1;
  console.warn(`⚠️  ${message}`);
}

for (const cluster of rhymeClusters) {
  idCounts.set(cluster.id, (idCounts.get(cluster.id) ?? 0) + 1);
  coreWordCounts.set(
    cluster.coreWord.toLowerCase(),
    (coreWordCounts.get(cluster.coreWord.toLowerCase()) ?? 0) + 1
  );

  rhymeCount += cluster.rhymes.length;
  nearRhymeCount += cluster.nearRhymes.length;
  slantWordCount += cluster.slantWords.length;
  relatedTopicCount += cluster.relatedTopics.length;
  topicTagCount += cluster.topics.length;

  if (!cluster.id) error(`Missing id for core word "${cluster.coreWord}"`);
  if (!cluster.coreWord) error(`Missing coreWord for id "${cluster.id}"`);

  if (!VALID_MOODS.has(cluster.mood)) {
    error(`Invalid mood "${cluster.mood}" in "${cluster.id}"`);
  }

  if (!VALID_ENERGIES.has(cluster.energy)) {
    error(`Invalid energy "${cluster.energy}" in "${cluster.id}"`);
  }

  if (!VALID_DIFFICULTIES.has(cluster.difficulty)) {
    error(`Invalid difficulty "${cluster.difficulty}" in "${cluster.id}"`);
  }

  if (cluster.rhymes.length < 3) {
    warning(`"${cluster.id}" has fewer than 3 rhymes`);
  }

  if (cluster.nearRhymes.length < 3) {
    warning(`"${cluster.id}" has fewer than 3 near rhymes`);
  }

  if (cluster.slantWords.length < 3) {
    warning(`"${cluster.id}" has fewer than 3 slant words`);
  }

  if (cluster.relatedTopics.length < 3) {
    warning(`"${cluster.id}" has fewer than 3 related topics`);
  }

  const allWordSuggestions = [
    ...cluster.rhymes,
    ...cluster.nearRhymes,
    ...cluster.slantWords,
  ].map((word) => word.toLowerCase());

  const uniqueWordSuggestions = new Set(allWordSuggestions);

  if (uniqueWordSuggestions.size !== allWordSuggestions.length) {
    warning(`"${cluster.id}" has duplicate word suggestions`);
  }
}

for (const [id, count] of idCounts.entries()) {
  if (count > 1) {
    error(`Duplicate id found: "${id}" appears ${count} times`);
  }
}

const duplicateCoreWords = [...coreWordCounts.entries()].filter(
  ([, count]) => count > 1
);

console.log("\n📊 Spark Dataset Summary");
console.log("------------------------");
console.log(`Clusters: ${rhymeClusters.length}`);
console.log(`Core words: ${coreWordCounts.size}`);
console.log(`Rhymes: ${rhymeCount}`);
console.log(`Near rhymes: ${nearRhymeCount}`);
console.log(`Slant words: ${slantWordCount}`);
console.log(`Total word suggestions: ${rhymeCount + nearRhymeCount + slantWordCount}`);
console.log(`Creative threads: ${relatedTopicCount}`);
console.log(`Topic tags: ${topicTagCount}`);
console.log(`Total creative data points: ${
  rhymeClusters.length +
  rhymeCount +
  nearRhymeCount +
  slantWordCount +
  relatedTopicCount
}`);

if (duplicateCoreWords.length > 0) {
  console.log("\n🔁 Duplicate core words");
  console.log("----------------------");

  for (const [coreWord, count] of duplicateCoreWords) {
    console.log(`"${coreWord}" appears ${count} times`);
  }
}

console.log("\n✅ Validation complete");
console.log(`Errors: ${errorCount}`);
console.log(`Warnings: ${warningCount}`);

if (errorCount > 0) {
  process.exit(1);
}