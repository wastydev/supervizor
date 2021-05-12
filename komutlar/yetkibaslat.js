const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {


   if(!message.member.roles.cache.has(ayarlar.yetkialim) && !message.member.hasPermission("ADMINISTRATOR") ) 
     return message.channel.send('Yetkin yok moruk').then(x => x.delete({timeout: 6000}));
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('**Bir kişi etiketlemelisin!**').then(x => x.delete({timeout: 6000}));
   }
   let register = message.guild.roles.cache.find(r => r.id === ayarlar.register)//Viprolİd Koy
   let ilkrol = message.guild.roles.cache.find(r => r.id === ayarlar.ilkrol)

   
   if(!wasty) {
       return message.channel.send('Rol idleri bozuq aq').then(x => x.delete({timeout: 6000}));
   }

   let waq = message.guild.member(member)


   await waq.roles.add(register)
   await waq.roles.add(ilkrol)
  
   let embed = new Discord.MessageEmbed()
   .setColor('BLACK')
   .setTitle('YETKİ VERİLMİŞTİR')
   .setFooter(ayarlar.footer)
 message.channel.send(embed).then(x => x.delete({timeout: 6000}));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yetkili', "yetkibaşlat", "yetkibaslat"],
    permLevel: 0
};

exports.help = {
    name: 'yetkili',
    description: 'yetkili',
    usage: 'yetkili'
};