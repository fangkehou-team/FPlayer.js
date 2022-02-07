const { src, dest, parallel } = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


function js() {
  return src('../src/*.js')
    .pipe(concat('fplayer.js'))
    .pipe(dest('../dist/'))
    .pipe(uglify({
        mangle:true
    }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest('../dist/'))
}

exports.js = js;
exports.default = parallel(js);

