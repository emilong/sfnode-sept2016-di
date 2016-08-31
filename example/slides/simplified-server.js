//
// Set up our app
//
const app = express();

// Crawl the container to find all components prefixed with "route."
bottle.container.route.$list().forEach(name => {
  // Register them as routers with the application
  // e.g. route.todos maps to => /todos
  app.use(`/${name}`, bottle.container.route[name]);
});
