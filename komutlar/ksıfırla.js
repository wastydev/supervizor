const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

module.exports.run = async (client, message, args) => {
  
if(![ayarlar.sahip, ayarlar.allcommands].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)

  
let bilgi = db.get(`auth.${member.id}`);  
db.delete(`auth.${message.author.id}.erkek`)
db.delete(`auth.${message.author.id}.toplam`)  
let toplami = db.fetch(`auth.${message.author.id}.toplam`)  

message.react('✅')

message.channel.send(new Discord.MessageEmbed().setAuthor(`Kayıt Sıfırlandı`).setColor("0x2f3136").setDescription(`${member} Adlı Kullanıcının Db'si Silindi, <@${message.author.id}> Tarafından Sıfırlandı.`))
  

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sıfırla", "kayıt-sıfırla", "kayıtları-sıfırla", "db-sıfırla", "dbisil", "db-sil"],
    permLevel: 0
};

exports.help = {
    name: "sıfırla"
}

