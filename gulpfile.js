'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');

gulp.task('compress-js', function () {	
	return gulp.src('hacklol-modifier/assets/src/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('hacklol-modifier/assets/js/'));
});
 
gulp.task('compress-css', function () {	
	return gulp.src('hacklol-modifier/assets/src/css/*.css')
		.pipe(cleanCss())
   .pipe(gulp.dest('hacklol-modifier/assets/css/'));
});

gulp.task('compress-locales', function () {	
	return gulp.src('hacklol-modifier/assets/src/locales/*.js')
		.pipe(minify())
		.pipe(gulp.dest('hacklol-modifier/assets/locales/'));
});

gulp.task('default', ['compress-js', 'compress-css', 'compress-locales']);
