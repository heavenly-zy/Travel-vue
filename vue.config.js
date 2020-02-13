const path = require('path')
const mockdata1 = require('./mock/home.json');
const mockdata2 = require('./mock/city.json');
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
      app.get('/api/home.json', (req, res, next) => {
        res.json(mockdata1);
      })
      app.get('/api/city.json', (req, res, next) => {
        res.json(mockdata2);
      })
    }
  }
}
