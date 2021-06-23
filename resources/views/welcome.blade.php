<!doctype html>
<head>
  <meta charset="utf-8">
  <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
</head>

<body>
  <form id="payment-form" action="{{route('admin.makepayment')}}" enctype="multipart/form-data" method="POST">
    @csrf
  	@method('POST')
    <div id="dropin-container"></div>
    <input type="hidden" id="nonce" name="payment_method_nonce"/>
    <button id="submit-button" class="button button--small button--green">Purchase</button> 
  </form>
  <script src="{{asset('js/payments.js')}}"></script>
  <script>
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
</body>

</html>