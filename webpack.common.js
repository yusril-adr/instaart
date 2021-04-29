const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 90000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
    new InjectManifest({
      exclude: [/api/, /php/],
      swSrc: './src/scripts/service-worker.js',
      swDest: 'service-worker.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/images'),
          to: path.resolve(__dirname, 'dist/public/images'),
        },
        {
          from: path.resolve(__dirname, 'api'),
          to: path.resolve(__dirname, 'dist/api'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
