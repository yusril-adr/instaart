const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // File loader for font
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/fonts',
            },
          },
        ],
      },
      // File loader for images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve(__dirname, 'public/images', 'logo.png'),
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'InstaArt',
      short_name: 'InstaArt',
      description: 'Portfolio web app for designer.',
      start_url: '/',
      display: 'standalone',
      background_color: '#F8F9FA',
      theme_color: '#F8F9FA',
      inject: true,
      fingerprints: true,
      publicPath: '/',
      ios: true,
      icons: [
        {
          src: path.resolve('public', 'images', 'logo.png'),
          sizes: [192, 256, 384, 512],
          ios: true,
          purpose: 'any',
        },
        {
          src: path.resolve('public', 'images', 'maskable_logo.png'),
          sizes: [192, 256, 384, 512],
          ios: true,
          purpose: 'maskable',
        },
      ],
    }),
    // new InjectManifest({
    //   exclude: [/api/, /php/],
    //   swSrc: './src/scripts/service-worker.js',
    //   swDest: 'service-worker.js',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/images'),
          to: path.resolve(__dirname, 'dist/public/images'),
        },
        {
          from: path.resolve(__dirname, 'public/terms.html'),
          to: path.resolve(__dirname, 'dist/public/terms.html'),
        },
      ],
    }),
  ],
};
