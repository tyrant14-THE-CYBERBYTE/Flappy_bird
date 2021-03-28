const Asena = require('../events');
const { MessageType, Mimetype, } = require('@adiwajshing/baileys');

const das = "Grup metada verisini çeker."

Asena.addCommand({ pattern: 'whois', fromMe: true, desc: das }, async (message, match) => { 

    const ppUrl = await message.client.getProfilePicture(message.jid) 

    await message.client.groupMetadata(message.jid) 

    await message.client.sendMessage(
        Buffer.from(ppUrl.data), 
        MessageType.image, 
        { caption: "*Group ID:* " + json.id + "\n*Group Name:* " + json.subject + "\n*Description:* " + json.desc }
    );

});
