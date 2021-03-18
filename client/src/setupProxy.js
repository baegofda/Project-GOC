const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://projectgoc.herokuapp.com",
      changeOrigin: true,
    })
  );
};
