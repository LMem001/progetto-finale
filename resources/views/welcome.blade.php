@extends('layouts.base')

@section('cdn')
<script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
@endsection

@section('pageTitle')
Pagamento
<hr>
@endsection

@section('content')

<form id="formTest" action="{{route('admin.makepayment')}}" enctype="multipart/form-data" class="container" method='POST'>
  @csrf
	@method('POST')
  <div class="row">
    <div class="col-xs-12">
      <p class="lead">Questo é un semplice esempio di pagamento, per testare tutte le funzionalità del nostro sito web.</p>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <p>Grazie, della vostra attenzione, siamo lieti di accogliore i vostri suggerimenti per migliorare il nostro lavoro!</p>
      <button class="btn btn-warning" id="autofill">Autofill Customer Information</button>
    </div>
  </div>
  
  <div class="row">
    <div class="col-xs-12" >
      <div class="form-group">
        <label for="email">email</label>
        <input type="email" name="email" class="form-control" id="email" placeholder="you@example.com">
        <span id="help-email" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-phone">Billing phone number</label>
        <input type="billing-phone" name="telefono" class="form-control" id="billing-phone" placeholder="123-456-7890">
        <span id="help-billing-phone" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-given-name">Billing given name</label>
        <input type="billing-given-name" name="fatturazioneNome" class="form-control" id="billing-given-name" placeholder="First">
        <span id="help-billing-given-name" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-surname">Billing surname</label>
        <input type="billing-surname" name="cognomeFatturazione" name="cognome" class="form-control" id="billing-surname" placeholder="Last">
        <span id="help-billing-surname" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-street-address">Billing street address</label>
        <input type="billing-street-address" name="indirizzo" class="form-control" id="billing-street-address" placeholder="123 Street">
        <span id="help-billing-street-address" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-extended-address">Billing extended address</label>
        <input type="billing-extended-address" name="indirizzo" class="form-control" id="billing-extended-address" placeholder="Unit 1">
        <span id="help-billing-extended-address" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-locality">Billing locality</label>
        <input type="billing-locality" class="form-control" id="billing-locality" placeholder="City">
        <span id="help-billing-locality" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-region">Billing region</label>
        <input type="billing-region" class="form-control" id="billing-region" placeholder="State">
        <span id="help-billing-region" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-postal-code">Billing postal code</label>
        <input type="billing-postal-code" class="form-control" id="billing-postal-code" placeholder="12345">
        <span id="help-billing-postal-code" class="help-block"></span>
      </div>
      <div class="form-group">
        <label for="billing-country-code">Billing country code (Alpha 2)</label>
        <input type="billing-country-code" class="form-control" id="billing-country-code" placeholder="XX">
        <span id="help-billing-country-code" class="help-block"></span>
      </div>
    </div>
  </div>
  
  <div class="row">
    <div class="col-xs-12">
      <table class="table">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Number (successful with no challenge)</td><td>4000000000001000</td></tr>
        <tr><td>Number (successful with challenge)</td><td>4000000000001091</td></tr>
                <tr><td>Number (unsuccessful with challenge)</td><td>4000000000001109</td></tr>
        <tr><td>Expiration Date (for sandbox testing, year must be exactly 3 years in the future)</td><td>12/22</td></tr>
        <tr><td>CVV</td><td>123</td></tr>
        <tr><td>Postal Code</td><td>12345</td></tr>
      </table>
    </div>
  </div>


    <h1>Importo totale da pagare <span id="total"></span> $</h1>


  <div class="col-xs-12 nonce-group hidden">
    <p class="lead"> Payment method nonce received: </p>
    <div class="input-group">
      <span class="input-group-addon lead"></span>
      <input readonly name="nonce" class="form-control">
    </div>
  </div>

  <div class="input-group pay-group bt-drop-in-container">
    <div class="row">
      <div class="col-xs-12" >
       <div id="drop-in"></div>
      </div>
    </div>
    
    <div class="row">
      <input id="pay-btn" class="btn btn-success" type="submit" value="Loading...">
      <input class="btn btn-success" type="submit">
    </div>
   </div>
   
</form>

<script>
var dropin;
var total = localStorage.getItem('refreshsum');
document.getElementById("total").innerHTML = total;
var payBtn = document.getElementById('pay-btn');
var nonceGroup = document.querySelector('.nonce-group');
var nonceInput = document.querySelector('.nonce-group input');
var nonceSpan = document.querySelector('.nonce-group span');
var payGroup = document.querySelector('.pay-group');
var billingFields = [
  'email',
  'billing-phone',
  'billing-given-name',
  'billing-surname',
  'billing-street-address',
  'billing-extended-address',
  'billing-locality',
  'billing-region',
  'billing-postal-code',
  'billing-country-code'
].reduce(function (fields, fieldName) {
  var field = fields[fieldName] = {
    input: document.getElementById(fieldName),
    help: document.getElementById('help-' + fieldName)
  };
  
  field.input.addEventListener('focus', function() {
    clearFieldValidations(field);
  });

  return fields;
}, {});

