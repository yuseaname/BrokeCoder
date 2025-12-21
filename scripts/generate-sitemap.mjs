import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  // Import root sitemap generator
  const rootPath = path.join(__dirname, '..', 'sitemap.js');
  const rootMod = await import(pathToFileURL(rootPath).href);
  const rootXml = rootMod.saveSitemap ? rootMod.saveSitemap() : (rootMod.generateSitemap ? rootMod.generateSitemap() : '');
  if (!rootXml) throw new Error('Root sitemap generation returned empty');
  fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), rootXml, 'utf-8');

  // Import deploy sitemap generator
  const deployPath = path.join(__dirname, '..', 'deploy', 'sitemap.js');
  const deployMod = await import(pathToFileURL(deployPath).href);
  const deployXml = deployMod.saveSitemap ? deployMod.saveSitemap() : (deployMod.generateSitemap ? deployMod.generateSitemap() : '');
  if (!deployXml) throw new Error('Deploy sitemap generation returned empty');
  fs.writeFileSync(path.join(__dirname, '..', 'deploy', 'sitemap.xml'), deployXml, 'utf-8');

  console.log('Sitemap generation complete: wrote sitemap.xml and deploy/sitemap.xml');
}

generate().catch(err => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
