import { rhymeClusters } from "@/data/rhymeClusters";
import type { RhymeCluster, SparkModeOption, SparkTopic } from "@/lib/types";

type FreshClusterOptions = {
    recentClusterIds?: string[];
    recentCoreWords?: string[];
    preferredTopics?: SparkTopic[];
};

export const sparkModes: SparkModeOption[] = [
    {
        id: "rhyme",
        label: "Rhyme Spark",
        description: "Generate a focused rhyme cluster.",
    },
    {
        id: "freestyle",
        label: "Freestyle Flow",
        description: "Practice with timed word changes.",
    },
    {
        id: "challenge",
        label: "Challenge",
        description: "Use a set of words in one take.",
    },
    {
        id: "songStarter",
        label: "Song Starter",
        description: "Catch a feeling before it becomes a song.",
    },
];

export function getRandomCluster(): RhymeCluster {
    return getRandomItem(rhymeClusters);
}

export function getClustersByTopic(topic: SparkTopic): RhymeCluster[] {
    return rhymeClusters.filter((cluster) => cluster.topics.includes(topic));
}

export function getRandomClusterByTopic(topic: SparkTopic): RhymeCluster {
    const matchingClusters = getClustersByTopic(topic);

    if (matchingClusters.length === 0) {
        return getRandomCluster();
    }

    return getRandomItem(matchingClusters);
}

export function getRandomClusterExcluding(
    excludedClusterId: string
): RhymeCluster {
    const availableClusters = rhymeClusters.filter(
        (cluster) => cluster.id !== excludedClusterId
    );

    if (availableClusters.length === 0) {
        return getRandomCluster();
    }

    return getRandomItem(availableClusters);
}

export function getFreshRandomCluster({
    recentClusterIds = [],
    recentCoreWords = [],
    preferredTopics = [],
}: FreshClusterOptions = {}): RhymeCluster {
    const recentIdSet = new Set(recentClusterIds);
    const recentCoreWordSet = new Set(
        recentCoreWords.map((word) => normalizeWord(word))
    );

    const freshClusters = rhymeClusters.filter((cluster) => {
        const isRecentId = recentIdSet.has(cluster.id);
        const isRecentCoreWord = recentCoreWordSet.has(
            normalizeWord(cluster.coreWord)
        );

        return !isRecentId && !isRecentCoreWord;
    });

    const freshTopicClusters =
        preferredTopics.length > 0
            ? freshClusters.filter((cluster) =>
                  cluster.topics.some((topic) => preferredTopics.includes(topic))
              )
            : [];

    const topicClusters =
        preferredTopics.length > 0
            ? rhymeClusters.filter((cluster) =>
                  cluster.topics.some((topic) => preferredTopics.includes(topic))
              )
            : [];

    const clusterPool =
        freshTopicClusters.length > 0
            ? freshTopicClusters
            : freshClusters.length > 0
            ? freshClusters
            : topicClusters.length > 0
            ? topicClusters
            : rhymeClusters;

    return getRandomItem(clusterPool);
}

function getRandomItem<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function normalizeWord(word: string): string {
    return word.trim().toLowerCase();
}