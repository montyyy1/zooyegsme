const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "balance",
  aliases: ["cash", "Z cash"],
  category: "economy",
  description: "Shows Current Balance",
  usage: "[username | nickname | mention | ID](optional)",
  accessableby: "everyone",
  async execute(message, args) {
  //  let user = message.mentions.members.first() || message.author;
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

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;
    let Total = bal + bank;

    if (user) {
      let moneyEmbed = new MessageEmbed()
        .setColor("#FFB901")
        .setFooter("🌟Your balance is in Zooye")
        .setDescription(
          `**__<a:astersa:855360029565386792> ${user.user.username}__ 
        
 **\n<:para1:855359124632240158> **Cash :**  __$${bal}__`
        );
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }
  }
};
///\n\n**💰Total:**  ${Total}
