/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const fs = require('fs');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const ffmpeg = require('fluent-ffmpeg');
const Asena = require('../events');
const Language = require('../language');
const Lang = Language.getString('spammer');

let totalMaxSpamCount = 50


Asena.addCommand({ pattern: 'spam ?(.*)', fromMe: true, desc: Lang.SPAM_DESC }, (async (message, match) => {

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    }


    if (totalMaxSpamCount !== 0) {
        for (let index = 0; index < totalMaxSpamCount; index++) {
            await message.sendMessage(match[1])
        }
    }
    else if (message.reply_message.video === false && message.reply_message.image) return await message.sendMessage('```Need Media!```');

    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            if (totalMaxSpamCount !== 0) {
                for (let index = 0; index < totalMaxSpamCount; index++) {
                await message.client.sendMessage(message.jid,fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg})
            }
        }

    else if (message.reply_message.image === false && message.reply_message.video) return await message.sendMessage('```Need Media!```');

    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
    ffmpeg(location)
        .save('output.mp4')
        .on('end', async () => {
            if (totalMaxSpamCount !== 0) {
                for (let index = 0; index < totalMaxSpamCount; index++) {
                await message.client.sendMessage(message.jid,fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg})
            }
        }

    else {

        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.mp3')
            .on('end', async () => {
                if (totalMaxSpamCount !== 0) {
                    for (let index = 0; index < totalMaxSpamCount; index++) {
                    await message.client.sendMessage(message.jid,fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio})
                }
            }   
});

Asena.addCommand({ pattern: 'killspam', fromMe: true, desc: Lang.STOP_SPAMDESC }, (async (message, match) => {

    totalMaxSpamCount = 0
    await message.client.sendMessage(message.jid,Lang.STOP_SPAM, MessageType.text);

}));
