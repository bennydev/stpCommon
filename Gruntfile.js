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
                    'src/header/**/*',
                    'src/modal/**/*',
                    'src/navigation/**/*',
                    'src/summary/**/*',
                    '!src/**/*.spec.js'],
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
            }
        },
        concat: {
            compile_header_js: {
                src: [
                    'build/src/header/*.js'
                ],
                dest: 'dist/stpHeader.js'
            },
            compile_modal_js: {
                src: [
                    'build/src/modal/*.js'
                ],
                dest: 'dist/stpModal.js'
            },
            compile_navigation_js: {
                src: [
                    'build/src/navigation/*.js'
                ],
                dest: 'dist/stpNavigation.js'
            },
            compile_summary_js: {
                src: [
                    'build/src/summary/*.js'
                ],
                dest: 'dist/stpSummary.js'
            }
        }
        };

    grunt.initConfig(taskConfig);

    /**
     * The default task is to copy files to the dist folder.
     */
    /**
     * The default task is to build and compile. When build and compile is finished
     * the project opened in your browser served by the connect-server.
     */
    grunt.registerTask( 'default', [ 'clean', 'copy', 'html2js', 'concat'] );

    //grunt.registerTask( 'default', [ 'build', 'compile', 'configureProxies:server', 'connect:dist:keepalive' ] );

//    TODO: 2. Bump up version property in bower.json.
//    TODO: 3. Publish to git repo
};