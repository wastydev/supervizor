const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const wasty = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
 
    if(!message.guild) return;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(wasty.footer).setColor("RANDOM");


    if(!message.member.roles.cache.has(wasty.sahip)) return  
    if(message.author.id !== client.config.sahip)
    message.react(client.config.emoji.red);
    if(!message.member.voice.channel) return message.channel.send(embed.setDescription(`:x: Bir ses kanalında **bulunmuyorsun!**`)).then(x => x.delete({timeout: 10000}));
    let kanal = message.member.voice.channel.id
    let firstChannelMembers = message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id);

    firstChannelMembers.forEach((x, i) => {
    setTimeout(async () => {
        x.voice.setMute(true).catch(e => { })
    }, i*200)
    })
   
    await message.channel.send(embed.setDescription(`**${message.guild.channels.cache.get(kanal).name}** Adlı kanaldaki \`${firstChannelMembers.length}\` üyeler susturuldu!`)).catch(e => { })
    message.react(client.config.emoji.onay)
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["allmute", "all-mute"],
    permLevel: 4
};

exports.help = {
    name: "allmute"
}