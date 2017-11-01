//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            '../_sites/_shared/lib/packages/angular.min.js',
            '../_sites/_shared/lib/packages/angular-mocks/angular-mocks.js',
            '../_sites/_shared/lib/packages/jquery-2.1.4.min.js',
            '../_sites/_shared/lib/packages/angular-route.min.js',
            '../_sites/_shared/lib/packages/angular-resource.min.js',
            '../_sites/_shared/lib/MathJax/MathJax.js',
            '../_sites/_shared/lib/textangular/dist/textAngular-rangy.min.js',
            '../_sites/_shared/lib/textangular/dist/textAngular-sanitize.min.js',
            '../_sites/_shared/lib/textangular/dist/textAngular.min.js',

            'app/scripts/common/_index.js',
            'app/scripts/common/**/_*.js',
            'app/scripts/common/**/*.js',

            //EDIT TASK FILES
            'app/scripts/editTask/components/_*.js',
            'app/scripts/editTask/components/**/*.js',
            'app/scripts/editTask/*.js',
            'app/scripts/editTask/tests/*.js',
            'app/scripts/editTask/*.html',

            //EDIT TASK SET FILES
            'app/scripts/editTaskSet/components/_*.js',
            'app/scripts/editTaskSet/components/**/*.js',
            'app/scripts/editTaskSet/*.js',
            'app/scripts/editTaskSet/tests/*.js',
            'app/scripts/editTaskSet/*.html',

            //CATALOG
            'app/scripts/catalog/components/_*.js',
            'app/scripts/catalog/components/**/*.js',
            'app/scripts/catalog/*.js',
            'app/scripts/catalog/tests/*.js',
            'app/scripts/catalog/*.html',

             //WORK RESULT
            'app/scripts/workResult/components/_*.js',
            'app/scripts/workResult/components/**/*.js',
            'app/scripts/workResult/*.js',
            'app/scripts/workResult/tests/*.js',
            'app/scripts/workResult/*.html'
        ],

        preprocessors: {
            'app/scripts/editTask/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },

        exclude: [

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
             'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
