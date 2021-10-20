module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
}
