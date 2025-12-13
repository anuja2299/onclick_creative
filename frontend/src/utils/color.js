import ColorThief from "color-thief-browser";

/**
 * Safe palette extractor
 * Returns fallback if canvas is tainted
 */
export async function getPalette(image) {
  try {
    const colorThief = new ColorThief();
    return colorThief.getPalette(image, 3);
  } catch (err) {
    console.warn("Palette extraction failed, using fallback");
    return [[180, 180, 180]];
  }
}
