// ============================================================
// Full life scenes — 14 core scenes across 7 life stages
// ============================================================

import type { Scene } from '../types/game';

export const SCENES: Scene[] = [
  // ── Turn 0: Girlhood (0–12) ───────────────────────────────

  {
    id: 'girlhood-1',
    turn: 'Girlhood',
    turnIndex: 0,
    title: 'The Secret in the Courtyard',
    text: 'A summer afternoon at your grandmother\'s house. Sunlight filters through the grape trellis, casting dappled shadows on the ground. You find an injured bird — its wing drooping, its eyes full of fear.',
    choices: [
      {
        text: 'Carefully pick it up and bandage its wing with an old cloth',
        delta: { Regeneration: 8, Body: 3, Depth: 2 },
      },
      {
        text: 'Run to get an adult to help',
        delta: { Transmission: 5, Coherence: 5 },
      },
      {
        text: 'Crouch beside it and watch quietly, too afraid to touch',
        delta: { Depth: 8, Shadow: 3 },
      },
    ],
  },
  {
    id: 'girlhood-2',
    turn: 'Girlhood',
    turnIndex: 0,
    title: 'The First Exam',
    text: 'Report cards are out. You ranked third in class. Mom\'s expression is complicated — she says "third is fine too," but you hear what she really means. The kid at the next desk got first place and is being praised by the teacher.',
    choices: [
      {
        text: 'Silently vow to get first place next time',
        delta: { Coherence: 8, Shadow: 5 },
      },
      {
        text: 'Think third is pretty good and run outside to play',
        delta: { Body: 5, Regeneration: 5 },
      },
      {
        text: 'Feel a little sad, but don\'t know who to tell',
        delta: { Depth: 7, Shadow: 4 },
      },
    ],
  },

  // ── Turn 1: The Threshold (12–18) ─────────────────────────

  {
    id: 'threshold-1',
    turn: 'The Threshold',
    turnIndex: 1,
    title: 'The Person in the Mirror',
    text: 'You stand in front of the bathroom mirror. Your body is changing, and you barely recognize yourself. At school, people are talking about your figure. You pretend not to hear. Today in PE you have to run 800 meters.',
    choices: [
      {
        text: 'Grit your teeth and finish the run, even if you\'re last',
        delta: { Body: 8, Coherence: 5 },
      },
      {
        text: 'Fake being sick and hide in the classroom with a book',
        delta: { Depth: 6, Shadow: 5, Body: -3 },
      },
      {
        text: 'Find a friend and jog slowly together, chatting the whole way',
        delta: { Transmission: 7, Regeneration: 3 },
      },
    ],
  },
  {
    id: 'threshold-2',
    turn: 'The Threshold',
    turnIndex: 1,
    title: 'The Hidden Drawer',
    text: 'You\'ve written so much in your diary — about the boy who smiles at you in the hallway, about the sleepless night after fighting with your best friend, about feeling like nobody in the world understands you. It seems your mother went through your drawer.',
    choices: [
      {
        text: 'Confront her angrily and demand she respect your privacy',
        delta: { Coherence: 6, Transmission: -3, Shadow: 4 },
      },
      {
        text: 'Tear out the most private pages and start locking your diary',
        delta: { Depth: 5, Shadow: 6 },
      },
      {
        text: 'Open up to her about what\'s been on your mind, awkward as it is',
        delta: { Transmission: 8, Regeneration: 4 },
      },
    ],
  },

  // ── Turn 2: First World (18–28) ───────────────────────────

  {
    id: 'firstworld-1',
    turn: 'First World',
    turnIndex: 2,
    title: 'Departure',
    text: 'The college acceptance letter arrived. A city you\'ve never been to, a thousand kilometers from home. On the train platform, Mom\'s eyes are red. Dad pretends to look at his phone. You drag your suitcase toward the first real crossroads of your life.',
    choices: [
      {
        text: 'Walk into the train car without looking back — save the tears for when you find your seat',
        delta: { Coherence: 7, Depth: 5, Shadow: 3 },
      },
      {
        text: 'Hug Mom and say "I\'ll call often"',
        delta: { Transmission: 6, Regeneration: 5 },
      },
      {
        text: 'Feel the hesitation, but keep walking toward the gate, one step at a time',
        delta: { Body: 4, Depth: 4, Coherence: 3 },
      },
    ],
  },
  {
    id: 'firstworld-2',
    turn: 'First World',
    turnIndex: 2,
    title: 'The Late-Night Lab',
    text: 'Three days straight in the lab. Your paper is due tomorrow. Still missing the last dataset. Your advisor\'s messages are getting colder. Meanwhile, your best friend just announced in the group chat that she\'s getting married.',
    choices: [
      {
        text: 'Keep going — this is the path you chose, you have to finish it',
        delta: { Coherence: 8, Body: -3, Shadow: 4 },
      },
      {
        text: 'Put down your work and go congratulate your friend first',
        delta: { Transmission: 7, Regeneration: 3 },
      },
      {
        text: 'Cry at your desk for a while, then wipe your eyes and keep going',
        delta: { Depth: 7, Regeneration: 4, Shadow: 2 },
      },
    ],
  },

  // ── Turn 3: The Contraction (28–38) ───────────────────────

  {
    id: 'contraction-1',
    turn: 'The Contraction',
    turnIndex: 3,
    title: 'Midnight Kitchen',
    text: '2 AM. You\'re heating milk in the kitchen. The baby finally fell asleep. Your husband is away on a business trip. During the meeting today, your proposal was rejected — your colleagues seemed more interested in when you\'d be back from maternity leave. The kitchen light hums.',
    choices: [
      {
        text: 'Open your laptop and rework the proposal — you won\'t give up',
        delta: { Coherence: 8, Body: -4, Shadow: 3 },
      },
      {
        text: 'Send a long voice message to an old friend far away',
        delta: { Transmission: 6, Depth: 5 },
      },
      {
        text: 'Just sit in the dark kitchen, doing nothing, feeling the quiet',
        delta: { Depth: 7, Regeneration: 5, Shadow: 2 },
      },
    ],
  },
  {
    id: 'contraction-2',
    turn: 'The Contraction',
    turnIndex: 3,
    title: 'The Health Report',
    text: 'The checkup results came back with a few yellow flags. The doctor says "nothing major, but watch your lifestyle." You think about the constant stomach pain, the insomnia, the hair loss — your body has been sending signals, and you\'ve been ignoring them all.',
    choices: [
      {
        text: 'Make a real health plan — start walking to work every day',
        delta: { Body: 8, Regeneration: 5 },
      },
      {
        text: 'Stuff the report in a drawer — who has time for this',
        delta: { Coherence: 3, Shadow: 8, Body: -5 },
      },
      {
        text: 'Talk to your husband about redistributing housework and hours',
        delta: { Transmission: 6, Body: 3, Coherence: 3 },
      },
    ],
  },

  // ── Turn 4: Midgame Reckoning (38–50) ─────────────────────

  {
    id: 'midgame-1',
    turn: 'Midgame Reckoning',
    turnIndex: 4,
    title: 'The Empty Room',
    text: 'Your daughter left for college. You stand in her empty room — her childhood drawings still on the shelf. You suddenly realize that over the past decade, "I" quietly became "Mom." In the mirror, wrinkles have crept to the corners of your eyes.',
    choices: [
      {
        text: 'Sign up for the painting class you\'ve always wanted to take',
        delta: { Regeneration: 8, Depth: 5, Coherence: 3 },
      },
      {
        text: 'Start going through the diaries and photos you\'ve collected over the years',
        delta: { Depth: 8, Transmission: 3 },
      },
      {
        text: 'Close the door, sit on the floor, and cry for a long time',
        delta: { Shadow: 5, Depth: 5, Regeneration: 3 },
      },
    ],
  },
  {
    id: 'midgame-2',
    turn: 'Midgame Reckoning',
    turnIndex: 4,
    title: 'Crossroads',
    text: 'A recruiter calls with a new position — double the salary, but in another city. Your husband says "it\'s up to you." Your parents are getting older. Your career here seems to have hit a ceiling.',
    choices: [
      {
        text: 'Take it — this might be the last chance for a turning point',
        delta: { Coherence: 8, Shadow: 4, Transmission: -3 },
      },
      {
        text: 'Turn it down, but start looking for new possibilities locally',
        delta: { Transmission: 5, Regeneration: 5, Coherence: 3 },
      },
      {
        text: 'Sit down with the family and discuss it — this isn\'t a solo decision',
        delta: { Transmission: 8, Depth: 4 },
      },
    ],
  },

  // ── Turn 5: Second Wind (50–65) ───────────────────────────

  {
    id: 'secondwind-1',
    turn: 'Second Wind',
    turnIndex: 5,
    title: 'The Garden',
    text: 'You\'ve filled the balcony with flowers. Retirement is quieter than you expected. One afternoon, a young woman knocks on your door — she was your intern years ago, now a department head. She says "what you told me back then changed my life." You can barely remember.',
    choices: [
      {
        text: 'Invite her in for tea and really listen to what she\'s struggling with now',
        delta: { Transmission: 8, Depth: 5 },
      },
      {
        text: 'Feel surprised and grateful — share more of what you\'ve learned',
        delta: { Transmission: 6, Coherence: 4, Regeneration: 3 },
      },
      {
        text: 'Smile and say "you did that yourself" — deflect the credit',
        delta: { Depth: 6, Shadow: -3, Regeneration: 4 },
      },
    ],
  },
  {
    id: 'secondwind-2',
    turn: 'Second Wind',
    turnIndex: 5,
    title: 'Old Photographs',
    text: 'Cleaning out the attic, you find a box of old photos. There you are — the girl crying at the train station, the grad student pulling all-nighters in the lab, the mother holding a baby in a midnight kitchen. You hardly recognize them.',
    choices: [
      {
        text: 'Put the photos into an album to show your daughter who you used to be',
        delta: { Transmission: 7, Depth: 5 },
      },
      {
        text: 'Look at those faces and say "you did well"',
        delta: { Regeneration: 8, Shadow: -5, Depth: 4 },
      },
      {
        text: 'Gaze at them for a long time, then put them back where they were',
        delta: { Depth: 8, Shadow: 3 },
      },
    ],
  },

  // ── Turn 6: Legacy (65+) ──────────────────────────────────

  {
    id: 'legacy-1',
    turn: 'Legacy',
    turnIndex: 6,
    title: 'The Letter',
    text: 'Your granddaughter emails from abroad. Her school project won an award — the topic was "My Family." She wrote your story. Many of the details are wrong, but the spirit is right. At the end she wrote: "Grandma, you are my hero."',
    choices: [
      {
        text: 'Write her a long letter back, telling her the real story',
        delta: { Transmission: 10, Depth: 5 },
      },
      {
        text: 'Print it out and put it on the fridge — read it every day',
        delta: { Regeneration: 7, Coherence: 4 },
      },
      {
        text: 'Reply: "You are your own hero"',
        delta: { Depth: 6, Transmission: 4, Shadow: -3 },
      },
    ],
  },
  {
    id: 'legacy-2',
    turn: 'Legacy',
    turnIndex: 6,
    title: 'The Last Courtyard',
    text: 'Another summer afternoon. You sit in a courtyard — not your grandmother\'s, but your own. You built the grape trellis yourself. A bird lands on the railing, tilts its head and looks at you. You think of a girl, a long time ago, crouching on the ground beside an injured bird.',
    choices: [
      {
        text: '"Come here — you\'re safe with me"',
        delta: { Regeneration: 8, Transmission: 5, Shadow: -5 },
      },
      {
        text: 'Close your eyes, let the sun fall on your face, and feel this moment',
        delta: { Depth: 8, Body: 4, Coherence: 4 },
      },
      {
        text: 'Pick up your phone and call your daughter',
        delta: { Transmission: 8, Regeneration: 4 },
      },
    ],
  },
];
