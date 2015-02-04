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
 * Directories
 */
var css_dir           = 'global/css',
    scss_files        = css_dir +'/**/*.scss',
    js_dir            = 'global/js',
    js_files          = js_dir + '/**/*.js';


/**
 * Slides
 * Load slides folders
 */
var SLIDES_TOTAL = 0;
var slides = glob.sync('slides/slide_*').map(function(slide_dir) {
  return slide_dir;
});


/**
 * Server
 * Show "BUILD" folder on server in "http://localhost:4567"
 */
gulp.task('connect', function () {
  connect.server({
    root: './',
    port: 4567
  });
});


/**
 * Javascripts
 * Concat JS files
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
 * Compile SASS using Compass and copy into each slide folder
 */
gulp.task('styles', function () {
  var application_css = gulp.src(css_dir +'/global.scss')
    .pipe(compass({ config_file: 'config.rb', sass: css_dir, css: css_dir }));

  slides.forEach(function(slide_dir) {
    application_css.pipe(gulp.dest(slide_dir +'/css'));
  });
});


/**
 * Cleaning generated files
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
  var config = "var BUILD = false;" +
    "var SLIDES_TOTAL = 0;";
  require('fs').writeFile('global/js/build-config.js', config);
});


/**
 * Generate config.js BUILD
 */
gulp.task('build-config', function () {
  var config = "var BUILD = true;" +
               "var SLIDES_TOTAL = "+ SLIDES_TOTAL +";";
  require('fs').writeFile('global/js/build-config.js', config);
});




/**
 * Default
 */
gulp.task('default', [ 'styles', 'scripts', 'build-config', 'connect' ], function () {
  //gulp.watch( scss_files, ['styles'] );
});






