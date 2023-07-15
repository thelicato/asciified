const log = (msg: string, type: string) => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(`[${type}] ${date} ${time} - ${msg}`);
};

export const logger = {
  info: (msg: string) => log(msg, 'INFO'),
  warning: (msg: string) => log(msg, 'WARNING'),
  error: (msg: string) => log(msg, 'ERROR'),
};
