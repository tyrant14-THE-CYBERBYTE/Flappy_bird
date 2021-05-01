const Asena = require('../events');
const {MessageType, GroupSettingChange} = require('@adiwajshing/baileys');

    Asena.addCommand({pattern: 'uyaridefteri ?(.*)', fromMe: true, deleteCommand: false}, (async (message, match) => {

        if (match[1] === "bfe") {

            await message.sendMessage('●▬▬▬▬๑вғe υyarι deғтerι acιlιyor๑▬▬▬▬●');
            await new Promise(r => setTimeout(r, 1000));
          
            await message.sendMessage('+90(534)077-0299 Uyarı Sayısı:2\nSon Uyarı Ban Yiyeceksin..');
            await new Promise(r => setTimeout(r, 1000));
            
            await message.sendMessage('●▬▬▬▬๑вғe υyarι deғтerι ĸapanιyor๑▬▬▬▬●');
          
        } else if (match[1] === "bg") {

            await message.sendMessage('●▬▬▬▬๑вg υyarι deғтerι acιlιyor๑▬▬▬▬●');
            await new Promise(r => setTimeout(r, 1000));
          
            await message.sendMessage('+90(534)077-0299 Uyarı Sayısı:1');
            await new Promise(r => setTimeout(r, 1000));
            
            await message.sendMessage('●▬▬▬▬๑вg υyarι deғтerι ĸapanιyor๑▬▬▬▬●');
        } else {

              await message.sendMessage('Geçersiz Grup Adresi. "bfe veya bg yazarak Uyarı Defterine Erişebilirsin."\nHer Gece 00.00 da Uyarı Defterleri Güncellenir.\n~DevFelix');

    }

}));
