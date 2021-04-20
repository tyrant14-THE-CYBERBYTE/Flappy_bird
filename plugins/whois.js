const Asena = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const dil = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');

const das = "Grup metada verisini çeker."

Asena.addCommand({ pattern: 'whois', fromMe: true, desc: das }, async (message, match) => { 

    if (message.jid.includes('-')) {
        var json = await message.client.groupMetadataMinimal(message.jid) 

        var code = await message.client.groupInviteCode(message.jid)

        var nwjson = await message.client.groupMetadata(message.jid) 

        const msg = `*Grup ID:* ${json.id} \n*Grup İsmi:* ${nwjson.subject} \n*Kurucu:* ${json.owner} \n*Grup Kodu:* ${code} \n*Grup Açıklaması:* \n\n${nwjson.desc}`

        var ppUrl = await message.client.getProfilePicture(message.jid) 

        const resim = await dil.get(ppUrl, {responseType: 'arraybuffer'})

        await message.sendMessage(
            Buffer.from(resim.data), 
            MessageType.image, 
            { caption: msg }
        );
    }
    else {
        var status = await message.client.getStatus(message.jid) 
        var usppUrl = await message.client.getProfilePicture(message.jid) 
        var usexists = await message.client.isOnWhatsApp(message.jid)
        const nwmsg = `*Kişi JID:* ${usexists.jid} \n*Kişi Durumu:* ${status.status}`
        const resimnw = await dil.get(usppUrl, {responseType: 'arraybuffer'})
        await message.sendMessage(
            Buffer.from(resimnw.data), 
            MessageType.image, 
            { caption: nwmsg }
        );
    }
});
const lhs = "Yanıtlanan mesaji loga kaydeder!"
const rep = "*Lütfen Herhangi Bir Mesajı Yanıtlayın!*"
const lgg = "```===== [LOGGED MESSAGE] =====```\n\n"
const ks = "Numaralı Kişiden\n"
const msh = "*Mesaj:* \n\n"
Asena.addCommand({ pattern: 'log', fromMe: true, desc: lhs}, (async (message, match) => { 

    if (!message.reply_message) {
        return await message.client.sendMessage(
            message.jid,
            rep,
            MessageType.text
        );
    }
    else if (message.reply_message.text) {
        await message.client.sendMessage(
            message.client.user.jid,
            lgg + 'wa.me' + message.reply_message.jid.split('@')[0] + ' ' + ks + msh + message.reply_message.text,
            MessageType.text
        );
    }
    else if (message.reply_message.image) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
        .save('log.jpg')
        .on('end', async () => {
            await message.client.sendMessage(
                message.client.user.jid,
                fs.readFileSync('log.jpg'),
                MessageType.image,
                { caption: lgg + 'wa.me' + message.reply_message.jid.split('@')[0] + ' ' + ks }
            );
        });
    }
    else if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
        .save('log.mp4')
        .on('end', async () => {
            await message.client.sendMessage(
                message.client.user.jid,
                fs.readFileSync('log.mp4'),
                MessageType.video,
                { mimetype: Mimetype.mpeg, caption: lgg + 'wa.me' + message.reply_message.jid.split('@')[0] + ' ' + ks }
            );
        });
    }
    else if (message.reply_message.audio) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
        .save('log.mp3')
        .on('end', async () => {
            await message.client.sendMessage(
                message.client.user.jid,
                fs.readFileSync('log.mp3'),
                MessageType.audio,
                { mimetype: Mimetype.mp4Audio, caption: lgg + 'wa.me/' + message.reply_message.jid.split('@')[0] + ' ' + ks }
            );
        });
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
        .save('log.webp')
        .on('end', async () => {
            await message.client.sendMessage(
                message.client.user.jid,
                fs.readFileSync('log.webp'),
                MessageType.sticker
            );
            await message.client.sendMessage(
                message.client.user.jid,
                lgg + 'wa.me/' + message.reply_message.jid.split('@')[0] + ' ' + ks,
                MessageType.text
            );
        });
    }
}));
