var app = new Vue(
   {
      el: "#app",
      data:{
         bannerNone: '',
         date: moment(60 * 30 * 1000)
      },
      methods: {
         hideBanner: function (){
           this.bannerNone = "bannerDisplayNone";
         },
      },
      computed: {
         time: function(){
           return this.date.format('mm:ss');
         }
      },
      mounted: function(){   
         setInterval(() => {
           this.date = moment(this.date.subtract(1, 'seconds'))
         }, 1000);
       }
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
  setInterval(changeBgJb, 2000)