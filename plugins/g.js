const Asena = require('../events');
const { MessageType, Mimetype} = require('@adiwajshing/baileys');

const TRd = "Ğ gönderir."
const TRf = "F gönderir."

Asena.addCommand({ pattern: 'ğ$ ?(.*)', fromMe: true, desc: TRd }, async (message, match) => {

    const gsay = match[1]

    if (match[1] === '') return await message.client.sendMessage(message.jid, 'ㅤ \n          ğğğğğğ\n\n          ğğğğğğ\n     ğğğğğğğğ\n   ğğ                     ğğ\n ğğ\nğğ                ğğğğ\nğğ                ğğğğ\n ğğ                        ğğ\n   ğğ                      ğğ\n     ğğğğğğğğ\n          ğğğğğğ', MessageType.text);

    var str = "ㅤ \n          ğğğğğğ\n\n          ğğğğğğ\n     ğğğğğğğğ\n   ğğ                     ğğ\n ğğ\nğğ                ğğğğ\nğğ                ğğğğ\n ğğ                        ğğ\n   ğğ                      ğğ\n     ğğğğğğğğ\n          ğğğğğğ";
  
    var res = str.replace(/ğ/g, `${gsay}`);
        
    return await message.client.sendMessage(message.jid, res, MessageType.text);

});

Asena.addCommand({ pattern: 'f$ ?(.*)', fromMe: true, desc: TRd }, async (message, match) => {

    const fsay = match[1]

    if (match[1] === '') return await message.client.sendMessage(message.jid, 'ffffffff\nffffffff\nff\nff\nff\nffffff\nffffff\nff\nff\nff\nff\nff', MessageType.text);

    var str = "ffffffff\nffffffff\nff\nff\nff\nffffff\nffffff\nff\nff\nff\nff\nff";
  
    var fres = str.replace(/f/g, `${fsay}`);
        
    return await message.client.sendMessage(message.jid, fres, MessageType.text);

});
