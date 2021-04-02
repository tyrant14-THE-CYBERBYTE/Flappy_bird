/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

const Language = require('../language');
const Lang = Language.getString('webss');

Asena.addCommand({pattern: 'ss ?(.*)', fromMe: true, desc: Lang.SS_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.LİNK);

    var webimage = await axios.get(`https://screenshotapi.net/api/v1/screenshot?url=${match[1]}&output=image&full_page=true`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made for Founder'})

}));

const sh = "Yapay zeka ile daha önce olmayan insan yüzleri üretir."
Asena.addCommand({pattern: 'faceai', fromMe: true, desc: sh}, (async (message, match) => {

    var webimage = await axios.get('https://screenshotapi.net/api/v1/screenshot?url=https://thispersondoesnotexist.com/&output=image&width=1000&height=1000', { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made for Founder'})

}));

const shc = "Daha önce olmayan memeleri üretir."
Asena.addCommand({pattern: 'memeai$', fromMe: true, desc: shc}, (async (message, match) => {

    var memes = new Array ();
    memes[0] = "438680";
    memes[1] = "87743020";
    memes[2] = "112126428";
    memes[3] = "181913649";
    memes[4] = "129242436";
    memes[5] = "124822590";
    memes[6] = "61579";
    memes[7] = "102156234";
    memes[8] = "93895088";
    memes[9] = "101470";
    memes[10] = "1035805";
    memes[11] = "131087935";
    memes[12] = "217743513";
    memes[13] = "91538330";
    memes[14] = "89370399";
    memes[15] = "4087833";
    memes[16] = "61520";
    memes[17] = "217743513";
    memes[18] = "61532";
    memes[19] = "97984";
    memes[20] = "119139145";
    memes[21] = "188390779";

    var i = Math.floor(22*Math.random())

    await axios
      .get(`https://api.imgflip.com/get_memes&template_id=${r_text[i]}`)
      .then(async (response) => {
        const {
          url,
        } = response.data

    var webimage = await axios.get(url, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made for Founder'})

}));

