'use strict';
module.exports = function(config) {
    config.set({
      frameworks: ['systemjs', 'mocha', 'expect', 'sinon'],

      files: [
        'src/datasource.ts',
        'src/azure_monitor_query_builder.ts',
        'src/azure_monitor_filter_builder.ts',
        'specs/lib/common.ts',
        'specs/lib/datemath.ts',
        'specs/lib/helpers.js',
        'specs/*.ts',
        'node_modules/typescript/lib/typescript.js',
        'node_modules/lodash/lodash.js',
        'node_modules/moment/moment.js',
        'node_modules/q/q.js',
      ],

      systemjs: {
      //   // SystemJS configuration specifically for tests, added after your config file.
      //   // Good for adding test libraries and mock modules
        config: {
          // Set path for third-party libraries as modules
          paths: {
            'systemjs': 'node_modules/systemjs/dist/system.js',
            'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
            'lodash': 'node_modules/lodash/lodash.js',
            'moment': 'node_modules/moment/moment.js',
            'q': 'node_modules/q/q.js',
            'typescript': 'node_modules/typescript/lib/typescript.js',
            'plugin-typescript': 'node_modules/plugin-typescript/lib/plugin.js',
          },

          map: {
              'plugin-typescript': 'node_modules/plugin-typescript/lib/',
              'typescript': 'node_modules/typescript/'
          },

          meta: {
            'typescript': {
              'exports': 'ts'
            }
          },

          packages: {
            'plugin-typescript': {
                'main': 'plugin.js'
            },
            'typescript': {
                'main': 'lib/typescript.js',
                'meta': {
                    'lib/typescript.js': {
                        'exports': 'ts'
                    }
                }
            },
            'src/': {
              'defaultExtension': 'ts',
              'meta': {
                '*.ts': {
                  'loader': 'typescript'
                }
              }
            },
            'specs/': {
              'defaultJSExtensions': true,
              'defaultExtension': 'ts',
              'meta': {
                '*.ts': {
                  'loader': 'typescript'
                },
                '*.js': {
                  'loader': 'typescript'
                }
              }
            },
          },

          transpiler: 'plugin-typescript',
        }
      },

      reporters: ['dots'],

      logLevel: config.LOG_INFO,

      browsers: ['PhantomJS']
    });
};
