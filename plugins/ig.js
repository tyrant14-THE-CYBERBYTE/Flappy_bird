const Asena = require('../events')
const { MessageType, Mimetype} = require('@adiwajshing/baileys')
const axios = require('axios')
const sd = "Youtubedan video indirir."

Asena.addCommand({ pattern: 'igvideo ?(.*)', fromMe: true, desc: sd }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.client.sendMessage(message.jid, '```URL Gir!```')

    await axios
      .get(`https://videfikri.com/api/igdl/?url=${userName}`)
      .then(async (response) => {
        const {
          like,
          comment,
          full_name,
          video,
          duration,
        } = response.data.result

        const video = await axios.get(video, {
          responseType: 'arraybuffer',
        })

        const msg = `
        *İsmi:* ${full_name},
        *Beğeni:* ${like},
        *Yorum:* ${comment},
        *Uzunluk:* ${duration}`

        await message.sendMessage(Buffer.from(video.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage('```Bulunamadı!```\n```Link:```' + userName)),
      )
  },
)
