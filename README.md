```
                             ███   ███     ██████   ███               █████
                            ░░░   ░░░     ███░░███ ░░░               ░░███
  ██████    █████   ██████  ████  ████   ░███ ░░░  ████   ██████   ███████
 ░░░░░███  ███░░   ███░░███░░███ ░░███  ███████   ░░███  ███░░███ ███░░███
  ███████ ░░█████ ░███ ░░░  ░███  ░███ ░░░███░     ░███ ░███████ ░███ ░███
 ███░░███  ░░░░███░███  ███ ░███  ░███   ░███      ░███ ░███░░░  ░███ ░███
░░████████ ██████ ░░██████  █████ █████  █████     █████░░██████ ░░████████
 ░░░░░░░░ ░░░░░░   ░░░░░░  ░░░░░ ░░░░░  ░░░░░     ░░░░░  ░░░░░░   ░░░░░░░░
```

# asciified

A simple ASCII Art API with a good-looking Web App.

[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/cybersecsi/RAUDI/blob/main/LICENSE)

## Web App

The web app is created using:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com)

And using the following packages:

- [figlet](https://www.npmjs.com/package/figlet)
- [dom-to-image](https://www.npmjs.com/package/dom-to-image)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [use-clipboard-copy](https://www.npmjs.com/package/use-clipboard-copy)

<p align="center">
  <img src="docs/asciified-webapp.png">
</p>

In the webapp the user can type something and see the **asciified** version in **every font**. The user can also easily copy the text and, if the text is too long, it gets converted into an image using _dom-to-image_. Anyway it is still copyable.

## REST API

### [GET] /api/v2/ascii

#### Parameters

- **text**: the text to asciifiy
- **font** (optional): the font

#### Returns

The asciified text.

### [GET] /api/v2/fonts

#### Parameters

None

#### Returns

The list of _available fonts_

## License

**asciified** is an open-source and free software released under the [GNU GPL v3](https://github.com/thelicato/asciified/blob/main/LICENSE).
