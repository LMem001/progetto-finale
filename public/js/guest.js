/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/guest.js ***!
  \*******************************/
var app = new Vue({
  el: "#app",
  data: {
    bannerNone: '',
    date: moment(60 * 30 * 1000)
  },
  methods: {
    hideBanner: function hideBanner() {
      this.bannerNone = "bannerDisplayNone";
    }
  },
  computed: {
    time: function time() {
      return this.date.format('mm:ss');
    }
  },
  mounted: function mounted() {
    var _this = this;

    setInterval(function () {
      _this.date = moment(_this.date.subtract(1, 'seconds'));
    }, 1000);
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