// Koa
const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static')
require('koa-qs')(app, 'first');
// API
const api = require('./api');
// Logger
const logger = require('./logger');
// ENV VARS   *
const PORT = process.env.PORT || 4200;
const NODE_ENV = prove.env.NODE_ENV || 'development';

const startBackend = async () => {
    logger.info(`Starting up API routes on port ${PORT}...`);
    
    // API
    app.use(api.routes()).use(api.allowedMethods());

    // React Frontend
    if (NODE_ENV === "production"){
        const CLIENT_BUILD_PATH = path.join(__dirname, "../../frontend/build")
        // Static files
        app.use(mount('/',serve(CLIENT_BUILD_PATH)))
    }

    app.listen(PORT);
}

startBackend();