const Asena = require('../events')
const { MessageType, Mimetype} = require('@adiwajshing/baileys')
const axios = require('axios')
const sd = "Instagramdan video indirir."
const gt = "Github profilini gösterir."
const hb = "Kiralanamaz"
const yb = "Kiralanabilir"
const tvig = "IGTV üzerinden video indirir."
const ph = "Instagramdan fotoğraf indirir."
const { errorMessage, infoMessage } = require('../helpers')
const Language = require('../language');
const Lang = Language.getString('instagram')


Asena.addCommand({ pattern: 'igvideo ?(.*)', fromMe: true, desc: sd }, async (message, match) => {

    const userName = match[1]

    if (userName === '') return await message.client.sendMessage(message.jid, '```URL Gir!```')

    await axios.get(`https://docs-jojo.herokuapp.com/api/insta?url=${userName}`).then(async (response) => {

        const { resource } = response.data

        const profileBuffer = await axios.get(resource.url[0], { responseType: 'arraybuffer' })

        if (resource.url.is_video[0]) {
            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, { caption: 'Made by WhatsAsena' })
        }
        else if (!resource.url.is_video[0]) {
            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, { caption: 'Made by WhatsAsena' })
        }
    }).catch(async (err) => {
        await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName))
    })
});
Asena.addCommand({ pattern: 'igphoto ?(.*)', fromMe: true, desc: ph }, async (message, match) => {

    const userName = match[1]

    if (userName === '') return await message.client.sendMessage(message.jid, '```URL Gir!```')

    await axios
      .get(`https://api.zeks.xyz/api/ig?url=${userName}&apikey=apivinz`)
      .then(async (response) => {

        const {
          owner,
          caption,
          url, 
        } = response.data.result

        const phig = await axios.get(url, 
          {responseType: 'arraybuffer',
        })

        const msg = `*Kullanıcı Adı:* ${owner} \n*Açıklama:* ${caption}`

        await message.sendMessage(Buffer.from(phig.data), MessageType.image, { 
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.client.sendMessage(message.jid, 'Bulunamadı'),
      )
  },
)

Asena.addCommand({ pattern: 'igtv ?(.*)', fromMe: true, desc: tvig }, async (message, match) => {

    const userName = match[1]

    if (userName === '') return await message.client.sendMessage(message.jid, '```URL Gir!```')

    await axios
      .get(`https://videfikri.com/api/igtv/?url=${userName}`)
      .then(async (response) => {

        const {
          likes, 
          comment, 
          username,
          full_name, 
          caption,
          video_url, 
          duration,
        } = response.data.result

        const tvdat = await axios.get(video_url, 
          {responseType: 'arraybuffer',
        })

        const msg = `*Kullanıcı Adı:* ${username} \n*İsmi:* ${full_name} \n*Beğeni:* ${likes} \n*Yorum:* ${comment} \n*Açıklama:* ${caption} \n*Uzunluk:* ${duration}`

        await message.sendMessage(Buffer.from(tvdat.data), MessageType.video, { 
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
