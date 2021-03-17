const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

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
          user.full_name,
          user.username,
          user.biography,
          user.follower_count,
          user.following_count,
          user.following_tag_count,
          user.is_verified,
          user.is_private,
          user.hd_profile_pic_url_info,
          user.media_count,
          user.total_igtv_videos,
          user.is_business,
          user.is_call_to_action_enabled,
          user.contact_phone_number,
          user.public_email,
        } = response.data.result

        const profileBuffer = await axios.get(user.hd_profile_pic_url_info, {
          responseType: 'arraybuffer',
        })

        const msg = `*${Lang.NAME}*: ${user.full_name} \n*${Lang.USERNAME}*: ${user.username} \n*${Lang.BIO}*: ${user.biography} \n*${Lang.FOLLOWERS}*: ${user.follower_count} \n*${Lang.FOLLOWS}*: ${user.following_count} \n*Takip Edilen Tag Sayısı:* ${user.following_tag_count} \n*Doğrulanmış Hesap mı?:* ${user.is_verified == false ? "Doğrulanmamış 🚫" : "Doğrulanmamış ☑️"} \n*${Lang.ACCOUNT}*: ${user.is_private == true ? Lang.HIDDEN : Lang.PUBLIC} \n*Post Sayısı:* ${user.media_count} \n*IGTV Video Sayısı:* ${user.total_igtv_videos} \n*İşletme Hesabı mı?:* ${user.is_business == false ? "Hayır" : "Evet"} \n*Kategori:* ${user.category} \n*Aramalara Açık mı?:* ${user.is_call_to_action_enabled == false ? "Kapalı" : "Açık"} \n*Telefon Numarası:* ${user.contact_phone_number} \n*Mail Adresi:* ${user.public_email} `,

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
      )
  },
)

