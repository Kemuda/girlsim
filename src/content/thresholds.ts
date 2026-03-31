// ============================================================
// Threshold events (fate cards) — triggered randomly between life stages
// ============================================================
// Four types: Disruption / Opening / Mirror / Ghost
// ============================================================

import type { ThresholdCard } from '../types/game';

export const THRESHOLD_CARDS: ThresholdCard[] = [
  // ── Disruption ────────────────────────────────────────────

  {
    id: 'disruption-loss',
    category: 'Disruption',
    title: 'Sudden Loss',
    text: 'A phone call. Someone you love is gone. The world changes shape in a single second, and you realize you were never ready — no one ever is.',
    choices: [
      {
        text: 'Let yourself fall apart — cry when you need to cry',
        delta: { Depth: 8, Regeneration: 5, Shadow: 5, Coherence: -5 },
      },
      {
        text: 'Hold it together, because other people need you right now',
        delta: { Coherence: 6, Transmission: 4, Shadow: 6, Body: -3 },
      },
      {
        text: 'Go alone to the place you used to go together, and sit there all day',
        delta: { Depth: 10, Shadow: 5, Body: -2 },
      },
    ],
  },
  {
    id: 'disruption-betrayal',
    category: 'Disruption',
    title: 'A Crack in Trust',
    text: 'Someone you trusted did something you can\'t understand. Nothing earth-shattering, but enough to make you question your own judgment. You lie awake wondering: was I wrong about them from the start?',
    choices: [
      {
        text: 'Confront them directly, even if it means a break',
        delta: { Coherence: 8, Shadow: 4, Transmission: -4 },
      },
      {
        text: 'Choose to forgive, but draw a line in your mind',
        delta: { Depth: 6, Shadow: 5, Transmission: 2 },
      },
      {
        text: 'Talk it over with someone you trust — hear a different voice',
        delta: { Transmission: 7, Depth: 4, Regeneration: 3 },
      },
    ],
  },

  // ── Opening ───────────────────────────────────────────────

  {
    id: 'opening-encounter',
    category: 'Opening',
    title: 'An Unexpected Meeting',
    text: 'In a place you didn\'t expect, you meet someone. You talk for hours. Afterward, you realize you said things you\'ve never said to anyone.',
    choices: [
      {
        text: 'Exchange contacts — you want to continue this conversation',
        delta: { Transmission: 8, Regeneration: 5 },
      },
      {
        text: 'Don\'t exchange contacts, but remember the night',
        delta: { Depth: 8, Shadow: -2 },
      },
      {
        text: 'Tell your best friend about it — she says "you look different when you talk about it"',
        delta: { Transmission: 5, Regeneration: 5, Coherence: 3 },
      },
    ],
  },
  {
    id: 'opening-discovery',
    category: 'Opening',
    title: 'Late-Night Clarity',
    text: 'Reading a book, listening to a song, or just watching rain through the window — suddenly, things that never made sense click together. You can\'t quite name what you understood, but your body feels lighter than it has in years.',
    choices: [
      {
        text: 'Write it down immediately, afraid you\'ll forget by morning',
        delta: { Depth: 10, Coherence: 4 },
      },
      {
        text: 'Do nothing — just let the feeling exist',
        delta: { Regeneration: 7, Depth: 5, Shadow: -3 },
      },
      {
        text: 'The next day, start making a change — beginning with one small thing',
        delta: { Coherence: 6, Body: 4, Regeneration: 4 },
      },
    ],
  },

  // ── Mirror ────────────────────────────────────────────────

  {
    id: 'mirror-feedback',
    category: 'Mirror',
    title: 'Seen by Someone Else',
    text: 'Someone says something to you — short and sharp. It stings. Not because it\'s wrong, but because it\'s too accurate. You argue with it in your head for hours. Then go quiet.',
    choices: [
      {
        text: 'Admit it\'s true, even though it\'s uncomfortable',
        delta: { Depth: 8, Shadow: 5, Coherence: -2 },
      },
      {
        text: 'Use it as fuel to change',
        delta: { Coherence: 7, Body: 3, Shadow: 2 },
      },
      {
        text: 'Let it go — you don\'t need to be understood by everyone',
        delta: { Regeneration: 6, Depth: 4, Shadow: -2 },
      },
    ],
  },

  // ── Ghost ─────────────────────────────────────────────────

  {
    id: 'ghost-dream',
    category: 'Ghost',
    title: 'A Dream of Another Self',
    text: 'You dream of yourself on a different path — a different major, a different partner, a different city. When you wake up, the pillow is wet. You can\'t tell if it\'s regret or release.',
    choices: [
      {
        text: 'Tell yourself: that path wouldn\'t have been better',
        delta: { Coherence: 6, Shadow: -3, Regeneration: 4 },
      },
      {
        text: 'Allow yourself to grieve, just for a moment, for the life you didn\'t live',
        delta: { Depth: 8, Shadow: 5 },
      },
      {
        text: 'Think about everything this path gave you, and feel grateful',
        delta: { Regeneration: 7, Transmission: 4, Shadow: -2 },
      },
    ],
  },
];
