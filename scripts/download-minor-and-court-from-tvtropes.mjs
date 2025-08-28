import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGE_URL = process.env.TVTROPES_URL || 'https://tvtropes.org/pmwiki/pmwiki.php/ImageLinks/ThothTarotDeck';
const OUT_DIR = path.resolve(__dirname, '../public/cards');

const pipTitles = {
  Wands: ['ace','dominion','virtue','completion','strife','victory','valour','swiftness','strength','oppression'],
  Cups: ['ace','love','abundance','luxury','disappointment','pleasure','debauch','indolence','happiness','satiety'],
  Swords: ['ace','peace','sorrow','truce','defeat','science','futility','interference','cruelty','ruin'],
  Disks: ['ace','change','works','power','worry','success','failure','prudence','gain','wealth'],
};

const courtRanks = ['Princess','Prince','Queen','Knight'];

function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }

function makeTargets(){
  const targets = [];
  const suits = ['Wands','Cups','Swords','Disks'];
  for (const suit of suits){
    const titles = pipTitles[suit];
    for (let i=0;i<10;i++){
      const rankIdx = i+1; // Ace=1 ... Ten=10
      const rankName = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'][i];
      const label = `${rankName} of ${suit}`;
      const file = `${suit.toLowerCase()}-${String(rankIdx).padStart(2,'0')}-${titles[i]}.jpg`;
      targets.push({ type:'pip', suit, rank: rankName, label, out: file });
    }
    // Courts (11..14)
    const courtFiles = ['princess','prince','queen','knight'];
    for (let i=0;i<courtRanks.length;i++){
      const r = courtRanks[i];
      const file = `${suit.toLowerCase()}-${String(11+i).padStart(2,'0')}-${courtFiles[i]}.jpg`;
      const label = `${r} of ${suit}`;
      targets.push({ type:'court', suit, rank: r, label, out: file });
    }
  }
  return targets;
}

async function fetchHTML(url){
  const res = await fetch(url, { headers: { 'User-Agent': 'magic-geometry-downloader/1.0' } });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${url}`);
  return await res.text();
}

async function resolveImageUrl(pageUrl){
  const html = await fetchHTML(pageUrl);
  const $ = cheerio.load(html);
  let src = $('meta[property="og:image"]').attr('content')
         || $('link[rel="image_src"]').attr('href');
  if (!src){
    let best = null; let bestArea = 0;
    $('img').each((_, el) => {
      const s = $(el).attr('src');
      const w = parseInt($(el).attr('width') || '0', 10);
      const h = parseInt($(el).attr('height') || '0', 10);
      const area = (isFinite(w) && isFinite(h)) ? w*h : 0;
      if (s && area > bestArea){ best = s; bestArea = area; }
    });
    src = best || null;
  }
  if (!src){
    const m = html.match(/https?:[^\s"']+\.(?:jpg|jpeg|png|webp)/i);
    src = m ? m[0] : null;
  }
  if (src && !src.startsWith('http')) src = new URL(src, pageUrl).toString();
  return src;
}

async function main(){
  console.log(`Scanning TVTropes: ${PAGE_URL}`);
  const html = await fetchHTML(PAGE_URL);
  const $ = cheerio.load(html);
  const targets = makeTargets();

  // Build lookup of link text -> URL
  const textToHref = new Map();
  $('a').each((_, el) => {
    const txt = ($(el).text() || '').trim();
    const href = $(el).attr('href');
    if (txt && href) textToHref.set(txt, href.startsWith('http') ? href : new URL(href, PAGE_URL).toString());
  });

  let ok=0, miss=0;
  for (const t of targets){
    const href = textToHref.get(t.label);
    if (!href){
      console.warn(`? Link not found for ${t.label}`);
      miss++;
      continue;
    }
    try{
      const img = await resolveImageUrl(href);
      if (!img){ throw new Error('No image on page'); }
      const res = await fetch(img, { headers: { Referer: href, 'User-Agent': 'magic-geometry-downloader/1.0' } });
      if (!res.ok) throw new Error(`Download failed ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const outPath = path.join(OUT_DIR, t.out);
      await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
      await fs.promises.writeFile(outPath, buf);
      console.log(`✓ ${t.out}`);
      ok++;
    }catch(e){
      console.warn(`× ${t.label}: ${e.message}`);
      miss++;
    }
  }

  // Fallback: scrape all image URLs present on the index page and map by filename
  const imgUrlSet = new Set();
  $('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) imgUrlSet.add(href.startsWith('http') ? href : new URL(href, PAGE_URL).toString());
  });
  const rxAll = /https?:[^\s"']+\.(?:jpg|jpeg|png|webp)/ig;
  let m;
  while ((m = rxAll.exec(html)) !== null) imgUrlSet.add(m[0]);

  const ranks = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Princess','Prince','Queen','Knight'];
  function expectedOut(suit, rank){
    const idx = ranks.indexOf(rank);
    if (idx < 0) return null;
    if (idx <= 9) {
      const pipKey = pipTitles[suit]?.[idx];
      if (!pipKey) return null;
      return `${suit.toLowerCase()}-${String(idx+1).padStart(2,'0')}-${pipKey}.jpg`;
    }
    const courtFiles = ['princess','prince','queen','knight'];
    return `${suit.toLowerCase()}-${String(11+idx-10).padStart(2,'0')}-${courtFiles[idx-10]}.jpg`;
  }

  for (const url of imgUrlSet){
    try{
      const base = path.basename(new URL(url).pathname);
      const clean = decodeURIComponent(base).replace(/\.[a-zA-Z0-9]+$/, '');
      const mm = clean.match(/(Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Princess|Prince|Queen|Knight)_of_(Wands|Cups|Swords|Disks|Pentacles|Coins)/i);
      if (!mm) continue;
      let rank = mm[1].replace(/^./, c=>c.toUpperCase());
      let suit = mm[2].replace(/^./, c=>c.toUpperCase());
      if (suit === 'Pentacles' || suit === 'Coins') suit = 'Disks';
      const out = expectedOut(suit, rank);
      if (!out) continue;
      const outPath = path.join(OUT_DIR, out);
      if (fs.existsSync(outPath)) continue;
      const res = await fetch(url, { headers: { Referer: PAGE_URL, 'User-Agent': 'magic-geometry-downloader/1.0' } });
      if (!res.ok) throw new Error(`Download failed ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
      await fs.promises.writeFile(outPath, buf);
      console.log(`✓ ${out}`);
      ok++;
    }catch(e){
      // ignore
    }
  }

  console.log(`Done: ${ok} downloaded, ${miss} missing. Output: ${OUT_DIR}`);
}

main().catch(err=>{ console.error(err); process.exit(1); });


