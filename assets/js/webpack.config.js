const path = require('path');

module.exports = {
    entry: './index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../../public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
}