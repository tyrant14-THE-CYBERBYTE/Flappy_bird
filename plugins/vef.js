/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');

const Language = require('../language');
const Lang = Language.getString('vef');

Asena.addCommand({pattern: 'vef ?(.*)', fromMe: true, desc: Lang.VEF}, (async (message, match) => {

    if (message.reply_message === false) return await message.sendMessage(Lang.VEF_NEED);

    if (match[1] == 'noluyo' && match[1] == 'noluyo lan' && match[1] == 'noluyo dayı') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5899986614486043330.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else {
        await message.client.sendMessage(
            message.jid, 
            'Bulunamadı',
            MessageType.text
        )
    }
}));
