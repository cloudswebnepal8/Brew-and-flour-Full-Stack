import { Router } from 'express';
import { appendToCollection, readCollection, writeCollection, nextId } from '../db.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/newsletter — subscribe an email (de-duplicated)
router.post('/newsletter', async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, errors: ['A valid email is required.'] });
  }

  const subscribers = await readCollection('newsletter');
  if (subscribers.some((s) => s.email === email)) {
    return res.status(200).json({ ok: true, message: "You're already on the list!" });
  }

  subscribers.push({ id: nextId(), email, subscribedAt: new Date().toISOString() });
  await writeCollection('newsletter', subscribers);

  res.status(201).json({ ok: true, message: 'Thanks for joining the Brew Club!' });
});

// GET /api/newsletter — list subscriber count + emails (simple admin view)
router.get('/newsletter', async (req, res) => {
  const subscribers = await readCollection('newsletter');
  res.json({ count: subscribers.length, subscribers });
});

export default router;
