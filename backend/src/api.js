// Figlet
const util = require('util');
const f = require('figlet');
const figlet = util.promisify(f.text);
const fonts = f.fontsSync();
// Koa Router
const Router = require("@koa/router");
// Logger
const logger = require('./logger');

const router = new Router({
    prefix: '/api',
});

//GET request
router.get('/', async (ctx) => {
    logger.info(`Received request: ${ctx.URL}`);

    // If query.text is missing return
    if (!ctx.query.text) {
        ctx.response.status = 200;
        return;
    }

    // Otherwise get a asciified text
    try {
        const figletFont = ctx.query.font && fonts.includes(ctx.query.font) ? ctx.query.font : 'Standard';
        const figletTxt = await figlet(ctx.query.text, {
            font: figletFont,
            horizontalLayout: 'default',
            width: 420,
            whitespaceBreak: true,
        })
        ctx.response.status = 200;
        ctx.response.body = figletTxt;
    }
    catch (e) {
        logger.error("An error occurred in /api");
        logger.error(e);
    }
})

module.exports = router;