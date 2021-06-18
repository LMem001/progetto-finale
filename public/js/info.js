/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/info.js ***!
  \******************************/
var app2 = new Vue({
  el: "#app2",
  data: {
    logoutshow: "",
    bannerNone: '',
    date: moment(60 * 30 * 1000),
    //variabile per lo scroll
    view: {
      topOfPage: true
    },
    deviBool_info: {
      phone: "33311122564",
      address: "Via le mani dal culo 144",
      email: "info@devibool.com"
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
    }
  },
  beforeMount: function beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted: function mounted() {
    var _this = this;

    // banner time 
    setInterval(function () {
      _this.date = moment(_this.date.subtract(1, 'seconds'));
    }, 1000); // axios call restaurants
  },
  computed: {
    // banner time
    time: function time() {
      return this.date.format('mm:ss');
    }
  }
});
/******/ })()
;