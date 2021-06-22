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
  <div id="app">
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
                  <span class="btn btn-outline-secondary btn-total" for="amount">Totale: @{{total}} €</span>
                  <input
                  class="btn btn-primary btn-pay" type="submit" value="Paga ora"/>
                  {{-- @click="puliziaCache"  --}}
                  <input type="hidden" id="nonce" name="payment_method_nonce"/>
                  {{-- <input type="hidden" :value="finalPrice" id="amount" name="amount"/> --}}
                </div>

            </form>
        </div>
    </div>
  </div>
</div>
<script src="{{asset('js/guest.js')}}"></script>
</html>