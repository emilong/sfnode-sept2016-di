const express = require('express');

// Create a router with CRUD routes,
// hook it up to our controller actions
function CreateTodosRoute(Todos) {
  const router = new express.Router();

  router.get('/', Todos.list);
  router.post('/', Todos.create);
  router.get('/:id', Todos.get);
  router.put('/:id', Todos.update);
  router.delete('/:id', Todos.del);

  return router;
}

module.exports = (bottle) => {
  bottle.service('route.Todos',
    CreateTodosRoute,
    'controller.Todos'
  );
};
