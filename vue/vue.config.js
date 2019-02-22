const path = require('path');

const resolve = dir => path.join(__dirname, dir);
// 可选的配置文件
module.exports = {
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      config.devtool = 'cheap-module-eval-source-map';
    }
    // common config
    config.resolve.alias
      .set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
    // preload
    config.resolve.symlinks(true);
    config.plugin('preload').tap((options) => {
      options[0] = {
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.(woff||ttf)$/.test(entry)) return 'font';
          if (/\.png$/.test(entry)) return 'image';
          return 'script';
        },
        include: 'allAssets',
        fileBlacklist: [/\.map$/, /hot-update\.js$/],
      };
      return options;
    });
    return config;
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
};
