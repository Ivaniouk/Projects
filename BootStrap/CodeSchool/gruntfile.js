module.exports = function(grunt) {
	
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
					"css/myStyle.css": "css/myStyle.less"
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
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	
	grunt.registerTask('default', ["less:development", "watch"]);
	
};


















