
/*
# Copyright (C) 2020 MuhammedKpln.
# edited by Vai838

# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

*/

const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')


if (cn.WORKTYPE == 'private') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (userName === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://api.xteam.xyz/dl/igstalk?nama=${userName}&APIKEY=e67bd1bafe81b611`)
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

            const msg = `*${Lang.NAME}*: ${full_name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${biography} \n*${Lang.FOLLOWERS}*: ${follower_count} \n*${Lang.FOLLOWS}*: ${following_count} \n*Takip Edilen Tag Sayısı:* ${following_tag_count} \n*Doğrulanmış Hesap mı?:* ${is_verified === false ? "Doğrulanmamış 🚫" : "Doğrulanmamış ☑️"} \n*${Lang.ACCOUNT}*: ${is_private === true ? Lang.HIDDEN : Lang.PUBLIC} \n*Post Sayısı:* ${media_count} \n*IGTV Video Sayısı:* ${total_igtv_videos} \n*İşletme Hesabı mı?:* ${is_business === false ? "Hayır" : "Evet"} \n*Kategori:* ${category} \n*Aramalara Açık mı?:* ${is_call_to_action_enabled === false ? "Kapalı" : "Açık"} \n*Telefon Numarası:* ${contact_phone_number} \n*Mail Adresi:* ${public_email} `

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
}
else if (cn.WORKTYPE == 'public') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `*${Lang.NAME}*: ${full_name} \n*${Lang.USERNAME}*: ${username} \n*${Lang.BIO}*: ${bio} \n*${Lang.FOLLOWERS}*: ${followers} \n*${Lang.FOLLOWS}*: ${following} \n*${Lang.ACCOUNT}*: ${is_private === "true" ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
}
