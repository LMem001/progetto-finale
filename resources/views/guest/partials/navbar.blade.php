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
     <div class="navbar" :class="{'on_scroll': !view.topOfPage}">
         <nav class="container">
            <div class="logo">
               <div class="logo_btn displayNone">
                  <button>insert logo Icon</button>
               </div>
               <img src="/img/bigger_logo.png" alt="logo di DeviBool">
            </div>
            
            <ul class="navbar_elements">
               <li >
                  <a href="#introduction">Chi siamo</a>
               </li>
               <li >
                  <a href="{{ url('/info') }}">Contatti</a>
               </li>
               <li >
                  <a href="#category">Ristoranti</a>
               </li>
               {{-- <li >
                  <i class="fas fa-tree"></i>
                  opzione 1 
                  <i class="fas fa-chevron-down"></i>
               </li>
               --}}
         </ul>
         
         <div class="nav_login">
            @if (Route::has('login'))
            @auth
            <div class="dropdownLogout" v-on:mouseleave="hidelogout">
               <a class ="btn_primary" @click="logouttoggleshow" href="#">{{ Auth::user()->name }} <i class="fas fa-chevron-down"></i></a>
                  <div :class="logoutshow" class="logout">
                     <a href="{{ route('logout') }}"
                     onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                           @csrf
                        </form>
                     </div>
                  </div>
               </div>
               {{-- <a class="btn_primary" href="{{ url('/home') }}">Home</a> --}}
               @else
               <div class="dropDownMenu btn_primary" v-on:mouseleave="hidemenu">
                  <a @click="menutoggleshow" href="#">
                     <i class="fas fa-user-circle"></i>
                     <small>Accesso Utente</small>
                     <i class="fas fa-chevron-down"></i>
                  </a>
                     <div :class="menushow" class="menu">
                        <ul>
                           <li>
                              <a class=" registration" href="{{ route('login') }}">Login</a>

                           </li>

                           <li>
                              <a class=" registration" href="{{ route('register') }}">Registrati</a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               
               @if (Route::has('register'))
               @endif
               @endauth
               @endif
            </nav>
      </nav>
      
   </div>
   {{-- END navbar --}}
</header>
                            