const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const vendorLibs = [
    'react',
    'react-dom',
    'mobx',
    'mobx-react'
];

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: path.join(__dirname, '/src/index.js'),
        vendor: vendorLibs
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: { name: '[name].js' }
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                    plugins: ['transform-decorators-legacy',
                        'transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true
                }
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '/assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
