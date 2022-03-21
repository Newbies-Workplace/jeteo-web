const config = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    ...config,

    mode: "development",

    // switch to 'eval' for fastest rebuild
    devtool: 'eval-source-map',

    stats: 'debug',

    devServer: {
        proxy: {
            '/oauth': {
                target: 'http://jeteo.newbies.pl:8080/'
            },
            '/api': {
                target: 'http://jeteo.newbies.pl:8080/'
            }
        },
        static: path.join(__dirname, 'public'),
        historyApiFallback: true,
    },

    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            ["process.env.API_URL"]: '"http://127.0.0.1:8080"',
        })
    ],
}