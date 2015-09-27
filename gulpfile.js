var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('start', function() {
  nodemon({
    script: 'server/server.js'
  , ext: 'log js html'
  , env: { 'NODE_ENV': 'development' }
  });
})

gulp.task('default', ['start'], function() {
  
});
