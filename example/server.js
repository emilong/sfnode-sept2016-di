const express = require('express');
const bodyParser = require('body-parser');
const bottle = require('.');

const app = express();
app.use(bodyParser.json());

bottle.container.route.$list().forEach(name => {
  app.use(`/${name}`, bottle.container.route[name]);
});

const server = app.listen(7000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
