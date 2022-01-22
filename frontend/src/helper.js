import figlet from 'figlet';
import domtoimage from 'dom-to-image';

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

export const makeImage = async (node, maxWidth) => {
    if (node === null || (node !== null && node.offsetWidth < maxWidth)) {
        return null;
    }

    try {
        const config = {
            width: node.offsetWidth,
            height: node.offsetHeight
        };
        const png = await domtoimage.toPng(node, config);
        return png;
    }
    catch (e) {
        console.error(e)
        return null;
    }


}