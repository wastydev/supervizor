const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

exports.run = (client, message, args) => {
  if(!message.member.roles.cache.has(ayarlar.allcommands) && !message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "⛔ Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız"
    );
  let wastyl = args[0];
  let wastyi = args[1];
  let guild = message.guild;
  if (!wastyl)
    return message.channel.send("Emojinin alınacağı linki girmelisin.");
  if (!wastyi) return message.channel.send("Emojinin ismini belirlemedin");

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Emoji Eklendi", message.guild.iconURL)
    .setDescription(` **${wastyi} İsmiyle Yeni Bir Emoji Oluşturuldu.**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);

  guild
    .emojis.create(`${wastyl}`, `${wastyi}`)
    .then(emoji => message.channel.send(embed));
  message.react("✅").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["addemoji", "emojioluştur", "ee"],
  permLevel: 0
};
exports.help = {
  name: "emojiekle",
  description: "Sunucuya emoji eklersiniz",
  usage: "emojiekle <link> <isim>"
};