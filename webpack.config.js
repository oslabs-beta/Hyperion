const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const { env } = require('process');

module.exports = {
  mode: env.NODE_ENV,
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'index.html'),
    }),
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.tsx', '.ts'],
  },
  devServer: {
    historyApiFallback: true, 
    static: {
      publicPath: path.join(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
