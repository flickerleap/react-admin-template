const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function localResolve(preset) {
    return Array.isArray(preset) ?
        [require.resolve(preset[0]), preset[1]] :
        require.resolve(preset);
}

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-admin-template.js',
        library: 'reactAdminTemplate'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
            query: {
                presets: [
                    "babel-preset-env",
                    "babel-preset-react"
                ].map(localResolve),
                plugins: [
                    "babel-plugin-transform-class-properties",
                    "babel-plugin-transform-object-rest-spread"
                ].map(localResolve)
            }
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'react'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ]
};