const path = require('path');
const HappyPack = require('happypack');
module.exports = {
  entry: {
    index: '../src/index.js',
  },
  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, '../dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].js', // string
    // the filename template for entry chunks
  },
  resolve: {
    extensions: ['.js', '.html', '.json', '.scss'],
    alias: {
      // tsconfig.json config for editor
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|res)/,
        loader: 'happypack/loader?id=js',
      },
    ],
  },

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: 'web', // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  stats: 'normal',
  // lets you precisely control what bundle information gets displayed

  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            comments: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    edge: 17,
                    firefox: 60,
                    chrome: 67,
                    safari: 11.1,
                  },
                  useBuiltIns: 'usage',
                  corejs: 3,
                  modules: false,
                },
              ],
              ['@babel/preset-react'],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              'transform-es5-property-mutators',
            ],
          },
        },
      ],
    }),
  ],
  // list of additional plugins
};
