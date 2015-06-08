module.exports = function (grunt) {

  grunt.initConfig({

    compass: {
      compile: {
        options: {
          sassDir: 'public/sass/',
          cssDir: 'public/stylesheets/',
          outputStyle: 'compressed'
        }
      }
    },

    watch: {
      css: {
        files: 'public/sass/*.scss',
        tasks: ['compass'],
        options: {
          livereload: true,
        },
      },
    },

  });

  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('compile', ['compass']);
  grunt.registerTask('default', ['watch']);
};