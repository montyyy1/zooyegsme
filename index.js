const discord = require("discord.js");
const commando = require("discord.js-commando");
const config = require("./config.json");
const fs = require("fs");



///////////

///////////
const ascii = require("ascii-table");
const Keyv = require("keyv");
const { default_prefix } = require("./config.json");
const {
  Client,
  Collection,
  MessageEmbed,
  MessageAttachment
} = require(`discord.js`);

const canva = require("canvas");
const ytsr = require("youtube-sr");

const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const { TOKEN, PREFIX } = require(`./config.json`);
const figlet = require("figlet");
const db = require("quick.db");
const ms = require("parse-ms");
const moment = require("moment");
const client = new Client({
  disableMentions: ``,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
client.login("NzYyMTU2Nzc1NzE2OTQ1OTgz.X3lDzw.qrypCtP48Oh9U2aeuCX08inwNFk");
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on("message", boyka => {
  console.log(boyka.content);
});

client.on("ready", () => {
  setInterval(() => {
    const statuses = [
      `${PREFIX}help | zooyebot.xyz`,

      `User${client.guilds.cache.reduce(
        (a, g) => a + g.memberCount,
        0
      )} Guldis ${client.guilds.cache.size} `
    ];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    console.log(
      `${client.user.username} ready! ,Users ${client.guilds.cache.reduce(
        (a, g) => a + g.memberCount,
        0
      )}, Guilds ${client.guilds.cache.size}`
    );
    //client.user.setActivity(`%help ,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}, Guilds ${client.guilds.cache.size}`);
    client.user.setActivity(status, { type: "PLAYING" });
  }, 5000);
});
/////////////////////////////// const statuses = [

const { GiveawaysManager } = require("discord-giveaways");

// Starts updating currents giveaways

const manager = new GiveawaysManager(client, {
  // storage: "./handlers/giveaways.json",

  updateCountdownEvery: 10000,

  default: {
    botsCanWin: false,

    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],

    embedColor: "#FFB901",

    reaction: "🎉"
  }
});
///////////////////////////////////////////





////////////////////////////////////////

////////////////////////////////////////

client.on("message", async MONTY => {
  if (MONTY.content === "?ku cv") {
    let title = "";
    let fillter = m => m.author.id === MONTY.author.id;

    await MONTY.channel.send("**تایتڵی سەرەوەی سیڤی بنوسە**").then(e => {
      MONTY.channel.awaitMessages(fillter, { time: 60000, max: 1 }).then(co => {
        title = co.first().content;
        co.first().delete();

        let desc = "";

        e.edit("**تەواوی سیڤیەکە بنوسە**").then(e => {
          MONTY.channel
            .awaitMessages(fillter, { time: 60000, max: 1 })

            .then(co => {
              desc = co.first().content;
              co.first().delete();

              let url = "";
              e.edit(
                "لینکێک بنێرە بۆ دانانی لەگەڵ تایتڵی سیڤی..واتا تایتڵەکە شین بێت "
              ).then(e => {
                MONTY.channel
                  .awaitMessages(fillter, { time: 60000, max: 1 })
                  .then(co => {
                    url = co.first().content;
                    co.first().delete();

                    let thmb = "";
                    e.edit("لینکی وێنە بچوک کراوەکەی سەرەوە بنێرە").then(e => {
                      MONTY.channel
                        .awaitMessages(fillter, { time: 60000, max: 1 })
                        .then(co => {
                          thmb = co.first().content;
                          co.first().delete();

                          let img = "";
                          e.edit("لینکی وێنە گەورەکە ناو سیڤی بنێرە").then(
                            e => {
                              MONTY.channel
                                .awaitMessages(fillter, { time: 60000, max: 1 })
                                .then(co => {
                                  img = co.first().content;
                                  co.first().delete();

                                  let fotr = "";
                                  e.edit(
                                    "ناو یان تێکستێک بنێرە بۆ دانانی لە کۆتای سیڤیەکە بە بچوک کراوەیی"
                                  ).then(e => {
                                    MONTY.channel
                                      .awaitMessages(fillter, {
                                        time: 60000,
                                        max: 1
                                      })
                                      .then(co => {
                                        fotr = co.first().content;
                                        co.first().delete();
                                        let fotr2 = "";

                                        e.edit(
                                          "**لینکی وێنەیەک بنێرە بۆ دانانی لە کۆتایی سیڤیەکە بە بچوک کراوەیی**"
                                        ).then(e => {
                                          MONTY.channel
                                            .awaitMessages(fillter, {
                                              time: 60000,
                                              max: 1
                                            })

                                            .then(co => {
                                              fotr2 = co.first().content;
                                              co.first().delete();

                                              e.edit("Done").then(e => {
                                                let embed = new MessageEmbed()
                                                  .setTitle(title)

                                                  .setURL(url)
                                                  .setDescription(desc)
                                                  .setImage(img)
                                                  .setThumbnail(thmb)
                                                  .setColor("#FFB901")
                                                  .setFooter(fotr, fotr2)
                                                  .setTimestamp();

                                                MONTY.channel.send(embed);
                                              });
                                            });
                                        });
                                      });
                                  });
                                });
                            }
                          );
                        });
                    });
                  });
              });
            });
        });
      });
    });
  }
});
//////////////////////

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "・┊welcome"
  );
  let DarkMan = member.user.avatarURL();
  if (!channel) return;
  const joinembed = new discord.MessageEmbed()
    .setTitle(``)
    .setImage(
      "https://cdn.discordapp.com/attachments/838086634142302208/848206279964098560/image0-1.gif"
    )

    .setAuthor(
      `Welcome Bot`,
      `https://cdn.discordapp.com/avatars/828218881989935105/479953e51dadf4f38c5bc72c912193c5.webp?size=1024`
    )
    .setColor("RANDOM")
    .setThumbnail(DarkMan)
    .addField(
      "**name** : ",
      `${member}
    ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField(
      "**Welcome**",
      `Welcome to the server, ${member}
    ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField("**ID** :", "**[" + `${member.id}` + "]**")
    .addField(
      "**All Member**",
      `${member.guild.memberCount}
      ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp()
    .setFooter(`${member.guild.name}`)
    .setTimestamp();
  channel.send(joinembed);
});
////////////// code left
client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "・┊left"
  );
  let DarkMan = member.user.avatarURL();
  if (!channel) return;
  const joinembed = new discord.MessageEmbed()
    .setTitle(``)
    .setAuthor(
      `Welcome Bot`,
      `https://cdn.discordapp.com/avatars/828218881989935105/479953e51dadf4f38c5bc72c912193c5.webp?size=1024`
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/755636694035857438/758974172658663424/20200923_140354.gif"
    )
    .setColor("RANDOM")
    .setThumbnail(DarkMan)
    .addField("**name :**", `${member}`)
    .addField("Bye Bye", `!`)
    .addField("👋;(", "bye bye")
    .addField("All Memebers", `${member.guild.memberCount}` + "member")
    .setFooter(`${member.guild.name}`)
    .setTimestamp();
  channel.send(joinembed);
});
/////////////// code embed
client.on("guildMemberAdd", member => {
  const joinembed = new discord.MessageEmbed()

    .setColor("RANDOM")
    .setTitle(`__**A new member just arrived!**__`)
    .addField(
      " name : ",
      `${member}
    ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField(
      "Welcome",
      `Welcome to the server, ${member}
    ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField(" User :", "**[" + `${member.id}` + "]**")
    .addField(
      "Your are the member",
      `${member.guild.memberCount}
      ◈ ━━━━━━━ ⸙ ━━━━━━━ ◈`
    )
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/838086634142302208/848206279964098560/image0-1.gif"
    )
    .setFooter(`${member.guild.name}`)
    .setTimestamp();
  member.send(joinembed);
});
/////////////////

