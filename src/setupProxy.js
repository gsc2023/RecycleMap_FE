const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://49.50.174.35:4000',
      changeOrigin: true,
    })
  );
};