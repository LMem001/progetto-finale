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
        <section id ="info">
            <h1>Contatti</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio laborum rem eligendi quidem! Possimus nam laboriosam, hic fugiat, assumenda eius adipisci quam officiis deleniti ex atque voluptatem dolore, accusamus nihil?</p>
            <ul>
                <li>
                    Indirizzo : @{{deviBool_info.address}}
                </li>
                <li>
                    Telefono : @{{deviBool_info.address}}
                </li>
                <li>
                    Email : @{{deviBool_info.address}}
                </li>
                <li>
                    address : @{{deviBool_info.address}}
                </li>
            </ul>
        </section>
        <div class="sidebar">
            <h3>Servizio clienti </h3>
            <ul>
                <li>
                    <a href="#">FAQs</a>
                </li>
                <li>
                    <a href="#">Contatta assistenza</a>
                </li>
                <li>
                    <h4>Feedback</h4>
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
    </div>    
@endsection

@section('script')
    <script src="{{asset('js/info.js')}}"></script>
@endsection