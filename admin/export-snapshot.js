// 📁 /admin/export-snapshot.js – YAML + mapping.json ZIP-Export
import fs from 'fs/promises';
import path from 'path';
import archiver from 'archiver';
import { Readable } from 'stream';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Nur GET erlaubt.');
  }

  try {
    const archive = archiver('zip', { zlib: { level: 9 } });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="kaija-snapshot.zip"');

    archive.pipe(res);

    // YAML-Files (optional)
    const storeDir = path.join(process.cwd(), 'api/store');
    try {
      const yamlFiles = await fs.readdir(storeDir);
      for (const file of yamlFiles) {
        const filePath = path.join(storeDir, file);
        const content = await fs.readFile(filePath);
        archive.append(content, { name: `yaml/${file}` });
      }
    } catch (e) {
      console.warn('[Snapshot] Kein store/ Verzeichnis gefunden oder leer. Wird übersprungen.');
    }

    // mapping.json immer einfügen
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const mappingContent = await fs.readFile(mappingPath);
    archive.append(mappingContent, { name: 'mapping.json' });

    await archive.finalize();
  } catch (err) {
    console.error('[ZIP Export] Fehler:', err);
    return res.status(500).send('Fehler beim Erstellen des Snapshots.');
  }
}
