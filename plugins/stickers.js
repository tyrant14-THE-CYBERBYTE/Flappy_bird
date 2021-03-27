const Asena = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

const Language = require('../language');
const Lang = Language.getString('sticker');

Asena.addCommand({pattern: 'sticker$', fromMe: true, desc: Lang.STICKER_DESC}, (async (message, match) => {    

    if (message.reply_message === false) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
    var downloading = await message.client.sendMessage(message.jid,Lang.DOWNLOADING,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    if (message.reply_message.video === false && message.reply_message.image) {
        ffmpeg(location)
            .outputOptions(["-y", "-vcodec libwebp"])
            .videoFilters('scale=1000:1000:force_original_aspect_ratio=decrease,pad=1000:1000:-1:-1:color=cyan')
            .videoFilters('chromakey=cyan')
            .save('st.webp')
            .on('end', async () => {
            await message.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker);
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }

    ffmpeg(location)
        .outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 512x512"])
        .videoFilters('scale=1000:1000:force_original_aspect_ratio=decrease,pad=1000:1000:-1:-1:color=cyan')
        .videoFilters('chromakey=cyan')
        .save('sticker.webp')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker);
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));

