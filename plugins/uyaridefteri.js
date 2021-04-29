const Asena = require('../events');
const{MessageType} = require('@adiwajshing/baileys')
        
Asena.addCommand({pattern: 'uyaridefteri', fromMe: true}, (async (message, match) 
   if (match[1] === 'bfe') {
                 
    await message.sendMessage('*+90(534)077-0299 Uyarı Sayısı: 1*');
    await new Promise(r => setTimeout(r, 1000));
        
    await message.sendMessage('*+90(551)151-5213 Uyarı Sayısı: 2*');
        
}  else if  (match[1] === 'bg') {
                 
    await message.sendMessage('*+90(534)077-0299 Uyarı Sayısı: 2*');
    await new Promise(r => setTimeout(r, 1000));
         
    await message.sendMessage('*+90(543)661-9918 Uyarı Sayısı: 1*');
        
}  else {
    
    await message.sendMessage('bfe , bg yazarak uyarı sayılarını öğrenebilirsiniz')
    await new Promise(r => setTimeout(r, 1000));
    
    await message.sendMessage('Her Gece 00.00 da Güncellenir.')
}));
