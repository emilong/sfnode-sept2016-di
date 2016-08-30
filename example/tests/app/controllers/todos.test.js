const app = require('index.js');

describe('controller.Todos', () => {
  describe('list', () => {
    const fakeTodos = [{
      id: 1,
      content: 'first fake todo'
    }, {
      id: 3,
      content: 'second fake todo'
    }];

    beforeEach(() => {
      // Factories are called lazily, so we can inject
      // fakes before instantiation!
      app.service('model.Todo', function CreateFakeTodo() {
        return {
          list: sinon.spy(() => fakeTodos)
        };
      });
    });

    it('returns the fake todos as json in the response', () => {
      const res = { json: sinon.spy() }

      app.container.controller.Todos.list('ignored', res);

      expect(res.json).to.have.been.calledWith(fakeTodos);
    });
  });
});
