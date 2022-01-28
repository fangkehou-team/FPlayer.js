const { src, dest, parallel } = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


function js() {
  return src('../src/*.js', { sourcemaps: true })
    .pipe(concat('fplayer.js'))
    .pipe(dest('../dist/', { sourcemaps: true }))
    .pipe(uglify({
        mangle:true
    }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest('../dist/', { sourcemaps: true }))
}

exports.js = js;
exports.default = parallel(js);

