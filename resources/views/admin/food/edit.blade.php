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

<form action="{{route('admin.food.update', ['food' => $food->id])}}" method="POST">
	@csrf
	@method('PUT')
	<div class="form-group">
		<label for="name">Nome del prodotto</label>
		<input type="text" class="form-control" id="name" name="name" placeholder="Nome Prodotto" value="{{old('name') ? old('name') : $food->name}}">
	</div>
	<div class="form-group">
		<label for="food_price">Prezzo</label>
		<input type="text" class="form-control" id="food_price" name="food_price" placeholder="Prezzo" value="{{old('food_price') ? old('food_price') : $food->food_price}}">
	</div>
   <div class="form-group">
      <label for="tagCourse">Tipologia</label>
      <select class="form-control" id="tagCourse" name="tagCourse">
        <option value="antipasto" @if (old('tagCourse') == 'antipasto') selected="selected" @endif>Antipasto</option>
        <option value="primo" @if (old('tagCourse') == 'primo') selected="selected" @endif>Primo</option>
        <option value="secondo" @if (old('tagCourse') == 'secondo') selected="selected" @endif>Secondo</option>
        <option value="dessert" @if (old('tagCourse') == 'dessert') selected="selected" @endif>Dessert</option>
        <option value="piatto_unico" @if (old('tagCourse') == 'piatto_unico') selected="selected" @endif>Piatto unico</option>
        <option value="fast_food" @if (old('tagCourse') == 'fast_food') selected="selected" @endif>Fast-food</option>
        <option value="bevanda"  @if (old('tagCourse') == 'bevanda') selected="selected" @endif>Bevanda</option>
        <option value="altro" @if (old('tagCourse') == 'altro') selected="selected" @endif>Altro</option>
      </select>
    </div>
   <div class="form-group">
		<label for="allergens">Segnala eventuali allergeni</label>
		<input type="text" class="form-control" id="allergens" name="allergens" placeholder="Allergeni" value="{{old('allergens') ? old('allergens') : $food->allergens}}">
	</div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" value="0" id="veggie" name="veggie" @if (old('veggie') == 1) selected="selected" @endif>
      <label class="form-check-label" for="veggie">Vegetariano</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" value="0" id="vegan" name="vegan" @if (old('vegan') == 1) selected="selected" @endif>
      <label class="form-check-label" for="vegan">Vegano</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" value="0" id="spicy" name="spicy" @if (old('spicy') == 1) selected="selected" @endif>
      <label class="form-check-label" for="spicy">Piccante</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" value="0" id="glutenfree" name="glutenfree" @if (old('glutenfree') == 1) selected="selected" @endif>
      <label class="form-check-label" for="glutenfree">Gluten Free</label>
   </div>
	<div class="mt-3">
		<button type="submit" class="btn btn-primary">Crea</button>
	</div>
</form>
	
@endsection