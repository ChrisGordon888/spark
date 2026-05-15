import { rhymeClusters } from "@/data/rhymeClusters";
import type { RhymeCluster, SparkModeOption, SparkTopic } from "@/lib/types";

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
    const randomIndex = Math.floor(Math.random() * rhymeClusters.length);
    return rhymeClusters[randomIndex];
}

export function getClustersByTopic(topic: SparkTopic): RhymeCluster[] {
    return rhymeClusters.filter((cluster) => cluster.topics.includes(topic));
}

export function getRandomClusterByTopic(topic: SparkTopic): RhymeCluster {
    const matchingClusters = getClustersByTopic(topic);

    if (matchingClusters.length === 0) {
        return getRandomCluster();
    }

    const randomIndex = Math.floor(Math.random() * matchingClusters.length);
    return matchingClusters[randomIndex];
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

    const randomIndex = Math.floor(Math.random() * availableClusters.length);
    return availableClusters[randomIndex];
}

export function getFreshRandomCluster(recentClusterIds: string[] = []): RhymeCluster {
    const recentIdSet = new Set(recentClusterIds);

    const freshClusters = rhymeClusters.filter(
        (cluster) => !recentIdSet.has(cluster.id)
    );

    const clusterPool = freshClusters.length > 0 ? freshClusters : rhymeClusters;

    const randomIndex = Math.floor(Math.random() * clusterPool.length);
    return clusterPool[randomIndex];
}