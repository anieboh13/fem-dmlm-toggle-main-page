// In a gulp file, this is a javascript thing thatyou run on the commad line using node, this is what we will use to comply and minify our files 

// Initialize modules... importing all the modules that were previously install with gulp
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Use dart-sass for @use ...so we can use the new 'use' and 'forward' syntax in our sass rules 
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask(){
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.'}));
}

// Javascript Task
function jsTask(){
    return src('app/js/scripts.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.'}));
}

//Browsersync 
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

//Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe,watchTask);

