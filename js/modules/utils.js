/**
 * Utilidades generales: debounce, formateo de moneda.
 */

/**
 * Crea una función debounced que retrasa la ejecución hasta que pasen `ms`
 * milisegundos sin que se vuelva a invocar.
 * Retorna un objeto con .call(args) y .cancel()
 */
export function debounce(fn, ms) {
  let timer = null;
  function debounced(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, ms);
  }
  debounced.cancel = () => {
    if (timer) { clearTimeout(timer); timer = null; }
  };
  debounced.pending = () => timer !== null;
  return debounced;
}

/**
 * Formateador de moneda MXN.
 */
export const MXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const M = (val) => MXN.format(val || 0);
