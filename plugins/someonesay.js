/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');

const Language = require('../language');
const Lang = Language.getString('ttp');

Asena.addCommand({ pattern: 'animesay ?(.*)', fromMe: true, desc: Lang.ANIME_DESC }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.NEED_WORD);

    var ttinullimage = await axios.get(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${match[1].replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&raw=1`, { responseType: 'arraybuffer' })

    var location = await message.client.downloadAndSaveMediaMessage(Buffer.from(ttinullimage.data), MessageType.image, { mimetype: Mimetype.png })

    ffmpeg(location)
        .save('output.webp')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.webp'), MessageType.sticker);
        });
}));
