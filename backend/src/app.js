// Koa
const Koa = require('koa');
const app = new Koa();
require('koa-qs')(app, 'first');
// API
const api = require('./api');
// Logger
const logger = require('./logger');

const startBackend = async () => {
    logger.info("Starting up API routes...");
    app.use(api.routes()).use(api.allowedMethods());
    app.listen(3000);
}

startBackend();