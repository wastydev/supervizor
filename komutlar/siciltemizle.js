const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const ayarlar = require("../ayarlar.json")
const kdb = new data.table("kullanici");
exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\

if(![ayarlar.allcommands].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
//-------------------------------------------------------------------------------\\
  
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));

if (!member) {
let sicil = kdb.delete(`kullanici.${member.id}.sicil`) || [];
message.channel.send(new MessageEmbed().setColor('0x348f36').setDescription(`${message.author} Sana Ait Sicil Verilerini Sildim!`))
}
  
if(member) {
let sicil = kdb.delete(`kullanici.${member.id}.sicil`) || [];
message.channel.send(new MessageEmbed().setColor('0x348f36').setDescription(`${member} Kullanıcısına Ait Sicil Verilerini Sildim!`))

};
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sicil-sıfırla", "sicil-temizle"],
  PermLevel: 0
};

 

exports.help = {
  name: "sicil-sıfırla",
  description: "",
  usage: ""
};