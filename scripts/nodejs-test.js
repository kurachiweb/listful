const crypto = require('crypto');

const byteLength = 6; // 0 ~ 256^6-1 の範囲になる
const randomVal = crypto.randomBytes(byteLength).toString('hex');
console.log(randomVal);
const randomNum = parseInt(randomVal, 16);
console.log(randomNum);
console.log(crypto.getRandomValues(new Uint8Array(1)));