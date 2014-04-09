'use strict',
module.exports = function (grunt) {

	grunt.initConfig({
		mocha_phantomjs: {
			options: {
				'reporter': 'spec'
			},
			runner: ['tests/runner.html']
		},
		jshint: {
			all: [
				'tests/runner.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			scripts: {
				files: ['<%= jshint.all %>'],
				tasks: ['jshint:all'],
				options: {
					interrupt: true
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-phantomjs');

	// Default tasks
	grunt.registerTask('grunt-contrib-jshint');
	grunt.registerTask('test', ['mocha_phantomjs']);
	grunt.registerTask('default', ['jshint']);
};