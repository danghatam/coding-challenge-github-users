const url = require('url');
const proxy = require('express-http-proxy');

module.exports = function(app) {
  const proxyHost = process.env.PROXY_HOST || 'https://api.github.com/users/';
  app.use('/api/*', proxy(proxyHost, {
    proxyReqPathResolver: (req, res) => {
      // remove `api` from url
      const path = url.parse(req.originalUrl).path.slice(4, url.parse(req.originalUrl).path.length);
      console.log("forwardpath: " + path);
      return path;
    },
    proxyReqOptDecorator: (reqOpt, req) => {
      reqOpt.headers['Content-Type'] = 'application/json';
      reqOpt.headers['Accept'] = 'application/json';
      return reqOpt;
    }
  }));
};
