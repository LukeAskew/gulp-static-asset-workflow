# Including vendor scripts

1. Install the [streamqueue](https://www.npmjs.com/package/streamqueue) package: `$ npm install streamqueue --save-dev`
2. Create a `config.src.vendor` array and include vendor file paths.
3. Break the `scripts:toolkit` task into two streams - `main()` and `vendor()` - then merge streams using `streamqueue()`.

```javascript
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamqueue = require('streamqueue');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var config = {
	dev: gutil.env.dev,
	src: {
		scripts: {
			vendor: [
				'./src/vendor/jquery/dist/jquery.js'
			],
			main: './src/scripts/main.js'
		}
	},
	dest: 'dist'
};

gulp.task('scripts', function () {

	var main = function () {
		return browserify(config.src.scripts.main).bundle()
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
			.pipe(gulp.dest(config.dest + '/scripts'));
	};

	var vendor = function () {
		return gulp.src(config.src.scripts.vendor)
			.pipe(concat('vendor.js'));
	};

	return streamqueue({ objectMode: true }, vendor(), main())
		.pipe(streamify(concat('main.js')))
		.pipe(gulpif(!config.dev, streamify(uglify())))
		.pipe(gulp.dest(config.dest + '/scripts'));

});

```

**Optional:** Check out the Bower recipe for info on using Bower as your client-side dependency manager.
