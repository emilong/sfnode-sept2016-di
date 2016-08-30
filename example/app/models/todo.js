function CreateTodoModel(database) {
  return {
    create(content) {
      return database.create('todo', { content });
    },

    get(id) {
      return database.get('todo', id);
    },

    list() {
      return database.all('todo');
    },
  };
}

module.exports = bottle => {
  bottle.service('model.Todo', CreateTodoModel, 'database');
};
