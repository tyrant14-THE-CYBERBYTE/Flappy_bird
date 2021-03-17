const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        if (match[1] === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://api.xteam.xyz/dl/igstalk?nama=${match[1]}&APIKEY=e67bd1bafe81b611`)
          .then(async (response) => {
            const {
              hd_profile_pic_url_info,
              username,
              biography,
              follower_count,
              following_count,
              full_name,
              is_verified,
              following_tag_count,
              media_count,
              total_igtv_videos,
              contact_phone_number,
              is_call_to_action_enabled,
              is_business,
              is_private,
              category,
              public_email,
            } = response.data.result

            const profileBuffer = await axios.get(hd_profile_pic_url_info, {
              responseType: 'arraybuffer',
            })

            const msg = `*${Lang.NAME}*: ${full_name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${biography} \n*${Lang.FOLLOWERS}*: ${follower_count} \n*${Lang.FOLLOWS}*: ${following_count} \n*Takip Edilen Tag Sayısı:* ${following_tag_count} \n*Doğrulanmış Hesap mı?:* ${is_verified == false ? "Doğrulanmamış 🚫" : "Doğrulanmamış ☑️"} \n*${Lang.ACCOUNT}*: ${is_private == true ? Lang.HIDDEN : Lang.PUBLIC} \n*Post Sayısı:* ${media_count} \n*IGTV Video Sayısı:* ${total_igtv_videos} \n*İşletme Hesabı mı?:* ${is_business == false ? "Hayır" : "Evet"} \n*Kategori:* ${category} \n*Aramalara Açık mı?:* ${is_call_to_action_enabled == false ? "Kapalı" : "Açık"} \n*Telefon Numarası:* ${contact_phone_number} \n*Mail Adresi:* ${public_email} `

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
