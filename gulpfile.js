"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task("default", watch);
gulp.task("sass", compileSass);
gulp.task("js", compileJS);
gulp.task("css", minifyCSS);

function compileSass(){
    return gulp
    .src("scss/**/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("scss/"));
};

function compileJS(){
    return gulp
    .src([
        "js/api.js",
        "js/script.js",
        "js/localStorage.js",
        "js/generalFunctions.js",
        "js/renderFunctions.js",
        "js/pagination.js",
        "js/categories.js",
        "js/orderBy.js",
        "js/favorites.js",
        "js/search.js"
    ])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./"));
}

function minifyCSS(){
    return gulp
    .src('scss/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./'));
};

function watch(){
    gulp.watch("scss/**/*.scss", compileSass);
    gulp.watch("js/**/*.js", compileJS);
    gulp.watch("scss/main.css", minifyCSS);
}
