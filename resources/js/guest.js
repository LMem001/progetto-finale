const { includes } = require("lodash");

var app = new Vue(
   {
      el: "#app",

      data:{

         // axios calls data
         apiRestaurantURL: "http://localhost:8000/api/restaurants/",
         apiRestaurantType: "http://localhost:8000/api/types",
         apiSingleRetstaurant: "http://localhost:8000/api/restaurant/",
         localStoreSlug: localStorage.getItem('savedrestaurantSlug'),
         total: localStorage.getItem('refreshsum'), 
         restaurants: [],
         restaurants_types:[],
         selectedType: 0,
         selectedRestaurant: [],
         
         restaurantSlug: "",
         foodId: 0,
         itemsQT: (localStorage.getItem('itemsQT')),
         orderdItemsQt: 0,
         foodsInOrder: [],

         restaurantFoods: [
            {
               id: "antipasto",
               course: "Antipasti",
               food: [],
            },
            {
               id: "primo",
               course: "Primi",
               food: [],
            },
            {
               id: "secondo",
               course: "Secondi",
               food: [],
            },
            {
               id: "dessert",
               course: "Dessert",
               food: [],
            },
            {
               id: "piatto_unico",
               course: "Piatti Unici",
               food: [],
            },
            {
               id: "fast_food",
               course: "Fast Food",
               food: [],
            },
            {
               id: "bevanda",
               course: "Drinks",
               food: [],
            },
            {
               id: "altro",
               course: "Altro",
               food: [],
            },     
         ], 
         courses: [],
         selectedFood: '',
         // search: "",

         logoutshow: "",
         menushow:"",
         bannerNone: '',
         date: moment(60 * 30 * 1000),
         sum: 0,

         //variabile per lo scroll
         view: {
            topOfPage: true
         },

         // cart
         cart: [],

      },

      methods: {
         addItem() {
            this.restaurantFoods.forEach(element => {
               element.food.forEach(item => {
                  if(item.id === this.foodId){
                     item.quantity += 1;
                  };
               });
            });
            this.cart.forEach(cartit => {
               if(cartit.id === this.foodId){
                  cartit.quantity += 1;
                  this.sum += cartit.food_price;

               };
            });
            this.orderdItemsQt += 1;
            localStorage.setItem("itemsQT", JSON.stringify(this.orderdItemsQt));
            localStorage.setItem("refreshsum", JSON.stringify(this.sum));
            localStorage.setItem("order", JSON.stringify(this.restaurantFoods));
            localStorage.setItem("refreshCart", JSON.stringify(this.cart));
            localStorage.setItem("savedrestaurantSlug", JSON.stringify(this.selectedRestaurant.slug));
            localStorage.setItem("savedrestaurantId", JSON.stringify(this.selectedRestaurant.id));
            localStorage.setItem("slelectedRestTime", JSON.stringify(this.selectedRestaurant.close_time));
          },

         removeItem() {
            this.restaurantFoods.forEach(element => {
               element.food.forEach(item => {
                  if(item.id === this.foodId){
                     if(item.quantity > 0){
                        item.quantity -= 1;
                     };
                  };
               });
            });
            this.cart.forEach(cartit => {
               if(cartit.id === this.foodId){
                  if(cartit.quantity > 0){
                     cartit.quantity -= 1;
                     this.sum -= cartit.food_price;
                  };
                  
               };
            });
            this.orderdItemsQt -= 1;
            localStorage.setItem("itemsQT", JSON.stringify(this.orderdItemsQt));
            localStorage.setItem("refreshsum", JSON.stringify(this.sum));
            localStorage.setItem("order", JSON.stringify(this.restaurantFoods));
            localStorage.setItem("refreshCart", JSON(this.cart));
         },

         clearCart: function(){
            
         },

         logouttoggleshow: function(){
            if(this.logoutshow == ""){
               this.logoutshow = "display";
            }else{
            this.logoutshow = "";
            }
         },
         menutoggleshow: function(){
            if(this.menushow == ""){
               this.menushow = "display";
            }else{
            this.menushow = "";
            }
         },
         hidelogout: function(){
            this.logoutshow = "";
         },
         hidemenu: function(){
            this.logoutshow = "";
         },
         hideBanner: function (){
           this.bannerNone = "displayNone";
         },

         // Cambia classe all'header allo scroll
         handleScroll(){
            if(window.pageYOffset>0){
              if(this.view.topOfPage) this.view.topOfPage = false
            } else {
              if(!this.view.topOfPage) this.view.topOfPage = true
            }
         },

         // filterrestaurants by type
         filtredRestaurantByType: function(){
            
            axios.get(this.apiRestaurantURL,{
               params: {
                  id: this.selectedType + 1,
               }
            })
            .then((serverAnswer) =>{
               this.restaurants = serverAnswer.data;
            })
         }
      },

      beforeMount() {
         window.addEventListener('scroll', this.handleScroll);

         // axios call restaurants
         axios.get(this.apiRestaurantURL, {
            params: {
               id: this.selectedType,
            }
             })
            .then((serverAnswer) =>{
               
               if (serverAnswer.data != 0){
                  if (serverAnswer.data.lenght > 5){
                     for(let i = 0; i < 12; i++){
                        this.restaurants.push(serverAnswer.data[i]);
                     }
                  }else{
                     serverAnswer.data.forEach((restaurant) =>{
                        this.restaurants.push(restaurant)
                     })
                  }
               }
         }),

         // axios call restaurantstype
         axios.get(this.apiRestaurantType,{
            params: {
            }
         })
         .then((serverAnswer) =>{
            serverAnswer.data.forEach((type) =>{
               this.restaurants_types.push(type)
            })
         }),

         // get restaurant slug

         url = window.location.href;
         lastParam = url.split("/").slice(-1)[0];
         this.restaurantSlug = (lastParam == "" ? this.restaurants[1].slug : lastParam)

         // end get restaurant slug


         // get single  restaurant

         axios.get(this.apiSingleRetstaurant + this.restaurantSlug,)
            .then((serverAnswer) =>{
               this.selectedRestaurant = serverAnswer.data;
         
         // get restaurant products
         axios.get(this.apiRestaurantURL + this.selectedRestaurant.id,)
            .then((serverAnswer) =>{
            
            this.restaurantSlug = '"' + this.restaurantSlug + '"';

            serverAnswer.data.forEach((product) =>{
               if(localStorage.getItem('order') != null &&  this.localStoreSlug == this.restaurantSlug){
                  this.restaurantFoods = JSON.parse(localStorage.getItem("order"))
               }else{
                  localStorage.clear();
                  product["quantity"] = 0;
                  if(product.tagCourse == "antipasto"){
                     this.restaurantFoods[0].food.push(product);
                  }else if(product.tagCourse == "primo"){
                     this.restaurantFoods[1].food.push(product);
                  }else if(product.tagCourse == "secondo"){
                     this.restaurantFoods[2].food.push(product);
                  }else if(product.tagCourse == "dessert"){
                     this.restaurantFoods[3].food.push(product);
                  }else if(product.tagCourse == "piatto_unico"){
                     this.restaurantFoods[4].food.push(product);
                  }else if(product.tagCourse == "fast_food"){
                     this.restaurantFoods[5].food.push(product);
                  }else if(product.tagCourse == "bevanda"){
                     this.restaurantFoods[6].food.push(product);
                  }else if(product.tagCourse == "altro"){
                     this.restaurantFoods[7].food.push(product);
                  }
               }
            })

            serverAnswer.data.forEach((answer) =>{
               if(this.courses.includes(answer.tagCourse)){
               }else{
                  this.courses.push(answer.tagCourse);
               }
            })
            
         })
         axios.get(this.apiRestaurantURL + this.selectedRestaurant.id,)
         .then((serverAnswer) =>{

            serverAnswer.data.forEach((product) =>{
               if(localStorage.getItem('refreshCart') != null){
                  this.cart = JSON.parse(localStorage.getItem("refreshCart"));
                  this.sum = JSON.parse(localStorage.getItem("refreshsum"));
               }else{
                  product["quantity"] = 0;
                  this.cart.push(product);
               }
            })
         })
      })
      // end axios call restaurants
      },

      mounted (){  

         // banner time 
         setInterval(() => {
           this.date = moment(this.date.subtract(1, 'seconds'))
         }, 1000);
         // end banner time   
      },

      computed: { 
         // banner time

         time: function(){
           return this.date.format('mm:ss'); 
         },

             
      },
});