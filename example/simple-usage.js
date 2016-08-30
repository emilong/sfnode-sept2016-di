// (using the same bottle instance...)

// Our application code
function RoboTexter(database, sms) {
  return {
    textTheWorld() {
      return database.query('SELECT number FROM tels')
      .then(rows => {
        const message = 'Do you hate SMS spam? Reply to subscribe for tips to avoid it!';

        return Promise.all(rows.map(number => sms.sendText(number, message)));
      });
    }
  };
}

// Register our code and its dependencies
bottle.service('service.RoboTexter', RoboTexter, 'client.database', 'client.sms');

// Bottle instantiates what's necessary, in the correct dependency order
bottle.container.service.RoboTexter.textTheWorld();
