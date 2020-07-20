'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const fs = require('fs');
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function scssToCss(done) {
	gulp.src('./src/style/**/*.scss')
	.pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		cascade:false
	}))
	.pipe(browserSync.stream());

	done();
}
function browserReload(done){
	browserSync.reload();
	done();
}


function syncBrowser(done){
	browserSync.init({
		server:{
			baseDir: './'
		},
		port: 3000
	})
	done();
}

function watchFiles(){
	gulp.watch('./src/style/**/*.scss', scssToCss);
	gulp.watch('./**/*.html', browserReload);
}

gulp.task('default', gulp.parallel(watchFiles, syncBrowser));
gulp.task(syncBrowser);