const express = require('express');
const session = require('express-session');
const bcrypt  = require('bcryptjs');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, 'data');

// Asegurar que existe el directorio de datos
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);

// ── Helpers de archivos ───────────────────────────────────────────────────────
function readJSON(file, defaultVal) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return defaultVal;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (_) { return defaultVal; }
}
function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA, file), JSON.stringify(data, null, 2), 'utf8');
}

// ── Helpers específicos ───────────────────────────────────────────────────────
const getUsers    = ()         => readJSON('users.json', []);
const writeUsers  = (u)        => writeJSON('users.json', u);
const getProjects = ()         => readJSON('projects.json', []);
const writeProjects = (p)      => writeJSON('projects.json', p);
const getProjectData  = (pid, type)       => readJSON(`${type}-${pid}.json`, null);
const writeProjectData = (pid, type, d)   => writeJSON(`${type}-${pid}.json`, d);

// ── Proyecto por defecto (si no existe ninguno al arrancar) ───────────────────
function ensureDefaultProject() {
  const projects = getProjects();
  if (projects.length === 0) {
    writeProjects([{
      id: 'proj-1',
      nombre: 'PUEBLO MÁGICO EL SALITRE',
      descripcion: 'Proyecto inmobiliario — Primera etapa',
      createdBy: 1,
      createdAt: Date.now()
    }]);
    console.log('  Proyecto por defecto creado: PUEBLO MÁGICO EL SALITRE');
  }
}
ensureDefaultProject();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'lyl-bien-raiz-s3cr3t-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000  // 8 horas
  }
}));

// ── Auth guard ────────────────────────────────────────────────────────────────
const PUBLIC_PATHS = ['/api/login', '/api/check-auth'];
const PUBLIC_EXT   = /\.(css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/;

function requireAuth(req, res, next) {
  if (PUBLIC_PATHS.includes(req.path)) return next();
  if (PUBLIC_EXT.test(req.path))        return next();
  if (req.path === '/')                  return next();
  if (!req.session.userId) {
    if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'No autorizado' });
    return res.redirect('/');
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.session.role !== 'admin') return res.status(403).json({ error: 'Se requiere rol de administrador' });
  next();
}

function requireWriter(req, res, next) {
  if (req.session.role === 'viewer') return res.status(403).json({ error: 'Sin permisos de escritura' });
  next();
}

app.use(requireAuth);

// ── Autenticación ─────────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Datos incompletos' });

  const user = getUsers().find(u => u.email === email.trim().toLowerCase());
  const deny = () => res.status(401).json({ error: 'Credenciales incorrectas' });

  if (!user) return deny();
  if (!await bcrypt.compare(password, user.password)) return deny();

  const projects = getProjects();
  req.session.userId    = user.id;
  req.session.email     = user.email;
  req.session.name      = user.name;
  req.session.role      = user.role || 'viewer';
  req.session.currentProjectId = projects.length > 0 ? projects[0].id : null;

  res.json({ ok: true, name: user.name, role: user.role, projects });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/check-auth', (req, res) => {
  if (!req.session.userId) return res.json({ authenticated: false });
  res.json({
    authenticated: true,
    name: req.session.name,
    role: req.session.role,
    currentProjectId: req.session.currentProjectId,
    projects: getProjects()
  });
});

// ── API: Estado del modelo (por proyecto) ────────────────────────────────────
app.get('/api/state', (req, res) => {
  const pid = req.session.currentProjectId;
  if (!pid) return res.json({ ok: true, state: null });
  res.json({ ok: true, state: getProjectData(pid, 'state') });
});

app.put('/api/state', requireWriter, (req, res) => {
  const pid = req.session.currentProjectId;
  if (!pid) return res.status(400).json({ error: 'Sin proyecto activo' });
  writeProjectData(pid, 'state', req.body);
  res.json({ ok: true });
});

