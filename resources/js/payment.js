console.log('ciao');
var dropin = require('braintree-web-drop-in');

dropin.create({ 
    authorization: 'CLIENT_AUTHORIZATION',
    container: '#dropin-container',
    paypal: {
    flow: 'vault',
    amount: '10.00',
    currency: 'USD'
    } 
});