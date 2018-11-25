const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');


dotenv.config();


const rootDirs = [
  path.resolve(__dirname, 'src'),
];


module.exports = {
  entry: [
    './src/app/index.tsx',
  ],
  target: 'electron-renderer',
  mode: process.env.APP_ENV,
  devtool: 'source-map',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    alias: {
      '~': path.resolve(__dirname, 'src/app'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: rootDirs,
        use: [
          'babel-loader',
          'awesome-typescript-loader',
        ],
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
            },
          },
        ],
      }, {
        test: require.resolve('node-vibrant/dist/vibrant.js'),
        use: 'exports-loader?Vibrant',
      },
      {
        test: /\.yml$/,
        use: [
          {
            loader: 'json-loader',
            options: {
              type: 'javascript/auto',
            },
          },
          {
            loader: 'yaml-loader',
          },
        ],
      },
    ],
  },
};
