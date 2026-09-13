import express from 'express';
import cors from 'cors';

import catalogRoutes from './routes/catalog.js';
import reservationRoutes from './routes/reservations.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Simple request log — handy while developing
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'brew-and-flour-server', time: new Date().toISOString() });
});

app.use('/api', catalogRoutes);
app.use('/api', reservationRoutes);
app.use('/api', contactRoutes);
app.use('/api', newsletterRoutes);

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`Brew & Flour API running at http://localhost:${PORT}`);
});
