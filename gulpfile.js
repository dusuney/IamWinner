'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var base64 = require('gulp-base64');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var templateCache = require('gulp-angular-templatecache');

//var nga = ['bower_components/angular/angular.min.js'];
//var jq = ['bower_components/jquery/dist/jquery.min.js'];

var distJS = '../_sites/www/theme/default/js/';
var distCSS = '../_sites/www/theme/default/css/';
var distFonts = '../_sites/www/theme/default/fonts/';
var distImages = '../_sites/www/theme/default/images/';

/*EDIT TASK*/
var editTaskSetJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/editTaskSet/components/**/_*.js',
    'app/scripts/editTaskSet/components/**/*.js',
    'app/scripts/editTaskSet/components/_*.js',

    'app/scripts/editTaskSet/_*.js',
    'app/scripts/editTaskSet/*.js'
];
var editTaskSetTemplates = [
    'app/scripts/editTaskSet/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/editTaskSet/components/**/*.html'];

/*EDIT TASK*/
var editTaskJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/editTask/components/**/_*.js',
    'app/scripts/editTask/components/**/*.js',
    'app/scripts/editTask/components/_*.js',

    'app/scripts/editTask/_*.js',
    'app/scripts/editTask/*.js'
];
var editTaskTemplates = [
    'app/scripts/editTask/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/editTask/components/**/*.html'
];

/*TASK SET*/
var taskSetListJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/taskSetList/components/**/_*.js',
    'app/scripts/taskSetList/components/**/*.js',
    'app/scripts/taskSetList/components/_*.js',

    'app/scripts/taskSetList/_*.js',
    'app/scripts/taskSetList/*.js',
];

var taskSetListTemplates = [
    'app/scripts/taskSetList/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/taskSetList/components/**/*.html'];



/*TASK LIST*/
var taskListJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/_*.js',
    'app/scripts/common/**/*.js',
    'app/scripts/taskList/components/**/_*.js',
    'app/scripts/taskList/components/**/*.js',
    'app/scripts/taskList/components/_*.js',
    'app/scripts/taskList/_*.js',
    'app/scripts/taskList/*.js',
];
var taskListTemplates = ['app/scripts/taskList/*.html', 'app/scripts/common/**/*.html', 'app/scripts/taskList/components/**/*.html'];

/*CATALOG*/
var catalogJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/catalog/components/**/_*.js',
    'app/scripts/catalog/components/**/*.js',
    'app/scripts/catalog/components/_*.js',

    'app/scripts/catalog/_*.js',
    'app/scripts/catalog/*.js',
];

var catalogTemplates = [
    'app/scripts/catalog/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/catalog/components/**/*.html'];


/*SET*/
var setJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/set/components/**/_*.js',
    'app/scripts/set/components/**/*.js',
    'app/scripts/set/components/_*.js',

    'app/scripts/set/_*.js',
    'app/scripts/set/*.js',
];

var setTemplates = [
    'app/scripts/set/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/set/components/**/*.html'];


/*WIZARD*/
var wizardJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/wizard/components/**/_*.js',
    'app/scripts/wizard/components/**/*.js',
    'app/scripts/wizard/components/_*.js',

    'app/scripts/wizard/_*.js',
    'app/scripts/wizard/*.js',
];

var wizardTemplates = [
    'app/scripts/wizard/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/wizard/components/**/*.html'];


/*WORK LIST*/
var workListJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/workList/components/**/_*.js',
    'app/scripts/workList/components/**/*.js',
    'app/scripts/workList/components/_*.js',

    'app/scripts/workList/_*.js',
    'app/scripts/workList/*.js',
];

var workListTemplates = [
    'app/scripts/workList/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/workList/components/**/*.html'];

/*WORK RESULT*/
var workResultJS = [

    '!app/scripts/**/tests/*.js',
    '!app/scripts/**/tests/e2e/*.js',

     'app/scripts/common/**/_*.js',
    'app/scripts/common/**/**/*.js',
    'app/scripts/common/**/*.js',

    'app/scripts/workResult/components/**/_*.js',
    'app/scripts/workResult/components/**/*.js',
    'app/scripts/workResult/components/_*.js',

    'app/scripts/workResult/_*.js',
    'app/scripts/workResult/*.js',
];

