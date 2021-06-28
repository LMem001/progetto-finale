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
                    <ul>
                        <li>
                            Indirizzo : @{{deviBool_info.address}}
                        </li>
                        <li>
                            Telefono : @{{deviBool_info.phone}}
                        </li>
                        <li>
                            Email : @{{deviBool_info.email}}
                        </li>
                    </ul>
                </div>
            </section>
            
            <section class="sidebar">
                <div class="sidebar_container">

                    
                    <h2>Servizio clienti </h2>
                    <ul>
                    <li>
                        <a href="#">FAQs</a>
                    </li>
                    <li>
                        <a href="#">Contatta assistenza</a>
                    </li>
                    <li>
                        <h3>Feedback</h3>
                        <p>aiutaci a migliorare il nostro sito</p>
                        <a href="https://docs.google.com/forms/d/1QB-_GvVulbM2lSmOjOjzmywGDgN5dZetbyX5uMlzYVQ/viewform?edit_requested=true">Invia un feedback</a>
                    </li>
                    <li>
                        Scoprici anche sui social e sulle app Android, iOS e Hauwei
                        <ul>
                            <li>
                                TODO social list
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            </section>
        </div>    
    </main>
    @endsection
    
    @section('script')
    <script src="{{asset('js/info.js')}}"></script>
    @endsection