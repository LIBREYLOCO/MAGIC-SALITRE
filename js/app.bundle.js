"use strict";
(() => {
  // js/modules/sanitize.js
  function escapeHTML(str) {
    if (str == null) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // js/modules/utils.js
  function debounce(fn, ms) {
    let timer = null;
    function debounced(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, ms);
    }
    debounced.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    debounced.pending = () => timer !== null;
    return debounced;
  }
  var MXN = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  // js/modules/validation.js
  var RULES = {
    // Variables financieras
    capitalRequerido: { min: 0, max: 99999999999, label: "Capital Requerido" },
    numTicketsMax: { min: 1, max: 1e5, label: "Total Tickets" },
    m2ComercialPB: { min: 0, max: 1e6, label: "M\xB2 Comercial" },
    rentaM2Comercial: { min: 0, max: 1e5, label: "Renta/M\xB2 Comercial" },
    m2HotelNivel1: { min: 0, max: 1e6, label: "M\xB2 Hotel N1" },
    rentaM2HotelNivel1: { min: 0, max: 1e5, label: "Renta/M\xB2 Hotel N1" },
    m2HotelNivel2: { min: 0, max: 1e6, label: "M\xB2 Hotel N2" },
    rentaM2HotelNivel2: { min: 0, max: 1e5, label: "Renta/M\xB2 Hotel N2" },
    capacidadEstacionamiento: { min: 0, max: 1e5, label: "Capacidad Estacionamiento" },
    cochesDiarios: { min: 0, max: 1e5, label: "Coches Diarios" },
    precioPorCoche: { min: 0, max: 1e4, label: "Precio por Coche" },
    valorFideicomiso: { min: 0, max: 99999999999, label: "Valor Fideicomiso" },
    costoFideicomisoMensual: { min: 0, max: 99999999, label: "Costo Fideicomiso Mensual" },
    aniosProyeccion: { min: 1, max: 20, label: "A\xF1os de Proyecci\xF3n" },
    inflacionAnualRentas: { min: 0, max: 50, label: "Inflaci\xF3n Anual" },
    costoAdminRentasPct: { min: 0, max: 100, label: "Costo Admin %" },
    pctTicketsModelo: { min: 0, max: 50, label: "% Tickets Modelo" },
    costoM2Construccion: { min: 0, max: 999999, label: "Costo M\xB2 Construcci\xF3n" },
    precioMercadoActualM2: { min: 0, max: 999999, label: "Precio Mercado M\xB2" },
    valorTerrenoAportado: { min: 0, max: 99999999999, label: "Valor Terreno" },
    precioTicketTerreno: { min: 0, max: 99999999, label: "Precio Ticket Terreno" },
    // Egresos
    nominaAdmin: { min: 0, max: 99999999, label: "N\xF3mina Admin" },
    nominaVentas: { min: 0, max: 99999999, label: "N\xF3mina Ventas" },
    gastosContables: { min: 0, max: 99999999, label: "Gastos Contables" },
    gastosLegales: { min: 0, max: 99999999, label: "Gastos Legales" },
    rentaLugar: { min: 0, max: 99999999, label: "Renta Lugar" },
    gastosPublicidad: { min: 0, max: 99999999, label: "Publicidad" },
    gastosRepresentacion: { min: 0, max: 99999999, label: "Representaci\xF3n" },
    comisionVentasPct: { min: 0, max: 30, label: "Comisi\xF3n Ventas %" },
    mesesLevantamiento: { min: 1, max: 60, label: "Meses Levantamiento" },
    // Texto
    proyecto: { maxLength: 200, type: "text", label: "Nombre del Proyecto" }
  };
  function validateField(key, value, isText) {
    const rule = RULES[key];
    if (!rule) return { valid: true };
    if (isText || rule.type === "text") {
      const str = String(value || "");
      if (rule.maxLength && str.length > rule.maxLength) {
        return { valid: false, message: `${rule.label}: m\xE1ximo ${rule.maxLength} caracteres` };
      }
      return { valid: true };
    }
    const num = Number(value);
    if (isNaN(num)) {
      return { valid: false, message: `${rule.label}: debe ser un n\xFAmero v\xE1lido` };
    }
    if (rule.min !== void 0 && num < rule.min) {
      return { valid: false, message: `${rule.label}: m\xEDnimo ${rule.min}`, clamped: rule.min };
    }
    if (rule.max !== void 0 && num > rule.max) {
      return { valid: false, message: `${rule.label}: m\xE1ximo ${rule.max.toLocaleString()}`, clamped: rule.max };
    }
    return { valid: true };
  }
  function showInputError(el, message) {
    el.style.borderColor = "#E8A090";
    el.style.boxShadow = "0 0 0 2px rgba(232,160,144,0.3)";
    const prev = el.parentElement.querySelector(".input-error-msg");
    if (prev) prev.remove();
    const errDiv = document.createElement("div");
    errDiv.className = "input-error-msg";
    errDiv.style.cssText = "font-size:10px; color:#E8A090; margin-top:2px; font-weight:500;";
    errDiv.textContent = message;
    el.parentElement.appendChild(errDiv);
    setTimeout(() => {
      el.style.borderColor = "";
      el.style.boxShadow = "";
      if (errDiv.parentElement) errDiv.remove();
    }, 3e3);
  }
  function clearInputError(el) {
    el.style.borderColor = "";
    el.style.boxShadow = "";
    const prev = el.parentElement.querySelector(".input-error-msg");
    if (prev) prev.remove();
  }

  // js/app.js
  var App = (() => {
    const DEFAULTS = {
      variables: {
        proyecto: "PUEBLO M\xC1GICO EL SALITRE",
        capitalRequerido: 215e6,
        terreno: 4e4,
        numTicketsMax: 407,
        m2ComercialPB: 3e3,
        rentaM2Comercial: 450,
        m2HotelNivel1: 3e3,
        rentaM2HotelNivel1: 300,
        m2HotelNivel2: 3e3,
        rentaM2HotelNivel2: 250,
        m2Estacionamiento: 6e3,
        capacidadEstacionamiento: 270,
        cochesDiarios: 350,
        precioPorCoche: 70,
        valorFideicomiso: 2e6,
        costoFideicomisoMensual: 5e4,
        aniosProyeccion: 10,
        inflacionAnualRentas: 5,
        costoAdminRentasPct: 12,
        pctTicketsModelo: 20,
        costoM2Construccion: 18e3,
        precioMercadoActualM2: 48500,
        aportaTerreno: true,
        valorTerrenoAportado: 4e7,
        precioTicketTerreno: 599e3,
        selectedPlusvaliaTicketIdx: 0,
        activeReportTab: "ingresos",
        incluyeEstacionamiento: true,
        ocupacionRentas: [60, 75, 90, ...Array(17).fill(100)],
        ocupacionEstacionamiento: [60, 75, 90, ...Array(17).fill(100)]
      },
      tickets: [
        { id: 1, cantidad: 50, precio: 599999, nombre: "Fase Semilla", esAportado: false },
        { id: 2, cantidad: 75, precio: 699999, nombre: "Preventa Privada", esAportado: false },
        { id: 3, cantidad: 75, precio: 799999, nombre: "Oferta Primaria", esAportado: false },
        { id: 4, cantidad: 30, precio: 899999, nombre: "Oferta Secundaria", esAportado: false },
        { id: 5, cantidad: 30, precio: 999999, nombre: "Cierre de Emisi\xF3n", esAportado: false },
        { id: 6, cantidad: 66, precio: 599e3, nombre: "Capital Tierra", esAportado: true, esTerrenoFijo: true }
      ],
      egresos: {
        nominaAdmin: 8e4,
        nominaVentas: 15e4,
        gastosContables: 3e4,
        gastosLegales: 6e4,
        rentaLugar: 2e4,
        gastosPublicidad: 15e4,
        gastosRepresentacion: 5e4,
        acopOficina: 15e4,
        acopMaqueta: 12e4,
        acopRenders: 8e4,
        acopFotos: 3e4,
        acopMedia: 12e4,
        comisionVentasPct: 8,
        // Porcentaje sobre ventas
        mesesLevantamiento: 18
        // 12, 16, 18, 24
      },
      showroomItems: [
        { nombre: "Maqueta del Proyecto", cantidad: 1, costo: 15e4 },
        { nombre: "Escritorios", cantidad: 4, costo: 8e3 },
        { nombre: "Sillas de Oficina", cantidad: 8, costo: 3500 },
        { nombre: "Cuadros / Arte Decorativo", cantidad: 6, costo: 7e3 },
        { nombre: "Televisi\xF3n / Monitor", cantidad: 2, costo: 12e3 },
        { nombre: "Archiveros", cantidad: 2, costo: 4500 },
        { nombre: "Equipo de C\xF3mputo", cantidad: 4, costo: 18e3 },
        { nombre: "Iluminaci\xF3n Decorativa", cantidad: 1, costo: 25e3 },
        { nombre: "Sof\xE1s / Sala de Espera", cantidad: 1, costo: 7e4 },
        { nombre: "Pantalla / Proyector", cantidad: 1, costo: 22e3 },
        { nombre: "Se\xF1al\xE9tica y Branding", cantidad: 1, costo: 25e3 },
        { nombre: "Menaje y Detalles", cantidad: 1, costo: 18e3 }
      ],
      obraItems: [
        { nombre: "Construcci\xF3n de Obra", cantidad: 9e3, costo: 18e3 },
        { nombre: "Obra Exteriores", cantidad: 2703, costo: 3500 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 },
        { nombre: "", cantidad: 1, costo: 0 }
      ],
      inversionistas: [],
      pagos: []
    };
    let state = {};
    let escenariosDb = [];
    let _saveStateTimer = null;
    let renderGeneration = 0;
    let currentRole = "viewer";
    let currentProjectId = null;
    let projectsList = [];
    let usersDb = [];
    let currentView = "dashboard";
    let isPDFMode = false;
    let charts = [];
    function updateCharts() {
      charts.forEach((c) => c.destroy());
      charts = [];
      const ctxInv = document.getElementById("chart-inventario");
      const ctxIng = document.getElementById("chart-ingresos");
      if (ctxInv) {
        const tVendidosLedger = (state.inversionistas || []).reduce((s, i) => s + (Number(i.tickets) || 0), 0);
        const maxTickets = Number(state.variables.numTicketsMax) || 0;
        const tAportados = state.tickets.filter((t) => t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0), 0) + Math.floor(maxTickets * (state.variables.pctTicketsModelo / 100));
        const tDisponibles = maxTickets - tVendidosLedger - tAportados;
        charts.push(new Chart(ctxInv, {
          type: "doughnut",
          data: {
            labels: ["Vendidos", "Aportados", "Disponibles"],
            datasets: [{
              data: [tVendidosLedger, tAportados, tDisponibles],
              backgroundColor: ["#3A1C15", "#C5A059", "#E5DED5"],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom", labels: { color: getComputedStyle(document.body).getPropertyValue("--text") } } }
          }
        }));
      }
      if (ctxIng) {
        const v = state.variables;
        const m2Comercial = Number(v.m2ComercialPB) || 0;
        const m2Hotel1 = Number(v.m2HotelNivel1) || 0;
        const m2Hotel2 = Number(v.m2HotelNivel2) || 0;
        const rComercial = m2Comercial * (Number(v.rentaM2Comercial) || 0);
        const rHotel1 = m2Hotel1 * (Number(v.rentaM2HotelNivel1) || 0);
        const rHotel2 = m2Hotel2 * (Number(v.rentaM2HotelNivel2) || 0);
        const rEstac = (Number(v.cochesDiarios) || 350) * (Number(v.precioPorCoche) || 50) * 30;
        charts.push(new Chart(ctxIng, {
          type: "bar",
          data: {
            labels: ["Comercial", "Hotel N1", "Hotel N2", "Estac."],
            datasets: [{
              label: "Ingreso Mensual",
              data: [rComercial, rHotel1, rHotel2, rEstac],
              backgroundColor: "#C5A059",
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, grid: { color: getComputedStyle(document.body).getPropertyValue("--border") }, ticks: { color: getComputedStyle(document.body).getPropertyValue("--text") } },
              x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text") } }
            },
            plugins: { legend: { display: false } }
          }
        }));
      }
      const ctxProy = document.getElementById("chart-proyeccion-10");
      if (ctxProy) {
        const v = state.variables;
        const anios = Number(v.aniosProyeccion) || 10;
        const inflacion = (Number(v.inflacionAnualRentas) || 5) / 100;
        const m2Comercial = Number(v.m2ComercialPB) || 0;
        const m2Hotel1 = Number(v.m2HotelNivel1) || 0;
        const m2Hotel2 = Number(v.m2HotelNivel2) || 0;
        const rMensual = m2Comercial * (Number(v.rentaM2Comercial) || 0) + m2Hotel1 * (Number(v.rentaM2HotelNivel1) || 0) + m2Hotel2 * (Number(v.rentaM2HotelNivel2) || 0) + (Number(v.cochesDiarios) || 350) * (Number(v.precioPorCoche) || 50) * 30;
        const labels = [];
        const data = [];
        let baseAnual = rMensual * 12;
        for (let i = 1; i <= anios; i++) {
          labels.push(`A\xF1o ${i}`);
          data.push(Math.round(baseAnual));
          baseAnual *= 1 + inflacion;
        }
        charts.push(new Chart(ctxProy, {
          type: "line",
          data: {
            labels,
            datasets: [{
              label: "Flujo de Caja Bruto Anual",
              data,
              borderColor: "#C5A059",
              backgroundColor: "rgba(197, 160, 89, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3A1C15"
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: getComputedStyle(document.body).getPropertyValue("--border") },
                ticks: {
                  color: getComputedStyle(document.body).getPropertyValue("--text"),
                  callback: (val) => MXN2.format(val)
                }
              },
              x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text") } }
            },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => M(ctx.raw) } } }
          }
        }));
      }
    }
    const MXN2 = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const M = (val) => MXN2.format(val || 0);
    function _showSaveIndicator(status) {
      let ind = document.getElementById("save-indicator");
      if (!ind) {
        ind = document.createElement("div");
        ind.id = "save-indicator";
        ind.style.cssText = "position:fixed;bottom:16px;right:16px;padding:6px 14px;border-radius:6px;font-size:11px;font-weight:600;z-index:9998;transition:opacity 0.3s;pointer-events:none;";
        document.body.appendChild(ind);
      }
      if (status === "saving") {
        ind.textContent = "Guardando...";
        ind.style.background = "rgba(197,160,89,0.9)";
        ind.style.color = "#fff";
        ind.style.opacity = "1";
      } else if (status === "saved") {
        ind.textContent = "\u2713 Guardado";
        ind.style.background = "rgba(46,204,113,0.9)";
        ind.style.color = "#fff";
        ind.style.opacity = "1";
        setTimeout(() => {
          ind.style.opacity = "0";
        }, 1500);
      } else if (status === "conflict") {
        ind.textContent = "\u26A0 Conflicto \u2014 recargando";
        ind.style.background = "rgba(232,160,144,0.9)";
        ind.style.color = "#fff";
        ind.style.opacity = "1";
        setTimeout(() => {
          ind.style.opacity = "0";
        }, 3e3);
      } else if (status === "error") {
        ind.textContent = "\u2715 Error al guardar";
        ind.style.background = "rgba(232,160,144,0.9)";
        ind.style.color = "#fff";
        ind.style.opacity = "1";
        setTimeout(() => {
          ind.style.opacity = "0";
        }, 3e3);
      }
    }
    const _debouncedServerSave = debounce(async () => {
      _showSaveIndicator("saving");
      try {
        const res = await fetch("/api/state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state)
        });
        if (res.status === 409) {
          _showSaveIndicator("conflict");
          const data = await res.json();
          if (data.serverState) {
            state = data.serverState;
            localStorage.setItem("lyl_bienraiz_state", JSON.stringify(state));
            navigate(currentView);
          }
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (data._version !== void 0) {
            state._version = data._version;
            localStorage.setItem("lyl_bienraiz_state", JSON.stringify(state));
          }
          _showSaveIndicator("saved");
        } else {
          _showSaveIndicator("error");
        }
      } catch (_) {
      }
    }, 1e3);
    function saveState() {
      if (currentRole === "viewer") return;
      localStorage.setItem("lyl_bienraiz_state", JSON.stringify(state));
      _debouncedServerSave();
    }
    async function loadState() {
      const savedTheme = localStorage.getItem("lyl_theme") || "light";
      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
      }
      try {
        const res = await fetch("/api/state");
        const data = await res.json();
        if (data.state) {
          localStorage.setItem("lyl_bienraiz_state", JSON.stringify(data.state));
          return data.state;
        }
      } catch (_) {
      }
      try {
        const s = localStorage.getItem("lyl_bienraiz_state");
        const parsed = s ? JSON.parse(s) : null;
        return parsed || JSON.parse(JSON.stringify(DEFAULTS));
      } catch (_) {
        return JSON.parse(JSON.stringify(DEFAULTS));
      }
    }
    async function loadEscenarios() {
      try {
        const res = await fetch("/api/escenarios");
        const data = await res.json();
        if (Array.isArray(data.escenarios)) {
          localStorage.setItem("lil_escenarios_db", JSON.stringify(data.escenarios));
          return data.escenarios;
        }
      } catch (_) {
      }
      try {
        return JSON.parse(localStorage.getItem("lil_escenarios_db") || "[]");
      } catch (_) {
        return [];
      }
    }
    function saveUsers() {
      localStorage.setItem("lil_users_db", JSON.stringify(usersDb));
      fetch("/api/users/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: usersDb })
      }).catch(() => {
      });
    }
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.users)) {
            localStorage.setItem("lil_users_db", JSON.stringify(data.users));
            return data.users;
          }
        }
      } catch (_) {
      }
      try {
        const u = localStorage.getItem("lil_users_db");
        if (u) return JSON.parse(u);
      } catch (_) {
      }
      try {
        const res = await fetch("data/users.json");
        if (res.ok) {
          const users = await res.json();
          if (Array.isArray(users)) return users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
        }
      } catch (_) {
      }
      return [];
    }
    function renderDashboard() {
      const v = state.variables;
      const e = state.egresos;
      const meta = Number(v.capitalRequerido) || 0;
      const pctModelo = v.pctTicketsModelo || 0;
      const maxTickets = Number(v.numTicketsMax) || 1;
      const ticketsModelo = Math.floor(maxTickets * (pctModelo / 100));
      const entradasPactadas = state.tickets.reduce((s, t) => s + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
      const entradasReales = (state.pagos || []).reduce((s, p) => s + (Number(p.monto) || 0), 0);
      const entradas = state.pagos && state.pagos.length > 0 ? entradasReales : entradasPactadas;
      const ticketsVendidosConf = state.tickets.reduce((s, t) => s + (Number(t.cantidad) || 0), 0);
      const ticketsTotales = ticketsVendidosConf + ticketsModelo;
      const pclMeta = meta > 0 ? entradas / meta * 100 : 0;
      const invs = state.inversionistas || [];
      const tVendidosLedger = invs.reduce((s, i) => s + (Number(i.tickets) || 0), 0);
      const tAportadosBase = state.tickets.filter((t) => t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0), 0);
      const tAportados = tAportadosBase + ticketsModelo;
      const tDisponibles = maxTickets - tVendidosLedger - tAportados;
      const m2Comercial = Number(v.m2ComercialPB) || 0;
      const m2Hotel1 = Number(v.m2HotelNivel1) || 0;
      const m2Hotel2 = Number(v.m2HotelNivel2) || 0;
      const totalM2 = m2Comercial + m2Hotel1 + m2Hotel2;
      const m2PorTicket = maxTickets > 0 ? totalM2 / maxTickets : 0;
      const rentaMensual = m2Comercial * (Number(v.rentaM2Comercial) || 0) + m2Hotel1 * (Number(v.rentaM2HotelNivel1) || 0) + m2Hotel2 * (Number(v.rentaM2HotelNivel2) || 0);
      const estacMensual = v.incluyeEstacionamiento !== false ? (Number(v.cochesDiarios) || 350) * (Number(v.precioPorCoche) || 50) * 30 : 0;
      const ingresoMensualTotal = rentaMensual + estacMensual;
      const ingresoAnualTotal = ingresoMensualTotal * 12;
      const meses = Number(e.mesesLevantamiento) || 24;
      const fijoMes = (e.nominaAdmin || 0) + (e.nominaVentas || 0) + (e.gastosContables || 0) + (e.gastosLegales || 0) + (e.rentaLugar || 0) + (e.gastosPublicidad || 0) + (e.gastosRepresentacion || 0);
      const egresosFijos = fijoMes * meses;
      const entradasVendidas = state.tickets.filter((t) => !t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
      const comision = entradasVendidas * ((e.comisionVentasPct || 0) / 100);
      const acop = (e.acopOficina || 0) + (e.acopMaqueta || 0) + (e.acopRenders || 0) + (e.acopFotos || 0) + (e.acopMedia || 0);
      const terrenoValor = v.aportaTerreno ? state.tickets.filter((t) => t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0) : Number(v.costoCompraTerreno) || 0;
      const egresosTotales = egresosFijos + acop + comision + terrenoValor;
      const capitalNeto = entradas - egresosTotales;
      const costoObra = (state.obraItems || []).reduce((s, it) => s + Number(it.cantidad) * Number(it.costo), 0);
      const remanente = capitalNeto - costoObra;
      const capRate = entradas > 0 ? ingresoAnualTotal / entradas * 100 : 0;
      const pctCapitalNeto = meta > 0 ? capitalNeto / meta * 100 : 0;
      const kpiCard = (label, valor, sub, color, borderColor, tooltip) => `<div class="card animate-scale ${color.includes("status") ? color : ""}" style="padding:20px; border-top:3px solid ${borderColor}; transition: transform 0.3s ease;" ${tooltip ? `data-tooltip="${tooltip}"` : ""}>
        <div class="kpi-label">${label} ${tooltip ? '<span class="info-icon">i</span>' : ""}</div>
        <div style="font-size:22px; font-weight:700; color:${color.startsWith("status") ? "inherit" : color}; line-height:1.2;">${valor}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:6px;">${sub}</div>
      </div>`;
      const _gen = renderGeneration;
      setTimeout(() => {
        if (renderGeneration === _gen) updateCharts();
      }, 50);
      return `
    <div class="section-header">
      <div>
        <div class="section-title">Dashboard</div>
        <div class="section-sub">${escapeHTML(v.proyecto)}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px; font-weight:600; color:var(--navy);">${ticketsTotales} / ${maxTickets} tickets emitidos</div>
        <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">${ticketsVendidosConf} venta + ${ticketsModelo} asignaci\xF3n modelo</div>
      </div>
    </div>

    // KPIs principales
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:20px;">
      ${kpiCard("Meta de Capital", M(meta), "Objetivo de levantamiento", "var(--navy)", "#C5A059", "Monto total de inversi\xF3n necesaria para el proyecto.")}
      ${kpiCard("Entradas Proyectadas", M(entradas), `<span style="font-weight:700; color:${pclMeta >= 100 ? "#2ecc71" : "#C5A059"};">${pclMeta.toFixed(1)}%</span> de la meta cubierto`, "#2ecc71", "#2ecc71", "Capital total comprometido por los inversionistas a la fecha.")}
      ${kpiCard("Egresos de Levantamiento", M(egresosTotales), `Fijos ${meses} meses + comisiones + acop.`, "#E8A090", "#E8A090", "Gastos operativos, comerciales y de preventa.")}
      ${kpiCard("Capital Neto a Obra", M(capitalNeto), `${pctCapitalNeto.toFixed(1)}% del objetivo disponible`, capitalNeto >= meta * 0.8 ? "var(--navy)" : "#C5A059", "var(--navy)", "Capital remanente para construcci\xF3n despu\xE9s de egresos.")}
    </div>

    <!-- Indicadores de Inventario de Tickets -->
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:20px;">
      ${kpiCard("Tickets Vendidos", tVendidosLedger, `Venta real v\xEDa Ledger`, "var(--navy)", "var(--navy)", "Suma de tickets asignados a inversionistas reales.")}
      ${kpiCard("Tickets Disponibles", tDisponibles, `${(tDisponibles / maxTickets * 100).toFixed(1)}% del inventario`, tDisponibles > 50 ? "status-high" : "status-mid", "#C5A059", "Tickets a\xFAn no asignados ni vendidos.")}
      ${kpiCard("Tickets Aportados", tAportados, `Reserva / Capital Tierra`, "#95a5a6", "#95a5a6", "Tickets reservados para aportaciones fijas o socios fundadores.")}
      ${kpiCard("Total de Tickets", maxTickets, `Emisi\xF3n total autorizada`, "#7f8c8d", "#C5A059", "Capacidad nominal m\xE1xima del proyecto.")}
    </div>

    <!-- KPIs de Rendimiento -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:20px;">
      ${kpiCard("Cap Rate Bruto Anual", `${capRate.toFixed(2)}%`, "Ingreso anual \xF7 capital captado", capRate > 8 ? "status-high" : capRate > 5 ? "status-mid" : "status-low", "#C5A059", "Tasa de capitalizaci\xF3n: Eficiencia del activo para generar rentas. Ideal > 8%")}
      ${kpiCard("Equivalencia F\xEDsica", `${22.5.toFixed(1)} m\xB2`, "9,000 m\xB2 rentables totales", "var(--navy)", "#C5A059", "Metros cuadrados proporcionales por ticket de inversi\xF3n.")}
      ${kpiCard("Ingreso Mensual Pool", M(v.ingresoMensualNeto || 0), v.incluyeEstacionamiento !== false ? "Rentas + estacionamiento" : "Rentas", v.ingresoMensualNeto > 4e6 ? "status-high" : "var(--navy)", "#C5A059", "Flujo de caja neto estimado repartible mensualmente.")}
    </div>

    <!-- Barra de progreso -->
    <div class="card" style="padding:16px 24px; margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:600; color:var(--navy);">Progreso de Levantamiento</span>
        <span style="font-size:13px; font-weight:700; color:${pclMeta >= 100 ? "#2ecc71" : "#C5A059"};">${pclMeta.toFixed(1)}% \u2014 ${M(entradas)} de ${M(meta)}</span>
      </div>
      <div style="height:10px; background:#f0f4f8; border-radius:5px; overflow:hidden;">
        <div style="height:100%; width:${Math.min(100, pclMeta)}%; background:${pclMeta >= 100 ? "#2ecc71" : "linear-gradient(90deg,#C5A059,#e8c870)"}; border-radius:5px; transition:width 0.5s;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:10px; color:var(--text-muted);">
        <span>$0</span><span>${M(meta * 0.25)}</span><span>${M(meta * 0.5)}</span><span>${M(meta * 0.75)}</span><span>${M(meta)}</span>
      </div>
    </div>

    <!-- M\xE9tricas operativas -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:20px;">
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(46,204,113,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#2ecc71; flex-shrink:0;">%</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Cap Rate Bruto Anual</div>
          <div style="font-size:22px; font-weight:700; color:${capRate > 10 ? "#2ecc71" : "var(--navy)"};">${capRate.toFixed(2)}%</div>
          <div style="font-size:11px; color:var(--text-muted);">Ingreso anual \xF7 capital captado</div>
        </div>
      </div>
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(197,160,89,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:#C5A059; flex-shrink:0;">m\xB2</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Equivalencia F\xEDsica / Ticket</div>
          <div style="font-size:22px; font-weight:700; color:var(--navy);">${m2PorTicket.toFixed(1)} m\xB2</div>
          <div style="font-size:11px; color:var(--text-muted);">${totalM2.toLocaleString()} m\xB2 rentables totales</div>
        </div>
      </div>
      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px;">
        <div style="width:48px; height:48px; background:rgba(30,61,89,0.08); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; color:var(--navy); flex-shrink:0;">$</div>
        <div>
          <div style="font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); margin-bottom:4px;">Ingreso Mensual Pool</div>
          <div style="font-size:22px; font-weight:700; color:var(--navy);">${M(ingresoMensualTotal)}</div>
          <div style="font-size:11px; color:var(--text-muted);">${v.incluyeEstacionamiento !== false ? "Rentas + estacionamiento" : "Rentas"}</div>
        </div>
      </div>
    </div>

    <!-- Resumen Financiero Maestro -->
    <div class="card" style="padding:0; overflow:hidden; margin-bottom:20px; border:2px solid var(--navy); box-shadow:0 8px 32px rgba(30,41,59,0.15);">
      <div style="background:var(--navy); padding:18px 28px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:16px; font-weight:700; color:#C5A059; letter-spacing:1px;">RESUMEN FINANCIERO DEL PROYECTO</div>
          <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px;">Destino completo del capital captado \xB7 Incluye costo de obra</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:rgba(255,255,255,0.5); margin-bottom:2px;">Remanente Final</div>
          <div style="font-size:28px; font-weight:700; color:${remanente >= 0 ? "#2ecc71" : "#E8A090"}; line-height:1;">${remanente >= 0 ? "+" : ""}${M(remanente)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">

        <!-- Columna izquierda: fases de levantamiento -->
        <div style="border-right:1px solid #eee;">
          <div style="padding:12px 20px; background:#f9fbfd; border-bottom:1px solid #eee;">
            <span style="font-size:11px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:1px;">Fases de Levantamiento</span>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:12px;">
            <thead>
              <tr style="border-bottom:1px solid #eee; color:var(--text-muted);">
                <th style="padding:7px 16px; text-align:left; font-weight:500;">Fase</th>
                <th style="padding:7px 8px; text-align:center; font-weight:500;">Tickets</th>
                <th style="padding:7px 16px; text-align:right; font-weight:500;">Precio</th>
                <th style="padding:7px 16px; text-align:right; font-weight:500;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${state.tickets.map((t) => {
        const sub = (Number(t.cantidad) || 0) * (Number(t.precio) || 0);
        return `<tr style="border-bottom:1px solid #f5f5f5;">
                  <td style="padding:8px 16px; color:var(--navy); font-weight:500;">${escapeHTML(t.nombre)}</td>
                  <td style="padding:8px 8px; text-align:center; color:var(--text-muted);">${t.cantidad}</td>
                  <td style="padding:8px 16px; text-align:right; color:var(--text-muted);">${M(t.precio)}</td>
                  <td style="padding:8px 16px; text-align:right; font-weight:600; color:var(--navy);">${M(sub)}</td>
                </tr>`;
      }).join("")}
            </tbody>
            <tfoot>
              <tr style="background:#f9fbfd; border-top:2px solid #eee;">
                <td colspan="3" style="padding:11px 16px; font-weight:700; color:var(--navy);">Total Captado</td>
                <td style="padding:11px 16px; text-align:right; font-weight:700; color:#2ecc71; font-size:14px;">${M(entradas)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Columna derecha: destino del capital -->
        <div>
          <div style="padding:12px 20px; background:#f9fbfd; border-bottom:1px solid #eee;">
            <span style="font-size:11px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:1px;">Destino del Capital</span>
          </div>
          <div style="padding:8px 24px;">
            ${[
        { label: "Entradas Brutas", val: entradas, color: "#2ecc71", icon: "+", bold: false },
        ...terrenoValor > 0 ? [{ label: v.aportaTerreno ? "Terreno (Aportaci\xF3n)" : "Compra de Terreno", val: -terrenoValor, color: "#E8A090", icon: "\u2013", bold: false }] : [],
        { label: `N\xF3mina y Operativos (${meses} meses)`, val: -egresosFijos, color: "#E8A090", icon: "\u2013", bold: false },
        { label: "Comisiones de Venta", val: -comision, color: "#E8A090", icon: "\u2013", bold: false },
        { label: "Acoplamiento Preoperativo", val: -acop, color: "#E8A090", icon: "\u2013", bold: false },
        { label: "Capital Neto para Obra", val: capitalNeto, color: "var(--navy)", icon: "=", bold: true, sep: true },
        { label: "Costo de Obra Civil", val: -costoObra, color: "#E8A090", icon: "\u2013", bold: false },
        { label: "Remanente Final del Proyecto", val: remanente, color: remanente >= 0 ? "#2ecc71" : "#E8A090", icon: "=", bold: true, final: true }
      ].map((row, i, arr) => `
              <div style="display:flex; justify-content:space-between; align-items:center;
                padding:${row.final ? "14px 0 10px" : "9px 0"};
                ${row.final ? "border-top:3px solid var(--navy); margin-top:6px;" : row.sep ? "border-top:2px solid #eee; border-bottom:2px solid #eee; margin:4px 0; padding:10px 0;" : "border-bottom:1px solid #f5f5f5;"}">
                <span style="font-size:${row.final ? "13px" : "12px"}; color:${row.final ? "var(--navy)" : "var(--text-muted)"}; font-weight:${row.bold ? "700" : "400"};">
                  <span style="font-size:${row.final ? "16px" : "14px"}; font-weight:700; color:${row.color}; margin-right:8px; font-family:monospace;">${row.icon}</span>${row.label}
                </span>
                <span style="font-size:${row.final ? "18px" : "13px"}; font-weight:${row.bold ? "700" : "600"}; color:${row.color};">${M(Math.abs(row.val))}</span>
              </div>`).join("")}
          </div>
        </div>

      </div>
    </div>

    <!-- Gr\xE1ficos Interactivos -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
      <div class="card animate-scale" style="padding:24px; height:350px;">
        <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Distribuci\xF3n de Inventario (Tickets)</div>
        <div style="flex:1; position:relative; min-height:0;">
          <canvas id="chart-inventario"></canvas>
        </div>
      </div>
      <div class="card animate-scale" style="padding:24px; height:350px;">
        <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Ingresos Operativos por Fuente</div>
        <div style="flex:1; position:relative; min-height:0;">
          <canvas id="chart-ingresos"></canvas>
        </div>
      </div>
    </div>

    <div class="card animate-scale" style="padding:24px; height:350px; margin-bottom:20px;">
      <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Proyecci\xF3n de Flujo de Caja Bruto (A\xF1os 1-${state.variables.aniosProyeccion || 10})</div>
      <div style="flex:1; position:relative; min-height:0;">
        <canvas id="chart-proyeccion-10"></canvas>
      </div>
    </div>

    <!-- Ingreso operativo por fuente -->
    <div class="card" style="padding:24px;">
      <div style="font-size:13px; font-weight:600; color:var(--navy); margin-bottom:16px;">Desglose de Ingreso Operativo Mensual</div>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
        ${[
        { label: "Comercial PB", m2: m2Comercial, renta: Number(v.rentaM2Comercial) || 0, color: "#C5A059" },
        { label: "Hotel Nivel 1", m2: m2Hotel1, renta: Number(v.rentaM2HotelNivel1) || 0, color: "#8B4513" },
        { label: "Hotel Nivel 2", m2: m2Hotel2, renta: Number(v.rentaM2HotelNivel2) || 0, color: "#8e24aa" },
        { label: "Estacionamiento", m2: 0, renta: 0, ingreso: estacMensual, color: "#2ecc71" }
      ].map((src) => {
        const ing = src.ingreso !== void 0 ? src.ingreso : src.m2 * src.renta;
        return `<div style="background:#f9fbfd; border-radius:6px; padding:14px; border-left:3px solid ${src.color};">
            <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">${src.label}</div>
            <div style="font-size:18px; font-weight:700; color:var(--navy);">${M(ing)}</div>
            ${src.m2 > 0 ? `<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">${src.m2.toLocaleString()} m\xB2 \xD7 ${M(src.renta)}/m\xB2</div>` : `<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Concesi\xF3n operativa diaria</div>`}
          </div>`;
      }).join("")}
      </div>
      <div style="margin-top:12px; display:flex; justify-content:flex-end; align-items:center; gap:16px;">
        <span style="font-size:12px; color:var(--text-muted);">Total mensual:</span>
        <span style="font-size:20px; font-weight:700; color:var(--navy);">${M(ingresoMensualTotal)}</span>
        <span style="font-size:12px; color:var(--text-muted);">\u2192 Anual:</span>
        <span style="font-size:20px; font-weight:700; color:#2ecc71;">${M(ingresoAnualTotal)}</span>
      </div>
    </div>

    <!-- Plusval\xEDa Especulativa por Fase -->
    ${(() => {
        const precioMercado = Number(v.precioMercadoActualM2) || 48500;
        const valorFraccion = m2PorTicket * precioMercado;
        return `<div class="card" style="padding:24px; margin-top:20px; border-top:3px solid #2ecc71;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:13px; font-weight:600; color:var(--navy);">Proyecci\xF3n de Plusval\xEDa Especulativa por Fase</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
              Equivalencia f\xEDsica: <strong>${m2PorTicket.toFixed(2)} m\xB2/ticket</strong> \xD7
              <strong>${M(precioMercado)}/m\xB2</strong> = Valor comercial estimado <strong style="color:#2ecc71;">${M(valorFraccion)}</strong>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:11px; color:var(--text-muted);">Precio/m\xB2 mercado actual:</span>
            <input type="text" class="form-input" style="width:110px; border:1px solid #2ecc71; padding:5px 8px; border-radius:4px; font-size:14px; font-weight:700; color:#2ecc71; text-align:center;"
              value="${M(v.precioMercadoActualM2)}" data-key="precioMercadoActualM2" data-nested="variables">
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px;">
          ${state.tickets.map((t) => {
          const plusMon = valorFraccion - Number(t.precio);
          const plusPct = Number(t.precio) > 0 ? (valorFraccion / Number(t.precio) - 1) * 100 : 0;
          const pos = plusMon > 0;
          return `<div style="background:#f9fbfd; border-radius:8px; padding:14px; text-align:center; border-bottom:3px solid ${pos ? "#2ecc71" : "#E8A090"}; ${t.esAportado ? "opacity:0.75;" : ""}">
              <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px; line-height:1.3;">${escapeHTML(t.nombre)}</div>
              <div style="font-size:12px; font-weight:600; color:var(--navy); margin-bottom:8px;">${M(t.precio)}</div>
              <div style="font-size:22px; font-weight:700; color:${pos ? "#2ecc71" : "#E8A090"}; line-height:1;">${pos ? "+" : ""}${plusPct.toFixed(1)}%</div>
              <div style="font-size:11px; color:${pos ? "#2ecc71" : "#E8A090"}; margin-top:4px;">${pos ? "+" : ""}${M(plusMon)}</div>
            </div>`;
        }).join("")}
        </div>
      </div>`;
      })()}
`;
    }
    function renderParametros() {
      const v = state.variables;
      const activeTab = v.activeParamTab || "generales";
      const aniosVal = Number(v.aniosProyeccion) || 10;
      const inflVal = Number(v.inflacionAnualRentas) || 5;
      const adminVal = Number(v.costoAdminRentasPct) || 8.9;
      const tabStyle = (tab) => activeTab === tab ? "padding:12px 24px; font-weight:600; color:var(--navy); border-bottom:2px solid var(--navy); cursor:pointer; background:rgba(30, 61, 89, 0.05); white-space:nowrap;" : "padding:12px 24px; font-weight:500; color:var(--text-muted); border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap;";
      let html = `<div class="section-header">
      <div>
        <div class="section-title">Par\xE1metros Base</div>
        <div class="section-sub">Configuraci\xF3n inicial del desarrollo inmobiliario</div>
      </div>
    </div>
    <div class="card" style="padding:0; overflow:hidden;">
      <div style="display:flex; border-bottom:1px solid #eee; background:#f9fbfd; font-size:13px; overflow-x:auto;">
        <div style="${tabStyle("generales")}" onclick="App.switchParamTab('generales')">Datos Generales</div>
        <div style="${tabStyle("rentas")}" onclick="App.switchParamTab('rentas')">Distribuci\xF3n Rentable y Tarifas</div>
        <div style="${tabStyle("estacionamiento")}" onclick="App.switchParamTab('estacionamiento')">Estacionamiento</div>
        <div style="${tabStyle("fiduciaria")}" onclick="App.switchParamTab('fiduciaria')">Estructura Fiduciaria</div>
      </div>
      <div style="padding:24px;">`;
      if (activeTab === "generales") {
        const e = state.egresos;
        const comisionPct = Number(e.comisionVentasPct) || 0;
        const pctComision = comisionPct / 30 * 100;
        const totalVendidos = state.tickets.filter((t) => !t.esAportado).reduce((s, t) => s + Number(t.cantidad) * Number(t.precio), 0);
        const comisionMonto = totalVendidos * (comisionPct / 100);
        html += `
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Datos Generales</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Nombre del Proyecto</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${v.proyecto}" data-key="proyecto" data-nested="variables" data-is-text="true">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Capital Requerido Target</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.capitalRequerido)}" data-key="capitalRequerido" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Total Tickets Emitidos (Max)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${v.numTicketsMax}" data-key="numTicketsMax" data-nested="variables">
        </div>
      </div>

      <div style="margin-top:28px; padding:20px; background:#f9fbfd; border-radius:8px; border:1px solid #e1e8ed;">
        <h3 style="font-size:13px; color:var(--navy); margin-bottom:16px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">
          Comisi\xF3n de Ventas de Tickets
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:center;">
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>% Comisi\xF3n sobre Tickets Vendidos</span>
              <span id="val-comisionVentasPct" style="font-weight:600; color:var(--navy);">${comisionPct}%</span>
            </label>
            <div class="range-container">
              <input type="range" class="form-input" min="0" max="30" step="0.5" style="width:100%;"
                value="${comisionPct}" data-key="comisionVentasPct" data-nested="egresos">
              <output class="range-bubble" id="bubble-comisionVentasPct" style="left:calc(${pctComision}% + ${12 - pctComision * 0.24}px)">${comisionPct}%</output>
            </div>
            <p style="font-size:11px; color:var(--text-muted); margin-top:8px; line-height:1.5;">
              Aplica <strong>solo sobre tickets marcados como Venta</strong> en la Estrategia de Tickets. No incluye tickets de Aportaci\xF3n ni del Modelo.
            </p>
          </div>
          <div style="background:white; border:1px solid #e1e8ed; border-radius:6px; padding:16px;">
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:8px; color:var(--text-muted);">
              <span>Base de C\xE1lculo (tickets vendidos):</span>
              <strong style="color:var(--navy);">${M(totalVendidos)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:8px; color:var(--text-muted);">
              <span>Porcentaje aplicado:</span>
              <strong style="color:var(--navy);">${comisionPct}%</strong>
            </div>
            <div style="border-top:1px solid #eee; padding-top:8px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Comisi\xF3n Total Estimada:</span>
              <span style="font-size:18px; font-weight:700; color:#C5A059;">${M(comisionMonto)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:28px; padding:20px; background:#f9fbfd; border-radius:8px; border:1px solid #e1e8ed;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:${v.aportaTerreno ? "20px" : "0"};">
          <div>
            <h3 style="font-size:13px; color:var(--navy); margin:0; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Aportaci\xF3n de Terreno</h3>
            <p style="font-size:11px; color:var(--text-muted); margin:4px 0 0;">Cuando el terreno se aporta, su valor se convierte en tickets fijos que no requieren levantamiento de capital.</p>
          </div>
          <button onclick="App.toggleAportaTerreno()"
            style="padding:8px 20px; border-radius:20px; border:2px solid ${v.aportaTerreno ? "#C5A059" : "#cbd5e1"}; background:${v.aportaTerreno ? "rgba(197,160,89,0.1)" : "white"}; color:${v.aportaTerreno ? "#C5A059" : "var(--text-muted)"}; font-weight:700; font-size:13px; cursor:pointer; white-space:nowrap;">
            ${v.aportaTerreno ? "\u{1F512} Aportado \u2014 ON" : "OFF"}
          </button>
        </div>
        ${v.aportaTerreno ? `
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; align-items:end;">
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Valor del Terreno Aportado</label>
            <input type="text" class="form-input" style="width:100%; border:1px solid #C5A059; padding:8px; border-radius:4px; font-size:15px; font-weight:600; color:var(--navy);"
              value="${M(v.valorTerrenoAportado)}" data-key="valorTerrenoAportado" data-nested="variables">
          </div>
          <div>
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Precio por Ticket de Aportaci\xF3n</label>
            <input type="text" class="form-input" style="width:100%; border:1px solid #C5A059; padding:8px; border-radius:4px; font-size:15px; font-weight:600; color:var(--navy);"
              value="${M(v.precioTicketTerreno)}" data-key="precioTicketTerreno" data-nested="variables">
          </div>
          <div style="padding:10px 14px; background:rgba(197,160,89,0.08); border-radius:6px; border:1px dashed #C5A059; text-align:center;">
            <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Tickets de Terreno</div>
            <div style="font-size:22px; font-weight:700; color:#C5A059;">${Math.floor((Number(v.valorTerrenoAportado) || 36e6) / (Number(v.precioTicketTerreno) || 36e4))}</div>
            <div style="font-size:10px; color:var(--text-muted);">tickets fijos (Capital Tierra)</div>
          </div>
        </div>` : ""}
      </div>`;
      } else if (activeTab === "rentas") {
        const pctAnios = (aniosVal - 1) / 19 * 100;
        const pctInfl = inflVal / 20 * 100;
        const pctAdmin = adminVal / 30 * 100;
        html += `
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Distribuci\xF3n Rentable y Tarifas Base</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Comercial (Planta Baja)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${v.m2ComercialPB}" data-key="m2ComercialPB" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Comercial)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.rentaM2Comercial)}" data-key="rentaM2Comercial" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Hotel (Nivel 1)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${v.m2HotelNivel1}" data-key="m2HotelNivel1" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Nivel 1)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.rentaM2HotelNivel1)}" data-key="rentaM2HotelNivel1" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">M\xB2 Hotel (Nivel 2)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${v.m2HotelNivel2}" data-key="m2HotelNivel2" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta Mensual por M\xB2 (Nivel 2)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.rentaM2HotelNivel2)}" data-key="rentaM2HotelNivel2" data-nested="variables">
        </div>
      </div>
      <h3 style="font-size:14px; color:var(--navy); margin-top:32px; margin-bottom:16px; font-weight:500">Variables de Proyecci\xF3n Financiera</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>A\xF1os de Proyecci\xF3n</span>
            <span id="val-aniosProyeccion" style="font-weight:600; color:var(--navy);">${aniosVal} A\xF1os</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="1" max="20" step="1" style="width:100%;"
              value="${aniosVal}" data-key="aniosProyeccion" data-nested="variables">
            <output class="range-bubble" id="bubble-aniosProyeccion" style="left:calc(${pctAnios}% + ${12 - pctAnios * 0.24}px)">${aniosVal} A\xF1os</output>
          </div>
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Inflaci\xF3n Anual Estimada</span>
            <span id="val-inflacionAnualRentas" style="font-weight:600; color:var(--navy);">${inflVal}%</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="0" max="20" step="0.1" style="width:100%;"
              value="${inflVal}" data-key="inflacionAnualRentas" data-nested="variables">
            <output class="range-bubble" id="bubble-inflacionAnualRentas" style="left:calc(${pctInfl}% + ${12 - pctInfl * 0.24}px)">${inflVal}%</output>
          </div>
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Costo Admin. de Rentas</span>
            <span id="val-costoAdminRentasPct" style="font-weight:600; color:var(--navy);">${adminVal}%</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="0" max="30" step="0.1" style="width:100%;"
              value="${adminVal}" data-key="costoAdminRentasPct" data-nested="variables">
            <output class="range-bubble" id="bubble-costoAdminRentasPct" style="left:calc(${pctAdmin}% + ${12 - pctAdmin * 0.24}px)">${adminVal}%</output>
          </div>
        </div>
      </div>`;
      } else if (activeTab === "estacionamiento") {
        const coches = Number(v.cochesDiarios) || 350;
        const precio = Number(v.precioPorCoche) || 50;
        const capacidad = Number(v.capacidadEstacionamiento) || 270;
        const incluyeEstac = v.incluyeEstacionamiento !== false;
        html += `
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Par\xE1metros de Estacionamiento Operativo (Concesi\xF3n)</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:${incluyeEstac ? "20px" : "0"};">
        <span style="font-size:12px; color:var(--text-muted);">\xBFEste proyecto incluye ingresos por estacionamiento?</span>
        <button onclick="App.toggleIncluyeEstacionamiento()"
          style="padding:8px 20px; border-radius:20px; border:2px solid ${incluyeEstac ? "#C5A059" : "#cbd5e1"}; background:${incluyeEstac ? "rgba(197,160,89,0.1)" : "white"}; color:${incluyeEstac ? "#C5A059" : "var(--text-muted)"}; font-weight:700; font-size:13px; cursor:pointer; white-space:nowrap;">
          ${incluyeEstac ? "\u2713 Incluye estacionamiento" : "No incluye estacionamiento"}
        </button>
      </div>
      ${incluyeEstac ? `
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Capacidad Total de Coches (Cajones)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${capacidad}" data-key="capacidadEstacionamiento" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Cantidad Estimada Diaria (Rotaci\xF3n)</label>
          <input type="number" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${coches}" data-key="cochesDiarios" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Ticket Promedio por Boleto (MXN)</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(precio)}" data-key="precioPorCoche" data-nested="variables">
        </div>
      </div>
      <div style="margin-top:16px; padding:14px 20px; background:#f9fbfd; border-radius:6px; display:inline-flex; align-items:center; gap:12px; border:1px dashed #C5A059;">
        <span style="font-size:12px; color:var(--navy); font-weight:600;">Ingreso Bruto Mensual Estimado:</span>
        <span style="font-size:16px; color:#2ecc71; font-weight:700;">${M(coches * precio * 30)}</span>
        <span style="font-size:11px; color:var(--text-muted);">(${coches} coches \xD7 ${M(precio)} \xD7 30 d\xEDas)</span>
      </div>` : `
      <div style="margin-top:16px; padding:14px 20px; background:#f9fbfd; border-radius:6px; border:1px dashed #cbd5e1; color:var(--text-muted); font-size:13px;">
        El ingreso por estacionamiento est\xE1 excluido del modelo. Todos los c\xE1lculos usan $0 para este concepto.
      </div>`}`;
      } else if (activeTab === "fiduciaria") {
        html += `
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Estructura Fiduciaria</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Valor M\xEDnimo del Fideicomiso</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.valorFideicomiso)}" data-key="valorFideicomiso" data-nested="variables">
        </div>
        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Costo Mensual Fideicomiso</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
            value="${M(v.costoFideicomisoMensual)}" data-key="costoFideicomisoMensual" data-nested="variables">
        </div>
      </div>`;
      }
      html += `</div></div>`;
      return html;
    }
    function renderTickets() {
      const totalTicketsConfigured = state.tickets.reduce((sum, t) => sum + (Number(t.cantidad) || 0), 0);
      const maxTickets = state.variables.numTicketsMax;
      const pctModelo = state.variables.pctTicketsModelo || 0;
      const ticketsModelo = Math.floor(maxTickets * (pctModelo / 100));
      const saleableTickets = maxTickets - ticketsModelo;
      const remaining = saleableTickets - totalTicketsConfigured;
      let html = `<div class="section-header">
      <div>
        <div class="section-title">Estrategia de Tickets (Venta vs Asignaci\xF3n)</div>
        <div class="section-sub">Configuraci\xF3n de Venta Limitada a ${saleableTickets} tickets (excluyendo asignaci\xF3n del modelo)</div>
      </div>
      <div style="text-align:right;">
        <span style="display:block; font-size:12px; font-weight:600; color: ${remaining < 0 ? "#E8A090" : "var(--navy)"};">
          Tickets Emitidos Totales (Venta + Modelo): ${totalTicketsConfigured + ticketsModelo} / ${maxTickets}
        </span>
        <span style="font-size:10px; color:var(--text-muted); margin-top:4px; display:block;">(${ticketsModelo} modelo + ${totalTicketsConfigured} venta configurada) | Restan ${remaining} para emitir</span>
      </div>
    </div>
    
    <div class="card" style="padding:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="font-size:14px; color:var(--navy); font-weight:500;">Fases de Levantamiento</h3>
        <button onclick="App.addTicketTier()" style="background:var(--navy); color:white; border:none; padding:6px 12px; border-radius:4px; font-size:11px; cursor:pointer;">+ Agregar Fase</button>
      </div>
      
      <table style="width:100%; text-align:left; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:1px solid #eee; color:var(--text-muted);">
            <th style="padding:8px 4px; font-weight:500;">Fase</th>
            <th style="padding:8px 4px; font-weight:500; text-align:center;">Tickets</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Precio Ticket</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Valor m\xB2 (Compra)</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Valor Comercial (QRO)</th>
            <th style="padding:8px 12px; font-weight:500; text-align:right;">Margen Plusval\xEDa</th>
            <th style="padding:8px 12px; font-weight:500; text-align:right;">Cap Rate</th>
            <th style="padding:8px 4px; font-weight:500; text-align:right;">Subtotal</th>
            <th style="padding:8px 4px;"></th>
          </tr>
        </thead>
        <tbody>`;
      let totalEstimado = 0;
      const m2ComercialPB = Number(state.variables.m2ComercialPB) || 0;
      const rentaM2Comercial = Number(state.variables.rentaM2Comercial) || 0;
      const m2HotelNivel1 = Number(state.variables.m2HotelNivel1) || 0;
      const rentaM2HotelNivel1 = Number(state.variables.rentaM2HotelNivel1) || 0;
      const m2HotelNivel2 = Number(state.variables.m2HotelNivel2) || 0;
      const rentaM2HotelNivel2 = Number(state.variables.rentaM2HotelNivel2) || 0;
      const totalSuperficie = m2ComercialPB + m2HotelNivel1 + m2HotelNivel2;
      const ingresoRentasMensual = m2ComercialPB * rentaM2Comercial + m2HotelNivel1 * rentaM2HotelNivel1 + m2HotelNivel2 * rentaM2HotelNivel2;
      const totalDiasBasico = (Number(state.variables.cochesDiarios) || 350) * (Number(state.variables.precioPorCoche) || 50) * 30;
      const ingresoMensual = ingresoRentasMensual + totalDiasBasico;
      const ingresoAnualTotal = ingresoMensual * 12;
      const _totalTktsRT = Number(state.variables.numTicketsMax) || 1;
      const m2PorTicket = _totalTktsRT > 0 ? totalSuperficie / _totalTktsRT : 0;
      const rentaAnualPorTicket = _totalTktsRT > 0 ? ingresoAnualTotal / _totalTktsRT : 0;
      const phaseDescriptions = {
        "Fase Semilla": "Fase Semilla (Founders & partners): Suena a capital de riesgo exclusivo para el c\xEDrculo interno.",
        "Preventa Privada": "Preventa Privada (Pre-desarrollo): Mantiene la exclusividad antes de salir al p\xFAblico general, ligada a la etapa de licencias.",
        "Oferta Primaria": "Oferta Primaria (Arranque de obra): T\xE9rmino burs\xE1til/institucional que marca el inicio p\xFAblico cuando se mueve la tierra.",
        "Oferta Secundaria": "Oferta Secundaria (Consolidaci\xF3n estructural): Denota que el activo ya est\xE1 tomando forma f\xEDsica (bajo riesgo) y se abre una nueva ventana de inversi\xF3n.",
        "Cierre de Emisi\xF3n": "Cierre de Emisi\xF3n (Pre-apertura comercial): Genera sentido de urgencia m\xE1xima; es la \xFAltima oportunidad de entrar antes de que el negocio empiece a operar y generar flujo.",
        "Capital Tierra": "Capital Tierra (Aportaci\xF3n patrimonial): Le da un trato de socio estrat\xE9gico al aportante del terreno, separ\xE1ndolo del inversionista l\xEDquido."
      };
      html += `
        <tr style="border-bottom:1px solid #f5f5f5; background:#fbfcfe;">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:var(--text-muted); width:16px; min-width:16px; text-align:right;">-</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid #ddd; padding:6px; border-radius:4px; color:#C5A059; font-weight:600; background:#f9fbfd;" 
                  value="Participaci\xF3n del Modelo" disabled>
                <div onclick="this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none'" style="width:22px; height:22px; border-radius:50%; background:rgba(197, 160, 89, 0.15); border:1px solid rgba(197, 160, 89, 0.3); color:#C5A059; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="Ver descripci\xF3n">?</div>
              </div>
              <div style="font-size:10.5px; color:var(--text-muted); line-height:1.4; padding:4px 8px 0 24px; display:none;">
                Tickets asignados/retenidos que participan en rendimientos operativos pero no integran capital inicial.
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:center; color:#C5A059; font-weight:600; background:#f9fbfd;" 
              value="${ticketsModelo}" disabled title="N\xFAmero definido en Presupuesto de Egresos">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">No Aplica (Venta $0)</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">-</td>
          <td style="padding:8px 4px; font-weight:600; color:var(--text-muted); text-align:right;">-</td>
          <td style="padding:8px 4px; text-align:right;"></td>
        </tr>`;
      const vars = state.variables;
      state.tickets.forEach((t, i) => {
        const esFilaTerreno = vars.aportaTerreno && t.esTerrenoFijo;
        const esFilaAportadaLocked = !esFilaTerreno && vars.aportaTerreno && t.esAportado;
        const cantidadTerreno = esFilaTerreno ? Math.floor((Number(vars.valorTerrenoAportado) || 36e6) / (Number(vars.precioTicketTerreno) || 36e4)) : 0;
        const precioTerreno = esFilaTerreno ? Number(vars.precioTicketTerreno) || 36e4 : 0;
        const cantidad = esFilaTerreno ? cantidadTerreno : Number(t.cantidad) || 0;
        const precio = esFilaTerreno ? precioTerreno : Number(t.precio) || 0;
        const subtotal = cantidad * precio;
        totalEstimado += subtotal;
        const valorM2 = precio > 0 && m2PorTicket > 0 ? precio / m2PorTicket : 0;
        const valorMercado = Number(state.variables.precioMercadoActualM2) || 48500;
        const plusvaliaPct = valorM2 > 0 && valorMercado > valorM2 ? (valorMercado - valorM2) / valorM2 * 100 : 0;
        const capRate = precio > 0 ? rentaAnualPorTicket / precio * 100 : 0;
        const tooltipText = phaseDescriptions[t.nombre] || "Defina la estrategia para esta clase de ticket.";
        if (esFilaTerreno) {
          html += `
        <tr style="border-bottom:1px solid #f5f5f5; background:rgba(197,160,89,0.06);">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:#C5A059; width:16px; min-width:16px; text-align:right;">\u{1F512}</span>
                <input type="text" class="form-input" style="width:100%; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
                  value="${t.nombre}${t.esAportado ? " (Aportado)" : " (Venta)"}" disabled>
                <span style="font-size:10px; padding:2px 8px; border-radius:3px; border:1px solid #C5A059; color:#C5A059; font-weight:700; white-space:nowrap;">FIJO</span>
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${i})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; ${t.esAportado ? "background:rgba(197,160,89,0.15); color:#C5A059;" : "background:rgba(30,41,59,0.08); color:var(--navy);"}"
                  title="Cambiar entre Venta y Aportaci\xF3n">
                  ${t.esAportado ? "\u{1F3DB} Aportaci\xF3n" : "\u{1F4B0} Venta"}
                </button>
                ${t.esAportado ? '<span style="font-size:10px; color:var(--text-muted); margin-left:6px;">Sin comisi\xF3n</span>' : ""}
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input" style="width:60px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:center; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:700;"
              value="${cantidadTerreno}" disabled>
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input" style="width:100px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:right; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
              value="${M(precioTerreno)}" disabled>
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">${valorM2 > 0 ? M(valorM2) : "-"}</td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">${M(valorMercado)}</td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${plusvaliaPct > 30 ? "#C5A059" : "var(--navy)"};">${plusvaliaPct > 0 ? "+" + plusvaliaPct.toFixed(1) + "%" : "-"}</td>
          <td style="padding:8px 12px; text-align:right; color:var(--text-muted);">-</td>
          <td style="padding:8px 4px; font-weight:700; color:#C5A059; text-align:right;">${M(subtotal)}</td>
          <td style="padding:8px 4px;"></td>
        </tr>`;
          return;
        }
        if (esFilaAportadaLocked) {
          const cantidad2 = Number(t.cantidad) || 0;
          const precio2 = Number(t.precio) || 0;
          const subtotal2 = cantidad2 * precio2;
          const valorM2b = precio2 > 0 && m2PorTicket > 0 ? precio2 / m2PorTicket : 0;
          const plusvaliaPctb = valorM2b > 0 && valorMercado > valorM2b ? (valorMercado - valorM2b) / valorM2b * 100 : 0;
          html += `
        <tr style="border-bottom:1px solid #f5f5f5; background:rgba(197,160,89,0.06);">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:#C5A059; width:16px; min-width:16px; text-align:right;">\u{1F512}</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
                  value="${t.nombre}" data-index="${i}" data-field="nombre" data-is-text="true">
                <span style="font-size:10px; padding:2px 8px; border-radius:3px; border:1px solid #C5A059; color:#C5A059; font-weight:700; white-space:nowrap;">FIJO</span>
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${i})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; background:rgba(197,160,89,0.15); color:#C5A059;"
                  title="Quitar FIJO \u2014 convertir en fase normal">
                  \u{1F3DB} Aportaci\xF3n \u2014 quitar FIJO
                </button>
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:center; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:700;"
              value="${cantidad2}" data-index="${i}" data-field="cantidad">
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input ticket-input" style="width:100px; border:1px solid rgba(197,160,89,0.4); padding:6px; border-radius:4px; text-align:right; background:rgba(197,160,89,0.05); color:#C5A059; font-weight:600;"
              value="${M(precio2)}" data-index="${i}" data-field="precio">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">${valorM2b > 0 ? M(valorM2b) : "-"}</td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">${M(valorMercado)}</td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${plusvaliaPctb > 30 ? "#C5A059" : "var(--navy)"};">${plusvaliaPctb > 0 ? "+" + plusvaliaPctb.toFixed(1) + "%" : "-"}</td>
          <td style="padding:8px 12px; text-align:right; color:var(--text-muted);">-</td>
          <td style="padding:8px 4px; font-weight:700; color:#C5A059; text-align:right;">${M(subtotal2)}</td>
          <td style="padding:8px 4px;">
            <button onclick="App.removeTicketTier(${i})" style="color:#E8A090; background:none; border:none; cursor:pointer;" title="Eliminar fase">\u2715</button>
          </td>
        </tr>`;
          return;
        }
        html += `
        <tr style="border-bottom:1px solid #f5f5f5;">
          <td style="padding:8px 4px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:600; color:var(--navy); width:16px; min-width:16px; text-align:right;">${i + 1}.</span>
                <input type="text" class="form-input ticket-input" style="width:100%; border:1px solid #ddd; padding:6px; border-radius:4px;"
                  value="${t.nombre}" data-index="${i}" data-field="nombre" data-is-text="true">
                <div onclick="this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none'" style="width:22px; height:22px; border-radius:50%; background:rgba(197, 160, 89, 0.15); border:1px solid rgba(197, 160, 89, 0.3); color:#C5A059; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; cursor:pointer;" title="Ver/Ocultar descripci\xF3n">?</div>
              </div>
              <div style="font-size:10.5px; color:var(--text-muted); line-height:1.4; padding:4px 8px 0 24px; display:none;">
                ${tooltipText}
              </div>
              <div style="padding:3px 0 0 24px;">
                <button onclick="App.toggleTicketAportado(${i})"
                  style="font-size:10px; padding:2px 8px; border-radius:3px; border:none; cursor:pointer; font-weight:600; ${t.esAportado ? "background:rgba(197,160,89,0.15); color:#C5A059;" : "background:rgba(30,41,59,0.08); color:var(--navy);"}"
                  title="Haz clic para cambiar entre Venta y Aportaci\xF3n">
                  ${t.esAportado ? "\u{1F3DB} Aportaci\xF3n" : "\u{1F4B0} Venta"}
                </button>
                ${t.esAportado ? '<span style="font-size:10px; color:var(--text-muted); margin-left:6px;">Sin comisi\xF3n</span>' : ""}
              </div>
            </div>
          </td>
          <td style="padding:8px 4px; text-align:center;">
            <input type="number" class="form-input ticket-input" style="width:60px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:center;"
              value="${cantidad}" data-index="${i}" data-field="cantidad">
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <input type="text" class="form-input ticket-input" style="width:100px; border:1px solid #ddd; padding:6px; border-radius:4px; text-align:right;" 
              value="${M(precio)}" data-index="${i}" data-field="precio">
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--text-muted); font-size:12px;">
            ${M(valorM2)}
          </td>
          <td style="padding:8px 4px; text-align:right; color:var(--navy); font-size:12px; font-weight:600;">
            ${M(valorMercado)}
          </td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${plusvaliaPct > 30 ? "#C5A059" : "var(--navy)"};">
            ${plusvaliaPct > 0 ? "+" + plusvaliaPct.toFixed(1) + "%" : "-"}
          </td>
          <td style="padding:8px 12px; text-align:right; font-weight:600; color:${capRate > 12 ? "#2ecc71" : "var(--navy)"};">
            ${capRate > 0 ? capRate.toFixed(2) + "%" : "-"}
          </td>
          <td style="padding:8px 4px; font-weight:600; color:var(--navy); text-align:right;">
            ${M(subtotal)}
          </td>
          <td style="padding:8px 4px; text-align:right;">
            <button onclick="App.removeTicketTier(${i})" style="color:#E8A090; background:none; border:none; cursor:pointer;" title="Eliminar fase">\u2715</button>
          </td>
        </tr>`;
      });
      html += `
        </tbody>
        <tfoot>
          <tr style="background:#f4f7fa; border-top:2px solid #e1e8ed;">
            <td style="text-align:right; padding:12px 8px; font-weight:600; color:var(--navy);">Suma de Tickets (Venta + Modelo):</td>
            <td style="padding:12px 4px; font-weight:700; font-size:14px; text-align:center; color:${totalTicketsConfigured + ticketsModelo !== maxTickets ? "#E8A090" : "#2ecc71"};">
              ${totalTicketsConfigured + ticketsModelo} / ${maxTickets}
            </td>
            <td colspan="5" style="text-align:right; padding:12px 8px; font-weight:500; color:var(--text-muted)">Levantamiento Bruto Proyectado:</td>
            <td style="padding:12px 4px; font-weight:600; font-size:15px; color:#C5A059; text-align:right;">${M(totalEstimado)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      
      <div style="margin-top:20px; padding:16px; background:#f9fbfd; border-radius:6px; border:1px solid #e1e8ed;">
        <h4 style="font-size:12px; font-weight:600; color:var(--navy); margin-bottom:8px; text-transform:uppercase;">Par\xE1metros de Rentabilidad</h4>
        <div style="display:flex; gap:24px; font-size:12px; color:var(--text-muted);">
          <div><span style="font-weight:600; color:var(--navy);">Metros por Ticket:</span> ${m2PorTicket.toFixed(1)} m\xB2</div>
          <div><span style="font-weight:600; color:var(--navy);">Ingreso Anual Proyecto:</span> ${M(ingresoAnualTotal)}</div>
          <div><span style="font-weight:600; color:var(--navy);">Renta Anual/Ticket:</span> ${M(rentaAnualPorTicket)}</div>
          <div style="margin-left:auto; color:#C5A059;"><span style="font-weight:600;">Asignados a Desarrollo:</span> ${ticketsModelo} tickets (${pctModelo}%)</div>
        </div>
      </div>
    </div>`;
      return html;
    }
    function renderEgresos() {
      const e = state.egresos;
      const fijoMensual = (e.nominaAdmin || 0) + (e.nominaVentas || 0) + (e.gastosContables || 0) + (e.gastosLegales || 0) + (e.rentaLugar || 0) + (e.gastosPublicidad || 0) + (e.gastosRepresentacion || 0);
      const acopTotales = (e.acopOficina || 0) + (e.acopMaqueta || 0) + (e.acopRenders || 0) + (e.acopFotos || 0) + (e.acopMedia || 0);
      const showroomItems = state.showroomItems || [];
      const preoperativos = showroomItems.reduce((s, it) => s + Number(it.cantidad) * Number(it.costo), 0);
      let html = `<div class="section-header">
      <div>
        <div class="section-title">Presupuesto de Egresos Levantamiento Capital</div>
        <div class="section-sub">Costos fijos, operativos y estructurales</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      
      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Gastos Mensuales (Operaci\xF3n Levantamiento)</h3>

        <div style="margin-bottom:20px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
            <span>Meses de Trabajo (Levantamiento)</span>
            <span id="val-mesesLevantamiento" style="font-weight:600; color:var(--navy);">${e.mesesLevantamiento} Meses</span>
          </label>
          <div class="range-container">
            <input type="range" class="form-input" min="12" max="36" step="1" style="width:100%;" 
              value="${e.mesesLevantamiento}" data-key="mesesLevantamiento" data-nested="egresos">
            <output class="range-bubble" id="bubble-mesesLevantamiento" style="left:calc(${(e.mesesLevantamiento - 12) / 24 * 100}% + ${12 - (e.mesesLevantamiento - 12) / 24 * 100 * 0.24}px)">${e.mesesLevantamiento} Meses</output>
          </div>
        </div>
        
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">N\xF3mina Administraci\xF3n</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.nominaAdmin)}" data-key="nominaAdmin" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">N\xF3mina Ventas</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.nominaVentas)}" data-key="nominaVentas" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos Contables</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.gastosContables)}" data-key="gastosContables" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos Legales</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.gastosLegales)}" data-key="gastosLegales" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Renta del Lugar</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.rentaLugar)}" data-key="rentaLugar" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Promoci\xF3n y Publicidad</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.gastosPublicidad)}" data-key="gastosPublicidad" data-nested="egresos">
        </div>
        <div style="margin-bottom:12px;">
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Gastos de Representaci\xF3n</label>
          <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${M(e.gastosRepresentacion)}" data-key="gastosRepresentacion" data-nested="egresos">
        </div>
        
        <div style="margin-top:20px; padding-top:12px; border-top:1px solid #eee; display:flex; justify-content:space-between; font-weight:600; color:var(--navy);">
          <span>Total Fijo Mensual:</span>
          <span>${M(fijoMensual)}</span>
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="card" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <h3 style="font-size:14px; color:var(--navy); font-weight:500; margin:0">Inversi\xF3n Preoperativa \u2014 Showroom</h3>
              <p style="font-size:11.5px; color:var(--text-muted); margin:4px 0 0;">Equipamiento inicial para apertura del showroom de ventas.</p>
            </div>
            <button onclick="App.addShowroomItem()" style="background:var(--navy); color:white; border:none; padding:6px 12px; border-radius:5px; font-size:11px; cursor:pointer; white-space:nowrap; font-weight:500;">+ Agregar</button>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
              <thead>
                <tr style="background:#f9fbfd; border-bottom:2px solid #e1e8ed;">
                  <th style="text-align:left; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase;">Concepto</th>
                  <th style="text-align:center; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:48px;">Cant.</th>
                  <th style="text-align:right; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:95px;">Costo Unit.</th>
                  <th style="text-align:right; padding:6px 4px; color:var(--text-muted); font-weight:500; font-size:10px; text-transform:uppercase; width:85px;">Subtotal</th>
                  <th style="width:22px;"></th>
                </tr>
              </thead>
              <tbody>
                ${showroomItems.map((item, i) => `
                <tr style="border-bottom:1px solid #f0f4f8;">
                  <td style="padding:5px 4px;">
                    <input type="text" class="form-input showroom-input" style="width:100%; border:1px solid #e2e8f0; padding:4px 6px; border-radius:4px; font-size:12px;"
                      value="${item.nombre}" data-index="${i}" data-field="nombre" data-is-text="true">
                  </td>
                  <td style="padding:5px 4px; text-align:center;">
                    <input type="number" class="form-input showroom-input" style="width:42px; border:1px solid #e2e8f0; padding:4px; border-radius:4px; font-size:12px; text-align:center;"
                      value="${item.cantidad}" data-index="${i}" data-field="cantidad">
                  </td>
                  <td style="padding:5px 4px; text-align:right;">
                    <input type="text" class="form-input showroom-input" style="width:85px; border:1px solid #e2e8f0; padding:4px 6px; border-radius:4px; font-size:12px; text-align:right;"
                      value="${M(item.costo)}" data-index="${i}" data-field="costo">
                  </td>
                  <td style="padding:5px 4px; text-align:right; color:var(--navy); font-weight:600; font-size:12px;">
                    ${M(Number(item.cantidad) * Number(item.costo))}
                  </td>
                  <td style="padding:5px 4px; text-align:center;">
                    <button onclick="App.removeShowroomItem(${i})" style="color:#E8A090; background:none; border:none; cursor:pointer; font-size:14px; line-height:1;" title="Eliminar">\u2715</button>
                  </td>
                </tr>`).join("")}
              </tbody>
              <tfoot>
                <tr style="background:rgba(197,160,89,0.07); border-top:2px solid rgba(197,160,89,0.3);">
                  <td colspan="3" style="padding:8px 4px; font-size:12px; font-weight:600; color:var(--text-muted);">Total Inversi\xF3n Preoperativa:</td>
                  <td style="padding:8px 4px; text-align:right; font-size:14px; font-weight:700; color:#C5A059;">${M(preoperativos)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Comisiones por Levantamiento de Capital</h3>
          
          <div style="margin-bottom:12px; margin-top:12px;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Comisi\xF3n de Ventas de Tickets (%)</label>
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="number" class="form-input" style="width:100px; border:1px solid #ddd; padding:8px; border-radius:4px;" value="${e.comisionVentasPct}" data-key="comisionVentasPct" data-nested="egresos">
              <span style="font-size:13px; color:var(--text-muted);">% sobre monto levantado</span>
            </div>
          </div>
        </div>

        <div class="card" style="padding:24px; border-left:4px solid #C5A059;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Tickets Asignados al Desarrollo</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px; line-height:1.5;">Estos tickets <strong>no se venden</strong> para levantar capital; se extraen del total de venta y se asignan a los creadores del proyecto (como participaci\xF3n e incentivo operativo). Cobrar\xE1n utilidades de las rentas con el resto de inversionistas.</p>
          <div style="margin-bottom:12px;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:flex; justify-content:space-between; margin-bottom:6px">
              <span>Porcentaje de Tickets Asignados</span>
              <span id="val-pctTicketsModelo" style="font-weight:600; color:var(--navy);">${state.variables.pctTicketsModelo || 0}%</span>
            </label>
            <div class="range-container" style="margin-bottom:16px;">
              <input type="range" class="form-input" min="0" max="50" step="1" style="width:100%;" 
                value="${state.variables.pctTicketsModelo || 0}" data-key="pctTicketsModelo" data-nested="variables">
              <output class="range-bubble" id="bubble-pctTicketsModelo" style="left:calc(${(state.variables.pctTicketsModelo || 0) / 50 * 100}% + ${12 - (state.variables.pctTicketsModelo || 0) / 50 * 100 * 0.24}px)">${state.variables.pctTicketsModelo || 0}%</output>
            </div>
            <div style="font-size:11px; color:var(--navy); margin-top:8px; font-weight:500;">
              Total Asignado: ${Math.floor((state.variables.numTicketsMax || 400) * ((state.variables.pctTicketsModelo || 0) / 100))} tickets. (Se restan de las metas de venta).
            </div>
          </div>
        </div>
      </div>
      
    </div>`;
      return html;
    }
    function renderProyeccion() {
      const v = state.variables;
      const activeTab = v.activeProyeccionTab || "flujo";
      const m2ComercialPB = Number(v.m2ComercialPB) || 0;
      const rentaM2Comercial = Number(v.rentaM2Comercial) || 0;
      const m2HotelNivel1 = Number(v.m2HotelNivel1) || 0;
      const rentaM2HotelNivel1 = Number(v.rentaM2HotelNivel1) || 0;
      const m2HotelNivel2 = Number(v.m2HotelNivel2) || 0;
      const rentaM2HotelNivel2 = Number(v.rentaM2HotelNivel2) || 0;
      const ingresoRentasMensualBase = m2ComercialPB * rentaM2Comercial + m2HotelNivel1 * rentaM2HotelNivel1 + m2HotelNivel2 * rentaM2HotelNivel2;
      const cochesDiarios = Number(v.cochesDiarios) || 350;
      const precioCoche = Number(v.precioPorCoche) || 50;
      const ingresoEstacionamientoMensual = v.incluyeEstacionamiento !== false ? cochesDiarios * precioCoche * 30 : 0;
      const anios = Number(v.aniosProyeccion) || 10;
      const inflacion = (Number(v.inflacionAnualRentas) || 0) / 100;
      const adminPct = (Number(v.costoAdminRentasPct) || 0) / 100;
      const maxTickets = Number(v.numTicketsMax) || 1;
      const yearlyData = [];
      let curRentas = ingresoRentasMensualBase * 12;
      let curEstac = ingresoEstacionamientoMensual * 12;
      for (let yr = 0; yr < anios; yr++) {
        if (yr > 0) {
          curRentas *= 1 + inflacion;
          curEstac *= 1 + inflacion;
        }
        const pctRent = 1;
        const pctEstac = 1;
        const ingresoNetoRentas = curRentas * pctRent;
        const ingresoNetoEstac = curEstac * pctEstac;
        const ingresoBruto = ingresoNetoRentas + ingresoNetoEstac;
        const costoAdmin = ingresoBruto * adminPct;
        const utilidadPool = ingresoBruto - costoAdmin;
        const utilidadPorTicket = utilidadPool / maxTickets;
        yearlyData.push({
          pctRent,
          pctEstac,
          ingresoNetoRentas,
          ingresoNetoEstac,
          costoAdmin,
          utilidadPool,
          utilidadPorTicket
        });
      }
      const tabStyle = (tab) => activeTab === tab ? "padding:12px 24px; font-weight:600; color:var(--navy); border-bottom:2px solid var(--navy); cursor:pointer; background:rgba(30, 61, 89, 0.05); white-space:nowrap;" : "padding:12px 24px; font-weight:500; color:var(--text-muted); border-bottom:2px solid transparent; cursor:pointer; white-space:nowrap;";
      let headersHTML = ``;
      state.tickets.forEach((ticket) => {
        if (ticket.cantidad > 0) {
          headersHTML += `<th style="padding:12px 16px; font-weight:600; text-align:center; border-left:1px solid #eee;">Rend. ${ticket.nombre}<br><span style="font-size:10px; font-weight:400; color:var(--text-muted);">${M(ticket.precio)}</span></th>`;
        }
      });
      let html = `<div class="section-header">
      <div>
        <div class="section-title">Corrida Financiera</div>
        <div class="section-sub">Proyecci\xF3n a ${anios} a\xF1os \xB7 Inflaci\xF3n ${(inflacion * 100).toFixed(1)}% \xB7 Costo Admin ${(adminPct * 100).toFixed(1)}%</div>
      </div>
    </div>
    <div class="card" style="padding:0; overflow:hidden;">
      <div style="display:flex; border-bottom:1px solid #eee; background:#f9fbfd; font-size:13px; overflow-x:auto;">
        <div style="${tabStyle("flujo")}" onclick="App.switchProyeccionTab('flujo')">Flujo Operativo Anual</div>
        <div style="${tabStyle("ticket")}" onclick="App.switchProyeccionTab('ticket')">Rendimiento por Fase</div>
        <div style="${tabStyle("acumulado")}" onclick="App.switchProyeccionTab('acumulado')">Recuperaci\xF3n Acumulada</div>
      </div>
      <div style="padding:24px;">`;
      if (activeTab === "flujo") {
        let ingresoAnualRentasActual = ingresoRentasMensualBase * 12;
        let ingresoAnualEstacActual = ingresoEstacionamientoMensual * 12;
        html += `<div style="overflow-x:auto;"><table style="width:100%; text-align:right; border-collapse:collapse; font-size:${isPDFMode ? "10px" : "13px"}; min-width:${isPDFMode ? "900px" : "1100px"};">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600; text-align:left;">A\xF1o Operativo</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ocup.<br>Renta</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ingreso<br>Rentas</th>
            ${v.incluyeEstacionamiento !== false ? `<th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ocup.<br>Estac.</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ingreso<br>Estacionamiento</th>` : ""}
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Costo Admin.<br>(${(adminPct * 100).toFixed(1)}%)</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Utilidad Neta<br>(Pool Total)</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Utilidad Neta<br>/ Ticket</th>
            ${headersHTML}
          </tr>
        </thead>
        <tbody>`;
        for (let yr = 0; yr < anios; yr++) {
          const d = yearlyData[yr];
          const utilidadPorTicket = d.utilidadPorTicket;
          let yieldCols = ``;
          state.tickets.forEach((ticket) => {
            if (ticket.cantidad > 0) {
              const pct = utilidadPorTicket / (Number(ticket.precio) || 1) * 100;
              yieldCols += `<td style="padding:12px 16px; font-weight:600; color:${pct > 12 ? "#2ecc71" : "var(--navy)"}; text-align:center; border-left:1px solid #f5f5f5;">${pct.toFixed(2)}%</td>`;
            }
          });
          html += `<tr style="border-bottom:1px solid #f5f5f5; background:${yr % 2 === 0 ? "#fff" : "#fafbfd"};">
          <td style="padding:12px 16px; text-align:left; font-weight:600; color:var(--navy);">A\xF1o ${yr + 1}</td>
          <td style="padding:12px 16px; font-weight:600; color:#C5A059; background:rgba(197,160,89,0.05);">${(d.pctRent * 100).toFixed(0)}%</td>
          <td style="padding:12px 16px; color:var(--text-muted);">${M(d.ingresoNetoRentas)}</td>
          ${v.incluyeEstacionamiento !== false ? `<td style="padding:12px 16px; font-weight:600; color:#2ecc71; background:rgba(46,204,113,0.05);">${(d.pctEstac * 100).toFixed(0)}%</td>
          <td style="padding:12px 16px; color:var(--text-muted);">${M(d.ingresoNetoEstac)}</td>` : ""}
          <td style="padding:12px 16px; color:#E8A090;">\u2013 ${M(d.costoAdmin)}</td>
          <td style="padding:12px 16px; font-weight:700; color:#2ecc71;">${M(d.utilidadPool)}</td>
          <td style="padding:12px 16px; font-weight:700; color:var(--navy); background:rgba(197,160,89,0.05);">${M(utilidadPorTicket)}</td>
          ${yieldCols}
        </tr>`;
        }
        html += `</tbody></table></div>`;
      } else if (activeTab === "ticket") {
        const utilPorTicket1 = yearlyData[0].utilidadPorTicket;
        const utilPorTicket5 = anios >= 5 ? yearlyData[4].utilidadPorTicket : yearlyData[anios - 1].utilidadPorTicket;
        const utilPorTicketN = yearlyData[anios - 1].utilidadPorTicket;
        html += `<p style="font-size:13px; color:var(--text-muted); margin-bottom:20px; line-height:1.6;">
        Rendimiento y cap rate proyectado por cada fase de inversi\xF3n, calculado sobre la utilidad neta del pool total \xF7 ${maxTickets} tickets emitidos.
      </p>
      <div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:12px 16px; text-align:left; font-weight:600;">Fase</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Precio Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Util. Anual / Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o 1</th>
            ${anios >= 5 ? `<th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o 5</th>` : ""}
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Cap Rate A\xF1o ${anios}</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Recuperaci\xF3n Est.</th>
          </tr>
        </thead>
        <tbody>`;
        state.tickets.forEach((ticket) => {
          const precio = Number(ticket.precio) || 1;
          const cr1 = utilPorTicket1 / precio * 100;
          const cr5 = utilPorTicket5 / precio * 100;
          const crN = utilPorTicketN / precio * 100;
          let recup = "10+ a\xF1os";
          let runningSumRecup = 0;
          for (let yr = 0; yr < anios; yr++) {
            const u = yearlyData[yr].utilidadPorTicket;
            if (runningSumRecup + u >= precio) {
              const fraction = (precio - runningSumRecup) / u;
              recup = (yr + fraction).toFixed(1) + " a\xF1os";
              break;
            }
            runningSumRecup += u;
          }
          html += `<tr style="border-bottom:1px solid #f5f5f5;">
          <td style="padding:12px 16px; font-weight:600; color:var(--navy);">${ticket.nombre}</td>
          <td style="padding:12px 16px; text-align:right;">${M(precio)}</td>
          <td style="padding:12px 16px; text-align:right; color:#2ecc71; font-weight:600;">${M(utilPorTicket1)}</td>
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:${cr1 > 10 ? "#2ecc71" : "var(--navy)"};">${cr1.toFixed(2)}%</td>
          ${anios >= 5 ? `<td style="padding:12px 16px; text-align:right; font-weight:700; color:${cr5 > 12 ? "#2ecc71" : "var(--navy)"};">${cr5.toFixed(2)}%</td>` : ""}
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:#C5A059;">${crN.toFixed(2)}%</td>
          <td style="padding:12px 16px; text-align:right; color:var(--text-muted);">${recup} a\xF1os</td>
        </tr>`;
        });
        html += `</tbody></table></div>
      <div style="margin-top:16px; padding:12px 16px; background:#f9fbfd; border:1px solid #e1e8ed; border-radius:6px; font-size:12px; color:var(--text-muted);">
        <strong>Notas:</strong> Inflaci\xF3n ${(inflacion * 100).toFixed(1)}% anual aplicada al ingreso bruto.
        Costo administrativo ${(adminPct * 100).toFixed(1)}% deducido del ingreso bruto.
        Ocupaci\xF3n 100% para esta proyecci\xF3n base \u2014 usa <em>Escenarios Financieros</em> para estresar el modelo.
      </div>`;
      } else if (activeTab === "acumulado") {
        let acum = 0;
        html += `<p style="font-size:13px; color:var(--text-muted); margin-bottom:20px; line-height:1.6;">
        Muestra cu\xE1nto ha recuperado cada fase de su inversi\xF3n inicial, a\xF1o a a\xF1o. Verde = recuperaci\xF3n total del capital.
      </p>
      <div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:12px 16px; text-align:left; font-weight:600;">A\xF1o</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Utilidad Anual / Ticket</th>
            <th style="padding:12px 16px; text-align:right; font-weight:600;">Utilidad Acumulada</th>`;
        state.tickets.forEach((t) => {
          if (t.cantidad > 0) html += `<th style="padding:12px 16px; text-align:right; font-weight:600; border-left:1px solid #eee;">% Recup. ${t.nombre}</th>`;
        });
        html += `</tr></thead><tbody>`;
        for (let yr = 0; yr < anios; yr++) {
          const utilPorTicket = yearlyData[yr].utilidadPorTicket;
          acum += utilPorTicket;
          let recupCols = "";
          state.tickets.forEach((t) => {
            if (t.cantidad > 0) {
              const pct = acum / (Number(t.precio) || 1) * 100;
              const isRecovered = pct >= 100;
              recupCols += `<td style="padding:12px 16px; text-align:right; font-weight:700; color:${isRecovered ? "#2ecc71" : "var(--navy)"}; border-left:1px solid #f5f5f5; background:${isRecovered ? "rgba(46,204,113,0.05)" : "transparent"};">${pct.toFixed(1)}%</td>`;
            }
          });
          html += `<tr style="border-bottom:1px solid #f5f5f5; background:${yr % 2 === 0 ? "#fff" : "#fafbfd"};">
          <td style="padding:12px 16px; font-weight:600; color:var(--navy);">A\xF1o ${yr + 1}</td>
          <td style="padding:12px 16px; text-align:right; color:#2ecc71; font-weight:600;">${M(utilPorTicket)}</td>
          <td style="padding:12px 16px; text-align:right; font-weight:700; color:var(--navy);">${M(acum)}</td>
          ${recupCols}
        </tr>`;
        }
        html += `</tbody></table></div>`;
      }
      html += `</div></div>`;
      return html;
    }
    function switchReportTab(tab) {
      if (!state.variables) state.variables = {};
      state.variables.activeReportTab = tab;
      navigate("reportes");
    }
    function renderReportes() {
      const v = state.variables;
      const e = state.egresos;
      const activeTab = v.activeReportTab || "ingresos";
      const meta = Number(v.capitalRequerido) || 0;
      const entradas = state.tickets.reduce((sum, t) => sum + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
      const fijoMensual = (e.nominaAdmin || 0) + (e.nominaVentas || 0) + (e.gastosContables || 0) + (e.gastosLegales || 0) + (e.rentaLugar || 0) + (e.gastosPublicidad || 0) + (e.gastosRepresentacion || 0);
      const mesesProyeccion = Number(e.mesesLevantamiento) || 24;
      const egresosFijosTotales = fijoMensual * mesesProyeccion;
      const comisionTotal = entradas * ((e.comisionVentasPct || 0) / 100);
      const acopTotales = (e.acopOficina || 0) + (e.acopMaqueta || 0) + (e.acopRenders || 0) + (e.acopFotos || 0) + (e.acopMedia || 0);
      const egresosTotales = egresosFijosTotales + acopTotales + comisionTotal;
      const capitalNeto = entradas - egresosTotales;
      let html = `<div class="section-header" style="margin-bottom:16px;">
      <div>
        <div class="section-title">Reportes e Indicadores</div>
        <div class="section-sub">M\xF3dulos Anal\xEDticos de la Estructura Inmobiliaria</div>
      </div>
    </div>
    
    <div style="display:flex; gap:12px; margin-bottom:24px; border-bottom:2px solid #eee; padding-bottom:12px;">
      <button onclick="App.switchReportTab('ingresos')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${activeTab === "ingresos" ? "#C5A059" : "#f0f4f8"}; color:${activeTab === "ingresos" ? "#fff" : "var(--navy)"};">Ingresos Operativos</button>
      <button onclick="App.switchReportTab('construccion')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${activeTab === "construccion" ? "#C5A059" : "#f0f4f8"}; color:${activeTab === "construccion" ? "#fff" : "var(--navy)"};">Construcci\xF3n vs Mkt</button>
      <button onclick="App.switchReportTab('plusvalia')" style="padding:8px 16px; border-radius:4px; font-weight:600; cursor:pointer; font-size:13px; border:none; background:${activeTab === "plusvalia" ? "#C5A059" : "#f0f4f8"}; color:${activeTab === "plusvalia" ? "#fff" : "var(--navy)"};">Plusval\xEDa Especulativa</button>
    </div>`;
      if (activeTab === "ingresos") {
        html += `
      <div class="card" style="padding:24px; margin-bottom:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Proyecci\xF3n de Flujo Operativo a ${v.aniosProyeccion || 10} A\xF1os</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">Este gr\xE1fico mapea la utilidad neta anual generada por las rentas de Hotel, Comercial y Estacionamiento contra la inflaci\xF3n.</p>
        <div style="height:350px; position:relative;"><canvas id="chart10A\xF1os"></canvas></div>
      </div>`;
      } else if (activeTab === "construccion") {
        html += `
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:24px;">
        <div class="card" style="padding:16px; border-left:4px solid #C5A059;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Capital Objetivo Obra</div>
          <div style="font-size:18px; font-weight:700; color:var(--navy);">${M(meta)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid #2ecc71;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Entradas Capital Proyectadas</div>
          <div style="font-size:18px; font-weight:700; color:#2ecc71;">${M(entradas)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid #E8A090;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Costos Preoperativos Globales</div>
          <div style="font-size:18px; font-weight:700; color:#E8A090;">${M(egresosTotales)}</div>
        </div>
        <div class="card" style="padding:16px; border-left:4px solid var(--navy);">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Presupuesto F\xEDsico Limpio</div>
          <div style="font-size:18px; font-weight:700; color:var(--navy);">${M(capitalNeto)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Estructurador del Traspaso de Fondos</h3>
          <div style="height:280px; position:relative;"><canvas id="chartCapitalObj"></canvas></div>
        </div>
        <div class="card" style="padding:24px;">
          <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Desglose de Tranches (Levantamiento)</h3>
          <div style="height:280px; position:relative;"><canvas id="chartFases"></canvas></div>
        </div>
      </div>`;
      } else if (activeTab === "plusvalia") {
        const selIdx = Math.min(Number(v.selectedPlusvaliaTicketIdx) || 0, state.tickets.length - 1);
        const selTicket = state.tickets[selIdx] || state.tickets[0];
        const precioBaseVentaPromedio = selTicket ? Number(selTicket.precio) : 45e4;
        const m2RentablesTotal = (Number(v.m2ComercialPB) || 0) + (Number(v.m2HotelNivel1) || 0) + (Number(v.m2HotelNivel2) || 0);
        const _totalTkts = Number(v.numTicketsMax) || 1;
        const eqFisica = _totalTkts > 0 && m2RentablesTotal > 0 ? m2RentablesTotal / _totalTkts : 0;
        const precioActualMercado = Number(v.precioMercadoActualM2) || 48500;
        const valorEstimadoFinal = eqFisica * precioActualMercado;
        html += `
      <div class="card" style="padding:32px; background:#f9fbfd;">
        <h3 style="font-size:16px; color:var(--navy); margin-bottom:24px; font-weight:600; text-align:center;">Delta de Valoraci\xF3n Comercial Inmediata</h3>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; text-align:center;">
          <div style="background:#fff; border:1px solid #ddd; padding:20px; border-radius:8px;">
            <div style="font-size:11px; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Fase de Ticket Seleccionada</div>
            <select onchange="App.selectPlusvaliaTicket(this.value)" style="width:100%; border:1px solid #C5A059; padding:6px 8px; border-radius:4px; font-size:12px; font-weight:600; color:var(--navy); background:#f9fbfd; margin-bottom:10px; cursor:pointer;">
              ${state.tickets.map((t, i) => `<option value="${i}" ${i === selIdx ? "selected" : ""}>${t.nombre} \u2014 ${M(t.precio)}</option>`).join("")}
            </select>
            <div style="font-size:24px; font-weight:600; color:var(--navy);">${M(precioBaseVentaPromedio)}</div>
          </div>
          <div style="display:flex; align-items:center; justify-content:center;">
            <div style="font-size:24px; color:#C5A059;">\u2192</div>
          </div>
          <div style="background:var(--navy); border:1px solid var(--navy); padding:20px; border-radius:8px;">
            <div style="font-size:11px; text-transform:uppercase; color:rgba(255,255,255,0.7); margin-bottom:8px;">Equivalencia F\xEDsica a Precio Retail local</div>
            <div style="font-size:24px; font-weight:700; color:#2ecc71;">${M(valorEstimadoFinal)}</div>
          </div>
        </div>

        <div style="margin-top:24px; text-align:center;">
          <p style="font-size:13px; color:var(--text-muted); max-width:600px; margin:0 auto;">El diferencial expuesto indica el incremento neto patrimonial garantizado para el primer inversor tan pronto como la obra se libere al mercado bajo demanda regular (${M(precioActualMercado)}/m\xB2).</p>
        </div>
      </div>
      
      <div class="card" style="padding:24px; margin-top:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600;">Gr\xE1fico Especulativo Hist\xF3rico</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px;">Representaci\xF3n te\xF3rica de plusval\xEDa del suelo (Mock Hist\xF3rico vs Ticket).</p>
        <div style="height:350px; position:relative;"><canvas id="chartPlusvalia"></canvas></div>
      </div>`;
      }
      return html;
    }
    function initReportesCharts() {
      if (!window.Chart) return;
      const v = state.variables;
      const e = state.egresos;
      const activeTab = v.activeReportTab || "ingresos";
      if (activeTab === "construccion") {
        const entradas = state.tickets.reduce((sum, t) => sum + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
        const fijoMensual = (e.nominaAdmin || 0) + (e.nominaVentas || 0) + (e.gastosContables || 0) + (e.gastosLegales || 0) + (e.rentaLugar || 0) + (e.gastosPublicidad || 0) + (e.gastosRepresentacion || 0);
        const meses = Number(e.mesesLevantamiento) || 24;
        const fijos = fijoMensual * meses;
        const acopTotales = (e.acopOficina || 0) + (e.acopMaqueta || 0) + (e.acopRenders || 0) + (e.acopFotos || 0) + (e.acopMedia || 0);
        const variables = acopTotales + entradas * ((e.comisionVentasPct || 0) / 100);
        const capitalNeto = entradas - fijos - variables;
        const ctxPie = document.getElementById("chartCapitalObj");
        if (ctxPie) {
          charts.push(new Chart(ctxPie, {
            type: "doughnut",
            data: {
              labels: ["Capital Neto Obra", "Costo Operativo Fijo", "Costo Preoperativo/Venta"],
              datasets: [{
                data: [capitalNeto, fijos, variables],
                backgroundColor: ["var(--navy)", "#C5A059", "#E8A090"],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom", labels: { font: { family: "Montserrat", size: 11 } } } }
            }
          }));
        }
        const labelsFases = [];
        const dataFases = [];
        for (let t of state.tickets) {
          if (t.cantidad > 0 && t.precio > 0) {
            labelsFases.push(t.nombre);
            dataFases.push(t.cantidad * t.precio);
          }
        }
        const ctxBar = document.getElementById("chartFases");
        if (ctxBar) {
          charts.push(new Chart(ctxBar, {
            type: "bar",
            data: {
              labels: labelsFases,
              datasets: [{
                label: "Levantamiento MXN",
                data: dataFases,
                backgroundColor: "rgba(197, 160, 89, 0.8)",
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, grid: { color: "#f0f0f0" }, ticks: { callback: (v2) => "$" + (v2 / 1e6).toFixed(1) + "M" } } }
            }
          }));
        }
      }
      if (activeTab === "ingresos") {
        const anios = Number(v.aniosProyeccion) || 10;
        const inflacion = (Number(v.inflacionAnualRentas) || 0) / 100;
        const adminPct = (Number(v.costoAdminRentasPct) || 0) / 100;
        const ingresoRentasMensualBase = Number(v.m2ComercialPB) * Number(v.rentaM2Comercial) + Number(v.m2HotelNivel1) * Number(v.rentaM2HotelNivel1) + Number(v.m2HotelNivel2) * Number(v.rentaM2HotelNivel2);
        const ingresoEstacionamientoMensual = Number(v.rentaMensualEstacionamiento) || 0;
        const ingresoMensualBase = ingresoRentasMensualBase + ingresoEstacionamientoMensual;
        let ingresoAct = ingresoMensualBase * 12;
        const labelsA\u00F1os = [];
        const dataBruto = [];
        const dataNeto = [];
        for (let i = 1; i <= anios; i++) {
          labelsA\u00F1os.push("A\xF1o " + i);
          const infl = i === 1 ? 0 : inflacion;
          ingresoAct = ingresoAct * (1 + infl);
          const utilNeta = ingresoAct * (1 - adminPct);
          dataBruto.push(ingresoAct);
          dataNeto.push(utilNeta);
        }
        const ctxLine = document.getElementById("chart10A\xF1os");
        if (ctxLine) {
          charts.push(new Chart(ctxLine, {
            type: "line",
            data: {
              labels: labelsA\u00F1os,
              datasets: [
                { label: "Ingreso Bruto Total", data: dataBruto, borderColor: "#C5A059", backgroundColor: "transparent", tension: 0.3, borderWidth: 2 },
                { label: "Utilidad Neta Distribuci\xF3n", data: dataNeto, borderColor: "#2ecc71", backgroundColor: "rgba(46, 204, 113, 0.1)", tension: 0.3, fill: true, borderWidth: 2 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top", labels: { font: { family: "Montserrat", size: 11 } } } },
              scales: { y: { beginAtZero: true, grid: { color: "#f0f0f0" }, ticks: { callback: (v2) => "$" + (v2 / 1e6).toFixed(1) + "M" } } }
            }
          }));
        }
      }
      if (activeTab === "plusvalia") {
        const labelsA\u00F1os = ["Hoy (Compra)", "A\xF1o 1", "A\xF1o 2", "A\xF1o 3 (Appertura)"];
        const ctxLineaEspec = document.getElementById("chartPlusvalia");
        const _selIdxChart = Math.min(Number(v.selectedPlusvaliaTicketIdx) || 0, state.tickets.length - 1);
        const _selTicketChart = state.tickets[_selIdxChart] || state.tickets[0];
        const precioBaseVentaPromedio = _selTicketChart ? Number(_selTicketChart.precio) : 45e4;
        const m2RentablesTotal = (Number(v.m2ComercialPB) || 0) + (Number(v.m2HotelNivel1) || 0) + (Number(v.m2HotelNivel2) || 0);
        const _totalTkts = Number(v.numTicketsMax) || 1;
        const eqFisica = _totalTkts > 0 && m2RentablesTotal > 0 ? m2RentablesTotal / _totalTkts : 0;
        const precioActualMercado = Number(v.precioMercadoActualM2) || 48500;
        const valorEstimadoFinal = eqFisica * precioActualMercado;
        const diff = valorEstimadoFinal - precioBaseVentaPromedio;
        const d1 = precioBaseVentaPromedio;
        const d2 = precioBaseVentaPromedio + diff * 0.2;
        const d3 = precioBaseVentaPromedio + diff * 0.5;
        const d4 = valorEstimadoFinal;
        const dataAprec = [d1, d2, d3, d4];
        if (ctxLineaEspec) {
          charts.push(new Chart(ctxLineaEspec, {
            type: "line",
            data: {
              labels: labelsA\u00F1os,
              datasets: [
                { label: "Valor Te\xF3rico Fiduciario del Ticket", data: dataAprec, borderColor: "var(--navy)", backgroundColor: "rgba(58, 28, 21, 0.1)", tension: 0.4, fill: true, borderWidth: 3 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top", labels: { font: { family: "Montserrat", size: 11 } } } },
              scales: { y: { beginAtZero: false, grid: { color: "#f0f0f0" } } }
            }
          }));
        }
      }
    }
    function renderConstruccion() {
      const v = state.variables;
      const e = state.egresos;
      const m2RentablesTotal = (Number(v.m2ComercialPB) || 0) + (Number(v.m2HotelNivel1) || 0) + (Number(v.m2HotelNivel2) || 0);
      const m2SuperficieRentadaEstacionamiento = Number(v.m2Estacionamiento) || 0;
      const m2TotalConstruir = m2RentablesTotal;
      const terreno = v.aportaTerreno ? 0 : Number(v.costoCompraTerreno) || 0;
      const showroomItems = state.showroomItems || [];
      const preoperativos = showroomItems.reduce((s, it) => s + Number(it.cantidad) * Number(it.costo), 0);
      const obraItems = state.obraItems || [];
      const obraTotal = obraItems.reduce((s, it) => s + Number(it.cantidad) * Number(it.costo), 0);
      const costoM2Derivado = m2TotalConstruir > 0 ? obraTotal / m2TotalConstruir : 0;
      const comisionPct = Number(e.comisionVentasPct) || 0;
      const totalVendidos = state.tickets.filter((t) => !t.esAportado).reduce((s, t) => s + Number(t.cantidad) * Number(t.precio), 0);
      const comisionVentas = totalVendidos * (comisionPct / 100);
      const presupuestoCompleto = obraTotal + terreno + preoperativos + comisionVentas;
      return `<div class="section-header">
      <div>
        <div class="section-title">Costo de Construcci\xF3n y Preoperativos</div>
        <div class="section-sub">Presupuesto Maestro de Arranque: Obra, Terreno, Comisiones y Preoperaci\xF3n</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px; margin-bottom:24px;">

      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">1. Construcci\xF3n Civil (Obra Gris y Exteriores)</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px; line-height:1.5;">
          <strong>Nota de alcance:</strong> La volumetr\xEDa de metros cuadrados se extrae autom\xE1ticamente de los <b>Par\xE1metros Base</b>. Este presupuesto considera ejecuci\xF3n de obra gris. No incluye equipamiento interior comercial ni hotelero.
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div style="background:#f9fbfd; padding:12px; border-radius:6px; border:1px solid #e1e8ed;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:8px">Desglose Superficial</label>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:var(--navy);"><span>\xC1rea Rentable a Construir:</span> <strong>${m2RentablesTotal.toLocaleString()} m\xB2</strong></div>
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:var(--text-muted);"><span>Estacionamiento Rentado:</span> <strong>${m2SuperficieRentadaEstacionamiento.toLocaleString()} m\xB2 <span style="font-size:10px">(Excluido)</span></strong></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; color:#C5A059; margin-top:8px; border-top:1px solid #ddd; padding-top:8px;"><span>Total Obra Gris:</span> <span>${m2TotalConstruir.toLocaleString()} m\xB2</span></div>
          </div>
          <div style="background:#f9fbfd; padding:12px; border-radius:6px; border:1px solid #e1e8ed;">
            <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Costo Param\xE9trico M\xB2 Construcci\xF3n</label>
            <div style="font-size:20px; font-weight:700; color:var(--navy);">${M(costoM2Derivado)}<span style="font-size:11px; font-weight:400; color:var(--text-muted); margin-left:6px;">/m\xB2</span></div>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Total detalle \xF7 ${m2TotalConstruir.toLocaleString()} m\xB2 \xB7 Solo informativo</div>
          </div>
        </div>
        <div style="padding:16px; background:rgba(30,41,59,0.03); border-radius:6px; border:1px dashed #cbd5e1; text-align:right;">
          <span style="font-size:12px; font-weight:600; color:var(--text-muted); text-transform:uppercase; margin-right:12px;">Total de Obra Civil Directa:</span>
          <span style="font-size:22px; font-weight:700; color:var(--navy);">${M(obraTotal)}</span>
        </div>
      </div>

      <div class="card" style="padding:24px; display:flex; flex-direction:column; gap:16px;">
        <h3 style="font-size:14px; color:var(--navy); font-weight:500">2. Terreno y Comisiones de Venta</h3>

        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Compra de Terreno</label>
          ${v.aportaTerreno ? `<div style="padding:10px 12px; background:rgba(197,160,89,0.08); border:1px solid #C5A059; border-radius:4px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; font-weight:600; color:#C5A059;">\u{1F512} TERRENO APORTADO</span>
                <span style="font-size:14px; font-weight:700; color:var(--navy);">${M(v.valorTerrenoAportado)} <span style="font-size:10px; color:var(--text-muted); font-weight:400;">(no comprado)</span></span>
               </div>` : `<input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px;"
                value="${M(v.costoCompraTerreno)}" data-key="costoCompraTerreno" data-nested="variables" title="Usar $0 si el predio fue 100% aportado a capital">`}
        </div>

        <div>
          <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Comisi\xF3n de Venta sobre Entradas Proyectadas</label>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:4px; background:#f9fbfd; border:1px solid #ddd; border-radius:4px; padding:4px 8px;">
              <input type="number" class="form-input" style="width:52px; border:none; background:transparent; font-size:16px; font-weight:600; color:var(--navy); padding:4px 0; text-align:center;"
                value="${comisionPct}" data-key="comisionVentasPct" data-nested="egresos" min="0" max="100" step="0.5">
              <span style="font-size:14px; color:var(--text-muted); font-weight:600;">%</span>
            </div>
            <span style="font-size:11px; color:var(--text-muted);">\xD7 ${M(totalVendidos)} <span style="font-size:10px; opacity:0.7;">(tickets vendidos)</span></span>
          </div>
          <div style="margin-top:8px; padding:8px 12px; background:rgba(197,160,89,0.08); border-radius:4px; border-left:3px solid #C5A059; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:var(--text-muted);">Comisi\xF3n calculada:</span>
            <span style="font-size:15px; font-weight:700; color:#C5A059;">${M(comisionVentas)}</span>
          </div>
        </div>

        <div style="padding:12px; background:rgba(30,41,59,0.03); border-radius:6px; border:1px dashed #cbd5e1;">
          <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px; color:var(--text-muted);">
            <span>Terreno:</span><strong style="color:var(--navy);">${M(terreno)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-muted);">
            <span>Comisiones:</span><strong style="color:#C5A059;">${M(comisionVentas)}</strong>
          </div>
        </div>
      </div>

    </div>

    <div class="card" style="padding:24px; margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h3 style="font-size:14px; color:var(--navy); font-weight:500; margin:0">3. Detalle de Obra Civil</h3>
          <p style="font-size:11.5px; color:var(--text-muted); margin:4px 0 0;">Desglose de conceptos a proporcionar por el arquitecto.</p>
        </div>
        <button onclick="App.addObraItem()" style="background:var(--navy); color:white; border:none; padding:7px 14px; border-radius:5px; font-size:12px; cursor:pointer; white-space:nowrap; font-weight:500;">+ Agregar Concepto</button>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="background:#f9fbfd; border-bottom:2px solid #e1e8ed;">
            <th style="text-align:left; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase;">Concepto</th>
            <th style="text-align:center; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:70px;">Cant.</th>
            <th style="text-align:right; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:130px;">Costo Unitario</th>
            <th style="text-align:right; padding:8px 6px; color:var(--text-muted); font-weight:500; font-size:11px; text-transform:uppercase; width:130px;">Subtotal</th>
            <th style="width:32px;"></th>
          </tr>
        </thead>
        <tbody>
          ${obraItems.map((item, i) => `
          <tr style="border-bottom:1px solid #f0f4f8;">
            <td style="padding:7px 6px;">
              <input type="text" class="form-input obra-input" style="width:100%; border:1px solid #e2e8f0; padding:5px 8px; border-radius:4px; font-size:13px;"
                value="${item.nombre}" data-index="${i}" data-field="nombre" data-is-text="true">
            </td>
            <td style="padding:7px 6px; text-align:center;">
              <input type="number" class="form-input obra-input" style="width:58px; border:1px solid #e2e8f0; padding:5px; border-radius:4px; font-size:13px; text-align:center;"
                value="${item.cantidad}" data-index="${i}" data-field="cantidad">
            </td>
            <td style="padding:7px 6px; text-align:right;">
              <input type="text" class="form-input obra-input" style="width:120px; border:1px solid #e2e8f0; padding:5px 8px; border-radius:4px; font-size:13px; text-align:right;"
                value="${item.costo > 0 ? M(item.costo) : ""}" data-index="${i}" data-field="costo">
            </td>
            <td style="padding:7px 6px; text-align:right; color:var(--navy); font-weight:600;">
              ${item.costo > 0 ? M(Number(item.cantidad) * Number(item.costo)) : ""}
            </td>
            <td style="padding:7px 6px; text-align:center;">
              <button onclick="App.removeObraItem(${i})" style="color:#E8A090; background:none; border:none; cursor:pointer; font-size:16px; line-height:1;" title="Eliminar">\u2715</button>
            </td>
          </tr>`).join("")}
        </tbody>
        <tfoot>
          <tr style="background:rgba(197,160,89,0.07); border-top:2px solid rgba(197,160,89,0.3);">
            <td colspan="3" style="padding:10px 6px; font-size:13px; font-weight:600; color:var(--text-muted);">Total Detalle de Obra:</td>
            <td style="padding:10px 6px; text-align:right; font-size:16px; font-weight:700; color:#C5A059;">${M(obraTotal)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="card" style="padding:24px; background:var(--navy); color:white; text-align:center;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:2px; color:#C5A059; margin-bottom:8px;">Presupuesto General Requerido</div>
      <div style="font-size:36px; font-weight:700; margin-bottom:16px; line-height:1; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${M(presupuestoCompleto)}</div>
      <div style="display:flex; justify-content:center; gap:32px; flex-wrap:wrap; font-size:13px; color:rgba(255,255,255,0.7);">
        <span>Obra Civil: <strong style="color:white;">${M(obraTotal)}</strong></span>
        <span>Terreno: <strong style="color:white;">${M(terreno)}</strong></span>
        <span>Comisiones: <strong style="color:#C5A059;">${M(comisionVentas)}</strong></span>
        <span>Preoperativos: <strong style="color:#C5A059;">${M(preoperativos)}</strong></span>
      </div>
      <div style="font-size:11px; color:rgba(255,255,255,0.4); margin-top:10px;">Obra Gris + Tierra + Comisiones de Venta + Inversi\xF3n Preoperativa</div>
    </div>`;
    }
    function renderPlusvalia() {
      const v = state.variables;
      const m2RentablesTotal = (Number(v.m2ComercialPB) || 0) + (Number(v.m2HotelNivel1) || 0) + (Number(v.m2HotelNivel2) || 0);
      const _totalTktsPv = Number(v.numTicketsMax) || 1;
      const eqFisica = _totalTktsPv > 0 && m2RentablesTotal > 0 ? m2RentablesTotal / _totalTktsPv : 0;
      const _selIdxPv = Math.min(Number(v.selectedPlusvaliaTicketIdx) || 0, state.tickets.length - 1);
      const _selTicketPv = state.tickets[_selIdxPv] || state.tickets[0];
      const precioBaseVentaPromedio = _selTicketPv ? Number(_selTicketPv.precio) : 45e4;
      const precioActualMercado = Number(v.precioMercadoActualM2) || 48500;
      const valorEstimadoFinal = eqFisica * precioActualMercado;
      const plusvaliaMonetaria = valorEstimadoFinal - precioBaseVentaPromedio;
      const plusvaliaPct = precioBaseVentaPromedio > 0 ? (valorEstimadoFinal / precioBaseVentaPromedio - 1) * 100 : 0;
      return `<div class="section-header">
      <div>
        <div class="section-title">An\xE1lisis de Mercado y Plusval\xEDa</div>
        <div class="section-sub">Estructuraci\xF3n de equivalencia f\xEDsica y rendimiento especulativo</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:24px;">
      
      <div class="card" style="padding:24px;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Equivalencia F\xEDsica Media</h3>
        <div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #eee;">
          <span style="font-size:13px; color:var(--text-muted);">M\xB2 Rentables Totales del Proyecto:</span>
          <span style="font-weight:600; color:var(--navy);">${m2RentablesTotal.toFixed(1)} m\xB2</span>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; padding-top:12px;">
          <span style="font-size:13px; color:var(--text-muted);">Asignaci\xF3n Superficial por Ticket:</span>
          <span style="font-size:24px; font-weight:700; color:#C5A059;">${eqFisica.toFixed(2)} m\xB2</span>
        </div>
        <p style="font-size:11.5px; color:var(--text-muted); margin-top:16px; line-height:1.5;">
          <strong>Concepto:</strong> Aunque el ticket representa una participaci\xF3n fiduciaria, f\xEDsicamente cada inversionista tiene el goce equivalente estructural a ${eqFisica.toFixed(2)} metros cuadrados del activo productivo.
        </p>
      </div>

      <div class="card" style="padding:24px; border-top:3px solid #2ecc71;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:500">Estimador de Costo Mercado Atual</h3>
        <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Precio Comercial actual en Zona</label>
        <input type="text" class="form-input" style="width:100%; border:1px solid #ddd; padding:8px; border-radius:4px; font-size:16px; font-weight:600; color:#2ecc71;" 
          value="${M(v.precioMercadoActualM2)}" data-key="precioMercadoActualM2" data-nested="variables">
        
        <div style="margin-top:20px; padding:12px; background:#f9fbfd; border-radius:6px;">
          <div style="font-size:10px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px">Valor Comercial Estimado de la Fracci\xF3n:</div>
          <div style="font-size:20px; font-weight:700; color:var(--navy); margin-bottom:4px">${M(valorEstimadoFinal)}</div>
          <div style="font-size:12px; color:var(--text-muted);">(${eqFisica.toFixed(2)} m\xB2 \xD7 ${M(precioActualMercado)})</div>
        </div>
      </div>

    </div>

    <div class="card" style="padding:32px; text-align:center;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:2px; color:var(--text-muted); margin-bottom:12px;">Proyecci\xF3n de Margen Especulativo</div>
      <div style="margin-bottom:16px; display:flex; justify-content:center;">
        <select onchange="App.selectPlusvaliaTicket(this.value)" style="border:1px solid #C5A059; padding:6px 12px; border-radius:4px; font-size:13px; font-weight:600; color:var(--navy); background:#f9fbfd; cursor:pointer;">
          ${state.tickets.map((t, i) => `<option value="${i}" ${i === _selIdxPv ? "selected" : ""}>${t.nombre} \u2014 ${M(t.precio)}</option>`).join("")}
        </select>
      </div>
      <div style="display:flex; justify-content:center; gap:40px; align-items:flex-end;">
        <div>
          <div style="font-size:42px; font-weight:300; color:${plusvaliaMonetaria > 0 ? "#2ecc71" : "#E8A090"}; line-height:1;">${plusvaliaMonetaria > 0 ? "+" : ""}${M(plusvaliaMonetaria)}</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Plusval\xEDa Monetaria Directa</div>
        </div>
        <div style="width:1px; height:50px; background:#ddd;"></div>
        <div>
          <div style="font-size:42px; font-weight:700; color:${plusvaliaPct > 0 ? "#2ecc71" : "#E8A090"}; line-height:1;">${plusvaliaPct > 0 ? "+" : ""}${plusvaliaPct.toFixed(1)}%</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Retorno sobre Precio Ticket</div>
        </div>
      </div>
    </div>`;
    }
    function renderEscenarios() {
      const escenariosGuardados = escenariosDb;
      let listHtml = "";
      if (escenariosGuardados.length === 0) {
        listHtml = `<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:13px;">No hay ning\xFAn escenario guardado actualmente.</div>`;
      } else {
        escenariosGuardados.forEach((esc, idx) => {
          const isCurrent = JSON.stringify(state) === JSON.stringify(esc.state);
          listHtml += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid #eee; background:${isCurrent ? "#fbfcfe" : "#fff"}; border-left:${isCurrent ? "4px solid #C5A059" : "4px solid transparent"};">
            <div>
              <div style="font-size:15px; font-weight:600; color:var(--navy); margin-bottom:4px;">${escapeHTML(esc.nombre)} ${isCurrent ? '<span style="font-size:10px; background:#C5A059; color:white; padding:2px 6px; border-radius:4px; margin-left:8px;">En Uso</span>' : ""}</div>
              <div style="font-size:11px; color:var(--text-muted);">Guardado el: ${new Date(esc.timestamp).toLocaleString()}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <button onclick="App.loadEscenario(${idx})" class="btn-primary" style="padding:6px 12px; font-size:12px;">Cargar</button>
              <button onclick="App.deleteEscenario(${idx})" style="padding:6px 12px; font-size:12px; font-weight:600; border-radius:4px; background:#E8A090; color:white; border:none; cursor:pointer;">Borrar</button>
            </div>
          </div>
        `;
        });
      }
      return `<div class="section-header">
      <div>
        <div class="section-title">Gesti\xF3n de Escenarios (Ejercicios)</div>
        <div class="section-sub">Guarda o restaura momentos espec\xEDficos de tus par\xE1metros financieros.</div>
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      
      <div class="card" style="padding:0; overflow:hidden;">
        <div style="padding:16px; background:#f9fbfd; border-bottom:1px solid #e1e8ed;">
          <h3 style="font-size:14px; color:var(--navy); font-weight:600">Archivos Abiertos Localmente</h3>
        </div>
        <div style="max-height:400px; overflow-y:auto;">
          ${listHtml}
        </div>
      </div>
      
      <div class="card" style="padding:24px; align-self:start;">
        <h3 style="font-size:14px; color:var(--navy); margin-bottom:12px; font-weight:600">Guardar Estado Actual</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:20px; line-height:1.5;">Al guardar, tomar\xE1s una copia exacta de todas las hojas, precios de tickets, construcciones y egresos calculados hasta este segundo. Podr\xE1s recargarla intacta m\xE1s adelante.</p>
        
        <label style="font-size:11px; text-transform:uppercase; color:var(--text-muted); display:block; margin-bottom:6px">Nombre del Ejercicio (Escenario)</label>
        <div style="display:flex; gap:12px;">
          <input type="text" id="nuevo-escenario-nombre" placeholder="Ej. Escenario Conservador Alta Comisi\xF3n" style="flex:1; border:1px solid #ddd; padding:10px; border-radius:4px; font-size:13px;">
          <button onclick="App.saveEscenario()" class="btn-primary" style="padding:10px 20px; font-size:13px;">Guardar</button>
        </div>
        
        <div style="margin-top:32px; padding-top:20px; border-top:1px solid #eee;">
          <h4 style="font-size:12px; font-weight:600; color:#E8A090; margin-bottom:8px;">Peligro</h4>
          <button onclick="App.resetToFactory()" style="width:100%; padding:10px; font-size:13px; font-weight:600; color:#E8A090; background:none; border:1px solid #E8A090; border-radius:4px; cursor:pointer;">Restaurar Sesi\xF3n Original (Vaciar todo)</button>
        </div>
      </div>

    </div>`;
    }
    function renderEscenariosFinancieros() {
      const v = state.variables;
      const anios = Number(v.aniosProyeccion) || 10;
      const inflacion = (Number(v.inflacionAnualRentas) || 0) / 100;
      const adminPct = (Number(v.costoAdminRentasPct) || 0) / 100;
      const maxTickets = Number(v.numTicketsMax) || 1;
      const m2ComercialPB = Number(v.m2ComercialPB) || 0;
      const rentaM2Comercial = Number(v.rentaM2Comercial) || 0;
      const m2HotelNivel1 = Number(v.m2HotelNivel1) || 0;
      const rentaM2HotelNivel1 = Number(v.rentaM2HotelNivel1) || 0;
      const m2HotelNivel2 = Number(v.m2HotelNivel2) || 0;
      const rentaM2HotelNivel2 = Number(v.rentaM2HotelNivel2) || 0;
      const ingresoRentasMensualBase = m2ComercialPB * rentaM2Comercial + m2HotelNivel1 * rentaM2HotelNivel1 + m2HotelNivel2 * rentaM2HotelNivel2;
      const cochesDiarios = Number(v.cochesDiarios) || 350;
      const precioCoche = Number(v.precioPorCoche) || 50;
      const ingresoEstacionamientoMensualBase = v.incluyeEstacionamiento !== false ? cochesDiarios * precioCoche * 30 : 0;
      let html = `<div class="section-header">
      <div>
        <div class="section-title">Escenarios Financieros Din\xE1micos</div>
        <div class="section-sub">Ajuste de ocupaci\xF3n anual para estresar el modelo financiero sin afectar el baseline a 100%</div>
      </div>
    </div>`;
      html += `<div class="card" style="padding:24px; margin-bottom:24px; overflow-x:auto;">
      <h3 style="font-size:14px; color:var(--navy); margin-bottom:16px; font-weight:600">Configuraci\xF3n de Ocupaci\xF3n por A\xF1o</h3>
      <table style="width:100%; min-width:800px; border-collapse:collapse; font-size:12px; text-align:center;">
        <thead>
          <tr style="border-bottom:1px solid #eee;">
            <th style="padding:8px; text-align:left;">Flujo de Ingreso</th>`;
      for (let i = 1; i <= anios; i++) {
        html += `<th style="padding:8px;">A\xF1o ${i}</th>`;
      }
      html += `</tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:12px 8px; text-align:left; font-weight:600; color:var(--navy);">Ocupaci\xF3n Rentas M\xB2</td>`;
      for (let i = 0; i < anios; i++) {
        const val = v.ocupacionRentas[i] || 100;
        html += `<td style="padding:12px 4px;">
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div style="position:relative; width:100%; max-width:56px;">
              <input type="number" class="form-input" min="0" max="100" step="1" 
                value="${val}" style="width:100%; text-align:center; padding:6px 12px 6px 6px; font-weight:600; color:#C5A059;"
                onchange="App.updateOcupacion('ocupacionRentas', ${i}, this.value)">
              <span style="position:absolute; right:8px; top:50%; transform:translateY(-50%); font-size:11px; color:#C5A059; pointer-events:none;">%</span>
            </div>
          </div>
        </td>`;
      }
      html += `</tr>`;
      if (v.incluyeEstacionamiento !== false) {
        html += `<tr>
            <td style="padding:12px 8px; text-align:left; font-weight:600; color:var(--navy);">Ocupaci\xF3n Estacionamiento</td>`;
        for (let i = 0; i < anios; i++) {
          const val = v.ocupacionEstacionamiento[i] || 100;
          html += `<td style="padding:12px 4px;">
            <div style="display:flex; flex-direction:column; align-items:center;">
               <div style="position:relative; width:100%; max-width:56px;">
                <input type="number" class="form-input" min="0" max="100" step="1"
                  value="${val}" style="width:100%; text-align:center; padding:6px 12px 6px 6px; font-weight:600; color:#2ecc71;"
                   onchange="App.updateOcupacion('ocupacionEstacionamiento', ${i}, this.value)">
                <span style="position:absolute; right:8px; top:50%; transform:translateY(-50%); font-size:11px; color:#2ecc71; pointer-events:none;">%</span>
              </div>
            </div>
          </td>`;
        }
        html += `</tr>`;
      }
      html += `
        </tbody>
      </table>
    </div>`;
      let headersHTML = ``;
      state.tickets.forEach((ticket) => {
        if (ticket.cantidad > 0) {
          headersHTML += `<th style="padding:12px 16px; font-weight:600; text-align:center; border-left:1px solid #eee;">Rend. ${ticket.nombre}<br><span style="font-size:10px; font-weight:400; color:var(--text-muted);">${M(ticket.precio)}</span></th>`;
        }
      });
      html += `
    <div class="card" style="padding:0; overflow-x:auto;">
      <table style="width:100%; text-align:right; border-collapse:collapse; font-size:${isPDFMode ? "10px" : "12px"}; min-width:${isPDFMode ? "900px" : "1150px"};">
        <thead>
          <tr style="border-bottom:2px solid #eee; background:#f9fbfd; color:var(--navy);">
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600; text-align:left;">A\xF1o de Operaci\xF3n</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ocup.<br>Renta</th>
            ${v.incluyeEstacionamiento !== false ? `<th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ocup.<br>Estac.</th>` : ""}
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ingreso Ajustado Rentas (Bruto)</th>
            ${v.incluyeEstacionamiento !== false ? `<th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Ingreso Ajustado<br>Estacionamiento</th>` : ""}
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Costo Admin. (${(adminPct * 100).toFixed(1)}%)</th>
            <th style="padding:${isPDFMode ? "8px 10px" : "12px 16px"}; font-weight:600;">Utilidad Neta Ponderada</th>
            ${headersHTML}
          </tr>
        </thead>
        <tbody>`;
      let rentasAcumuladoBruto = ingresoRentasMensualBase * 12;
      let estacAcumuladoBruto = ingresoEstacionamientoMensualBase * 12;
      for (let yr = 0; yr < anios; yr++) {
        if (yr > 0) {
          rentasAcumuladoBruto = rentasAcumuladoBruto * (1 + inflacion);
          estacAcumuladoBruto = estacAcumuladoBruto * (1 + inflacion);
        }
        const pctRent = (v.ocupacionRentas[yr] !== void 0 ? v.ocupacionRentas[yr] : 100) / 100;
        const pctEstac = (v.ocupacionEstacionamiento[yr] !== void 0 ? v.ocupacionEstacionamiento[yr] : 100) / 100;
        const ingresoNetoRentas = rentasAcumuladoBruto * pctRent;
        const ingresoNetoEstacionamiento = estacAcumuladoBruto * pctEstac;
        const ingresoBrutoTotal = ingresoNetoRentas + ingresoNetoEstacionamiento;
        const costoAdmin = ingresoBrutoTotal * adminPct;
        const utilidadNetaPool = ingresoBrutoTotal - costoAdmin;
        const utilidadPorTicket = utilidadNetaPool / maxTickets;
        let yieldColumns = ``;
        state.tickets.forEach((ticket) => {
          if (ticket.cantidad > 0) {
            const rendimientoPct = utilidadPorTicket / (Number(ticket.precio) || 1) * 100;
            yieldColumns += `<td style="padding:12px 16px; font-weight:600; color:var(--navy); text-align:center; border-left:1px solid #f5f5f5;">${rendimientoPct.toFixed(2)}%</td>`;
          }
        });
        html += `
          <tr style="border-bottom:1px solid #f5f5f5;">
            <td style="padding:12px 16px; text-align:left; font-weight:500; color:var(--navy);">A\xF1o ${yr + 1}</td>
            <td style="padding:12px 16px; font-weight:600; color:#C5A059; background:rgba(197, 160, 89, 0.05);">${(pctRent * 100).toFixed(0)}%</td>
            ${v.incluyeEstacionamiento !== false ? `<td style="padding:12px 16px; font-weight:600; color:#2ecc71; background:rgba(46, 204, 113, 0.05);">${(pctEstac * 100).toFixed(0)}%</td>` : ""}
            <td style="padding:12px 16px; color:var(--text-muted);">${M(ingresoNetoRentas)}</td>
            ${v.incluyeEstacionamiento !== false ? `<td style="padding:12px 16px; color:var(--text-muted);">${M(ingresoNetoEstacionamiento)}</td>` : ""}
            <td style="padding:12px 16px; color:#E8A090;">- ${M(costoAdmin)}</td>
            <td style="padding:12px 16px; font-weight:600; color:#2ecc71;">${M(utilidadNetaPool)}</td>
            ${yieldColumns}
          </tr>`;
      }
      html += `
        </tbody>
      </table>
    </div>`;
      return html;
    }
    function renderProjectSelector() {
      const el = document.getElementById("project-selector");
      if (!el) return;
      if (projectsList.length === 0) {
        el.innerHTML = '<div class="proj-sel-empty">Sin proyectos</div>';
        return;
      }
      const options = projectsList.map(
        (p) => `<option value="${p.id}" ${p.id === currentProjectId ? "selected" : ""}>${escapeHTML(p.nombre)}</option>`
      ).join("");
      const adminBtn = currentRole === "admin" ? `<button class="proj-sel-btn" onclick="App.navigate('proyectos')" title="Gestionar proyectos">
           <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
             <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
           </svg>
         </button>` : "";
      el.innerHTML = `<div class="proj-sel-wrap">
      <select class="proj-sel-select" onchange="App.switchProject(this.value)">${options}</select>
      ${adminBtn}
    </div>`;
    }
    function updateAdminVisibility() {
      const isAdmin = currentRole === "admin";
      document.querySelectorAll(".nav-admin-only").forEach((el) => {
        el.style.display = isAdmin ? "" : "none";
      });
      const roleEl = document.getElementById("user-role-badge");
      if (roleEl) {
        const labels = { admin: "Administrador", editor: "Editor", viewer: "Solo lectura" };
        const colors = { admin: "#C5A059", editor: "#3A8F6C", viewer: "#888" };
        roleEl.textContent = labels[currentRole] || currentRole;
        roleEl.style.background = colors[currentRole] || "#888";
      }
    }
    async function switchProject(projectId) {
      if (projectId === currentProjectId) return;
      try {
        await fetch("/api/projects/current", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId })
        });
        currentProjectId = projectId;
        [state, escenariosDb] = await Promise.all([loadState(), loadEscenarios()]);
        if (!state.showroomItems) state.showroomItems = JSON.parse(JSON.stringify(DEFAULTS.showroomItems));
        if (!state.obraItems) state.obraItems = JSON.parse(JSON.stringify(DEFAULTS.obraItems));
        state.tickets.forEach((t) => {
          if (t.esAportado === void 0) t.esAportado = t.nombre === "Capital Tierra";
          if (t.esTerrenoFijo === void 0) t.esTerrenoFijo = t.nombre === "Capital Tierra" && t.esAportado;
        });
        renderProjectSelector();
        navigate("dashboard");
      } catch (_) {
        alert("Error al cambiar de proyecto.");
      }
    }
    function renderProyectos() {
      const isAdmin = currentRole === "admin";
      const rows = projectsList.map((p) => {
        const isCurrent = p.id === currentProjectId;
        const fecha = new Date(p.createdAt).toLocaleDateString("es-MX");
        return `<tr style="background:${isCurrent ? "rgba(197,160,89,.07)" : "#fff"}; border-bottom:1px solid #eee;">
        <td style="padding:12px 16px; font-weight:${isCurrent ? "600" : "400"}; color:var(--navy);">
          ${escapeHTML(p.nombre)}
          ${isCurrent ? '<span style="font-size:10px;background:#C5A059;color:#fff;padding:2px 7px;border-radius:10px;margin-left:8px;">Activo</span>' : ""}
        </td>
        <td style="padding:12px 16px; color:#666; font-size:13px;">${escapeHTML(p.descripcion) || "\u2014"}</td>
        <td style="padding:12px 16px; color:#999; font-size:12px;">${fecha}</td>
        <td style="padding:12px 16px; display:flex; gap:6px; flex-wrap:wrap;">
          ${!isCurrent ? `<button onclick="App.switchProject('${p.id}')" class="btn-accion btn-accion-primario">Activar</button>` : ""}
          ${isAdmin && !isCurrent ? `<button onclick="App.deleteProject('${p.id}')" class="btn-accion btn-accion-peligro">Borrar</button>` : ""}
        </td>
      </tr>`;
      }).join("") || `<tr><td colspan="4" style="padding:24px;text-align:center;color:#999;">Sin proyectos registrados.</td></tr>`;
      const formNuevo = isAdmin ? `
      <div class="admin-form-box">
        <h3 class="admin-form-title">Nuevo Proyecto</h3>
        <div style="display:grid;gap:10px;max-width:420px;">
          <input id="new-proj-nombre" class="form-input" placeholder="Nombre del proyecto" data-is-text="1">
          <input id="new-proj-desc"   class="form-input" placeholder="Descripci\xF3n (opcional)" data-is-text="1">
          <button onclick="App.createProject()" class="btn-full-report" style="width:auto;padding:9px 20px;">Crear Proyecto</button>
        </div>
      </div>` : "";
      return `<div class="view-section">
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#f5f5f5;font-size:11px;text-transform:uppercase;color:#888;letter-spacing:.5px;">
          <th style="padding:10px 16px;text-align:left;">Nombre</th>
          <th style="padding:10px 16px;text-align:left;">Descripci\xF3n</th>
          <th style="padding:10px 16px;text-align:left;">Creado</th>
          <th style="padding:10px 16px;text-align:left;">Acciones</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${formNuevo}
    </div>`;
    }
    function renderUsuarios() {
      const rolLabel = { admin: "Administrador", editor: "Editor", viewer: "Solo lectura" };
      const rolColor = { admin: "#C5A059", editor: "#3A8F6C", viewer: "#888" };
      const rows = usersDb.map((u) => {
        return `<tr style="border-bottom:1px solid #eee;">
        <td style="padding:12px 16px; font-weight:500; color:var(--navy);">${escapeHTML(u.name)}</td>
        <td style="padding:12px 16px; color:#555; font-size:13px;">${escapeHTML(u.email)}</td>
        <td style="padding:12px 16px;">
          <span style="font-size:11px;background:${rolColor[u.role]};color:#fff;padding:2px 8px;border-radius:10px;">${rolLabel[u.role] || u.role}</span>
        </td>
        <td style="padding:12px 16px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <select onchange="App.updateUserRole(${u.id}, this.value)" style="font-size:12px;padding:3px 6px;border:1px solid #ddd;border-radius:4px;cursor:pointer;">
            <option value="admin"  ${u.role === "admin" ? "selected" : ""}>Admin</option>
            <option value="editor" ${u.role === "editor" ? "selected" : ""}>Editor</option>
            <option value="viewer" ${u.role === "viewer" ? "selected" : ""}>Viewer</option>
          </select>
          <button onclick="App.deleteUser(${u.id})" class="btn-accion btn-accion-peligro">Borrar</button>
        </td>
      </tr>`;
      }).join("") || `<tr><td colspan="4" style="padding:24px;text-align:center;color:#999;">Sin usuarios registrados.</td></tr>`;
      return `<div class="view-section">
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#f5f5f5;font-size:11px;text-transform:uppercase;color:#888;letter-spacing:.5px;">
          <th style="padding:10px 16px;text-align:left;">Nombre</th>
          <th style="padding:10px 16px;text-align:left;">Correo</th>
          <th style="padding:10px 16px;text-align:left;">Rol</th>
          <th style="padding:10px 16px;text-align:left;">Acciones</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="admin-form-box">
        <h3 class="admin-form-title">Nuevo Usuario</h3>
        <div style="display:grid;gap:10px;max-width:420px;">
          <input id="new-user-name"     class="form-input" placeholder="Nombre" data-is-text="1">
          <input id="new-user-email"    class="form-input" placeholder="Correo electr\xF3nico" data-is-text="1">
          <input id="new-user-pwd"      class="form-input" placeholder="Contrase\xF1a" type="password" data-is-text="1">
          <select id="new-user-role"    style="font-size:13px;padding:8px 10px;border:1px solid #ddd;border-radius:6px;background:#fff;">
            <option value="viewer">Solo lectura</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
          <button onclick="App.createUser()" class="btn-full-report" style="width:auto;padding:9px 20px;">Crear Usuario</button>
        </div>
      </div>
    </div>`;
    }
    async function createProject() {
      const nombre = document.getElementById("new-proj-nombre")?.value.trim();
      const desc = document.getElementById("new-proj-desc")?.value.trim();
      if (!nombre) {
        alert("Ingresa un nombre para el proyecto.");
        return;
      }
      const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nombre, descripcion: desc }) });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error al crear proyecto");
        return;
      }
      projectsList.push({ id: data.id, nombre, descripcion: desc, createdAt: Date.now() });
      renderProjectSelector();
      navigate("proyectos");
    }
    async function deleteProject(id) {
      if (!confirm("\xBFBorrar este proyecto y todos sus datos? Esta acci\xF3n no se puede deshacer.")) return;
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Error al borrar proyecto");
        return;
      }
      projectsList = projectsList.filter((p) => p.id !== id);
      renderProjectSelector();
      navigate("proyectos");
    }
    async function createUser() {
      const name = document.getElementById("new-user-name")?.value.trim();
      const email = document.getElementById("new-user-email")?.value.trim();
      const pwd = document.getElementById("new-user-pwd")?.value;
      const role = document.getElementById("new-user-role")?.value;
      if (!email || !pwd) {
        alert("Correo y contrase\xF1a son requeridos.");
        return;
      }
      const res = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password: pwd, role }) }).catch(() => ({ ok: true, json: () => ({ id: Date.now() }) }));
      const data = await res.json();
      usersDb.push({ id: data.id || Date.now(), name: name || email, email, role: role || "viewer" });
      saveUsers();
      navigate("usuarios");
    }
    async function deleteUser(id) {
      if (!confirm("\xBFEliminar este usuario permanentemente?")) return;
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" }).catch(() => ({ ok: true }));
      usersDb = usersDb.filter((u) => u.id !== id);
      saveUsers();
      navigate("usuarios");
    }
    async function updateUserRole(id, role) {
      const res = await fetch(`/api/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role }) }).catch(() => ({ ok: true }));
      const u = usersDb.find((u2) => u2.id === id);
      if (u) u.role = role;
      saveUsers();
      navigate("usuarios");
    }
    function addInversionista() {
      const nombre = document.getElementById("inv_nombre").value;
      const correo = document.getElementById("inv_correo").value;
      const faseId = parseInt(document.getElementById("inv_fase").value);
      const tickets = parseInt(document.getElementById("inv_tickets").value);
      if (!nombre || isNaN(faseId) || isNaN(tickets) || tickets <= 0) {
        alert("Por favor completa los campos obligatorios");
        return;
      }
      const fase = state.tickets.find((t) => t.id === faseId);
      if (!fase) return;
      const nuevo = {
        id: Date.now(),
        nombre,
        correo,
        faseId,
        faseNombre: fase.nombre,
        tickets,
        precioPactado: fase.precio,
        montoPactado: fase.precio * tickets,
        fechaRegistro: (/* @__PURE__ */ new Date()).toISOString(),
        estatus: "Activo"
      };
      if (!state.inversionistas) state.inversionistas = [];
      state.inversionistas.push(nuevo);
      saveState();
      navigate("ledger");
    }
    function deleteInversionista(id) {
      if (!confirm("\xBFEliminar inversionista y todos sus pagos asociados?")) return;
      state.inversionistas = state.inversionistas.filter((i) => i.id !== id);
      state.pagos = (state.pagos || []).filter((p) => p.inversionistaId !== id);
      saveState();
      navigate("ledger");
    }
    function addPago() {
      const invId = parseInt(document.getElementById("pago_inv").value);
      const monto = parseFloat(document.getElementById("pago_monto").value);
      const fecha = document.getElementById("pago_fecha").value;
      const metodo = document.getElementById("pago_metodo").value;
      if (isNaN(invId) || isNaN(monto) || monto <= 0 || !fecha) {
        alert("Completa los datos del pago");
        return;
      }
      const nuevoPago = {
        id: Date.now() + 1,
        // evitar colisión
        inversionistaId: invId,
        monto,
        fecha,
        metodo
      };
      if (!state.pagos) state.pagos = [];
      state.pagos.push(nuevoPago);
      saveState();
      navigate("ledger");
    }
    function deletePago(id) {
      if (!confirm("\xBFEliminar este registro de pago?")) return;
      state.pagos = state.pagos.filter((p) => p.id !== id);
      saveState();
      navigate("ledger");
    }
    function renderLedger() {
      const invs = state.inversionistas || [];
      const pagos = state.pagos || [];
      const ticketsFases = (state.tickets || []).filter((t) => !t.esAportado);
      let totalRecaudado = pagos.reduce((s, p) => s + p.monto, 0);
      let totalPactado = invs.reduce((s, i) => s + i.montoPactado, 0);
      let html = `
      <div class="section-header">
        <div>
          <div class="section-title">Levantamiento de Capital</div>
          <div class="section-sub">Seguimiento Real de Inversionistas (Ledger)</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
        <div class="kpi-card" data-tooltip="Total de capital comprometido en contratos firmados.">
          <div class="kpi-label">Comprometido <span class="info-icon">i</span></div>
          <div class="kpi-value">${M(totalPactado)}</div>
        </div>
        <div class="kpi-card status-high" data-tooltip="Capital total ingresado a caja por abonos reales.">
          <div class="kpi-label">Recaudado <span class="info-icon">i</span></div>
          <div class="kpi-value">${M(totalRecaudado)}</div>
        </div>
        <div class="kpi-card ${totalPactado - totalRecaudado > 0 ? "status-mid" : ""}" data-tooltip="Saldo pendiente por cobrar de los contratos vigentes.">
          <div class="kpi-label">Por Cobrar <span class="info-icon">i</span></div>
          <div class="kpi-value">${M(totalPactado - totalRecaudado)}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
        <!-- Registro Inversionista -->
        <div class="card" style="padding:20px;">
          <h3 class="admin-form-title">Nuevo Inversionista</h3>
          <div class="form-grid" style="grid-template-columns: 1fr; gap:12px;">
            <div class="form-group">
              <label>Nombre Completo / Raz\xF3n Social</label>
              <input type="text" id="inv_nombre" placeholder="Ej: Juan P\xE9rez">
            </div>
            <div class="form-group">
              <label>Correo Electr\xF3nico</label>
              <input type="email" id="inv_correo" placeholder="ejemplo@correo.com">
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <div class="form-group">
                <label>Fase de Entrada</label>
                <select id="inv_fase">
                  ${ticketsFases.map((t) => `<option value="${t.id}">${t.nombre} (${M(t.precio)})</option>`).join("")}
                </select>
              </div>
              <div class="form-group">
                <label>Tickets</label>
                <input type="number" id="inv_tickets" value="1" min="1">
              </div>
            </div>
            <button class="btn-primary" onclick="App.addInversionista()" style="width:100%; margin-top:8px;">Registrar Inversionista</button>
          </div>
        </div>

        <!-- Registro de Pago -->
        <div class="card" style="padding:20px;">
          <h3 class="admin-form-title">Registrar Abono / Pago</h3>
          <div class="form-grid" style="grid-template-columns: 1fr; gap:12px;">
            <div class="form-group">
              <label>Inversionista</label>
              <select id="pago_inv">
                ${invs.map((i) => `<option value="${i.id}">${i.nombre}</option>`).join("")}
              </select>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <div class="form-group">
                <label>Monto del Abono</label>
                <input type="number" id="pago_monto" placeholder="$ 0">
              </div>
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" id="pago_fecha" value="${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}">
              </div>
            </div>
            <div class="form-group">
              <label>M\xE9todo de Pago</label>
              <select id="pago_metodo">
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Aportaci\xF3n">Aportaci\xF3n</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <button class="btn-primary" onclick="App.addPago()" style="width:100%; margin-top:8px;">Confirmar Pago</button>
          </div>
        </div>
      </div>

      <!-- Tabla de Inversionistas -->
      <div class="card" style="margin-bottom:24px;">
        <div style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:13px; font-weight:600; margin:0;">Seguimiento de Socios</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Inversionista</th>
              <th>Fase</th>
              <th class="text-right">Tickets</th>
              <th class="text-right">Pactado</th>
              <th class="text-right">Pagado</th>
              <th class="text-right">Saldo</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${invs.length === 0 ? '<tr><td colspan="7" class="text-center" style="padding:30px; color:var(--text-muted);">No hay inversionistas registrados a\xFAn.</td></tr>' : ""}
            ${invs.map((i) => {
        const pagado = pagos.filter((p) => p.inversionistaId === i.id).reduce((s, p) => s + p.monto, 0);
        const saldo = i.montoPactado - pagado;
        const statusClass = saldo <= 0 ? "value-high" : "value-mid";
        return `
                <tr>
                  <td>
                    <div style="font-weight:600; color:var(--navy);">${escapeHTML(i.nombre)}</div>
                    <div style="font-size:10px; color:var(--text-muted);">${escapeHTML(i.correo)}</div>
                  </td>
                  <td><span class="status-indicator">${i.faseNombre}</span></td>
                  <td class="text-right">${i.tickets}</td>
                  <td class="text-right">${M(i.montoPactado)}</td>
                  <td class="text-right ${statusClass}">${M(pagado)}</td>
                  <td class="text-right ${saldo > 0 ? "value-low" : ""}">${M(saldo)}</td>
                  <td class="text-center">
                    <button class="btn-table-action" onclick="App.deleteInversionista(${i.id})" title="Eliminar inversionista">\u{1F5D1}</button>
                  </td>
                </tr>
              `;
      }).join("")}
          </tbody>
        </table>
      </div>

      <!-- Libro Diario (\xDAltimos pagos) -->
      <div class="card">
        <div style="padding:16px; border-bottom:1px solid rgba(0,0,0,0.05);">
          <h3 style="font-size:13px; font-weight:600; margin:0;">Libro Diario de Pagos</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Inversionista</th>
              <th>Fase</th>
              <th>M\xE9todo</th>
              <th class="text-right">Monto</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${pagos.length === 0 ? '<tr><td colspan="6" class="text-center" style="padding:30px; color:var(--text-muted);">No se han registrado pagos todav\xEDa.</td></tr>' : ""}
            ${pagos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).map((p) => {
        const inv = invs.find((i) => i.id === p.inversionistaId) || { nombre: "N/A", faseNombre: "N/A" };
        return `
                <tr>
                  <td>${p.fecha}</td>
                  <td style="font-weight:600;">${escapeHTML(inv.nombre)}</td>
                  <td>${escapeHTML(inv.faseNombre)}</td>
                  <td><span class="status-indicator">${escapeHTML(p.metodo)}</span></td>
                  <td class="text-right" style="font-weight:700; color:var(--status-high);">${M(p.monto)}</td>
                  <td class="text-center">
                    <button class="btn-table-action" onclick="App.deletePago(${p.id})" title="Eliminar pago">\u{1F5D1}</button>
                  </td>
                </tr>
              `;
      }).join("")}
          </tbody>
        </table>
      </div>
    `;
      return html;
    }
    const RENDERERS = {
      dashboard: renderDashboard,
      parametros: renderParametros,
      tickets: renderTickets,
      egresos: renderEgresos,
      construccion: renderConstruccion,
      plusvalia: renderPlusvalia,
      proyeccion: renderProyeccion,
      escenarios: renderEscenarios,
      "escenarios-financieros": renderEscenariosFinancieros,
      reportes: renderReportes,
      proyectos: renderProyectos,
      usuarios: renderUsuarios,
      ledger: renderLedger
    };
    const VIEW_TITLES = {
      dashboard: "Proyectos 4L",
      parametros: "Par\xE1metros Base",
      tickets: "Estrategia de Tickets",
      egresos: "Presupuesto Operativo",
      construccion: "Costos de Construcci\xF3n",
      plusvalia: "Plusval\xEDa y Mercado",
      proyeccion: "Corrida Financiera",
      escenarios: "Gesti\xF3n de Escenarios",
      "escenarios-financieros": "Escenarios Financieros",
      reportes: "Reportes e Indicadores",
      proyectos: "Gesti\xF3n de Proyectos",
      usuarios: "Gesti\xF3n de Usuarios",
      ledger: "Libro de Inversiones"
    };
    function destroyCharts() {
      charts.forEach((c) => c.destroy());
      charts = [];
    }
    function navigate(view) {
      if (!RENDERERS[view]) view = "dashboard";
      currentView = view;
      renderGeneration++;
      const gen = renderGeneration;
      document.querySelectorAll(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.view === view));
      const titleEl = document.getElementById("content-title");
      if (titleEl) titleEl.textContent = VIEW_TITLES[view] || view;
      const body = document.getElementById("content-body");
      if (body) {
        destroyCharts();
        try {
          body.innerHTML = RENDERERS[view]();
        } catch (renderErr) {
          console.error('Render error for view "' + view + '":', renderErr);
          body.innerHTML = '<div style="padding:32px; color:#c00;">Error al renderizar vista. Recarga la p\xE1gina.<br><small>' + escapeHTML(renderErr.message) + "</small></div>";
          return;
        }
        attachInputListeners();
        if (view === "reportes") {
          setTimeout(() => {
            if (renderGeneration === gen) initReportesCharts();
          }, 50);
        }
      } else {
        console.error("content-body element not found in DOM");
      }
    }
    function saveInput(e) {
      const el = e.target;
      if (el.classList.contains("showroom-input")) {
        const idx = parseInt(el.dataset.index);
        const field = el.dataset.field;
        if (!state.showroomItems) state.showroomItems = [];
        if (field === "nombre") {
          state.showroomItems[idx][field] = el.value;
        } else {
          const raw = parseFloat(String(el.value).replace(/[$,\s]/g, ""));
          state.showroomItems[idx][field] = isNaN(raw) ? 0 : raw;
        }
        saveState();
        navigate("egresos");
        return;
      }
      if (el.classList.contains("obra-input")) {
        const idx = parseInt(el.dataset.index);
        const field = el.dataset.field;
        if (!state.obraItems) state.obraItems = [];
        if (field === "nombre") {
          state.obraItems[idx][field] = el.value;
        } else {
          const raw = parseFloat(String(el.value).replace(/[$,\s]/g, ""));
          state.obraItems[idx][field] = isNaN(raw) ? 0 : raw;
        }
        saveState();
        navigate("construccion");
        return;
      }
      if (el.classList.contains("ticket-input")) {
        const idx = el.dataset.index;
        const field = el.dataset.field;
        if (el.dataset.isText) {
          state.tickets[idx][field] = el.value;
        } else {
          const raw = parseFloat(String(el.value).replace(/[$,\\s]/g, ""));
          state.tickets[idx][field] = isNaN(raw) ? 0 : raw;
        }
        saveState();
        navigate("tickets");
        return;
      }
      const key = el.dataset.key;
      const nested = el.dataset.nested;
      if (!key) return;
      if (el.dataset.isText) {
        const validation = validateField(key, el.value, true);
        if (!validation.valid) {
          showInputError(el, validation.message);
          return;
        }
        clearInputError(el);
        if (nested) {
          if (!state[nested]) state[nested] = {};
          state[nested][key] = el.value;
        } else {
          state[key] = el.value;
        }
      } else {
        const raw = parseFloat(String(el.value).replace(/[$,\\s]/g, ""));
        if (isNaN(raw)) {
          showInputError(el, "Debe ser un n\xFAmero v\xE1lido");
          return;
        }
        const validation = validateField(key, raw, false);
        if (!validation.valid) {
          showInputError(el, validation.message);
          if (validation.clamped !== void 0) {
            const clamped = validation.clamped;
            if (nested) {
              if (!state[nested]) state[nested] = {};
              state[nested][key] = clamped;
            } else {
              state[key] = clamped;
            }
          }
          return;
        }
        clearInputError(el);
        if (nested) {
          if (!state[nested]) state[nested] = {};
          state[nested][key] = raw;
        } else {
          state[key] = raw;
        }
      }
      saveState();
      if (state.variables.aportaTerreno && (key === "valorTerrenoAportado" || key === "precioTicketTerreno")) {
        syncCapitalTierraTicket();
        saveState();
      }
      if (["egresos", "parametros", "construccion", "plusvalia", "proyeccion", "tickets", "reportes"].includes(currentView)) {
        navigate(currentView);
      }
    }
    function addTicketTier() {
      state.tickets.push({
        id: Date.now(),
        nombre: "Nueva Fase",
        cantidad: 0,
        precio: 0
      });
      saveState();
      navigate("tickets");
    }
    function removeTicketTier(index) {
      state.tickets.splice(index, 1);
      saveState();
      navigate("tickets");
    }
    function syncCapitalTierraTicket() {
      const v = state.variables;
      const valor = Number(v.valorTerrenoAportado) || 36e6;
      const precio = Number(v.precioTicketTerreno) || 36e4;
      const cantidad = Math.floor(valor / precio);
      const t = state.tickets.find((tk) => tk.esTerrenoFijo);
      if (t) {
        t.cantidad = cantidad;
        t.precio = precio;
      }
    }
    function toggleAportaTerreno() {
      if (!state.variables) state.variables = {};
      state.variables.aportaTerreno = !state.variables.aportaTerreno;
      if (state.variables.aportaTerreno) syncCapitalTierraTicket();
      saveState();
      navigate(currentView);
    }
    function toggleIncluyeEstacionamiento() {
      if (!state.variables) state.variables = {};
      state.variables.incluyeEstacionamiento = state.variables.incluyeEstacionamiento === false ? true : false;
      saveState();
      navigate(currentView);
    }
    function selectPlusvaliaTicket(idx) {
      if (!state.variables) state.variables = {};
      state.variables.selectedPlusvaliaTicketIdx = parseInt(idx);
      saveState();
      navigate(currentView);
    }
    function addShowroomItem() {
      if (!state.showroomItems) state.showroomItems = [];
      state.showroomItems.push({ nombre: "Nuevo Concepto", cantidad: 1, costo: 0 });
      saveState();
      navigate("egresos");
    }
    function removeShowroomItem(index) {
      if (!state.showroomItems) return;
      state.showroomItems.splice(index, 1);
      saveState();
      navigate("egresos");
    }
    function addObraItem() {
      if (!state.obraItems) state.obraItems = [];
      state.obraItems.push({ nombre: "", cantidad: 1, costo: 0 });
      saveState();
      navigate("construccion");
    }
    function removeObraItem(index) {
      if (!state.obraItems) return;
      state.obraItems.splice(index, 1);
      saveState();
      navigate("construccion");
    }
    function toggleTicketAportado(index) {
      if (!state.tickets[index]) return;
      state.tickets[index].esAportado = !state.tickets[index].esAportado;
      saveState();
      navigate("tickets");
    }
    function attachInputListeners() {
      const body = document.getElementById("content-body");
      if (!body) return;
      body.querySelectorAll(".form-input").forEach((el) => {
        el.addEventListener("change", saveInput);
        if (el.type === "range") {
          el.addEventListener("input", handleRangeInput);
        }
      });
    }
    function handleRangeInput(e) {
      const el = e.target;
      const key = el.dataset.key;
      const span = document.getElementById("val-" + key);
      const bubble = document.getElementById("bubble-" + key);
      if (!span && !bubble) return;
      let formatted = el.value;
      if (key === "aniosProyeccion") formatted += " A\xF1os";
      else if (key === "mesesLevantamiento") formatted += " Meses";
      else formatted += "%";
      if (span) span.textContent = formatted;
      if (bubble) {
        bubble.textContent = formatted;
        const min = parseFloat(el.min) || 0;
        const max = parseFloat(el.max) || 100;
        const val = parseFloat(el.value);
        const percent = (val - min) / (max - min) * 100;
        bubble.style.left = `calc(${percent}% + ${12 - percent * 0.24}px)`;
      }
    }
    async function _captureFullElement(el, scale, bgColor) {
      const clipped = [];
      [el, ...el.querySelectorAll("*")].forEach((node) => {
        const cs = window.getComputedStyle(node);
        if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") {
          clipped.push({ node, ov: node.style.overflow, ox: node.style.overflowX, oy: node.style.overflowY });
          node.style.overflow = "visible";
          node.style.overflowX = "visible";
          node.style.overflowY = "visible";
        }
      });
      try {
        return await html2canvas(el, {
          scale: scale || 2.4,
          // Resolución premium (aprox 220-300 dpi en A4)
          useCORS: true,
          allowTaint: true,
          backgroundColor: bgColor || "#ffffff",
          // Fondo sólido para evitar transparencias
          logging: false,
          foreignObjectRendering: false,
          scrollX: 0,
          scrollY: 0
        });
      } finally {
        clipped.forEach(({ node, ov, ox, oy }) => {
          node.style.overflow = ov;
          node.style.overflowX = ox;
          node.style.overflowY = oy;
        });
      }
    }
    function _addCanvasToPage(doc, canvas, PAGE_W, PAGE_H, MARGIN, pageTitle, pageNum, totalPages) {
      const printW = PAGE_W - MARGIN * 2;
      const printH = PAGE_H - MARGIN * 3;
      const ar = canvas.width / canvas.height;
      let imgW = printW, imgH = imgW / ar;
      if (imgH > printH) {
        imgH = printH;
        imgW = imgH * ar;
      }
      const x = MARGIN + (printW - imgW) / 2;
      const y = MARGIN + 6 + (printH - imgH) / 2;
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.03 }));
      doc.setFontSize(40);
      doc.setTextColor(30, 41, 59);
      doc.text("PROYECTOS 4L \xB7 PROYECTOS 4L \xB7 PROYECTOS 4L", PAGE_W / 2, PAGE_H / 2, { align: "center", angle: 45 });
      doc.restoreGraphicsState();
      doc.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", x, y, imgW, imgH);
      doc.setFillColor(30, 41, 59);
      doc.rect(MARGIN, MARGIN, 2, 8, "F");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.setFont("Montserrat", "bold");
      doc.text(pageTitle ? pageTitle.toUpperCase() : "", MARGIN + 4, MARGIN + 6);
      doc.setFont("Montserrat", "normal");
      const proyecto = state.variables && state.variables.proyecto ? state.variables.proyecto : "L&L";
      doc.setTextColor(160, 160, 160);
      doc.text(proyecto.toUpperCase(), PAGE_W - MARGIN, MARGIN + 6, { align: "right" });
      const footerY = PAGE_H - MARGIN;
      doc.setDrawColor(220, 220, 220);
      doc.line(MARGIN, footerY - 4, PAGE_W - MARGIN, footerY - 4);
      doc.setFontSize(7);
      doc.setTextColor(180, 180, 180);
      doc.text(`CONFIDENCIAL \xB7 PROPIEDAD DE PROYECTOS 4L \xB7 ${(/* @__PURE__ */ new Date()).getFullYear()}`, MARGIN, footerY);
      doc.text(`P\xC1GINA ${pageNum} DE ${totalPages}`, PAGE_W - MARGIN, footerY, { align: "right" });
      doc.setTextColor(197, 160, 89);
      doc.text("ESTE DOCUMENTO ES UNA SIMULACI\xD3N FINANCIERA Y NO REPRESENTA UNA OFERTA VINCULANTE.", PAGE_W / 2, footerY, { align: "center" });
    }
    function _waitForPDFLibs(timeout) {
      return new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
          if (typeof html2canvas !== "undefined" && window.jspdf) {
            resolve();
            return;
          }
          if (Date.now() - start > (timeout || 1e4)) {
            reject(new Error("Librer\xEDas de PDF no disponibles"));
            return;
          }
          setTimeout(check, 200);
        };
        check();
      });
    }
    async function exportCurrentViewToPDF() {
      const element = document.getElementById("content-body");
      if (!element) {
        alert("No hay contenido para exportar.");
        return;
      }
      try {
        await _waitForPDFLibs(8e3);
      } catch (_) {
        alert("Librer\xEDas de PDF a\xFAn cargando. Intenta de nuevo en unos segundos.");
        return;
      }
      const btn = document.querySelector('[onclick="App.exportCurrentViewToPDF()"]');
      if (btn) {
        btn.textContent = "\u23F3 Generando...";
        btn.style.opacity = "0.6";
        btn.style.pointerEvents = "none";
      }
      let wasDark = false;
      try {
        wasDark = document.body.classList.contains("dark-mode");
        if (wasDark) document.body.classList.remove("dark-mode");
        document.body.classList.add("pdf-export-active");
        isPDFMode = true;
        navigate(currentView);
        await new Promise((r) => setTimeout(r, 600));
        const capW = element.scrollWidth;
        const capH = element.scrollHeight;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          foreignObjectRendering: false,
          scrollX: 0,
          scrollY: 0,
          width: capW,
          height: capH,
          windowWidth: capW,
          windowHeight: capH
        });
        const { jsPDF } = window.jspdf;
        const MARGIN = 7;
        const ar = canvas.width / canvas.height;
        const orientation = ar >= 0.8 ? "landscape" : "portrait";
        const PAGE_W = orientation === "landscape" ? 297 : 210;
        const PAGE_H = orientation === "landscape" ? 210 : 297;
        const doc = new jsPDF({ unit: "mm", format: "a4", orientation });
        _addCanvasToPage(doc, canvas, PAGE_W, PAGE_H, MARGIN, currentView.toUpperCase(), 1, 1);
        const proyecto = state.variables && state.variables.proyecto ? state.variables.proyecto.replace(/\s+/g, "_") : "vista";
        doc.save(`${currentView}-${proyecto}.pdf`);
      } catch (err) {
        alert("Error al generar el PDF. Intenta de nuevo.");
      } finally {
        isPDFMode = false;
        document.body.classList.remove("pdf-export-active");
        if (wasDark) document.body.classList.add("dark-mode");
        navigate(currentView);
        if (btn) {
          btn.textContent = "Vista actual";
          btn.style.opacity = "";
          btn.style.pointerEvents = "";
        }
      }
    }
    async function exportFullReport() {
      try {
        await _waitForPDFLibs(8e3);
      } catch (_) {
        alert("Librer\xEDas de PDF a\xFAn cargando. Intenta de nuevo en unos segundos.");
        return;
      }
      const btn = document.getElementById("btn-full-report");
      const { jsPDF } = window.jspdf;
      const PAGE_W = 297, PAGE_H = 210, MARGIN = 8;
      const fecha = (/* @__PURE__ */ new Date()).toLocaleDateString("es-MX");
      const proyecto = state.variables && state.variables.proyecto ? state.variables.proyecto : "Proyecto 4L";
      const savedView = currentView;
      const savedTabs = {
        activeParamTab: state.variables.activeParamTab,
        activeProyeccionTab: state.variables.activeProyeccionTab,
        activeReportTab: state.variables.activeReportTab
      };
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(30,41,59,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;";
      overlay.innerHTML = `
      <div style="font-size:20px;font-weight:700;color:#C5A059;font-family:sans-serif;">Generando Presentaci\xF3n PDF</div>
      <div id="pdf-prog" style="font-size:13px;color:rgba(255,255,255,0.7);font-family:sans-serif;">Preparando portada...</div>
      <div style="width:340px;height:6px;background:rgba(255,255,255,0.15);border-radius:3px;overflow:hidden;">
        <div id="pdf-bar" style="height:100%;width:2%;background:linear-gradient(90deg,#C5A059,#e8c870);border-radius:3px;transition:width 0.4s;"></div>
      </div>
      <div id="pdf-page-label" style="font-size:11px;color:rgba(255,255,255,0.35);font-family:sans-serif;"></div>`;
      document.body.appendChild(overlay);
      if (btn) btn.disabled = true;
      const setProgress = (label, pct, sub) => {
        const p = document.getElementById("pdf-prog");
        const b = document.getElementById("pdf-bar");
        const s = document.getElementById("pdf-page-label");
        if (p) p.textContent = label;
        if (b) b.style.width = Math.max(2, pct) + "%";
        if (s) s.textContent = sub || "";
      };
      const pages = [
        { view: "dashboard", title: "Dashboard" },
        { view: "parametros", title: "Par\xE1metros \u2014 Generales", set: { activeParamTab: "generales" } },
        { view: "parametros", title: "Par\xE1metros \u2014 Rentas y Tarifas", set: { activeParamTab: "rentas" } },
        ...state.variables.incluyeEstacionamiento !== false ? [{ view: "parametros", title: "Par\xE1metros \u2014 Estacionamiento", set: { activeParamTab: "estacionamiento" } }] : [],
        { view: "parametros", title: "Par\xE1metros \u2014 Estructura Fiduciaria", set: { activeParamTab: "fiduciaria" } },
        { view: "tickets", title: "Estrategia de Tickets" },
        { view: "egresos", title: "Presupuesto de Egresos" },
        { view: "construccion", title: "Costo de Construcci\xF3n y Preoperativos" },
        { view: "plusvalia", title: "An\xE1lisis de Plusval\xEDa y Mercado" },
        { view: "proyeccion", title: "Corrida \u2014 Flujo Operativo Anual", set: { activeProyeccionTab: "flujo" } },
        { view: "proyeccion", title: "Corrida \u2014 Rendimiento por Fase", set: { activeProyeccionTab: "ticket" } },
        { view: "proyeccion", title: "Corrida \u2014 Recuperaci\xF3n Acumulada", set: { activeProyeccionTab: "acumulado" } },
        { view: "reportes", title: "Reportes \u2014 Ingresos Operativos", set: { activeReportTab: "ingresos" } },
        { view: "reportes", title: "Reportes \u2014 Construcci\xF3n vs Mercado", set: { activeReportTab: "construccion" } },
        { view: "reportes", title: "Reportes \u2014 Plusval\xEDa Especulativa", set: { activeReportTab: "plusvalia" } },
        { view: "escenarios-financieros", title: "Escenarios Financieros" }
      ];
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
      const GState = doc.GState;
      doc.setFillColor(25, 35, 50);
      doc.rect(0, 0, PAGE_W, PAGE_H, "F");
      doc.setDrawColor(197, 160, 89);
      doc.setLineWidth(0.5);
      doc.rect(MARGIN, MARGIN, PAGE_W - MARGIN * 2, PAGE_H - MARGIN * 2, "S");
      let logoData = null;
      try {
        const logoEl = document.querySelector(".brand-logo-wrap img");
        if (logoEl && logoEl.complete) {
          const lc = document.createElement("canvas");
          lc.width = logoEl.naturalWidth;
          lc.height = logoEl.naturalHeight;
          lc.getContext("2d").drawImage(logoEl, 0, 0);
          logoData = lc.toDataURL("image/png");
          const lH = 45;
          const lW = lH * (lc.width / lc.height);
          doc.addImage(logoData, "PNG", (PAGE_W - lW) / 2, 40, lW, lH);
        }
      } catch (e) {
      }
      doc.setTextColor(197, 160, 89);
      doc.setFont("Montserrat", "normal");
      doc.setFontSize(10);
      doc.text("ESTRATEGIA PATRIMONIAL & FINANCIERA", PAGE_W / 2, 95, { align: "center", charSpace: 3 });
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont("Montserrat", "bold");
      doc.text(proyecto.toUpperCase(), PAGE_W / 2, 115, { align: "center", charSpace: 1 });
      doc.setDrawColor(197, 160, 89);
      doc.setLineWidth(1);
      doc.line(PAGE_W / 2 - 40, 125, PAGE_W / 2 + 40, 125);
      doc.setFontSize(14);
      doc.setFont("Montserrat", "normal");
      doc.setTextColor(180, 180, 180);
      doc.text("LIBERTAD \xB7 LOCURA \xB7 LIDERAZGO \xB7 LEGADO", PAGE_W / 2, 140, { align: "center", charSpace: 2 });
      doc.setFontSize(10);
      doc.setTextColor(100, 110, 130);
      doc.text(`MEXICO, ${(/* @__PURE__ */ new Date()).getFullYear()}  |  REPORTE DE INVERSI\xD3N`, PAGE_W / 2, 180, { align: "center" });
      doc.addPage();
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, PAGE_W, PAGE_H, "F");
      doc.setFillColor(30, 41, 59);
      doc.rect(MARGIN, MARGIN, 2, 12, "F");
      doc.setFontSize(18);
      doc.setTextColor(30, 41, 59);
      doc.setFont("Montserrat", "bold");
      doc.text("CONTENIDO DEL REPORTE", MARGIN + 6, MARGIN + 9);
      doc.setFontSize(10);
      doc.setFont("Montserrat", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Haz clic en cualquier secci\xF3n para navegar directamente.", MARGIN + 6, MARGIN + 16);
      let currentY = MARGIN + 30;
      const col1X = MARGIN + 10;
      const col2X = PAGE_W / 2 + 10;
      pages.forEach((p, idx) => {
        const isCol2 = idx >= Math.ceil(pages.length / 2);
        const x = isCol2 ? col2X : col1X;
        const y = isCol2 ? MARGIN + 30 + (idx - Math.ceil(pages.length / 2)) * 10 : MARGIN + 30 + idx * 10;
        doc.setFillColor(197, 160, 89);
        doc.circle(x - 5, y - 1, 1, "F");
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(11);
        doc.text(p.title, x, y);
        p.pageNumInPdf = idx + 3;
        doc.link(x, y - 4, 80, 6, { pageNumber: p.pageNumInPdf });
      });
      let wasDark = false;
      try {
        wasDark = document.body.classList.contains("dark-mode");
        if (wasDark) document.body.classList.remove("dark-mode");
        document.body.classList.add("pdf-export-active");
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          setProgress(
            page.title,
            Math.round((i + 0.5) / pages.length * 100),
            `P\xE1gina ${i + 1} de ${pages.length}`
          );
          if (page.set) Object.assign(state.variables, page.set);
          isPDFMode = true;
          navigate(page.view);
          const waitMs = page.view === "reportes" || page.view === "proyeccion" || page.view === "dashboard" ? 600 : 300;
          await new Promise((r) => setTimeout(r, waitMs));
          const el = document.getElementById("content-body");
          if (!el) continue;
          const capW = el.scrollWidth;
          const capH = el.scrollHeight;
          const canvas = await html2canvas(el, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            foreignObjectRendering: false,
            scrollX: 0,
            scrollY: 0,
            width: capW,
            height: capH,
            windowWidth: capW,
            windowHeight: capH
          });
          const pageAr = canvas.width / canvas.height;
          const pageOrientation = pageAr >= 0.8 ? "landscape" : "portrait";
          const pW = pageOrientation === "landscape" ? 297 : 210;
          const pH = pageOrientation === "landscape" ? 210 : 297;
          doc.addPage({ orientation: pageOrientation, format: "a4" });
          const totalPags = pages.length + 2;
          _addCanvasToPage(doc, canvas, pW, pH, MARGIN, page.title, i + 3, totalPags);
          setProgress(page.title, Math.round((i + 1) / pages.length * 100), `P\xE1gina ${i + 3} de ${totalPags} \u2014 OK`);
        }
        doc.save(`reporte-${proyecto.replace(/\s+/g, "_")}.pdf`);
      } catch (err) {
        console.error("Error al generar presentaci\xF3n:", err);
        alert("Error al generar la presentaci\xF3n. Abre la consola para m\xE1s detalles.");
      } finally {
        isPDFMode = false;
        document.body.classList.remove("pdf-export-active");
        if (wasDark) document.body.classList.add("dark-mode");
        Object.assign(state.variables, savedTabs);
        navigate(savedView);
        document.body.removeChild(overlay);
        if (btn) {
          btn.disabled = false;
          btn.textContent = "\u{1F4CA} Generar Presentaci\xF3n PDF";
        }
      }
    }
    async function logout() {
      try {
        await fetch("/api/logout", { method: "POST" });
      } catch (_) {
      }
      const portal = document.getElementById("login-portal");
      if (portal) {
        portal.style.display = "flex";
        portal.classList.remove("lp-exit");
        document.getElementById("lp-email").value = "";
        document.getElementById("lp-pwd").value = "";
        portal.style.animation = "none";
        portal.offsetHeight;
        portal.style.animation = "";
      }
      localStorage.removeItem("lyl_mock_auth");
      const btn = document.getElementById("lp-btn");
      const txt = document.getElementById("lp-btn-text");
      const spin = document.getElementById("lp-btn-spin");
      if (btn) btn.disabled = false;
      if (txt) txt.style.display = "";
      if (spin) spin.style.display = "none";
    }
    function saveEscenario() {
      const nameInput = document.getElementById("nuevo-escenario-nombre");
      if (!nameInput) return;
      const nombre = nameInput.value.trim() || "Escenario sin nombre";
      const item = { nombre, timestamp: Date.now(), state: JSON.parse(JSON.stringify(state)) };
      escenariosDb.push(item);
      fetch("/api/escenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }).catch(() => {
        localStorage.setItem("lil_escenarios_db", JSON.stringify(escenariosDb));
      });
      navigate("escenarios");
    }
    function loadEscenario(index) {
      if (escenariosDb[index]) {
        state = JSON.parse(JSON.stringify(escenariosDb[index].state));
        saveState();
        navigate("escenarios");
      }
    }
    function deleteEscenario(index) {
      if (!confirm("\xBFEst\xE1s seguro de que deseas borrar este ejercicio guardado?")) return;
      if (index < 0 || index >= escenariosDb.length) return;
      escenariosDb.splice(index, 1);
      fetch(`/api/escenarios/${index}`, { method: "DELETE" }).catch(() => {
        localStorage.setItem("lil_escenarios_db", JSON.stringify(escenariosDb));
      });
      navigate("escenarios");
    }
    function resetToFactory() {
      if (!confirm("\u26A0\uFE0F PELIGRO: Esto borrar\xE1 todos tus cambios actuales y restaurar\xE1 el modelo Financiero a sus valores base. Tus 'Ejercicios' guardados NO se borrar\xE1n. \xBFContinuar?")) return;
      state = JSON.parse(JSON.stringify(DEFAULTS));
      saveState();
      navigate("dashboard");
    }
    function exportCSV() {
      alert("Modulo de Exportaci\xF3n CSV en construcci\xF3n para el Modelo Inmobiliario");
    }
    function toggleSidebar() {
      const app = document.getElementById("app-layout");
      if (app) {
        const collapsed = app.classList.toggle("sidebar-collapsed");
        localStorage.setItem("lil_sidebar_collapsed", collapsed ? "1" : "0");
      }
    }
    function updateOcupacion(tipo, index, value) {
      if (!state.variables[tipo]) {
        state.variables[tipo] = Array(20).fill(100);
      }
      let num = Number(value);
      if (isNaN(num)) num = 100;
      if (num < 0) num = 0;
      if (num > 100) num = 100;
      state.variables[tipo][index] = num;
      saveState();
      navigate("escenarios-financieros");
    }
    function switchParamTab(tab) {
      if (!state.variables) state.variables = {};
      state.variables.activeParamTab = tab;
      navigate("parametros");
    }
    function switchProyeccionTab(tab) {
      if (!state.variables) state.variables = {};
      state.variables.activeProyeccionTab = tab;
      navigate("proyeccion");
    }
    async function init() {
      try {
        const mockAuth = JSON.parse(localStorage.getItem("lyl_mock_auth") || "null");
        currentRole = mockAuth?.role || "admin";
        try {
          const s = localStorage.getItem("lyl_bienraiz_state");
          state = (s ? JSON.parse(s) : null) || JSON.parse(JSON.stringify(DEFAULTS));
        } catch (_) {
          state = JSON.parse(JSON.stringify(DEFAULTS));
        }
        try {
          escenariosDb = JSON.parse(localStorage.getItem("lil_escenarios_db") || "[]");
        } catch (_) {
          escenariosDb = [];
        }
        try {
          const u = localStorage.getItem("lil_users_db");
          usersDb = u ? JSON.parse(u) : [];
        } catch (_) {
          usersDb = [];
        }
        if (!state.variables) state.variables = JSON.parse(JSON.stringify(DEFAULTS.variables));
        if (!state.tickets) state.tickets = JSON.parse(JSON.stringify(DEFAULTS.tickets));
        if (!state.egresos) state.egresos = JSON.parse(JSON.stringify(DEFAULTS.egresos));
        if (!state.showroomItems) state.showroomItems = JSON.parse(JSON.stringify(DEFAULTS.showroomItems));
        if (!state.obraItems) state.obraItems = JSON.parse(JSON.stringify(DEFAULTS.obraItems));
        let stateDirty = false;
        if (Array.isArray(state.tickets)) {
          state.tickets.forEach((t) => {
            if (t.esAportado === void 0) {
              t.esAportado = t.nombre === "Capital Tierra";
              stateDirty = true;
            }
            if (t.esTerrenoFijo === void 0) {
              t.esTerrenoFijo = t.nombre === "Capital Tierra" && t.esAportado;
              stateDirty = true;
            }
          });
        }
        if (stateDirty) saveState();
        const layout = document.getElementById("app-layout");
        if (layout) {
          layout.classList.toggle("role-viewer", currentRole === "viewer");
          layout.classList.toggle("role-admin", currentRole === "admin");
          layout.classList.toggle("role-editor", currentRole === "editor");
        }
        renderProjectSelector();
        updateAdminVisibility();
        document.querySelectorAll(".nav-item[data-view]").forEach(
          (el) => el.addEventListener("click", () => navigate(el.dataset.view))
        );
        document.addEventListener("focus", (e) => {
          const el = e.target;
          if (!el.matches("input.form-input") || el.dataset.isText) return;
          const v = parseFloat(String(el.value).replace(/[$,\s]/g, ""));
          if (!isNaN(v)) el.value = v;
        }, true);
        document.addEventListener("blur", (e) => {
          const el = e.target;
          if (!el.matches("input.form-input") || el.dataset.isText) return;
          const v = parseFloat(String(el.value).replace(/[$,\s]/g, ""));
          if (!isNaN(v)) el.value = MXN2.format(v);
        }, true);
        navigate("dashboard");
        try {
          const [authInfo, loadedState, loadedScenarios, loadedUsers] = await Promise.all([
            fetch("/api/check-auth", { signal: AbortSignal.timeout(5e3) }).then((r) => r.json()).catch(() => ({})),
            loadState(),
            loadEscenarios(),
            loadUsers()
          ]);
          if (mockAuth && !authInfo.authenticated) {
            Object.assign(authInfo, mockAuth, { authenticated: true });
          }
          const serverRole = authInfo.role || currentRole;
          currentProjectId = authInfo.currentProjectId || null;
          projectsList = authInfo.projects || [];
          if (Array.isArray(loadedUsers) && loadedUsers.length > 0) usersDb = loadedUsers;
          if (Array.isArray(loadedScenarios)) escenariosDb = loadedScenarios;
          const stateChanged = loadedState && JSON.stringify(loadedState) !== JSON.stringify(state);
          const roleChanged = serverRole !== currentRole;
          if (stateChanged) state = loadedState;
          if (roleChanged) {
            currentRole = serverRole;
            const l2 = document.getElementById("app-layout");
            if (l2) {
              l2.classList.toggle("role-viewer", currentRole === "viewer");
              l2.classList.toggle("role-admin", currentRole === "admin");
              l2.classList.toggle("role-editor", currentRole === "editor");
            }
            updateAdminVisibility();
          }
          if (stateChanged || roleChanged) {
            renderProjectSelector();
            navigate(currentView);
          }
        } catch (_) {
        }
      } catch (err) {
        console.error("Critical Init Error:", err);
        state = JSON.parse(JSON.stringify(DEFAULTS));
        navigate("dashboard");
      }
    }
    return {
      init,
      navigate,
      exportCSV,
      exportCurrentViewToPDF,
      exportFullReport,
      toggleSidebar,
      addTicketTier,
      removeTicketTier,
      addShowroomItem,
      removeShowroomItem,
      addObraItem,
      removeObraItem,
      toggleTicketAportado,
      toggleAportaTerreno,
      toggleIncluyeEstacionamiento,
      selectPlusvaliaTicket,
      saveEscenario,
      loadEscenario,
      deleteEscenario,
      resetToFactory,
      resetState: resetToFactory,
      switchReportTab,
      switchParamTab,
      switchProyeccionTab,
      updateOcupacion,
      logout,
      toggleTheme: () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("lyl_theme", isDark ? "dark" : "light");
      },
      // Roles y proyectos
      switchProject,
      createProject,
      deleteProject,
      // Gestión de usuarios
      createUser,
      deleteUser,
      updateUserRole,
      // Ledger
      addInversionista,
      deleteInversionista,
      addPago,
      deletePago
    };
  })();
  window.App = App;
  App.init().catch(function(e) {
    console.error("App.init fall\xF3:", e);
    try {
      App.navigate("dashboard");
    } catch (_) {
    }
  });
})();
