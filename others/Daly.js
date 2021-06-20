const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  aliases: ["d", "Z daily"],
  category: "economy",
  description: "Gives You 200 per day",
  usage: " ",
  accessableby: "everyone",
  async execute(message, args) {
    let user = message.author;

    let timeout = 86400000;
    let amount = 200;

    let daily = await db.fetch(`daily_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(
          `❌ You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(
          `✅ You've collected your daily reward of ${amount} coins`
        );
      message.channel.send(moneyEmbed);
      db.add(`money_${user.id}`, amount);
      db.set(`daily_${user.id}`, Date.now());
    }
  }
};
