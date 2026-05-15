# Spark

Spark is a lightweight creative flow companion for rappers, songwriters, freestylers, and creators.

It helps artists find a pocket, spark new words, and stay in motion while writing, freestyling, warming up, or catching ideas.

Spark is built as a focused creative ignition tool — not a bloated productivity app, full lyric editor, or generic AI prompt generator.

## Live Demo

https://spark-three-bice.vercel.app/

## Core Idea

Open Spark when you feel stuck, cold, uninspired, or overthinking.

The app gives you a fast creative signal:

- a core word
- rhyme fuel
- near rhymes and slant words
- creative threads
- emotional lanes
- flow timing tools
- silent BPM-based cue rotation

Spark is designed to help artists move quickly from hesitation into creative momentum.

## Flagship Mode: Freestyle Flow

Freestyle Flow is Spark’s primary experience.

It helps artists match the beat and rotate cue words by bars while staying in flow.

Current Flow features:

- Silent visual BPM pulse
- Tap Tempo for estimating BPM by tapping along with a beat
- Beat counter
- Bar counter
- Cue changes every 2, 4, or 8 bars
- Downbeat emphasis
- Cue-cycle emphasis
- Light pulse settings: off, subtle, strong
- Rhyme fuel close to the main cue word
- Context lane and thread support
- Topic-aware fresh cue rotation

This allows Spark to work alongside an instrumental, DAW session, YouTube beat, or live writing session without adding sound or interrupting recording.

## Additional Modes

Spark also includes supporting creative modes:

- **Rhyme Spark** — generates focused rhyme clusters
- **Challenge** — gives constrained words for one-take practice
- **Song Starter** — helps catch a feeling before it becomes a song

These modes support different creative entry points while keeping Spark fast and lightweight.

## Dataset

Spark currently includes a modular creative dataset with:

- 389 clusters
- 361 unique core words
- 4,668 rhyme / near-rhyme / slant-word suggestions
- 1,556 creative thread ideas
- 6,613 total creative data points

The dataset is organized by creative category instead of living in one large file.

Current categories include:

- ambition
- confidence
- conflict
- cosmic
- healing
- heartbreak
- love
- motion
- night
- reflection
- survival

## Dataset Validation

Spark includes a validation script to protect dataset quality as it scales.

The validator checks for:

- duplicate cluster IDs
- invalid mood values
- invalid energy values
- invalid difficulty values
- empty or undersized rhyme fields
- duplicate suggestions inside a cluster
- dataset totals and summary stats

Run:

```bash
npm run validate:clusters
```

## Current V1 Features

- Flow-first creative experience
- Random creative spark generation
- Fresh session-aware selection logic
- Recent cluster ID avoidance
- Recent core-word avoidance
- Topic-aware Flow cue selection
- Modular rhyme cluster data architecture
- Tap Tempo BPM estimation
- Silent BPM pulse
- Beat/bar cue tracking
- Mobile-first dark interface
- Sticky Spark action button
- Clean TypeScript data model
- Dataset validation tooling
- Vercel deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

## Product Principles

- Mobile-first
- Instant interaction
- Low friction
- Flow-state friendly
- Recording-friendly
- Visually memorable
- Emotionally resonant
- Scalable data architecture
- Simple but polished

## Architecture Notes

Spark separates creative data, timing logic, selection logic, validation tooling, and UI components.

Current structure:

```txt
src/
  app/
    page.tsx

  components/
    flow/
      FlowCueController.tsx
      TapTempo.tsx

    spark/
      ModeSelector.tsx
      SparkButton.tsx
      SparkCard.tsx

  data/
    rhymeClusters/
      ambition.ts
      confidence.ts
      conflict.ts
      cosmic.ts
      healing.ts
      heartbreak.ts
      love.ts
      motion.ts
      night.ts
      reflection.ts
      survival.ts
      index.ts

  hooks/
    useFlowPulse.ts

  lib/
    sparkEngine.ts
    timing.ts
    types.ts

scripts/
  validateClusters.ts
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run dataset validation:

```bash
npm run validate:clusters
```

Create a production build:

```bash
npm run build
```

## What I Learned Building Spark

Spark strengthened my experience with:

- frontend product architecture
- mobile-first UI design
- React component design
- TypeScript data modeling
- custom hooks
- timing logic
- stateful interaction design
- dataset validation
- scalable content architecture
- Vercel deployment workflow
- product iteration based on UX testing

## V1 Status

Spark is currently in late V1 polish.

The core product is functional, deployed, and usable. The remaining work is focused on refinement, documentation, mobile polish, and portfolio presentation.

## Future Roadmap

Potential future improvements:

- Creative lane selector
- Saved recent sessions
- Favorite sparks
- Export/share spark sessions
- Deeper topic-aware cue rotation
- More advanced challenge mode
- Expanded dataset tooling
- Optional localStorage session history
- Portfolio case study page