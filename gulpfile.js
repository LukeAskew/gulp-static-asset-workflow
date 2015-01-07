// modules
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var size = require('gulp-size');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');


// config
var config = {
	dev: gutil.env.dev,
	src: {
		images: 'images/**/*',
		scripts: './scripts/src/main.js',
		styles: 'styles/src/main.scss'
	},
	dest: {
		images: 'images',
		scripts: 'scripts',
		styles: 'styles'
	},
	browsers: ['last 1 version']
};


// clean
gulp.task('clean', function (cb) {
	del(['dist'], cb);
});


// images
gulp.task('images', function () {
	return gulp.src(config.src.images)
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(size({
			prettySize: true,
			title: 'images'
		}))
		.pipe(gulp.dest(config.dest.images));
});


// scripts
gulp.task('scripts', function () {
	return browserify(config.src.scripts).bundle()
		.on('error', function (error) {
			gutil.log(gutil.colors.red(error));
			this.emit('end');
		})
		.pipe(source('main.js'))
		.pipe(gulpif(!config.dev, streamify(uglify())))
		.pipe(streamify(size({
			prettySize: true,
			title: 'scripts'
		})))
		.pipe(gulp.dest(config.dest.scripts));
});

gulp.task('jshint', function (cb) {
	return gulp.src('./src/scripts/**/*')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'))
		.on('error', cb);
});


// styles
gulp.task('styles', function () {
	return gulp.src(config.src.styles)
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(autoprefixer({
			browsers: config.browsers
		}))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(size({
			prettySize: true,
			title: 'styles'
		}))
		.pipe(gulp.dest(config.dest.styles));
});


// watch
gulp.task('watch', function () {
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('src/scripts/**/*', ['scripts']);
	gulp.watch('src/styles/**/*', ['styles']);
});


// default build task
gulp.task('default', ['clean', 'jshint'], function () {

	// define build tasks
	var tasks = [
		'images',
		'scripts',
		'styles'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('watch');
		}
	});

});
