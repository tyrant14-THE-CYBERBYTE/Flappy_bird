const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')

Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

    await message.sendMessage(infoMessage(Lang.LOADING))

    await axios
      .get(`https://api.xteam.xyz/dl/igstalk?nama=${userName}&APIKEY=e67bd1bafe81b611`, { proxy: { host: '176.113.73.96', port: 3128 }})
      .then(async (response) => {

        const {
          full_name,
          username,
          biography,
          follower_count,
          following_count,
          following_tag_count,
          is_verified,
          is_private,
          profile_pic_url,
          media_count,
          total_igtv_videos,
          is_business,
          is_call_to_action_enabled,
          contact_phone_number,
          public_email,
        } = response.data.result.user
        
        const profileBuffer = await axios.get(profile_pic_url, { proxy: {host: '176.113.73.96', port: 3128 }}, { responseType: 'arraybuffer'})

        const msg = `*${Lang.NAME}*: ${full_name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${biography} \n*${Lang.FOLLOWERS}*: ${follower_count} \n*${Lang.FOLLOWS}*: ${following_count} \n*Takip Edilen Tag Sayısı:* ${following_tag_count} \n*Doğrulanmış Hesap mı?:* ${is_verified} \n*${Lang.ACCOUNT}*: ${is_private} \n*Post Sayısı:* ${media_count} \n*IGTV Video Sayısı:* ${total_igtv_videos} \n*İşletme Hesabı mı?:* ${is_business} \n*Kategori:* ${category} \n*Aramalara Açık mı?:* ${is_call_to_action_enabled} \n*Telefon Numarası:* ${contact_phone_number} \n*Mail Adresi:* ${public_email} `

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
        async (err) => await message.sendMessage('Yüklenemedi! ' + userName)),
      )
  },
)
