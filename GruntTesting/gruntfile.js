module.exports = function(grunt) {
	
	grunt.registerTask("speak", function() {
		console.log("Speaking");
	});
	/*
	grunt.registerTask("yell", function() {
		console.log("Yelling");
	});
	
	grunt.registerTask("both", ["speak", "yell"]);
	*/
	
	// Project configuration. 
	grunt.initConfig({
		concat: {
		  js: {
			src: ['jsSRC/1.js', 'jsSRC/2.js'],
			dest: 'build/js/script.js',
		  },
		  css: {
			src: ['cssSRC/1.css', 'cssSRC/2.css'],
			dest: 'build/css/styles.js',
		  },
		},
		copy: {
		    bower: {
				files: [
				  {
				    flatten: true,
					expand: true,
					filter: "isFile",
					src: "bower_components/angular/angular.js",
					dest: "lib"
				  },
				  {
					flatten: true,
					expand: true,
					filter: "isFile",
					src: "bower_components/jquery/dist/jquery.js",
					dest: "lib"  
				  }
				],
		    },
		},
	    watch: {
		  js: {
			files: ['jsSRC/**/*.js'],
			tasks: ['concat:js'],
		  },
		  css: {
			files: ['cssSRC/**/*.css'],
			tasks: ['concat:css'],
		  },
		},
		less: {
			development: {
				options: {
					paths: ["less"],
				},
				files: {
					"css/style.css": "less/style.less"
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	
	
	grunt.registerTask("cpy", ["copy:bower"]);
	grunt.registerTask('default', ["concat", "watch"]);
	
};


















