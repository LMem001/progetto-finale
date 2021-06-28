@extends('layouts.base')

@section('pageTitle')
	Aggiungi nuovo prodotto
@endsection
@section('content')
<div class="container_create_food card">
   <div class="card-header">
      <h2>Aggiungi un piatto al menu</h2>
   </div>
   <div class="card-body">
      @if ($errors->any())
         <div class="alert alert-danger">
            <ul>
               @foreach ($errors->all() as $error)
                  <li>{{ $error }}</li>
               @endforeach
            </ul>
         </div>
      @endif

      <form action="{{route('admin.food.store')}}" method="POST">
         @csrf
         @method('POST')
         {{-- Nome prodotto --}}
         <div class="form-group">
            <label for="name">Nome del prodotto</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Nome Prodotto">
         </div>
         {{-- Prezzo --}}
         <div class="form-group">
            <label for="food_price">Prezzo</label>
            <input type="text" class="form-control" id="food_price" name="food_price" placeholder="Prezzo">
         </div>
         {{-- Tipologia --}}
         <div class="form-group">
            <label for="tagCourse">Tipologia</label>
            <select class="form-control" id="tagCourse" name="tagCourse">
               <option value="antipasto">Antipasto</option>
               <option value="primo">Primo</option>
               <option value="secondo">Secondo</option>
               <option value="dessert">Dessert</option>
               <option value="piatto_unico">Piatto unico</option>
               <option value="fast_food">Fast-food</option>
               <option value="bevanda">Bevanda</option>
               <option value="altro">Altro</option>
            </select>
         </div>
         {{-- Allergeni --}}
         <div class="form-group">
            <label for="allergens">Segnala eventuali allergeni</label>
            <input type="text" class="form-control" id="allergens" name="allergens" placeholder="Allergeni">
         </div>
         {{-- tags --}}
         <div class="mt-3 tag_section">
            <h3 class="fake_label">Tipologia ristorante</h3>
            <div class="form-check">
               <input class="form-check-input" type="checkbox" value="0" id="veggie" name="veggie">
               <label class="form-check-label" for="veggie">Vegetariano</label>
            </div>
            <div class="form-check">
               <input class="form-check-input" type="checkbox" value="0" id="vegan" name="vegan">
               <label class="form-check-label" for="vegan">Vegano</label>
            </div>
            <div class="form-check">
               <input class="form-check-input" type="checkbox" value="0" id="spicy" name="spicy">
               <label class="form-check-label" for="spicy">Piccante</label>
            </div>
            <div class="form-check">
               <input class="form-check-input" type="checkbox" value="0" id="glutenfree" name="glutenfree">
               <label class="form-check-label" for="glutenfree">Gluten Free</label>
            </div>
         </div>
         {{-- Invia --}}
         <div class="mt-4 btn_center">
            <button type="submit" class="btn btn_primary">Crea</button>
         </div>
      </form>
   </div>
</div>
@endsection