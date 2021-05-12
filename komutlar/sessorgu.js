const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
//-------------------------------------------------------------------------------\\
  
if(![ayarlar.allcommands].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\  
  
  
let wasty;
let wastyyy = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
let wastyy = message.guild.members.cache.get(args[0]);
if(!wastyyy) return message.channel.send(new MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription(`**Bir ID Girmelisin Veya Kullanıcı Etiketlemelisin**`))
if (wastyyy) {
wasty = wastyyy;
}
if (wastyy) {
wasty = wastyy;
}
if (!wasty) {
wasty = message.member;
}
let wastyses = wasty.voice.channel;
if (!wastyses) {
message.channel.send(new MessageEmbed().setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(":x: **<@"+wasty.id+"> Bir Sesli Kanalda Değil!**"));
}
if (wastyses) {
message.channel.send(new MessageEmbed().setColor('#7289D').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(
"**<@"+wasty.id+"> İsimli Kişi `"+wastyses.name+"` İsimli Kanalda!**"
));
}};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sorgula","sessorgula","sorgu"],
    permLevel: 0,
    name: "ses-sorgu",
  }
  
  exports.help = {
    name: "ses-sorgu"
  };