// Koa
import Koa from 'koa';
import koaServe from 'koa-static';
import koaMount from 'koa-mount';
import koaQs from 'koa-qs';
import path from 'path';
// API
import { api } from '@/api';
// Logger
import { logger } from '@/logger';

const app = new Koa();
koaQs(app, 'first');

// ENV VARS   *
const PORT = process.env.PORT || 4200;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DEFAULT_HOSTNAME = 'asciified.thelicato.io';

const startBackend = async () => {
  logger.info(`Starting up API routes on port ${PORT}...`);

  // API
  app.use(api.routes()).use(api.allowedMethods());

  // React Frontend
  if (NODE_ENV === 'production') {
    const CLIENT_BUILD_PATH = path.join(__dirname, '../../frontend/build');
    // Static files
    app.use(async (ctx, next) => {
      if (ctx.hostname !== DEFAULT_HOSTNAME) {
        ctx.status = 301;
        ctx.redirect(`https://${DEFAULT_HOSTNAME}${ctx.url}`);
      } else {
        await next();
      }
    });
    app.use(koaMount('/', koaServe(CLIENT_BUILD_PATH)));
  }

  app.listen(PORT);
};

startBackend();
