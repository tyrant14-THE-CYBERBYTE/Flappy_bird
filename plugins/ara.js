const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const scraper = require('google-search-scraper');
 


Asena.addCommand({pattern: 'ara ?(.*)', fromMe: true}, (async (message, match) => {
    
    if (match[1] === '') return await message.client.sendMessage(message.jid, 'Kelime Gir', MessageType.text);
    
    
    var options = { query: `${match[1]}`, limit: 10 }
 
    scraper.search(options, async (err, url, meta) {
        // This is called for each result
        if(err) throw err;
        await message.client.sendMessage(message.jid, url + '\n\n' + meta.title + '\n\n' + meta.meta, MessageType.text);
    });
}));
