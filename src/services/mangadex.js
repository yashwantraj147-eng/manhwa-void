// MangaDex Public API Service for MANHWA VOID
const API_BASE = '/api/mangadex';
const CDN_COVER_BASE = 'https://uploads.mangadex.org/covers';

export const mangadex = {
  /**
   * Fetch top popular Korean manhwa with English translations
   */
  async fetchPopularManhwa(limit = 18, offset = 0) {
    try {
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        'originalLanguage[]': 'ko',
        'availableTranslatedLanguage[]': 'en',
        'order[followedCount]': 'desc',
        'includes[]': 'cover_art',
        'contentRating[]': 'safe'
      });
      params.append('includes[]', 'author');
      params.append('contentRating[]', 'suggestive');

      const res = await fetch(`${API_BASE}/manga?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      return (data.data || []).map(this.formatMangaItem);
    } catch (err) {
      console.warn('Failed to fetch MangaDex popular manhwa:', err);
      return [];
    }
  },

  /**
   * Search MangaDex for titles
   */
  async searchManhwa(query, limit = 16) {
    try {
      const params = new URLSearchParams({
        title: query,
        limit: String(limit),
        'includes[]': 'cover_art',
        'includes[]': 'author',
        'contentRating[]': 'safe'
      });
      params.append('contentRating[]', 'suggestive');

      const res = await fetch(`${API_BASE}/manga?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      return (data.data || []).map(this.formatMangaItem);
    } catch (err) {
      console.warn('Failed to search MangaDex:', err);
      return [];
    }
  },

  /**
   * Fetch chapter list for a MangaDex title
   */
  async fetchChapters(mangaId) {
    try {
      const params = new URLSearchParams({
        limit: '100',
        'translatedLanguage[]': 'en',
        'order[chapter]': 'asc',
        'contentRating[]': 'safe'
      });
      params.append('contentRating[]', 'suggestive');

      const res = await fetch(`${API_BASE}/manga/${mangaId}/feed?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Deduplicate chapters by chapter number
      const seen = new Set();
      const chapters = [];

      for (const item of data.data || []) {
        const chNum = item.attributes.chapter || '0';
        if (!seen.has(chNum)) {
          seen.add(chNum);
          const pagesCount = item.attributes.pages || 0;
          const externalUrl = item.attributes.externalUrl || null;
          chapters.push({
            id: item.id,
            chapterNumber: chNum,
            title: item.attributes.title 
              ? `Ch. ${chNum}: ${item.attributes.title}`
              : `Chapter ${chNum}`,
            releaseDate: new Date(item.attributes.publishAt).toLocaleDateString(),
            source: 'mangadex',
            pagesCount,
            externalUrl,
            isExternal: pagesCount === 0 || Boolean(externalUrl)
          });
        }
      }

      return chapters;
    } catch (err) {
      console.warn('Failed to fetch MangaDex chapters:', err);
      return [];
    }
  },

  /**
   * Fetch image pages for a specific chapter
   */
  async fetchChapterPages(chapterId) {
    try {
      const res = await fetch(`${API_BASE}/at-home/server/${chapterId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const { baseUrl, chapter } = data;
      const { hash, data: fileNames, dataSaver } = chapter;

      // Use standard high quality pages or fallback to dataSaver
      const files = fileNames && fileNames.length > 0 ? fileNames : dataSaver;
      const folder = fileNames && fileNames.length > 0 ? 'data' : 'data-saver';

      return files.map((file) => `${baseUrl}/${folder}/${hash}/${file}`);
    } catch (err) {
      console.warn('Failed to fetch MangaDex chapter pages:', err);
      return [];
    }
  },

  /**
   * Format a raw MangaDex manga object into our application structure
   */
  formatMangaItem(manga) {
    const attr = manga.attributes || {};
    const titleObj = attr.title || {};
    const title = titleObj.en || Object.values(titleObj)[0] || 'Unknown Manhwa';
    const altTitle = attr.altTitles?.find((t) => t['ko-ro'] || t['ko'])?.[Object.keys(t)[0]] || '';
    const koreanTitle = attr.altTitles?.find((t) => t['ko'])?.ko || altTitle;

    // Cover art extraction
    const coverRel = (manga.relationships || []).find((r) => r.type === 'cover_art');
    const coverFileName = coverRel?.attributes?.fileName;
    const coverImage = coverFileName
      ? `${CDN_COVER_BASE}/${manga.id}/${coverFileName}.512.jpg`
      : '/covers/shadow_monarch.jpg';

    // Author extraction
    const authorRel = (manga.relationships || []).find((r) => r.type === 'author');
    const author = authorRel?.attributes?.name || 'MangaDex Artist';

    // Tags & Genres
    const genres = (attr.tags || [])
      .map((t) => t.attributes?.name?.en)
      .filter(Boolean)
      .slice(0, 4);

    if (genres.length === 0) genres.push('Manhwa', 'Webtoon');

    const desc = attr.description?.en || 'No synopsis provided.';

    return {
      id: manga.id,
      title,
      koreanTitle: koreanTitle || title,
      altTitle: altTitle || title,
      coverImage,
      themeColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      rating: 9.85,
      views: '10M+',
      rank: 'MangaDex S-Rank',
      status: attr.status === 'completed' ? 'Completed' : 'Ongoing',
      author,
      artist: author,
      releaseDay: 'Weekly',
      genres,
      synopsis: desc.split('\n\n')[0] || desc,
      source: 'mangadex',
      characters: [
        { name: 'Protagonist', role: 'Main Character', rank: 'S-Rank', ability: 'Awakened Skill' },
        { name: 'Supporting Partner', role: 'Guild Mate', rank: 'A-Rank', ability: 'Tactical Support' }
      ],
      chapters: [] // dynamically loaded on click
    };
  }
};
