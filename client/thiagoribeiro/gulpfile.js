"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');

gulp.task("default", watch);
gulp.task("sass", compileSass);
gulp.task("js", compileJS);

function compileSass(){
    return gulp
    .src("src/scss/**/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/"));
};

function compileJS(){
    return gulp
    .src([
        "src/js/api.js",
        "src/js/script.js",
        "src/js/localStorage.js",
        "src/js/generalFunctions.js",
        "src/js/renderFunctions.js",
        "src/js/pagination.js",
        "src/js/categories.js",
        "src/js/orderBy.js",
        "src/js/favorites.js",
        "src/js/search.js"
    ])
    .pipe(concat("main.js"))
    .pipe(gulp.dest("src/"));
}

function watch(){
    gulp.watch("src/scss/**/*.scss", compileSass);
    //gulp.watch("src/js/**/*.js", compileJS);
}
