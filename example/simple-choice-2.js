//
// Select the right factory based on environment
//
switch (process.env.NODE_ENV) {
  case 'production':
    bottle.service('client.sms', RealSmsProvider);
    break;

  case 'test':
    bottle.service('client.sms', TestSmsProvider);
    break;

  default:
    bottle.service('client.sms', DevSmsProvider);
    break;
}
