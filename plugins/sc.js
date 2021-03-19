const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const got = require("got");

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')

Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

    await message.sendMessage(infoMessage(Lang.LOADING))

    const respo = await got(`https://api.xteam.xyz/dl/igstalk?nama=${userName}&APIKEY=e67bd1bafe81b611`).then(async ok => {

        headers: {
            "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
        }
        const resp = JSON.parse(ok.body);
        
        const profileBuffer = await axios.get(resp.result.user.profile_pic_url.url, { responseType: 'arraybuffer'})

        const msg = `*${Lang.NAME}*: ${resp.result.user.full_name} \n*${Lang.USERNAME}*: ${resp.result.user.username} \n*${Lang.BIO}*: ${resp.result.user.biography} \n*${Lang.FOLLOWERS}*: ${resp.result.user.follower_count} \n*${Lang.FOLLOWS}*: ${resp.result.user.following_count} \n*Takip Edilen Tag Sayısı:* ${resp.result.user.following_tag_count} \n*Doğrulanmış Hesap mı?:* ${resp.result.user.is_verified} \n*${Lang.ACCOUNT}*: ${resp.result.user.is_private} \n*Post Sayısı:* ${resp.result.user.media_count} \n*IGTV Video Sayısı:* ${resp.result.user.total_igtv_videos} \n*İşletme Hesabı mı?:* ${resp.result.user.is_business} \n*Kategori:* ${resp.result.user.category} \n*Aramalara Açık mı?:* ${resp.result.user.is_call_to_action_enabled} \n*Telefon Numarası:* ${resp.result.user.contact_phone_number} \n*Mail Adresi:* ${resp.result.user.public_email} `

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
      )
  },
)

const ttom = "Tiktokdan video indirir."

Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, desc: ttom}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage('Link Girmelisin!')

    await axios
      .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=e67bd1bafe81b611`)
      .then(async (response) => {
        const {
          uploaded_at,
          caption,
          url_nwm,
          title,
          created_at,
          user,
          stats,
          music,
        } = response.data.result

        const profileBuffer = await axios.get(url_nwm, {
          responseType: 'arraybuffer',
        })

        const msg = `*Başlık:* ${title} \n*Açıklama:* ${caption} \n*Kullanıcı Adı:* ${user.username} \n*İsim:* ${user.name} \n*Beğeni:* ${stats.likes} \n*Yorum:* ${stats.comments} \n*İzlenmeler:* ${stats.play} \n*Paylaşımlar:* ${stats.shares} \n*Müzik:* ${music.title} \n*Müzik Sahibi:* ${music.author} `

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage('Yüklenemedi! ' + userName),
      )
  },
)
