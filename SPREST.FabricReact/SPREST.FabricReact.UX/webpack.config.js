var path = require('path');

module.exports = {
    // Target the output of the typescript compiler
    context: path.join(__dirname, "build"),

    // File(s) to target in the 'build' directory
    entry: './index.js',

    // Output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Module to define what libraries with the compiler
    module: {
        // Rules
        rules: [
            {
                // Target the .js files
                test: /\.js$/,
                // Exclude the node modules folder
                exclude: /node_modules/,
                // Define the compiler to use
                use: {
                    // Use the 'babel-loader' library
                    loader: "babel-loader",
                    // Options
                    options: {
                        // Use the 'babel-preset-es2015' library
                        presets: ["es2015"]
                    }
                }
            }
        ]
    }
};