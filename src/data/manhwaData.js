// Comprehensive Manhwa Database with Chapter Panels, Story Beats, and System Windows

export const MANHWA_CATALOG = [
  {
    id: 'the-necromancer-hunter',
    title: 'The Necromancer Hunter: Abyss Summons',
    koreanTitle: '네크로맨서 헌터: 심연의 소환',
    altTitle: 'Solo Shadow Monarch',
    coverImage: '/covers/shadow_monarch.jpg',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    rating: 9.96,
    views: '24.8M',
    bookmarksCount: '840K',
    rank: 'S-Rank #1',
    status: 'Ongoing',
    author: 'Chugong / Redice Studio',
    artist: 'DUBU Legacy',
    releaseDay: 'Thursday',
    genres: ['Action', 'Hunter', 'Fantasy', 'Necromancy', 'Dungeon'],
    synopsis: 'Ten years ago, the "Abyss Gates" ripped open across modern Earth, unleashing hordes of demonic beasts. While awakened humans gained magical abilities to become Hunters, Kang Min-Hyuk remained stuck as the world\'s weakest E-Rank porter. During a catastrophic double-dungeon raid inside Seoul Metro Line 4, he is abandoned by his raid party. On the brink of death, a floating holographic window materializes before his eyes: [You have qualified for the Secret Monarch Quest: "Arise from Death"]. Now armed with the authority to command legions of undead shadow soldiers, Min-Hyuk begins his relentless ascension to the pinnacle of mankind.',
    characters: [
      { name: 'Kang Min-Hyuk', role: 'Protagonist (Shadow Monarch)', rank: 'National Level', ability: 'Shadow Extraction, Monarch Domain, Ruler\'s Hand' },
      { name: 'Cha Yoo-Jin', role: 'Sword Master', rank: 'S-Rank', ability: 'Light Flash, Dancing Blade of Seraph' },
      { name: 'Igris / Shadow Knight', role: 'Monarch Elite Marshal', rank: 'S-Rank Shadow', ability: 'Blood Red Lightning, Cleaving Execution' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Prologue: The Double Dungeon Nightmare',
        releaseDate: 'Oct 15, 2026',
        likes: '142.5K',
        commentsCount: 1284,
        panels: [
          {
            type: 'scene',
            caption: 'Seoul Metro Sub-Level 8 — Unregistered Gate',
            bgStyle: 'linear-gradient(180deg, #090b14 0%, #15102a 60%, #0d071a 100%)',
            sceneType: 'dungeon_gate',
            sfx: 'G R R R R L...'
          },
          {
            type: 'dialogue',
            speaker: 'Raid Leader Park',
            avatar: '🛡️',
            text: 'Keep your shields locked! The dungeon boss is waking up! Porter Kang, drop the baggage and retreat!',
            position: 'left'
          },
          {
            type: 'system_window',
            level: 'danger',
            title: 'SYSTEM WARNING: S-RANK ANOMALY DETECTED',
            message: 'All exit portals have sealed. Survival probability: 0.003%. The Abyssal Monarch gazes into your soul.',
            stats: ['STATUS: FATAL BLEEDING', 'TIME UNTIL HEART STOP: 00:42']
          },
          {
            type: 'action_panel',
            title: 'SWORD OF THE MONARCH',
            sfx: '콰 아 아 앙 — !',
            glowColor: '#a855f7',
            desc: 'A colossal shadow blade plunges through the obsidian stone altar!'
          },
          {
            type: 'dialogue',
            speaker: 'Kang Min-Hyuk',
            avatar: '🗡️',
            text: 'Is this where I die...? Weak, abandoned, forgotten like trash in the dark...?',
            position: 'right'
          },
          {
            type: 'system_window',
            level: 'quest',
            title: 'HIDDEN QUEST: THE WORTHY VESSEL',
            message: 'You have persevered past the final trial. The Throne of Shadows has chosen you.',
            stats: ['PERMISSION GRANTED: SHADOW EXTRACTION (LV.1)', 'TITLE EARNED: HEIR OF THE SHADOW MONARCH', 'QUEST: SAY THE COMMAND WORD.']
          },
          {
            type: 'climax',
            quote: '“...ARISE.”',
            koreanQuote: '“일어나라.”',
            sfx: 'K K K R R R S H !',
            glowColor: '#c084fc',
            auraText: 'Electric purple shadows erupt from 500 fallen knights, saluting their new King!'
          }
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The Red-Haired Beast S-Rank Gate',
        releaseDate: 'Oct 18, 2026',
        likes: '118.9K',
        commentsCount: 940,
        panels: [
          {
            type: 'scene',
            caption: 'Hunter Association Central HQ — Re-evaluation Room',
            bgStyle: 'linear-gradient(180deg, #050b14 0%, #0b1a2d 60%, #030810 100%)',
            sceneType: 'association',
            sfx: 'BEEP... BEEP... BEEP...'
          },
          {
            type: 'dialogue',
            speaker: 'Chief Inspector Woo',
            avatar: '📋',
            text: 'The mana measuring crystal... it shattered into dust?! That only happens when mana output exceeds measurable S-Rank limits!',
            position: 'left'
          },
          {
            type: 'system_window',
            level: 'notification',
            title: 'STATUS WINDOW: KANG MIN-HYUK',
            message: 'Class: Shadow Monarch (Awakened). Available Shadows: 1,420. MP: 89,500 / 89,500.',
            stats: ['STRENGTH: 245 (+80)', 'AGILITY: 280 (+110)', 'INTELLIGENCE: 310 (+150)', 'SENSE: 260 (+90)']
          },
          {
            type: 'action_panel',
            title: 'SHADOW COMMAND: IGRIS EMERGES',
            sfx: 'S W O O O S H !',
            glowColor: '#ef4444',
            desc: 'A towering knight draped in crimson plume and obsidian armor steps out of Min-Hyuk\'s shadow!'
          },
          {
            type: 'dialogue',
            speaker: 'Kang Min-Hyuk',
            avatar: '🗡️',
            text: 'From this moment onward, I am no longer the prey. I am the hunter.',
            position: 'right'
          }
        ]
      },
      {
        id: 3,
        title: 'Chapter 3: Sovereign\'s March on Gangnam',
        releaseDate: 'Oct 22, 2026',
        likes: '96.2K',
        commentsCount: 812,
        panels: [
          {
            type: 'scene',
            caption: 'Seoul Sky Dome — Red Gate Inversion',
            bgStyle: 'linear-gradient(180deg, #180914 0%, #300c28 60%, #120310 100%)',
            sceneType: 'boss_battle',
            sfx: 'K K K A A A N G !'
          },
          {
            type: 'system_window',
            level: 'danger',
            title: 'EMERGENCY RAID: HIGH ORC SOVEREIGN KARGALGAN',
            message: 'All communications severed. Red Gate duration: 7 days until collapse.',
            stats: ['BOSS HP: 5,000,000 / 5,000,000', 'CURSE: BLOODLUST AURA ACTIVE']
          },
          {
            type: 'action_panel',
            title: 'DOMAIN OF THE MONARCH',
            sfx: 'B O O O O M ! !',
            glowColor: '#a855f7',
            desc: 'The ground for 5 kilometers in every direction turns pitch black as shadow hands grasp the enemy\'s feet.'
          },
          {
            type: 'climax',
            quote: '“Step back. This battlefield belongs to my army now.”',
            koreanQuote: '“물러서라. 이 전장은 이제 내 군단의 것이다.”',
            sfx: '콰 아 아 아 아 !',
            glowColor: '#8b5cf6',
            auraText: 'Over 5,000 shadow soldiers simultaneously release their war cry!'
          }
        ]
      }
    ]
  },
  {
    id: 'omniscient-readers-viewpoint',
    title: "Omniscient Reader's Viewpoint: Star Stream Scenario",
    koreanTitle: '전지적 독자 시점: 스타 스트림',
    altTitle: 'ORV: Constellation Broadcast',
    coverImage: '/covers/constellation_streamer.jpg',
    themeColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    rating: 9.98,
    views: '31.2M',
    bookmarksCount: '1.2M',
    rank: 'S-Rank #2',
    status: 'Ongoing',
    author: 'Sing-Shong',
    artist: 'Sleepy-C / Redice Studio',
    releaseDay: 'Wednesday',
    genres: ['Action', 'Apocalypse', 'Constellation', 'System', 'Psychological'],
    synopsis: 'Kim Dok-Ja was an ordinary office contractor whose sole hobby was reading an unpopular web novel titled "Three Ways to Survive in a Ruined World" for over ten years. At chapter 3,149, he was the only reader left in the world when the author sent him a gift: "The epilogue begins now." At 7:00 PM on a Seoul subway train, reality abruptly freezes. A goblin-like creature called a Dokkaebi appears in the train car announcing the kickoff of the "Star Stream". Suddenly, modern Earth becomes the stage for ancient Constellations watching humans struggle through brutal survival scenarios—and Dok-Ja is the only person who knows how the story ends.',
    characters: [
      { name: 'Kim Dok-Ja', role: 'The Sole Reader', rank: 'Constellation Candidate', ability: 'Omniscient Reader\'s Viewpoint, Fourth Wall, Bookmark' },
      { name: 'Yoo Joong-Hyuk', role: 'The Regressor', rank: 'Supreme Avatar', ability: 'Regression (Round 3), Transmission, Hellfire Slash' },
      { name: 'Bihyung', role: 'Intermediate Dokkaebi', rank: 'Streamer Host', ability: 'Scenario Management, Coin Exchange, Channel 101' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Scenario 1: Proof of Value',
        releaseDate: 'Oct 14, 2026',
        likes: '204.1K',
        commentsCount: 2410,
        panels: [
          {
            type: 'scene',
            caption: 'Seoul Subway Line 3 — Car 3807, 7:00 PM',
            bgStyle: 'linear-gradient(180deg, #041018 0%, #082333 60%, #030c12 100%)',
            sceneType: 'subway',
            sfx: 'SCREEEECH...'
          },
          {
            type: 'system_window',
            level: 'quest',
            title: '[MAIN SCENARIO #1 - PROOF OF VALUE]',
            message: 'Kill one or more living organisms within 30 minutes. Failure will result in immediate termination.',
            stats: ['TIME REMAINING: 29:58', 'REWARD: 300 COINS', 'PENALTY: DEATH']
          },
          {
            type: 'dialogue',
            speaker: 'Bihyung the Dokkaebi',
            avatar: '👹',
            text: 'Greetings, bugs of Earth! Welcome to the free channel broadcast. May your deaths entertain the Constellations!',
            position: 'left'
          },
          {
            type: 'dialogue',
            speaker: 'Kim Dok-Ja',
            avatar: '📖',
            text: 'The text I read for 10 years wasn\'t a fantasy. It was a manual for the end of the world.',
            position: 'right'
          },
          {
            type: 'system_window',
            level: 'constellation',
            title: '[THE CONSTELLATION "DEMON-LIKE JUDGE OF FIRE" IS CURIOUS]',
            message: 'Constellation Uriel is intrigued by your calmness. Sponsored 100 Coins.',
            stats: ['CURRENT COIN BALANCE: 100 C']
          },
          {
            type: 'climax',
            quote: '“There are three ways to survive a ruined world. Right now, I have forgotten a few. But one thing is certain: the one reading this will survive.”',
            koreanQuote: '“멸망한 세계에서 살아남는 세 가지 방법이 있다. 이제 나는 몇 개를 잊어버렸다. 그러나 단 한 가지는 확실하다. 지금 이 글을 읽는 그대가 살아남을 것이라는 사실이다.”',
            sfx: 'PING — !',
            glowColor: '#38bdf8',
            auraText: '[Exclusive Skill: "Fourth Wall" has been automatically deployed!]'
          }
        ]
      },
      {
        id: 2,
        title: 'Scenario 2: The Meeting with the Regressor',
        releaseDate: 'Oct 19, 2026',
        likes: '178.6K',
        commentsCount: 1820,
        panels: [
          {
            type: 'scene',
            caption: 'Dongho Bridge — Han River Scenario Zone',
            bgStyle: 'linear-gradient(180deg, #02121e 0%, #0b2e47 60%, #041521 100%)',
            sceneType: 'bridge',
            sfx: 'W H O O O S H...'
          },
          {
            type: 'dialogue',
            speaker: 'Yoo Joong-Hyuk',
            avatar: '⚔️',
            text: 'Who are you? You are not in my memories of the 1st or 2nd regressions. Are you a Prophet?',
            position: 'left'
          },
          {
            type: 'dialogue',
            speaker: 'Kim Dok-Ja',
            avatar: '📖',
            text: 'I am not a prophet, Yoo Joong-Hyuk. I am your sole companion to the end of this story.',
            position: 'right'
          },
          {
            type: 'system_window',
            level: 'constellation',
            title: '[CONSTELLATIONS ARE HOLDING THEIR BREATH]',
            message: 'Several Constellations are biting their fingernails at the tension. Sponsoring 2,000 Coins!',
            stats: ['CHANNEL 101 VIEWER COUNT: 42,900']
          }
        ]
      }
    ]
  },
  {
    id: 'the-ascension-of-the-blade',
    title: 'The Ascension of the Blade: Northern Saint',
    koreanTitle: '북천의 검성: 절대검존',
    altTitle: 'Legend of the Dragon Sword Saint',
    coverImage: '/covers/murim_demon.jpg',
    themeColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    rating: 9.94,
    views: '18.4M',
    bookmarksCount: '620K',
    rank: 'S-Rank #3',
    status: 'Ongoing',
    author: 'Woo-Gak / Northern Sect',
    artist: 'Hae-Min Studio',
    releaseDay: 'Friday',
    genres: ['Murim', 'Martial Arts', 'Revenge', 'Action', 'Historical'],
    synopsis: 'For generations, the Northern Heavenly Sect stood as the impenetrable iron fortress defending the Central Plains against the Silent Night demon horde. But when the corrupt Central Martial Alliance betrayed and executed the Sect Leader under false treason charges, his only son, Jin Mu-Won, was left as a hostage confined to the ruined Northern mountain. Under the watchful eyes of enemy spies, Mu-Won secretly deciphers the esoteric sword mantras carved into the crumbling stone walls. After ten years of solitary ascetic cultivation, the dormant Golden Dragon Blade awakens to cleanse the Martial Arts world with divine fire.',
    characters: [
      { name: 'Jin Mu-Won', role: 'The Northern Blade Saint', rank: 'Supreme Heavenly Realm', ability: 'Shadow Gathering Sword Arts, Golden Dragon Qi, Void Cleaver' },
      { name: 'Eun Ha-Seol', role: 'White Night Princess', rank: 'Transcendent Murim', ability: 'Frost Moon Steps, Absolute Cold Palm' },
      { name: 'Dam Soo-Cheon', role: 'Alliance Spear God', rank: 'Northern Dominator', ability: 'Rumbling Thunder Pierce, Ten Thousand Dragon Roar' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Prologue: Ashes of the Northern Pillar',
        releaseDate: 'Oct 12, 2026',
        likes: '135.2K',
        commentsCount: 980,
        panels: [
          {
            type: 'scene',
            caption: 'Mount Baekdu — The Ruined Northern Fortress',
            bgStyle: 'linear-gradient(180deg, #180d02 0%, #351f04 60%, #150901 100%)',
            sceneType: 'mountain',
            sfx: 'CRACKLE... FLAMES...'
          },
          {
            type: 'dialogue',
            speaker: 'Alliance Elder Jo',
            avatar: '🏯',
            text: 'Look at the Northern pup shivering in the snow! With your father dead, your sect is erased from the history scrolls forever.',
            position: 'left'
          },
          {
            type: 'action_panel',
            title: 'DRAGON SWORD MANTRA',
            sfx: 'C H I I I N G !',
            glowColor: '#f59e0b',
            desc: 'A jet-black blade wrapped in molten dragon flames slices cleanly through the mountain ridge behind him!'
          },
          {
            type: 'dialogue',
            speaker: 'Jin Mu-Won',
            avatar: '🗡️',
            text: 'The Northern Sect was never built on stone walls. It lives in the hearts of those who wield its blade.',
            position: 'right'
          },
          {
            type: 'climax',
            quote: '“Ten years I swallowed dust and blood. Today, the Heavens will remember why our sword was feared.”',
            koreanQuote: '“십 년을 흙과 피를 삼키며 견뎠다. 오늘, 천하는 우리 검이 왜 두려움이었는지를 다시 기억하게 될 것이다.”',
            sfx: 'K W A A A A N G !',
            glowColor: '#fbbf24',
            auraText: 'A five-clawed golden fire dragon roars across the snow peak!'
          }
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The Silent Night Envoys',
        releaseDate: 'Oct 17, 2026',
        likes: '112.4K',
        commentsCount: 760,
        panels: [
          {
            type: 'scene',
            caption: 'Gansu Valley — Wolf Pass Ambush',
            bgStyle: 'linear-gradient(180deg, #150a00 0%, #2e1503 60%, #0d0500 100%)',
            sceneType: 'ambush',
            sfx: 'SWISH... SWISH...'
          },
          {
            type: 'dialogue',
            speaker: 'Silent Night Shadow Master',
            avatar: '🥷',
            text: 'You cannot parry thousand poison needles in pitch darkness!',
            position: 'left'
          },
          {
            type: 'action_panel',
            title: 'VOID STEP: HEAVEN CLEAVER',
            sfx: 'S L A A A S H !',
            glowColor: '#eab308',
            desc: 'Without looking, Mu-Won turns his sheath. Every single poisoned needle is reflected simultaneously in a circle of golden sparks!'
          }
        ]
      }
    ]
  },
  {
    id: 'reborn-villainess-tyrant',
    title: 'The Reborn Villainess Tames the Imperial Tyrant',
    koreanTitle: '회귀한 악녀는 황제를 길들인다',
    altTitle: 'Villainess Throne Reversal',
    coverImage: '/covers/shadow_monarch.jpg', // themed fallback
    themeColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    rating: 9.91,
    views: '15.6M',
    bookmarksCount: '580K',
    rank: 'S-Rank #4',
    status: 'Ongoing',
    author: 'Park Yoon-Hee',
    artist: 'Lumiere Studios',
    releaseDay: 'Sunday',
    genres: ['Romance', 'Fantasy', 'Villainess', 'Royalty', 'Drama'],
    synopsis: 'Seduced and framed by her scheming half-sister and executed by the guillotine on the orders of the cold-blooded Emperor, Duchess Roxana de Valois thought her tragedy had ended. Instead, she awakens ten years in the past—on the day of the Imperial debutante ball where she first agreed to marry into the venomous royal court. Armed with complete knowledge of future betrayals, poison plots, and the Emperor’s hidden curse, Roxana decides: if they branded her a villainess in her past life, she will become the ruthless Empress who controls the Emperor himself like a loyal beast on a leash.',
    characters: [
      { name: 'Duchess Roxana de Valois', role: 'The Reborn Villainess', rank: 'Empress Regent', ability: 'Venom Resistance, Strategic Manipulation, Mind Reading' },
      { name: 'Emperor Cassian von Eckart', role: 'The Tyrant Emperor', rank: 'Bloodline Sovereign', ability: 'Shadow Dragon Curse, Divine Sword of Judgment' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Guillotine\'s Kiss',
        releaseDate: 'Oct 11, 2026',
        likes: '92.3K',
        commentsCount: 654,
        panels: [
          {
            type: 'scene',
            caption: 'Imperial Capital Valoria — Grand Ballroom 10 Years Ago',
            bgStyle: 'linear-gradient(180deg, #1c050d 0%, #380b1b 60%, #150208 100%)',
            sceneType: 'ballroom',
            sfx: 'CHAMPAGNE GLASSES CLINKING...'
          },
          {
            type: 'dialogue',
            speaker: 'Princess Larissa',
            avatar: '🎀',
            text: 'Sister, did you drop your glass? You look as if you saw a ghost...',
            position: 'left'
          },
          {
            type: 'dialogue',
            speaker: 'Duchess Roxana',
            avatar: '🍷',
            text: 'Not a ghost, sweet sister. I saw the day I attend your royal funeral.',
            position: 'right'
          },
          {
            type: 'climax',
            quote: '“I was too gentle before. This time, I will not ask for your throne—I will take it and feed you to the wolves.”',
            koreanQuote: '“지난 생에는 너무 너그러웠지. 이번에는 자비를 구하지 마라. 황좌는 내가 삼킬 테니.”',
            sfx: 'G L A S S  S H A T T E R !',
            glowColor: '#fb7185',
            auraText: 'Roxana crushes the crystal goblet in her bare velvet gloves without flinching!'
          }
        ]
      }
    ]
  },
  {
    id: 'sss-calamity-ranker',
    title: 'SSS-Class Calamity Hunter: The Undying Return',
    koreanTitle: 'SSS급 재앙 헌터의 무한 회귀',
    altTitle: 'Tower Climber Suicide Ranker',
    coverImage: '/covers/constellation_streamer.jpg',
    themeColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    rating: 9.89,
    views: '12.1M',
    bookmarksCount: '490K',
    rank: 'S-Rank #5',
    status: 'Ongoing',
    author: 'Shin Noah',
    artist: 'Studio White Dragon',
    releaseDay: 'Monday',
    genres: ['Action', 'Regression', 'Tower', 'Hunter', 'Dark Fantasy'],
    synopsis: 'Trapped on the 99th floor of the Tower of Calamity for fifty years, Gong-Ja died 4,000 times trying to save humanity from the Demon King. His only skill: [Whenever you are killed, you copy one skill from your killer and regress exactly 24 hours]. On his 4,001st death, he copies the Demon King\'s ultimate passive skill: [Infinite Calamity Flame]. Now resurrected back to the 1st floor of the Tower as a rookie, Gong-Ja embarks on a blistering speedrun to slaughter every traitor and monarch before the apocalypse can even begin.',
    characters: [
      { name: 'Kim Gong-Ja', role: 'The Suicide Ranker', rank: 'SSS-Rank Climber', ability: 'Death Regression, Skill Plunder, Calamity Flame' },
      { name: 'Sword Emperor Bae Seung-Min', role: 'Ghost Mentor', rank: 'Martial Phantom', ability: 'Specter Sword Whispers, 100,000 Slash Form' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: Death #4,001',
        releaseDate: 'Oct 09, 2026',
        likes: '88.4K',
        commentsCount: 512,
        panels: [
          {
            type: 'scene',
            caption: 'Floor 99 — Calamity Throne Room',
            bgStyle: 'linear-gradient(180deg, #1b0716 0%, #360f2c 60%, #12030f 100%)',
            sceneType: 'throne_destruction',
            sfx: 'CRACKLE OF HELLFIRE...'
          },
          {
            type: 'system_window',
            level: 'danger',
            title: '[SKILL ACTIVATION: MEMORY OF THE MARTYR]',
            message: 'You have been incinerated by the Flame of Calamity. Copying skill: [CALAMITY FLAME (SSS-RANK)]. Initiating 24-hour temporal reversal.',
            stats: ['REGRESSION COUNT: 4,001', 'STATUS: REWINDING TIME']
          },
          {
            type: 'dialogue',
            speaker: 'Kim Gong-Ja',
            avatar: '🔥',
            text: 'Floor 1 again? Good. This time I won\'t take fifty years. I\'ll clear this damn tower in fifty days.',
            position: 'right'
          }
        ]
      }
    ]
  },
  {
    id: 'nano-machine-cult',
    title: 'Nano Machine: Demonic Cult Reawakening',
    koreanTitle: '나노 마신: 마교 부활',
    altTitle: 'Cybernetic Demonic Cult Leader',
    coverImage: '/covers/murim_demon.jpg',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    rating: 9.93,
    views: '22.3M',
    bookmarksCount: '780K',
    rank: 'S-Rank #6',
    status: 'Ongoing',
    author: 'Han-Joong-Wueol-Ya',
    artist: 'Geum Gang-Bul-Gae',
    releaseDay: 'Tuesday',
    genres: ['Murim', 'Sci-Fi', 'System', 'Martial Arts', 'Overpowered'],
    synopsis: 'Cheon Yeo-Woon was the illegitimate son of the Grand Demonic Cult Leader, poisoned and hounded by the six great clan elders who murdered his mother. While bleeding out in the forest after a ruthless assassination attempt, a mysterious descendant from the year 3487 descends in a time machine and injects Yeo-Woon with billions of medical nanomachines. Connected to an internal cybernetic supercomputer, Yeo-Woon can instantly simulate martial arts forms, analyze enemy muscle movements at 120 frames per second, and auto-heal severed meridians in seconds.',
    characters: [
      { name: 'Cheon Yeo-Woon', role: 'The Nano Demonic Lord', rank: 'Heavenly Demon', ability: 'Nano Simulation, Butterfly Blade, Auto-Dodge Meridian Sync' },
      { name: 'Nano Supercomputer', role: 'AI Neural Core', rank: 'Sentient Tech', ability: 'Target Analysis, Muscle Override, Voice Translation' }
    ],
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Machine in the Blood',
        releaseDate: 'Oct 08, 2026',
        likes: '124.9K',
        commentsCount: 910,
        panels: [
          {
            type: 'scene',
            caption: 'Demonic Mountain — Deep Bamboo Valley',
            bgStyle: 'linear-gradient(180deg, #02160d 0%, #06311e 60%, #011009 100%)',
            sceneType: 'bamboo_forest',
            sfx: 'DRIP... DRIP...'
          },
          {
            type: 'system_window',
            level: 'quest',
            title: '[NANO MACHINE REBOOT: NEURAL INTERFACE ONLINE]',
            message: '7th Generation Medical Nanobots deployed. Neutralizing lethal cobra venom. Restoring internal qi flow.',
            stats: ['POISON ELIMINATION: 100%', 'MERIDIAN DAMAGE: HEALED', 'AI VOICE READY']
          },
          {
            type: 'dialogue',
            speaker: 'Nano AI Core',
            avatar: '🤖',
            text: 'Greetings, Master Cheon Yeo-Woon. Would you like me to scan and simulate the opponent\'s Demonic Sword form?',
            position: 'left'
          },
          {
            type: 'dialogue',
            speaker: 'Cheon Yeo-Woon',
            avatar: '⚔️',
            text: 'Simulate it. And show me every weakness in their stance.',
            position: 'right'
          }
        ]
      }
    ]
  }
];
