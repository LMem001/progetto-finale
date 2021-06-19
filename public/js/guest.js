/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/guest.js ***!
  \*******************************/
var app = new Vue({
  el: "#app",
  data: {
    // axios calls data
    apiRestaurantURL: "http://localhost:8000/api/restaurants",
    apiRestaurantType: "http://localhost:8000/api/types",
    restaurants: [],
    restaurants_types: [],
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
    }
  },
  methods: {
    logouttoggleshow: function logouttoggleshow() {
      if (this.logoutshow == "") {
        this.logoutshow = "logoutDisplay";
      } else {
        this.logoutshow = "";
      }
    },
    hidelogout: function hidelogout() {
      this.logoutshow = "";
    },
    hideBanner: function hideBanner() {
      this.bannerNone = "bannerDisplayNone";
    },
    // Cambia classe all'header allo scroll
    handleScroll: function handleScroll() {
      if (window.pageYOffset > 0) {
        if (this.view.topOfPage) this.view.topOfPage = false;
      } else {
        if (!this.view.topOfPage) this.view.topOfPage = true;
      }
    },
    // filterrestaurants by type
    filtredRestaurantByType: function filtredRestaurantByType() {
      var _this = this;

      this.restaurants = [], axios.get(this.apiRestaurantURL, {
        params: {
          id: this.selectedType + 1
        }
      }).then(function (serverAnswer) {
        _this.restaurants = serverAnswer.data;
      });
      console.log(this.restaurantIndex);
    }
  },
  beforeMount: function beforeMount() {
    var _this2 = this;

    window.addEventListener('scroll', this.handleScroll); // axios call restaurants

    axios.get(this.apiRestaurantURL, {
      params: {
        id: this.selectedType
      }
    }).then(function (serverAnswer) {
      if (serverAnswer.data != 0) {
        if (serverAnswer.data.lenght > 5) {
          for (var i = 0; i < 12; i++) {
            _this2.restaurants.push(serverAnswer.data[i]);
          }
        } else {
          serverAnswer.data.forEach(function (restaurant) {
            _this2.restaurants.push(restaurant);
          });
        }
      }
    }); // end axios call restaurants
    // axios call restaurantstype

    axios.get(this.apiRestaurantType, {
      params: {}
    }).then(function (serverAnswer) {
      serverAnswer.data.forEach(function (type) {
        _this2.restaurants_types.push(type);
      });
    }); // end axios call restaurantstype
    // get products

    url = window.location.href, lastParam = url.split("/").slice(-1)[0], this.restaurantIndex = lastParam, axios.get(this.apiRestaurantURL + "/" + this.restaurantIndex, {
      params: {}
    }).then(function (serverAnswer) {
      serverAnswer.data.forEach(function (product) {
        if (product.tagCourse == "antipasto") {
          _this2.antipasti.push(product);
        } else if (product.tagCourse == "primo") {
          _this2.primi.push(product);
        } else if (product.tagCourse == "secondo") {
          _this2.secondi.push(product);
        } else if (product.tagCourse == "dessert") {
          _this2.dessert.push(product);
        } else if (product.tagCourse == "piatto_unico") {
          _this2.piattiunici.push(product);
        } else if (product.tagCourse == "fast_food") {
          _this2.fastfood.push(product);
        } else if (product.tagCourse == "bevanda") {
          _this2.bevande.push(product);
        } else if (product.tagCourse == "altro") {
          _this2.altro.push(product);
        }
      });
    }); // get products
  },
  mounted: function mounted() {
    var _this3 = this;

    // banner time 
    setInterval(function () {
      _this3.date = moment(_this3.date.subtract(1, 'seconds'));
    }, 1000); // end banner time
  },
  computed: {
    // banner time
    time: function time() {
      return this.date.format('mm:ss');
    }
  }
});

function changeBgJb() {
  var imgBgJb = ['url("img/bg_1.jpg")', 'url("img/bg_hero3.jpeg")'];
  var jumbo = document.getElementById("jumbotron");
  var bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
  jumbo.style.backgroundImage = bgJb;
}

setInterval(changeBgJb, 5000);
/******/ })()
;