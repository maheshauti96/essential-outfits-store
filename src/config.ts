/**
 * Store-wide settings. Edit this file to change contact details, ordering and
 * the preview banner. Everything on the site reads from here.
 */
interface SiteConfig {
  name: string;
  url: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  email: string;
  instagram: string;
  legalName: string;
  address: string;
  currency: string;
  locale: string;
  previewMode: boolean;
}

export const site: SiteConfig = {
  name: 'Essential Outfits',
  url: 'https://essentialoutfits.store',
  tagline: 'Style that defines you.',
  description:
    'Essential Outfits: timeless shirts and trousers for college, office and everyday wear. Free delivery across India. Order on WhatsApp.',

  /**
   * WhatsApp number that receives orders: country code + number, digits only.
   * Example for an Indian number: '919876543210'.
   * While this is empty, the order buttons are switched off on the live site.
   */
  whatsappNumber: '919503936806',

  /** Shown on the Contact page and in the footer when filled in. */
  email: '',
  /** Instagram handle without the @, e.g. 'essentialoutfits'. */
  instagram: '',

  /**
   * Business details for the policy pages. Indian e-commerce rules expect the
   * seller's legal name and address to be published. Fill these in before launch.
   */
  legalName: '',
  address: '',

  /** Prices are stored in rupees (whole numbers) in src/data/products.ts. */
  currency: 'INR',
  locale: 'en-IN',

  /**
   * While true: shows a "Store preview" banner, shows "To fill in" notes on the
   * About, Contact and policy pages, and asks search engines not to index the
   * site. Turn this off once the real products, prices and policies are in.
   */
  previewMode: true,
};

export const orderingEnabled = site.whatsappNumber.length > 0;

/** "+91 95039 36806" from a 919503936806-style number. */
export function phoneDisplay(digits = site.whatsappNumber): string {
  if (/^91\d{10}$/.test(digits)) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return digits ? `+${digits}` : '';
}

export const phoneTel = site.whatsappNumber ? `+${site.whatsappNumber}` : '';
