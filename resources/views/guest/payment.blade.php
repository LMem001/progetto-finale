@extends('layouts.base')

@section('cdn')
<script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
{{-- development version, includes helpful console warnings --}}
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
@endsection

@section('content')
  <div id="payment">
    <p>il prezzo totale da pagare é di </p>
    <form id="payment-form" action="{{route('admin.makepayment')}}" enctype="multipart/form-data" method="POST">
      @csrf
      @method('POST')
  
      <div class="form-group">
        <label for="client_name">Nome</label>
        <input type="text" class="form-control" id="client_name" name="client_name" placeholder="Inserisci il tuo nome">
      </div>
      <div class="form-group">
        <label for="client_lastname">Cognome</label>
        <input type="text" class="form-control" id="client_lastname" name="client_lastname" placeholder="Inserisci il tuo cognome">
      </div>
      <div class="form-group">
        <label for="client_adress">Indirizzo di consegna</label>
        <input type="text" class="form-control" id="client_adress" name="client_adress" placeholder="Inserisci l'ndirizzo di consegna">
      </div>
      <div class="form-group">
        <label for="client_phone">Telefono</label>
        <input type="text" class="form-control" id="client_phone" name="client_phone" placeholder="Telefono">
      </div>
      <div class="form-group">
        <label for="client_email">Email</label>
        <input type="email" class="form-control" id="client_email" name="client_email" placeholder="Email">
      </div>
      
  
      {{-- localstorage  --}}
  
      <div id="dropin-container"></div>
      <input type="hidden" id="nonce" name="payment_method_nonce"/>
      <button id="submit-button" class="button button--small button--green">Purchase</button> 
    </form>
  </div>
  
  <script>
    // var app = new Vue(
    //   {
    //     el: "#payment",

    //     data:{
    //     }
    //   })
        
    var restID = localStorage.getItem('savedrestaurantId');
    var totale = localStorage.getItem('refreshsum');
    const form = document.getElementById('payment-form');
    braintree.dropin.create({
    authorization: "{{ $token }}",
    container: '#dropin-container'
    }, (error, dropinInstance) => {
    if (error) console.error(error);

    form.addEventListener('submit', event => {
    event.preventDefault();

    dropinInstance.requestPaymentMethod((error, payload) => {
      if (error) console.error(error);

      // Step four: when the user is ready to complete their
      //   transaction, use the dropinInstance to get a payment
      //   method nonce for the user's selected payment method, then add
      //   it a the hidden field before submitting the complete form to
      //   a server-side integration
      document.getElementById('nonce').value = payload.nonce;
      form.submit();
    });
  });
});
</script>
@endsection

INIZIO MODIFICHE