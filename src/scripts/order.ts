/**
 * Builds the WhatsApp order message. Shared by the cart page and the
 * "Order on WhatsApp" button on product pages.
 */
export interface OrderLine {
  name: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  url: string;
}

export interface Customer {
  name?: string;
  city?: string;
  pincode?: string;
  notes?: string;
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export function orderMessage(lines: OrderLine[], customer: Customer = {}): string {
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const items = lines.map(
    (l, i) =>
      `${i + 1}. ${l.name}\n   Colour: ${l.color} · Size: ${l.size} · Qty: ${l.qty}\n   ${inr.format(l.price * l.qty)}\n   ${l.url}`,
  );
  const who = [
    customer.name && `Name: ${customer.name}`,
    (customer.city || customer.pincode) &&
      `Deliver to: ${[customer.city, customer.pincode].filter(Boolean).join(' – ')}`,
    customer.notes && `Notes: ${customer.notes}`,
  ].filter(Boolean);

  return [
    'Hi Essential Outfits! I would like to order:',
    '',
    ...items,
    '',
    `Subtotal: ${inr.format(total)}`,
    ...(who.length ? ['', ...who] : []),
    '',
    'Please confirm availability, delivery charges and payment details.',
  ].join('\n');
}

export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp with the message, or — when no number is configured (local
 * development) — shows the message in the preview dialog instead.
 */
export function sendOrder(number: string | undefined, message: string) {
  if (number) {
    window.open(whatsappUrl(number, message), '_blank', 'noopener');
    return true;
  }
  const dialog = document.querySelector<HTMLDialogElement>('[data-preview-dialog]');
  if (dialog) {
    dialog.querySelector('[data-preview-text]')!.textContent = message;
    dialog.showModal();
  }
  return false;
}
