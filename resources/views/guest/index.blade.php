@extends('layouts/main')

@section('cdn')
    {{-- VUE development version, includes helpful console warnings --}}
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

    {{-- axios --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>
@endsection

@section('css')
    <link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')
    <main>
        {{-- jumbotron --}}
        <section id="jumbotron">
            <div class="jumbo-content">

                <h1 class="mt_3">Slogan Super Figo</h1>

                <h2  class="mt_3" >Secondo Slogan Super Figo (solo che un po' più piccolo e si spera venga anche un po' più lungo)</h2>

                <!-- search a restaurant -->
                {{-- <div class="input-jumbotron-container mt_4">
                    <form action="">
                        <input type="search" placeholder="Inserisci il nome del ristorante"/>
                    </form>
                </div>             --}}
            </div>
        </section>

        {{-- introduction --}}
        <section id="introduction">
            <div class="titles">
                <h2><span class="logo_span">DeliBool</span> : tutta la qualità romana a portata di un click </h2>
                <p>Più di 25 ristoranti da cui ordinare. Goditi promozioni e risparmi illimitati ogni giorno. Deviboo é il più veloce e affidabile servizio di delivery che puoi trovare in cittá, operiamo su tutta Roma!</p>
            </div>
            {{-- presentation --}}
            <div class="presentation">
                <div class="box_container container">
                    <div class="box">
                        <div class="box_content">
                            <h3>velocissimi</h3>
                            <img src="img/point_moped.png" alt="scooter">
                            <p>I piatti che prefeisci dai tuoi ristoranti preferiti. in meno di 15 minuti o all'ora che desideri tu</p>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box_content">
                            <img src="img/phone.png" alt="1 ml delivery">
                            <h3>fidati</h3>
                            <p>Nel 2021 <span class="delivebool">Delivebool</span> ha raggiunto un milione di clienti! Siamo i migliori e non abbiamo mai sbagliato una consegna </p>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box_content">
                            <h3>comodo</h3>
                            <img src="img/points_relax.png" alt="sofa">
                            <p>Puoi ordinare comodamente dal tuo dovano in pieno relax allo stesso prezzo di sempre se se orndini nei prossimi  @{{time}} minuti riceverai uno sconto del 20%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {{-- category --}}
        <section id="category">
            <div class="categories container">

                <div class="category-card" v-on:mouseover="selectedType = -1" @click='filtredRestaurantByType'>
                    <div class="icon">
                        <img src="img/icon/tutti.png" alt="all types">
                    </div>
                    <div class="type-name">
                        <h4>tutti</h4>
                    </div>
                </div>
                
                <!-- card  -->
                <div class="category-card" v-for="(type, index) in restaurants_types" v-on:mouseover="selectedType = index" @click='filtredRestaurantByType'>
                    <div class="icon">
                        <img :src="'img/icon/' + type.restaurant_type + '.png'" alt="type icon">
                    </div>
                    <div class="type-name">
                        <h4>@{{type.restaurant_type}}</h4>
                    </div>
                </div>
            </div>
        </section>

        {{-- restaurants --}}
        <section id="restaurants">
            <div class="container">
                <div class="restaurant_card" v-for="restaurant in restaurants">
                    <a class="content" :href="'http://localhost:8000/restaurant/show/' + restaurant.slug">
                        <div class="logo_rest">
                            <img src="https://via.placeholder.com/350x150" alt="">
                        </div>
                        <div class="restaurant_info">
                            <h3>@{{restaurant.rest_name}}</h3>
                            <small class="orario">@{{restaurant.open_time}} - @{{restaurant.close_time}}</small>
                            
                            {{-- <div><small>@{{getRestTypeName}}</small></div> --}}
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </main>
@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection