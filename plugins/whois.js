const Asena = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const dil = require('axios');

const das = "Grup metada verisini çeker."

Asena.addCommand({ pattern: 'whois', fromMe: true, desc: das }, async (message, match) => { 

    var json = await message.client.groupMetadata(message.jid) 

    const msg = `*Grup ID:* ${json.id} \n*Grup İsmi:* ${json.subject} \n*Grup Açıklaması:* \n\n${json.desc}`

    var ppUrl = await message.client.getProfilePicture(message.jid) 

    const resim = await dil.get(ppUrl, {responseType: 'arraybuffer'})

    await message.sendMessage(
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
        var ms = message.reply_message
        if (ms.includes('chat')) {
            await message.client.acceptInvite(message.reply_message.text)
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
        await message.client.acceptInvite(`${match[1]}`)
        await message.client.sendMessage(
            message.jid,
            suc,
            MessageType.text
        );
    }
    else if (match[1] == '') {
        await message.client.sendMessage(
            message.jid,
            noj,
            MessageType.text
        );
    }
}));
const scan = "Girilen numaranın WhatApp'ta kayıtlı olup olmadığını kontrol eder."
const nos = "*Lütfen Herhangi Bir Telefon Numarası Gir!*\n*Örnek:* ```.scan 90xxxx```"
const fin = " *Numaralı Kişi WhatApp Kullanmıyor! ❌*"

Asena.addCommand({ pattern: 'scan ?(.*)', fromMe: true, desc: scan}, (async (message, match) => { 

    if (match[1] == '') return await message.client.sendMessage(message.jid, nos, MessageType.text);

    var exists = await message.client.isOnWhatsApp(match[1])
    if (exists) {
        await message.client.sendMessage(message.jid, '```' + match[1] + '``` *Numaralı Kişi WhatApp Kullanıyor! ✅*\n*JID Adresi:* ' + match[1] + '@s.whatsapp.net');
    }
    else {
        await message.client.sendMessage(message.jid,match[1] + fin, MessageType.text);
    }
}));
