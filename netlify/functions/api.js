/**
 * Netlify Function — API unificada para LYL Bien Raíz
 * Maneja: login, check-auth, logout, CRUD de usuarios
 * Almacenamiento: Netlify Blobs (persistente)
 * Autenticación: cookie HMAC firmada (sin dependencias externas)
 */

const crypto = require('crypto');

// bcryptjs viene del package.json raíz
let bcrypt;
try { bcrypt = require('bcryptjs'); } catch (_) { }

// ── Configuración ─────────────────────────────────────────────────────────────
const SECRET      = process.env.AUTH_SECRET || 'lyl-bien-raiz-secret-2024';
const COOKIE_NAME = 'lyl_session';
const MAX_AGE_S   = 8 * 60 * 60; // 8 horas

// Usuarios iniciales (seeds de data/users.json — incluyen hashes bcrypt)
const SEED_USERS = [
  { id: 1, email: 'stdmexico@me.com',      name: 'Admin',      role: 'admin',  password: '$2b$12$/FisdiRuy0L1W7XXtPpKBeQwuBHW5Z0XAoXuP6VyTezZQbxaA81Ka' },
  { id: 2, email: 'libreyloco@icloud.com', name: 'Editor',     role: 'admin',  password: '$2b$12$cQUInmbxDCmi70yIWl2RYurEnowV84sBasuB8rUEMmZTZGiv4MW2K' },
  { id: 3, email: 'stdmexico@mac.com',     name: 'PRUEBA',     role: 'viewer', password: '$2b$12$q4yhjeQ7hfD.BERurznkN.1ISZrGEjY19ElhBKRZYIGNZtcfHupeS' },
  { id: 4, email: 'stdmexico@gmail.com',   name: 'PRUEBA DOS', role: 'editor', password: '$2b$12$SLXASjxDEyAZbDEDgmatoe5DHNp4Xbysztwg9IGz55HvOsxZYh59S' }
];

// Contraseñas de fallback que siempre son válidas (para static hosting demo)
const FALLBACK_PASSWORDS = ['lyl2024', 'SALITRE'];

