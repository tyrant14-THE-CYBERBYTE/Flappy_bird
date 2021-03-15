const Asena = require('../events');
const { MessageType, Mimetype} = require('@adiwajshing/baileys');

const TRd = "Ğ gönderir."

Asena.addCommand({ pattern: 'ğ ?(.*)', fromMe: true, desc: TRd }, async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────', MessageType.text);

    else {

        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────.replace(/─/gi, `${match[1]}`).replace(/█/gi, `${match[1]}`).replace(/░/gi, `${match[1]}`)');
    
    }
});
