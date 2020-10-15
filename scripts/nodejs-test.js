rule = new Intl.NumberFormat('ar-SA-u-nu-latn');
console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(rule.format).join(' '));