function autofill(e) {
  e.preventDefault();

  billingFields.email.input.value = 'your.email@email.com';
  billingFields['billing-phone'].input.value = '123-456-7890';
  billingFields['billing-given-name'].input.value = 'Jane';
  billingFields['billing-surname'].input.value = 'Doe';
  billingFields['billing-street-address'].input.value = '123 XYZ Street';
  billingFields['billing-locality'].input.value = 'Anytown';
  billingFields['billing-region'].input.value = 'IL';
  billingFields['billing-postal-code'].input.value = '12345';
  billingFields['billing-country-code'].input.value = 'US';
  
  Object.keys(billingFields).forEach(function (field) {
    clearFieldValidations(billingFields[field]);
  });
}

document.getElementById('autofill').addEventListener('click', autofill);

function clearFieldValidations (field) {
  field.help.innerText = '';
  field.help.parentNode.classList.remove('has-error');
}

billingFields['billing-extended-address'].optional = true;

function validateBillingFields() {
  var isValid = true;

  Object.keys(billingFields).forEach(function (fieldName) {
    var fieldEmpty = false;
    var field = billingFields[fieldName];

    if (field.optional) {
      return;
    }

    fieldEmpty = field.input.value.trim() === '';

    if (fieldEmpty) {
      isValid = false;
      field.help.innerText = 'Field cannot be blank.';
      field.help.parentNode.classList.add('has-error');
    } else {
      clearFieldValidations(field);
    }
  });

  return isValid;
}

function start() {
  getClientToken();
}

function getClientToken() {
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 201) {
      onFetchClientToken(JSON.parse(xhr.responseText).client_token);  
    }
  };
  xhr.open("GET", "https://braintree-sample-merchant.herokuapp.com/client_token", true);

  xhr.send(); 
}

function setupDropin (clientToken) {
  return braintree.dropin.create({
    authorization: clientToken,
    container: '#drop-in',
    threeDSecure: true
  })
}

function onFetchClientToken(clientToken) {
  return setupDropin(clientToken).then(function(instance) { 
    dropin = instance;

    setupForm();
  }).catch(function (err) {
     console.log('component error:', err);
  });
}

function setupForm() {
  enablePayNow();
}

function enablePayNow() {
  payBtn.value = 'Pay Now';
  payBtn.removeAttribute('disabled');
}

function showNonce(payload, liabilityShift) {
  nonceSpan.textContent = "Liability shifted: " + liabilityShift;
  nonceInput.value = payload.nonce;
  payGroup.classList.add('hidden');
  payGroup.style.display = 'none';
  nonceGroup.classList.remove('hidden');
}

payBtn.addEventListener('click', function(event) {
  payBtn.setAttribute('disabled', 'disabled');
  payBtn.value = 'Processing...';
  
  var billingIsValid = validateBillingFields();
  
  if (!billingIsValid) {
    enablePayNow();
    
    return;
  }

  dropin.requestPaymentMethod({
    threeDSecure: {
      amount: total,
      email: billingFields.email.input.value,
      billingAddress: {
        givenName: billingFields['billing-given-name'].input.value,
        surname: billingFields['billing-surname'].input.value,
        phoneNumber: billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, ''), // remove (), spaces, and - from phone number
        streetAddress: billingFields['billing-street-address'].input.value,
        extendedAddress: billingFields['billing-extended-address'].input.value,
        locality: billingFields['billing-locality'].input.value,
        region: billingFields['billing-region'].input.value,
        postalCode: billingFields['billing-postal-code'].input.value,
        countryCodeAlpha2: billingFields['billing-country-code'].input.value
      }
    }
  }, function(err, payload) {
    if (err) {
      console.log('tokenization error:');
      console.log(err);
      dropin.clearSelectedPaymentMethod();
      enablePayNow();
      
      return;
    }
      
    if (!payload.liabilityShifted) {
      console.log('Liability did not shift', payload);
      showNonce(payload, false);
      return;
    }

    console.log('verification success:', payload);
    showNonce(payload, true);
      // send nonce and verification data to your server
  });
});

// document.getElementById('formTest').submit();

start();
</script>
@endsection
