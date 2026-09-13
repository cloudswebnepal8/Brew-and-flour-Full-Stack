// Small fetch wrapper for talking to the Brew & Flour backend.
// In dev, Vite proxies /api/* to the Express server (see vite.config.js).
// In production, set VITE_API_URL to the deployed backend's base URL.

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const errors = data?.errors || [data?.error || 'Something went wrong. Please try again.'];
    throw new Error(errors.join(' '));
  }

  return data;
}

export const getMenu = () => request('/menu');

export const getGallery = () => request('/gallery');

export const submitReservation = (payload) =>
  request('/reservations', { method: 'POST', body: JSON.stringify(payload) });

export const submitContact = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });

export const subscribeNewsletter = (email) =>
  request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
