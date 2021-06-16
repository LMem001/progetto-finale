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
    // apiKey: "???",
    // foodIndex: 0,
    restaurantIndex: 0,
    restaurants: [],
    restaurantProducts: [],
    restaurants_type: [],
    search: "",
    // end axios calls data
    bannerNone: '',
    date: moment(60 * 30 * 1000)
  },
  methods: {
    hideBanner: function hideBanner() {
      this.bannerNone = "bannerDisplayNone";
    },
    // get {n.} restaurant products
    getProducts: function getProducts() {
      var _this = this;

      this.restaurantProducts = [], axios.get(this.apiRestaurantURL + "/" + this.restaurantIndex, {
        params: {}
      }).then(function (serverAnswer) {
        serverAnswer.data.forEach(function (product) {
          _this.restaurantProducts.push(product);
        });
      });
    } // get {n.} restaurant dishes

  },
  computed: {
    // banner time
    time: function time() {
      console.log(this.restaurantIndex);
      return this.date.format('mm:ss');
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    // banner time 
    setInterval(function () {
      _this2.date = moment(_this2.date.subtract(1, 'seconds'));
    }, 1000); // end banner time
    // axios call restaurants

    axios.get(this.apiRestaurantURL, {
      params: {}
    }).then(function (serverAnswer) {
      serverAnswer.data.forEach(function (restaurant) {
        _this2.restaurants.push(restaurant);
      });
      console.log(_this2.restaurants);
    }); // end axios call restaurants
  }
});

function changeBgJb() {
  var imgBgJb = ['url("img/bg_hero1.jpeg")', 'url("img/bg_hero2.jpeg")', 'url("img/bg_hero3.jpeg")', 'url("img/bg_hero4.jpeg")'];
  var jumbo = document.getElementById("jumbotron");
  var bgJb = imgBgJb[Math.floor(Math.random() * imgBgJb.length)];
  jumbo.style.backgroundImage = bgJb;
}

setInterval(changeBgJb, 5000);
/******/ })()
;