const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/poppy' : '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  },
  chainWebpack: (config) => {
    config.resolve.extensions.add('*.vue').end()
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@c', resolve('src/components'))
      .set('@cc', resolve('src/components/common'))
      .set('@icon', resolve('src/assets/icon'))
      .set('@img', resolve('src/assets/img'))
      .set('@theme', resolve('src/assets/theme'))
      .set('@style', resolve('src/assets/style'))
      .set('@libs', resolve('src/libs'))
      .set('@p_m', resolve('src/pages/modules'))
      .set('@p', resolve('src/pages'))
      .set('@api', resolve('src/api'))
      .set('@config', resolve('src/config'))
      .set('@mixins', resolve('src/mixins'))
      .end()
    // 添加 iview-loader
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: false
      })
      .end()
    // 添加打包分块，优化分包大小提高 浏览器加载性能
    config.optimization
      .splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          viewUI: {
            name: 'chunk-viewUI', // split view-UI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?view-design(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // open: true,
    open: false,
    // host: 'localhost',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //   target:  `http://localhost:${port}/mock`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
      '/jwt': {
        // target: 'http://10.0.0.16:8765/',
        // target: 'http://192.168.20.12:8765',
        // target: 'http://10.138.6.106:8765',
        target: 'http://10.138.6.106:8765',
        // target: 'http://192.168.20.3:8765',
        pathRewrite: {
          '^/jwt': '/jwt/'
        }
      }
      // '/api': {
      //   // target: 'http://10.0.0.16:8765/',
      //   // target: 'http://10.138.6.106:8765/',
      //   target: 'http://10.138.6.106/',
      //   pathRewrite: {
      //     '^/api': '/api/ '
      //   }
      // }
    }
    // after: require('./mock/mock-server.js')
  }
}
