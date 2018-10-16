const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');

gulp.task('default', ['clean'])

gulp.task('clean',()=>{
    del.sync('dist')
});