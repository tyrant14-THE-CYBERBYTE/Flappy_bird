const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const solenolyrics= require("solenolyrics"); 
 
const TinyURL = require('tinyurl');

const De = "Uzun linkleri kısaltır."

Asena.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: De}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Link Girmelisin!```', MessageType.text);

    TinyURL.shorten(`${match[1]}`, async(res, err) => {
      if (err)
        await message.client.sendMessage(message.jid, '*#### Hata! ####*\n' + err, MessageType.text);

        await message.client.sendMessage(message.jid, `*Orjinal Link:* ${match[1]}\n*Kısa Link:* ` + res, MessageType.text)
    });
}));

const def = "```Şarkı İsmi Gir!```"
const del = "Şarkı sözlerini bulur."

Asena.addCommand({pattern: 'lyric ?(.*)', fromMe: true, desc: del}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,def, MessageType.text);

    var aut = await solenolyrics.requestLyricsFor(`${match[1]}`); 
    var son = await solenolyrics.requestAuthorFor(`${match[1]}`);

    await message.client.sendMessage(message.jid, `*İşte ${match[1]} Adlı Şarkı İçin Şarkı Sözleri:*\n*Şarkı Sahibi: ` + son + '\n\n' + aut, MessageType.text);

}));
