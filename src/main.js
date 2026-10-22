// ==========================================================================
// MANHWA VOID — Main Application Orchestrator
// ==========================================================================

import { MANHWA_CATALOG } from './data/manhwaData.js';
import { icon } from './icons.js';
import { sound } from './audio.js';
import { storage } from './storage.js';
import { mangadex } from './services/mangadex.js';
import { localImporter } from './services/localImporter.js';

// Application State
const state = {
  currentView: 'catalog', // 'catalog' | 'reader'
  sourceMode: 'originals', // 'originals' | 'mangadex' | 'imported'
  mangadexList: [],
  importedManhwaList: [],
  isLoadingMangaDex: false,
  selectedGenre: 'all',
  currentSort: 'popularity',
  searchQuery: '',
  heroIndex: 0,
  activeManhwa: MANHWA_CATALOG[0],
  activeChapter: MANHWA_CATALOG[0].chapters[0],
  isAutoScrolling: false,
  autoScrollSpeed: 2,
  autoScrollAnimationId: null,
  readerSettings: storage.getSettings(),
  hunterStats: storage.getHunterStats()
};

// DOM Element References
const elements = {};

function populateElements() {
  Object.assign(elements, {
    // Navigation
    searchIconSlot: document.getElementById('searchIconSlot'),
    globalSearchInput: document.getElementById('globalSearchInput'),
    searchDropdown: document.getElementById('searchDropdown'),
    openImportModalBtn: document.getElementById('openImportModalBtn'),
    importIconSlot: document.getElementById('importIconSlot'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundIconSlot: document.getElementById('soundIconSlot'),
    hunterStatusBtn: document.getElementById('hunterStatusBtn'),
    navRankBadge: document.getElementById('navRankBadge'),
    navHunterName: document.getElementById('navHunterName'),
    navHunterLevel: document.getElementById('navHunterLevel'),
    libraryDrawerBtn: document.getElementById('libraryDrawerBtn'),
    bookmarkIconSlot: document.getElementById('bookmarkIconSlot'),
    libraryCountBadge: document.getElementById('libraryCountBadge'),
    brandLogoBtn: document.getElementById('brandLogoBtn'),

    // Views
    catalogView: document.getElementById('catalogView'),
    readerView: document.getElementById('readerView'),
    heroBannerSection: document.getElementById('heroBannerSection'),
    questTrackerBanner: document.getElementById('questTrackerBanner'),
    sourceModeSwitcher: document.getElementById('sourceModeSwitcher'),
    genrePillsList: document.getElementById('genrePillsList'),
    catalogSortSelect: document.getElementById('catalogSortSelect'),
    manhwaGrid: document.getElementById('manhwaGrid'),

    // Reader HUD
    readerBackIconSlot: document.getElementById('readerBackIconSlot'),
    exitReaderBtn: document.getElementById('exitReaderBtn'),
    readerManhwaTitle: document.getElementById('readerManhwaTitle'),
    readerChapterSelect: document.getElementById('readerChapterSelect'),
    readingProgressBar: document.getElementById('readingProgressBar'),
    readingProgressText: document.getElementById('readingProgressText'),
    autoScrollBtn: document.getElementById('autoScrollBtn'),
    autoScrollIconSlot: document.getElementById('autoScrollIconSlot'),
    autoScrollLabel: document.getElementById('autoScrollLabel'),
    autoScrollSpeedSelect: document.getElementById('autoScrollSpeedSelect'),
    readerSettingsBtn: document.getElementById('readerSettingsBtn'),
    settingsIconSlot: document.getElementById('settingsIconSlot'),
    readerSettingsPopover: document.getElementById('readerSettingsPopover'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    fullscreenIconSlot: document.getElementById('fullscreenIconSlot'),

    // Reader Strip
    readerStripWrapper: document.getElementById('readerStripWrapper'),
    readerAmbientGlow: document.getElementById('readerAmbientGlow'),
    readerStripContent: document.getElementById('readerStripContent'),
    reactionPillsContainer: document.getElementById('reactionPillsContainer'),
    commentsCountPill: document.getElementById('commentsCountPill'),
    newCommentInput: document.getElementById('newCommentInput'),
    postCommentBtn: document.getElementById('postCommentBtn'),
    commentsList: document.getElementById('commentsList'),
    prevChapterBottomBtn: document.getElementById('prevChapterBottomBtn'),
    nextChapterBottomBtn: document.getElementById('nextChapterBottomBtn'),
    prevBottomIconSlot: document.getElementById('prevBottomIconSlot'),
    nextBottomIconSlot: document.getElementById('nextBottomIconSlot'),
    backToTopBtn: document.getElementById('backToTopBtn'),

    // Modals & Drawers
    detailsModal: document.getElementById('detailsModal'),
    detailsModalContent: document.getElementById('detailsModalContent'),
    closeDetailsModalBtn: document.getElementById('closeDetailsModalBtn'),
    libraryDrawer: document.getElementById('libraryDrawer'),
    closeLibraryDrawerBtn: document.getElementById('closeLibraryDrawerBtn'),
    drawerBookmarksList: document.getElementById('drawerBookmarksList'),
    shelfCountText: document.getElementById('shelfCountText'),
    drawerQuestsList: document.getElementById('drawerQuestsList'),

    // Import Modal
    importModal: document.getElementById('importModal'),
    closeImportModalBtn: document.getElementById('closeImportModalBtn'),
    importDropZone: document.getElementById('importDropZone'),
    cbzFileInput: document.getElementById('cbzFileInput'),
    folderFileInput: document.getElementById('folderFileInput'),
    imagesFileInput: document.getElementById('imagesFileInput'),
    importProgressBox: document.getElementById('importProgressBox'),
    importStatusText: document.getElementById('importStatusText'),
    importProgressPercent: document.getElementById('importProgressPercent'),
    importProgressBar: document.getElementById('importProgressBar'),
    importPreviewCard: document.getElementById('importPreviewCard'),
    importPreviewThumb: document.getElementById('importPreviewThumb'),
    importPreviewTitle: document.getElementById('importPreviewTitle'),
    importPreviewChapter: document.getElementById('importPreviewChapter'),
    importPreviewPages: document.getElementById('importPreviewPages'),
    importReadNowBtn: document.getElementById('importReadNowBtn'),
    loadDemoChapterBtn: document.getElementById('loadDemoChapterBtn'),

    // Hunter License
    licenseHunterName: document.getElementById('licenseHunterName'),
    licenseHunterTitle: document.getElementById('licenseHunterTitle'),
    licenseRankText: document.getElementById('licenseRankText'),
    licenseRankStamp: document.getElementById('licenseRankStamp'),
    licenseLevelText: document.getElementById('licenseLevelText'),
    licenseExpNumbers: document.getElementById('licenseExpNumbers'),
    licenseExpFill: document.getElementById('licenseExpFill'),
    statsChaptersCount: document.getElementById('statsChaptersCount'),
    statsBookmarksCount: document.getElementById('statsBookmarksCount'),

    // Toast
    systemToast: document.getElementById('systemToast'),
    toastTitle: document.getElementById('toastTitle'),
    toastDesc: document.getElementById('toastDesc')
  });
}

// ==========================================================================
// Initialization
// ==========================================================================

function initApp() {
  populateElements();
  injectIcons();
  setupImportListeners();
  updateHunterNavBadge();
  updateLibraryCountBadge();
  renderHeroBanner();
  renderQuestTrackerBanner();
  renderManhwaGrid();
  setupEventListeners();
  applyReaderSettings();
}

function injectIcons() {
  elements.searchIconSlot.innerHTML = icon('search', { size: 18 });
  elements.soundIconSlot.innerHTML = sound.isMuted() ? icon('volume-x', { size: 18 }) : icon('volume-2', { size: 18 });
  elements.bookmarkIconSlot.innerHTML = icon('bookmark', { size: 18 });
  elements.readerBackIconSlot.innerHTML = icon('arrow-left', { size: 16 });
  elements.autoScrollIconSlot.innerHTML = icon('play', { size: 16 });
  elements.settingsIconSlot.innerHTML = icon('sliders', { size: 18 });
  elements.fullscreenIconSlot.innerHTML = icon('maximize', { size: 18 });
  elements.prevBottomIconSlot.innerHTML = icon('chevron-left', { size: 16 });
  elements.nextBottomIconSlot.innerHTML = icon('chevron-right', { size: 16 });
}

// ==========================================================================
// Toast & Audio Feedback
// ==========================================================================

let toastTimeout = null;
function showSystemToast(title, desc, isReward = false) {
  if (isReward) {
    sound.playLevelUp();
  } else {
    sound.playChime();
  }

  elements.toastTitle.textContent = title;
  elements.toastDesc.textContent = desc;
  elements.systemToast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.systemToast.classList.add('hidden');
  }, 3500);
}

