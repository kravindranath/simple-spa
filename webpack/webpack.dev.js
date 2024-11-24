const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
require("dotenv-defaults").config({
  path: path.resolve(__dirname, "../.env"),
  defaults: path.resolve(__dirname, "./.env.defaults"),
});

const env = process.env.APP_ENV || "local"; // Fallback to 'local' if APP_ENV is not set

const apiTargets = {
  dev: process.env.DEV_API_URL,
  local: process.env.LOCAL_API_URL,
  prod: process.env.PROD_API_URL,
};

const proxyTarget = apiTargets[env];

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"], // Matches the route you want to proxy
        target: proxyTarget, // Dynamic target based on APP_ENV in .env
        changeOrigin: true, // Change the origin if needed
        secure: false, // Set to true if using HTTPS and you trust the server
      },
    ],
  },
  devtool: "inline-source-map",
});
