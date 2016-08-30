// Our factory
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

//
// Register our factory with the bottle that's given to our exported function
//
module.exports = (bottle) => {
  bottle.service('model.Todo', CreateTodoModel, 'database');
};
