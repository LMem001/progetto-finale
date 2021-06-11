<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>@yield('pageTitle')</title>
	<link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>
<body>
	<div class="container mt-5">
		<h1>@yield('pageTitle')</h1>
		<div class="mt-5">
			@yield('content')
		</div>
	</div>
</body>
</html>