const fs = require('fs');
const sharp = require('sharp');

const assetPath = './public/img/';

const splitFileName = fPath => {
  const matched = fPath.match(/(.*?)(\.\w+?)$/);
  if (!matched) return;
  return {
    name: matched[1],
    ext: matched[2]
  };
};

const svg2png = function (fPath) {
  const fileData = splitFileName(fPath);
  if (fileData.ext !== '.svg') return;
  sharp(`${fileData.name}.svg`)
    .png()
    .toFile(`${fileData.name}.png`, err => {
      if (err) console.error(err);
    });
};

fs.readdir(assetPath, { withFileTypes: true }, (err, dirents) => {
  if (err) {
    console.error(err);
    return;
  }
  dirents.forEach(dirent => {
    if (!dirent.isFile()) return;
    svg2png(assetPath + dirent.name);
  });
});
