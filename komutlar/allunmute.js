const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const wasty = require("../ayarlar.json");

exports.execute = async (client, message, args) => {
 
    if(!message.guild) return;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.footer).setColor("RANDOM");

   
    if(!message.member.roles.cache.has(wasty.sahip))
    if(message.author.id !== client.config.sahip)
    if(!message.member.roles.cache.has(wasty.sahip)) return  message.react(":x:");

    if(!message.member.voice.channel)return message.channel.send(embed.setDescription(`:x: Bir ses kanalında **bulunmuyorsun!**`)).then(x => x.delete({timeout: 10000}));


    let kanal = message.member.voice.channel.id

    if(!kanal) return message.channel.send(embed.setDescription(`Bir ses kanalında **bulunmuyorsun!**`))
    if(!message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id).size <= 0) return message.channel.send(embed.setDescription(`:x: Bulunduğun kanalda senden başkası **bulunmuyor!**`)).catch(e => { })

    let firstChannelMembers = message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id);

    firstChannelMembers.forEach((x, i) => {
    setTimeout(async () => {
        x.voice.setMute(false)
    }, i*200)
    })
   
  await message.channel.send(embed.setDescription(`**${message.guild.channels.cache.get(kanal).name}** Adlı kanaldaki \`${firstChannelMembers.length}\` üyelerin susturulmasını kaldırdım!`)).catch(e => { })
  message.react("✅")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["allunmute", "all-unmute"],
    permLevel: 4
};

exports.help = {
    name: "allunmute"
}