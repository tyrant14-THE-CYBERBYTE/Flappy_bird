const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const got = require("got");
const Heroku = require('heroku-client');

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')




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
          created_at,
          user,
          stats,
          music,
        } = response.data.result

        const profileBuffer = await axios.get(url_nwm, {
          responseType: 'arraybuffer',
        })

        const msg = `*Açıklama:* ${caption} \n*Kullanıcı Adı:* https://www.tiktok.com/@${user.username} \n*İsim:* ${user.name} \n*Beğeni:* ${stats.likes} \n*Yorum:* ${stats.comments} \n*İzlenmeler:* ${stats.play} \n*Paylaşımlar:* ${stats.shares} \n*Müzik:* ${music.title} \n*Müzik Sahibi:* ${music.author} `

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage('Yüklenemedi! ' + userName),
      )
  },
)
