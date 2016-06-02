var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');



gulp.task('mnfzip',function(){
    return gulp.src('dist/*.js')
        .pipe(zip('angular2.resource'))
        .pipe(gulp.dest('sfdc-dist/staticresources/'))

});

gulp.task('deploy',function(){
    return gulp.src('./sfdc-dist/**', { base: "." })
        .pipe(zip('package.zip'))
        .pipe(forceDeploy({
            username:'',
            password:'',
            loginUrl:'',
            version:'36.0'
        }))
})
