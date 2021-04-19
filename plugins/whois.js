const Asena = require('../events');
const { MessageType, Mimetype, GroupSettingChange, MessageOptions } = require('@adiwajshing/baileys');
const dil = require('axios');

const das = "Grup metada verisini çeker."

Asena.addCommand({ pattern: 'whois', fromMe: true, desc: das }, async (message, match) => { 

    var json = await message.client.groupMetadataMinimal(message.jid) 

    const msg = `*Grup ID:* ${json.id} \n*Grup İsmi:* ${json.subject} \n*Kuruluş Zamanı:* ${json.creation} \n*Kurucu:* ${json.owner} \n*Grup Açıklaması:* \n\n${json.desc.toString('utf-8')}`

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
        
        if (message.reply_message.text) {
            const inr = message.reply_message.text + '.com/'
            await message.client.acceptInvite(inr)
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
        const inz = `${match[1]}.com/`
        await message.client.acceptInvite(inz)
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
        await message.client.sendMessage(message.jid, '```' + match[1] + '``` *Numaralı Kişi WhatApp Kullanıyor! ✅*\n*JID Adresi:* ' + exists.jid, MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid,match[1] + fin, MessageType.text);
    }
}));
