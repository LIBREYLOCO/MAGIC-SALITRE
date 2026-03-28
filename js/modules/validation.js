/**
 * Validación de inputs con feedback visual.
 * Reglas por tipo de campo.
 */

const RULES = {
  // Variables financieras
  capitalRequerido:         { min: 0, max: 99_999_999_999, label: 'Capital Requerido' },
  numTicketsMax:            { min: 1, max: 100_000, label: 'Total Tickets' },
  m2ComercialPB:            { min: 0, max: 1_000_000, label: 'M² Comercial' },
  rentaM2Comercial:         { min: 0, max: 100_000, label: 'Renta/M² Comercial' },
  m2HotelNivel1:            { min: 0, max: 1_000_000, label: 'M² Hotel N1' },
  rentaM2HotelNivel1:       { min: 0, max: 100_000, label: 'Renta/M² Hotel N1' },
  m2HotelNivel2:            { min: 0, max: 1_000_000, label: 'M² Hotel N2' },
  rentaM2HotelNivel2:       { min: 0, max: 100_000, label: 'Renta/M² Hotel N2' },
  capacidadEstacionamiento: { min: 0, max: 100_000, label: 'Capacidad Estacionamiento' },
  cochesDiarios:            { min: 0, max: 100_000, label: 'Coches Diarios' },
  precioPorCoche:           { min: 0, max: 10_000, label: 'Precio por Coche' },
  valorFideicomiso:         { min: 0, max: 99_999_999_999, label: 'Valor Fideicomiso' },
  costoFideicomisoMensual:  { min: 0, max: 99_999_999, label: 'Costo Fideicomiso Mensual' },
  aniosProyeccion:          { min: 1, max: 20, label: 'Años de Proyección' },
  inflacionAnualRentas:     { min: 0, max: 50, label: 'Inflación Anual' },
  costoAdminRentasPct:      { min: 0, max: 100, label: 'Costo Admin %' },
  pctTicketsModelo:         { min: 0, max: 50, label: '% Tickets Modelo' },
  costoM2Construccion:      { min: 0, max: 999_999, label: 'Costo M² Construcción' },
  precioMercadoActualM2:    { min: 0, max: 999_999, label: 'Precio Mercado M²' },
  valorTerrenoAportado:     { min: 0, max: 99_999_999_999, label: 'Valor Terreno' },
  precioTicketTerreno:      { min: 0, max: 99_999_999, label: 'Precio Ticket Terreno' },
  // Egresos
  nominaAdmin:              { min: 0, max: 99_999_999, label: 'Nómina Admin' },
  nominaVentas:             { min: 0, max: 99_999_999, label: 'Nómina Ventas' },
  gastosContables:          { min: 0, max: 99_999_999, label: 'Gastos Contables' },
  gastosLegales:            { min: 0, max: 99_999_999, label: 'Gastos Legales' },
  rentaLugar:               { min: 0, max: 99_999_999, label: 'Renta Lugar' },
  gastosPublicidad:         { min: 0, max: 99_999_999, label: 'Publicidad' },
  gastosRepresentacion:     { min: 0, max: 99_999_999, label: 'Representación' },
  comisionVentasPct:        { min: 0, max: 30, label: 'Comisión Ventas %' },
  mesesLevantamiento:       { min: 1, max: 60, label: 'Meses Levantamiento' },
  // Texto
  proyecto:                 { maxLength: 200, type: 'text', label: 'Nombre del Proyecto' },
};

/**
 * Valida un valor contra las reglas del campo.
 * @returns {{ valid: boolean, message?: string, clamped?: number }}
 */
export function validateField(key, value, isText) {
  const rule = RULES[key];
  if (!rule) return { valid: true }; // sin regla = permitido

  if (isText || rule.type === 'text') {
    const str = String(value || '');
    if (rule.maxLength && str.length > rule.maxLength) {
      return { valid: false, message: `${rule.label}: máximo ${rule.maxLength} caracteres` };
    }
    return { valid: true };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, message: `${rule.label}: debe ser un número válido` };
  }
  if (rule.min !== undefined && num < rule.min) {
    return { valid: false, message: `${rule.label}: mínimo ${rule.min}`, clamped: rule.min };
  }
  if (rule.max !== undefined && num > rule.max) {
    return { valid: false, message: `${rule.label}: máximo ${rule.max.toLocaleString()}`, clamped: rule.max };
  }
  return { valid: true };
}

/**
 * Muestra un error visual en un input.
 */
export function showInputError(el, message) {
  el.style.borderColor = '#E8A090';
  el.style.boxShadow = '0 0 0 2px rgba(232,160,144,0.3)';

  // Remover error previo si existe
  const prev = el.parentElement.querySelector('.input-error-msg');
  if (prev) prev.remove();

  const errDiv = document.createElement('div');
  errDiv.className = 'input-error-msg';
  errDiv.style.cssText = 'font-size:10px; color:#E8A090; margin-top:2px; font-weight:500;';
  errDiv.textContent = message;
  el.parentElement.appendChild(errDiv);

  // Auto-limpiar después de 3s
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
    if (errDiv.parentElement) errDiv.remove();
  }, 3000);
}

/**
 * Limpia indicadores de error de un input.
 */
export function clearInputError(el) {
  el.style.borderColor = '';
  el.style.boxShadow = '';
  const prev = el.parentElement.querySelector('.input-error-msg');
  if (prev) prev.remove();
}
