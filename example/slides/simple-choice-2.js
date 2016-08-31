//
// Select the right factory based on environment
//
// (Not required for every dependency, but have
// the option when we need it, as in this case.)
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
