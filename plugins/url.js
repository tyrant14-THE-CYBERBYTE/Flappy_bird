const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const TinyURL = require('tinyurl');
 
Asena.addCommand({pattern: 'short ?(.*)', fromMe: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'Link Gir!', MessageType.text);

    TinyURL.shorten(`${match[1]}`).then(async(res) {
        await message.client.sendMessage(message.jid, res, MessageType.text);
    }, function(err) {
        await message.client.sendMessage(message.jid, err, MessageType.text);
    });
}));
