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

    if (match[1] === "") return await message.sendMessage(Lang.VEF_NEED);

    if (match[1] === 'noluyo' || match[1] === 'noluyo lan' || match[1] === 'noluyo dayı') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5899986614486043330.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else if (match[1] === 'yavas' || match[1] === 'yavaş' || match[1] === 'yavas git') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5900017439466326353.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else if (match[1] === 'yasam' || match[1] === 'yasam masam' || match[1] === 'yaşam') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5888542571046635589.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else if (match[1] === 'hadsiz' || match[1] === 'hadsız' || match[1] === 'degerli zaman' || match[1] === 'degerli zamanimi') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5888542571046635588.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else if (match[1] === 'onun bunun' || match[1] === 'bende türküm' || match[1] === 'bende turkum' || match[1] === 'lan onun bunun') {

        await message.client.sendMessage(
            message.jid, 
            fs.readFileSync("/root/WhatsAsenaDuplicated/media/ses/4_5888542571046635579.mp3"),
            MessageType.audio, 
           { mimetype: Mimetype.mp4Audio, ptt: true}
        )
    }
    else {
        await message.client.sendMessage(
            message.jid, 
            '```Bulunamadı! Varolan Liste:```\n\n$onun bunun / bende türküm\n$hadsiz / hadsız\n$yasam / yasam masam\n$yavas / yavas git\n$noluyo / noluyo lan',
            MessageType.text
        )
    }
}));
