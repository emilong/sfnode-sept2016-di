function CreateTodosController(Todo) {
  return {
    list(req, res) {
      res.json(Todo.list());
    },

    create(req, res) {
      res.json(Todo.create(req.body.content));
    },

    get(req, res) {
      const todo = Todo.get(req.params.id);

      if (!todo) {
        res.status(404).end();
        return;
      }

      res.json(todo);
    },

    update(req, res) {
      const todo = Todo.get(req.params.id);

      if (!todo) {
        res.status(404).end();
        return;
      }

      todo.update(req.body);

      res.json(todo);
    },

    del(req, res) {
      const todo = Todo.get(req.params.id);

      if (!todo) {
        res.status(404).end();
        return;
      }

      todo.del();

      res.status(204).end();
    },
  };
}

module.exports = bottle => {
  bottle.service('controller.Todos', CreateTodosController, 'model.Todo');
};
