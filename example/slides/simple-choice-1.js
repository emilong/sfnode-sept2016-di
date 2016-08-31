//
// Different factories can provide
// different implementations
//
const sms = require('sms-client');

function RealSmsProvider() {
  return sms.connect();
}

function DevSmsProvider() {
  return {
    sendText(number, message) {
      console.log(message, '->', number);
    }
  }
}

function TestSmsProvider() {
  return { sendText: sinon.spy() };
}
