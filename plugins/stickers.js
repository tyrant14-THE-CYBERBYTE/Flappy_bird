/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

const Language = require('../language');
const Lang = Language.getString('sticker');

Asena.addCommand({pattern: 'sticker', fromMe: true, desc: Lang.STICKER_DESC}, (async (message, match) => {    

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
            .outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-an", "-vsync 0"])
            .aspect('1:1')
            .autopad('black')
            .save('stickerphoto.webp')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('stickerphoto.webp'), MessageType.sticker);
        });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }

    ffmpeg(location)
        .outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0"])
        .aspect('1:1')
        .autopad('black')
        .save('sticker.webp')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker);
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));
const li = "Renklendirilecek YouTube Linki Girin!"
const lip = "Videoları Renklendirir."

Asena.addCommand({pattern: 'colorvideo', fromMe: true, desc: lip}, (async (message, match) => {    

    if (match[1] == '') return await message.client.sendMessage(message.jid,li , MessageType.text);

    execFile('git clone https://github.com/jantic/DeOldify.git DeOldify')

    execFile('cd DeOldify')

    execFile('import fastai')

    execFile('from deoldify.visualize import *')

    execFile('torch.backends.cudnn.benchmark=True')

    execFile('from pathlib import Path')

    execFile('torch.backends.cudnn.benchmark=True')

    execFile('import warnings')

    execFile('warnings.filterwarnings("ignore", category=UserWarning, message=".*?Your .*? set is empty.*?")')

    execFile("mkdir 'models'")

    execFile('wget https://data.deepai.org/deoldify/ColorizeVideo_gen.pth -O ./models/ColorizeVideo_gen.pth')

    execFile('apt install ffmpeg')

    execFile('colorizer = get_video_colorizer()')

    execFile('source_url = ' + "'" + match[1] + "'" + '#@param {type:"string"}')

    execFile('render_factor = 20  #@param {type: "slider", min: 5, max: 40}')

    execFile('watermarked = False #@param {type:"boolean"}')

    execFile("video_path = colorizer.colorize_from_url(source_url, 'video.mp4', render_factor, watermarked=watermarked)")

    await message.sendMessage(fs.readFileSync('/DeOldify/result/video.mp4'), MessageType.video);
}));
 
