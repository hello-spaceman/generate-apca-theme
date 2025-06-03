import { calcAPCA } from 'apca-w3';
import { randomHexColor } from './utils/random-hex.js';
import Color from 'colorjs.io'
import { colorParsley } from 'colorparsley';

// [ Note on Threshold ] ======================================================================================
// The final algorithm leaves you with a number between 0 and 106 for dark text and 0 to -108 for light text.
// Whilst ±75 is considered equivalent to WCAG2 Level AAA and ±60 is usually equivalent to Level AA, you can
// use the APCA docs to contextually achieve your desired result with ±15 usually being invisible for most people.
// More info at https://a11yboost.com/articles/colour-contrast-with-wcag-and-apca

const formats = {
   'hex': 'HEX',
   'p3': 'Display-P3',
   'rgb': 'RGB',
   'hsl': 'HSL',
   'oklab': 'OKLAB',
   'lab': 'LAB',
   'lch': 'LCH',
   'oklch': 'OKLCH',
}

const defaults = {
   maxIter: 512,
   threshold: 60,
   format: 'p3',
}

const generateAPCATheme = (pinnedColor = '', options = {}) => {
   const { maxIter, threshold, format} = { ...defaults, ...options };

   let colorA = colorParsley(pinnedColor || randomHexColor());
   let colorB = colorParsley(randomHexColor());

   const formatColor = (color) => {
      if (Object.keys(formats).includes(format)) {
         let _color = new Color(`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`);
         return _color.to(format);
      } else {
         throw new Error(`[generate-apca-theme]: Invalid format "${format}". Supported formats are: ${Object.keys(formats).join(', ')}`);
      }
   }

   if (!colorA || !colorB) {
      throw new Error('[generate-apca-theme]: Unable to generate colors. Ensure the color library is properly imported.');
   }

   let iter = 0;
   while (Math.abs(calcAPCA(colorA, colorB)) < threshold && iter < maxIter) {
      if (!pinnedColor) {
         colorA = colorParsley(randomHexColor());
      }
      colorB = colorParsley(randomHexColor());
      iter++;
   }

   if (iter >= maxIter) {
      throw new Error(`[generate-apca-theme]: Unable to generate a contrasting color after ${maxIter} iterations.`);
   }

   if (iter !== maxIter) {
      return [formatColor(colorA), formatColor(colorB)];
   }
}

export { generateAPCATheme };