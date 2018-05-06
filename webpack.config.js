// Node command to import 'path' module
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  



module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
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
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true         // Enable source maps for CSS
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true         // Enable source maps for SCSS
                            }
                        }
                    ]
                }) 
            }, {
                test: /\.(?:png|jpg|svg)$/,
                loader: 'url-loader',
                query: {
                    // Inline images smaller than 10kb as data URIs
                    limit: 10000
                }
            }]
        },
        plugins: [
            CSSExtract  // Extract css to its own file
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};

// style-loader:    Injects a <style> tag into the DOM  
// css-loader:      Teach webpack how to take a CSS file and turn it into a JavaScript representation
// sass-loader:     Works just like the babel-loader works for jsx. This module is going to convert scss/sass to regular
//                  css. It's using the node-sass module behind the scenes (just like babel-loader uses babel-core).
//historyApiFallback: Tell the devServer to always serve the index.html for any 404 (so we'll handle any route client-side)
// url-loader: uploads local images to the server allowing you to use those in the application