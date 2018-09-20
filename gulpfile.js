const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default',['materialize']);

gulp.task('materialize',()=>{
    const materialize_modules= ["cash","component","global","anime.min","dropdown","modal","toasts","forms","datepicker","select"];
    gulp.src(materialize_modules.map(module=>`node_modules/materialize-css/js/${module}.js`))
    .pipe(concat('materialize-custom.js'))
    .pipe(gulp.dest('./libs/'));
});