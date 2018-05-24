'use strict';

// Use flow check

const path = require('path');
const webpack = require('webpack');
const PATHS = {
    redux: path.join(__dirname, 'src/redux'),
    app: path.join(__dirname, 'src/app'),
    build: path.join(__dirname, 'build'),
    assets: path.join(__dirname, 'src/app/assets'),
    images: path.join(__dirname, 'src/app/assets/images')
};

let config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      client: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: 'client.js',
      publicPath: '/'
    },

    resolve: {
      modules: [
        __dirname,
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.css', 'sass']
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: [
          'babel-loader'
          ],
        include: [PATHS.app],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          "style-loader", 
          "css-loader"
        ]
      }, {
        test: /\.scss$/,
        use: [
          "style-loader", 
          "css-loader", 
          "sass-loader"
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '8192'
            }
          },
          'img-loader'
        ]
      }]
    }
};

module.exports = config;
