/*
 * Created by Eric MA
 * Email: zjafei@gmail.com
 * Date: 2017-07-09 0009 
 * Time: 下午 17:40
 */

let minify = require('gulp-minify');

gulp.task('compress', function () {
    gulp.src('lib/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});