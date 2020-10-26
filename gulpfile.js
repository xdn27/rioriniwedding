var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

gulp.task('watch', function () {
    gulp.watch('./style.less', gulp.series('less'));
});

gulp.task('less', function (done) {
    gulp.src('./*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));

    done();
});

gulp.task('default', function(done) {
    gulp.series('less', 'watch');
    done();
});
