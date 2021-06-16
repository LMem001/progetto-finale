@extends('layouts.base')

@section('pageTitle')
   {{$restaurant->rest_name}}
  
@endsection


@section('content')
<div class="container">
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
            <tr>
                <td>{{$food->name}}</td>
                <td>{{$food->food_price}}</td>
                <td>{{$food->tagCourse}}</td>
                <td>{{$food->allergens}}
                <td class="buttons">
                    <a href="{{route('admin.food.edit', ['food' => $food->id ])}}"><button type="button" class="btn btn-info">Modifica</button></a>
                    <form action="{{route('admin.food.destroy', [ 'food' => $food->id ])}}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Elimina</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection