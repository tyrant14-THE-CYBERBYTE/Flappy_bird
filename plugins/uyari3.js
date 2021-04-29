const Asena = require('../events');
const{MessageType} = require('@adiwajshing/baileys')

const tor = "Kullanıcıya Uyarı gönderir."
const rep = "*Lütfen Son Uyarıyı Vereceğim Kullanıcının Mesajına Yanıt Verin!*"
const rap = "=== ```3.Uyarı ve Ban Sebebi``` ===\n\n"
Asena.addCommand({pattern: 'uyari3 ?(.*)', fromMe: true, deleteCommand: false, desc: tor}, (async (message, match) => {
    if (match[1] == '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
    }
    else if (match[1] !== '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Sebep:* ${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (!message.reply_message) {
        return message.client.sendMessage(message.jid,rep, MessageType.text);
    }
}));
