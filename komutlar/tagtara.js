const { MessageEmbed } = require("discord.js");
const wasty = require("../ayarlar.json");
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('yetkin yok')
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(wasty.footer)
    let tag = wasty.tag
    let tagrol = wasty.tagrol

    let taglılar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(tagrol))
    let tagsızlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag) && s.roles.cache.has(tagrol))

    taglılar.array().forEach((wasty, index) => {
        setTimeout(async() => {
            wasty.roles.add(tagrol)
        }, index * 1000)

    })
    tagsızlar.array().forEach((wasty, index) => {
        setTimeout(async() => {
            wasty.roles.remove(tagrol)
        }, index * 1000)
    })
    message.channel.send(embed.setDescription(`**${taglılar.size}** Kullanıcıya taglı rolü verilecek.\n **${tagsızlar.size}** Kullanıcıdan taglı rolü alınacak.`).setFooter(wasty.footer))

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["tagtara"],
    permLevel: 0,
    name: "tagtara"
  }
  
  exports.help = {
    name: "tagtara"
  };