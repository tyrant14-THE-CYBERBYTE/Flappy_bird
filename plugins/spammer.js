/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const Config = require('../config');
const Heroku = require('heroku-client');

const Language = require('../language');
const Lang = Language.getString('spammer');

const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});

let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

let totalMaxSpamCount = 5000


Asena.addCommand({ pattern: 'spam ?(.*)', fromMe: true, desc: Lang.SPAM_DESC }, (async (message, match) => {

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid,Lang.NEED_WORD, MessageType.text);
    }


    if (totalMaxSpamCount !== 0) {
        for (let index = 0; index < totalMaxSpamCount; index++) {
            await message.client.sendMessage(message.jid, `${match[1]}`, MessageType.text)
        }
    }


}));

Asena.addCommand({ pattern: 'killspam', fromMe: true, desc: Lang.STOP_SPAMDESC }, (async (message, match) => {
    
    return await message.client.sendMessage(message.jid,Lang.STOP_SPAM, MessageType.text);

    console.log(baseURI)
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));
