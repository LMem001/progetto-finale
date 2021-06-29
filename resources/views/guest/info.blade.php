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
<link rel="stylesheet" href="{{asset('css/info.css')}}">
@endsection


@section('content')
    <div id="app2">
        <main>
            <section id ="info">
                <div class="info_container">
                    
                    <h1>Contatti</h1>
                    <p>Siamo sempre in crescita, e abbiamo sempre bisogno di persone nuove per arricchire il nostro staff. Per <a href="#">lavorare con noi</a> o qualsiasi altra informazione necessaria, potete trovarci nei seguenti modi</p>
                    <ul class="contatti">
                        <li>
                            <i class="fas fa-phone-alt"></i>
                            Telefono :
                            <br> @{{deviBool_info.phone}}
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            Email : <br>
                             @{{deviBool_info.email}}
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            Indirizzo : <br>
                            @{{deviBool_info.address}}
                        </li>
                    </ul>
                    <div class="google_maps">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1437016256364!2d12.492855326300614!3d41.88976652994141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1624925908097!5m2!1sit!2sit" width="800" height="500" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>    
                </div>
            </section>
            
            <section id="sidebar">
                <div class="sidebar_container">

                    
                    <h2>Servizio clienti </h2>
                    <ul>
                        <li>
                            <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmemegenerator.net%2Finstance%2F67618623%2Fbaby-cant-take-anymore-im-all-out-of-ideas-for-faqs&psig=AOvVaw1HXhGLHkSbDyswxivm9upd&ust=1625016839707000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLinvc7Zu_ECFQAAAAAdAAAAABAD">FAQs</a>
                        </li>
                        <li>
                            <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.teldon.it%2Fhome%2Fpage%2F3%2F&psig=AOvVaw19NjSb8d9eeFrmiSq0nKXi&ust=1625016913218000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNio2PLZu_ECFQAAAAAdAAAAABAP">Contatta assistenza</a>
                        </li>
                        <li>
                            <h2>Feedback</h2>
                            <p>aiutaci a migliorare il nostro sito</p>
                            <a href="https://docs.google.com/forms/d/1QB-_GvVulbM2lSmOjOjzmywGDgN5dZetbyX5uMlzYVQ/viewform?edit_requested=true">Invia un feedback</a>
                        </li>
                        <li>
                            <p>
                                Scoprici anche sui social e sulle app Android, iOS e Hauwei
                            </p>
                            <ul class="socials">
                                <li>
                                    <a href="facebook.com">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="tripadvisor.com">
                                        <i class="fab fa-tripadvisor"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="instagram.com">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    </div>    
    @endsection
    
    @section('script')
    <script src="{{asset('js/info.js')}}"></script>
    @endsection