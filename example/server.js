const express = require('express');
const bodyParser = require('body-parser');
const bottle = require('.')();

//
// Set up our app
//
const app = express();
app.use(bodyParser.json());

// Crawl the container to find all components prefixed with "route."
bottle.container.route.$list().forEach(name => {
  // Register them as routers with the application
  // e.g. route.todos maps to => /todos
  app.use(`/${name}`, bottle.container.route[name]);
});

const server = app.listen(7000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