// ── API: Escenarios (por proyecto) ───────────────────────────────────────────
app.get('/api/escenarios', (req, res) => {
  const pid = req.session.currentProjectId;
  if (!pid) return res.json({ ok: true, escenarios: [] });
  res.json({ ok: true, escenarios: getProjectData(pid, 'escenarios') || [] });
});

app.post('/api/escenarios', requireWriter, (req, res) => {
  const pid = req.session.currentProjectId;
  if (!pid) return res.status(400).json({ error: 'Sin proyecto activo' });
  const db = getProjectData(pid, 'escenarios') || [];
  db.push(req.body);
  writeProjectData(pid, 'escenarios', db);
  res.json({ ok: true });
});

app.delete('/api/escenarios/:index', requireWriter, (req, res) => {
  const pid = req.session.currentProjectId;
  if (!pid) return res.status(400).json({ error: 'Sin proyecto activo' });
  const idx = parseInt(req.params.index);
  const db  = getProjectData(pid, 'escenarios') || [];
  if (idx >= 0 && idx < db.length) {
    db.splice(idx, 1);
    writeProjectData(pid, 'escenarios', db);
  }
  res.json({ ok: true });
});

// ── API: Proyectos ────────────────────────────────────────────────────────────
app.get('/api/projects', (req, res) => {
  res.json({ ok: true, projects: getProjects() });
});

app.post('/api/projects', requireAdmin, (req, res) => {
  const { nombre, descripcion } = req.body || {};
  if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
  const id = 'proj-' + Date.now();
  const projects = getProjects();
  projects.push({ id, nombre, descripcion: descripcion || '', createdBy: req.session.userId, createdAt: Date.now() });
  writeProjects(projects);
  res.json({ ok: true, id });
});

app.delete('/api/projects/:id', requireAdmin, (req, res) => {
  const id = req.params.id;
  const projects = getProjects().filter(p => p.id !== id);
  writeProjects(projects);
  // Borrar archivos de datos del proyecto
  ['state', 'escenarios'].forEach(type => {
    const fp = path.join(DATA, `${type}-${id}.json`);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  });
  res.json({ ok: true });
});

app.put('/api/projects/current', (req, res) => {
  const { projectId } = req.body || {};
  const exists = getProjects().find(p => p.id === projectId);
  if (!exists) return res.status(404).json({ error: 'Proyecto no encontrado' });
  req.session.currentProjectId = projectId;
  res.json({ ok: true });
});

// ── API: Usuarios (solo admin) ────────────────────────────────────────────────
app.get('/api/users', requireAdmin, (req, res) => {
  const users = getUsers().map(({ password, ...u }) => u); // nunca exponer hashes
  res.json({ ok: true, users });
});

app.post('/api/users', requireAdmin, async (req, res) => {
  const { email, name, password, role } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' });

  const users = getUsers();
  if (users.find(u => u.email === email.trim().toLowerCase())) {
    return res.status(400).json({ error: 'El correo ya está registrado' });
  }

  const validRoles = ['admin', 'editor', 'viewer'];
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    email: email.trim().toLowerCase(),
    name: name || email,
    role: validRoles.includes(role) ? role : 'viewer',
    password: await bcrypt.hash(password, 12)
  };
  users.push(newUser);
  writeUsers(users);
  res.json({ ok: true, id: newUser.id });
});

app.put('/api/users/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role, password } = req.body || {};
  const users = getUsers();
  const idx   = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado' });

  if (name)     users[idx].name = name;
  if (role && ['admin', 'editor', 'viewer'].includes(role)) users[idx].role = role;
  if (password) users[idx].password = await bcrypt.hash(password, 12);

  writeUsers(users);
  res.json({ ok: true });
});

app.delete('/api/users/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (id === req.session.userId) {
    return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });
  }
  writeUsers(getUsers().filter(u => u.id !== id));
  res.json({ ok: true });
});

// ── Archivos estáticos ────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));

// ── Fallback SPA ──────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`L&L Sistema corriendo en puerto ${PORT}`);
});
