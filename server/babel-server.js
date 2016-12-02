var path = require('path');
var express  = require('express');
var webpack = require( 'webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '/../src/static/bundle.js'));
//app.use(webpackMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(3030);
