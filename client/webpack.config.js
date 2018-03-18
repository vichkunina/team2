const path = require('path');

const vendorLibs = [
    'react',
    'react-dom',
    'mobx',
    'mobx-react'
];

module.exports = {
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
                    presets: ['react', 'mobx'],
                    plugins: []
                }
            }
        ]
    }
};
