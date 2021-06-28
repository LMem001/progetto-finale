
@extends('layouts/main')

@section('cdn')
{{-- development version, includes helpful console warnings --}}
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

{{-- axios --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>
@endsection

@section('css')
<link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')
    <!-- info -->
    <section id="restaurant-profile">
        <div class="coverImage">
            <img :src='"/storage/" + selectedRestaurant.img_cover' alt="cover restaurant">
        </div>
        <div class="rest-info-container">
            <div class="rest-info">
                <div class="rest-logo">
                    <img :src='"/storage/" + selectedRestaurant.img_profile' alt="profile img">
                </div>
                <div class="rest-info-content">
                    <h2>@{{selectedRestaurant.rest_name}}</h2>
                    <h3>@{{selectedRestaurant.rest_type}}</h3>
                    <p>@{{selectedRestaurant.address}}</p> 
                    <p>Aperto dalle @{{selectedRestaurant.open_time }} alle @{{selectedRestaurant.close_time }}</p>
                </div>
            </div>
        </div>
    </section>
    
    <div id="show-main">
        <div class="container-show">

            <!-- Portata -->
            <section id="food-type-selection" class="side_col">
                <div class="food-selection-container">
                    <h2>Portata</h2>
                    <ul>
                        <li v-for="course in courses">
                            <a :href="'#' + course">@{{course}}</a>
                        </li>
                    </ul>
                </div>
            </section>
            <!-- end selction food type -->

            <!-- menu -->
            <section id="rest-menu">
                <div class="rest-menu-container">
                    <!-- antipsati -->
                    <div class="course" v-for="course in restaurantFoods" :id="course.id"  v-if="course.food.length > 0"> 
                        <h2>@{{course.course}}</h2>
                        <ul>
                            <li v-for="food in course.food">
                                <div class="rest-menu-item" v-on:mouseover="foodId = food.id">
                                    <h4>@{{food.name }}</h4>
                                    
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="removeItem"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="addItem"></i>
                                    </div> 
                                    <p class="food-price">@{{ food.food_price }} €</p>
 
                                </div>
                            </li>
                        </ul>
                    </div>
            </section>
            <!-- end menu -->
    
            <!-- cart -->
            <section id="cart" class="side_col">
                <div class="cart-container">
                    <h2>Il tuo ordine</h2>

                    <!-- selected item -->
                    <div class="cart-content">
                        <ul>
                            <li v-if="food.quantity > 0" v-for="food in cart">
                                <div class="product">
                                    <div class="cart_item_name">
                                        @{{food.name}} 
                                    </div>
                                    <div class="cart_item_quantity">
                                        x@{{food.quantity}}
                                    </div>
                                    <div class="cart_item_price">
                                        @{{(food.food_price * food.quantity).toFixed(2)}}
                                    </div>
                                    {{-- <span class="quantity">@{{food.quantity}}</span>
                                    <span class="price">@{{(food.food_price * food.quantity).toFixed(2)}}</span> --}}
                                </div>
                            </li>
                        </ul>
                        
                        <div class="total">
                            <h3>Totale: @{{sum.toFixed(2)}} €</h3>
                            <small>di cui iva 22%  -  @{{(sum * 0.22).toFixed(2)}} €</small>
                            
                            <div class="btn_pay">

                                <a class="btn_primary" href="{{route('admin.payment')}}">paga</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div id="show-main">

    <section id="mini-cart">
        <div class="mini-cart-content">
            <ul>
                <li v-if="food.quantity > 0" v-for="food in cart">
                    <div class="product">
                        <div class="cart_item_name">
                            @{{food.name}} 
                        </div>
                        <div class="cart_item_quantity">
                            x@{{food.quantity}}
                        </div>
                        <div class="cart_item_price">
                            @{{(food.food_price * food.quantity).toFixed(2)}}
                        </div>
                        {{-- <span class="quantity">@{{food.quantity}}</span>
                        <span class="price">@{{(food.food_price * food.quantity).toFixed(2)}}</span> --}}
                    </div>
                </li>
            </ul>
        </div>

        <div class="mini-cart-button">
            <div class="food-quantity">
                @{{itemsQT}}
            </div>

            <div class="anteprima">
                <a href="{{route('admin.payment')}}">Vai al pagamento</a>
            </div>

            <div class="mini-total">
                <span>@{{sum.toFixed(2)}}€</span>
            </div>
        </div>
    </section>
@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection