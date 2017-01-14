'use strict';
////////////////////////////////
    //Setup//
////////////////////////////////

// Plugins
const gulp = require('gulp');
const pjson = require('./package.json');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const plumber = require('gulp-plumber');
const pixrem = require('gulp-pixrem');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;


// Relative paths function
let pathsConfig = appName => {
  const app = `./${appName || pjson.name}`;

  return {
    dist: `${app}/static/dist/`,
    templates: `${app}/templates`,
    css: `${app}/static/dist/css`,
    sass: `${app}/static/sass`,
    fonts: `${app}/static/fonts`, 
    images: `${app}/static/images`,
    js: `${app}/static/js`,
    distJs: `${app}/static/dist/js`,
    app
  }
};

const paths = pathsConfig();

////////////////////////////////
    //Tasks//
////////////////////////////////

// Styles autoprefixing and minification
gulp.task('styles', () => {
  return gulp.src(`${paths.sass}/main.scss`)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(plumber()) // Checks for errors
      .pipe(autoprefixer({browsers: ['last 2 version']})) // Adds vendor prefixes
      .pipe(pixrem())  // add fallbacks for rem units
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano()) // Minifies the result
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css));
});

// Javascript minification
gulp.task('scripts', () => {
  return gulp.src([`${paths.js}/**/*.js`, `!**/*.min.js`])
    .pipe(plumber()) // Checks for errors
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify()) // Minifies the js
      .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.distJs));
});

// Image compression
gulp.task('imgCompression', () => {
  return gulp.src(`${paths.images}/*`)
    .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
    .pipe(gulp.dest(paths.images))
});

// Browser sync server for live reload
gulp.task('browserSync', () => {
    browserSync.init(
      [`${paths.css}/*.css`, `${paths.js}/*.js`, `${paths.templates}/*.html`], {
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
gulp.task('watch', ['default', 'browserSync'], () => {
  gulp.watch(`${paths.sass}/**/*.scss`, ['styles']).on("change", reload);
  gulp.watch(`${paths.js}/**/*.js`, ['scripts']).on("change", reload);
  gulp.watch(`${paths.images}/*`, ['imgCompression']);
  gulp.watch(`${paths.templates}/**/*.html`).on("change", reload);
});

// Clear cache Dist Folder
gulp.task('clean', (cb) => {
  // Delete static/dist folder
  del([paths.dist], cb);
});
