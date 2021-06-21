const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { PREFIX } = require(`../config.json`);

module.exports = {
  name: `shop`,
  description: `Gives you a list of all help Commands`,
  aliases: ["shop", "commands"],
  cooldown: 3,

  execute(message, args, client) {
    var SUPPORT = "https://discord.gg/7dnQrMKjQs";
    var site = "https://zooyebot.xyz";
    var Link =
      "https://discord.com/api/oauth2/authorize?client_id=762156775716945983&permissions=8&scope=bot";

    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(
        "**<:2AC4D5D1887E4F578049FCE123B5BD27:781910750100193301>Shop help menu**"
      )
      .setImage("")
      .setDescription(
        `** **[ Support](${SUPPORT})** | **[ Invite](${Link})** | **[ Site](${site})** 
        
<:sa3zard2:855359070177198111>?buy Verification 
**Verification accuant VIP For 100,000000 Coins.
**<a:kass:855358949841436692>?buy champion**
 A New champion For 50,0000 Coins.
**🚘?buy car**
Fresh car For 200,000 Coins.
**<:public:855359832697077760>?buy villa**
A Mansion For 500,0000 Coins.

`
      )

      .setColor("#FFB901");

    if (!message.guild) {
      if (!args[0]) {
        message.react("<a:next:781695568744546304>");
        return message.author.send(helpEmbed);
      }
      return;
    }
    //  message.react("<a:next:781695568744546304>");
    //  message.channel.send(
    //  new MessageEmbed().setColor("#FFB901")
    //.setDescription(`**<:757206135974658058:781653344942555137> ${message.author}  Prefix:\`${PREFIX}\` Join a voice channel and \`${PREFIX}play\` a song.\
    //**`)
    // );

    if (!message.guild) return message.channel.send(helpEmbed);
    message.channel.send(helpEmbed);
  }
};
