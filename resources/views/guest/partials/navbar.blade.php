<header>
       {{-- banner --}}
       <div :class="bannerNone" class="banner">
         <div class="container">
             <p>Clicca <a href="#">qui</a> e riceverai 10% di sconto sul tuo primo ordine</p>
             <p>Affrettati questa offerta scade tra @{{time}}</p>
             <i class="closeBanner fas fa-times" @click="hideBanner"></i>
         </div>
     </div>
     {{-- navbar --}}
     <div class="navbar">
        
        <nav class="container">
           <div class="logo">
              <img src="img/big_logo.png" alt="logo di DeviBool">
            </div>
            <ul class="navbar_elements">
               <li >
                  <i class="fas fa-tree"></i>
                  opzione 1 
                  <i class="fas fa-chevron-down"></i>
               </li>
               <li >
                  <i class="fas fa-tree"></i>
                  opzione 1 
                  <i class="fas fa-chevron-down"></i>
               </li>
               <li >
                  <i class="fas fa-tree"></i>
                  opzione 1 
                  <i class="fas fa-chevron-down"></i>
               </li>
               
            </ul>
            
            <div class="nav_login">
               @if (Route::has('login'))
               @auth
               <a class="btn_primary" href="{{ url('/home') }}">Home</a>
               @else
               <a class="btn_primary" href="{{ route('login') }}">Login</a>
               
               @if (Route::has('register'))
               <a class="btn_primary" href="{{ route('register') }}">Register</a>
               @endif
               @endauth
               @endif
            </div>
         </nav>
         
      </div>
      {{-- navbar --}}
</header>