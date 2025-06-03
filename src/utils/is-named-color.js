import cssColorNames from './css-color-names.json' assert { type: 'json' };

const isNamedColor = (color, returnValue = false) => {
   if (typeof color !== 'string') {
      throw new TypeError('[is-named-color]: Expected a string');
   }

   const cssRegex = new RegExp('^' + cssColorNames().join('|') + '$', 'i');
   const isNamedColor = cssRegex.test(color);
   return isNamedColor ? (returnValue ? color : true) : false;
};

export { isNamedColor };