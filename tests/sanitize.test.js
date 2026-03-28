import { describe, it, expect } from 'vitest';
import { escapeHTML, sanitizeAttr } from '../js/modules/sanitize.js';

describe('escapeHTML', () => {
  it('escapa < y >', () => {
    expect(escapeHTML('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('escapa comillas dobles', () => {
    expect(escapeHTML('Fase "Semilla"')).toBe('Fase &quot;Semilla&quot;');
  });

  it('escapa comillas simples', () => {
    expect(escapeHTML("It's a test")).toBe('It&#39;s a test');
  });

  it('escapa ampersand', () => {
    expect(escapeHTML('A & B')).toBe('A &amp; B');
  });

  it('retorna string vacío para null', () => {
    expect(escapeHTML(null)).toBe('');
  });

  it('retorna string vacío para undefined', () => {
    expect(escapeHTML(undefined)).toBe('');
  });

  it('convierte números a string', () => {
    expect(escapeHTML(42)).toBe('42');
  });

  it('no modifica strings seguros', () => {
    expect(escapeHTML('Pueblo Mágico El Salitre')).toBe('Pueblo Mágico El Salitre');
  });
});

describe('sanitizeAttr', () => {
  it('escapa para uso seguro en atributos', () => {
    expect(sanitizeAttr('value" onclick="alert(1)')).toBe('value&quot; onclick=&quot;alert(1)');
  });
});
