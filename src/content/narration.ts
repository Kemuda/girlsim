// ============================================================
// Narration templates — post-choice narration and stage transitions
// ============================================================

/** Narration templates by highest dimension */
export const NARRATION_TEMPLATES: Record<string, string[]> = {
  high_coherence: [
    'Your steps never wavered. Every choice reinforces the walls of your inner fortress.',
    'Direction is your greatest weapon — you know where you\'re going.',
  ],
  high_depth: [
    'Your inner world is vaster than the one outside. In silence, you find the most answers.',
    'You see what others can\'t — it\'s a gift, and a burden.',
  ],
  high_regeneration: [
    'Like spring itself — no matter how long the winter, you always bloom again.',
    'There\'s a quiet resilience in you. It doesn\'t announce itself, but it never leaves.',
  ],
  high_transmission: [
    'Your influence spreads like ripples. A passing word of yours might be changing someone\'s life right now.',
    'The connections you build with others are your greatest strength.',
  ],
  high_body: [
    'You remember you\'re flesh and blood. When the mind is exhausted, the body catches you.',
    'You understand something most people don\'t: take care of yourself first, then everything else.',
  ],
  high_shadow: [
    'The emotions you pushed down didn\'t disappear. They\'re growing in the dark.',
    'Your shadow grows longer. Maybe it\'s time to turn around and look at it.',
  ],
  generic: [
    'Life goes on. Every choice is shaping you, even if you don\'t realize it yet.',
    'You\'re not any single label. You\'re the sum of all these moments.',
    'The road ahead is long, but you\'ve already done the hardest part — beginning.',
  ],
};

/** Post-choice connectors */
export const NARRATION_CONNECTORS: string[] = [
  'You chose',
  'In that moment, you decided',
  'Something inside you said',
];

// ── Chinese narration (used for chihiro + full BaZi modes) ──

export const ZH_NARRATION_TEMPLATES: Record<string, string[]> = {
  high_coherence: [
    '你知道自己在走哪条路。这种清醒，有时候是礼物，有时候是负担。',
    '方向感是你的武器。但路不是直的，你也知道。',
  ],
  high_depth: [
    '你的内心比外面的世界更宽。安静的时候，你能听到别人听不见的声音。',
    '你看得比别人深一点。那些看不见的东西，都在你这里留下了痕迹。',
  ],
  high_regeneration: [
    '这件事改变了你，但没有压垮你。你有一种说不清的能力——倒下，再起来。',
    '你不是没受过伤。你只是每次都找到了继续的理由。',
  ],
  high_transmission: [
    '你影响的人，比你知道的多。有些话，你可能已经忘了，但说话的对象还记得。',
    '你和别人之间的那条线，是你最重要的东西。',
  ],
  high_body: [
    '你记得自己是有身体的人。这件事，没你想象的那么理所当然。',
    '身体有它自己的智慧。你在学着听它说话。',
  ],
  high_shadow: [
    '你压下去的东西没有消失。它们在某个地方安静地等着。',
    '影子越来越长了。也许该转过身看一眼了。',
  ],
  generic: [
    '日子在过。你在变，只是还没看清楚变成什么样子。',
    '每一个选择都在悄悄塑造你。不是今天，是很多年以后。',
    '没有什么是白经历的。哪怕你现在还不知道这件事有什么用。',
  ],
};

export const ZH_NARRATION_CONNECTORS: string[] = [
  '你选了',
  '那一刻，你决定了',
  '你心里有什么东西说',
];

/** Stage transition narration */
export const TURN_TRANSITIONS: Record<string, string> = {
  'Girlhood→The Threshold':
    'Childhood was a long dream, and you woke up without realizing it. The face in the mirror is no longer a little girl\'s.',
  'The Threshold→First World':
    'Eighteen. You stand at the entrance to the world. Your luggage is light, but your heart carries the whole future.',
  'First World→The Contraction':
    'The momentum of your twenties slowly settles into a steadier rhythm. Life gains weight — not all burden, but substance.',
  'The Contraction→Midgame Reckoning':
    'Time moves differently now. You start wanting to look back, and seriously wonder: how much road is left.',
  'Midgame Reckoning→Second Wind':
    'Midlife awakening isn\'t a single moment — it\'s a slow unfolding. You discover you can still start over.',
  'Second Wind→Legacy':
    'When you stop rushing, the view gets clearer. You begin to think about what you\'ll leave behind.',
};

/** Appended when Shadow is high */
export const SHADOW_HIGH_SUFFIX = 'But deep down, something has been quietly aching.';

/** Appended when Resilience is high */
export const REGENERATION_HIGH_SUFFIX = 'No matter what happens, you always find the strength to begin again.';

/** Default transition */
export const DEFAULT_TRANSITION = 'Time keeps moving. So do you.';
