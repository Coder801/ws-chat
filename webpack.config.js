const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

const PATH = {
  client: {
    context: path.resolve(__dirname, './client/src'),
    entry: './index.js',
    output: path.resolve(__dirname, './client/build')
  },
  server: {
    context: path.resolve(__dirname, './server/src'),
    entry: './index.ts',
    output: path.resolve(__dirname, './server/build')
  }
}

const CLIENT = {
  context: PATH.client.context,
  entry: {
    app: PATH.client.entry
  },
  output: {
    path: PATH.client.output,
    filename: '[name].bundle.js'
  }
}

const SERVER = {
  target: 'node',
  devtool: 'inline-source-map',
  context: PATH.server.context,
  entry: {
    app: PATH.server.entry
  },
  output: {
    path: PATH.server.output,
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}

module.exports = [CLIENT, SERVER];
