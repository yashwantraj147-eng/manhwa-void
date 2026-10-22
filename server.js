import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  // MangaDex Proxy Endpoint
  if (pathname.startsWith('/api/mangadex/')) {
    const targetPath = parsedUrl.pathname.replace(/^\/api\/mangadex/, '') + parsedUrl.search;
    const targetUrl = 'https://api.mangadex.org' + targetPath;

    fetch(targetUrl, {
      headers: {
        'User-Agent': 'ManhwaVoid/1.0 (https://github.com/manhwa-void)'
      }
    })
      .then(async (apiRes) => {
        const data = await apiRes.arrayBuffer();
        res.writeHead(apiRes.status, {
          'Content-Type': apiRes.headers.get('content-type') || 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*'
        });
        res.end(Buffer.from(data));
      })
      .catch((err) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'MangaDex Proxy Error', message: err.message }));
      });
    return;
  }

  // Look in root directory or public directory
  let filePath = path.join(__dirname, pathname);

  // If path doesn't exist in root, check in public/
  if (!fs.existsSync(filePath)) {
    const publicPath = path.join(__dirname, 'public', pathname);
    if (fs.existsSync(publicPath)) {
      filePath = publicPath;
    }
  }

  // Prevent directory traversal
  const relative = path.relative(__dirname, filePath);
  if (relative.startsWith('..') && !filePath.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA if not an asset
      if (!path.extname(pathname)) {
        filePath = path.join(__dirname, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found: ' + pathname);
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Disable caching for rapid local dev
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n  🚀 MANHWA VOID Dev Server running at: http://localhost:${PORT}/\n`);
});
