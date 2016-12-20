# Static Boosted
Boilerplate to static sites with NPM, Gulp and Bootstrap

## Install

Go to folder project and execute:

```
$ npm install
$ gulp
```

And go to: **http://localhost:4567**

## Configuration

### Folder map

```
|-- global
|-- slides
|---- slide_01
|---- slide_02
|---- slide_03
|-- index.html
```

### Dependencies

```
- gulp
- gulp-watch
- gulp-concat
- gulp-connect
- gulp-uglify
- gulp-compass
- glob
- del
```

### Configuration

```javascript
var slides_folders  = 'slides/slide_*',       // Slide folders
    css_dir         = 'global/css',           // Global styles directory
    scss_files      = css_dir +'/**/*.scss',  // Global styles files
    js_dir          = 'global/js',            // Global javascripts directory
    js_files        = js_dir + '/**/*.js';    // Global javascript files
```

### Tasks

#### Javascripts
- Concat JS files in specific order.
- Copy result 'global.js' file within each folder slide.

#### CSS
- Compile and compress global styles using Compass.
- Copy result 'global.css' file within each folder slide.

#### CLEAN (individual task)
- Clean all '.js' and '.css' generated.

#### Default
```js
gulp.task('default', [ 'styles', 'scripts', 'watch', 'connect' ]);
```
