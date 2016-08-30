function CreateTodosController(Todo) {
  return {
    list(req, res) {
      res.json(Todo.list());
    },

    create(req, res) {
      res.json(Todo.create(req.body.content));
    },

    // etc...
  };
}

module.exports = (bottle) => {
  bottle.service('controller.Todos',
    CreateTodosController,
    'model.Todo'
  );
};
