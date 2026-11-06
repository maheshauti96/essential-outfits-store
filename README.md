# Essential Outfits — essentialoutfits.store

Storefront for Essential Outfits, a menswear essentials brand. Customers browse the catalogue, add items to a cart, and
send their order to the store on **WhatsApp**. Payment and delivery are confirmed in the chat, so there is no payment
gateway, database or server to run.

Built with [Astro](https://astro.build) as a fully static site and hosted on **GitHub Pages**.

## What's included

| Page | Path |
| --- | --- |
| Home (hero, categories, featured products, how ordering works) | `/` |
| Shop all, plus one page per category | `/shop/`, `/shop/t-shirts/`, … |
| Product page (colour + size picker, add to cart, order on WhatsApp) | `/products/<slug>/` |
| Cart and WhatsApp checkout | `/cart/` |
| About, Contact | `/about/`, `/contact/` |
| Shipping & returns, Privacy, Terms | `/shipping-returns/`, `/privacy/`, `/terms/` |
| 404 | any unknown URL |

Also: sitemap (`/sitemap-index.xml`), `robots.txt`, Open Graph/Twitter share image, Product and Breadcrumb structured
data, favicon and app icons. Lighthouse scores 100 for accessibility, best practices and SEO.

## Run it locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build
```

In local development, the WhatsApp buttons work even without a number configured: they show a preview of the
message a customer would send.

## Before launch: fill in your details

Everything store-wide lives in **`src/config.ts`**:

- `whatsappNumber`: the number that receives orders. Use the country code and digits only, e.g. `919876543210`.
  **The order buttons stay switched off on the live site until this is set.**
- `email`, `instagram`: shown on the Contact page and in the footer.
- `legalName`, `address`: used on the policy pages. Indian e-commerce rules expect sellers to publish these.
- `previewMode`: shows the "Store preview" banner and yellow "To fill in" notes on the About, Contact and policy pages,
  and tells search engines **not to index the site** (so sample prices never appear in Google). Set it to `false` once
  the real catalogue and policies are in. That also opens the site to search engines.

Then review the copy in `src/pages/shipping-returns.astro`, `privacy.astro`, `terms.astro` and `about.astro`. Each
`<Todo>` marks something only you can answer, such as your return window, payment methods and dispatch times.

## Products

The whole catalogue is in **`src/data/products.ts`**. Each product has a name, category, price in rupees, colours,
sizes, a short summary and detail bullets. Add, edit or delete entries there and the shop, category pages, cart and
sitemap all update automatically. To show a product as unavailable, set `soldOut: true`.

The current products and prices are **samples**, there to show the layout.

### Photos

Until you have product photos, each product shows a drawn flat-lay illustration in its actual colour (generated from
`src/lib/garments.ts`). To use a real photo for a colour:

1. Put the image in `public/products/` (portrait 4:5 works best, e.g. 1200×1500 JPG or WebP).
2. Add `image` to that colour in `products.ts`:

   ```ts
   colors: [{ name: 'Navy', hex: '#1F2A44', image: '/products/oxford-navy.jpg' }],
   ```

## Deploying to GitHub Pages

Every push to `main` builds the site and deploys it through `.github/workflows/deploy.yml`.

**One-time setup on GitHub** (repository → Settings → Pages):

1. Under **Build and deployment → Source**, choose **GitHub Actions**.
2. Under **Custom domain**, enter `essentialoutfits.store` and save.
3. After DNS is working (below), tick **Enforce HTTPS**.

**DNS records**, set at your domain registrar:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `maheshauti96.github.io` |

Remove any existing parking-page A or CNAME records for `@` and `www` first. DNS changes can take up to a day to
spread. GitHub also recommends
[verifying the domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
on your account, so nobody else can claim it for their Pages site.

## Project layout

```
src/
  config.ts              store settings (WhatsApp number, contact, preview mode)
  data/products.ts       the catalogue
  lib/garments.ts        drawn placeholder images
  lib/catalog.ts         price formatting, image and URL helpers
  scripts/cart.ts        cart stored in the visitor's browser
  scripts/order.ts       builds the WhatsApp order message
  components/            header, footer, product card, …
  layouts/BaseLayout.astro   page shell, SEO tags
  pages/                 one file per page; images/[garment]/[hex].svg.ts draws the placeholders
public/                  favicon, icons, share image, robots.txt, CNAME
scripts/make-icons.mjs   regenerates the favicon and app icons (npm run icons)
```

## Notes

- Astro is pinned to 7.4.1 because newer 7.4.x releases need Node ≥ 22.23.4. After upgrading Node locally
  (e.g. `nvm install 22`), run `npm install astro@latest`.
- The cart lives in the visitor's own browser (`localStorage`). Nothing is sent anywhere until they tap
  "Send order on WhatsApp".
