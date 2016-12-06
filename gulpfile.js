"use strict";

const gulp             = require("gulp"),
      notify           = require("gulp-notify"),
      sass             = require('gulp-sass'),
      plumber          = require('gulp-plumber'),
      sassGlob         = require('gulp-sass-glob'),
      stripCssComments = require('gulp-strip-css-comments'),
      concat           = require("gulp-concat"),
      sourceMaps       = require("gulp-sourcemaps"),
      ts               = require('gulp-typescript'),
      del              = require("del"),
      source           = require('vinyl-source-stream'),
      browserify       = require('browserify'),
      browserSync      = require("browser-sync");


var tsProject = ts.createProject('tsconfig.json');


gulp.task("bower-js", function() {
  return gulp.src([
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/underscore/underscore.js"
  ])
    .pipe(gulp.dest("./build/js"))
});

gulp.task("bower-css", function() {
  return gulp.src([
    "./bower_components/sanitize-css/sanitize.css",
    "./bower_components/bootstrap/dist/css/bootstrap.css",
    "./bower_components/components-font-awesome/css/font-awesome.css"
  ])
    .pipe(gulp.dest("./build/css"))
});

gulp.task("bower-font", function() {
  return gulp.src([
    "./bower_components/bootstrap/dist/fonts/**/*.*",
    "./bower_components/components-font-awesome/fonts/**/*.*",
  ])
    .pipe(gulp.dest("./build/fonts"))
});

gulp.task("sass", function() {
  return gulp.src(['./assets/scss/app.scss'])
    .pipe(plumber(({
      errorHandler: notify.onError('SASS error: <%= error.message %>')
    })))
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sass({
      style         : 'expanded',
      sourceComments: 'map',
      sourceMap     : 'sass',
      outputStyle   : 'nested',
    }))
    .pipe(sass.sync())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task("js:ts", function() {
  var tsResult = tsProject.src()
    .pipe(sourceMaps.init())
    .pipe(tsProject());

  return tsResult.js
    .on("error", notify.onError)
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/browserify/'));
});

gulp.task("js:browserify", ['js:ts'], function() {
  return browserify('./build/browserify/app.js', { debug: true })
    .bundle().on('error', function(error) {
      var args = Array.prototype.slice.call(arguments);
      notify.onError('Browserify error: <%= error.message %>').apply(this, args);
      this.emit("end");
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task("js", ["js:browserify"])

gulp.task("sync", function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

});

gulp.task("watch", ["bower", "js", "sass", 'sync'], function() {
  gulp.watch("./assets/scss/**/*.s*ss", ["sass", browserSync.reload]);
  gulp.watch("./assets/ts/**/*.ts", ["js", browserSync.reload]);
  gulp.watch("./build/index.html", browserSync.reload);
});

gulp.task("bower", ["bower-js", "bower-css", "bower-font"]);

