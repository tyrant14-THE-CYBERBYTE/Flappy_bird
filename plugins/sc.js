const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const got = require("got");
const Heroku = require('heroku-client');
const TikTokScraper = require('tiktok-scraper')

const ttom = "Tiktokdan video indirir, profil bulur."
const usf = "```Kullanıcı Aranıyor!```"
const vsf = "```Video İndiriliyor...```"
const gzh = "Gizli Hesap"
const nghs = "Açık Hesap"
const evt = "Onaylanmış Hesap"
const hyr = "Onaylanmamış Hesap"

Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, desc: ttom}, (async (message, match) => {

    const options = {
        noWaterMark: true,
        hdVideo: true
    }

    if (match[1].length < 20) {
        await message.client.sendMessage(
            message.jid,
            usf,
            MessageType.text
        );
        try {
            const info = await TikTokScraper.getUserProfileInfo(`${match[1]}`, options)

            const buff = await axios.get(`${info.user.avatarLarger}`, { responseType: 'arraybuffer' })

            const capt = `*Kullanıcı Adı:* ${info.user.uniqueId} \n*Hesap İsmi:* ${info.user.nickname} \n*Takipçi Sayısı:* ${info.stats.followerCount} \n*Takip Edilen:* ${info.stats.followingCount} \n*Toplam Beğeni:* ${info.stats.heartCount} \n*Toplam Video Sayısı:* ${info.stats.videoCount} \n*Biyografi:* ${info.user.signature} \n*Onaylanmış Hesap mı?:* ${info.user.verified ? evt : hyr} \n*Hesap Türü:* ${user.privateAccount ? ghz : nghs}`    

            return await message.sendMessage(
                Buffer.from(buff.data),
                MessageType.image,
                { caption: capt }
            )
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        await message.client.sendMessage(
            message.jid,
            vsf,
            MessageType.text
        )
        try {
            const vid = await TikTokScraper.getVideoMeta(`${match[1]}`, options)

            const buffv = await axios.get(`${vid.collector.videoUrlNoWaterMark}`, { responseType: 'arraybuffer' })

            const captv = `*Kullanıcı Adı:* ${vid.collector.authorMeta} \n*Açıklama:* ${vid.collector.text} \n*Beğeni Sayısı:* ${vid.collector.diggCount} \n*Yorum Sayısı:* ${vid.collector.commentCount} \n*İzlenme Sayısı:* ${vid.collector.playCount} \n*Paylaşım Sayısı:* ${vid.collector.shareCount} \n*Video Uzunluğu:* ${vid.collector.videoMeta.duration} Saniye \n*Müzik İsmi:* ${vid.collector.musicMeta.musicName} \n*Müzik Sahibi:* ${vid.collector.musicMeta.musicAuthor}* \n*Kullanıcı Linki:* https://tiktok.com/@${vid.collector.authorMeta}`  

            return await message.sendMessage(
                Buffer.from(buffv.data),
                MessageType.video,
                { caption: captv }
            )
        }
        catch (error) {
            console.log(error)
        }
    }
}));
