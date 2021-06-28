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
    <!-- rest info -->
    <section id="restaurant-profile">
        <!-- cover img -->
        <div class="coverImage">
            <img :src="selectedRestaurant.img_cover" alt="cover restaurant">
        </div>
        <div class="rest-info-container">
            <div class="rest-info">
                
                <!-- logo img -->
                <div class="rest-logo">
                    <img :src="selectedRestaurant.img_profile" alt="profile img">
                </div>
                
                <!-- info -->
                <div class="rest-info-content">
                    <h2>@{{selectedRestaurant.rest_name}}</h2>
                    <h3>@{{selectedRestaurant.rest_type}}</h3>
                    <p>@{{selectedRestaurant.address}}</p> 
                    <p>Aperto dalle @{{selectedRestaurant.open_time }} alle @{{selectedRestaurant.close_time }}</p>
                </div>
            </div>
        </div>
    </section>
    <!-- rest info -->

@endsection

@section('script')
<script src="{{asset('js/guest.js')}}"></script>
@endsection