// ==========================================================================
// Hunter RPG System & UI Updates
// ==========================================================================

function updateHunterNavBadge() {
  const stats = storage.getHunterStats();
  elements.navRankBadge.textContent = stats.rank;
  elements.navHunterName.textContent = stats.name;
  elements.navHunterLevel.textContent = `Lv. ${stats.level}`;

  // License Card in Drawer
  elements.licenseHunterName.textContent = stats.name;
  elements.licenseHunterTitle.textContent = stats.title;
  elements.licenseRankText.textContent = stats.rank;
  elements.licenseRankStamp.textContent = stats.rank.charAt(0);
  elements.licenseLevelText.textContent = stats.level;
  elements.licenseExpNumbers.textContent = `${stats.exp} / ${stats.expToNext} XP`;
  const pct = Math.min(100, Math.round((stats.exp / stats.expToNext) * 100));
  elements.licenseExpFill.style.width = `${pct}%`;
  elements.statsChaptersCount.textContent = stats.chaptersRead;

  const bookmarks = storage.getBookmarks();
  elements.statsBookmarksCount.textContent = bookmarks.length;
}

function updateLibraryCountBadge() {
  const bookmarks = storage.getBookmarks();
  elements.libraryCountBadge.textContent = bookmarks.length;
}

// ==========================================================================
// Hero Banner Carousel
// ==========================================================================

