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
        <option value="antipasto" {{'antipasto' == old('tagCourse') || $food->tagCourse == 'antipasto' ? 'selected' : ''}} >Antipasto</option>
        <option value="primo" {{'primo' == old('tagCourse') || $food->tagCourse == 'primo' ? 'selected' : ''}}>Primo</option>
        <option value="secondo" {{"secondo" == old('tagCourse') || $food->tagCourse == "secondo" ? 'selected' : ''}}>Secondo</option>
        <option value="dessert" {{'dessert' == old('tagCourse') || $food->tagCourse == 'dessert' ? 'selected' : ''}}>Dessert</option>
        <option value="piatto_unico" {{'piatto_unico' == old('tagCourse') || $food->tagCourse == 'piatto_unico' ? 'selected' : ''}}>Piatto unico</option>
        <option value="fast_food" {{'fast_food' == old('tagCourse') || $food->tagCourse == 'fast_food' ? 'selected' : ''}}>Fast-food</option>
        <option value="bevanda"  {{'bevanda' == old('tagCourse') || $food->tagCourse == 'bevanda' ? 'selected' : ''}}>Bevanda</option>
        <option value="altro" {{'altro' == old('tagCourse') || $food->tagCourse == 'altro' ? 'selected' : ''}}>Altro</option>
      </select>
    </div>
   <div class="form-group">
		<label for="allergens">Segnala eventuali allergeni</label>
		<input type="text" class="form-control" id="allergens" name="allergens" placeholder="Allergeni" value="{{old('allergens') ? old('allergens') : $food->allergens}}">
	</div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox"  id="veggie" name="veggie" {{ old('veggie', $food->veggie) ? 'checked' : '' }}>
      <label class="form-check-label" for="veggie">Vegetariano</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" id="vegan" name="vegan" {{ old('vegan', $food->vegan) ? 'checked' : '' }}>
      <label class="form-check-label" for="vegan">Vegano</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" id="spicy" name="spicy" {{ old('spicy', $food->spicy) ? 'checked' : '' }}>
      <label class="form-check-label" for="spicy">Piccante</label>
   </div>
   <div class="form-check">
      <input class="form-check-input" type="checkbox" id="glutenfree" name="glutenfree" {{ old('glutenfree', $food->glutenfree) ? 'checked' : '' }}>
      <label class="form-check-label" for="glutenfree">Gluten Free</label>
   </div>
	<div class="mt-3">
		<button type="submit" class="btn btn-primary">Crea</button>
	</div>
</form>
	
@endsection