const app = require('index.js')();

describe('controller.Todos functional tests', () => {
  describe('list', () => {
    const todoContent = ['first fake todo', 'second fake todo'];

    beforeEach(() => {
      // Don't override the dependencies this time, use them
      todoContent.forEach((content) => app.container.model.Todo.create(content));
    });

    it('returns the real todos as json in the response', () => {
      const res = { json: sinon.spy() }

      app.container.controller.Todos.list('ignored', res);

      expect(res.json).to.have.been.called;

      const returnedTodos = res.json.firstCall.args[0];

      expect(returnedTodos.map((todo) => todo.content)).to.eql(todoContent);
    });
  });
});
