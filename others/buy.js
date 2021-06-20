const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "buy",
  noalias: ["Z buy"],
  category: "economy",
  description: "buys items",
  usage: "[item]",
  accessableby: "everyone",
  async execute(message, args) {
    let user = message.author;

    let buy = await db.fetch(`buy_${user.id}`);

    let author = db.fetch(`money_${user.id}`);

    let Embed = new MessageEmbed()
      .setColor("#FFB901")
      .setDescription(`❌ You need 100,00000 coins to purchase verification VIP`);

    if (args.join(" ").toLocaleLowerCase() == "verification") {
      if (author < 100000000) return message.channel.send(Embed);

      await db.fetch(`verification_${user.id}`);
      db.set(`verification_${user.id}`, true);
  db.subtract(`money_${user.id}`, 100000000);
      let Embed2 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`✅ Purchased verification VIP For 100,000000 Coins`);

      ///db.subtract(`money_${user.id}`, 200);
      message.channel.send(Embed2);
    } else if (args.join(" ").toLocaleLowerCase() == "champion") {
      let Embed3 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`❌ You need 50,000 coins to purchase some Nikes`);

      if (author < 50000) return message.channel.send(Embed3);

      await db.fetch(`champion_${user.id}`);
      db.add(`champion_${user.id}`, 1);

      let Embed4 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`✅ Purchased Fresh Champin For 50,000 Coins`);

      db.subtract(`money_${user.id}`, 200000);
      message.channel.send(Embed4);
    } else if (args.join(" ").toLocaleLowerCase() == "car") {
      let Embed5 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`❌ You need 200,000 coins to purchase a new car`);

      if (author < 200000) return message.channel.send(Embed5);

      await db.fetch(`car_${user.id}`);
      db.add(`car_${user.id}`, 1);

      let Embed6 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`✅ Purchased A New Car For 200,000 Coins`);

      db.subtract(`money_${user.id}`, 500000);
      message.channel.send(Embed6);
    } else if (args.join(" ").toLocaleLowerCase() == "villa") {
      let Embed7 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`❌ You need 500,000 coins to purchase a villa`);

      if (author < 500000) return message.channel.send(Embed7);

      await db.fetch(`villa{user.id}`);
      db.add(`villa_${user.id}`, 1);

      let Embed8 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(`✅ Purchased A villa For 500,000 Coins`);

      db.subtract(`money_${user.id}`, 500000);
      message.channel.send(Embed8);
    } else {
      let embed9 = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(
          `❌ Enter An Item To Buy!\nType ${buy}shop To See List Of Items!`
        );
      return message.channel.send(embed9);
    }
  }
};
