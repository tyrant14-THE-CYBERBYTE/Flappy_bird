const Asena = require('../events')
const { MessageType, Mimetype} = require('@adiwajshing/baileys')
const desc = "Ğ gönderir."


Asena.addCommand({ pattern: 'ğ ?(.*)', fromMe: true, desc: desc }, async (message, match) => {

    const gsay = match[1]

    if (gsay === '') {
        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────', MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid, '────────────────\n─██████████████─\n─██░░░░░░░░░░██─\n─██░░██████████─\n─██░░██─────────\n─██░░██─────────\n─██░░██──██████─\n─██░░██──██░░██─\n─██░░██──██░░██─\n─██░░██████░░██─\n─██░░░░░░░░░░██─\n─██████████████─\n────────────────.replace(/─/g, "${gsay}")', MessageType.text);

    }
})); 
      
