# Brew & Flour — Full-Stack (React + Express)

A café website with a real backend: React (Vite) frontend talking to a
Node.js/Express API that stores reservations, contact messages, newsletter
signups, and serves the menu/gallery data.

```
brew-and-flour-fullstack/
  client/   — React app (Vite + React Router)
  server/   — Express API + JSON-file storage
```

## Quick start (two terminals)

**Terminal 1 — start the backend:**
```bash
cd server
npm install
npm run dev        # or: npm start
```
Runs on **http://localhost:3001**. You should see:
`Brew & Flour API running at http://localhost:3001`

**Terminal 2 — start the frontend:**
```bash
cd client
npm install
npm run dev
```
Runs on **http://localhost:5173**. Open that URL in your browser.

The frontend is pre-configured (see `client/vite.config.js`) to proxy any
`/api/*` request to `http://localhost:3001`, so as long as both are running
you don't need to configure anything else. The Reserve page, Contact page,
Newsletter box, Menu page, and Gallery page will all talk to the real
backend.

> **Order matters a little:** start the server first. If the client loads
> before the server is up, the Menu/Gallery pages will just fall back to
> their bundled sample data and show a small notice — refresh once the
> server is running and they'll switch to live data.

## What the backend does

| Method & Path              | Description                                      |
|-----------------------------|---------------------------------------------------|
| `GET  /api/health`          | Health check                                      |
| `GET  /api/menu`            | Returns all menu items                             |
| `GET  /api/gallery`         | Returns all gallery photos                         |
| `POST /api/reservations`    | Create a table reservation (validated server-side) |
| `GET  /api/reservations`    | List all reservations (newest first)               |
| `POST /api/contact`         | Submit a contact message (validated server-side)   |
| `GET  /api/contact`         | List all contact messages                          |
| `POST /api/newsletter`      | Subscribe an email (de-duplicated)                 |
| `GET  /api/newsletter`      | List subscriber count + emails                     |

Data is stored as plain JSON files in `server/data/` — `menu.json` and
`gallery.json` are pre-seeded; `reservations.json`, `contacts.json`, and
`newsletter.json` start empty and fill up as people use the site. This
keeps the demo dependency-free (no database server or native modules to
install), but it's easy to swap `server/db.js` for a real database later —
every route only calls `readCollection` / `writeCollection` /
`appendToCollection`, so that's the one file you'd need to change.

## Editing the menu or gallery

Just edit `server/data/menu.json` or `server/data/gallery.json` and restart
the server (or use `npm run dev`, which auto-restarts on file changes via
nodemon). The frontend re-fetches on every page load.

## Configuration

- **Backend port:** set `PORT` in `server/.env` (copy from
  `server/.env.example`) or as an environment variable. Defaults to 3001.
- **Frontend → backend URL in production:** the dev proxy only works for
  `npm run dev`. For a production build, set `VITE_API_URL` (in a
  `client/.env` file, e.g. `VITE_API_URL=https://api.yourdomain.com`)
  before running `npm run build`, so the built app knows where to send API
  requests. If you deploy both on the same domain/host behind one reverse
  proxy, you can leave it unset and route `/api` to the backend server at
  the infra level instead.

## Deploying

- **Backend:** any Node host works (Render, Railway, Fly.io, a VPS, etc.).
  Just make sure the `server/data/` directory is writable and persists
  between deploys — a JSON-file store won't survive an ephemeral
  filesystem, so for real production use consider swapping in a proper
  database once you're past the prototype stage.
- **Frontend:** `npm run build` in `client/` produces a static `dist/`
  folder you can deploy to Vercel, Netlify, GitHub Pages, or any static
  host — just set `VITE_API_URL` first as described above.

## Notes

- Images load from Unsplash and fonts from Google Fonts, so an internet
  connection is needed to see them.
- CORS is wide open (`app.use(cors())`) for local development simplicity.
  Lock this down to your real frontend origin before deploying publicly.
- Basic server-side validation is included for reservations, contact
  messages, and newsletter emails — invalid submissions return a 400 with
  a list of error messages that the frontend displays.
