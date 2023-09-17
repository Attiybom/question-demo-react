const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }

}
