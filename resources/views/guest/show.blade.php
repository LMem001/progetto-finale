
@extends('layouts/main')

@section('cdn')
{{-- development version, includes helpful console warnings --}}
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
{{-- fontawesome --}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
{{-- moment.js --}}
<script src="https://momentjs.com/downloads/moment.js"></script>
{{-- google fonts --}}
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet">
{{-- axios --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>
@endsection



@section('css')
<link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')
<main>
    <!-- info -->
    <div class="container-show">
        <section id="restaurant-profile">
            <div class="rest-img-background"></div>
            <div class="rest-info-container">
                <div class="rest-info">
                    <div class="rest-logo">
                        <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_103367090-e1571110045215.jpg?auto=format&q=60&fit=max&w=930" alt="">
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

        
        <main>

            <!-- selction -->
            <section id="food-type-selection">
                <div class="food-selection-container">
                    <h2>Portata</h2>
                    <ul>
                        <li v-for="course in courses"><a :href="'#' + course">@{{course}}</a></li>
                    </ul>
                </div>
            </section>

            <!-- menu -->
            <section id="rest-menu">
                <div class="rest-menu-container">
                    <!-- antipsati -->
                    <div id="antipasto" class="course" v-if="antipasti.length > 0"> 
                        <h2>Antipasti</h2>
                        <ul>
                            <li v-for="food in antipasti">
                                <div class="rest-menu-item">
                                    <h3>@{{food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>  
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /antipsati -->
                    <!-- primi -->
                    <div id="primo" class="course" v-if="primi.length > 0"> 
                        <h2>Primi</h2>
                        <ul>
                            <li v-for="food in primi">
                                <div class="rest-menu-item" v-on:mouseover="selectedFood = food.id">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /primi -->
                    <!-- secondi -->
                    <div id="secondo" class="course" v-if="secondi.length > 0"> 
                        <h2>Secondi</h2>
                        <ul>
                            <li v-for="food in secondi">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /secondi -->
                    <!-- dessert -->
                    <div id="dessert" class="course" v-if="dessert.length > 0"> 
                        <h2>Dessert</h2>
                        <ul>
                            <li v-for="food in dessert">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /dessert -->
                    <!-- piatti unici -->
                    <div id="piatto_unico" class="course" v-if="piattiunici.length > 0"> 
                        <h2>Piatti unici</h2>
                        <ul>
                            <li v-for="food in piattiunici">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /piatti unici -->
                    <!-- fast food -->
                    <div id="fast_food" class="course" v-if="fastfood.length > 0"> 
                        <h2>Fast food</h2>
                        <ul>
                            <li v-for="food in fastfood">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /fast food -->
                    <!-- bevande -->
                    <div id="bevanda" class="course" v-if="bevande.length > 0"> 
                        <h2>Drinks</h2>
                        <ul>
                            <li v-for="food in bevande">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /bevande -->
                    <!-- altro -->
                    <div id="altro" class="course" v-if="altro.length > 0"> 
                        <h2>Altro</h2>
                        <ul>
                            <li v-for="food in altro">
                                <div class="rest-menu-item">
                                    <h3>@{{ food.name }}</h3>
                                    <p></p>
                                    <p class="food-price">@{{ food.food_price }}</p>
                                    <div class="addCart">
                                        <i class="fas fa-minus" @click="decrease(food)"></i>
                                        <p class="quantity">@{{ food.quantity }}</p>
                                        <i class="fas fa-plus" @click="add(food, food.id)"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /altro -->
            </section>
    
            <!-- cart -->
            <section id="cart">
                <div class="cart-container">
                    <h2>Il tuo ordine</h2>
                    <div class="cart-content">
                        <ul>
                            <li v-for="food in cart">
                                <div v-if="food.quantity > 0" class="product">
                                    @{{food.name}} 
                                    <span class="quantity">@{{food.quantity}}</span>
                                    <span class="price">@{{(food.food_price * food.quantity).toFixed(2)}}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="total">
                            <h3>prezzo totale: @{{sum.toFixed(2)}}€</h3>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</main>
@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection