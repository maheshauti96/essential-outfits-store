/** Cart stored in the visitor's browser (localStorage). No server involved. */
export interface CartLine {
  slug: string;
  color: string;
  size: string;
  qty: number;
}

const KEY = 'eo-cart-v1';
export const MAX_QTY = 10;

function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.slug === 'string' && typeof l.color === 'string' &&
        typeof l.size === 'string' && Number.isInteger(l.qty) && l.qty > 0,
    );
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage blocked (private mode) — the cart just won't persist */
  }
  window.dispatchEvent(new CustomEvent('cart:change', { detail: lines }));
}

export const getCart = read;

export function addToCart(line: CartLine) {
  const lines = read();
  const existing = lines.find((l) => l.slug === line.slug && l.color === line.color && l.size === line.size);
  if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + line.qty);
  else lines.push({ ...line, qty: Math.min(MAX_QTY, line.qty) });
  write(lines);
}

export function setQty(index: number, qty: number) {
  const lines = read();
  if (!lines[index]) return;
  if (qty <= 0) lines.splice(index, 1);
  else lines[index].qty = Math.min(MAX_QTY, qty);
  write(lines);
}

export function removeLine(index: number) {
  setQty(index, 0);
}

export function clearCart() {
  write([]);
}

export function cartCount(lines = read()) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

/** Keeps every [data-cart-count] badge on the page in sync, including across tabs. */
export function watchCartCount() {
  const update = () => {
    const n = cartCount();
    document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
      el.textContent = String(n);
      el.hidden = n === 0;
    });
    document.querySelectorAll<HTMLElement>('[data-cart-label]').forEach((el) => {
      el.setAttribute('aria-label', n ? `Open cart, ${n} item${n === 1 ? '' : 's'}` : 'Open cart');
    });
  };
  update();
  window.addEventListener('cart:change', update);
  window.addEventListener('storage', (e) => e.key === KEY && update());
}
