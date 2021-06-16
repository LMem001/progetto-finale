const { kebabCase } = require("lodash");

var app = new Vue(
   {
      el: "#app",
      data:{
         // axios calls data
         apiRestaurantURL: "http://localhost:8000/api/restaurants",
         // apiKey: "???",
         // foodIndex: 0,
         restaurantIndex: 0,
         restaurants: [],
         restaurantProducts:[],
         restaurants_type: [],
         search: "",
         // end axios calls data

         // restaurantTypes
         restaurants_types:[
            {
               type: 'kebab',
               icon: 'kebab.png',
            },
            {
               type: 'vegano',
               icon: 'vegano.png',
            },
            {
               type: 'sushi/japponese',
               icon: 'sushi.png',
            },
            {
               type: 'indiano',
               icon: 'indiano.png',
            },
            {
               type: 'pizza',
               icon: 'pizza.png',
            },
            {
               type: 'cinese',
               icon: 'cinese.png',
            },
            {
               type: 'panini/hamburger',
               icon: 'hamburger.png',
            },
            {
               type: 'pasticceria',
               icon: 'dessert.png',
            },
            {
               type: 'bevande',
               icon: 'drinks.png',
            },
            {
               type: 'messicano',
               icon: 'messicano.png',
            },
            {
               type: 'vegetariano',
               icon: 'vegetariana.png',
            },
            {
               type: 'tradizionale',
               icon: 'tradizionale.png',
            },
         ],

         bannerNone: '',
         date: moment(60 * 30 * 1000)
      },
      methods: {
         hideBanner: function (){
           this.bannerNone = "bannerDisplayNone";
         },
         // get {n.} restaurant products
         getProducts: function(){
            this.restaurantProducts = [],
            axios.get(this.apiRestaurantURL + "/" + this.restaurantIndex,{
               params: {
               }
               })
               .then((serverAnswer) =>{
                  console.log(serverAnswer)
                  serverAnswer.data.forEach((product) =>{
                     this.restaurantProducts.push(product);
                  })
               })
         },
         // get {n.} restaurant dishes
      },
      computed: {

         // banner time

         time: function(){
           return this.date.format('mm:ss');
         }
         
      },
      
      mounted: function(){  

         // banner time 
         setInterval(() => {
           this.date = moment(this.date.subtract(1, 'seconds'))
         }, 1000);
         // end banner time

         // axios call restaurants
         axios.get(this.apiRestaurantURL,{
            params: {
            }
            })
            .then((serverAnswer) =>{
               serverAnswer.data.forEach((restaurant) =>{
                  this.restaurants.push(restaurant)
               })
               console.log(this.restaurants)
            })
         // end axios call restaurants
       },

   });

   function changeBgJb(){
      const imgBgJb = [
          'url("img/bg_hero1.jpeg")',
      
          'url("img/bg_hero2.jpeg")',
      
          'url("img/bg_hero3.jpeg")',

          'url("img/bg_hero4.jpeg")',
      ]
      
      const jumbo = document.getElementById("jumbotron")
      
      const bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
      jumbo.style.backgroundImage = bgJb;
  } 
  setInterval(changeBgJb, 5000)