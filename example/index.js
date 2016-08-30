const path = require('path');
const glob = require('glob');
const Bottle = require('bottlejs');

//
// Create an instance to pass into exported functions
//
const bottle = new Bottle();

// Crawl directories that follow this convention and pass them the bottle
['app', 'config'].forEach((dir) => {
  glob.sync(path.join(path.resolve(__dirname), `${dir}/**/*.js`))
  .forEach((match) => require(match)(bottle));
});

// Export the "filled" bottle to anyone who wants to use it
module.exports = bottle;
