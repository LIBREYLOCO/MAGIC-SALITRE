/**
 * Cálculos financieros puros — sin dependencia de estado ni DOM.
 * Extraídos de app.js para ser testeables independientemente.
 */

/**
 * Calcula el ingreso mensual por rentas (sin estacionamiento).
 */
export function calcMonthlyRent(m2Comercial, rentaComercial, m2Hotel1, rentaHotel1, m2Hotel2, rentaHotel2) {
  return (m2Comercial * rentaComercial) + (m2Hotel1 * rentaHotel1) + (m2Hotel2 * rentaHotel2);
}

/**
 * Calcula el ingreso mensual por estacionamiento.
 */
export function calcParkingIncome(cochesDiarios, precioPorCoche) {
  return cochesDiarios * precioPorCoche * 30;
}

/**
 * Calcula el cap rate bruto anual.
 * @returns porcentaje (e.g. 18.5)
 */
export function calcCapRate(annualIncome, totalCapital) {
  if (!totalCapital || totalCapital === 0) return 0;
  return (annualIncome / totalCapital) * 100;
}

/**
 * Calcula egresos totales del levantamiento.
 */
export function calcTotalEgresos(egresos, meses, entradasVendidas) {
  const fijoMes = (egresos.nominaAdmin || 0) + (egresos.nominaVentas || 0) +
    (egresos.gastosContables || 0) + (egresos.gastosLegales || 0) +
    (egresos.rentaLugar || 0) + (egresos.gastosPublicidad || 0) +
    (egresos.gastosRepresentacion || 0);
  const egresosFijos = fijoMes * meses;
  const comision = entradasVendidas * ((egresos.comisionVentasPct || 0) / 100);
  const acop = (egresos.acopOficina || 0) + (egresos.acopMaqueta || 0) +
    (egresos.acopRenders || 0) + (egresos.acopFotos || 0) + (egresos.acopMedia || 0);
  return { egresosFijos, comision, acop, total: egresosFijos + acop + comision };
}

/**
 * Calcula el costo total de obra civil.
 */
export function calcCostoObra(obraItems) {
  return (obraItems || []).reduce((s, it) => s + (Number(it.cantidad) * Number(it.costo)), 0);
}

/**
 * Genera la proyección anual unificada (corrida financiera).
 * @param {number} rentaMensualBase - Ingreso mensual por rentas
 * @param {number} estacMensualBase - Ingreso mensual por estacionamiento
 * @param {number} anios - Años de proyección
 * @param {number} inflacion - Tasa de inflación decimal (ej: 0.05)
 * @param {number} adminPct - Porcentaje de admin decimal (ej: 0.12)
 * @param {number} maxTickets - Total de tickets emitidos
 * @param {number[]} [ocupRentas] - Ocupación por año (0-100), default 100
 * @param {number[]} [ocupEstac] - Ocupación estac por año (0-100), default 100
 * @returns {Array<{pctRent, pctEstac, ingresoNetoRentas, ingresoNetoEstac, costoAdmin, utilidadPool, utilidadPorTicket}>}
 */
export function calcYearlyProjection(rentaMensualBase, estacMensualBase, anios, inflacion, adminPct, maxTickets, ocupRentas, ocupEstac) {
  const data = [];
  let curRentas = rentaMensualBase * 12;
  let curEstac = estacMensualBase * 12;

  for (let yr = 0; yr < anios; yr++) {
    if (yr > 0) {
      curRentas *= (1 + inflacion);
      curEstac *= (1 + inflacion);
    }

    const pctRent = ocupRentas ? (ocupRentas[yr] !== undefined ? ocupRentas[yr] : 100) / 100 : 1;
    const pctEstac = ocupEstac ? (ocupEstac[yr] !== undefined ? ocupEstac[yr] : 100) / 100 : 1;

    const ingresoNetoRentas = curRentas * pctRent;
    const ingresoNetoEstac = curEstac * pctEstac;
    const ingresoBruto = ingresoNetoRentas + ingresoNetoEstac;
    const costoAdmin = ingresoBruto * adminPct;
    const utilidadPool = ingresoBruto - costoAdmin;
    const utilidadPorTicket = maxTickets > 0 ? utilidadPool / maxTickets : 0;

    data.push({
      pctRent, pctEstac,
      ingresoNetoRentas, ingresoNetoEstac,
      ingresoBruto, costoAdmin, utilidadPool, utilidadPorTicket
    });
  }
  return data;
}

/**
 * Calcula el año de recuperación de inversión (breakeven).
 * @param {number} ticketPrice - Precio del ticket
 * @param {Array<{utilidadPorTicket: number}>} yearlyData - Datos anuales
 * @returns {number} Años para recuperar (fraccional). -1 si nunca se recupera en el periodo.
 */
export function calcRecoveryYears(ticketPrice, yearlyData) {
  if (!ticketPrice || ticketPrice <= 0 || !yearlyData || yearlyData.length === 0) return -1;

  let acumulado = 0;
  for (let yr = 0; yr < yearlyData.length; yr++) {
    acumulado += yearlyData[yr].utilidadPorTicket;
    if (acumulado >= ticketPrice) {
      // Interpolar fracción del año
      const prevAcumulado = acumulado - yearlyData[yr].utilidadPorTicket;
      const faltante = ticketPrice - prevAcumulado;
      const fraccion = yearlyData[yr].utilidadPorTicket > 0 ? faltante / yearlyData[yr].utilidadPorTicket : 1;
      return yr + fraccion;
    }
  }
  return -1; // No se recupera en el periodo
}

/**
 * Calcula la plusvalía de un ticket respecto al valor de mercado.
 * @returns {{ montoAbsoluto: number, porcentaje: number }}
 */
export function calcPlusvalia(ticketPrecio, m2PorTicket, precioMercadoM2) {
  const valorFraccion = m2PorTicket * precioMercadoM2;
  const montoAbsoluto = valorFraccion - ticketPrecio;
  const porcentaje = ticketPrecio > 0 ? ((valorFraccion / ticketPrecio) - 1) * 100 : 0;
  return { montoAbsoluto, porcentaje, valorFraccion };
}

/**
 * Calcula métricas de tickets agregadas.
 */
export function calcTicketMetrics(tickets, maxTickets, pctModelo) {
  const ticketsModelo = Math.floor(maxTickets * (pctModelo / 100));
  const totalConfigured = tickets.reduce((s, t) => s + (Number(t.cantidad) || 0), 0);
  const entradasPactadas = tickets.reduce((s, t) => s + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
  const entradasVendidas = tickets.filter(t => !t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0) * (Number(t.precio) || 0), 0);
  const aportados = tickets.filter(t => t.esAportado).reduce((s, t) => s + (Number(t.cantidad) || 0), 0);
  return {
    ticketsModelo,
    totalConfigured,
    entradasPactadas,
    entradasVendidas,
    aportados,
    remaining: maxTickets - ticketsModelo - totalConfigured
  };
}
