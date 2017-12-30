var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    prefix = require('gulp-autoprefixer')
    sass = require('gulp-sass');
    gutil = require('gulp-util');

// Minifies JS
gulp.task('js', function(){
    return gulp.src(['!./node_modules/**',
    './app/app.js',
    './app/controllers/*.js',
    './app/directives/*.js',
    '!./app/services/electron.service.js',
    './app/services/*.js'])
    .pipe(concat('code.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist/js'))
});

/*==========  Minify and concat different styles files  ==========*/

// SASS Version
// gulp.task('styles', function(){
//     return gulp.src('src/sass/**/*.sass')
//     .pipe(sass())
//     .pipe(prefix('last 2 versions'))
//     .pipe(concat('main.css'))
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('public/css'))
// });

// SCSS Version
//gulp.task('styles', function(){
    //return gulp.src('src/scss/**/*.scss')
    //.pipe(sass())
    //.pipe(prefix('last 2 versions'))
    //.pipe(concat('main.css'))
    //.pipe(minifyCSS())
    //.pipe(gulp.dest('public/css'))
//});


// CSS Version

gulp.task('styles', function(){
    return gulp.src(['./app/css/*.css','!./node_modules/**'])
    .pipe(concat('wordandworship.css'))
    .pipe(minifyCSS())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('dist/css'))
});


gulp.task('default', function() {
    gulp.run('styles')
    gulp.run('js')
    // gulp.watch('src/sass/**/*.sass', function(){
    //     gulp.run('styles')
    // })
});