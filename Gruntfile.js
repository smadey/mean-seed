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
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    cacheLocation: 'app/css/.sass-cache'
                },
                expand: true,
                noCache: true,
                cwd: 'app/css/sass/',
                src: ['*.scss'],
                dest: 'app/css',
                ext: '.css'
            },
            dist: {
                options: {
                    style: 'compressed',
                    cacheLocation: 'app/css/.sass-cache'
                },
                expand: true,
                noCache: true,
                cwd: 'app/css/sass/',
                src: ['*.scss'],
                dest: 'app/css',
                ext: '.css'
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