//////////////////////
client.on("message", async MONTY => {
  if (MONTY.content === "?en cv") {
    let title = "";
    let fillter = m => m.author.id === MONTY.author.id;

    await MONTY.channel.send("** Write Title....  **").then(e => {
      MONTY.channel.awaitMessages(fillter, { time: 60000, max: 1 }).then(co => {
        title = co.first().content;
        co.first().delete();

        let desc = "";

        e.edit("**Write alls title**").then(e => {
          MONTY.channel
            .awaitMessages(fillter, { time: 60000, max: 1 })

            .then(co => {
              desc = co.first().content;
              co.first().delete();

              let url = "";
              e.edit("**send url & link for title**").then(e => {
                MONTY.channel
                  .awaitMessages(fillter, { time: 60000, max: 1 })
                  .then(co => {
                    url = co.first().content;
                    co.first().delete();

                    let thmb = "";
                    e.edit("**send Thumbanil (small top right)**").then(e => {
                      MONTY.channel
                        .awaitMessages(fillter, { time: 60000, max: 1 })
                        .then(co => {
                          thmb = co.first().content;
                          co.first().delete();

                          let img = "";
                          e.edit("**Image url (big at the bottom)**").then(
                            e => {
                              MONTY.channel
                                .awaitMessages(fillter, { time: 60000, max: 1 })
                                .then(co => {
                                  img = co.first().content;
                                  co.first().delete();

                                  let fotr = "";
                                  e.edit("**Name Footer?**").then(e => {
                                    MONTY.channel
                                      .awaitMessages(fillter, {
                                        time: 60000,
                                        max: 1
                                      })
                                      .then(co => {
                                        fotr = co.first().content;
                                        co.first().delete();
                                        let fotr2 = "";

                                        e.edit("**Footer icon**").then(e => {
                                          MONTY.channel
                                            .awaitMessages(fillter, {
                                              time: 60000,
                                              max: 1
                                            })

                                            .then(co => {
                                              fotr2 = co.first().content;
                                              co.first().delete();

                                              e.edit("Done").then(e => {
                                                let embed = MessageEmbed()
                                                  .setTitle(title)

                                                  .setURL(url)
                                                  .setDescription(desc)
                                                  .setImage(img)
                                                  .setThumbnail(thmb)
                                                  .setColor("#FFB901")
                                                  .setFooter(fotr, fotr2)
                                                  .setTimestamp();

                                                MONTY.channel.send(embed);
                                              });
                                            });
                                        });
                                      });
                                  });
                                });
                            }
                          );
                        });
                    });
                  });
              });
            });
        });
      });
    });
  }
});
////
client.on("message", msg => {
  let text = "slaw";
  let text2 = "hello";
  if (msg.content === "edit") {
    msg.channel.send(text).then(message => {
      setTimeout(() => {
        message.edit(text2);
      }, 2000);
    });
  }
});
client.on("guildMemberAdd", async member => {
  let welcomeChannel = db.fetch(`welcome_${member.guild.id}`);
  if (welcomeChannel === null) return;
  const channel = member.guild.channels.cache.find(
    ch => ch.id === welcomeChannel
  );
  let joinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  if (joinMsg === null) {
    db.set(
      `joinmsg_${member.guild.id}`,
      `Welcome {member:mention} to **{server:name}**\nInvite by: {inviter:members}\nInvite: {invite:counter} \nInvite Create : {member:createdAt}\nTotal {server:members} Member In Server `
    );
  }

  let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  let content = newJoinMsg
    .replace(/{member:mention}/g, `<@${member.user.id}>`)
    .replace(/{member:name}/g, `${member.user.username}`)
    .replace(/{member:id}/g, `${member.user.id}`)
    .replace(/{member:tag}/g, `${member.user.tag}`)
    .replace(
      /{member:createdAt}/g,
      `${moment(member.user.createdAt).format("LLLL")}`
    )
    .replace(/{server:name}/g, `${member.guild.name}`)
    .replace(/{server:members}/g, `${member.guild.members.cache.size}`)
    //   .replace(/{invite:counter}/g, `${usedInvite.uses}`)
    // .replace(/{inviter:members}/g, `<@${usedInvite.inviter.id}>`)
    .replace(/{server:members}/g, `${member.guild.members.cache.size}`);

  let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(content)
    .setTimestamp();
  if (channel) {
    channel.send(embed).catch(err => console.log(err));
  }
});

