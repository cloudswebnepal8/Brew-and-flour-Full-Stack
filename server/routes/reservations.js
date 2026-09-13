import { Router } from 'express';
import { appendToCollection, readCollection, nextId } from '../db.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateReservation(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push('Name is required.');
  if (!body.phone || !body.phone.trim()) errors.push('Phone number is required.');
  if (!body.email || !EMAIL_RE.test(body.email)) errors.push('A valid email is required.');
  if (!body.date) errors.push('Date is required.');
  if (!body.time) errors.push('Time is required.');
  if (!body.guests) errors.push('Number of guests is required.');
  return errors;
}

// POST /api/reservations — create a new reservation
router.post('/reservations', async (req, res) => {
  const errors = validateReservation(req.body);
  if (errors.length) {
    return res.status(400).json({ ok: false, errors });
  }

  const reservation = {
    id: nextId(),
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    email: req.body.email.trim(),
    date: req.body.date,
    time: req.body.time,
    guests: req.body.guests,
    notes: req.body.notes ? req.body.notes.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await appendToCollection('reservations', reservation);
  res.status(201).json({ ok: true, reservation });
});

// GET /api/reservations — list all reservations (simple admin/staff view)
router.get('/reservations', async (req, res) => {
  const reservations = await readCollection('reservations');
  reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(reservations);
});

export default router;
