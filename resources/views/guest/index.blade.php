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

@endsection

@section('css')
<link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')

    {{-- banner --}}
    <div :class="bannerNone" class="banner">
        <div class="container">
            <p>Clicca <a href="#">qui</a> e riceverai 10% di sconto sul tuo primo ordine</p>
            <p>Affrettati questa offerta scade tra @{{time}}</p>
            <i class="closeBanner fas fa-times" @click="hideBanner"></i>
        </div>
    </div>

    {{-- jumbotron --}}
    <section id="jumbotron">
        <div class="jumbo-content">

            <h1 class="mt_3">Slogan Super Figo</h1>

            <h2  class="mt_3" >Secondo Slogan Super Figo (solo che un po' più piccolo e si spera venga anche un po' più lungo)</h2>

            <!-- search a restaurant -->
            <div class="input-jumbotron-container mt_4">
                <form action="">
                    <input type="search" placeholder="Inserisci il nome del ristorante"/>
                </form>
            </div>            
        </div>
    </section>

    {{-- introduction --}}
    <section id="introduction">
        <div class="content">
            <h2><span class="logo_span">DeliBool</span> : tutta la qualità romana a portata di un click </h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil deserunt repudiandae nulla, quas et facilis consectetur eligendi beatae ducimus, at suscipit commodi quam nemo!</p>
        </div>
    </section>

    {{-- presentation --}}
    <section id="presentation">
        <div class="content">
            <div class="box">
                <div class="box_content">
                    <p class="img">placeholder per immagine di consegna con il motorino</p>
                    <p>Roba scritta tipo "consegnamo a domicialio super veloci" hic quos et libero alias rerum fugiat quod minus.</p>
                </div>
            </div>
            <div class="box">
                <div class="box_content">
                    <p class="img">placeholder di schermi</p>
                    <p>Puoi ordinare con <span class="delivebool">Delivebool</span> dove e quando vuoi ! WOW XD</p>
                </div>
            </div>
            <div class="box">
                <div class="box_content">
                    <p class="img">placeholder per immagine di del tipo dallo psicologo che ordina</p>
                    <p>Puoi ordinare anche dallo psicologo !</p>
                </div>
            </div>
        </div>
    </section>

@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection