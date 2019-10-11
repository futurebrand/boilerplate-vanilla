const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const pages = [ 'index' ];

const arrPagesHtml = pages.map(n => {
  return new HtmlWebpackPlugin({
    template: `src/htmls/${n}.njk`,
    filename: `${n}.html`
  });
});

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/javascripts/app.js'),
    path.resolve(__dirname, '../src/styles/style.scss')
  ],
  output: {
    filename: 'app_bundle.js',
    path: path.resolve(__dirname, '../build/')
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../src/'),
    watchContentBase: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, '../postcss.config.js')
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(njk|nunjucks)$/,
        use: [
          'html-withimg-loader',
          {
            loader: 'nunjucks-webpack-loader',
            options: {
              alias: {
                layouts: path.resolve(__dirname, '../src/htmls/layouts'),
                components: path.resolve(__dirname, '../src/htmls/components')
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|otf|ttf|eot|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer:
      process.env.NODE_ENV === 'production'
        ? [ new OptimizeCSSAssetsPlugin({}) ]
        : []
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      config: JSON.stringify(require(`./${process.env.NODE_ENV}.json`))
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new LiveReloadPlugin()
  ].concat(arrPagesHtml)
};
