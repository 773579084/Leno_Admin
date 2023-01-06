// webpack.dev.js
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式，不会压缩最终代码
  devServer: {
    host: 'localhost',
    port: 9090, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升速度
    historyApiFallback: true,// 支持 history 路由重定向到 index.html 文件
    // 跨域配置
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:4523/m1/1279603-0-default',
    //     changeOrigin: true, // 是否开启跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    open: true, // 打开默认浏览器
    hot: true,
    static: { //托管静态资源文件
      directory: path.join(__dirname, "../public"),
    }
  },
  // 配置css模块化开发环境下
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 默认正则：/\.module\.\w+$/i.test(filename) or /\.icss\.\w+$/i.test(filename)
                auto: true,
                // 自定义输出 css 类名 =》 hash 名称
                localIdentName: '[path][name]__[local]'
              }
            }
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin(),
    // mock
  ]
})
