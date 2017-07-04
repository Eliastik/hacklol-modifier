'use strict';

var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');

gulp.task('pack-js', function () {	
	return gulp.src('hacklol-modifier/assets/src/js/*.js')
		.pipe(minify())
		.pipe(gulp.dest('hacklol-modifier/assets/js/'));
});
 
gulp.task('pack-css', function () {	
	return gulp.src('hacklol-modifier/assets/src/css/*.css')
		.pipe(cleanCss())
   .pipe(gulp.dest('hacklol-modifier/assets/css/'));
});

gulp.task('pack-locales', function () {	
	return gulp.src('hacklol-modifier/assets/src/locales/*.js')
		.pipe(minify())
		.pipe(gulp.dest('hacklol-modifier/assets/locales/'));
});

gulp.task('default', ['pack-js', 'pack-css', 'pack-locales']);
