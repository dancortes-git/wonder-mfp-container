const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = 8000;

const devConfig = {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${port}/`,
  },
  devServer: {
    port,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        customer: 'customer@http://localhost:8001/remoteEntry.js',
        legal: 'legal@http://localhost:8002/remoteEntry.js',
        marketing: 'marketing@http://localhost:8003/remoteEntry.js',
        purchase: 'purchase@http://localhost:8004/remoteEntry.js',
        product: 'product@http://localhost:8005/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
