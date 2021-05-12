const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args, ayar, emoji) => {


  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp();
  
  
  
  if(![ayarlar.chatsorumlusu].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));


  if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription("1-100 arasında silinecek mesaj miktarı belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  
  
  await message.delete().catch();
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`Başarıyla **${msjlar.size}** adet mesaj silindi!`)).then(x => x.delete({timeout: 5000}))).catch()
};
exports.conf = {
    aliases: ["sil", 'clear'],
    usage: "temizle 1-100",
    description: "Belirtilen mesaj sayısı kadar mesaj temizler."
}

exports.help = {
    name: "temizle",
};
