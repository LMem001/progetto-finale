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
         restaurants_types:[],
         selectedType: "",
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

         // filterrestaurants by type

         filtredRestaurantByType: function(){
            this.restaurants = [],
            axios.get(this.apiRestaurantURL,{
               params: {
                  id: this.selectedType,
               }
            })
            .then((serverAnswer) =>{
               this.restaurants = serverAnswer.data;
            })
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
               if (serverAnswer.data != 0){
                  if (serverAnswer.data.length > 5){
                     for(let i = 0; i < 12; i++){
                        this.restaurants.push(serverAnswer.data[i]);
                     }
                  }else{
                     serverAnswer.data.forEach((restaurant) =>{
                        this.restaurants.push(restaurant);
                     })
                  }
               }
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

            })
         // end axios call restaurantstype
       },

      computed: {
         getRestTypeName: function(){
            if (this.restaurants_types == 0){
               return  "prova andata ok";
            }
         },
         // banner time

         time: function(){
           return this.date.format('mm:ss');
         },
      },
   });
   

   function changeBgJb(){
      const imgBgJb = [
          'url("img/bg_hero1.jpeg")',
      
          'url("img/bg_hero2.jpeg")',
      
          'url("img/bg_hero3.jpeg")',
      ]
      const jumbo = document.getElementById("jumbotron")
      
      const bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
      jumbo.style.backgroundImage = bgJb;
  } 
  setInterval(changeBgJb, 5000)