const { kebabCase } = require("lodash");

var app = new Vue(
   {
      el: "#app",
      data:{
         // axios calls data
         apiRestaurantURL: "http://localhost:8000/api/restaurants",
         apiRestaurantType: "http://localhost:8000/api/types",
         // apiKey: "???",
         // foodIndex: 0,
         restaurantIndex: 0,
         restaurants: [],
         restaurantProducts:[],
         restaurants_types: [],
         search: "",
         // end axios calls data

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
            })
         // end axios call restaurants
         // axios call restaurantstype
         axios.get(this.apiRestaurantType,{
            params: {
            }
            })
            .then((serverAnswer) =>{
               serverAnswer.data.forEach((type) =>{
                  this.restaurants_types.push(type)
               })
               console.log(this.restaurants_types)
            })
         // end axios call restaurantstype
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