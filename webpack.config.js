// Node command to import 'path' module
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};

// style-loader:    Injects a <style> tag into the DOM  
// css-loader:      Teach webpack how to take a CSS file and turn it into a JavaScript representation
// sass-loader:     Works just like the babel-loader works for jsx. This module is going to convert scss/sass to regular
//                  css. It's using the node-sass module behind the scenes (just like babel-loader uses babel-core).
//historyApiFallback: Tell the devServer to always serve the index.html for any 404 (so we'll handle any route client-side)