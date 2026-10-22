// Local Manhwa Importer: CBZ, ZIP, and Image Folder Parser for MANHWA VOID

export const localImporter = {
  /**
   * Sort filenames naturally (e.g. 1.jpg, 2.jpg, 10.jpg)
   */
  naturalSort(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  },

  /**
   * Infer series title and chapter title from file/folder name
   */
  inferMetadata(rawName) {
    // Remove extension
    const clean = rawName.replace(/\.(cbz|zip)$/i, '').replace(/[_\-\.]+/g, ' ').trim();

    // Regex for chapter number (e.g. "Ch 120", "Chapter 45", "c120", "v01 c05")
    const chMatch = clean.match(/(?:chapter|ch|c)\s*(\d+(?:\.\d+)?)/i);
    const chNum = chMatch ? chMatch[1] : '1';

    let title = clean;
    if (chMatch) {
      // Cut off chapter part to get series title
      title = clean.substring(0, chMatch.index).trim() || 'Imported Manhwa';
    }

    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      chapterTitle: `Chapter ${chNum}`,
      chapterNumber: chNum
    };
  },

  /**
   * Parse a .cbz or .zip File using JSZip
   */
  async parseArchive(file, onProgress) {
    if (!window.JSZip) {
      throw new Error('JSZip library not loaded yet');
    }

    const zip = new window.JSZip();
    const contents = await zip.loadAsync(file);

    const imageExtensions = /\.(jpe?g|png|webp|avif|gif)$/i;
    const imageFiles = [];

    contents.forEach((relativePath, zipEntry) => {
      if (!zipEntry.dir && imageExtensions.test(relativePath)) {
        // Exclude system files or thumbs
        if (!relativePath.includes('__MACOSX') && !relativePath.includes('desktop.ini')) {
          imageFiles.push(zipEntry);
        }
      }
    });

    if (imageFiles.length === 0) {
      throw new Error('No images found in this archive.');
    }

    // Sort naturally by filename
    imageFiles.sort((a, b) => this.naturalSort(a.name, b.name));

    const total = imageFiles.length;
    const pageUrls = [];

    for (let i = 0; i < total; i++) {
      const entry = imageFiles[i];
      const blob = await entry.async('blob');
      const url = URL.createObjectURL(blob);
      pageUrls.push(url);

      if (onProgress) {
        onProgress(Math.round(((i + 1) / total) * 100));
      }
    }

    const { title, chapterTitle, chapterNumber } = this.inferMetadata(file.name);

    return {
      id: 'local_' + Date.now(),
      title,
      koreanTitle: '로컬 만화 (Local Import)',
      altTitle: file.name,
      coverImage: pageUrls[0],
      themeColor: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.45)',
      rating: 10.0,
      views: 'Offline',
      rank: 'Local Sovereign',
      status: 'Imported',
      author: 'Local File',
      artist: 'Local File',
      releaseDay: 'Offline',
      genres: ['Imported', 'Local Archive', 'Webtoon'],
      synopsis: `Imported from archive: ${file.name}. Total pages: ${pageUrls.length}.`,
      source: 'local',
      characters: [
        { name: 'Reader', role: 'Viewer', rank: 'S-Rank', ability: 'Offline Infinite Scroll' }
      ],
      chapters: [
        {
          id: 'local_ch_' + Date.now(),
          chapterNumber,
          title: chapterTitle,
          releaseDate: 'Today',
          source: 'local',
          pages: pageUrls,
          pagesCount: pageUrls.length
        }
      ]
    };
  },

  /**
   * Parse an array of image files (from drag and drop or folder input)
   */
  async parseImageFiles(files, customTitle = '') {
    const fileArray = Array.from(files).filter(f => /\.(jpe?g|png|webp|avif|gif)$/i.test(f.name));

    if (fileArray.length === 0) {
      throw new Error('No supported image files found.');
    }

    // Natural sort
    fileArray.sort((a, b) => this.naturalSort(a.name, b.name));

    const pageUrls = fileArray.map(f => URL.createObjectURL(f));

    // Try inferring title from first file or folder path
    const samplePath = fileArray[0].webkitRelativePath || fileArray[0].name;
    const folderName = samplePath.includes('/') ? samplePath.split('/')[0] : fileArray[0].name;
    const meta = this.inferMetadata(customTitle || folderName);

    return {
      id: 'local_' + Date.now(),
      title: meta.title,
      koreanTitle: '로컬 만화 (Local Import)',
      altTitle: folderName,
      coverImage: pageUrls[0],
      themeColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.45)',
      rating: 10.0,
      views: 'Offline',
      rank: 'Local Sovereign',
      status: 'Imported',
      author: 'Local Folder',
      artist: 'Local Folder',
      releaseDay: 'Offline',
      genres: ['Imported', 'Local Folder', 'Webtoon'],
      synopsis: `Imported from local folder (${fileArray.length} pages).`,
      source: 'local',
      characters: [
        { name: 'Reader', role: 'Viewer', rank: 'S-Rank', ability: 'Offline Infinite Scroll' }
      ],
      chapters: [
        {
          id: 'local_ch_' + Date.now(),
          chapterNumber: meta.chapterNumber,
          title: meta.chapterTitle,
          releaseDate: 'Today',
          source: 'local',
          pages: pageUrls,
          pagesCount: pageUrls.length
        }
      ]
    };
  }
};
