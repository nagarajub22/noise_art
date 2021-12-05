const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const minifyCssPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/index.tsx', './src/scss/style.scss'],
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            // include all types of chunks
            name: 'vendor',
            chunks: 'all',
        },
        usedExports: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.component\.s(a|c)ss$/,
                use: [
                    minifyCssPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                                localIdentContext: path.resolve(__dirname, "src"),
                                localIdentHashSalt: "my-custom-hash"
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.component.(s(a|c)ss)$/,
                use: [
                    minifyCssPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use:
                [
                    'raw-loader',
                    'glslify-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'scss'],
    },
    plugins: [
        new htmlPlugin({
            template: './src/index.html',
            title: 'JSProcessing-Noise',
            filename: './index.html',
            inject: 'body'
        }),
        new minifyCssPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../../dist'),
        clean: true,
    },
};