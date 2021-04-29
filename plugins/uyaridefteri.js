const Asena = require('../events');
const {MessageType, GroupSettingChange} = require('@adiwajshing/baileys');

    Asena.addCommand({pattern: 'uyaridefteri ?(.*)', fromMe: true, deleteCommand: false}, (async (message, match) => {

        if (match[1] === "bfe") {

            await message.sendMessage('Best Friend Environment Uyarı Defteri');
            await new Promise(r => setTimeout(r, 1000));
          
            await message.sendMessage('+90(534)077-0299 Uyarı Sayısı:2\nSon Uyarı Ban Yiyeceksin..');
          
        } else if (match[1] === "bg") {

            await message.sendMessage('Bot Gelişim Uyarı Defteri');
            await new Promise(r => setTimeout(r, 1000));
          
            await message.sendMessage('+90(534)077-0299 Uyarı Sayısı:1');
       
        } else {

              await message.sendMessage('Geçersiz Grup Adresi. "bfe veya bg yazarak Uyarı Defterine Erişebilirsin."\nHer Gece 00.00 da Uyarı Defterleri Güncellenir.\n~DevFelix');

    }

}));
