"use strict";

var gulp        = require("gulp");
var coffee      = require("gulp-coffee");
var less        = require("gulp-less");
var notify      = require("gulp-notify");
var concat      = require("gulp-concat");
var del         = require("del");
var browserSync = require("browser-sync");

gulp.task("clean", function() {
  return del("./build/");
});

gulp.task("bower-js", function() {
  return gulp.src(["./bower_components/jquery/dist/jquery.js"])
    .pipe(gulp.dest("./build/js"))
});

gulp.task("bower-css", function() {
  return gulp.src(["./bower_components/sanitize-css/sanitize.css"])
    .pipe(gulp.dest("./build/css"))
});

gulp.task("html", function() {
  return gulp.src("./assets/index.html")
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());

});

gulp.task("less", function() {
  return gulp.src("./assets/less/**/app.less")
    .pipe(less())
    .on("error", notify.onError({
      title: "Error Less"
    }))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

gulp.task("coffee", function() {
  return gulp.src("./assets/coffee/**/*.coffee")
    .pipe(concat("app.coffee"))
    .pipe(coffee({ map: true }))
    .on('error', function(error) {
      var args = Array.prototype.slice.call(arguments);
      notify.onError('Coffee error: <%= error.stack %>').apply(this, args);
      this.emit("end");
    })
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.stream());

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

gulp.task("build", ["clean", "bower-css", "bower-js", "html", "less", "coffee"]);

gulp.task("default", ["build", "sync", "watch"]);