///////////////////////////////////////////////////

client.on("guildCreate", guild => {
  let embed = new discord.MessageEmbed()
    .setColor("#FFB901")
    .setDescription(`Thanks for adding Zooye, I wish you luck!`);

  guild.owner.send(embed);
});

//////////////////////////////////////////////////

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "info")) {
    let Dashboard =
      "https://discord.com/api/oauth2/authorize?client_id=762156775716945983&permissions=8&scope=bot";
    let inline = true;
    message.channel.send({
      embed: new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.displayAvatarURL())

        .setColor("#FFB901")
        .setTitle("BOT INFO")
        .setDescription(
          `                                                                                                               
  
**<a:astersa:855360029565386792> | [__invite bot__](${Dashboard})**`
        )

        //  .addField(
        //  "My Ping",
        //   [`${Date.now() - message.createdTimestamp}` + "MS"],
        //  true
        //   )
        .setAuthor(" ", client.user.displayAvatarURL())
        .addField(
          "**Users**",
          ` ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} `,
          true
        )
        .addField(
          "**servers**",
          `${client.guilds.cache.size}`,
          true
        )
        .addField(
          "**channels**",
          ` ${client.channels.cache.size} `,
          true
        )
        //  .addField("My Name", ` ${client.user.tag} `, true)
        .addField(
          "**My ID**",
          ` ${client.user.id} `,
          true
        )
      //  .addField("My Prefix", ` ${PREFIX} `, true)
      //  .addField("Bot Library", "Discord.js", inline)
    });
  }
});
////////////////////////////////////////////////

