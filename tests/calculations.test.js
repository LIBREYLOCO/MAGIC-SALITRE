import { describe, it, expect } from 'vitest';
import {
  calcMonthlyRent,
  calcParkingIncome,
  calcCapRate,
  calcTotalEgresos,
  calcCostoObra,
  calcYearlyProjection,
  calcRecoveryYears,
  calcPlusvalia,
  calcTicketMetrics
} from '../js/modules/calculations.js';

// ── Rentas mensuales ─────────────────────────────────────────────────
describe('calcMonthlyRent', () => {
  it('suma correctamente todas las fuentes de renta', () => {
    // 3000m² × $450 + 3000m² × $300 + 3000m² × $250 = 1,350,000 + 900,000 + 750,000
    expect(calcMonthlyRent(3000, 450, 3000, 300, 3000, 250)).toBe(3_000_000);
  });

  it('retorna 0 cuando no hay m²', () => {
    expect(calcMonthlyRent(0, 450, 0, 300, 0, 250)).toBe(0);
  });

  it('retorna 0 cuando las rentas son 0', () => {
    expect(calcMonthlyRent(3000, 0, 3000, 0, 3000, 0)).toBe(0);
  });

  it('maneja valores parciales', () => {
    expect(calcMonthlyRent(1000, 100, 0, 0, 0, 0)).toBe(100_000);
  });
});

// ── Estacionamiento ──────────────────────────────────────────────────
describe('calcParkingIncome', () => {
  it('calcula ingreso mensual correctamente', () => {
    // 350 coches × $50 × 30 días = $525,000
    expect(calcParkingIncome(350, 50)).toBe(525_000);
  });

  it('retorna 0 sin coches', () => {
    expect(calcParkingIncome(0, 50)).toBe(0);
  });

  it('retorna 0 sin precio', () => {
    expect(calcParkingIncome(350, 0)).toBe(0);
  });
});

// ── Cap Rate ─────────────────────────────────────────────────────────
describe('calcCapRate', () => {
  it('calcula porcentaje correcto', () => {
    // $36M anual / $200M capital = 18%
    expect(calcCapRate(36_000_000, 200_000_000)).toBeCloseTo(18.0);
  });

  it('retorna 0 con capital 0', () => {
    expect(calcCapRate(36_000_000, 0)).toBe(0);
  });

  it('retorna 0 con ingreso 0', () => {
    expect(calcCapRate(0, 200_000_000)).toBe(0);
  });

  it('maneja valores pequeños', () => {
    expect(calcCapRate(1000, 10000)).toBeCloseTo(10.0);
  });
});

// ── Egresos totales ──────────────────────────────────────────────────
describe('calcTotalEgresos', () => {
  const egresos = {
    nominaAdmin: 80000,
    nominaVentas: 150000,
    gastosContables: 30000,
    gastosLegales: 60000,
    rentaLugar: 20000,
    gastosPublicidad: 150000,
    gastosRepresentacion: 50000,
    acopOficina: 150000,
    acopMaqueta: 120000,
    acopRenders: 80000,
    acopFotos: 30000,
    acopMedia: 120000,
    comisionVentasPct: 8
  };

  it('calcula egresos fijos × meses correctamente', () => {
    const result = calcTotalEgresos(egresos, 18, 100_000_000);
    // Fijo mensual = 80k + 150k + 30k + 60k + 20k + 150k + 50k = 540k
    expect(result.egresosFijos).toBe(540_000 * 18);
  });

  it('calcula comisión sobre ventas', () => {
    const result = calcTotalEgresos(egresos, 18, 100_000_000);
    expect(result.comision).toBe(100_000_000 * 0.08);
  });

  it('calcula acoplamiento preoperativo', () => {
    const result = calcTotalEgresos(egresos, 18, 0);
    // 150k + 120k + 80k + 30k + 120k = 500k
    expect(result.acop).toBe(500_000);
  });

  it('maneja egresos vacíos', () => {
    const result = calcTotalEgresos({}, 12, 0);
    expect(result.total).toBe(0);
  });
});

// ── Costo de obra ────────────────────────────────────────────────────
describe('calcCostoObra', () => {
  it('suma cantidad × costo de cada item', () => {
    const items = [
      { nombre: 'Construcción', cantidad: 9000, costo: 18000 },
      { nombre: 'Exteriores', cantidad: 2703, costo: 3500 }
    ];
    expect(calcCostoObra(items)).toBe(9000 * 18000 + 2703 * 3500);
  });

  it('retorna 0 con array vacío', () => {
    expect(calcCostoObra([])).toBe(0);
  });

  it('retorna 0 con null', () => {
    expect(calcCostoObra(null)).toBe(0);
  });
});