function renderHeroBanner() {
  const item = MANHWA_CATALOG[state.heroIndex];
  const isBm = storage.isBookmarked(item.id);

  elements.heroBannerSection.innerHTML = `
    <div class="hero-carousel">
      <img src="${item.coverImage}" alt="${item.title}" class="hero-backdrop-img" />
      <div class="hero-gradient-overlay"></div>
      <div class="hero-content">
        <div class="hero-cover-wrap">
          <img src="${item.coverImage}" alt="${item.title}" class="hero-cover-img" />
        </div>
        <div class="hero-info">
          <div class="hero-tags-row">
            <span class="hero-tag rank-tag">${item.rank}</span>
            <span class="hero-tag">${item.status}</span>
            <span class="hero-tag">${item.releaseDay} Updates</span>
            ${item.genres.slice(0, 3).map(g => `<span class="hero-tag">${g}</span>`).join('')}
          </div>
          <h1 class="hero-title">${item.title}</h1>
          <div class="hero-korean-title">${item.koreanTitle} • ${item.altTitle}</div>
          <div class="hero-stats-row">
            <span class="hero-stat">⭐ <strong>${item.rating}</strong> Rating</span>
            <span class="hero-stat">👁️ <strong>${item.views}</strong> Views</span>
            <span class="hero-stat">📖 <strong>${item.chapters.length}</strong> Chapters</span>
          </div>
          <p class="hero-synopsis">${item.synopsis}</p>
          <div class="hero-actions">
            <button class="hero-read-btn primary-glow-btn" id="heroStartReadingBtn">
              ${icon('book-open', { size: 18 })} Read Chapter 1
            </button>
            <button class="hero-bookmark-btn ${isBm ? 'bookmarked' : ''}" id="heroBookmarkBtn">
              ${icon(isBm ? 'bookmark-check' : 'bookmark', { size: 18 })}
              <span>${isBm ? 'In Library' : 'Add to Library'}</span>
            </button>
            <button class="hero-details-btn" id="heroDetailsBtn">
              ${icon('sparkles', { size: 18 })} Details & Lore
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Dynamic ambient backdrop color matching manhwa theme
  const ambient = document.getElementById('ambientBackdrop');
  if (ambient) {
    ambient.style.background = `
      radial-gradient(circle at 10% 15%, ${item.glowColor} 0%, transparent 45%),
      radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.95) 0%, var(--bg-darkest) 100%)
    `;
  }

  // Hook Hero Buttons
  document.getElementById('heroStartReadingBtn').addEventListener('click', () => {
    openReader(item, item.chapters[0]);
  });

  document.getElementById('heroBookmarkBtn').addEventListener('click', () => {
    const isNow = storage.toggleBookmark(item.id);
    sound.playChime();
    showSystemToast(
      isNow ? 'LIBRARY UPDATED' : 'REMOVED FROM VAULT',
      isNow ? `Added "${item.title}" to Hunter Library (+40 XP)` : `Removed "${item.title}" from library.`
    );
    renderHeroBanner();
    renderManhwaGrid();
    updateHunterNavBadge();
    updateLibraryCountBadge();
  });

  document.getElementById('heroDetailsBtn').addEventListener('click', () => {
    openDetailsModal(item);
  });
}

// ==========================================================================
// Quest Tracker Banner
// ==========================================================================

function renderQuestTrackerBanner() {
  const stats = storage.getHunterStats();

  elements.questTrackerBanner.innerHTML = `
    <div class="quest-banner-left">
      <div class="quest-icon-badge">⚡</div>
      <div class="quest-banner-info">
        <h4>HUNTER DAILY COMMISSION</h4>
        <p>Complete daily reading quests to earn EXP and unlock higher hunter privileges!</p>
      </div>
    </div>
    <div class="quest-items-mini">
      ${stats.dailyQuests.map(q => `
        <div class="quest-pill ${q.completed ? 'completed' : ''}">
          <span>${q.completed ? '✓' : '○'}</span>
          <span>${q.text} (${q.current}/${q.target})</span>
          <strong style="color: var(--accent-gold);">+${q.rewardExp}XP</strong>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================================================
// Catalog Grid & Filters
// ==========================================================================

function getFilteredAndSortedManhwa() {
  let list = [];
  if (state.sourceMode === 'imported') {
    list = [...state.importedManhwaList];
  } else if (state.sourceMode === 'mangadex') {
    list = [...state.mangadexList];
  } else {
    list = [...MANHWA_CATALOG];
  }

  // Genre filter
  if (state.selectedGenre === 'bookmarks') {
    const bookmarkedIds = storage.getBookmarks();
    list = list.filter(m => bookmarkedIds.includes(m.id));
  } else if (state.selectedGenre !== 'all') {
    list = list.filter(m => m.genres.some(g => g.toLowerCase().includes(state.selectedGenre.toLowerCase())));
  }

  // Search Query
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.koreanTitle.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q)) ||
      m.author.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (state.currentSort) {
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'title':
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'views':
      list.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
      break;
    case 'popularity':
    default:
      // Default order
      break;
  }

  return list;
}

function renderManhwaGrid() {
  if (state.sourceMode === 'mangadex' && state.isLoadingMangaDex) {
    elements.manhwaGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--accent-cyan);">
        <div class="spinner-ring" style="margin: 0 auto 16px;"></div>
        <p style="font-size: 1.1rem; font-weight: 700;">CONNECTING TO MANGADEX LIVE FEED...</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Streaming top popular Korean manhwa series</p>
      </div>
    `;
    return;
  }

  if (state.sourceMode === 'imported' && state.importedManhwaList.length === 0) {
    elements.manhwaGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 3.5rem; margin-bottom: 14px;">📁</div>
        <h3 style="font-size: 1.3rem; color: #fff; font-weight: 800; margin-bottom: 8px;">NO LOCAL CHAPTERS IMPORTED YET</h3>
        <p style="font-size: 0.92rem; max-width: 480px; margin: 0 auto 24px; line-height: 1.6;">
          You can drag and drop any <strong>.CBZ</strong>, <strong>.ZIP</strong>, or webtoon chapter image folder directly onto this page to start reading!
        </p>
        <button id="emptyImportBtn" class="hero-read-btn primary-glow-btn" style="margin: 0 auto; display: inline-flex;">
          ${icon('bookmark', { size: 18 })} Open Chapter Importer
        </button>
      </div>
    `;
    document.getElementById('emptyImportBtn')?.addEventListener('click', openImportModal);
    return;
  }

  const list = getFilteredAndSortedManhwa();

  if (list.length === 0) {
    elements.manhwaGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 8px;">No awakened series found</p>
        <p style="font-size: 0.9rem;">Try selecting a different genre or clearing your search term.</p>
      </div>
    `;
    return;
  }

  elements.manhwaGrid.innerHTML = list.map((item, index) => {
    const isBm = storage.isBookmarked(item.id);
    const history = storage.getHistoryForManhwa(item.id);
    const lastChapterText = history ? `Resume Ch. ${history.chapterNumber}` : (item.source === 'mangadex' ? 'Read Live' : 'Start Ch. 1');

    return `
      <div class="manhwa-card" data-id="${item.id}">
        <div class="card-poster-wrap">
          <img src="${item.coverImage}" alt="${item.title}" class="card-poster-img" loading="lazy" />
          <span class="card-rank-tag ${index === 0 ? 'gold' : ''}">${item.source === 'imported' ? 'Local File' : (item.source === 'mangadex' ? 'MangaDex' : item.rank)}</span>
          <span class="card-rating-tag">⭐ ${item.rating}</span>
          
          <div class="card-overlay-actions">
            <button class="card-quick-read-btn" data-action="quick-read" data-id="${item.id}">
              ${icon('book-open', { size: 16 })} ${lastChapterText}
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-genres">
            ${item.genres.slice(0, 2).map(g => `<span class="card-genre-pill">${g}</span>`).join('')}
          </div>
          <h3 class="card-title">${item.title}</h3>
          
          <div class="card-footer">
            <span>👁️ ${item.views}</span>
            <span>${item.source === 'mangadex' ? 'Live Ch.' : `${item.chapters.length} Ch.`}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card event listeners
  document.querySelectorAll('.manhwa-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const manhwaId = card.getAttribute('data-id');
      const pool = state.sourceMode === 'imported'
        ? state.importedManhwaList
        : (state.sourceMode === 'mangadex' ? state.mangadexList : MANHWA_CATALOG);
      const item = pool.find(m => m.id === manhwaId) || MANHWA_CATALOG.find(m => m.id === manhwaId);
      if (!item) return;

      if (e.target.closest('[data-action="quick-read"]')) {
        const history = storage.getHistoryForManhwa(item.id);
        const chapterToRead = history 
          ? (item.chapters || []).find(c => String(c.id) === String(history.chapterNumber)) || item.chapters?.[0]
          : item.chapters?.[0];
        openReader(item, chapterToRead);
      } else {
        openDetailsModal(item);
      }
    });
  });
}

// ==========================================================================
// Interactive Webtoon Vertical Reader View
// ==========================================================================

async function openReader(manhwa, chapter) {
  state.activeManhwa = manhwa;

  // If MangaDex manhwa and chapters not loaded yet:
  if (manhwa.source === 'mangadex' && (!manhwa.chapters || manhwa.chapters.length === 0)) {
    elements.catalogView.classList.add('hidden');
    elements.readerView.classList.remove('hidden');
    state.currentView = 'reader';
    elements.readerManhwaTitle.textContent = manhwa.title;
    elements.readerStripContent.innerHTML = `
      <div class="reader-loading-spinner">
        <div class="spinner-ring"></div>
        <h4>FETCHING CHAPTERS FROM MANGADEX...</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Querying official API stream</p>
      </div>
    `;
    const chs = await mangadex.fetchChapters(manhwa.id);
    manhwa.chapters = chs;
  }

  state.activeChapter = chapter || manhwa.chapters?.[0] || { id: 'default', title: 'Chapter 1', panels: [] };
  sound.playSwoosh();

  // Populate HUD details
  elements.readerManhwaTitle.textContent = manhwa.title;
  elements.readerChapterSelect.innerHTML = (manhwa.chapters || []).map(c => {
    const extBadge = c.isExternal ? ' [🔗 External]' : (c.pagesCount ? ` (${c.pagesCount}p)` : '');
    return `
      <option value="${c.id}" ${String(c.id) === String(state.activeChapter.id) ? 'selected' : ''}>
        ${c.title}${extBadge}
      </option>
    `;
  }).join('');

  // Switch View
  elements.catalogView.classList.add('hidden');
  elements.readerView.classList.remove('hidden');
  state.currentView = 'reader';

  // Render Webtoon continuous panels
  await renderReaderPanels();
  renderReaderComments();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
  updateReadingProgress();

  // Update dynamic ambient aura color
  elements.readerAmbientGlow.style.background = `radial-gradient(ellipse at 50% 30%, ${manhwa.glowColor || 'rgba(139, 92, 246, 0.45)'} 0%, transparent 70%)`;

  // Start sound ambient drone if unmuted
  sound.toggleAmbientDrone(true);
}

function exitReader() {
  stopAutoScroll();
  sound.toggleAmbientDrone(false);
  sound.playSwoosh();

  elements.readerView.classList.add('hidden');
  elements.catalogView.classList.remove('hidden');
  state.currentView = 'catalog';

  renderManhwaGrid();
  renderQuestTrackerBanner();
  updateHunterNavBadge();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function renderReaderPanels() {
  // Check if active chapter is from local import
  if (state.activeChapter.source === 'local') {
    const pages = state.activeChapter.pages || [];
    elements.readerStripContent.innerHTML = pages.map((pageUrl, idx) => `
      <div class="webtoon-image-panel" data-page="${idx + 1}">
        <img src="${pageUrl}" alt="Webtoon Panel ${idx + 1}" loading="lazy" />
      </div>
    `).join('');

    updateReadingProgress();
    return;
  }

  // Check if active chapter is from MangaDex
  if (state.activeChapter.source === 'mangadex') {
    if (state.activeChapter.isExternal) {
      renderExternalChapterNotice();
      return;
    }

    elements.readerStripContent.innerHTML = `
      <div class="reader-loading-spinner">
        <div class="spinner-ring"></div>
        <h4>STREAMING FROM MANGADEX CDN...</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Loading high-definition vertical webtoon panels</p>
      </div>
    `;

    const pages = await mangadex.fetchChapterPages(state.activeChapter.id);
    if (!pages || pages.length === 0) {
      renderExternalChapterNotice();
      return;
    }

    elements.readerStripContent.innerHTML = pages.map((pageUrl, idx) => `
      <div class="webtoon-image-panel" data-page="${idx + 1}">
        <img src="${pageUrl}" alt="Webtoon Panel ${idx + 1}" loading="lazy" />
      </div>
    `).join('');

    updateReadingProgress();
    return;
  }

  // Original rich interactive story panels
  renderStoryPanels();
}

function renderExternalChapterNotice() {
  const extUrl = state.activeChapter.externalUrl;
  let host = 'Official Platform';
  try {
    if (extUrl) host = new URL(extUrl).hostname;
  } catch {}

  elements.readerStripContent.innerHTML = `
    <div class="external-chapter-card">
      <div class="external-portal-icon">🔗</div>
      <h3 class="external-card-title">OFFICIAL LICENSED CHAPTER</h3>
      <p class="external-card-desc">
        This chapter is officially licensed and hosted on <strong>${host}</strong>. MangaDex redirects official releases to prevent copyright takedowns.
      </p>
      <div class="external-card-actions">
        ${extUrl ? `
          <a href="${extUrl}" target="_blank" rel="noopener noreferrer" class="hero-read-btn primary-glow-btn">
            ${icon('book-open', { size: 16 })} Open on ${host} ↗
          </a>
        ` : ''}
        <button id="externalOpenImportBtn" class="hero-read-btn" style="background: rgba(139, 92, 246, 0.2); border: 1px solid var(--accent-purple); color: #fff;">
          📁 Import Local Download (.CBZ / Folder)
        </button>
      </div>
      <div class="external-card-tip">
        <span>💡</span>
        <p><strong>Hunter Tip:</strong> You can download any manhwa chapter as a .CBZ, .ZIP, or image folder and read it offline inside MANHWA VOID!</p>
      </div>
    </div>
  `;

  document.getElementById('externalOpenImportBtn')?.addEventListener('click', openImportModal);
}

function renderStoryPanels() {
  // Original rich interactive story panels
  const panels = state.activeChapter.panels || [];

  elements.readerStripContent.innerHTML = panels.map((panel, idx) => {
    switch (panel.type) {
      case 'scene':
        return `
          <div class="webtoon-panel panel-scene" style="background: ${panel.bgStyle};">
            <span class="scene-caption-pill">${panel.caption}</span>
            <div class="scene-graphic-wrap">
              <div class="scene-sfx-text">${panel.sfx}</div>
            </div>
            <div></div>
          </div>
        `;

      case 'dialogue':
        return `
          <div class="webtoon-panel panel-dialogue ${panel.position}">
            <div class="speaker-avatar-circle">${panel.avatar}</div>
            <div class="speech-bubble">
              <span class="speech-speaker-name">${panel.speaker}</span>
              ${panel.text}
            </div>
          </div>
        `;

      case 'system_window':
        return `
          <div class="webtoon-panel panel-system-window">
            <div class="hunter-system-box ${panel.level}">
              <div class="system-box-header">
                <span>[${panel.title}]</span>
                <span>SYSTEM NOTIFICATION</span>
              </div>
              <div class="system-box-message">${panel.message}</div>
              <div class="system-box-stats">
                ${panel.stats.map(s => `<div class="system-stat-line">◆ ${s}</div>`).join('')}
              </div>
            </div>
          </div>
        `;

      case 'action_panel':
        return `
          <div class="webtoon-panel panel-action">
            <div class="action-sfx-huge" style="text-shadow: 0 0 24px ${panel.glowColor};">
              ${panel.sfx}
            </div>
            <p class="action-desc">${panel.desc}</p>
          </div>
        `;

      case 'climax':
        return `
          <div class="webtoon-panel panel-climax">
            <div class="climax-quote">${panel.quote}</div>
            <div class="climax-korean">${panel.koreanQuote}</div>
            <div class="action-sfx-huge" style="font-size: 2rem; margin-top: 14px; text-shadow: 0 0 30px ${panel.glowColor};">
              ${panel.sfx}
            </div>
            <p class="climax-aura-text">${panel.auraText}</p>
          </div>
        `;

      default:
        return '';
    }
  }).join('');
}

function updateReadingProgress() {
  if (state.currentView !== 'reader') return;

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY;
  const progressPercent = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;

  elements.readingProgressBar.style.width = `${progressPercent}%`;
  elements.readingProgressText.textContent = `${Math.round(progressPercent)}%`;

  // Persist progress
  if (state.activeManhwa && state.activeChapter) {
    storage.saveReadingProgress(state.activeManhwa.id, state.activeChapter.id, progressPercent);
  }
}

// Auto-Scroll Feature
function toggleAutoScroll() {
  if (state.isAutoScrolling) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
}

function startAutoScroll() {
  state.isAutoScrolling = true;
  elements.autoScrollIconSlot.innerHTML = icon('pause', { size: 16 });
  elements.autoScrollLabel.textContent = 'Pause';
  elements.autoScrollBtn.classList.add('primary-glow-btn');

  function scrollStep() {
    if (!state.isAutoScrolling) return;

    window.scrollBy({ top: state.autoScrollSpeed, behavior: 'instant' });

    // Check if reached bottom
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2) {
      stopAutoScroll();
      showSystemToast('CHAPTER COMPLETED!', 'You reached the end of this chapter. Proceeding to rewards.', true);
      storage.incrementDailyQuest('q1');
      updateHunterNavBadge();
      return;
    }

    state.autoScrollAnimationId = requestAnimationFrame(scrollStep);
  }

  state.autoScrollAnimationId = requestAnimationFrame(scrollStep);
}

function stopAutoScroll() {
  state.isAutoScrolling = false;
  cancelAnimationFrame(state.autoScrollAnimationId);
  elements.autoScrollIconSlot.innerHTML = icon('play', { size: 16 });
  elements.autoScrollLabel.textContent = 'Auto-Scroll';
  elements.autoScrollBtn.classList.remove('primary-glow-btn');
}

// Chapter Comments & Reactions
function renderReaderComments() {
  const chapterKey = `${state.activeManhwa.id}_ch${state.activeChapter.id}`;
  const userComments = storage.getComments(chapterKey);

  const defaultComments = [
    { author: 'ShadowLord_99', rank: 'S-Rank Hunter', text: 'Min-Hyuk saying "Arise" gave me absolute chills!! Peak fiction right here.', time: '2 hours ago' },
    { author: 'ConstellationViewer', rank: 'Constellation Candidate', text: 'The Korean SFX and pacing are on another level. Can’t wait for next week!', time: '5 hours ago' }
  ];

  const allComments = [...userComments, ...defaultComments];
  elements.commentsCountPill.textContent = `${allComments.length + 1280} Comments`;

  elements.commentsList.innerHTML = allComments.map(c => `
    <div class="comment-card">
      <div class="comment-top">
        <div class="comment-author-group">
          <span class="comment-author">${c.author}</span>
          <span class="comment-rank">${c.rank}</span>
        </div>
        <span class="comment-time">${c.time || c.timestamp}</span>
      </div>
      <p class="comment-text">${c.text}</p>
    </div>
  `).join('');
}

function postUserComment() {
  const text = elements.newCommentInput.value.trim();
  if (!text) return;

  const chapterKey = `${state.activeManhwa.id}_ch${state.activeChapter.id}`;
  const stats = storage.getHunterStats();
  storage.addComment(chapterKey, stats.name, text);
  sound.playChime();

  elements.newCommentInput.value = '';
  renderReaderComments();
  showSystemToast('COMMENT BROADCAST', 'Your comment was transmitted across the hunter stream! (+30 XP)');
  updateHunterNavBadge();
}

// Floating Particle Effect for Reactions
function spawnFloatingReaction(emoji, x, y) {
  const particle = document.createElement('div');
  particle.className = 'floating-particle';
  particle.textContent = emoji;
  particle.style.left = `${x - 15}px`;
  particle.style.top = `${y - 15}px`;
  document.body.appendChild(particle);

  sound.playPop();

  setTimeout(() => {
    particle.remove();
  }, 1200);
}

// ==========================================================================
// Details Modal
// ==========================================================================

async function openDetailsModal(item) {
  const isBm = storage.isBookmarked(item.id);

  function getModalContent(chaptersList) {
    return `
      <div class="modal-header-layout">
        <div class="modal-poster-wrap">
          <img src="${item.coverImage}" alt="${item.title}" class="modal-poster-img" />
        </div>
        <div class="modal-header-meta">
          <div class="hero-tags-row">
            <span class="hero-tag rank-tag">${item.rank}</span>
            <span class="hero-tag">${item.status}</span>
            <span class="hero-tag">⭐ ${item.rating}</span>
            ${item.source === 'mangadex' ? '<span class="hero-tag" style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #fff;">🌐 MangaDex</span>' : ''}
          </div>
          <h2 class="modal-title">${item.title}</h2>
          <div class="hero-korean-title">${item.koreanTitle}</div>
          <div class="hero-stats-row">
            <span>Author: <strong style="color:#fff;">${item.author}</strong></span>
            <span>Artist: <strong style="color:#fff;">${item.artist}</strong></span>
          </div>
          <div class="hero-actions" style="margin-top: 10px;">
            <button class="hero-read-btn primary-glow-btn" id="modalStartReadBtn">
              ${icon('book-open', { size: 16 })} Start Reading
            </button>
            <button class="hero-bookmark-btn" id="modalBookmarkBtn">
              ${icon(isBm ? 'bookmark-check' : 'bookmark', { size: 16 })}
              <span>${isBm ? 'In Library' : 'Add to Library'}</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 8px;">SYNOPSIS</h4>
        <p style="font-family: var(--font-read); font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
          ${item.synopsis}
        </p>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 12px;">AWAKENED CHARACTERS & RANKS</h4>
        <div class="modal-characters-grid">
          ${item.characters.map(c => `
            <div class="char-card">
              <div class="char-name">${c.name}</div>
              <div class="char-role">${c.role} • <strong>${c.rank}</strong></div>
              <div class="char-ability">Skills: ${c.ability}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 12px;">
          AVAILABLE CHAPTERS (${chaptersList.length})
        </h4>
        <div class="modal-chapters-list">
          ${chaptersList.length === 0 ? `
            <div class="reader-loading-spinner" style="padding: 24px;">
              <div class="spinner-ring" style="width: 28px; height: 28px; border-width: 2px;"></div>
              <p style="font-size: 0.85rem; color: var(--accent-cyan);">Streaming chapters from MangaDex...</p>
            </div>
          ` : chaptersList.map(c => `
            <div class="chapter-row" data-chapter-id="${c.id}">
              <span class="chapter-row-title">${c.title}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${c.releaseDate || ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function bindEvents() {
    document.getElementById('modalStartReadBtn')?.addEventListener('click', () => {
      elements.detailsModal.classList.add('hidden');
      openReader(item, item.chapters?.[0]);
    });

    document.getElementById('modalBookmarkBtn')?.addEventListener('click', () => {
      const isNow = storage.toggleBookmark(item.id);
      sound.playChime();
      showSystemToast(
        isNow ? 'LIBRARY UPDATED' : 'REMOVED FROM VAULT',
        isNow ? `Added "${item.title}" to Library (+40 XP)` : `Removed "${item.title}"`
      );
      openDetailsModal(item);
      renderManhwaGrid();
      updateHunterNavBadge();
      updateLibraryCountBadge();
    });

    document.querySelectorAll('.chapter-row').forEach(row => {
      row.addEventListener('click', () => {
        const chId = row.getAttribute('data-chapter-id');
        const ch = item.chapters.find(c => String(c.id) === String(chId));
        elements.detailsModal.classList.add('hidden');
        openReader(item, ch);
      });
    });
  }

  elements.detailsModalContent.innerHTML = getModalContent(item.chapters || []);
  elements.detailsModal.classList.remove('hidden');
  bindEvents();

  // If MangaDex and chapters are not loaded yet, fetch now
  if (item.source === 'mangadex' && (!item.chapters || item.chapters.length === 0)) {
    const chs = await mangadex.fetchChapters(item.id);
    item.chapters = chs;
    elements.detailsModalContent.innerHTML = getModalContent(item.chapters);
    bindEvents();
  }
}

// ==========================================================================
// Library & Hunter License Drawer
// ==========================================================================

function openLibraryDrawer() {
  sound.playSwoosh();
  updateHunterNavBadge();
  renderDrawerBookmarks();
  renderDrawerQuests();
  elements.libraryDrawer.classList.remove('hidden');
}

function closeLibraryDrawer() {
  elements.libraryDrawer.classList.add('hidden');
}

function renderDrawerBookmarks() {
  const bookmarkedIds = storage.getBookmarks();
  const bookmarkedList = MANHWA_CATALOG.filter(m => bookmarkedIds.includes(m.id));

  elements.shelfCountText.textContent = `${bookmarkedList.length} Titles`;

  if (bookmarkedList.length === 0) {
    elements.drawerBookmarksList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.86rem;">
        No series bookmarked yet. Click "Add to Library" on any title!
      </div>
    `;
    return;
  }

  elements.drawerBookmarksList.innerHTML = bookmarkedList.map(item => {
    const history = storage.getHistoryForManhwa(item.id);
    const chText = history ? `Ch. ${history.chapterNumber} (${history.progress}%)` : 'Ch. 1';

    return `
      <div class="drawer-bookmark-item" data-id="${item.id}">
        <img src="${item.coverImage}" alt="${item.title}" class="drawer-bm-thumb" />
        <div class="drawer-bm-info">
          <div class="drawer-bm-title">${item.title}</div>
          <div class="drawer-bm-chapter">📖 ${chText}</div>
        </div>
        <button class="hud-btn" data-action="remove-bm" data-id="${item.id}" style="padding: 0 10px; font-size: 0.72rem;">
          ✕
        </button>
      </div>
    `;
  }).join('');

  elements.drawerBookmarksList.querySelectorAll('.drawer-bookmark-item').forEach(itemEl => {
    itemEl.addEventListener('click', (e) => {
      const id = itemEl.getAttribute('data-id');
      const item = MANHWA_CATALOG.find(m => m.id === id);
      if (!item) return;

      if (e.target.closest('[data-action="remove-bm"]')) {
        storage.toggleBookmark(id);
        sound.playChime();
        renderDrawerBookmarks();
        renderManhwaGrid();
        updateHunterNavBadge();
        updateLibraryCountBadge();
        return;
      }

      closeLibraryDrawer();
      const history = storage.getHistoryForManhwa(item.id);
      const ch = history ? item.chapters.find(c => c.id === history.chapterNumber) || item.chapters[0] : item.chapters[0];
      openReader(item, ch);
    });
  });
}

function renderDrawerQuests() {
  const stats = storage.getHunterStats();
  elements.drawerQuestsList.innerHTML = stats.dailyQuests.map(q => `
    <div class="quest-pill ${q.completed ? 'completed' : ''}" style="width: 100%; justify-content: space-between;">
      <span>${q.completed ? '✓' : '○'} ${q.text}</span>
      <strong>${q.completed ? 'COMPLETED' : `${q.current}/${q.target}`}</strong>
    </div>
  `).join('');
}

// ==========================================================================
// Reader Display Settings
// ==========================================================================

function applyReaderSettings() {
  const s = state.readerSettings;

  // Strip width
  elements.readerStripWrapper.className = `reader-strip-wrapper width-${s.stripWidth} filter-${s.filterMode}`;

  // Ambient glow toggle
  elements.readerAmbientGlow.style.display = s.ambientGlow ? 'block' : 'none';

  // Speed select
  elements.autoScrollSpeedSelect.value = s.autoScrollSpeed;
  state.autoScrollSpeed = parseFloat(s.autoScrollSpeed);
}

// ==========================================================================
// Setup Event Listeners
// ==========================================================================

function setupEventListeners() {
  // Brand Logo (Return to Catalog)
  elements.brandLogoBtn.addEventListener('click', () => {
    if (state.currentView === 'reader') {
      exitReader();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Sound FX Toggle
  elements.soundToggleBtn.addEventListener('click', () => {
    const isNowMuted = sound.toggleMute();
    elements.soundIconSlot.innerHTML = isNowMuted ? icon('volume-x', { size: 18 }) : icon('volume-2', { size: 18 });
    showSystemToast(
      isNowMuted ? 'AUDIO MUTED' : 'AUDIO ENGAGED',
      isNowMuted ? 'Sound effects and ambient hums are muted.' : 'Procedural web audio effects are enabled.'
    );
  });

  // Hunter Status Button
  elements.hunterStatusBtn.addEventListener('click', () => {
    openLibraryDrawer();
  });

  // Library Drawer Button
  elements.libraryDrawerBtn.addEventListener('click', () => {
    openLibraryDrawer();
  });

  elements.closeLibraryDrawerBtn.addEventListener('click', () => {
    closeLibraryDrawer();
  });

  elements.libraryDrawer.addEventListener('click', (e) => {
    if (e.target === elements.libraryDrawer) {
      closeLibraryDrawer();
    }
  });

  // Source Mode Switcher (Originals vs MangaDex Live)
  if (elements.sourceModeSwitcher) {
    elements.sourceModeSwitcher.addEventListener('click', async (e) => {
      const btn = e.target.closest('.source-tab-btn');
      if (!btn) return;
      document.querySelectorAll('.source-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const source = btn.getAttribute('data-source');
      state.sourceMode = source;
      sound.playSwoosh();

      if (source === 'mangadex' && state.mangadexList.length === 0) {
        state.isLoadingMangaDex = true;
        renderManhwaGrid();
        showSystemToast('CONNECTING TO MANGADEX', 'Streaming 8,800+ authentic Korean manhwa titles from MangaDex API...');
        const items = await mangadex.fetchPopularManhwa(24);
        state.mangadexList = items;
        state.isLoadingMangaDex = false;
        renderManhwaGrid();
      } else {
        renderManhwaGrid();
      }
    });
  }

  // Search Input with Live Autocomplete
  elements.globalSearchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    state.searchQuery = val;

    if (val.length > 0) {
      const pool = state.sourceMode === 'mangadex' ? state.mangadexList : MANHWA_CATALOG;
      const results = pool.filter(m => 
        m.title.toLowerCase().includes(val.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(val.toLowerCase()))
      );

      if (results.length > 0) {
        elements.searchDropdown.innerHTML = results.map(r => `
          <div class="search-item" data-id="${r.id}">
            <img src="${r.coverImage}" class="search-thumb" alt="${r.title}" />
            <div class="search-info">
              <span class="search-title">${r.title}</span>
              <span class="search-meta">${r.rank} • ⭐ ${r.rating} • ${r.genres.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        `).join('');
        elements.searchDropdown.classList.remove('hidden');
      } else {
        elements.searchDropdown.innerHTML = `
          <div style="padding: 12px; font-size: 0.84rem; color: var(--text-muted); text-align: center;">
            No awakened manhwa matches "${val}"
          </div>
        `;
        elements.searchDropdown.classList.remove('hidden');
      }
    } else {
      elements.searchDropdown.classList.add('hidden');
    }

    renderManhwaGrid();
  });

  elements.searchDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.search-item');
    if (item) {
      const id = item.getAttribute('data-id');
      const pool = state.sourceMode === 'mangadex' ? state.mangadexList : MANHWA_CATALOG;
      const manhwa = pool.find(m => m.id === id) || MANHWA_CATALOG.find(m => m.id === id);
      if (manhwa) {
        elements.searchDropdown.classList.add('hidden');
        elements.globalSearchInput.value = '';
        state.searchQuery = '';
        openDetailsModal(manhwa);
      }
    }
  });

  // Genre Filter Pills
  elements.genrePillsList.addEventListener('click', (e) => {
    const pill = e.target.closest('.genre-pill');
    if (!pill) return;

    sound.playSwoosh();
    document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    state.selectedGenre = pill.getAttribute('data-genre');
    renderManhwaGrid();
  });

  // Sort Select
  elements.catalogSortSelect.addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    renderManhwaGrid();
  });

  // Reader HUD Events
  elements.exitReaderBtn.addEventListener('click', exitReader);

  elements.readerChapterSelect.addEventListener('change', async (e) => {
    const chId = e.target.value;
    const ch = (state.activeManhwa.chapters || []).find(c => String(c.id) === String(chId));
    if (ch) {
      state.activeChapter = ch;
      sound.playSwoosh();
      await renderReaderPanels();
      renderReaderComments();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Auto Scroll
  elements.autoScrollBtn.addEventListener('click', toggleAutoScroll);

  elements.autoScrollSpeedSelect.addEventListener('change', (e) => {
    state.autoScrollSpeed = parseFloat(e.target.value);
    storage.saveSettings({ autoScrollSpeed: state.autoScrollSpeed });
  });

  // Reader Settings Popover Toggle
  elements.readerSettingsBtn.addEventListener('click', () => {
    elements.readerSettingsPopover.classList.toggle('hidden');
  });

  // Strip Width Control
  document.getElementById('stripWidthControl').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('#stripWidthControl button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    state.readerSettings.stripWidth = btn.getAttribute('data-width');
    storage.saveSettings(state.readerSettings);
    applyReaderSettings();
  });

  // Reading Filter Theme Control
  document.getElementById('readingFilterControl').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('#readingFilterControl button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    state.readerSettings.filterMode = btn.getAttribute('data-filter');
    storage.saveSettings(state.readerSettings);
    applyReaderSettings();
  });

  // Ambient Aura Toggle
  document.getElementById('ambientGlowToggle').addEventListener('change', (e) => {
    state.readerSettings.ambientGlow = e.target.checked;
    storage.saveSettings(state.readerSettings);
    applyReaderSettings();
  });

  // Fullscreen Toggle
  elements.fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      elements.fullscreenIconSlot.innerHTML = icon('minimize', { size: 18 });
    } else {
      document.exitFullscreen().catch(() => {});
      elements.fullscreenIconSlot.innerHTML = icon('maximize', { size: 18 });
    }
  });

  // Reactions
  elements.reactionPillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.reaction-btn');
    if (!btn) return;

    const countEl = btn.querySelector('.react-count');
    const rect = btn.getBoundingClientRect();
    const emoji = btn.textContent.trim().split(' ')[0];

    spawnFloatingReaction(emoji, rect.left + rect.width / 2, rect.top);

    // Increment count display
    let num = parseFloat(countEl.textContent);
    if (countEl.textContent.includes('K')) {
      num = (num + 0.1).toFixed(1) + 'K';
    } else {
      num = num + 1;
    }
    countEl.textContent = num;

    storage.incrementDailyQuest('q2');
    updateHunterNavBadge();
  });

  // Post Comment
  elements.postCommentBtn.addEventListener('click', postUserComment);
  elements.newCommentInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') postUserComment();
  });

  // Bottom Chapter Navigation
  elements.prevChapterBottomBtn.addEventListener('click', async () => {
    const chapters = state.activeManhwa.chapters || [];
    const currentIdx = chapters.findIndex(c => String(c.id) === String(state.activeChapter.id));
    if (currentIdx > 0) {
      state.activeChapter = chapters[currentIdx - 1];
      elements.readerChapterSelect.value = state.activeChapter.id;
      sound.playSwoosh();
      await renderReaderPanels();
      renderReaderComments();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSystemToast('FIRST CHAPTER', 'You are already on the first chapter.');
    }
  });

  elements.nextChapterBottomBtn.addEventListener('click', async () => {
    const chapters = state.activeManhwa.chapters || [];
    const currentIdx = chapters.findIndex(c => String(c.id) === String(state.activeChapter.id));
    if (currentIdx < chapters.length - 1) {
      state.activeChapter = chapters[currentIdx + 1];
      elements.readerChapterSelect.value = state.activeChapter.id;
      sound.playSwoosh();
      await renderReaderPanels();
      renderReaderComments();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSystemToast('LATEST CHAPTER REACHED', 'You have caught up with the latest released chapter!', true);
    }
  });

  elements.backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Details Modal Close
  elements.closeDetailsModalBtn.addEventListener('click', () => {
    elements.detailsModal.classList.add('hidden');
  });

  elements.detailsModal.addEventListener('click', (e) => {
    if (e.target === elements.detailsModal) {
      elements.detailsModal.classList.add('hidden');
    }
  });

  // Window Scroll for reading progress
  window.addEventListener('scroll', updateReadingProgress, { passive: true });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '/') {
      e.preventDefault();
      elements.globalSearchInput.focus();
    } else if (e.key === 'Escape') {
      elements.searchDropdown.classList.add('hidden');
      elements.detailsModal.classList.add('hidden');
      elements.libraryDrawer.classList.add('hidden');
      elements.readerSettingsPopover.classList.add('hidden');
    } else if (e.code === 'Space' && state.currentView === 'reader') {
      e.preventDefault();
      toggleAutoScroll();
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar-wrapper')) {
      elements.searchDropdown.classList.add('hidden');
    }
    if (!e.target.closest('.reader-settings-popover') && !e.target.closest('#readerSettingsBtn')) {
      elements.readerSettingsPopover.classList.add('hidden');
    }
  });
}

// ==========================================================================
// Local Chapter & CBZ/ZIP Importer Handlers
// ==========================================================================

let pendingImportedManhwa = null;

function setupImportListeners() {
  // Open / Close Import Modal
  elements.openImportModalBtn?.addEventListener('click', openImportModal);
  elements.closeImportModalBtn?.addEventListener('click', closeImportModal);
  elements.importModal?.addEventListener('click', (e) => {
    if (e.target === elements.importModal) closeImportModal();
  });

  // CBZ File Input
  elements.cbzFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) handleArchiveFile(file);
    e.target.value = '';
  });

  // Folder File Input
  elements.folderFileInput?.addEventListener('change', async (e) => {
    if (e.target.files?.length > 0) handleImageFiles(e.target.files);
    e.target.value = '';
  });

  // Images File Input
  elements.imagesFileInput?.addEventListener('change', async (e) => {
    if (e.target.files?.length > 0) handleImageFiles(e.target.files);
    e.target.value = '';
  });

  // Demo Chapter Loader Button
  elements.loadDemoChapterBtn?.addEventListener('click', async () => {
    try {
      sound.playSwoosh();
      elements.importProgressBox?.classList.remove('hidden');
      elements.importPreviewCard?.classList.add('hidden');
      elements.importStatusText.textContent = 'Fetching sample chapter archive (Solo Leveling Ch. 1)...';
      elements.importProgressPercent.textContent = '10%';
      elements.importProgressBar.style.width = '10%';

      const res = await fetch('/sample_chapters/Solo_Leveling_Ch01.cbz');
      if (!res.ok) throw new Error('Demo chapter archive not found.');
      const blob = await res.blob();
      const file = new File([blob], 'Solo_Leveling_Ch01.cbz', { type: 'application/x-cbz' });
      await handleArchiveFile(file);
    } catch (err) {
      elements.importStatusText.textContent = `Error: ${err.message}`;
      showSystemToast('DEMO LOAD FAILED', err.message);
    }
  });

  // Drag and Drop Zone
  const dropZone = elements.importDropZone;
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const first = files[0];
      if (/\.(cbz|zip)$/i.test(first.name)) {
        handleArchiveFile(first);
      } else {
        handleImageFiles(files);
      }
    });
  }

  // Global Drag & Drop onto Window
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const first = files[0];
      if (/\.(cbz|zip)$/i.test(first.name) || /\.(jpe?g|png|webp|avif)$/i.test(first.name)) {
        e.preventDefault();
        openImportModal();
        if (/\.(cbz|zip)$/i.test(first.name)) {
          handleArchiveFile(first);
        } else {
          handleImageFiles(files);
        }
      }
    }
  });

  // Read Now button on preview card
  elements.importReadNowBtn?.addEventListener('click', () => {
    if (pendingImportedManhwa) {
      closeImportModal();
      openReader(pendingImportedManhwa, pendingImportedManhwa.chapters[0]);
    }
  });
}

function openImportModal() {
  elements.importModal?.classList.remove('hidden');
  elements.importProgressBox?.classList.add('hidden');
  elements.importPreviewCard?.classList.add('hidden');
  sound.playSwoosh();
}

function closeImportModal() {
  elements.importModal?.classList.add('hidden');
}

async function handleArchiveFile(file) {
  elements.importProgressBox?.classList.remove('hidden');
  elements.importPreviewCard?.classList.add('hidden');
  elements.importStatusText.textContent = `Extracting ${file.name}...`;
  elements.importProgressPercent.textContent = '0%';
  elements.importProgressBar.style.width = '0%';

  try {
    const manhwa = await localImporter.parseArchive(file, (percent) => {
      elements.importProgressPercent.textContent = `${percent}%`;
      elements.importProgressBar.style.width = `${percent}%`;
    });

    onImportSuccess(manhwa);
  } catch (err) {
    elements.importStatusText.textContent = `Error: ${err.message}`;
    showSystemToast('IMPORT FAILED', err.message);
  }
}

async function handleImageFiles(files) {
  elements.importProgressBox?.classList.remove('hidden');
  elements.importPreviewCard?.classList.add('hidden');
  elements.importStatusText.textContent = `Processing ${files.length} images...`;
  elements.importProgressPercent.textContent = '100%';
  elements.importProgressBar.style.width = '100%';

  try {
    const manhwa = await localImporter.parseImageFiles(files);
    onImportSuccess(manhwa);
  } catch (err) {
    elements.importStatusText.textContent = `Error: ${err.message}`;
    showSystemToast('IMPORT FAILED', err.message);
  }
}

function onImportSuccess(manhwa) {
  pendingImportedManhwa = manhwa;
  state.importedManhwaList.unshift(manhwa);

  // Show preview card
  elements.importPreviewThumb.src = manhwa.coverImage;
  elements.importPreviewTitle.textContent = manhwa.title;
  elements.importPreviewChapter.textContent = manhwa.chapters[0].title;
  elements.importPreviewPages.textContent = `${manhwa.chapters[0].pagesCount} Pages`;

  elements.importProgressBox.classList.add('hidden');
  elements.importPreviewCard.classList.remove('hidden');

  sound.playLevelUp();
  showSystemToast('CHAPTER AWAKENED', `Successfully imported "${manhwa.title}" (${manhwa.chapters[0].pagesCount} panels)`, true);

  // Auto switch to imported tab
  state.sourceMode = 'imported';
  document.querySelectorAll('.source-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-source') === 'imported');
  });
  renderManhwaGrid();
}

// Start application reliably
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
