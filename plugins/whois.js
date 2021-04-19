const Asena = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const dil = require('axios');

const das = "Grup metada verisini çeker."

Asena.addCommand({ pattern: 'whois', fromMe: true, desc: das }, async (message, match) => { 

    const metadata = await message.groupMetadata(message.jid) 
    const msg = `*Grup ID:* ${json.id} \n*Grup İsmi:* ${json.subject} \n*Grup Açıklaması:* \n\n${json.desc}`

    const ppUrl = await message.getProfilePicture(message.jid) 

    const resim = await dil.get(ppUrl, {responseType: 'arraybuffer'})

    await message.client.sendMessage(
        Buffer.from(resim.data), 
        MessageType.image, 
        { caption: msg }
    );

});
const jod = "Davet linki ile gruplara katılır."
const noj = "*Lütfen Sadece Grup Linkini Girin!*"
const suc = "*Başarıyla Gruba Katıldınız!*"

Asena.addCommand({ pattern: 'join ?(.*)', fromMe: true, desc: jod}, (async (message, match) => { 

    if (message.reply_message) {
        if (message.reply_message.text.includes('chat')) {
            await message.acceptInvite(message.reply_message.text)
            await message.client.sendMessage(
                message.jid,
                suc,
                MessageType.text
            );
        }
        else {
            return await message.client.sendMessage(
                message.jid,
                noj,
                MessageType.text
            );
        }
    }
    else if (match[1] !== '' && match[1].includes('chat')) {
        await message.acceptInvite(match[1])
        await message.client.sendMessage(
            message.jid,
            suc,
            MessageType.text
        );
    }
}));
const scan = "Girilen numaranın WhatApp'ta kayıtlı olup olmadığını kontrol eder."
const nos = "*Lütfen Herhangi Bir Telefon Numarası Gir!*\n*Örnek:* ```.scan 90xxxx```"
const fin = " *Numaralı Kişi WhatApp Kullanmıyor!*"

Asena.addCommand({ pattern: 'scan ?(.*)', fromMe: true, desc: scan}, (async (message, match) => { 

    if (match[1] == '') return await message.client.sendMessage(message.jid, nos, MessageType.text);

    const exists = await message.isOnWhatsApp(match[1])
    if (exists) {
        await message.client.sendMessage(message.jid, '```' + match[1] + '``` *Numaralı Kişi WhatApp Kullanıyor!*\n*JID Adresi:*' + exists.jid)
    }
    else {
        await message.client.sendMessage(message.jid,match[1] + fin, MessageType.text);
    }
}));
