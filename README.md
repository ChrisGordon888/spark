# Spark

Spark is a lightweight creative momentum app for rappers, songwriters, freestylers, and creators.

The goal is simple: help artists break through creative friction quickly with random rhyme clusters, mood-based inspiration, and fast interaction.

Spark is built as a focused creative ignition tool — not a bloated productivity app, full lyric editor, or generic AI prompt generator.

## Live Demo

Coming soon.

## Core Idea

Open Spark when you feel stuck, cold, uninspired, or overthinking.

Tap once and receive a useful creative launchpad:

- a core word
- rhyme options
- near rhymes
- a mood direction
- fast visual feedback

The product is designed to help creators stay in flow and start making something immediately.

## Current MVP Features

- Random rhyme cluster generation
- Core word display
- Rhyme and near-rhyme chips
- Mood tag for creative direction
- Mobile-first dark interface
- Fast tap-based interaction
- Clean TypeScript data model
- Local-first architecture foundation

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Vercel deployment target

## Product Principles

- Mobile-first
- Instant interaction
- Low friction
- Visually memorable
- Emotionally resonant
- Simple but polished
- Scalable architecture

## Architecture Notes

Spark separates creative data, generation logic, and UI structure.

Current structure:

```txt
src/
  app/
    page.tsx
  components/
    spark/
  data/
    rhymeClusters.ts
  lib/
    sparkEngine.ts
    types.ts