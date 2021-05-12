const dc = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, users, args) => {
  
if(!message.member.roles.cache.some(r => [ayarlar.register, ayarlar.allcommands].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")  

  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`auth.${uye.id}.toplam`);
let yazı = "Top Özellik Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`auth.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`auth.${uye2.id}.toplam`))-Number(db.get(`auth.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" -  <@"+ uye +"> | \`" + db.get(`auth.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("0x2f3136").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "top", "teyit", "top-teyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}