import { Router } from 'express';
import { readCollection } from '../db.js';

const router = Router();

// GET /api/menu — full menu list
router.get('/menu', async (req, res) => {
  const menu = await readCollection('menu');
  res.json(menu);
});

// GET /api/gallery — full gallery list
router.get('/gallery', async (req, res) => {
  const gallery = await readCollection('gallery');
  res.json(gallery);
});

export default router;
