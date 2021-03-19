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
      .get(`https://api.xteam.xyz/dl/igstalk?nama=${userName}&APIKEY=e67bd1bafe81b611`)
      .then(async (response) => {

        const {
          full_name,
          username,
          biography,
          hd_profile_pic_url_info,
          contact_phone_number,
          public_email,
        } = response.data.result
        
        const profileBuffer = await axios.get(user.profile_pic_url.url, { responseType: 'arraybuffer'})

        const msg = `*${Lang.NAME}*: ${user.full_name} \n*${Lang.USERNAME}*: ${user.username} \n*${Lang.BIO}*: ${user.biography} \n*Kategori:* ${user.category} \n*Telefon Numarası:* ${user.contact_phone_number} \n*Mail Adresi:* ${user.public_email} `

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
