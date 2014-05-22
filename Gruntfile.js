module.exports = function(grunt) {
    'use strict';

    //grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: ['app/*.html', 'app/**/*.html', 'app/css/*.css', 'app/js/*.js']
            },
            css: {
                files: ['app/css/sass/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: [
                    'app/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint']
            }
        },

        sass: {
            options: {
                cacheLocation: 'app/css/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    'app/css/main.css': 'app/css/sass/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/css/main.css': 'app/css/sass/main.scss'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'app/js/*.js']
        }
    });

    //load all grunt tasks
    require('load-grunt-tasks')(grunt);

    //define tasks
    grunt.registerTask('default', ['watch']);
};
