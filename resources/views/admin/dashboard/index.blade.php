@extends('layouts.base')

@section('pageTitle')
    Il tuo ristorante
@endsection

@section('content')
<div class="container">
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
                    <a href="{{route('admin.food.show', ['food' => $food->id ])}}"><button type="button" class="btn btn-info">Visualizza</button></a>
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