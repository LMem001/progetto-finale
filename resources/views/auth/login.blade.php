@extends('layouts.app')
{{-- (Prende il layout di app.blade.php e riempie gli spazi "vuoti" con i section) --}}

@section('pageTitle')
    Login
@endsection

@section('content')
    <div class="container login">
        <div class="login_windows">
                <div class="card">
                    <div class="card-header">
                        <h2 class="mt_2">Login </h2>
                    </div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            {{-- EMAIL --}}
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            {{-- PASSWORD --}}
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password </label>
                                {{-- <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label> --}}

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror

                                    {{-- Dimenticato la password ? --}}
                                    <div class="forgotten_pw">
                                        @if (Route::has('password.request'))
                                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                                {{ __('Forgot Your Password?') }}
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            {{-- CHECKBOX --}}
                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                        <label class="form-check-label" for="remember">
                                            {{ __('Remember Me') }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {{-- LOGIN/RESETTA PASSWORD --}}
                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4 bottoni">
                                    <a href="#">
                                        <button type="submit" class=" btn_primary">
                                            {{ __('Login') }}
                                        </button>
                                    </a>
                                    <a class=" btn_primary" href="{{ route('register') }}">Registrati</a>
                                </div>
                                <div class="col-md-2 reg_hover">
                                    <p>Ancora non sei registrato ?
                                    <br>
                                    Che aspetti, registrati subito !</p>
                                </div>
                            </div>
                            
                            {{-- LOGIN/RESETTA PASSWORD --}}
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- stampa del messaggio x front end da non eliminare quando modificherete aspetto login--}}
    @if (session('message'))
    <div class="alert alert-success" style="position: fixed; bottom: 30px; right: 30px">
        {{ session('message') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    @endif
    {{-- stampa del messaggio --}}
@endsection
