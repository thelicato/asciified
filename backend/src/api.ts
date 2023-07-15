// Figlet
import figlet from 'figlet';
// Koa Router
import KoaRouter from '@koa/router';
// Logger
import { logger } from '@/logger';

const fonts = figlet.fontsSync().map((v: figlet.Fonts) => v.toString());

export const api = new KoaRouter({
  prefix: '/api',
});

//GET request
api.get('/', async (ctx) => {
  logger.info(`Received request: ${ctx.URL}`);

  // If query.text is missing return
  if (!ctx.query.text) {
    ctx.response.status = 200;
    return;
  }

  // Otherwise get a asciified text
  try {
    const queryFont = ctx.query.font as string;
    const queryText = ctx.query.text as string;
    const figletFont = ctx.query.font && fonts.includes(queryFont) ? queryFont : 'Standard';
    const figletTxt = await figlet.textSync(queryText, {
      font: figletFont as figlet.Fonts,
      horizontalLayout: 'default',
      width: 420,
      whitespaceBreak: true,
    });
    ctx.response.status = 200;
    ctx.response.body = figletTxt;
  } catch (e) {
    logger.error('An error occurred in /api');
    logger.error(e);
  }
});

//GET list of fonts
api.get('/fonts', async (ctx) => {
  logger.info(`Received request: ${ctx.URL}`);

  ctx.response.status = 200;
  ctx.response.body = JSON.stringify(fonts);
});
