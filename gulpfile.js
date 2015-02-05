/**
 * Folder map
 *
 * | root
 * |-- global
 * |-- slides
 * |---- slide_01
 * |---- slide_02
 * |---- slide_03
 * |-- index.html
 *
 */


/**
 * Dependencies
 */
var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    concat        = require('gulp-concat'),
    connect       = require('gulp-connect'),
    uglify        = require('gulp-uglify'),
    compass       = require('gulp-compass'),
    glob          = require('glob'),
    del           = require('del');


/**
 * CONFIG
 * Configuration vars
 */
var slides_folders    = 'slides/slide_*',         // Slide folders
    css_dir           = 'global/css',             // Global styles directory
    scss_files        = css_dir +'/**/*.scss',    // Global styles files
    js_dir            = 'global/js',              // Global javascripts directory
    js_files          = js_dir + '/**/*.js',      // Global javascript files
    SLIDES_TOTAL      = 0;                        // Total slides (auto defined)



/**
 * Slides
 * Load slides folders
 */
var slides = glob.sync(slides_folders).map(function(slide_dir) {
  return slide_dir;
});


/**
 * Javascripts
 * - Concat JS files in specific order.
 * - Copy result 'global.js' file within each folder slide.
 * - Define SLIDES_TOTAL counting slides.
 */
gulp.task('scripts', function () {
  var global_js = gulp.src([
      js_dir +'/config.js',
      js_dir +'/libs/*.js',
      js_dir +'/ui/*.js'
    ])
    .pipe(concat('global.js'))
    .pipe(uglify());

  slides.forEach(function(slide_dir) {
    SLIDES_TOTAL++
    global_js.pipe(gulp.dest(slide_dir +'/js'));
  });
});


/**
 * CSS
 * - Compile and compress global styles using Compass.
 * - Copy result 'global.css' file within each folder slide.
 */
gulp.task('styles', function () {
  var application_css = gulp.src(css_dir +'/global.scss')
    .pipe(compass({ config_file: 'config.rb', sass: css_dir, css: css_dir }));

  slides.forEach(function(slide_dir) {
    application_css.pipe(gulp.dest(slide_dir +'/css'));
  });
});


/**
 * CLEAN (individual task)
 * - Clean all '.js' and '.css' generated.
 * - Define project as 'unbuilt' 'BUILT = false'.
 * - Difine total slides to 0. SLIDES_TOTAL = 0.
 */
gulp.task('clean', function () {
  var files = [];

  slides.forEach(function(slide_dir) {
    files.push(slide_dir +'/css/global.css');
    files.push(slide_dir +'/js/global.js');
  });

  files.push(css_dir +'/global.css');

  del(files);

  // Reset config
  var config = "var BUILT = false;" +
    "var SLIDES_TOTAL = 0;";
  require('fs').writeFile('global/js/build-config.js', config);
});


/**
 * BUILD CONFIG
 * Generate built configuration
 * - Define project as build.
 * - Define total slides.
 * - Save build-config.js file.
 */
gulp.task('build-config', function () {
  var config = "var BUILT = true;" +
               "var SLIDES_TOTAL = "+ SLIDES_TOTAL +";";

  require('fs').writeFile(js_dir +'/build-config.js', config);
});


/**
 * Watch
 */
gulp.task('watch', function () {
  gulp.watch( scss_files, ['styles'] );
  gulp.watch(   js_files, ['scripts'] );
  //gulp.watch( 'slides', [ 'default' ] );
});


/**
 * SERVER
 * You can show the slides index on 'http://localhost:4567'.
 */
gulp.task('connect', function () {
  connect.server({
    root: '.',
    port: 4567
  });
});


/**
 * Default
 */
gulp.task('default', [ 'styles', 'scripts', 'build-config', 'watch', 'connect' ]);