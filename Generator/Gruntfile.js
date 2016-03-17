module.exports = function (grunt){

// Project configuration.
	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["css"],
					dumpLineNumbers: "all",
					sourceMap: true,
					sourceMapFileInline: true
				},
				files: {
					"css/style.css": "css/style.less"
				}
			}
		},
		watch: {
			css: {
				files: ['css/**/*.less'],
				tasks: ['less:development'],
			},
		}
	});

	// Default task(s).
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ["less:development", "watch"]);
};
