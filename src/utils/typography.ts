/**
 * Typography System for Friday Reveal Video
 * Loads Inter font and exports typography presets
 */

import { loadFont } from '@remotion/google-fonts/Inter';

// Load Inter font with required weights
const { fontFamily, waitUntilDone } = loadFont('normal', {
    weights: ['300', '400', '500', '700'],
    subsets: ['latin'],
});

export { fontFamily, waitUntilDone };

// Font weight constants
export const FONT_LIGHT = '300';
export const FONT_REGULAR = '400';
export const FONT_MEDIUM = '500';
export const FONT_BOLD = '700';

// Font size presets (px)
export const TITLE_HERO = 88; // "HELLO WORLD!", "This is Friday"
export const TITLE_XL = 72;   // "I'm Friday"
export const TITLE_LG = 56;   // "Here's what I can do"
export const TITLE_MD = 48;   // "I've mastered specialized skills"
export const TITLE_SM = 44;   // "Watch how I think"
export const TITLE_XS = 42;   // "I live in the cloud"

export const BODY_LG = 38;    // Scene descriptions
export const BODY_MD = 36;    // "An advanced AI assistant"
export const BODY_SM = 32;    // "Want to see how I operate?"
export const BODY_XS = 28;    // Social handles

export const LABEL_MD = 24;   // Card labels
export const LABEL_SM = 20;   // Sublabels
