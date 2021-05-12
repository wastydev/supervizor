const wasty = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');
const wastyy = new wasty.MessageEmbed()
.setFooter("HATA!")
.setTimestamp()
.setColor("RANDOM")
 
let unregister = ayarlar.unregister
let yasaktag = ayarlar.yasaktag
let sunucutagi = ayarlar.tag
 
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      wastyy.setDescription(`Bu Komutu Kullanabilmek Için \`Yonetici\` Iznine Ihtiyacin Var.`)
      return message.channel.send(wastyy)
    }
    if(!args[0]) {
        wastyy.setDescription(`Bir Durum Belirtmen Gerekiyor **Ornek;**\n\`${ayarlar.prefix}yasak-tag <EKLE/LISTE/CIKAR> <TAG>\``)
        return message.channel.send(wastyy)
    }
    let durum = args[0]
    let tag = args.slice(1).join(' ')
    if(durum == "ekle"|| durum == "cikar" || durum == "liste" || durum == "listele" || durum == "cikar" || durum == "cikar") {
    if(durum == "liste" || durum == "listele") {
      let tanim = db.fetch(`yasaklitaglar_${message.guild.id}`)
      if(!tanim) db.set(`yasaklitaglar_${message.guild.id}`, [])
      if(tanim < 1) {
        const mesaj = new wasty.MessageEmbed()
        .setDescription(`Sunucumuzda herhangi yasaklanmis bir tag bulunmuyor.`)
        .setColor("RANDOM")
        return message.channel.send(mesaj)
      } else {
        let tanimm = tanim.map(aba => `Sunucuda \`${aba}\` tagini tasiyan **${message.guild.members.cache.filter(a => a.user.username.includes(aba)).size}** kullanici var . Suana kadar **${db.fetch(`yasaklitagengel_${message.guild.id}_${aba}`) || 0}** kullanci engellendi.`).join('\n')
        return message.channel.send(new wasty.MessageEmbed().setColor("RANDOM").setDescription(tanimm))
      }
    }
    if(durum == "ekle") {
      if(!tag) {
        wastyy.setDescription(`Bir Tag Belirtmen Gerekiyor **Ornek;**\n\`${ayarlar.prefix}yasak-tag <EKLE/LISTE/CIKAR> <TAG>\``)
        return message.channel.send(wastyy)
      }
      if(tag.includes(sunucutagi)) {
        wastyy.setDescription(`Yasaklamak Istedigin Tag Sunucumuzun Tagini Içermemeli.`)
        return message.channel.send(wastyy)
      }
      let tanim = db.fetch(`yasaklitaglar_${message.guild.id}`)
      if(!tanim) db.set(`yasaklitaglar_${message.guild.id}`, [])
      if(tanim.includes(tag)) {
        wastyy.setDescription(`Bu Tag Zaten Yasakli Taglar Arasinda Bulunyor.`)
        return message.channel.send(wastyy)
      }
      db.delete(`yasaklitagengel_${message.guild.id}_${tag}`)
      db.push(`yasaklitaglar_${message.guild.id}`, tag)
      let uyeler = message.guild.members.cache.filter(member => member.user.username.includes(tag))
      uyeler.forEach(uye => {
        uye.roles.cache.forEach(rol => {
          uye.roles.remove(rol.id)
        })
        uye.roles.add(yasaktag)
        try {
        uye.send(`${tag} Tagi Sunucumuzda Yasakli Listeye Girmistir Tagi Birakmadiginiz Sürece Sunucumuzun Kanallarina Eriseyemeceksiniz.`)
        } catch (e) {
          console.log(e)
        }
      })
      const mesaj = new wasty.MessageEmbed()
      .setDescription(`\`${tag}\` Sunucunun yasakli taglarina eklendi bu taga sahip **${uyeler.size}** kisiyi yasakli tag'a attim.`)
     .setColor("RANDOM")
     return message.channel.send(mesaj)
   }
   if(durum == "cikar" || durum == "cikar" || durum == "cikar") {
     if(!tag) {
        wastyy.setDescription(`Bir Tag Belirtmen Gerekiyor **Ornek;**\n\`${ayarlar.prefix}yasak-tag <EKLE/LISTE/CIKAR> <TAG>\``)
       return message.channel.send(wastyy)
     }
     let tanim = db.fetch(`yasaklitaglar_${message.guild.id}`)
     if(!tanim) db.set(`yasaklitaglar_${message.guild.id}`, [])
     if(tanim.includes(tag)) {
     const filtre = db.get(`yasaklitaglar_${message.guild.id}`).filter(x => x !== tag)
     db.set(`yasaklitaglar_${message.guild.id}`, filtre)
     let uyeler = message.guild.members.cache.filter(member => member.user.username.includes(tag))
     uyeler.forEach(uye => {
       uye.roles.cache.forEach(rol => {
         uye.roles.remove(rol.id)
       })
       uye.roles.add(unregister)
       try {
       uye.send(`${tag} Tagi Sunucumuzda Yasakli Taglar Listesinden Kalkmistir ve Siz de Bu Tagi Kullandiginiz Için Kayitsiza Atildiniz Kayit Olup Sunucumuzun Kanallarina Erisebilirsin.`)
       } catch (e) {
         console.log(e)
       }
     })
     const mesaj = new wasty.MessageEmbed()
     .setDescription(`\`${tag}\` Sunucunun yasakli taglarindan çikarildi bu taga sahip **${uyeler.size}** kisiyi yasakli tag'dan attim.`)
      .setColor("RANDOM")
      return message.channel.send(mesaj)
    } else {
        wastyy.setDescription(`Bu Tag Zaten Yasakli Taglar Arasinda Bulunmuyor.`)
      return message.channel.send(wastyy)
    }
    }
  } else {
    wastyy.setDescription(`Bir Durum Belirtmen Gerekiyor **Ornek;**\n\`${ayarlar.prefix}yasak-tag <EKLE/LISTE/CIKAR> <TAG>\``)
    return message.channel.send(wastyy)
  }
};
 
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yasaktag"],
    permLevel: 0,
    name: "yasaktag"
  }
  
  exports.help = {
    name: "yasaktag"
  };