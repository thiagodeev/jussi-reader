"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');

gulp.task("default", watch);
gulp.task("sass", compileSass);
gulp.task("js", compileJS);

function compileSass(){
    return gulp
    .src("scss/**/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("./"));
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

function watch(){
    gulp.watch("scss/**/*.scss", compileSass);
    gulp.watch("js/**/*.js", compileJS);
}
