{{-- navbar --}}
<div class="navbar">
   <nav>
         <div class="logo">
            {{-- <img src="https://via.placeholder.com/60/000000/FFFFFF/?text=imgLogo" alt="logo DeviBool"> --}}
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