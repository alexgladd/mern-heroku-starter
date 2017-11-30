// server state

const shaSum = require('crypto').createHash('sha256');

const now = new Date().getTime();
const randomInit = `MERN-Server-${now}`;

shaSum.update(randomInit);

const srvRandom = shaSum.digest('hex');

module.exports = {
  random: srvRandom
}
