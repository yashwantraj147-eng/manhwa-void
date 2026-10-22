// Local storage management for reading progress, bookmarks, and Hunter stats
const STORAGE_KEYS = {
  BOOKMARKS: 'manhwa_bookmarks_v1',
  HISTORY: 'manhwa_history_v1',
  HUNTER_STATS: 'manhwa_hunter_stats_v1',
  READER_SETTINGS: 'manhwa_reader_settings_v1',
  COMMENTS: 'manhwa_user_comments_v1'
};

const DEFAULT_HUNTER_STATS = {
  name: 'Hunter Jin-Woo',
  title: 'Shadow Sovereign',
  level: 14,
  exp: 340,
  expToNext: 500,
  rank: 'S-Rank',
  chaptersRead: 28,
  readingTimeMinutes: 142,
  dailyQuests: [
    { id: 'q1', text: 'Read 2 chapters in Hunter genre', target: 2, current: 1, completed: false, rewardExp: 100 },
    { id: 'q2', text: 'Leave a reaction on any webtoon panel', target: 1, current: 0, completed: false, rewardExp: 50 },
    { id: 'q3', text: 'Add a new title to your library', target: 1, current: 1, completed: true, rewardExp: 75 }
  ]
};

const DEFAULT_SETTINGS = {
  stripWidth: 'standard', // 'slim' (540px), 'standard' (740px), 'wide' (960px)
  filterMode: 'normal',   // 'normal', 'night', 'warm', 'oled'
  ambientGlow: true,
  autoScrollSpeed: 1.5,
  soundEffects: true
};

export const storage = {
  // Bookmarks
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : ['the-necromancer-hunter', 'omniscient-readers-viewpoint'];
    } catch {
      return ['the-necromancer-hunter'];
    }
  },

  isBookmarked(manhwaId) {
    const list = this.getBookmarks();
    return list.includes(manhwaId);
  },

  toggleBookmark(manhwaId) {
    let list = this.getBookmarks();
    const isNowBookmarked = !list.includes(manhwaId);
    if (isNowBookmarked) {
      list.push(manhwaId);
      this.incrementDailyQuest('q3');
      this.addExp(40);
    } else {
      list = list.filter(id => id !== manhwaId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return isNowBookmarked;
  },

  // Reading History
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : {
        'the-necromancer-hunter': { chapterNumber: 2, progress: 85, timestamp: Date.now() - 3600000 },
        'omniscient-readers-viewpoint': { chapterNumber: 1, progress: 100, timestamp: Date.now() - 86400000 }
      };
    } catch {
      return {};
    }
  },

  getHistoryForManhwa(manhwaId) {
    const history = this.getHistory();
    return history[manhwaId] || null;
  },

  saveReadingProgress(manhwaId, chapterNumber, progressPercent) {
    const history = this.getHistory();
    const isNewChapter = !history[manhwaId] || history[manhwaId].chapterNumber !== chapterNumber;

    history[manhwaId] = {
      chapterNumber,
      progress: Math.min(100, Math.max(0, Math.round(progressPercent))),
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

    if (isNewChapter && progressPercent > 70) {
      this.incrementChaptersRead();
    }
  },

  // Hunter RPG Stats
  getHunterStats() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HUNTER_STATS);
      return data ? { ...DEFAULT_HUNTER_STATS, ...JSON.parse(data) } : DEFAULT_HUNTER_STATS;
    } catch {
      return DEFAULT_HUNTER_STATS;
    }
  },

  saveHunterStats(stats) {
    localStorage.setItem(STORAGE_KEYS.HUNTER_STATS, JSON.stringify(stats));
  },

  addExp(amount) {
    const stats = this.getHunterStats();
    stats.exp += amount;

    let leveledUp = false;
    while (stats.exp >= stats.expToNext) {
      stats.exp -= stats.expToNext;
      stats.level += 1;
      stats.expToNext = Math.round(stats.expToNext * 1.25);
      leveledUp = true;
    }

    // Recalculate Rank
    if (stats.level >= 25) stats.rank = 'National Rank';
    else if (stats.level >= 18) stats.rank = 'S-Rank';
    else if (stats.level >= 12) stats.rank = 'A-Rank';
    else if (stats.level >= 7) stats.rank = 'B-Rank';
    else if (stats.level >= 3) stats.rank = 'C-Rank';
    else stats.rank = 'D-Rank';

    this.saveHunterStats(stats);
    return { stats, leveledUp };
  },

  incrementChaptersRead() {
    const stats = this.getHunterStats();
    stats.chaptersRead += 1;
    this.addExp(75);
    this.incrementDailyQuest('q1');
    this.saveHunterStats(stats);
  },

  incrementDailyQuest(questId) {
    const stats = this.getHunterStats();
    const quest = stats.dailyQuests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      quest.current = Math.min(quest.target, quest.current + 1);
      if (quest.current >= quest.target) {
        quest.completed = true;
        this.addExp(quest.rewardExp);
      }
      this.saveHunterStats(stats);
    }
  },

  // Reader Settings
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READER_SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.READER_SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // Reader Comments
  getComments(chapterKey) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      const allComments = data ? JSON.parse(data) : {};
      return allComments[chapterKey] || [];
    } catch {
      return [];
    }
  },

  addComment(chapterKey, author, text) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      const allComments = data ? JSON.parse(data) : {};
      if (!allComments[chapterKey]) {
        allComments[chapterKey] = [];
      }
      const newComment = {
        id: 'c_' + Date.now(),
        author: author || 'Awakened Hunter',
        rank: 'A-Rank Hunter',
        text,
        timestamp: 'Just now',
        likes: 1
      };
      allComments[chapterKey].unshift(newComment);
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      this.addExp(30);
      return newComment;
    } catch {
      return null;
    }
  }
};
