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
                files: ['app/**']
            },
            css: {
                files: ['app/css/sass/*.scss'],
                tasks: ['sass:dist']
            },
            js: {
                files: ['Gruntfile.js', 'app/js/*.js'],
                tasks: ['jshint']
            }
        },

        sass: {
            options: {
                cacheLocation: 'app/css/.sass-cache',
                sourcemap: 'none'
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
        },

        concat: {
            options: {
                separator: ';',
            },
            release: {
                files: {
                    'app/release/js/main.js': ['app/js/*.js']
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            release: {
                files: {
                    'app/release/js/main.min.js': ['app/release/js/main.js']
                }
            }
        }
    });

    //load all grunt tasks
    require('load-grunt-tasks')(grunt);

    //define tasks
    grunt.registerTask('default', ['watch']);
};
