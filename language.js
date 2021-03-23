const Config = require('./config');
const fs = require('fs');
const chalk = require('chalk');
const Asena = require('./events');
const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const conn = new WAConnection();

if (fs.existsSync('./language/' + Config.LANG + '.json')) {
    console.log(
        chalk.green.bold('Loading ' + Config.LANG + ' language...')
    );

    var json = JSON.parse(fs.readFileSync('./language/' + Config.LANG + '.json'));
}
else {
    if (Config.LANG == 'TR' || Config.LANG == 'AZ') {
        conn.sendMessage(
            conn.user.jid,
            '_Görünüşe Göre Yanlış Bir Dil Ayarladınız._\_Kullanabileceğiniz Diller:_\n\n🔸 *TR - Türkçe* \n🔸 *AZ - Azerice* \n🔸 *en - İngilizce* \n🔸 *ml - Malayam Dili* \n🔸 *HI - Hintçe* \n🔸 *ES - İspanyolca* \n🔸 *ID - Endonezce* \n\n_Varsayılan Olarak Türkçe Ayarlıyorum.._',
            MessageType.text
        );

        var json = JSON.parse(fs.readFileSync('./language/TR.json'));
    }
    else {
        conn.sendMessage(
            conn.user.jid,
            '_It Looks Like You Set the Wrong Language._\n_Existing Languages:_\n\n🔸 *TR - Turkish* \n🔸 *AZ - Azerbaijani* \n🔸 *en - English* \n🔸 *ml - Malayam* \n🔸 *HI - Hindi* \n🔸 *ES - Spanish* \n🔸 *ID - Indonesian* \n\n_I Will Set English As Default.._',
            MessageType.text
        );

        var json = JSON.parse(fs.readFileSync('./language/EN.json'));
    }
}

function getString(file) {
    return json['STRINGS'][file];
}

module.exports = {
    language: json,
    getString: getString
}
