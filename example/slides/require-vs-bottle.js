//
// Project layout:
//   root
//     - app
//       - controllers
//       - models
//     - test
//       - app
//         - controllers
//         - models
//

// require() approach
// ./test/app/controllers/todos.func.test.js
const database = require('../../../config/database.js')
const TodoModel = require('../../../app/model/todo.js')(database);
const Todos = require('../../../app/controllers/todos.js')(TodoModel);

// Using NODE_PATH=root
const database = require('config/database.js')
const TodoModel = require('app/model/todo.js')(database);
const Todos = require('app/controllers/todos.js')(TodoModel);
