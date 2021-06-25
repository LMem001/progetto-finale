<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- fontawesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        
    {{-- moment.js --}}
    <script src="https://momentjs.com/downloads/moment.js"></script>
    {{-- google fonts --}}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet">

    <!-- altre cdn -->
    @yield('cdn')

    <!-- css -->
    @yield('css')

    <!-- titolo pagina -->
    <title>DeviBool | @yield('page-title')</title>
    
</head>

    <body>
        <div class="preloader">
            <h1>Deviboo</h1>
            <div class="acrobata">
                <div class="monocicle">
                    <img class="leftArm" src="/img/preloader/left_arm.png" alt="">
                    <img class="acrobatbody" src="/img/preloader/base_monocik.png" alt="">
                    <img class="wheel" src="/img/preloader/wheel.png" alt="">  
                    <img class="rightArm" src="/img/preloader/right_arm.png" alt="">   
                </div>
            </div>
            
            <div class="line"></div>
            <div class="skyline">
                <img src="/img/skyline_roma.png" alt="">
            </div>
        </div>

        <div id="app">
            <!-- header -->
            @include('guest.partials.navbar')
            
            <!-- main -->
            @yield('content')

            <!-- footer -->
            @include('guest.partials.footer')
        </div>
    </body>

    @yield('script')
</html>
