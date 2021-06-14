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