// ── Netlify Blobs ─────────────────────────────────────────────────────────────
async function loadUsers() {
  try {
    const { getStore } = require('@netlify/blobs');
    const store = getStore('lyl-users');
    const data = await store.get('users', { type: 'json' });
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (_) { }
  return JSON.parse(JSON.stringify(SEED_USERS));
}

async function persistUsers(users) {
  try {
    const { getStore } = require('@netlify/blobs');
    const store = getStore('lyl-users');
    await store.set('users', JSON.stringify(users));
  } catch (_) { }
}

// ── Sesión / Cookie ───────────────────────────────────────────────────────────
function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig  = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    const [data, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch (_) { return null; }
}

function cookieSet(session) {
  const token = signToken({ ...session, exp: Date.now() + MAX_AGE_S * 1000 });
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_S}`;
}

function cookieClear() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
}

function getSession(event) {
  const raw = event.headers.cookie || event.headers.Cookie || '';
  const match = raw.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match ? verifyToken(match[1]) : null;
}

// ── Helpers de respuesta ──────────────────────────────────────────────────────
const H = { 'Content-Type': 'application/json' };
const ok  = (body, extra = {}) => ({ statusCode: 200, headers: { ...H, ...extra }, body: JSON.stringify(body) });
const fail = (code, msg, extra = {}) => ({ statusCode: code, headers: { ...H, ...extra }, body: JSON.stringify({ error: msg }) });

// ── Handler principal ─────────────────────────────────────────────────────────
exports.handler = async (event) => {
  // Extraer ruta relativa (sin /api)
  let path;
  try {
    path = new URL(event.rawUrl).pathname.replace(/^\/api/, '');
  } catch (_) {
    path = (event.path || '').replace(/^\/api/, '');
  }
  const method = event.httpMethod;

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: { ...H, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' } };
  }

  // ── POST /api/login ────────────────────────────────────────────────────────
  if (path === '/login' && method === 'POST') {
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch (_) { return fail(400, 'JSON inválido'); }

    const { email, password } = body;
    if (!email || !password) return fail(400, 'Email y contraseña requeridos');

    const users = await loadUsers();
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    let valid = false;
    // Contraseñas de fallback (siempre válidas, cualquier email)
    if (FALLBACK_PASSWORDS.includes(password)) {
      valid = true;
      // Si no hay usuario con ese email, creamos sesión admin genérica
      if (!user) {
        const session = { email, name: email, role: 'admin' };
        return ok({ ok: true, role: 'admin', name: email }, { 'Set-Cookie': cookieSet(session) });
      }
    }

    if (!valid && user && bcrypt) {
      try { valid = await bcrypt.compare(password, user.password); } catch (_) { }
    }

    if (!valid || !user) return fail(401, 'Credenciales incorrectas');

    const session = { email: user.email, name: user.name, role: user.role };
    return ok({ ok: true, role: user.role, name: user.name }, { 'Set-Cookie': cookieSet(session) });
  }

  // ── GET /api/check-auth ────────────────────────────────────────────────────
  if (path === '/check-auth' && method === 'GET') {
    const session = getSession(event);
    if (!session) return ok({ authenticated: false });
    return ok({ authenticated: true, role: session.role, name: session.name, email: session.email });
  }

  // ── POST /api/logout ───────────────────────────────────────────────────────
  if (path === '/logout' && method === 'POST') {
    return ok({ ok: true }, { 'Set-Cookie': cookieClear() });
  }

  // ── GET /api/users ─────────────────────────────────────────────────────────
  if (path === '/users' && method === 'GET') {
    const session = getSession(event);
    if (!session || session.role !== 'admin') return fail(401, 'No autorizado');
    const users = await loadUsers();
    return ok({ users: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })) });
  }

  // ── POST /api/users ────────────────────────────────────────────────────────
  if (path === '/users' && method === 'POST') {
    const session = getSession(event);
    if (!session || session.role !== 'admin') return fail(401, 'No autorizado');

    let body;
    try { body = JSON.parse(event.body || '{}'); } catch (_) { return fail(400, 'JSON inválido'); }

    const { name, email, password, role } = body;
    if (!email || !password) return fail(400, 'Email y contraseña requeridos');

    const users = await loadUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return fail(409, 'Ya existe un usuario con ese correo');
    }

    let hashed = password;
    if (bcrypt) {
      try { hashed = await bcrypt.hash(password, 12); } catch (_) { }
    }

    const newId   = Math.max(0, ...users.map(u => u.id)) + 1;
    const newUser = { id: newId, name: name || email, email, role: role || 'viewer', password: hashed };
    users.push(newUser);
    await persistUsers(users);

    return ok({ id: newId, name: newUser.name, email: newUser.email, role: newUser.role });
  }

  // ── PUT /api/users/:id ─────────────────────────────────────────────────────
  const idMatch = path.match(/^\/users\/(\d+)$/);
  if (idMatch && method === 'PUT') {
    const session = getSession(event);
    if (!session || session.role !== 'admin') return fail(401, 'No autorizado');

    const id = parseInt(idMatch[1], 10);
    let body;
    try { body = JSON.parse(event.body || '{}'); } catch (_) { return fail(400, 'JSON inválido'); }

    const users = await loadUsers();
    const user  = users.find(u => u.id === id);
    if (!user) return fail(404, 'Usuario no encontrado');

    if (body.role)     user.role = body.role;
    if (body.name)     user.name = body.name;
    if (body.password && bcrypt) {
      try { user.password = await bcrypt.hash(body.password, 12); } catch (_) { }
    }
    await persistUsers(users);
    return ok({ id: user.id, name: user.name, email: user.email, role: user.role });
  }

  // ── DELETE /api/users/:id ─────────────────────────────────────────────────
  if (idMatch && method === 'DELETE') {
    const session = getSession(event);
    if (!session || session.role !== 'admin') return fail(401, 'No autorizado');

    const id = parseInt(idMatch[1], 10);
    let users = await loadUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return fail(404, 'Usuario no encontrado');

    users.splice(idx, 1);
    await persistUsers(users);
    return ok({ ok: true });
  }

  return fail(404, 'Ruta no encontrada');
};
