const Discord = require('discord.js');

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return;

if(!args[0]) return message.channel.send('Bir hata oluştu: Üyelerin bulunduğu kanalın ismini girmelisin.');
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[0])) return message.channel.send('Bir hata oluştu: '+args[0]+' isminde bir kanal bulamadım.');

if(!args[1]) return message.channel.send(`Bir hata oluştu: ${args[0]} kanalında ki üyeleri taşayacağım kanalın ismini yazmadın.`);
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[1])) return message.channel.send('Bir hata oluştu: '+args[1]+' isminde bir kanal bulamadım.');

let çekilecek = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[0])
let aktarılacak = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.name === args[1]);
if(çekilecek === aktarılacak) return message.channel.send('Bir hata oluştu: Üyelerin çekileceği kanalın üyelerin taşınacağı kanal ile aynı olmaması gerekiyor.');
interval = 4000,//dokunursanyarrayersin
increment = 1;
çekilecek.members.forEach(function(member)  {
var runner = setTimeout(function() {
member.voice.setChannel(aktarılacak.id);
clearTimeout(runner);
}, interval * increment);
increment = increment +1;
});

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["topluçek"],
  permLevel: 0
};
 
exports.help = {
  name: 'toplu-çek'
};