<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- cdn -->
    @yield('cdn')

    <!-- css -->
    @yield('css')

    <!-- titolo pagina -->
    <title>@yield('page-title')</title>
    
</head>
<body>
    <!-- navbar -->
    @yield('navbar')

    <!-- main -->
    @yield('content')

    <!-- footer -->
    @yield('footer')
</body>
</html>