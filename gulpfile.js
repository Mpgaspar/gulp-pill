const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const typescript = require('gulp-typescript');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/* 
-- TOP LEVEL FUNCTIONS --
gulp.task - Define tasks
gulp.src - Point to files to use
gulp.dest - Points to folder to output
gulp.watch - watch files and folders for changes
*/

// Logs Messages
gulp.task('hi', function(){
    return console.log('Hi Gulp!');
});

gulp.task('default', function(){
    return console.log('Hi Gulp!');
});

// Copy all HTML files
gulp.task('copyHtml', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', () =>
  gulp.src('src/images/*')
      .pipe(imagemin()) 
      .pipe(gulp.dest('dist/images')) 
);

// Minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Compile Typescript
gulp.task('typescript', function() {
    gulp.src('src/ts/*.ts')
        .pipe(typescript())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch tasks changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});