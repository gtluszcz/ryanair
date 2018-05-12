const mix = require('laravel-mix')

mix.js('src/index.js', 'dist/app.js')
   .copy('index.html', 'dist/index.html')
   .setPublicPath('dist/')
    .copyDirectory('src/assets','dist/assets')
