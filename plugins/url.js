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
    var cov = await solenolyrics.requestIconFor(`${match[1]}`);
    var tit = await solenolyrics.requestTitleFor(`${match[1]}`);

    var buffer = await axios.get(cov, {responseType: 'arraybuffer'});

    await message.client.sendMessage(message.jid, Buffer.from(buffer.data),  MessageType.image, {caption: '*Aratılan Şarkı:*' + '```' + `${match[1]}` + '```\n*Bulunan Şarkı:* ' + tit + '\n*Şarkı Sahibi:* ' + son + '\n*Şarkı Sözleri:*\n\n' + aut });

}));
