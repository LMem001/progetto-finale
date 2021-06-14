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
/******/ })()
;