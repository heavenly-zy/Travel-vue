const path = require('path')
const mockdata = require('./mock/index.json');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
      .set('imgs', resolve('src/assets/imgs'))
  },
  devServer: {
    port: 8080,
    before(app) {
      app.get('/api/index.json', (req, res, next) => {
        res.json(mockdata);
      })
    }
  }
}
