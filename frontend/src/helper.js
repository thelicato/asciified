import figlet from 'figlet';

export const asyncFiglet = (text, options={font:'Standard'}) => {
    return new Promise((resolve, reject) => {
        figlet.text(text, options, (err, data) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(data);
            }
        })
    })
}