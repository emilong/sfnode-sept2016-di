function CreateRealDatabaseConnector() {
  // connect to a real database and return the client
}

function MemoryModel() {
}

MemoryModel.prototype.del = function del() {
  const typeModels = this.__DB[this.__type].models;
  delete typeModels[this.id];
};

MemoryModel.prototype.update = function update(attributes) {
  Object.assign(this, attributes);
};

function CreateMemoryDatabase() {
  const DB = Object.create(null);

  return {
    // Create a model that's persisted in memory
    create(type, attributes) {
      if (!DB[type]) {
        DB[type] = Object.create(null);
      }

      const id = DB[type].nextId || 1;
      DB[type].nextId = id + 1;

      if (!DB[type].models) {
        DB[type].models = Object.create(null);
      }

      const model = Object.create(MemoryModel.prototype, {
        __DB: { value: DB },
        __type: { value: type },
        id: {
          enumerable: true,
          value: id
        }
      });

      model.update(attributes);

      DB[type].models[id] = model;

      return model;
    },

    get(type, id) {
      if (!DB[type] || !DB[type].models) {
        return null;
      }

      return DB[type].models[id] || null;
    },

    all(type) {
      if (!DB[type] || !DB[type].models) {
        return [];
      }

      return Object.keys(DB[type].models).reduce((acc, id) => {
        acc.push(DB[type].models[id]);
        return acc;
      }, []);
    }
  };
}

module.exports = (bottle) => {
  if (process.env.USE_REAL_DB) {
    bottle.service('database', CreateRealDatabaseConnector);
  } else {
    bottle.service('database', CreateMemoryDatabase);
  }
};
