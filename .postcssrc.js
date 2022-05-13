module.exports = {

  plugins: {
    // vue_cli 已经配置autoprefixer插件 需要注释掉
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },


    'postcss-pxtorem': {
      //根元素的值 lib-flexable 的 REM 适配方案，则应该设置为你的设计稿的十分之一。例如设计稿是 750 宽，则应该设置为 75。
      //- 如果是 Vant 的样式，就把 `rootValue` 设置为 37.5 来转换
      // - 如果是我们的样式，就按照 75 的 `rootValue` 来转换
      rootValue({
        file
      }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      //配置要转换的css属性
      propList: ['*']
    }
  }
}
