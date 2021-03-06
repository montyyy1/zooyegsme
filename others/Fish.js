let db = require("quick.db");

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "fish",
  aliases: ["catchfish", "Z fish"],
  category: "economy",
  description: "Catch A Fish From A Vast Ocean",
  usage: "[list | rewards] (optional)",
  acessableby: "everyone",
  async execute(message, args) {
    let user = message.author;

    let bal = db.fetch(`money_${user.id}`);

    let fish = await db.fetch(`fish_${user.id}`);
    if (!args[0]) {
      if (bal === null) bal = 0;

      if (fish == null) fish = 0;

      const fishID = Math.floor(Math.random() * 10) + 1;
      let rarity;
      if (fishID < 5) rarity = ":next:781695568744546304 junk";
      else if (fishID < 8) rarity = "common";
      else if (fishID < 9) rarity = "uncommon";
      else if (fishID < 10) rarity = "rare";
      else rarity = "legendary";

      let timeout = 1800000;
      let fishtime = await db.fetch(`fishtime_${user.id}`);

      if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
        let time = db(timeout - (Date.now() - fishtime));

        let timeEmbed = new MessageEmbed()
          .setColor("#FFB901")
          .setDescription(
            `❌ You've Recently Casted A Line\n\nFish Again in ${time.minutes}m ${time.seconds}s `
          );
        return message.channel.send(timeEmbed);
      }

      let embed = new MessageEmbed()
        .setColor("#FFB901")
        .setDescription(
          `**🎣 You Cast Out Your Line And Caught A ${db.symbol}, I Bet It'd Sell For Around ${db}**!`
        );
      message.channel.send(embed);

      db.add(`money_${user.id}`, db);
      db.add(`fish_${user.id}`, 1);
      db.set(`fishtime_${user.id}`, Date.now());
    }
    if (args[0] === "list" || args[0] === "rewards") {
      let lEmbed = new MessageEmbed()
        .setColor("#FFB901")
        .setTitle(`List Of Fish Names And Rewards You Can Get`)
        .setDescription(
          `
\`\`\`🔧Junk      :: Max Reward: 5, Min Reward: 1
🐟Common    :: Max Reward: 25, Min Reward: 10
🐠Uncommon  :: Max Reward: 50, Min Reward: 18
🦑Rare      :: Max Reward: 75, Min Reward: 30
🐋Legendary :: Max Reward: 100, Min Reward: 50\`\`\`
**All reward are random from max/min**
​
`
        )
        .setFooter(message.guild.name, message.guild.iconURL());
      return message.channel.send(lEmbed);
    }
  }
};
