# Gulp Project
Veeva structure using Gulp utitilies

## Install

Go to folder project and execute:

npm install

gulp

Open htp://localhost:4567

## Configuration

### Folder map

|-- global
|-- slides
|---- slide_01
|---- slide_02
|---- slide_03
|-- index.html

### Dependencies

- gulp
- gulp-watch
- gulp-concat
- gulp-connect
- gulp-uglify
- gulp-uglify
- gulp-compass
- glob
- del


### Configuration

var slides_folders    = 'slides/slide_*',         // Slide folders
    css_dir           = 'global/css',             // Global styles directory
    scss_files        = css_dir +'/**/*.scss',    // Global styles files
    js_dir            = 'global/js',              // Global javascripts directory
    js_files          = js_dir + '/**/*.js',      // Global javascript files
    SLIDES_TOTAL      = 0;                        // Total slides (auto defined)


### Tasks

/**
 * scripts
 * Javascripts
 * - Concat JS files in specific order.
 * - Copy result 'global.js' file within each folder slide.
 * - Define SLIDES_TOTAL counting slides.
 */

/**
 * styles
 * CSS
 * - Compile and compress global styles using Compass.
 * - Copy result 'global.css' file within each folder slide.
 */

/**
 * clean
 * CLEAN (individual task)
 * - Clean all '.js' and '.css' generated.
 * - Define project as 'unbuilt' 'BUILT = false'.
 * - Difine total slides to 0. SLIDES_TOTAL = 0.
 */

/**
 * build-config
 * BUILD CONFIG
 * Generate built configuration
 * - Define project as build.
 * - Define total slides.
 * - Save build-config.js file.
 */


/**
 * Default
 */
gulp.task('default', [ 'styles', 'scripts', 'build-config', 'watch', 'connect' ]);
