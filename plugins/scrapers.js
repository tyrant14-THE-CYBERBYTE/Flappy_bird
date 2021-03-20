/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//=====================================================================================
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================
const Language = require('../language');
const Lang = Language.getString('scrapers');

const wiki = require('wikijs').default;
var gis = require('g-i-s');

Asena.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: true}, (async (message, match) => {
    if (!message.reply_message) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text);
    }

    ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
    if ('text' in ceviri) {
        return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
        + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
        + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
    } else {
        return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text)
    }
}));

Asena.addCommand({pattern: 'currency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: true}, (async (message, match) => {
    if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
        return await message.client.sendMessage(message.jid,Lang.CURRENCY_ERROR,MessageType.text);
    }
    let opts = {
        amount: parseFloat(match[1]).toFixed(2).replace(/\.0+$/,''),
        from: match[2].toUpperCase(),
        to: match[3].toUpperCase()
    }
    try {
        result = await exchangeRates().latest().symbols([opts.to]).base(opts.from).fetch()
        result = parseFloat(result).toFixed(2).replace(/\.0+$/,'')
        await message.reply(`\`\`\`${opts.amount} ${opts.from} = ${result} ${opts.to}\`\`\``)
    }
    catch(err) {
        if (err instanceof ExchangeRatesError) 
            await message.client.sendMessage(message.jid,Lang.INVALID_CURRENCY,MessageType.text)
        else {
            await message.client.sendMessage(message.jid,Lang.UNKNOWN_ERROR,MessageType.text)
            console.log(err)
        }
    }
}));

Asena.addCommand({pattern: 'tts (.*)', fromMe: true, desc: Lang.TTS_DESC}, (async (message, match) => {
    if(match[1] === undefined || match[1] == "")
        return;
    
    let 
        LANG = config.LANG.toLowerCase(),
        ttsMessage = match[1],
        SPEED = 1.0

    if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
}));

Asena.addCommand({pattern: 'song ?(.*)', fromMe: true, desc: Lang.SONG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text);    
    let arama = await yts(match[1]);
    arama = arama.all;
    if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text);

    let title = arama[0].title.replace(' ', '+');
    let stream = ytdl(arama[0].videoId, {
        quality: 'highestaudio',
    });
    
    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    ffmpeg(stream)
        .audioBitrate(320)
        .save('./' + title + '.mp3')
        .on('end', async () => {
            const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();

            reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
        });
}));

Asena.addCommand({pattern: 'video ?(.*)$', fromMe: true, desc: Lang.VIDEO_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text);    
    
    try {
        var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    }

    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text);

    var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

    yt.on('end', async () => {
        reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
        await message.client.sendMessage(message.jid,fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4, caption: 'Made for Founder'});
    });
}));

Asena.addCommand({pattern: 'yt ?(.*)', fromMe: true, desc: Lang.YT_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text);

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text);
    }
    
    var mesaj = '';
    arama.all.map((video) => {
        mesaj += '*' + video.title + '* - ' + video.url + '\n'
    });

    await message.client.sendMessage(message.jid,mesaj,MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'wiki ?(.*)', fromMe: true, desc: Lang.WIKI_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text);

    var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
        .page(match[1]);

    var info = await arama.rawContent();
    await message.client.sendMessage(message.jid, info, MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'img ?(.*)', fromMe: true, desc: Lang.IMG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);
    gis(match[1], async (error, result) => {
        for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
            var get = got(result[i].url, {https: {rejectUnauthorized: false}});
            var stream = get.buffer();
                
            stream.then(async (image) => {
                await message.client.sendMessage(message.jid,image, MessageType.image);
            });
        }

        message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
    });
}));
const stor = "Plugin mağazasında arama yapar."

Asena.addCommand({pattern: 'store ?(.*)', fromMe: true, desc: stor }, (async (message, match) => { 

    if (match[1] === '') {

        await message.client.sendMessage(
            message.jid,
            '_Mağazada En Son Eklenen Pluginler Aranıyor.._',
            MessageType.text
        );
        await new Promise(r => setTimeout(r, 1800));

        await message.client.sendMessage(
            message.jid,
            't.me/unofficialplugin _Kanalına Eklenen Son Pluginler:_\n\n' +
            '*Gaymeter V2*\n\n➡️ *Platform:* #WhatsApp\nℹ️ Desc: _🇹🇷 Gaymeter\'in 2. versiyonudur.  🇬🇧 Version 2 of Gaymeter. 🇮🇳 Gaymeter का संस्करण 2._\n\n▶️ *Type:* #Eğlence #Fun\n✅ *Owner:* @phaticusthiccy\n\n💻 *Usage:* ```.gaymeter```\n🌍 *Languages:* _TR - EN - HI_\n⚠️ *Warning:* 🇹🇷 _Kullanmadan önce eski plugini silin! 🇬🇧 Delete old plugin before using new version._\n🔗 *Link:* https:\/\/gist.github.com\/phaticusthiccy\/ea823fff6a8504ef4ad857129939f555\n\n====================' +
            '*Ğ - F - X Word*\n\n➡️ *Platform:* #WhatsApp\nℹ️ *Desc:* _🇹🇷 Telegramdaki .ğ ve .f komutunun yanında .x komutu bulunduran plugin. 🇬🇧 Plugin containing the .x command next to the .ğ and .f command from TG Asena. 🇮🇳 प्लग इन में .ğ कमांड के बगल में .x कमांड और TG असैना की .f कमांड होती है। 🇼🇸 ടിജി അസേനയിൽ നിന്നുള്ള .ğ, .f കമാൻഡിനടുത്തുള്ള .x കമാൻഡ് അടങ്ങിയിരിക്കുന്ന പ്ലഗിൻ._\n\n▶️ *Type:* #Eğlence #Fun\n✅ *Owner:* @phaticusthiccy\n\n💻 *Usage:* ```.ğ \/ .f \/ .x```\n🌍 *Languages:* _TR - EN - HI - ML_\n🔗 *Link:* https:\/\/gist.github.com\/phaticusthiccy\/cd93c24c122731b6ea9a5dbdd58b470a \n\n====================' +
            '*Dice Game V3*\n\n➡️ *Platform:* #WhatsApp\nℹ️ *Desc:* 🇹🇷 _Zar oyununun 3. versiyonudur. 🇬🇧 Version 3 of Dice Game. 🇮🇳 Dice Game का संस्करण 3._\n\n▶️ *Type:* #Eğlence #Fun\n✅ *Owner:* @phaticusthiccy\n\n💻 *Usage:* ```.roll```\n🌍 *Languages:* _TR - EN - HI_\n⚠️ *Warning:* 🇹🇷 _Kullanmadan önce eski plugini silin! 🇬🇧 Delete old plugin before using new version._\n🔗 *Link:* https:\/\/gist.github.com\/phaticusthiccy\/23e6c2cc12db52fd54ccc397b1bd4227 \n\n====================' +
            '_Yüklemek için_ ```.install <plugin linki>``` _komutunu kullanın._',
            MessageType.text
        );
    }
    else {
        await message.client.sendMessage(
            message.jid,
            'Hmm',
            MessageType.text
        );
    }
}));
