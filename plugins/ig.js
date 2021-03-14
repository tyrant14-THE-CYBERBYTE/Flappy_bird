const Asena = require('../events')
const { MessageType, Mimetype} = require('@adiwajshing/baileys')
const axios = require('axios')
const sd = "Instagramdan video indirir."
const gt = "Github profilini gösterir."
const hb = "Kiralanamaz"
const yb = "Kiralanabilir"


Asena.addCommand({ pattern: 'igvideo ?(.*)', fromMe: true, desc: sd }, async (message, match) => {

    const userName = match[1]

    if (userName === '') return await message.client.sendMessage(message.jid, '```URL Gir!```')

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

        const igdat = await axios.get(video, 
          {responseType: 'arraybuffer',
        })

        const msg = `*İsmi:* ${full_name} \n*Beğeni:* ${like} \n*Yorum:* ${comment} \n*Uzunluk:* ${duration}`

        await message.sendMessage(Buffer.from(igdat.data), MessageType.video, { 
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.client.sendMessage(message.jid, 'Bulunamadı'),
      )
  },
)

Asena.addCommand({ pattern: 'github ?(.*)', fromMe: true, desc: gt }, async (message, match) => {

    const userName = match[1]

    if (userName === '') return await message.client.sendMessage(message.jid, '```Github Kullanıcı İsmi Gir!```')

    await axios
      .get(`https://videfikri.com/api/github/?username=${userName}`)
      .then(async (response) => {

        const {
          hireable,
          company,
          profile_pic,
          username,
          fullname, 
          blog, 
          location,
          email,
          public_repository,
          biografi,
          following,
          followers,
          public_gists,
          profile_url,
          last_updated,
          joined_on,
        } = response.data.result

        const githubscrap = await axios.get(profile_pic, 
          {responseType: 'arraybuffer',
        })

        const msg = `*Kullanıcı Adı:* ${username} \n*İsmi:* ${fullname} \n*Takipçi:* ${followers} \n*Takip Edilen:* ${following} \n*Biyografi:* ${biografi} \n*Açık Repolar:* ${public_repository} \n*Açık Gistler:* ${public_gists} \n*Konumu:* ${location} \n*Email:* ${email} \n*Blog:* ${blog} \n*Şirket:* ${company} \n*Kiralanabilir mi?:* ${hireable === "true" ? yb : hb} \n*Katılma Tarihi:* ${joined_on} \n*Son Güncelleme Tarihi:* ${last_updated} \n*Profil Bağlantısı:* ${profile_url}`

        await message.sendMessage(Buffer.from(githubscrap.data), MessageType.image, { 
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.client.sendMessage(message.jid, 'Bulunamadı'),
      )
  },
)
