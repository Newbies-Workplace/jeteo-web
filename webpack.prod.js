const config = require("./webpack.config");
const webpack = require("webpack");

module.exports = {
    ...config,
    devtool: "source-map",
    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            ["process.env.API_URL"]: `"${process.env.API_URL}"`,
        })
    ],
    mode: "production",
}