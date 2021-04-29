/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

const Language = require('../language');
const Lang = Language.getString('tagall');


Asena.addCommand({pattern: 'tagall ?(.*)', fromMe: true, desc: Lang.TAGALL_DESC}, (async (message, match) => {

    if (match[1] !== '') {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(
            async (uye) => {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        await message.client.sendMessage(message.jid,`${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (match[1] == '') {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(
            async (uye) => {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        await message.client.sendMessage(message.jid,mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
}));
const rp = "*Report!*"
const ss = "Adminleri Etiketler"
Asena.addCommand({pattern: 'tagadmin', fromMe: true, desc: ss}, (async (message, match) => {
    let grup = await message.client.groupMetadata(message.jid);
    var jids = [];
    mesaj = '';
    grup['participants'].map(async (uye) => {
        if (uye.isAdmin) {
            mesaj += '@' + uye.id.split('@')[0] + ' ';
            jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
        }
    });
    await message.client.sendMessage(message.jid,mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
}));

const tor = "Adminlere rapor gönderir."
const rep = "*Lütfen Ban Sebebini Söyleceğim Kullanıcının Mesajına Yanıt Verin!*"
const rap = "=== ```Ban Sebebi``` ===\n\n"
Asena.addCommand({pattern: 'cikarilmasebebi ?(.*)', fromMe: true, deleteCommand: false, desc: tor}, (async (message, match) => {
    if (match[1] == '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
    }
    else if (match[1] !== '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Sebep:* ${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (!message.reply_message) {
        return message.client.sendMessage(message.jid,rep, MessageType.text);
    }
const tor1 = "İlk Uyarı Sebebini gönderir."
const rep1 = "*Lütfen İlkk Uyaracağım Kullanıcının Mesajına Yanıt Verin!*"
const rap1 = "=== ```İlk Uyarı``` ===\n\n"
Asena.addCommand({pattern: 'uyari1 ?(.*)', fromMe: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap1 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
    }
    else if (match[1] !== '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap1 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Sebep:* ${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (!message.reply_message) {
        return message.client.sendMessage(message.jid,rep1, MessageType.text);
    }
const tor2 = "2.Kez Uyarı Sebebini gönderir."
const rep2 = "*Lütfen 2.Kez Uyaracağım Kullanıcının Mesajına Yanıt Verin!*"
const rap2 = "=== ```Uyarı 2``` ===\n\n"    
Asena.addCommand({pattern: 'uyari2 ?(.*)', fromMe: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap2 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
    }
    else if (match[1] !== '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap2 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Sebep:* ${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (!message.reply_message) {
        return message.client.sendMessage(message.jid,rep2, MessageType.text);
    }
}));
const tor3 = "Ban Sebebi Ve Uyarı Sebebini gönderir."
const rep3 = "*Lütfen 3.Kez Uyaracağım Kullanıcının Mesajına Yanıt Verin!*"
const rap3 = "=== ```Uyarı 3 ve Ban``` ===\n\n"
Asena.addCommand({pattern: 'uyari3 ?(.*)', fromMe: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap3 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] , MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        
    }
    else if (match[1] !== '' && message.reply_message) {
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,rap3 + '*Kullanıcı:* ' + '@' + message.reply_message.jid.split('@')[0] + `\n*Sebep:* ${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (!message.reply_message) {
        return message.client.sendMessage(message.jid,rep3, MessageType.text);
    }
}));
