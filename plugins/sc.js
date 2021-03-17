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
        
        var respoimage = await axios.get(`${resp.hd_profile_pic_url_info}`, { responseType: 'arraybuffer' })

        const scda = await axios.get(`*${Lang.NAME}*: ${resp.full_name} \n*${Lang.USERNAME}*: ${resp.username} \n*${Lang.BIO}*: ${resp.biography} \n*${Lang.FOLLOWERS}*: ${resp.follower_count} \n*${Lang.FOLLOWS}*: ${resp.following_count} \n*Takip Edilen Tag Sayısı:* ${resp.following_tag_count} \n*Doğrulanmış Hesap mı?:* ${resp.is_verified == false ? "Doğrulanmamış 🚫" : "Doğrulanmamış ☑️"} \n*${Lang.ACCOUNT}*: ${resp.is_private == true ? Lang.HIDDEN : Lang.PUBLIC} \n*Post Sayısı:* ${resp.media_count} \n*IGTV Video Sayısı:* ${resp.total_igtv_videos} \n*İşletme Hesabı mı?:* ${resp.is_business == false ? "Hayır" : "Evet"} \n*Kategori:* ${resp.category} \n*Aramalara Açık mı?:* ${resp.is_call_to_action_enabled == false ? "Kapalı" : "Açık"} \n*Telefon Numarası:* ${resp.contact_phone_number} \n*Mail Adresi:* ${resp.public_email} `, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {
          caption: scda,
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + `${match[1]}`)),
          )
      },
    )
