const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "src", "index.html"),
        chunks: ["index"]
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
        {
            test: /(?<!\.style).css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.style\.css$/,
            use: ['css-loader']
        },
          {
              test: /\.(png|svg|jpg|gif|mp4)$/,
              use: [
                  'file-loader',
              ]
          }
      ],
  },
  devServer: {
      contentBase: './dist',
  },
};