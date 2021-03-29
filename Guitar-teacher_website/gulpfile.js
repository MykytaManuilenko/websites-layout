const { src, dest, watch, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

function server() {
	browserSync.init({
		server: {
			baseDir: 'dist',
		},
		port: 3000,
	});
}

function html() {
	return src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist/'));
}

function styles() {
	return src('src/sass/**/*.+(sass|scss)')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(dest('dist/css'))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream());
}

function scripts() {
	return src('src/js/**/*.js').pipe(uglify()).pipe(dest('dist/js')).pipe(browserSync.stream());
}

function fonts() {
	return src('src/fonts/**/*').pipe(dest('dist/fonts')).pipe(browserSync.stream());
}

function img() {
	return src('src/img/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('dist/img'))
		.pipe(browserSync.stream());
}

function icons() {
	return src('src/icons/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('dist/icons'))
		.pipe(browserSync.stream());
}

function cleanDist() {
	return del('dist');
}

function watching() {
	watch(['src/*.html']).on('change', browserSync.reload);
	watch(['src/*.html'], html);
	watch(['src/sass/**/*.+(scss|sass|css)'], styles);
	watch(['src/js/**/*.js'], scripts);
	watch(['src/fonts/**/*'], fonts);
	watch(['src/img/**/*'], img);
	watch(['src/icons/**/*'], icons);
}

exports.clear = series(cleanDist);
exports.default = parallel(watching, server, html, styles, scripts, fonts, img, icons);
