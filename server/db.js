// Lightweight JSON-file "database".
// Good enough for a small café site demo — no native modules, no setup.
// Swap this out for a real database (Postgres, MongoDB, etc.) later if needed.

import { readFile, writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export async function readCollection(name) {
  const file = filePath(name);
  if (!existsSync(file)) return [];
  const raw = await readFile(file, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeCollection(name, data) {
  await writeFile(filePath(name), JSON.stringify(data, null, 2), 'utf-8');
}

export async function appendToCollection(name, item) {
  const items = await readCollection(name);
  items.push(item);
  await writeCollection(name, items);
  return item;
}

let idCounter = Date.now();
export function nextId() {
  idCounter += 1;
  return idCounter;
}
