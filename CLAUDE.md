# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Type-check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

No test suite exists yet.

## Architecture

**Stack**: React 19 + TypeScript + Vite + Tailwind CSS 4

### Content / Engine Separation

The most important architectural principle: **all narrative text lives in `src/content/`**, completely separate from game logic.

- `src/content/` — Pure data: scenes, threshold cards, endings, narration templates, dimension display config, UI strings. Edit only this layer to change story content.
- `src/context/GameContext.tsx` — Game state via `useReducer`. The reducer handles all phase transitions and stat mutations.
- `src/constants/endings.ts` — `determineEnding()` function only (logic, not text).
- `src/services/narrator.ts` — Narration generation logic consuming templates from `src/content/narration.ts`.
- `src/types/game.ts` — All shared types + `TURNS` array + `INITIAL_STATE`.

### Game Flow

```
start → playing → [transition] → [threshold 40%] → playing → ... → ending
```

7 life stages (turns), 2 scenes per turn = 14 total scenes. At each turn boundary, 40% chance of triggering a threshold card (fate card). Game phase is one of: `'start' | 'playing' | 'threshold' | 'transition' | 'ending'`.

### Six Dimensions

| Key | Chinese | Meaning |
|-----|---------|---------|
| `Coherence` | 志 | Direction / willpower |
| `Depth` | 幽 | Inner world richness |
| `Regeneration` | 韧 | Resilience |
| `Transmission` | 渡 | Impact on others |
| `Body` | 身 | Embodied wisdom |
| `Shadow` | 影 | Suppressed self |

All dimensions: 0–100. `INITIAL_STATE` sets Coherence/Depth/Regeneration/Transmission/Body = 50, Shadow = 10. Shadow starts low because it accumulates through play; it is not a "bad" stat.

### Ending Logic

`determineEnding()` in `src/constants/endings.ts` finds the highest dimension value, then checks `ENDINGS` array for a matching `requiredHighest` + `minValue >= 80` (60 for Shadow). Falls back to the balanced "河流" ending.

### Character Panel System (docs reference)

Characters have a 1–5 talent panel (starting point). Mapping to game values: 1→20, 2→35, 3→50, 4→65, 5→80. Shadow uses a different mapping: 1→5, 2→15, 3→25, 4→40, 5→55 (intentionally lower starting range).

## TypeScript Notes

The project uses `verbatimModuleSyntax`. All type-only imports **must** use `import type { }` syntax — mixing value and type imports in the same statement without the `type` keyword will cause build errors.

## Design Docs

- `docs/universes.md` — 17 official character profiles with dimension panels (天赋起点) and narrative descriptions. Reference when designing character-specific content.
- `docs/engine-design.md` — Shadow Cost mechanic, Narrative Awareness system (4 divergence levels), panel-to-value mappings, line chart spec, ending philosophy. Read before modifying game mechanics.
