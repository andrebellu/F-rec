const crypto = require('crypto');

const args = process.argv.slice(2);

const password = args[0];
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

console.log(`password: ${password}`);
console.log(`salt: ${salt}`);
console.log(`hash: ${hash}`);