client.on("message", message => {
  if (message.content.startsWith("?help")) {
    let help = new discord.MessageEmbed()
      .setColor("#FFB901")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .setFooter("Thanks for adding Zooye,").setDescription(`
**<a:slaw:855359878696140830> [Hello From Zooye](https://zooyebot.xyz/)**
 
**__<:public2:855367405957808158> admin__**
<:sa333:855366066762285087>︙?setup - ?back-up - ?kick - ?ban 
<:sa333:855366066762285087>︙?say - ?poll - ?setsug - ?en cv
<:sa333:855366066762285087>︙?ku cv - ?clear

**__<a:kass:855358949841436692> game__**
💰︙?daily - ?cash - ?send - ?week  
💰︙?sell - ?buy - ?shop - ?profile
🎮︙?zz - ?cf - ?roulette - ?slots

**__<:public:855359832697077760> public__**
🤹‍♂️︙?invite - ?support - ?info - ?ping
🤹‍♂️︙?uptime - ?serverinfo - ?game  


**<:add:855359850229530655> Zooye's Links**

 [Invite bot ](https://discord.com/oauth2/authorize?client_id=762156775716945983&permissions=8&scope=bot) | [Zooye's Server](https://discord.gg/XrPH6tHuPv) 🔗`);

    message.channel.send(help);
  }
});

///////////////////////////////////////////////
///////////client.on("message", message => {
/// if (message.content.startsWith("?slot")) {
/// let slot1 = ["🖤", "🤍", "❤️", "🖤", "💜", "💛", "❤️", "🧡"];
//   let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
///   let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
////   let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
///   let we;
//   if (slots1 === slots2 && slots2 === slots3) {
///     we = "<:770184527045722142:781695655508443188>  !win";
///  } else {
///we = "<:770184527141404682:781695677981392948>  !lost";
/// }
///message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`);
// }
//});

/////////////////////////////////
////////////IFCHEMPTY//////////
//remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!

////////////////////////////////

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let data = await canva.welcome(member, {
    link:
      "https://media.discordapp.net/attachments/816863591072399393/830028753764614174/7d245938cadd95456a73e9dd93772e5e.gif"
  });

  const attachment = new discord.MessageAttachment(
    data,

    "welcome-image.png"
  );

  client.channels.cache
    .get(chx)
    .send("Welcome to our Server " + member.user.username, attachment);
});

////////////////////////////////

const { giveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const Manager = new GiveawaysManager(client, {
  // storage: "./handlers/giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

client.on("message", async message => {
  if (!message.guild) return;
  let prefix = db.get(`default_prefix${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(default_prefix)) return;
});

///////////////

//DO NOT TOUCH
client.on(`warn`, info => console.log(info));
//DO NOT TOUCH
client.on(`error`, console.error);
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter(file =>
  file.endsWith(`.js`)
);
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter(file =>
  file.endsWith(`.js`)
);
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH

var SUPPORT = "https://discord.gg/7dnQrMKjQs";
var Link =
  "ttps://discord.com/api/oauth2/authorize?client_id=762156775716945983&permissions=1878523713&scope=bot";

client.on(`message`, async message => {
  if (message.author.bot) return;

  ///// if (message.content === `${PREFIX}ping`)
  // return message.reply(":ping_pong: `" + client.ws.ping + "ms`");

  //  if (message.content.toLowerCase() === `${PREFIX}uptime`) {
  //   let days = Math.floor(client.uptime / 86400000);
  // let hours = Math.floor(client.uptime / 3600000) % 24;
  //  let minutes = Math.floor(client.uptime / 60000) % 60;
  //   let seconds = Math.floor(client.uptime / 1000) % 60;
  //  return message.channel.send(
  // `***__Music-Bot-Uptime:__***\n\`\`\`fix\n${days}d ${hours}h ${minutes}m ${seconds}s\n\`\`\``
  //   );
  // }
  ////////////////-////

  ///////////////////////
  if (message.content.includes(client.user.id)) {
    message.reply(
      new MessageEmbed()
        .setTitle(
          `Join a voice channel and \`${PREFIX}play\` a song.
Type \`${PREFIX}help\`  for the list of commands.`
        )
        .setColor("#FFB901")
        .setDescription(`** **[ Support](${SUPPORT})** | **[ Invite](${Link}) `)
    );
  }
  //command Handler DO NOT TOUCH
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        new MessageEmbed()
          .setColor("#FFB901")
          .setTitle(
            `❌ Please wait \`${timeLeft.toFixed(
              1
            )} seconds\` before reusing the \`${PREFIX}${command.name}\`!`
          )
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message
      .reply(`There was an error executing that command` + error.message)
      .catch(error.message);
  }
});
function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
