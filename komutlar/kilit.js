const wasty = require("discord.js");

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return 
  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  let permObjesi = {};
  let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
  everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
  });
  everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
  });
  if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
   
    let kilitle = new wasty.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription('Kanal kilitlendi!')
    .setColor('#7289DA')
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send({embed:kilitle})
  } else {
    let kilit = new wasty.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    .setDescription('Kanal kilidi açıldı!')
    .setColor('#7289DA')
    permObjesi["SEND_MESSAGES"] = null;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send({embed:kilit});
  };
};
exports.conf = {
 enabled: true, 
  guildOnly: true, 
  aliases: ["kilit"], 
  permLevel: 0 
};

exports.help = {
  name: "kilit" 
};