// ── Proyección anual ─────────────────────────────────────────────────
describe('calcYearlyProjection', () => {
  it('genera datos para el número correcto de años', () => {
    const data = calcYearlyProjection(1_000_000, 500_000, 10, 0.05, 0.12, 100);
    expect(data).toHaveLength(10);
  });

  it('año 1 no tiene inflación', () => {
    const data = calcYearlyProjection(1_000_000, 0, 5, 0.10, 0, 100);
    // Año 1: 1M × 12 = 12M bruto
    expect(data[0].ingresoNetoRentas).toBe(12_000_000);
  });

  it('año 2 aplica inflación', () => {
    const data = calcYearlyProjection(1_000_000, 0, 5, 0.10, 0, 100);
    // Año 2: 12M × 1.10 = 13.2M
    expect(data[1].ingresoNetoRentas).toBeCloseTo(13_200_000);
  });

  it('aplica costo admin correctamente', () => {
    const data = calcYearlyProjection(1_000_000, 0, 1, 0, 0.10, 100);
    // 12M bruto, 10% admin = 1.2M
    expect(data[0].costoAdmin).toBeCloseTo(1_200_000);
    expect(data[0].utilidadPool).toBeCloseTo(10_800_000);
  });

  it('divide utilidad entre tickets', () => {
    const data = calcYearlyProjection(1_000_000, 0, 1, 0, 0, 400);
    // 12M / 400 = 30,000
    expect(data[0].utilidadPorTicket).toBe(30_000);
  });

  it('aplica ocupación variable (escenarios)', () => {
    const ocupRentas = [60, 80, 100];
    const data = calcYearlyProjection(1_000_000, 0, 3, 0, 0, 100, ocupRentas);
    // Año 1: 12M × 0.60 = 7.2M
    expect(data[0].ingresoNetoRentas).toBeCloseTo(7_200_000);
    expect(data[0].pctRent).toBeCloseTo(0.60);
  });

  it('inflación compuesta en 5 años', () => {
    const data = calcYearlyProjection(100_000, 0, 5, 0.05, 0, 1);
    // Año 5: 1.2M × (1.05)^4 ≈ 1,458,611
    const expected = 100_000 * 12 * Math.pow(1.05, 4);
    expect(data[4].ingresoNetoRentas).toBeCloseTo(expected, 0);
  });
});

// ── Recuperación de inversión ────────────────────────────────────────
describe('calcRecoveryYears', () => {
  it('calcula periodo de recuperación exacto', () => {
    // 100k/año de utilidad, ticket de 500k → exactamente 5 años
    const yearlyData = Array(10).fill({ utilidadPorTicket: 100_000 });
    expect(calcRecoveryYears(500_000, yearlyData)).toBeCloseTo(5.0, 1);
  });

  it('calcula periodo fraccional', () => {
    // 100k/año, ticket de 250k → 2.5 años
    const yearlyData = Array(10).fill({ utilidadPorTicket: 100_000 });
    expect(calcRecoveryYears(250_000, yearlyData)).toBeCloseTo(2.5, 1);
  });

  it('retorna -1 si no se recupera', () => {
    const yearlyData = Array(3).fill({ utilidadPorTicket: 10_000 });
    expect(calcRecoveryYears(500_000, yearlyData)).toBe(-1);
  });

  it('retorna -1 con ticket precio 0', () => {
    expect(calcRecoveryYears(0, [])).toBe(-1);
  });

  it('maneja utilidad creciente (con inflación)', () => {
    const yearlyData = [
      { utilidadPorTicket: 80_000 },
      { utilidadPorTicket: 84_000 },
      { utilidadPorTicket: 88_200 },
      { utilidadPorTicket: 92_610 },
      { utilidadPorTicket: 97_240 },
    ];
    // Acumulado: 80k, 164k, 252.2k, 344.81k, 442.05k
    // Con ticket de 300k: se recupera entre año 3 y 4
    const result = calcRecoveryYears(300_000, yearlyData);
    expect(result).toBeGreaterThan(3);
    expect(result).toBeLessThan(4);
  });
});

// ── Plusvalía ────────────────────────────────────────────────────────
describe('calcPlusvalia', () => {
  it('calcula ganancia positiva', () => {
    // Ticket $600k, 22.5 m²/ticket, mercado $48,500/m²
    const result = calcPlusvalia(600_000, 22.5, 48_500);
    // Valor fracción = 22.5 × 48,500 = 1,091,250
    expect(result.valorFraccion).toBe(1_091_250);
    expect(result.montoAbsoluto).toBe(1_091_250 - 600_000);
    expect(result.porcentaje).toBeCloseTo(81.875);
  });

  it('maneja precio ticket 0', () => {
    const result = calcPlusvalia(0, 22.5, 48_500);
    expect(result.porcentaje).toBe(0);
  });
});

// ── Métricas de tickets ──────────────────────────────────────────────
describe('calcTicketMetrics', () => {
  const tickets = [
    { id: 1, cantidad: 50, precio: 599999, nombre: 'Semilla', esAportado: false },
    { id: 2, cantidad: 75, precio: 699999, nombre: 'Preventa', esAportado: false },
    { id: 3, cantidad: 66, precio: 599000, nombre: 'Tierra', esAportado: true }
  ];

  it('calcula tickets modelo correctamente', () => {
    const result = calcTicketMetrics(tickets, 400, 20);
    expect(result.ticketsModelo).toBe(80); // 400 × 0.20
  });

  it('calcula total configurado', () => {
    const result = calcTicketMetrics(tickets, 400, 20);
    expect(result.totalConfigured).toBe(50 + 75 + 66);
  });

  it('calcula entradas vendidas (sin aportados)', () => {
    const result = calcTicketMetrics(tickets, 400, 20);
    expect(result.entradasVendidas).toBe(50 * 599999 + 75 * 699999);
  });

  it('calcula tickets restantes', () => {
    const result = calcTicketMetrics(tickets, 400, 20);
    // 400 - 80 (modelo) - 191 (configurados) = 129
    expect(result.remaining).toBe(400 - 80 - 191);
  });
});
