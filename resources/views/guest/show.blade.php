@extends('layouts/main')

@section('css')
<link rel="stylesheet" href="{{asset('css/guest.css')}}">
@endsection

@section('content')
    <!-- info -->
    <div class="container-show">
        <section id="restaurant-profile">
            <div class="rest-img-background"></div>
            <div class="rest-info-container">
                <div class="rest-info">
                    <div class="rest-logo">
                        <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_103367090-e1571110045215.jpg?auto=format&q=60&fit=max&w=930" alt="">
                    </div>
                    <div class="rest-info-content">
                        <h2>Restaurant Name</h2>
                        <h3>Restaurant Type</h3>
                        <p>Restaurant Address</p>
                        <p>Apertdo dalle Opening Time alle Closing Time</p>
                    </div>
                </div>
            </div>
        </section>

        
        <main>

            <!-- selction -->
            <section id="food-type-selection">
                <div class="food-selection-container">
                    <ul>
                        <li>Food Type (Ex. Pizze Rosse)</li>
                        <li>Food Type (Ex. Pizze Bianche)</li>
                        <li>Food Type (Ex. Dessert)</li>
                    </ul>
                </div>
            </section>

            <!-- menu -->
            <section id="rest-menu">
                <div class="rest-menu-container">
                    <!-- food type 1 -->
                    <h2>Food Type (Ex. Pizze Rosse)</h2>
    
                    <ul>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                    </ul>
    
                    <!-- food type 2 -->
                    <h2>Food Type 2 (Ex. Pizze Bianche)</h2>
                    <ul>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                    </ul>
    
                    <!-- food type 3 -->
                    <h2>Food Type 3 (Ex. Dessert)</h2>
                    <ul>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                        <li>
                            <div class="rest-menu-item">
                                <h3>Food name</h3>
                                <p>Food description / Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi sit quia debitis totam doloremque perspiciatis quos dolorem laudantium dolores! Repellendus excepturi libero quod ex cupiditate ab eligendi maxime earum nulla.</p>
                                <p class="food-price">Food Price</p>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </section>
    
            <!-- cart -->
            <section id="cart">
                <div class="cart-container">
                    <h2>Il tuo ordine</h2>
                    <div class="cart-content">
                        <ul>
                            <li>iTem selected 1</li>
                            <li>item selected 2</li>
                            <li>item selected 3</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    </div>
@endsection