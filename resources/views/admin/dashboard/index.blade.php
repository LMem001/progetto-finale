@extends('layouts.base')

@section('pageTitle')
   {{$restaurant->rest_name}}
  
@endsection

@section('content')
    <div class="coverImage">
        <img src="{{ asset('storage/' . $restaurant->img_cover) }}" alt="immagine di copertina">
    </div>
    <div class="contenuto">
        <div class="dashboard">
            <div class="rest">
                <div class="logo_rest">
                    <img src="{{ asset('storage/' . $restaurant->img_profile) }}" alt="logo del ristorante">            
                </div>

                <div class="info_rest">
                    <ul>
                        <li>
                            Ristorante :
                            <span class="data">
                                {{$restaurant->rest_name}}
                            </span> 
                        </li>
                        <li>
                            Utente :
                            <span class="data">
                                {{$restaurant->user->name}} {{$restaurant->user->lastname}}
                            </span> 
                        </li>
                        <li>
                            Email : 
                            <span class="data">
                                {{$restaurant->rest_email}}
                            </span> 
                        </li>
                        <li>
                            Telefono 
                            <span class="data">
                                {{$restaurant->phone}}
                            </span> 
                        </li>
                        <li>
                            Indirizzo : 
                            <span class="data">
                                {{$restaurant->address}}
                            </span> 
                        </li>
                        <li>
                            Orario di apertura :                        
                            <span class="data">
                                {{$restaurant->open_time}} - {{$restaurant->close_time}}
                            </span> 
                        </li>
                    </ul>
                </div>
            </div>


            <div class="rest_social">
                <h3>Sui social: </h3>
                <ul >
                    <li>
                        <a href="{{$restaurant->rest_facebook}}">
                            <i class="fab fa-facebook-f"></i>
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a href="{{$restaurant->rest_instagram}}">
                            <i class="fab fa-instagram"></i>
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a href="{{$restaurant->rest_tripadvisor}}">
                            <i class="fab fa-tripadvisor"></i>
                            TripAdvisor
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="add_product">
                <a class ="btn_primary" href="{{route('admin.food.create')}} ">
                    Aggiungi Un Prodotto
                </a>
            </div>

            {{-- tabella --}}
            <div class="my_table">
                <h2>I tuoi prodotti</h2>
                <table class="table table-striped">
                    {{-- titoli --}}
                    <thead>
                        <tr>
                            <th>NOME PRODOTTO</th>
                            <th>PREZZO</th>
                            <th>TIPOLOGIA PORTATA</th>
                            <th>ALLERGENI</th>
                            <th></th>
                        </tr>
                    </thead>
                    {{-- righe con contenuto --}}
                    <tbody>
                        @foreach ($restaurant->foods as $food)
                        <tr class="products_row">
                            <td>{{$food->name}}</td>
                            <td>{{$food->food_price}}</td>
                            <td>{{$food->tagCourse}}</td>
                            <td>{{$food->allergens}}</td>
                            <td class="buttons">
                                <a class="edit" href="{{route('admin.food.edit', ['food' => $food->id ])}}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                                </a>
                                
                                <form action="{{route('admin.food.destroy', [ 'food' => $food->id ])}}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button class="deletetrash" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                                </button>

                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
             {{-- tabella --}}
             <div class="my_table">
                <h2>ordini ricevuti</h2>
                <table class="table table-striped">
                    {{-- titoli --}}
                    <thead>
                        <tr>
                            <th>ID pagamento</th>
                            <th>Data</th>
                            <th>Metodo di pagamento</th>
                            <th>Prodotti</th>
                            <th>totale</th>
                        </tr>
                    </thead>
                    {{-- righe con contenuto --}}
                    <tbody>
                        @foreach ($orders as $order)
                        <tr class="products_row">
                            <td>{{$order->id}}</td>
                            <td>{{$order->pickup_date}}</td>
                            <td>{{$order->payment_type}}</td>
                            <td>
                                <button class="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">mostra</button>
                                <ul class="collapse" id="collapseExample">
                                    

                                 @foreach ($order->foods as $food)
                                    <li>
                                        {{$food->name}}
                                    </li>
                                @endforeach 
                                </ul>
                            </td>
                            <td>{{$order->total_order}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    @if (session('message'))
    <div class="alert alert-success" style="position: fixed; bottom: 30px; right: 30px">
        {{ session('message') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
@endsection