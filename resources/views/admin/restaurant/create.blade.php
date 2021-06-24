@extends('layouts.base')

@section('pageTitle')
	Aggiungi un ristorante
@endsection

@section('content')
	<div class="edit_container">
		<div class="edit_top">
			<h2>Aggiungi un ristorante</h2>
		</div>
		<div class="edit_bottom">
			@if ($errors->any())
				<div class="alert alert-danger">
					<ul>
						@foreach ($errors->all() as $error)
							<li>{{ $error }}</li>
						@endforeach
					</ul>
				</div>
			@endif

			<form action="{{route('admin.restaurant.store')}}" method="POST" enctype="multipart/form-data">
				@csrf
				@method('POST')
				
				{{-- nome ristorante --}}
				<div class="form-group">
					<label for="rest_name">Nome Ristorante</label>
					<input type="text" class="form-control" id="rest_name" name="rest_name" placeholder="Nome del ristorante">
				</div>

				{{-- orario apertura --}}
				<div class="form-group">
					<label for="open_time">Orario apertura</label>
					<input type="text" class="form-control" id="open_time" name="open_time" placeholder="Orario apertura">
				</div>
				{{-- orario chiusura --}}
				<div class="form-group">
					<label for="close_time">Orario chiusura</label>
					<input type="text" class="form-control" id="close_time" name="close_time" placeholder="Orario chiusura">
				</div>

				{{-- allega immagini1 --}}
				<div class="form-group">
					<label for="close_time">immagine di copertina</label>
					<input type="file" id="img_cover" name="img_cover" placeholder="scegli immagine di copertina">
				</div>
				{{-- allega immagini2 --}}
				<div class="form-group">
					<label for="img_profile">immagine del profilo</label>
					<input type="file" id="img_profile" name="img_profile" placeholder="scegli immagine del profilo">
				</div>
				
				{{-- Email ristorante --}}
				<div class="form-group">
					<label for="rest_email">Email ristorante</label>
					<input type="email" class="form-control" id="rest_email" name="rest_email" placeholder="Email ristorante">
				</div>

				{{-- Telefono ristorante --}}
				<div class="form-group">
					<label for="phone">Telefono ristorante</label>
					<input type="text" class="form-control" id="phone" name="phone" placeholder="Telefono ristorante">
				</div>

				{{-- indirizzo ristorante --}}
				<div class="form-group">
					<label for="address">Indirizzo ristorante</label>
					<input type="text" class="form-control" id="address" name="address" placeholder="Idirizzo ristorante">
				</div>

				{{-- sezione tags --}}
				<div class="mt-3 tag_section">
					<h3>Tipologia ristorante</h3>
					@foreach ($types as $type)
						<div class="form-check">
							<input class="form-check-input" type="checkbox" value="{{$type->id}}" id="{{$type->restaurant_type}}" name="types[]">
							<label class="form-check-label" for="{{$type->restaurant_type}}">
								{{$type->restaurant_type}}
							</label>
						</div>
					@endforeach
				</div>

				{{-- bottone --}}
				<div class="mt-3">
					<button type="submit" class="btn btn-primary">Crea</button>
				</div>

			</form>
		</div>
		
	</div>

@endsection