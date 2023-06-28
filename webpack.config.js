const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

function currentApproachConfig(locale) {
  return {
    entry: "./src/current-approach/index.jsx",
    output: {
      filename: `[name].${locale}.js`,
      chunkFilename: `[name].${locale}.js`,
      publicPath: `/current-approach/${locale}/`,
      path: path.resolve(__dirname, 'dist', 'current-approach', locale),
    },
    resolve: { 
      alias: {
        '__translations': `./translations/${locale}.json`,
      },
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        'PATH_BASENAME': JSON.stringify('/current-approach'),
      }),
      new HtmlWebpackPlugin({
        templateContent: `
          <html>
            <head>
              <meta name="google" value="notranslate" />
              <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@11.2.2/build/esm/styles.css" />
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `
      }),
    ],
  };
}

function idealApproachConfig() {
  return {
    entry: "./src/ideal-approach/index.jsx",
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`,
      publicPath: `/ideal-approach/`,
      path: path.resolve(__dirname, 'dist', 'ideal-approach'),
    },
    resolve: { extensions: [".js", ".jsx"] },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        'PATH_BASENAME': JSON.stringify('/ideal-approach'),
      }),
      new HtmlWebpackPlugin({
        templateContent: `
          <html>
            <head>
              <meta name="google" value="notranslate" />
              <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@11.2.2/build/esm/styles.css" />
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
        `
      }),
    ],
  };
}

module.exports = [
 currentApproachConfig('en'),
 currentApproachConfig('fr'),
 idealApproachConfig(),
];