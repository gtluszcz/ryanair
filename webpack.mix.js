const mix = require('laravel-mix')

mix.js('src/index.js', 'dist/app.js')
mix.copy('index.html', 'dist/index.html')
