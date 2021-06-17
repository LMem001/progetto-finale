@extends('layouts.base')

@section('pageTitle')
   {{$restaurant->rest_name}}
  
@endsection



@section('content')
<div class="coverImage">
    {{-- <img src="{{ asset('img/' . $restaurant->img_cover) }}" /> --}}
    {{-- <img src="{{$restaurant->img_cover}}" alt=""> --}}
</div>
<div class="container dashboard">>
   <div class="restaurant_opentime">
      <p>{{$restaurant->open_time}} - {{$restaurant->close_time}}</p> 
   </div>
   <div class="contacts">
      <p class="email">{{$restaurant->rest_email}}</p>
      <p class="phone">{{$restaurant->phone}}</p>
      <p class="adress">{{$restaurant->adress}}</p>
   </div>
   <div class="social">
      <p class="facebook">{{$restaurant->rest_facebook}}</p>
      <p class="instagram">{{$restaurant->rest_instagram}}</p>
      <p class="tripadvisor">{{$restaurant->rest_tripadvisor}}</p>
   </div>
    <div class="text-right mb-5">
        <a href="{{route('admin.food.create')}}"><button type="button" class="btn btn-info">Aggiungi Un Prodotto</button></a>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>NOME PRODOTTO</th>
                <th>PREZZO</th>
                <th>TIPOLOGIA PORTATA</th>
                <th>ALLERGENI</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($restaurant->foods as $food)
            <tr class="productRow">
                <td>{{$food->name}}</td>
                <td>{{$food->food_price}}</td>
                <td>{{$food->tagCourse}}</td>
                <td>{{$food->allergens}}
                <td class="buttons">
                    <a class="edit" href="{{route('admin.food.edit', ['food' => $food->id ])}}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg></a>
                    <form action="{{route('admin.food.destroy', [ 'food' => $food->id ])}}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="deletetrash" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection