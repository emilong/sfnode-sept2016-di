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
const databaseRel = require('../../../config/database.js')
const TodoModelRel = require('../../../app/model/todo.js')(databaseRel);
const TodosRel = require('../../../app/controllers/todos.js')(TodoModelRel);

// Using NODE_PATH=root
const databaseRoot = require('config/database.js')
const TodoModelRoot = require('app/model/todo.js')(databaseRoot);
const TodosRoot = require('app/controllers/todos.js')(TodoModelRoot);
