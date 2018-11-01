const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const betterWebpackProgress = require('better-webpack-progress');

const webpackConfig = require('./webpack.config.js');


const WEBPACK_PORT = process.env.WEBPACK_PORT || 4000;


module.exports = Object.assign({}, webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${WEBPACK_PORT}`,
    'webpack/hot/only-dev-server',
    ...webpackConfig.entry,
  ],
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProgressPlugin(betterWebpackProgress({ mode: 'bar' })),
    new FriendlyErrorsPlugin({ clearConsole: true }),
  ],
});


module.exports.devServer = {
  host: '0.0.0.0',
  port: WEBPACK_PORT,
  historyApiFallback: true,
  logLevel: 'silent',
  clientLogLevel: 'none',
  stats: 'errors-only',
  hot: true,
  inline: true,
  overlay: true,
};
