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
var slides = glob.sync('slides/slide_*').map(function(slide_dir) {
  return slide_dir;
});


/**
 * Server
 * Show "build" folder on server in "http://localhost:4567"
 */
gulp.task('connect', function () {
  connect.server({
    root: 'slides',
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
  console.log('slides: '+ typeof(slides));
//  del(slides);

//  slides.forEach(function(slide_dir) {
//    application_css.pipe(gulp.dest(slide_dir +'/css'));
//  });
});


/**
 * Default
 */
gulp.task('default', [ 'styles', 'scripts' ], function () {
//  gulp.watch( scss_files, ['styles'] );
});






