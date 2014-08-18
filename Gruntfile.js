'use strict'
module.exports = function(grunt) {
  var config = {}
  config.pkg = grunt.file.readJSON('package.json')
  config.nodefiles = ['server.js','lib/**/*.js','lib/*.js']
  config.nodespecfiles = ['spec/**/*Spec.js']
  config.browserfiles = ['app/js/**/*.js', 'app/js/*.js']
  config.browserspecfiles = ['app/spec/**/*Spec.js', 'app/spec/*Spec.js']
  config.e2efiles = ['e2e/**/*Spec.js', 'e2e/*Spec.js']
  config.styleFiles = ['app/css/*.scss']
  config.backendFiles = config.nodespecfiles.concat(config.nodefiles)
  config.frontendFiles = config.browserfiles.concat(config.browserspecfiles)
  config.allCodeFiles = config.nodefiles.concat(config.browserfiles)
  config.allSpecFiles = config.nodespecfiles.concat(config.browserspecfiles)
  config.allJS = config.backendFiles.concat(config.frontendFiles)

  config.concurrent = {
    dev: {
      tasks: ['nodemon', 'node-inspector', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  }

  config.nodemon = {
    dev: {
      script: 'server.js',
      options: {
        nodeArgs: ['--debug']
      }
    },
    options: {
      ignore: ['app/**', '<%= allSpecFiles %>', '.grunt/**']
    }
  }

  config['node-inspector'] = {
    dev: {}
  }

  config.spec = {
    default: {
      specs: config.allSpecFiles,
      isVerbose: true,
      showColors: true,
      includeStackTrace: true,
      defaultTimeoutInterval: 5000
    }
  }

  config.jasmine = {
    default: {
      src: ['app/assets/bundle.js']
    },
    options: {
      specs: 'app/spec/specBundle.js',
      '--local-to-remote-url-access' : true
    }
  }

  config.browserify = {
    main: {
      files: {
        'app/assets/bundle.js': 'app/js/main.js'
      },
      options: {
        debug: true,
        alias: [
          'bower_components/angular/angular.js:angular',
          'bower_components/angular-strap/dist/angular-strap.js:angular-strap',
          'bower_components/angular-strap/dist/angular-strap.tpl.js:angular-strap.tpl'
        ]
      }
    }
  }

  config.sass = {
    main: {
      files: {'app/assets/main.css': 'app/css/main.scss'}
    }
  }

  config.concat = {
    options: {
      sourceMap: true
    },
    css: {
      src: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
        'app/assets/main.css'
      ],
      dest: 'app/assets/bundle.css'
    }
  }

  config.eslint = {
    code: {
      files: {
        src: config.allCodeFiles,
      },
      options: {
        config: 'config/eslint.json'
      }
    },
    specs: {
      files: {
        src: config.allSpecFiles,
      },
      options: {
        config: 'config/eslint-specs.json'
      }
    }
  }

  config.watch = {
    nodeSpecs: {
      files: config.backendFiles,
      tasks: 'spec'
    },
    frontEnd: {
      files:  config.frontendFiles,
      tasks: ['browserify', 'jasmine']
    },
    lint: {
      files: config.allJS,
      tasks: 'eslint'
    },
    scss: {
      files: config.styleFiles,
      tasks: ['sass', 'concat:css']
    }
  }

  grunt.initConfig(config)

  grunt.loadNpmTasks('eslint-grunt')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-node-inspector')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-sass')

  grunt.registerMultiTask('spec', 'Run node jasmine specs', function(){
    var done = this.async();
    var jasmineLib = require('minijasminenode2');
    this.data.specs = grunt.file.expand(this.data.specs)
    this.data.onComplete = done
    jasmineLib.executeSpecs(this.data)
  })

  grunt.registerTask('default', ['concurrent:dev'])
  grunt.registerTask('build', ['browserify', 'sass', 'concat'])
}
