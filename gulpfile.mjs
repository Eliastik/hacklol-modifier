"use strict";

import gulp      from "gulp";
import zip       from "gulp-zip";
import minify    from "gulp-minify";
import cleanCss  from "gulp-clean-css";

gulp.task('compress-js', function () {
    return gulp.src('www/hacklol-modifier/assets/src/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('www/hacklol-modifier/assets/js/'));
});

gulp.task('compress-css', function () {
    return gulp.src('www/hacklol-modifier/assets/src/css/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('www/hacklol-modifier/assets/css/'));
});

gulp.task('compress-locales', function () {
    return gulp.src('www/hacklol-modifier/assets/src/locales/*.js')
        .pipe(minify())
        .pipe(gulp.dest('www/hacklol-modifier/assets/locales/'));
});

gulp.task('build-release', function () {
    return gulp.src("www/hacklol-modifier/**")
        .pipe(zip('hacklol-modifier-build.zip'))
        .pipe(gulp.dest('./build'));
});

gulp.task('build-pl', function () {
    return gulp.src("www/hacklol-modifier/page_loader/**")
        .pipe(zip('page-loader-build.zip'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', gulp.series('compress-js', 'compress-css', 'compress-locales'));

gulp.task('build', gulp.series('compress-js', 'compress-css', 'compress-locales', 'build-release'));

gulp.task('build-page-loader', gulp.series('build-pl'));