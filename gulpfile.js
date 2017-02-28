var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require("gulp.spritesmith"),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('sass', function () {
	return gulp.src('app/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: false
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest('app/css'));
});

gulp.task('libs', () => {
	gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/scrollme/jquery.scrollme.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(gulp.dest('app/js/'));
});

gulp.task('watch', ['browser-sync', 'libs', 'sass', 'sprite'], function () {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/img/icons/*.png', ['sprite']);
	gulp.watch('app/js/*.js', browserSync.reload);
});