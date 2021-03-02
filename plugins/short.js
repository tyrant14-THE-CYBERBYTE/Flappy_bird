const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

Asena.addCommand({pattern: 'url', fromMe: true}, (async (message, match) => {
    if (match[1] == '') return await message.client.sendMessage(message.jid, 'URL Gerekli!', MessageType.text);

    shortenUrl(`${match[1]}`).then((result) => {
        await message.client.sendMessage(message.jid, `*Uzun Link:* ${match[1]} \n*Kısa Link:*` + result); // https://tinyurl.com/<slug>
    });
}));
