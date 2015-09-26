var gulp = require('gulp');

var browserSync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('sass-compile', function() {
  return gulp.src('./sass/load-icons.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([
            autoprefixer({
              browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            })
          ]))
          .pipe(gulp.dest('./css/'))
          .pipe(minifycss())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('./css/'));
});

gulp.task('separate-compile', function() {
  return gulp.src('./sass/icons/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([
            autoprefixer({
              browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']           
            })
          ]))
          .pipe(gulp.dest('./css/icons/'))
          .pipe(minifycss())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('./css/icons/'))
});

gulp.task('watch', function() {
  gulp.watch('./sass/*/*.scss', ['sass-compile', 'separate-compile']);
});

gulp.task('default', ['sass-compile', 'separate-compile', 'watch'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./*/*.js').on('change', browserSync.reload);
  gulp.watch('./*/*.css').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});
