"use strict";

const gulp             = require("gulp"),
      notify           = require("gulp-notify"),
      sass             = require('gulp-sass'),
      plumber          = require('gulp-plumber'),
      sassGlob         = require('gulp-sass-glob'),
      stripCssComments = require('gulp-strip-css-comments'),
      sourceMaps       = require("gulp-sourcemaps"),
      ts               = require('gulp-typescript'),
      source           = require('vinyl-source-stream'),
      browserify       = require('browserify'),
      browserSync      = require("browser-sync");


var tsProject = ts.createProject('tsconfig.json');

gulp.task("vendor:js", function() {
  return gulp.src([
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/underscore/underscore.js"
  ])
    .pipe(gulp.dest("./public/js"))
});

gulp.task("js:ts", function() {
  var tsResult = tsProject.src()
    .pipe(sourceMaps.init())
    .pipe(tsProject());

  return tsResult.js
    .on("error", notify.onError)
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/browserify/'));
});

gulp.task("js:browserify", ['js:ts'], function() {
  return browserify('./public/browserify/app.js', {
    debug: true
  })
    .bundle().on('error', function(error) {
      var args = Array.prototype.slice.call(arguments);
      notify.onError('Browserify error: <%= error.message %>').apply(this, args);
      this.emit("end");
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task("js", ["vendor:js", "js:browserify"]);

gulp.task("sass", function() {
  return gulp.src(['./assets/scss/app.scss'])
    .pipe(sourceMaps.init())
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
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task("sync", function() {
  browserSync.init({
    proxy: "localhost:3000"
  });

});

gulp.task("watch", ["js", "sass", 'sync'], function() {
  gulp.watch("./assets/scss/**/*.s*ss", ["sass", browserSync.reload]);
  gulp.watch("./assets/ts/**/*.ts", ["js:browserify", browserSync.reload]);
  gulp.watch("./views/**/*.jade", browserSync.reload);
});