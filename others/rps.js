const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const discord = require("discord.js");
module.exports = {
  name: "zz",
  description: "play a game of rock, paper and scissors",
  async execute(message, args, bot, SUPPORT, Link, site) {
    
     let user =
     message.mentions.members.first() || 
     message.guild.members.cache.get(args[0]) ||
     message.guild.members.cache.find(
       r =>
         r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
     ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
     ) ||
      message.member;
    
    
  //  let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`);
    let money = parseInt(args[0]);
    let own = false;
 if (isNaN(args[0]) || parseInt(args[0]) > 50000) {
     message.channel.send("You can't use more than 50,000")
        } else {
    let embed = new discord.MessageEmbed()
     //.setDescription( "What’s the My color?  ")
    .setDescription(
`** **[ 💙Blue](${SUPPORT})** | **[ 💚Green](${Link})** | **[Orange🧡](${site})** 

**   __What’s the My color?__





`
      )
      .setTitle(` ${user.user.username} `)
      .setColor("#FFB901")
      //.setDescription("React to play!")
      .setTimestamp();
    let msg = await message.channel.send(embed);
    await msg.react("🧡");
    await msg.react("💚");
    await msg.react("💙");

    const filter = (reaction, user) => {
      return (
        ["🧡", "💚", "💙"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    const choices = ["🧡", "💚", "💙"];
    const me = choices[Math.floor(Math.random() * choices.length)];
    msg
      .awaitReactions(filter, { max: 1, time: 60000, error: ["time"] })
      .then(async collected => {
        const reaction = collected.first();
        let result = new discord.MessageEmbed()

          //.setTitle("RESULT")
          .setColor("#FFB901")
           .setTitle(` ${user.user.username} `)
          .addField("Your choice", `${reaction.emoji.name}`)
          .addField("My choice", `${me}`);
        await msg.edit(result);
        if (
          (me === "🧡" && reaction.emoji.name === "💚") ||
          (me === "💙" && reaction.emoji.name === "🧡") ||
          (me === "💚" && reaction.emoji.name === "💙")
        ) {
          //   message.reply("You lost!")
          own = false;
          money *= 2;
        } else if (me === reaction.emoji.name) {
          let embed = new MessageEmbed()
            .setColor("#FFB901")
            //.setDescription(`❌Tray Agin`);
          message.channel.send(embed);
        } else {
          own = true;
          money *= 2;
        }
        if (own) {
          let embed = new MessageEmbed()
            .setColor("#FFB901")
            .setDescription(`💰 you own ${money}`);
          db.add(`money_${user.id}`, money);
          message.channel.send(embed);
        } else {
          let embed = new MessageEmbed()
            .setColor("#FFB901")
            .setDescription(`❌ You lost! ${money}`);

          db.subtract(`money_${user.id}`, money);
          message.channel.send(embed);
        }
      });
  }
    }
};
