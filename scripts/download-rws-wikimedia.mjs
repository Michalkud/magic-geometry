import fs from 'fs';
import path from 'path';

const API = 'https://commons.wikimedia.org/w/api.php';
const CATEGORY_PAGE = process.env.RWS_CATEGORY_PAGE || 'https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck';
const CATEGORIES = (
  process.env.RWS_CATEGORY
    ? [process.env.RWS_CATEGORY]
    : [
        'Category:Rider–Waite tarot deck',
        'Category:Rider-Waite tarot deck',
        'Category:Rider–Waite tarot deck cards',
        'Category:Rider-Waite tarot deck cards',
        'Category:Rider–Waite Tarot',
        'Category:Rider-Waite Tarot',
        'Category:The Pictorial Key to the Tarot (1911)'
      ]
);
const OUT_DIR = new URL('../public/rws/', import.meta.url).pathname;

async function fetchJSON(params){
  const url = API + '?' + new URLSearchParams(params).toString();
  const res = await fetch(url, { headers: { 'User-Agent': 'magic-geometry/1.0' } });
  if (!res.ok) throw new Error('API error ' + res.status);
  return await res.json();
}

async function fetchText(url){
  const res = await fetch(url, { headers: { 'User-Agent': 'magic-geometry/1.0' } });
  if (!res.ok) throw new Error('HTTP '+res.status+' '+url);
  return await res.text();
}

async function* listCategoryFiles(){
  for (const CATEGORY of CATEGORIES){
    let gcmcontinue = undefined;
    try {
      do {
        const data = await fetchJSON({
          action: 'query',
          format: 'json',
          generator: 'categorymembers',
          gcmtitle: CATEGORY,
          gcmnamespace: '6',
          gcmtype: 'file',
          gcmlimit: '500',
          prop: 'imageinfo',
          iiprop: 'url|mime|size',
          iiurlwidth: '1024',
          gcmcontinue,
          origin: '*'
        });
        const pages = data.query?.pages || {};
        for (const key of Object.keys(pages)){
          const p = pages[key];
          const info = p.imageinfo?.[0] || {};
          const url = info.thumburl || info.url;
          if (url) yield { title: p.title, url };
        }
        gcmcontinue = data.continue?.gcmcontinue;
      } while (gcmcontinue);
    } catch (e) {
      // try next category
    }
  }
  // Fallback: scrape category HTML, collect File: links, then resolve via API in batches
  try {
    const html = await fetchText(CATEGORY_PAGE);
    const fileTitles = Array.from(html.matchAll(/\/wiki\/File:([^"'#?<>\s]+)/g)).map(m=>decodeURIComponent(m[1]));
    const unique = Array.from(new Set(fileTitles));
    for (let i=0; i<unique.length; i+=40){
      const chunk = unique.slice(i, i+40).map(t=> 'File:'+t).join('|');
      const data = await fetchJSON({
        action: 'query', format: 'json', titles: chunk, prop: 'imageinfo', iiprop: 'url|mime|size', iiurlwidth: '1024', origin: '*'
      });
      const pages = data.query?.pages || {};
      for (const key of Object.keys(pages)){
        const p = pages[key];
        const info = p.imageinfo?.[0] || {};
        const url = info.url || info.thumburl;
        if (url) yield { title: p.title, url };
      }
    }
  } catch (e) {
    // ignore
  }
}

function sanitizeFilename(title){
  // title like "File:RWS Tarot 01 Magician.jpg"
  const base = title.replace(/^File:/i, '');
  return base.replace(/\s+/g, '_');
}

async function main(){
  console.log('Downloading RWS images from Wikimedia Commons categories:', CATEGORIES.join(', '));
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
  let ok=0, skip=0;
  for await (const f of listCategoryFiles()){
    const name = sanitizeFilename(f.title);
    const out = path.join(OUT_DIR, name);
    if (fs.existsSync(out)) { skip++; continue; }
    const res = await fetch(f.url, { headers: { 'User-Agent': 'magic-geometry/1.0' } });
    if (!res.ok) { console.warn('×', name, res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.promises.writeFile(out, buf);
    console.log('✓', name);
    ok++;
  }
  console.log(`Done: ${ok} downloaded, ${skip} skipped. Output: ${OUT_DIR}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });


