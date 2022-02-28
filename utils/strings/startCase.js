export const startCase = (str) => {
     if (str.includes('.')) {
         return str;
     }
 
     return [...str]
         .map((s, i) => {
             if (i === 0) {
                 return s.toUpperCase();
             }
 
             if (isUpperCase(s)) {
                 return ` ${s}`;
             }
 
             return s;
         })
         .join('');
 };
 
 function isUpperCase(b) {
     return b.toUpperCase() === b;
 }
 