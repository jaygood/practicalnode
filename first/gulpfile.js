var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('build', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'], function () {
  return nodemon({
    tasks: ['build'],
    script: 'dist/app.js',
    ext: 'js html',
    env: {NODE_ENV: 'development'}
  })
});