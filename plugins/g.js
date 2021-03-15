const Asena = require('../events');
const { MessageType, Mimetype} = require('@adiwajshing/baileys');

const TRd = "Ğ gönderir."

Asena.addCommand({ pattern: 'ğ ?(.*)', fromMe: true, desc: TRd }, async (message, match) => {

    const gsay = match[1]

    if (match[1] === '') return await message.client.sendMessage(message.jid, '\n          ğğğğğğ\n          ğğğğğğ\n     ğğğğğğğğ\n    ğğ                     ğğ\n ğğ\nğğ                ğğğğ\nğğ                ğğğğ\n ğğ                        ğğ\n   ğğ                      ğğ\n     ğğğğğğğğ\n          ğğğğğğ', MessageType.text);

    var str = "\n          ğğğğğğ\n          ğğğğğğ\n     ğğğğğğğğ\n    ğğ                     ğğ\n ğğ\nğğ                ğğğğ\nğğ                ğğğğ\n ğğ                        ğğ\n   ğğ                      ğğ\n     ğğğğğğğğ\n          ğğğğğğ";
  
    var res = str.replace(/ğ/g, `${gsay}`);
        
    return await message.client.sendMessage(message.jid, res, MessageType.text);

});
