const gulp = require("gulp");
const sass = require("gulp-sass");
const less = require("gulp-less");
const concat = require("gulp-concat");
const wait = require("gulp-wait");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const minify = require("gulp-minify");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const preprocess = require("gulp-preprocess");
const merge = require("merge-stream");
const dotenv = require("dotenv");
// const php = require("gulp-connect-php");

module.exports = {
    gulp: gulp,
    sass: sass,
    less: less,
    concat: concat,
    preprocess: preprocess,
    wait: wait,
    autoprefixer: autoprefixer,
    cssnano: cssnano,
    minify: minify,
    rename: rename,
    imagemin: imagemin,
    newer: newer,
    plumber: plumber,
    postcss: postcss,
    merge: merge,
    dotenv: dotenv,
    clean: (list) => {
        return gulp.src(list, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
    },
    concatArray: function (arr1, arr2, arr3) {
        if (arguments.length <= 1) {
            return false;
        }
        var concat_ = function (arr1, arr2) {
            var arr = arr1.concat();
            for (var i = 0; i < arr2.length; i++) {
                arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
            }
            return arr;
        };
        var result = concat_(arr1, arr2);
        for (var i = 2; i < arguments.length; i++) {
            result = concat_(result, arguments[i]);
        }
        return result;
    },
};
