const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');

module.exports.run = async(client, message, args) => {
 
if(![ayarlar.allcommands].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed().setDescription(`Komutu kullanmak için yetkiniz bulunmamakta.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('#c42828')).then(x => x.delete({timeout: 5000}));    
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli Bir Kullanıcı Etiketlemelisin !`).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}))
if(message.member.roles.highest.position <= member.roles.highest.position) return 

let digerroller = [];
member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
member.roles.remove(digerroller)

await member.roles.add(ayarlar.unregister)
await member.setNickname(`İsim ' Yaş`) // kayıtsıza atınca isim yaş yapan kısım


message.channel.send(new MessageEmbed().setDescription(`${member} Adlı Kullanıcı ${message.author} Tarafından Kayıtsız'a Atıldı !`)).then(msg => msg.delete({timeout: 4000}))}



exports.conf = { enabled: true, guildOnly: true , aliases: ["kayıtsız", "unregister"]}
exports.help = { name: "kayıtsız"}