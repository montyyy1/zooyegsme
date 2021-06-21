const Discord = require("discord.js");
const db = require("quick.db");



module.exports = {
  name: "profile",

  aliases: "pro",
  async execute(message, args) {
    let user = message.mentions.members.first() || message.author;

    let money = db.fetch(`money_${user.id}`);
    if (money === null) money = 0;

    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;

    let verification = await db.fetch(`verification_${user.id}`);
    if (verification === null) verification = "none";
    if (verification === true) verification = "**<:sa3:806432285720051712><a:astersa:855360029565386792><a:astersa:855360029565386792><a:astersa:855360029565386792>__verification__<a:astersa:855360029565386792><a:astersa:855360029565386792><a:astersa:855360029565386792><:sa3:806432285720051712>**";

    let champion = await db.fetch(`champion_${user.id}`);
    if (champion === null) champion = "0";

    let car = await db.fetch(`car_${user.id}`);
    if (car === null) car = "0";

    let villa = await db.fetch(`villa_${user.id}`);
    if (villa === null) villa = "0";

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFB901")
  .setFooter("🌟Your profile is in Zooye")
    
      .setDescription(
        `**${user}\n\n __<a:hyhy:855350026615783424>Profile__**\n\n**<:para2:855359027839369267> Balance:** ${money}\n\n**<:rank:855360002542010368> Rank:** ${verification}\n\n**__<:sa3zard2:855359070177198111>Inventory__**\n\n**⭐champion:** ${champion}\n**🚗Cars:** ${car}\n**🏛️villa:** ${villa}`
      
      //**💸Bank:** ${bank}\n
        
    //  .addField('Nitro', member.premiumSince ? 'Yes' : 'No', true)
    // .setFooter(`• Requested by: ${member.user.tag}`,
   //   member.user.displayAvatarURL({ format: "png" })
    )
     // .setTimestamp();
   // message.channel.send(embed);
 
        

            message.channel.send(moneyEmbed);
              
  },
 };

  // }
// };
