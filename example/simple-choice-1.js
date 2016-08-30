//
// Different factories can provide different implementations
//
const sms = require('sms-client');

function RealSmsProvider() {
  return sms.connect();
}

function DevSmsProvider() {
  return {
    sendText(number, message) {
      console.log('sending text', message, 'to', number);
    }
  }
}

function TestSmsProvider() {
  return { sendText: sinon.spy() };
}
