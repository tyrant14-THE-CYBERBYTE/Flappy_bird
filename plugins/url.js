const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const adfly = require("adf.ly")("24069803","9321766b6eeb1d9fa239b8c755cf7c57"); // You will find your API key in adf.ly Tools section.

Asena.addCommand({pattern: 'short ?(.*)', fromMe: true}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'Link Gir!', MessageType.text);

    adfly.short(`${match[1]}`, (async(url){
        await message.client.sendMessage(message.jid, '*Kısa Link:*' + url, MessageType.text);
    }));
}));
