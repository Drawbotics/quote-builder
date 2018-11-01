const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');


dotenv.config();


const WEBPACK_PORT = process.env.WEBPACK_PORT || 4000;


module.exports = {
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${WEBPACK_PORT}`,
      'webpack/hot/only-dev-server',
      './src/app/index.tsx',
    ],
  },
  mode: process.env.APP_ENV,
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
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
      },
    ],
  },
};
