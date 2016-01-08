"use strict";
module.exports = function (grunt) {

    // Reads package.json and loads grunt tasks automatically
    var loadGruntTasks = require('load-grunt-tasks');
    loadGruntTasks(grunt);

    // Time how long tasks take. Can help when optimizing build times
    var timeGrunt = require('time-grunt');
    timeGrunt(grunt);

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            options: {
                force: true
            },
            files: {
                src: [
                    'build',
                    'dist'
                ]
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build: {
                src: [
                    'vendor/angular/angular.js',
                    'vendor/angular-sanitize/angular-sanitize.js',
                    'vendor/angular-translate/angular-translate.js',
                    'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'vendor/angular-ui-router/release/angular-ui-router.js',
                    'vendor/fsmQuestion/dist/fsmQuestion.js',
                    'vendor/angular-mocks/angular-mocks.js',
                    'src/header/**/*',
                    'src/modal/**/*',
                    'src/navigation/**/*',
                    'src/summary/**/*',
                    'src/offer/**/*',
                    'karma/helpers/**/*.js',
                    'karma/mocks/**/*.js'
                ],
                dest: 'build',
                expand: true
            }

        },
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            header: {
                options: {
                    base: 'build/src',
                    module: 'stpHeaderTemplates'
                },
                src: ['build/src/header/**/*.html'],
                dest: 'build/src/header/stpHeaderTemplates.js'
            },
            modal: {
                options: {
                    base: 'build/src',
                    module: 'stpModalTemplates'
                },
                src: ['build/src/modal/**/*.html'],
                dest: 'build/src/modal/stpModalTemplates.js'
            },
            navigation: {
                options: {
                    base: 'build/src',
                    module: 'stpNavigationTemplates'
                },
                src: ['build/src/navigation/**/*.html'],
                dest: 'build/src/navigation/stpNavigationTemplates.js'
            },
            summary: {
                options: {
                    base: 'build/src',
                    module: 'stpSummaryTemplates'
                },
                src: ['build/src/summary/**/*.html'],
                dest: 'build/src/summary/stpSummaryTemplates.js'
            },
            offer: {
                options: {
                    base: 'build/src',
                    module: 'stpOfferTemplates'
                },
                src: ['build/src/offer/**/*.html'],
                dest: 'build/src/offer/stpOfferTemplates.js'
            }
        },
        concat: {
            compile_header_js: {
                src: [
                    'build/src/header/*.js',
                    '!build/src/**/*.spec.js'
                ],
                dest: 'dist/stpHeader.js'
            },
            compile_modal_js: {
                src: [
                    'build/src/modal/*.js',
                    '!build/src/**/*.spec.js'
                ],
                dest: 'dist/stpModal.js'
            },
            compile_navigation_js: {
                src: [
                    'build/src/navigation/*.js',
                    '!build/src/**/*.spec.js'
                ],
                dest: 'dist/stpNavigation.js'
            },
            compile_summary_js: {
                src: [
                    'build/src/summary/*.js',
                    '!build/src/**/*.spec.js'
                ],
                dest: 'dist/stpSummary.js'
            },
            compile_offer_js: {
                src: [
                    'build/src/offer/*.js',
                    '!build/src/**/*.spec.js'
                ],
                dest: 'dist/stpOffer.js'
            }
        },
        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: 'build/karma-unit.js'
            },
            unit: {
                runnerPort: 9876,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },
        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         *
         * NOTE: The ordering of the modules is important!
         */
        karmaconfig: {
            unit: {
                dir: 'build',
                src: [
                    'vendor/angular/angular.js',
                    'vendor/angular-sanitize/angular-sanitize.js',
                    'vendor/angular-translate/angular-translate.js',
                    'vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'vendor/angular-ui-router/release/angular-ui-router.js',
                    'vendor/angular-mocks/angular-mocks.js',
                    'vendor/fsmQuestion/dist/fsmQuestion.js',
                    'src/header/header.js',
                    'src/header/*.js',
                    'src/modal/*.js',
                    'src/navigation/*.js',
                    'src/offer/*.js',
                    'src/summary/*.js',
                    '!src/**/*.spec.js',
                    'karma/helpers/**/*.js',
                    'karma/mocks/**/*.js'
                ]
            }



        }


    };

    grunt.initConfig(taskConfig);

    /**
     * The default task is to copy files to the dist folder.
     */
    grunt.registerTask( 'default', [ 'clean', 'copy', 'html2js', 'concat', 'karmaconfig',  'karma:continuous', 'karma:unit'] );

    //grunt.registerTask( 'default', [ 'build', 'compile', 'configureProxies:server', 'connect:dist:keepalive' ] );

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', 'build/karma-unit.js', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            //console.log('File: ' + file);
            return file.match(/\.js$/);
        });
    }


//    TODO: 2. Bump up version property in bower.json.
//    TODO: 3. Publish to git repo
};