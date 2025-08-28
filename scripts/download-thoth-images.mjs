import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_URL = process.env.ALBUM_URL || 'https://www.flickr.com/photos/laird_of_kiloran/albums/72157627891068994/';
// Normalize: strip trailing 'with/<photoId>' if present to crawl the full album
const ALBUM_URL = RAW_URL.replace(/\/with\/\d+\/?$/, '/');
const OUT_DIR = path.resolve(__dirname, '../public/cards');

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchHTML(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'magic-geometry-downloader/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function getAlbumPages(baseUrl, maxPages = 20) {
  const pages = [];
  for (let p = 1; p <= maxPages; p++) {
    const root = baseUrl.replace(/\/?$/, '/');
    const candidateUrls = [
      p === 1 ? baseUrl : `${root}?page=${p}`,
      p === 1 ? baseUrl : `${root}page${p}`,
      p === 1 ? baseUrl : `${root}page/${p}/`,
      p === 1 ? baseUrl : `${root}${p}/`,
    ];
    try {
      let any = false;
      for (const url of candidateUrls) {
        const html = await fetchHTML(url);
        const $ = cheerio.load(html);
        const tiles = [];
        $('a').each((_, el) => {
          const href = $(el).attr('href') || '';
          if (/^\/photos\/[^/]+\/[0-9]+\//.test(href)) {
            tiles.push(new URL(href, 'https://www.flickr.com').toString());
          }
        });
        // Fallback: regex scan entire HTML for photo links (handles script-embedded models)
        const rx = /"(\/photos\/[^/]+\/[0-9]+\/)/g;
        let m;
        while ((m = rx.exec(html)) !== null) {
          tiles.push(new URL(m[1], 'https://www.flickr.com').toString());
        }
        const unique = [...new Set(tiles)];
        if (unique.length) {
          pages.push(unique);
          any = true;
          break;
        }
      }
      if (!any) break;
    } catch (e) {
      break;
    }
  }
  return [...new Set(pages.flat())];
}

function deriveNameFromTitle(title) {
  // Trumps
  let m = title.match(/^\s*Thoth\s+Trumps\s+\d+\s+(.+)$/i);
  if (m) return slugify(m[1]);

  // Minors: Thoth <Suit> NN <Rank>
  m = title.match(/^\s*Thoth\s+(Wands|Cups|Swords|Disks)\s+(\d{2})\s+([A-Za-z]+)\s*$/i);
  if (m) {
    const suit = m[1].toLowerCase();
    const num = m[2];
    const rank = slugify(m[3]);
    return `${suit}-${num}-${rank}`;
  }

  // Fallback: keep everything after the last number
  const last = title.match(/\b(?:0?\d|1\d|2\d)\s+(.*)$/i);
  const raw = last ? last[1] : title.replace(/^Thoth\s+/i, '');
  return slugify(raw);
}

async function extractImageAndTitle(photoUrl) {
  const html = await fetchHTML(photoUrl);
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
  if (!ogImage) throw new Error('No og:image found');
  const title = (ogTitle || '').split('|')[0].trim();
  return { imageUrl: ogImage, title, pageUrl: photoUrl };
}

async function downloadTo(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  await fs.promises.writeFile(destPath, buf);
}

async function main() {
  console.log(`Scanning album: ${ALBUM_URL}`);
  const photoPages = await getAlbumPages(ALBUM_URL, 5);
  console.log(`Found ${photoPages.length} photo pages`);

  let success = 0, fail = 0;
  for (const pageUrl of photoPages) {
    try {
      const { imageUrl, title } = await extractImageAndTitle(pageUrl);
      const name = deriveNameFromTitle(title);
      const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
      const out = path.join(OUT_DIR, `${name}${ext}`);
      await downloadTo(imageUrl, out);
      success++;
      console.log(`✓ ${name}${ext}`);
    } catch (e) {
      fail++;
      console.warn(`× Failed ${pageUrl}: ${e.message}`);
    }
  }
  console.log(`Done: ${success} downloaded, ${fail} failed. Output: ${OUT_DIR}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


