var gulp = require('gulp');
var less = require('gulp-less');
var min = require('gulp-usemin');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var protractor = require('gulp-protractor');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');

gulp.task('test', ['seed'], function(callback) {
  runSequence('server:start', 'protractor', 'server:stop', callback);
});

gulp.task('server:start', function (callback) {
  server = require('./server');
  server.start(function() {
    callback()
  });
});

gulp.task('server:stop', function (callback) {
  server.stop(function() {
    process.exit(0);
    callback();
  });
});

gulp.task('protractor', function(callback){
  exec('protractor test/config.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback();
  });
});

gulp.task('less', function () {
  gulp.src('./app/styles/main.less')
  .pipe(less({
    paths: ['app/styles']
  }))
  .pipe(min({
    cssmin: true
  }))
  .pipe(gulp.dest('./app/styles/'));
});

gulp.task('jshint', function() {
  gulp.src('./app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:8000'
  };
  gulp.src('app/index.html')
  .pipe(open('', options));
});

gulp.task('default', ['server:start', 'open'], function() {
  livereload.listen();
  gulp.watch('app/styles/*.less', ['less']).on('change', livereload.changed);
  gulp.watch('app/**/*.js', ['jshint']).on('change', livereload.changed);
  gulp.watch('app/**/*.html').on('change', livereload.changed);
});


