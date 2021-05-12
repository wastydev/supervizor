const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const database = require("quick.db");
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');


var prefix = ayarlar.prefix;


const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------TAG-ROL----------------------\\

client.on("userUpdate", async (user, yeni) => {
  var sunucu = client.guilds.cache.get(ayarlar.sunucuid); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = ayarlar.tag; // Buraya Ekip Tag
  var tagrol = ayarlar.tagrol; // Buraya Ekip Rolünün ID
  var logKanali = ayarlar.taglog; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || user.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı.`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı.`));
    } catch(err) { console.error(err) };
  };
});

//
// Tag aldığında rol verir, tag çıkardığında tag rolünü ve onun üstündeki her rolü alır!
//

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = ayarlar.sunucuid; //Buraya sunucunuzun IDsini yazın
  let tag = ayarlar.tag; //Buraya tagınızı yazın
  let rol = ayarlar.tagrol; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`<@${member.id}> taglı olarak girdi!`)
      .setTimestamp()
     client.channels.cache.get(ayarlar.taglog).send(tagalma) // taglog
}
})

/////////////////////////////////////////////////////////////

client.on("ready", async function() {
    client.channels.cache.get(ayarlar.botkanal).join()
    .catch(err => {
    throw err;
    })
    })


////////////////////////////////////////////////////////////// Snipe


client.on("messageDelete", async(message) => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let snipe = {
  mesaj: message.content,
  mesajyazan: message.author.id,
  ytarihi: message.createdTimestamp,
  starihi: Date.now(), 
  kanal: message.channel.id
  }
  await db.set(`snipe.${message.guild.id}`, snipe)
  }); 
  
  


//////////////////////////////////////////////////////////////////////


let yasaktag = ayarlar.yasaktag
let unregister = ayarlar.unregister
 
client.on('guildMemberAdd', member => {
    let yasaklitaglar = db.fetch(`yasaklitaglar_${member.guild.id}`)
    if(!yasaklitaglar) return db.set(`yasaklitaglar_${member.guild.id}`)
    yasaklitaglar.forEach(tag => {
        if(member.user.username.includes(tag)) {
            try {
                db.add(`yasaklitagengel_${member.guild.id}_${tag}`, 1)
                member.send(`${tag} Sunucumuzda ki Yasaklı Taglar Arasındadır Bu Tagı Bırakmadığın Sürece Sunucumuza Erişeyemeceksin.`)
                } catch (e) {
                console.log(e)
            }
            member.roles.cache.forEach(rol => {
                member.roles.remove(rol.id)
              })
              member.roles.add(yasaktag)
        }
    })
})
 
client.on('userUpdate', (oldUser, newUser) => {
    let yasaklitaglar = db.fetch(`yasaklitaglar_${message.guild.id}`)
    if(!yasaklitaglar) return db.set(`yasaklitaglar_${message.guild.id}`)
    if(oldUser.username !== newUser.username) {
        let member = client.guilds.cache.get(message.guild.id).members.cache.get(oldUser.id)
        yasaklitaglar.forEach(tag => {
            if(oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
                member.roles.cache.forEach(rol => {
                    member.roles.remove(rol.id)
                  })
                  member.roles.add(unregister)
                try {
                    member.send(`${tag} Tagını Adından Çıkardığın İçin Teşekkür Ederiz Eğer Adında Başka Yasaklı Tag Yoksa Kayıtsız'a Atılacaksın.`)
               } catch (e) {
                   console.log(e)
               }
               return;
           }
           if(!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
               member.roles.cache.forEach(rol => {
                   member.roles.remove(rol.id)
               })
               member.roles.add(yasaktag)
               try {
                   member.send(`${tag} Tagı Sunucumuzun Yasaklı Tagları Arasında Olduğundan Dolayı Sunucumuzun Kanallarına Erişimin Engellendi.`)
               } catch (e) {
                   console.log(e)
               }
               return;
           }
       })
       setTimeout( () => {
       yasaklitaglar.forEach(tag => {
           if(newUser.username.includes(tag)) {
               member.roles.cache.forEach(rol => {
                   member.roles.remove(rol.id)
                 })
                 member.roles.add(yasaktag)
           }
           return;
       })
       }, 1000)
   }
})


////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(async member => {
      const fetch = await database.fetch(member.user.id);
      if (!fetch) return;
      if (Date.now() <= fetch.end || fetch) {
        let kalan = fetch.end - Date.now();
        let logkanal = ayarlar.mutelog;
        let logChannel = await guild.channels.cache.get(logkanal);
        setTimeout(() => {
          const embed = new Discord.MessageEmbed().setAuthor(
            fetch.yetkiliUsername,
            fetch.yetkiliAvatarURL
          );
          return member.roles.remove(ayarlar.muterol).then(
            () =>
              database.delete(member.user.id) &&
              logChannel.send(
                embed.setColor("GREEN").setTitle("Susturulması açıldı!")
                  .setDescription(`**x Yetkili**: <@!${fetch.yetkiliID}>
**x Susturu açılan**: <@!${member.user.id}> `)
              )
          );
        }, kalan);
      }
    });
  });
});