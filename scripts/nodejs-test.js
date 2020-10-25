const dateObj = new Date(2012, 2, 4, 5, 6, 7, 8);
const result = ['numeric', '2-digit']
  .map(value => {
    const options = { second: value };
    const jaFmt = new Intl.DateTimeFormat('ja', options);
    const enFmt = new Intl.DateTimeFormat('en-US', options);
    return `| ${value} | ${jaFmt.format(dateObj)} | ${enFmt.format(dateObj)} |`;
  })
  .join('\n');
console.log(result);
