// Helpers to request appropriately-sized images from Unsplash/Pexels
// instead of shipping full-resolution originals to every card/hero.

/**
 * Returns a resized/optimized version of a remote image URL.
 * Supports Unsplash and Pexels query params; falls back to the
 * original URL untouched for any other host.
 *
 * @param {string} url - original image URL
 * @param {{ width?: number, quality?: number }} opts
 */
export function optimizeImageUrl(url, { width = 600, quality = 75 } = {}) {
  if (!url) return url;

  try {
    const u = new URL(url);

    if (u.hostname.includes("images.unsplash.com")) {
      u.searchParams.set("w", String(width));
      u.searchParams.set("q", String(quality));
      u.searchParams.set("auto", "format");
      u.searchParams.set("fit", "crop");
      return u.toString();
    }

    if (u.hostname.includes("images.pexels.com")) {
      u.searchParams.set("w", String(width));
      // Pexels quality is 0-100 via "cs=tinysrgb" already; keep dpr low.
      u.searchParams.delete("dpr");
      u.searchParams.set("dpr", "1");
      return u.toString();
    }

    return url;
  } catch {
    return url;
  }
}

// Common presets used across the app so every component requests
// a consistent, purpose-sized image instead of guessing.
export const IMAGE_SIZES = {
  heroLarge: 1400,   // big hero banner
  heroThumb: 120,    // small side-list thumbnail in HeroCarousel
  card: 420,         // product cards in SectionRow
  freeGame: 500,     // FreeGames tiles
};
