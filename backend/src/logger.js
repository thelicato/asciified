const log = (msg, type) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(`[${type}] ${date} ${time} - ${msg}`);
}

const logger = {
    info: (msg) => log(msg, 'INFO'),
    warning: (msg) => log(msg, 'WARNING'),
    error: (msg) => log(msg, 'ERROR'),
};

module.exports = logger;