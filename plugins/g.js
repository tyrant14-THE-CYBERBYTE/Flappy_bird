const Asena = require('../events');
const { MessageType, Mimetype} = require('@adiwajshing/baileys');

const TRd = "Ğ gönderir."

Asena.addCommand({ pattern: 'ğ ?(.*)', fromMe: true, desc: TRd }, async (message, match) => {

    const gsay = match[1]

    if (match[1] === '') return await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────', MessageType.text);

    else {

        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────.replace(/─/g, gsay).replace(/█/g, gsay).replace(/░/g, gsay)' + '\n\nĞ');
    
    }
});
