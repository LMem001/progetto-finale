

@extends('layouts/main')

@section('cdn')
{{-- development version, includes helpful console warnings --}}
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
{{-- fontawesome --}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
{{-- moment.js --}}
<script src="https://momentjs.com/downloads/moment.js"></script>
@endsection

@section('css')
<link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')
<<<<<<< Updated upstream
<div id="app">
    {{-- banner --}}
    <div :class="bannerNone" class="banner">
        <div class="container">
            <p>Clicca <a href="#">qui</a> e riceverai 10% di sconto sul tuo primo ordine</p>
            <p>Affrettati questa offerta scade tra @{{time}}</p>
            <i class="closeBanner fas fa-times" @click="hideBanner"></i>
        </div>
    </div>
    {{-- //banner --}}
</div>
=======
    <!-- jumbotron -->
    <section id="jumbotron">
        <div class="jumbo-content">

            <h1>
                Slogan Super Figo
            </h1>

            <h2>
                Secondo Slogan Super Figo (solo che un po' più piccolo)
            </h2>

            <!-- search a restaurant -->
            <div class="input-jumbotron-container">
                <form action="">
                    <input type="search" placeholder="Inserisci il nome del ristorante"/>
                </form>
            </div>
            <!-- search a restaurant -->
            
        </div>
    </section>
    <!-- end jumboron -->

    <script>
        function changeBgJb(){
            const imgBgJb = [
                'url("https://wallpaperaccess.com/full/462860.jpg")',
            
                'url("https://livewallpaperhd.com/wp-content/uploads/2020/09/Food-Picture-Desktop-Backgrounds.jpg")',
            
                'url("https://livewallpaperhd.com/wp-content/uploads/2020/09/HD-Wallpaper-Food-Picture.jpg")',

                'url("https://i.pinimg.com/564x/d3/6d/46/d36d462db827833805497d9ea78a1343.jpg")',
            ]
            
            const jumbo = document.getElementById("jumbotron")
            
            const bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
            jumbo.style.backgroundImage = bgJb;
        } 
        setInterval(changeBgJb, 2000)
    </script>
>>>>>>> Stashed changes
@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection