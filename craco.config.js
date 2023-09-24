const path = require('path')

module.exports = {
  devServer: {
    port: 8000, //b端用8000，c端用3000
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  webpack: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
};
