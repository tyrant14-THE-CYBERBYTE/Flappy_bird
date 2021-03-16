const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Sea = require('search-engine-client');
const TinyURL = require('tinyurl');
const {getLyrics, getSong} = require ('genius-lyrics-api');
const key = "nQKziyUfA84InGMTgFf12_LtuCEgwwg1FoBdCz5rJR9-ue5tBfAGOv2LCpnesWgQ"

const De = "Uzun linkleri kısaltır."
const Sr = "Googlede arama yapar."
const ly = "Şarkı hakkında bilgi verir."

Asena.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: De}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Link Girmelisin!```', MessageType.text);

    TinyURL.shorten(`${match[1]}`, async(res, err) => {
      if (err)
        await message.client.sendMessage(message.jid, '*#### Hata! ####*\n' + err, MessageType.text);

        await message.client.sendMessage(message.jid, `*Orjinal Link:* ${match[1]}\n*Kısa Link:* ` + res, MessageType.text)
    });
}));

Asena.addCommand({pattern: 'lyric ?(.*)', fromMe: true, desc: ly}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Sarkı İsmi Girmelisin!```', MessageType.text);

    const options = {
	    apiKey: key,
	    title: `${match[1]}`,
	    optimizeQuery: true
    };

    getSong(options).then(async(song) => {
        await message.client.sendMessage(message.jid, {url: `${song.albumArt}`} , MessageType.image, {caption: `*Şarkı ID:* ${song.id} \n*Şarkı Linki:* ${song.url} \n*Sözleri:*\n\n${song.lyrics}`});

    });
}));

Asena.addCommand({pattern: 'search ?(.*)', fromMe: true, desc: Sr}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Aranacak Kelime Girmelisin!```', MessageType.text);
 
    Sea.google(`${match[1]}`).then(async(result) => {
        await message.client.sendMessage(message.jid,result, MessageType.text);
    });
}));
