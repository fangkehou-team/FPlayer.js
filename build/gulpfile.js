const {src, dest, parallel} = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssmin = require('gulp-clean-css');
const autoprefix = require('gulp-autoprefixer');
const replace = require('gulp-replace');
const csscomb = require('gulp-csscomb');
const fs = require('fs');


function js() {
    return src('../src/js/*.js')
        .pipe(concat('fplayer.js'))
        .pipe(replace(/{{icon:([\S]+)}}/g, function (match, p1) {
            let fd = fs.openSync('../src/icon/' + p1 + '.svg','r');
            let result = '';
            do{
                var buf = Buffer.alloc(5);
                buf.fill();
                var bytes = fs.readSync(fd,buf,null,5);
                result += buf.slice(0, bytes).toString();
            }while(bytes>0);
            fs.closeSync(fd);
            return result;
        }))
        .pipe(dest('../dist/'))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('../dist/'))
}

function css() {
    return src('../src/css/*.css')
        .pipe(concat('fplayer.css'))
        .pipe(replace(/{{icon:([\S]+)}}/g, function (match, p1) {
            let fd = fs.openSync('../src/icon/' + p1 + '.svg','r');
            let result = '';
            do{
                var buf = Buffer.alloc(5);
                buf.fill();
                var bytes = fs.readSync(fd,buf,null,5);
                result += buf.slice(0, bytes).toString();
            }while(bytes>0);
            fs.closeSync(fd);
            return result;
        }))
        .pipe(autoprefix({ //通过autoprefix自动添加兼容各大浏览器的样式前缀，例如-webkit-，-o-
            overrideBrowserslist: ['since 2018'], //兼容最新20个版本
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(dest('../dist/'))
        .pipe(cssmin())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('../dist/'))
}

exports.js = js;
exports.css = css;
exports.default = parallel(js, css);

