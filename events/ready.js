const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log("K O M U T L A R   Y Ü K L E N İ Y O R");
  console.log("B O T   A K T İ F");
  client.user.setStatus("online");
  client.user.setActivity(ayarlar.ready, { type: "WATCHING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
  console.log(``);

};
                                        // Type kısımları:
                                          // WATCHING - İZLİYOR
                                          // PLAYING - OYNUYOR
                                          // LISTENING - DİNLİYOR

                                                                               // Status kısımları:
                                                                                // online - çevrim içi
                                                                                // idle - boşta
                                                                                // dnd - rahatsız etmeyin

                                                 // name kısmına oynuyorunuzu yazabilirsiniz.
