const path = require('path');
const glob = require('glob');
const Bottle = require('bottlejs');

const bottle = new Bottle();

['app', 'config'].forEach(dir => {
  glob.sync(path.join(path.resolve(__dirname), `${dir}/**/*.js`))
  .forEach(match => require(match)(bottle));
});

module.exports = bottle;
