// Our factory
function CreateTodoModel(database) {
  return { /* some implementation */ };
}

// Register our factory with the bottle that's given to our exported function
module.exports = (bottle) => {
  bottle.service('model.Todo', CreateTodoModel, 'database');
};
