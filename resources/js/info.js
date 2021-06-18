var app2 = new Vue(
    {
       el: "#app2",
 
       data:{
            
            logoutshow: "",
            bannerNone: '',
            date: moment(60 * 30 * 1000),
    
            //variabile per lo scroll
            view: {
                topOfPage: true
            },
            deviBool_info :{
                phone : "33311122564",
                address : "Via le mani dal culo 144",
                email : "info@devibool.com",

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
 
          
       },
 
       beforeMount() {
          window.addEventListener('scroll', this.handleScroll)
       },
 
       mounted: function(){  
 
          // banner time 
          setInterval(() => {
            this.date = moment(this.date.subtract(1, 'seconds'))
          }, 1000);
 
          // axios call restaurants
         
       },
 
       computed: { 
          // banner time
 
          time: function(){
            return this.date.format('mm:ss');
          },
       },
    });
    
 
    