var app = new Vue(
   {
      el: "#app",

      data:{

         // axios calls data
         apiRestaurantURL: "http://localhost:8000/api/restaurants",
         apiRestaurantType: "http://localhost:8000/api/types",
         restaurants: [],
         restaurants_types:[],
         selectedType: 0,
         restaurantIndex: 0,

         antipasti: [],
         primi: [],
         secondi: [],
         dessert: [],
         piattiunici: [],
         fastfood: [],
         bevande: [],
         altro: [],

         // search: "",

         logoutshow: "",
         bannerNone: '',
         date: moment(60 * 30 * 1000),

         //variabile per lo scroll
         view: {
            topOfPage: true
         },
      },

      methods: {
         logouttoggleshow: function(){
            if(this.logoutshow == ""){
               this.logoutshow = "logoutDisplay";
            }else{
            this.logoutshow = "";
            }
         },
         hidelogout: function(){
            this.logoutshow = "";
         },
         hideBanner: function (){
           this.bannerNone = "bannerDisplayNone";
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
            this.restaurants = [],
            axios.get(this.apiRestaurantURL,{
               params: {
                  id: this.selectedType + 1,
               }
            })
            .then((serverAnswer) =>{
               this.restaurants = serverAnswer.data;
            })
            console.log(this.restaurantIndex)
         }
      },

      beforeMount() {
         window.addEventListener('scroll', this.handleScroll);

         // axios call restaurants
         axios.get(this.apiRestaurantURL,{
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


         // get products
         url = window.location.href,
         lastParam = url.split("/").slice(-1)[0],
         
         this.restaurantIndex = lastParam,

         axios.get(this.apiRestaurantURL + "/" + this.restaurantIndex,{
               params: {
                  
               }
               })
               .then((serverAnswer) =>{

                  serverAnswer.data.forEach((product) =>{
                     if(product.tagCourse == "antipasto"){
                        this.antipasti.push(product);
                     }else if(product.tagCourse == "primo"){
                        this.primi.push(product);
                     }else if(product.tagCourse == "secondo"){
                        this.secondi.push(product);
                     }else if(product.tagCourse == "dessert"){
                        this.dessert.push(product);
                     }else if(product.tagCourse == "piatto_unico"){
                        this.piattiunici.push(product);
                     }else if(product.tagCourse == "fast_food"){
                        this.fastfood.push(product);
                     }else if(product.tagCourse == "bevanda"){
                        this.bevande.push(product);
                     }else if(product.tagCourse == "altro"){
                        this.altro.push(product);
                     }
                     
                  })
               })
             // get products
      },

      mounted: function(){  

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
         
      }

   });
   

   function changeBgJb(){
      const imgBgJb = [
          'url("img/bg_1.jpg")',
      
          'url("img/bg_hero3.jpeg")',
      ]
      const jumbo = document.getElementById("jumbotron")
      
      const bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
      jumbo.style.backgroundImage = bgJb;
  } 
  setInterval(changeBgJb, 5000);