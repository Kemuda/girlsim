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

  // ── New scenes: sharper personality differentiation ──────

  {
    id: 'shadow-body-signal',
    turn: 'Signal',
    turnIndex: 5,
    title: 'The Body Keeps Score',
    text: 'Third migraine this month. You\'re standing in the pharmacy aisle, staring at the same painkillers you bought last week. Your Apple Watch says your resting heart rate is up 12 bpm from six months ago. There\'s a yoga class at 7 AM tomorrow. There\'s also a 7 AM standup. Your neck hasn\'t not hurt in weeks. You can\'t remember when that started.',
    choices: [
      {
        text: 'Buy the painkillers, pop two, get back to your laptop',
        delta: { Coherence: 5, Shadow: 6, Body: -4 },
      },
      {
        text: 'Skip the standup tomorrow. Go to yoga. Deal with Slack after.',
        delta: { Body: 8, Regeneration: 5, Shadow: -3 },
      },
      {
        text: 'Google "burnout symptoms" for the third time, screenshot the list, don\'t do anything about it',
        delta: { Depth: 6, Shadow: 4 },
      },
    ],
  },
  {
    id: 'shadow-failure',
    turn: 'Fall',
    turnIndex: 6,
    title: 'First Real No',
    text: 'You didn\'t get it. The program, the role, the thing you spent four months preparing for. The rejection email is three sentences long. Polite. Final. Your mom calls — she doesn\'t know yet. A classmate who also applied posts "Thrilled to share..." You\'re sitting in the library. The girl across the table is eating chips very loudly and you might cry or scream or both.',
    choices: [
      {
        text: 'Close the email. Open a new tab. Start looking for the next thing.',
        delta: { Coherence: 7, Shadow: 5, Regeneration: -2 },
      },
      {
        text: 'Call your mom. Tell her. Let it be awkward.',
        delta: { Transmission: 6, Regeneration: 5, Shadow: -2 },
      },
      {
        text: 'Leave the library. Walk for an hour. Don\'t listen to anything. Just walk.',
        delta: { Body: 6, Depth: 5, Regeneration: 4 },
      },
    ],
  },
  {
    id: 'shadow-ethics',
    turn: 'Gray',
    turnIndex: 7,
    title: 'The Gray Zone',
    text: 'Your team lead asks you to "polish" the numbers before the client presentation. Not fake them — just... present them in the most favorable light. "Everyone does this," she says. She\'s not wrong. The client won\'t know. Your name isn\'t on the deck. But your fingerprints are. The promotion cycle is in two months, and she\'s writing your review.',
    choices: [
      {
        text: 'Polish the numbers. This is how the game works.',
        delta: { Coherence: 5, Shadow: 7, Depth: -3 },
      },
      {
        text: 'Push back quietly — suggest showing the real numbers with better framing',
        delta: { Depth: 6, Coherence: 4, Transmission: 3 },
      },
      {
        text: 'Do it, but screenshot the original numbers and save them in a personal folder',
        delta: { Shadow: 5, Depth: 4, Coherence: 3 },
      },
    ],
  },
  {
    id: 'shadow-parents',
    turn: 'Home',
    turnIndex: 8,
    title: 'Sunday Call',
    text: 'Weekly family FaceTime. Dad asks about work — you give the highlight reel. Mom asks if you\'re eating well — you aim the camera away from the instant noodle cups. Then she says, "Your cousin just bought an apartment." Pause. "We\'re not comparing, just mentioning." You can hear the apartment prices in her voice. You love them. You also need to hang up in the next three minutes or you\'ll say something you regret.',
    choices: [
      {
        text: '"I know. I\'m working on it." Change the subject to Dad\'s garden.',
        delta: { Transmission: 5, Shadow: 5, Regeneration: 3 },
      },
      {
        text: '"Can we not do this every week?" Let the silence sit.',
        delta: { Coherence: 6, Depth: 5, Transmission: -3 },
      },
      {
        text: '"Mom, I\'m tired. Can I just be your kid for five minutes instead of a résumé?"',
        delta: { Depth: 7, Transmission: 6, Shadow: -4 },
      },
    ],
  },
  {
    id: 'shadow-junior',
    turn: 'Mirror',
    turnIndex: 9,
    title: 'The Intern',
    text: 'The new intern reminds you of yourself two years ago. Same nervous energy, same overprepared slides, same habit of saying "sorry" before every question. She asks if you have fifteen minutes. You have three. She wants advice on whether to go to grad school or take the return offer. You recognize the question — you asked someone the same thing once. They gave you a perfect answer. You can\'t remember what it was.',
    choices: [
      {
        text: 'Give her the efficient answer — pros, cons, done. You really do only have three minutes.',
        delta: { Coherence: 6, Shadow: 4, Transmission: 2 },
      },
      {
        text: 'Close your laptop. Give her the full fifteen. Tell her what you wish someone told you.',
        delta: { Transmission: 8, Depth: 4, Shadow: -3 },
      },
      {
        text: '"Honestly? I still don\'t know if I made the right call. But here\'s what I\'ve learned so far."',
        delta: { Depth: 7, Transmission: 5, Regeneration: 3 },
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
  { name: 'Signal', ageRange: '', index: 5 },
  { name: 'Fall', ageRange: '', index: 6 },
  { name: 'Gray', ageRange: '', index: 7 },
  { name: 'Home', ageRange: '', index: 8 },
  { name: 'Mirror', ageRange: '', index: 9 },
];
