// ============================================================
// Shadow line — 5 scenes for 22-29 year old high achievers
// ============================================================

import type { Scene } from '../types/game';

export const SHADOW_SCENES: Scene[] = [
  {
    id: 'shadow-late-night',
    turn: 'Late Night',
    turnIndex: 0,
    title: '2:30 AM',
    text: 'You\'ve been at your desk for six hours. Your third coffee went cold an hour ago — it\'s basically a decoration now. Your phone lights up. A friend: "Come grab food? Feels like it\'s been forever." You look at the deck. Then at the message. Then at the deck. You\'re seriously considering making "next week?" an auto-reply.',
    choices: [
      {
        text: '"Next week, this week\'s insane"',
        delta: { Coherence: 7, Shadow: 5, Body: -3 },
      },
      {
        text: 'Close the laptop and go — work will always be there',
        delta: { Transmission: 6, Regeneration: 4 },
      },
      {
        text: 'Reply "so tired", go nowhere, just lie down',
        delta: { Body: 5, Depth: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-feed',
    turn: 'Compare',
    turnIndex: 1,
    title: 'The Feed',
    text: 'Scrolling before bed. A classmate posted on LinkedIn: "Excited to share that..." The comments are all 🔥🔥🔥. Scroll down — another classmate, offer from a top program, "Grateful for this journey ❤️". Scroll more — engagement photos, some European cobblestone street. You lock the screen. Unlock it. Lock it. Unlock it. This time you open the food delivery app.',
    choices: [
      {
        text: 'Reopen your phone and start updating your resume',
        delta: { Coherence: 7, Shadow: 5 },
      },
      {
        text: 'Like the post, type "so proud of you!", delete it, type "Congrats!!"',
        delta: { Transmission: 5, Shadow: 4 },
      },
      {
        text: 'Text a friend: "just got destroyed by LinkedIn"',
        delta: { Depth: 6, Transmission: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-thirteen-hours',
    turn: 'Love',
    turnIndex: 2,
    title: 'Thirteen Hours',
    text: 'You\'ve been together almost two years. Most of the photos on your phone are of them. Last month you got an offer. They got one too — on the other side of the planet. Thirteen-hour time difference. You\'re sitting at that café you always go to near campus. Your americano is empty. Their oat latte hasn\'t been touched. Finally they say, "We\'ll figure it out." You say "yeah." You both know what that translates to: "let\'s not think about it."',
    choices: [
      {
        text: '"Let\'s just focus on our own paths for now"',
        delta: { Coherence: 6, Shadow: 5, Transmission: -2 },
      },
      {
        text: '"Maybe I could... look at opportunities near you"',
        delta: { Transmission: 7, Shadow: 3, Coherence: -2 },
      },
      {
        text: '"I don\'t know. But I don\'t want to pretend I\'m fine"',
        delta: { Depth: 6, Transmission: 4, Shadow: -2 },
      },
    ],
  },
  {
    id: 'shadow-offer',
    turn: 'Choice',
    turnIndex: 3,
    title: 'The Offer',
    text: 'A great opportunity. Great title, solid package, guaranteed to harvest a wave of LinkedIn congratulations. But it has nothing to do with what you actually care about. Your advisor says "you\'d be crazy not to take it." Your parents say "why are you even hesitating?" The group chat says "just get on the train." The voice in your head has a strong opinion too — except it doesn\'t post on LinkedIn, doesn\'t come with an offer letter, and definitely can\'t convince your mom.',
    choices: [
      {
        text: 'Take it — just get on the train',
        delta: { Coherence: 8, Shadow: 4 },
      },
      {
        text: 'Turn it down — I know what I want, even if I can\'t explain it yet',
        delta: { Depth: 6, Coherence: 4, Shadow: -3 },
      },
      {
        text: 'Push the deadline again and again until the last day',
        delta: { Shadow: 6, Depth: 3 },
      },
    ],
  },
  {
    id: 'shadow-how-are-you',
    turn: 'Truth',
    turnIndex: 4,
    title: 'How Are You, Really?',
    text: 'A friend you haven\'t seen in ages. It took three tries to find a time that worked. Halfway through dinner, she puts down her glass, looks at you, and says: "How are you, really?" Not small talk — she actually wants to know. The air goes quiet for a second. Your mouth moves. You\'re assembling a very convincing "I\'m good."',
    choices: [
      {
        text: '"I\'m good, just busy. How about you?"',
        delta: { Shadow: 6, Coherence: 3 },
      },
      {
        text: 'Hesitate, then say some of the truth — maybe ten percent of it',
        delta: { Depth: 7, Transmission: 5, Shadow: -4 },
      },
      {
        text: 'Laugh and say "don\'t get all serious on me" — then show her a meme',
        delta: { Transmission: 4, Shadow: 5 },
      },
    ],
  },
];

export const SHADOW_TURNS = [
  { name: 'Late Night', ageRange: '', index: 0 },
  { name: 'Compare', ageRange: '', index: 1 },
  { name: 'Love', ageRange: '', index: 2 },
  { name: 'Choice', ageRange: '', index: 3 },
  { name: 'Truth', ageRange: '', index: 4 },
];
