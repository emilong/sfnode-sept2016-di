// Create a DI container instance
// Knows about all your dependencies and components
const bottle = require('bottlejs')();

// Create and register our database client factory
const db = require('database-client');

function Database() {
  return db.connect();
}

bottle.service('client.database', Database);

// Create and register our SMS client factory
const sms = require('sms-client');

function SmsProvider() {
  return sms.connect();
}

bottle.service('client.sms', SmsProvider);
