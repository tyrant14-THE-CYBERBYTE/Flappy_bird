const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const scraper = require('google-search-scraper');
const TinyURL = require('tinyurl');

const De = "Uzun linkleri kısaltır."
const Sr = "Googlede arama yapar."

Asena.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: De}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Link Girmelisin!```', MessageType.text);

    TinyURL.shorten(`${match[1]}`, async(res, err) => {
      if (err)
        await message.client.sendMessage(message.jid, '*#### Hata! ####*\n' + err, MessageType.text);

        await message.client.sendMessage(message.jid, `*Orjinal Link:* ${match[1]}\n*Kısa Link:* ` + res, MessageType.text)
    });
}));

Asena.addCommand({pattern: 'search ?(.*)', fromMe: true, desc: Sr}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```Aranacak Kelime Girmelisin!```', MessageType.text);


    var options = {
      query: `{$match[1]}`,
      limit: 10
    };
 
    scraper.search(options, async(err, url, meta) => {
      // This is called for each result
      if(err) throw err;
      await message.client.sendMessage(message.jid, `*${match[1]} İçin Arama Sonuçları:*\n\n` + url, MessageType.text);
    });
}));