var workResultTemplates = [
    'app/scripts/workResult/*.html',
    'app/scripts/common/**/*.html',
    'app/scripts/workResult/components/**/*.html'];

var styles = [
    'app/styles/style.ui.css'
];

var fonts = [
    'bower_components/bootstrap/fonts/*.woff',
    'bower_components/bootstrap/fonts/*.ttf',
    'bower_components/bootstrap/fonts/*.woff2',
    'bower_components/gentelella/vendors/font-awesome/fonts/*.*'
];

var stylesLess = ['app/styles/index.less'];

var images = ['app/images/svg/*.svg', 'bower_components/gentelella/production/images/*.*'];


var server;

gulp.task('images', function () {
    return gulp.src(images)
    // .pipe(imagemin({
    //     svgoPlugins: [{
    //         removeHiddenElems: false
    //     }]
    // }))
    // .pipe(rename({
    //     prefix: 'ui-icon-'
    // }))
    // .pipe(svgstore({}))
        .pipe(gulp.dest(distImages))

});

gulp.task('editTaskSetJS', function () {

    var templatesStream = gulp.src(editTaskSetTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(editTaskSetJS);


    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('editTaskSet.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('editTaskJS', function () {


    var templatesStream = gulp.src(editTaskTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(editTaskJS);


    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('editTask.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('taskSetListJS', function () {


    var templatesStream = gulp.src(taskSetListTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(taskSetListJS);


    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('taskSetList.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('taskListJS', function () {


    var templatesStream = gulp.src(taskListTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(taskListJS);


    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('taskList.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('catalogJS', function () {

    var templatesStream = gulp.src(catalogTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(catalogJS);


    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('catalog.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('setJS', function () {

    var templatesStream = gulp.src(setTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(setJS);

    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('set.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('wizardJS', function () {

    var templatesStream = gulp.src(wizardTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(wizardJS);

    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('wizard.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('workListJS', function () {

    var templatesStream = gulp.src(workListTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(workListJS);

    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('workList.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('workResultJS', function () {

    var templatesStream = gulp.src(workResultTemplates)
        .pipe(templateCache({ standalone: true, root: '/pages/' }));

    var appStream = gulp.src(workResultJS);

    var mergedStream = merge(templatesStream, appStream)
        .pipe(concat('workResult.js'))
        .pipe(gulp.dest(distJS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;
});

gulp.task('scripts', [
    'editTaskSetJS',
    'editTaskJS',
    'taskSetListJS',
    'taskListJS',
    'catalogJS',
    'setJS',
    'wizardJS',
    'workListJS',
    'workResultJS'
]);

gulp.task('fonts', function () {
    gulp.src(fonts)
        .pipe(gulp.dest(distFonts));
});

gulp.task('styles', function () {
    var cssStream = gulp.src(styles)
        .pipe(concat('app.css'));

    var lessStream = gulp.src(stylesLess)
        .pipe(less())
        .pipe(concat('less-files.less'));

    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(distCSS))
        .pipe(reload({
            stream: true
        }));

    return mergedStream;

});

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Editor"
};

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('watch', function () {

    gulp.watch(editTaskSetJS, function (event, cb) {
        gulp.start('editTaskSetJS');
    });

    gulp.watch(editTaskJS, function (event, cb) {
        gulp.start('editTaskJS');
    });

    gulp.watch(taskListJS, function (event, cb) {
        gulp.start('taskListJS');
    });

    gulp.watch(taskSetListJS, function (event, cb) {
        gulp.start('taskSetListJS');
    });

    gulp.watch(catalogJS, function (event, cb) {
        gulp.start('catalogJS');
    });

    gulp.watch(setJS, function (event, cb) {
        gulp.start('setJS');
    });

    gulp.watch(wizardJS, function (event, cb) {
        gulp.start('wizardJS');
    });

    gulp.watch(workListJS, function (event, cb) {
        gulp.start('workListJS');
    });

    gulp.watch(workResultJS, function (event, cb) {
        gulp.start('workResultJS');
    });

    gulp.watch('app/styles/*.less', function (event, cb) {
        gulp.start('styles');
    });

    gulp.watch(['app/scripts/**/*.html', 'app/index.html'], function (event, cb) {
        gulp.start('scripts');
    });

});


gulp.task('build', ['images', 'scripts', 'styles']);

gulp.task('run', ['fonts','images', 'scripts', 'styles', 'watch']);
