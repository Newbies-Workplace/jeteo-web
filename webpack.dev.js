const config = require("./webpack.config");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    ...config,
    mode: "development",
    // switch to 'eval' for fastest rebuild
    devtool: "eval-source-map",
    stats: "debug",
    devServer: {
        proxy: {
            "/oauth": {
                target: "http://51.38.131.25:8080/",
                onProxyReq: proxyReq => {
                    console.log(proxyReq);
                }
            }
        },
        static: path.join(__dirname, "public"),
        historyApiFallback: true,
    },
    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            ["process.env.API_URL"]: '"http://127.0.0.1:8080"',
        })
    ],
}