module.exports = {
  generate: {
    app: 'noemit',
  },
  // app 配置，同 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window
  app: {
    navigationBarTitleText: 'vision-miniprogram',
  },
  // 全局配置
  global: {},
  // 页面配置，可以为单个页面做个性化处理，覆盖全局配置
  pages: {},
  // 优化
  optimization: {
    domSubTreeLevel: 10, // 将多少层级的 dom 子树作为一个自定义组件渲染，支持 1 - 10，默认值为 10

    // 对象复用，当页面被关闭时会回收对象，但是如果有地方保留有对象引用的话，注意要关闭此项，否则可能出问题
    elementMultiplexing: true, // element 节点复用
    textMultiplexing: true, // 文本节点复用
    commentMultiplexing: true, // 注释节点复用
    domExtendMultiplexing: true, // 节点相关对象复用，如 style、classList 对象等

    styleValueReduce: 5000, // 如果设置 style 属性时存在某个属性的值超过一定值，则进行删减
    attrValueReduce: 5000, // 如果设置 dom 属性时存在某个属性的值超过一定值，则进行删减
  },
  // 项目配置，会被合并到 project.config.json
  projectConfig: {
  },
  // 包配置，会被合并到 package.json
  packageConfig: {
    author: 'vision',
    dependencies: {
    }
  },
}
