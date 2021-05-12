const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.some(r => [ayarlar.register].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
 
 let kullanıcı = message.mentions.users.first()
    
 
if(!kullanıcı) {

let erkek = db.fetch(`auth.${message.author.id}.erkek`);
let kadın = db.fetch(`auth.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`auth.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new MessageEmbed()
.setThumbnail(message.author.avatarURL ({ dynamic: true}))
.setAuthor(message.author.username, message.author.avatarURL)
.addField(`Toplam Kayıtların:`, `\`${kayıtlar}\``)
.addField(`Toplam Erkek Kayıtların:`, `\`${erkek}\``)
.addField(`Toplam Kadın Kayıtların:`, `\`${kadın}\``)
.setColor('#dcdd64')
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sorgu2 = new MessageEmbed()
.setThumbnail(kullanıcı.avatarURL ({ dynamic: true})) 
.setAuthor(`${kullanıcı.username}`)
.addField(`Toplam Kayıtların:`, `\`${kayıtlar1}\``)
.addField(`Toplam Erkek Kayıtların:`, `\`${erkek1}\``)
.addField(`Toplam Kadın Kayıtların:`, `\`${kadın1}\``)
.setColor('#dcdd64')
 return message.channel.send(sorgu2)
  
};
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat", "kayıtlar", "kayıt-kontrol","sorgu"],
    permLvl: 0,
}
  
exports.help = {  
  name: "stat"
}