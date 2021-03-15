const Asena = require('../events')
const { MessageType, Mimetype} = require('@adiwajshing/baileys')
const bok = "Ğ gönderir."


Asena.addCommand({ pattern: 'g ?(.*)', fromMe: true, desc: bok }, async (message, match) => {

    if (match[1] === '') {
        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────', MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────'.replace(/─/g, "${match[1]}")', MessageType.text);
    }
}));
