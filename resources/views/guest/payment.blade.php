@extends('layouts.base')

@section('cdn')
<script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>


@endsection



@section('content')
{{-- moment.js --}}
<script src="https://momentjs.com/downloads/moment.js"></script>
{{-- VUE development version, includes helpful console warnings --}}
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<div id="paymentApp">
  <div class="row justify-content-center big_contenitore">
    <div class="payment_container">
      <div class="card">
          <div class="card-header">
              <h2 class="mt_2">Pagamento</h2>
          </div>
          <div class="card-body">

            <form id="payment-form" action="{{route('admin.makepayment')}}" enctype="multipart/form-data" method="POST">
              @csrf
              @method('POST')
              {{-- nome --}}
              <div class="form-group">
                <label for="client_name">Nome</label>
                <input type="text" class="form-control" id="client_name" name="client_name" placeholder="Inserisci il tuo nome">
              </div>
              {{-- cognome --}}
              <div class="form-group">
                <label for="client_lastname">Cognome</label>
                <input type="text" class="form-control" id="client_lastname" name="client_lastname" placeholder="Inserisci il tuo cognome">
              </div>
              {{-- indirizzo consegna --}}
              <div class="form-group">
                <label for="client_adress">Indirizzo di consegna</label>
                <input type="text" class="form-control" id="client_adress" name="client_adress" placeholder="Inserisci l'ndirizzo di consegna">
              </div>
              {{-- telefono --}}
              <div class="form-group">
                <label for="client_phone">Telefono</label>
                <input type="text" class="form-control" id="client_phone" name="client_phone" placeholder="Telefono">
              </div>
              {{-- email  --}}
              <div class="form-group">
                <label for="client_email">Email</label>
                <input type="email" class="form-control" id="client_email" name="client_email" placeholder="Email">
              </div>
              {{-- orario_consegna --}}
              <div class="form-group">
                <label for="pickup_date">Orario consegna</label>
                <input type="time" id="pickup_date" name="pickup_date" :min="time" max="18:00" required>
              </div>
              <div class="importo_finale">
                <p class="special_price">
                  Importo Totale: <span> @{{sum}} € </span>
                </p>
              </div>
              {{-- hidden stuff braintree magic o1--}}
              <input type="hidden" id="restaurant_ID" name="restaurant_ID" :value="restID">
              <div>
                <input type="hidden" id="ordered_food" name="ordered_food" :value="foodfordb">
              </div>
              <div>
                <input type="hidden" id="total_order" name="total_order" :value="sum">
              </div>

              {{-- braintree magic p2 --}}
              <div id="dropin-container"></div>
              <input type="hidden" id="nonce" name="payment_method_nonce"/>

              <div class="btn_container">
                <button id="submit-button" class="button btn_primary">Paga</button> 
              </div>
            
            </form>


          </div>
        </div>
      </div>
    </div>
  </div>    
</div>        
          
          
          
<script>
            
        var app = new Vue(
   {
      el: "#paymentApp",

      data:{
        sum: localStorage.getItem('refreshsum'),
        restID: localStorage.getItem('savedrestaurantId'),
        orderFoods: JSON.parse(localStorage.getItem('refreshCart')),
        colsingTime: JSON.parse(localStorage.getItem('slelectedRestTime')),
        foodDB: [],
        foodfordb: "",
        time:'',
      },
      methods: {
        moment: function () {
          return moment();
        },
      },
      beforeMount() {
         this.time = moment().format('HH:mm')
        console.log(this.time)

        this.orderFoods.forEach(element => {
          if(element.quantity > 0){
            product = [];
            product.push(element.id.toString());
            product.push(element.quantity.toString());
            product.push(element.food_price.toString());
            this.foodDB.push(product + "/");
          }
        });
        this.foodfordb = this.foodDB.toString();
        this.foodfordb = this.foodfordb.substring(0,this.foodfordb.length-1);
      }
      
  });
  
    var idRistorante = localStorage.getItem('savedrestaurantId');
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