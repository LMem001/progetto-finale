<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Braintree-Demo</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>

  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
  <div class="text-center">
    <div class="container">
        <div class="box">
            <form id="payment-form" action="{{ route('payment.process') }}" method="post">
                <div class="wrapper">
                    <div class="input-data">
                        <input type="text" required>
                        <div class="underline"></div>
                        <label>Nome utente</label>
                    </div>
                </div>

                <div class="wrapper">
                    <div class="input-data">
                        <input type="text" required>
                        <div class="underline"></div>
                        <label>Cognome utente</label>
                    </div>
                </div>

                <div class="wrapper">
                    <div class="input-data">
                        <input type="text" required>
                        <div class="underline"></div>
                        <label>Indirizzo di consegna</label>
                    </div>
                </div>

                <div class="wrapper">
                    <div id="dropin-container"></div>
                </div>

                <div class="wrapper payment">
                    <span class="btn btn-outline-secondary btn-total" for="amount">Totale:</span>
                    <input
                    class="btn btn-primary btn-pay" type="submit" value="Paga ora"/>
                    <input type="hidden" id="nonce" name="payment_method_nonce"/>
                    <input type="hidden" :value="finalPrice" id="amount" name="amount"/>
                </div>

            </form>
        </div>
    </div>
  </div>
  <script src="{{asset('js/payments.js')}}"></script>
  <script>
     var button = document.querySelector('#submit-button');

      braintree.dropin.create({
        authorization: 'CLIENT_AUTHORIZATION',
        container: '#dropin-container'
      }, function (createErr, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
            // Submit payload.nonce to your server
          });
        });
      });
  </script>
</body>

</html>