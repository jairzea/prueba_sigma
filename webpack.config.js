const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader',
                ],
              },
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  'file-loader',
                ],
              }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}