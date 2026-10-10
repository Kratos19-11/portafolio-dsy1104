const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-coverage',
    ],

    files: [{ pattern: 'src/tests/index.js', watched: false }],
    preprocessors: { 'src/tests/index.js': ['webpack', 'sourcemap'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  ['istanbul', { exclude: ['**/*.spec.jsx', '**/*.spec.js', 'src/tests/**'] }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpe?g|svg|gif|webp)$/, type: 'asset/resource' },
        ],
      },
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
    },

    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: false,
    autoWatch: true,
  });
};