const path = require("path")
const webpack = require("webpack")
const ESLintPlugin = require("eslint-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: { main: ["./src/index.js"], component: ["./src/home.js", "./src/slider.js"] },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ESLintPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext][query]",
                },
            },
        ],
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, "src/images"),
        },
    },
}
