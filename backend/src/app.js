// Koa
const Koa = require('koa');
const app = new Koa();
require('koa-qs')(app, 'first');
// API
const api = require('./api');
// Logger
const logger = require('./logger');
// ENV VARS   *
const PORT = process.env.PORT || 4200;

const startBackend = async () => {
    logger.info(`Starting up API routes on port ${PORT}...`);
    app.use(api.routes()).use(api.allowedMethods());
    app.listen(PORT);
}

startBackend();