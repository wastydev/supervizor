const Discord = require('discord.js');
const moment = require("moment");
const datab = require('quick.db');
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
const guild = message.member.guild
let executor = message.member
moment.locale("tr")  
if (!message.member.roles.cache.has(ayarlar.allcommands) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
const logkanal = message.guild.channels.cache.find(c => c.id === ayarlar.ytallog)

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let wastyuser = message.mentions.users.first()
if (!wastyuser) return message.channel.send(new Discord.MessageEmbed().addField("Hatalı Kullanım",`Lütfen Yetkisi Alınacak Kişiyi Etiketleyiniz`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
let user = message.mentions.users.first();
let rol = message.mentions.roles.first()
let member = message.guild.member(wastyuser)
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));



/// Permler

member.roles.remove("");




/// Roller

member.roles.remove("");



let yetkialinmatarihi = moment(message.createdAt).format("LLLL")

logkanal.send(
    new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`<@!${member.id}> **İsimli Kullanıcı** <@!${message.author.id}> **İsimli Yetkili Tarafından Yetkileri Alındı**
    • Yetki Alan: <@!${message.author.id}> \`${message.author.id}\`
    • Yetki Alınan: <@!${member.id}> \`${member.id}\`
    • Yetki Alınma Tarihi: \`${yetkialinmatarihi}\``)
    .setFooter(ayarlar.footer, client.user.avatarURL({dynamic: true}))
    )

let wasty = new Discord.MessageEmbed() 
.setColor("RANDOM")
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<@!${member.id}> **İsimli Kullanıcı** <@!${message.author.id}> **İsimli Yetkili Tarafından Yetkileri Alındı**
• Yetki Alan: <@!${message.author.id}> \`${message.author.id}\`
• Yetki Alınan: <@!${member.id}> \`${member.id}\`
• Yetki Alınma Tarihi: \`${yetkialinmatarihi}\``)
.setFooter(ayarlar.footer, client.user.avatarURL({dynamic: true}))
return message.channel.send(wasty).then(m => m.delete({timeout: 8000}))
      




}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ytal","yt-al"],
  permLevel: 0
}
exports.help = {
  name: "yetkili-al",
  description: "Yetkileri alır"
}