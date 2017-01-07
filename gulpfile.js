
////////////////////////////////
    //Setup//
////////////////////////////////

// Plugins
var gulp = require('gulp'),
      pjson = require('./package.json'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      del = require('del'),
      plumber = require('gulp-plumber'),
      pixrem = require('gulp-pixrem'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      browserSync = require('browser-sync').create(),
      babel = require('gulp-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      reload = browserSync.reload;


// Relative paths function
var pathsConfig = function (appName) {
  this.app = "./" + (appName || pjson.name);

  return {
    app: this.app,
    templates: this.app + '/templates',
    css: this.app + '/dist/css',
    sass: this.app + '/static/sass',
    fonts: this.app + '/static/fonts',
    images: this.app + '/static/images',
    js: this.app + '/dist/js',
  }
};

var paths = pathsConfig();

////////////////////////////////
    //Tasks//
////////////////////////////////

// Styles autoprefixing and minification
gulp.task('styles', function() {
  return gulp.src(`${paths.sass}/**/*.scss`)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(plumber()) // Checks for errors
      .pipe(autoprefixer({browsers: ['last 2 version']})) // Adds vendor prefixes
      .pipe(pixrem())  // add fallbacks for rem units
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano()) // Minifies the result
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css));
});

// Javascript minification
gulp.task('scripts', function() {
  return gulp.src([`${paths.js}/**/*.js`, `!**/*.min.js`])
    .pipe(plumber()) // Checks for errors
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify()) // Minifies the js
      .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js));
});

// Image compression
gulp.task('imgCompression', function(){
  return gulp.src(paths.images + '/*')
    .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
    .pipe(gulp.dest(paths.images))
});

// Browser sync server for live reload
gulp.task('browserSync', function() {
    browserSync.init(
      [paths.css + "/*.css", paths.js + "*.js", paths.templates + '*.html'], {
        proxy:  "localhost:8000",
        open: false
    });
});

// Default task
gulp.task('default', ['styles', 'scripts', 'imgCompression']);

////////////////////////////////
    //Watch//
////////////////////////////////

// Watch
gulp.task('watch', ['default', 'browserSync'], function() {
  gulp.watch(paths.sass + '/*.scss', ['styles']);
  gulp.watch(paths.js + '/*.js', ['scripts']).on("change", reload);
  gulp.watch(paths.images + '/*', ['imgCompression']);
  gulp.watch(paths.templates + '/**/*.html').on("change", reload);
});
