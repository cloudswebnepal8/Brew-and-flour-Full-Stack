import { Router } from 'express';
import { appendToCollection, readCollection, nextId } from '../db.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push('Name is required.');
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push('A valid email is required.');
  if (!body.subject || !body.subject.trim()) errors.push('Subject is required.');
  if (!body.message || !body.message.trim()) errors.push('Message is required.');
  return errors;
}

// POST /api/contact — submit a contact message
router.post('/contact', async (req, res) => {
  const errors = validateContact(req.body);
  if (errors.length) {
    return res.status(400).json({ ok: false, errors });
  }

  const message = {
    id: nextId(),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    subject: req.body.subject.trim(),
    message: req.body.message.trim(),
    createdAt: new Date().toISOString(),
  };

  await appendToCollection('contacts', message);
  res.status(201).json({ ok: true, message: 'Thanks for reaching out! We will get back to you within 24 hours.' });
});

// GET /api/contact — list all contact messages (simple admin/staff view)
router.get('/contact', async (req, res) => {
  const messages = await readCollection('contacts');
  messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(messages);
});

export default router;
