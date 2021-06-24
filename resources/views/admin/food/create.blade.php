@extends('layouts.base')

@section('pageTitle')
	Aggiungi un nuovo prodotto
@endsection

@section('content')

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
      <div class="form-group">
         <label for="name">Nome del prodotto</label>
         <input type="text" class="form-control" id="name" name="name" placeholder="Nome Prodotto">
      </div>
      <div class="form-group">
         <label for="food_price">Prezzo</label>
         <input type="text" class="form-control" id="food_price" name="food_price" placeholder="Prezzo">
      </div>
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
      <div class="form-group">
         <label for="allergens">Segnala eventuali allergeni</label>
         <input type="text" class="form-control" id="allergens" name="allergens" placeholder="Allergeni">
      </div>
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
      <div class="mt-3">
         <button type="submit" class="btn btn-primary">Crea</button>
      </div>
   </form>
      
@endsection