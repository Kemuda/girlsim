// ============================================================
// Shadow endings — 5 patterns, observational humor
// ============================================================

import type { CharacterState, DimensionKey } from '../types/game';
import { INITIAL_STATE } from '../types/game';

export interface ShadowEndingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

const SHADOW_ENDINGS_MAP: Record<string, ShadowEndingData> = {
  'efficiency-machine': {
    id: 'efficiency-machine',
    title: 'The Efficiency Machine',
    subtitle: '效率机器',
    description:
      'Wednesday. 11 PM. You close your laptop. Then pick up your phone. Then put it down. Then open your laptop again.\n\nThe last time you properly hung out with your best friend was... at some event, probably. You chatted for about eight minutes. You said "let\'s catch up soon." That was last month.\n\nYour Google Calendar is more honest than your journal — it says you haven\'t blocked a single hour for yourself in three weeks. You started using AI to draft your texts. You call it efficiency. The time you saved? You spent it working.\n\nYou\'re impressive. Everyone says so. But when\'s the last time "impressive" actually made you happy?\n\nSend this to that friend who always says "next week." You know who.',
  },
  'invisible-giver': {
    id: 'invisible-giver',
    title: 'The Invisible Giver',
    subtitle: '隐形付出者',
    description:
      'You\'re the person people think of first when they need something. Resume reviews. Airport pickups. 2 AM texts when someone\'s going through it. You do all this naturally. Like breathing.\n\nScroll through your chats — your last message to almost everyone is you checking in on them. Not many people open your conversation that way. It\'s not that they don\'t care. It\'s that you\'re too good at making people think you don\'t need it.\n\nWhen\'s the last time someone took care of you? Not the "are you okay?" kind. The kind where someone just ordered you your favorite drink without asking. Can\'t remember? Yeah.\n\nSend this to that person who always says "no worries, I got it." If you can\'t think of who — well.',
  },
  'deep-diver': {
    id: 'deep-diver',
    title: 'The Deep Diver',
    subtitle: '深海潜水员',
    description:
      'Your Notes app has things in it. Not work stuff. Just... things you thought of sometimes. Fragmented, long, never shown to anyone. You scroll past them occasionally, think "not bad." Then lock the screen.\n\nYou\'ve typed a lot of messages. Real ones. Long ones. Then read them over, select all, delete. Not because they were bad. Because sending them means explaining, and explaining is exhausting.\n\nAt gatherings you\'re quiet. People call you "chill." Really you\'re just trying to translate the thing in your head into something you can say out loud. By the time you figure it out, everyone\'s moved on.\n\nYou probably have a friend exactly like you — and you\'ve probably never told each other the truth. Try sending this to them.',
  },
  'perfect-actor': {
    id: 'perfect-actor',
    title: 'The Perfect Actor',
    subtitle: '完美演员',
    description:
      'You\'re great at conversation. Any setting, any crowd. You always happen to be exactly what the room needs. Someone once called you "incredibly thoughtful." You replied with a perfectly calibrated "thank you."\n\nOn the way home you take your earbuds out. Not to listen to something else — just to exit the version of yourself you were just being. You\'re not sure the version you switch back to is the "real" one either.\n\nYou\'re probably reading this with a polite, appropriate smile on your face. Right?\n\nDrop this in a group chat and have everyone take it. See who else gets this result. That\'s your people.',
  },
  'already-aware': {
    id: 'already-aware',
    title: 'Already on the Way',
    subtitle: '已经在路上',
    description:
      'You\'re different from most people. Not because you\'re smarter or more zen — you\'ve also scrolled LinkedIn at 2 AM, also felt the sting, also said "I\'m good."\n\nThe difference is you still say "I don\'t know."\n\nAt some point, most people stop saying those three words. Like admitting it means you\'re not capable enough. But you still say it. Sometimes to friends. Sometimes just to yourself.\n\nThat\'s worth more than you think. A lot of people have forgotten how.\n\nYou don\'t need this game to tell you anything. But maybe send it to a friend who does.',
  },
};

export function determineShadowEnding(state: CharacterState): ShadowEndingData {
  const shadowGrowth = state.Shadow - INITIAL_STATE.Shadow;

  if (shadowGrowth < 8) return SHADOW_ENDINGS_MAP['already-aware'];

  const dims: DimensionKey[] = ['Coherence', 'Depth', 'Regeneration', 'Transmission', 'Body'];
  let highest: DimensionKey = 'Coherence';
  let highestVal = 0;
  for (const d of dims) {
    if (state[d] > highestVal) {
      highestVal = state[d];
      highest = d;
    }
  }

  switch (highest) {
    case 'Coherence':
      return SHADOW_ENDINGS_MAP['efficiency-machine'];
    case 'Transmission':
      return SHADOW_ENDINGS_MAP['invisible-giver'];
    case 'Depth':
      return SHADOW_ENDINGS_MAP['deep-diver'];
    default:
      return SHADOW_ENDINGS_MAP['perfect-actor'];
  }
}

export { SHADOW_ENDINGS_MAP as SHADOW_ENDINGS };
