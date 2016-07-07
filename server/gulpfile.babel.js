import gulp from 'gulp';
import babel from 'gulp-babel';
// import ts from 'gulp-typescript';
// import tslint from 'gulp-tslint';
import del from 'del';

gulp.task('clean', () => del('lib'));

// gulp.task('lint', ['clean'], () => {
//   return gulp.src('src/**/*.ts')
//     .pipe(tslint())
//     .pipe(tslint.report('full'));
// });

// gulp.task('build', ['lint'], () => {
//   let tsProject = ts.createProject('tsconfig.json');
//   let tsResult = tsProject.src()
//     .pipe(ts(tsProject));
  
//   return tsResult.js.pipe(gulp.dest('lib'));
// });

gulp.task('build', ['clean'], () => {
  return gulp.src('src/**/*.js').pipe(babel()).pipe(gulp.dest('lib'));
})