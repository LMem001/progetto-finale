<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>pagamento</title>
  {{-- ajax --}}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  {{-- axios --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>
  {{-- development version, includes helpful console warnings --}}
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="https://momentjs.com/downloads/moment.js"></script>
  {{-- braintree --}}
  <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>

  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
  <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.js"></script>

  <div id="dropin-container"></div>
  <button id="submit-button" class="button button--small button--green">Purchase</button> 
  <script src="{{asset('js/payments.js')}}"></script>
  <script>
    var button = document.querySelector('#submit-button');

    braintree.dropin.create({
      authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
      selector: '#dropin-container'
    }, function (err, instance) {
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
          // Submit payload.nonce to your server
        });
      })
    });
  </script>
</body>

</html>