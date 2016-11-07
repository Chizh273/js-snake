"use strict";

const gulp             = require("gulp"),
      notify           = require("gulp-notify"),
      sass             = require('gulp-sass'),
      plumber          = require('gulp-plumber'),
      sassGlob         = require('gulp-sass-glob'),
      stripCssComments = require('gulp-strip-css-comments'),
      concat           = require("gulp-concat"),
      sourceMaps       = require("gulp-sourcemaps"),
      del              = require("del"),
      ts               = require('gulp-typescript'),
      browserSync      = require("browser-sync");


var tsProject = ts.createProject('tsconfig.json');


gulp.task("clean", function() {
  return del("./build/");
});

gulp.task("bower-js", function() {
  return gulp.src([
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/bootstrap/dist/js/bootstrap.js"
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

gulp.task("html", function() {
  return gulp.src("./assets/index.html")
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());

});

gulp.task("sass", function() {
  return gulp.src(['./assets/scss/app.scss'])
    .pipe(plumber(({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
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

gulp.task("ts", function() {
  var tsResult = tsProject.src()
    .pipe(sourceMaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(concat('app.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task("sync", function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

});

gulp.task("watch", function() {
  gulp.watch("./assets/less/**/*.less", ["less"]);
  gulp.watch("./assets/coffee/**/*.coffee", ["coffee"]);
  gulp.watch("./assets/index.html", ["html"]);
});

gulp.task("bower", ["bower-js", "bower-css", "bower-font"]);

gulp.task("build", ["bower", "html", "sass", "ts"]);

gulp.task("default", ["build", "sync", "watch"]);
