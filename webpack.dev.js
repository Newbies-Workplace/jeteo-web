const config = require('./webpack.config');
const path = require('path');

module.exports = {
    ...config,

    mode: "development",

    // switch to 'eval' for fastest rebuild
    devtool: 'eval-source-map',

    // reduce shitpost in terminal
    stats: 'minimal',

    devServer: {
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // },
        static: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
}