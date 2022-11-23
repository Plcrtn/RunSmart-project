const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('compass', function() {
    gulp.src("gulp compasssrc/sass/**/*.+(scss|sass")
      .pipe(compass({
        project: src.join(__dirname, 'assets'),
        css: 'style.min.css',
        sass: 'style.scss'
      }))
      .pipe(gulp.dest('app/assets/temp'));
  });

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({prefix: "",suffix: ".min",}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
    })

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));