const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, devServer: {
    // allowedHosts:['.xxxx.com','.xxx.com'],  或者是all
    allowedHosts: 'all',
  }
})
