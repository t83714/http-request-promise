const path = require("path");
const webpack = require("webpack");

const PROD = JSON.parse(process.env.PROD_ENV || "0");
const plugins = [];
if (PROD) {
    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production"),
        },
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: true
    }));
}
plugins.push(new webpack.NoEmitOnErrorsPlugin());

module.exports = {
    target: "web",
    devtool: "sourcemap",
    plugins,
    entry: {
        index: [
            "./index.js",
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        library: 'HttpRequestPromise',
        libraryTarget: "umd",
        filename: PROD ? "index.bundle.min.js" : "index.bundle.js",
    },
    externals:{
        jquery: true,
        "babel-polyfill": true
    },
    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["es2015", "stage-2"],
            },
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "..")],
        }],
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
    },
};
