const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const TinyURL = require('tinyurl');
 
Asena.addCommand({pattern: 'short ?(.*)', fromMe: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'Link Gir!', MessageType.text);

    TinyURL.shorten(`${match[1]}`, async(res, err) => {
      if (err)
        await message.client.sendMessage(message.jid, '*#### Hata! ####*\n' + err, MessageType.text);

        await message.client.sendMessage(message.jid, `*Kısa Link:* ${match[1]}\n*Kısa Link:* ` + res, MessageType.text)
    });
}));
