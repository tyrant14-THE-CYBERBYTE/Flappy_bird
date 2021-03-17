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

        var resp = await axios
          .get(`https://api.xteam.xyz/dl/igstalk?nama=${match[1]}&APIKEY=e67bd1bafe81b611`)
        
        await message.sendMessage(Buffer.from(`${user.hd_profile_pic_url_info.url}.data`), MessageType.image, {
          caption: `*${Lang.NAME}*: ${resp.user.full_name} \n*${Lang.USERNAME}*: ${resp.user.username} \n*${Lang.BIO}*: ${resp.user.biography} \n*${Lang.FOLLOWERS}*: ${resp.user.follower_count} \n*${Lang.FOLLOWS}*: ${resp.user.following_count} \n*Takip Edilen Tag Sayısı:* ${resp.user.following_tag_count} \n*Doğrulanmış Hesap mı?:* ${resp.user.is_verified == false ? "Doğrulanmamış 🚫" : "Doğrulanmamış ☑️"} \n*${Lang.ACCOUNT}*: ${resp.user.is_private == true ? Lang.HIDDEN : Lang.PUBLIC} \n*Post Sayısı:* ${resp.user.media_count} \n*IGTV Video Sayısı:* ${resp.user.total_igtv_videos} \n*İşletme Hesabı mı?:* ${resp.user.is_business == false ? "Hayır" : "Evet"} \n*Kategori:* ${resp.user.category} \n*Aramalara Açık mı?:* ${resp.user.is_call_to_action_enabled == false ? "Kapalı" : "Açık"} \n*Telefon Numarası:* ${resp.user.contact_phone_number} \n*Mail Adresi:* ${resp.user.public_email} `,
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + `${match[1]}`)),
          )
      },
    )
