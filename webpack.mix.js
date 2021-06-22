const { js } = require('laravel-mix');
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    js('resources/js/guest.js', 'public/js')
    js('resources/js/payment.js', 'public/js')
    js('resources/js/info.js', 'public/js')
    .sass('resources/sass/admin/app.scss', 'public/css')
    .sass('resources/sass/guest/guest.scss', 'public/css')
    .sass('resources/sass/guest/info.scss', 'public/css').options({
        processCssUrls:false
     });
