const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const talkedRecently = new Set();

module.exports = {
  name: "montyhama",
  description: "flips a coin!",
  async execute(message, args) {
    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`);
    let money = parseInt(args[0]);
    let own = false;
   
  if (
      !["782425967439642655","744532565162983515", "719955045264654407", "782425967439642655"].includes(message.author.id)
    ) {
      message.channel.send("this command just Owner");
    } else {
  if (isNaN(args[0]) || parseInt(args[0]) > 50001) {
     message.channel.send("You can't use more than 50,000")
        } else {
    const choices = ["heads", "tails"];
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (choice === choices[0]) {
      own = true;
      money *= 1000;
    } else {
      money *= 1000;
      own = true;
    }
    if (own) {
      let embed = new MessageEmbed()
        ///message.channel.send(`you own ${money}`);
        .setTitle("Coinflip!")
        .setColor("#FFB901")
        .setDescription(`💰 you own ${money}`);

      db.add(`money_${user.id}`, money);
      message.channel.send(embed);
    } else {
      let embed = new MessageEmbed()
        .setTitle("Coinflip!")
        .setColor("#FFB901")
        .setDescription(`❌You Flipped A Lost !`);
      db.subtract(`money_${user.id}`, money);
      message.channel.send(embed);
    }
  }
    }
    }
    
};
