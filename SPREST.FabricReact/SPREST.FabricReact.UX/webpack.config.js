var path = require("path");
var webpack = require("webpack");

module.exports = {
    // Root folder of source code
    context: path.join(__dirname, "src"),

    // Entry point(s)
    entry: {
        html: "./index.html",
        javascript: "./index.tsx"
    },

    // Output
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },

    // Include the typescript files as resolvable extensions
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    // Module
    module: {
        // Loaders
        loaders: [
            {
                test: /.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /.html?$/,
                loader: "file?name=[name].[ext]"
            }
        ]
    }
}