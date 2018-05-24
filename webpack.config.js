const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    redux: path.resolve(__dirname, 'src/redux'),
    app: path.resolve(__dirname, 'src/app'),
    build: path.resolve(__dirname, 'build'),
    assets: path.resolve(__dirname, 'src/app/assets'),
    images: path.resolve(__dirname, 'src/app/assets/images')
};

process.env.BABEL_ENV = TARGET;

const nodeEnv = process.env.NODE_ENV || 'development';
const proxyHost = process.env.PROXY_HOST || 'http://localhost:3000';
const apiKey = process.env.API_KEY || '12345678';
const domain = process.env.DOMAIN || 'http://localhost:8080';

const clientConfig = {
    name: 'client',
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [
                    'react-hot-loader/webpack',
                    'babel-loader'
                ],
                exclude: ['/node_modules/'],
                include: [PATHS.redux, PATHS.app]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: '8192'
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PROXY_HOST': JSON.stringify(proxyHost),
            'process.env.DOMAIN': JSON.stringify(domain),
            'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        }),
        new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!isomorphic-fetch'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.assets}/index.html`, to: 'index.html' }
        ])
    ]
};

const productionConfig = {
    entry: {
        client: PATHS.app,
        vendors: [
          'react', 'react-dom', 'react-router', 'redux-logger',
          'whatwg-fetch', 'webpack-hot-middleware',
          'react-hot-loader', 'react-router-redux', 'normalizr'
        ]
    },
    output: {
        filename: 'client.js',
        path: PATHS.build,
        publicPath: '/'
    },
    devtool: 'hidden-source-map',
    plugins: [
        new CopyWebpackPlugin([
            { from: `${PATHS.assets}/favicon`, to: 'favicon' },
            { from: `${PATHS.assets}/index.html`, to: 'index.html' }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.bundle.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};

if (nodeEnv === 'development') {
    module.exports = merge(clientConfig, {
        entry: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
            PATHS.app
        ],
        output: {
            path: PATHS.build,
            filename: 'client.js',
            publicPath: '/',
            libraryTarget: 'umd'
        },
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            stats: 'errors-only',
            filename: 'client.js',
            host: process.env.HOST,
            port: process.env.PORT
        },
        devtool: 'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
} else {
    module.exports = merge(clientConfig, productionConfig);
}
