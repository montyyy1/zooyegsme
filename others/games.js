const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { PREFIX } = require(`../config.json`);

module.exports = {
  name: `game`,
  description: `Gives you a list of all help Commands`,
  aliases: ["g", "commands"],
  cooldown: 3,

  execute(message, args, client) {
    var SUPPORT = "https://discord.gg/7dnQrMKjQs";
    var site = "https://zooyebot.xyz";
    var Link =
      "https://discord.com/api/oauth2/authorize?client_id=762156775716945983&permissions=8&scope=bot";

    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(
        "**<:2AC4D5D1887E4F578049FCE123B5BD27:781910750100193301>Game's help menu**"
      )
      .setImage("")
      .setDescription(
        `** **[ Support](${SUPPORT})** | **[ Invite](${Link})** | **[ Site](${site})** 
        
๐ฐ?cash
**__To know the amount of money.__**
๐ธ?daily
**__you'll get a 200$-day all-day.__**
๐ด?week
**__Every week you get 5,000$.__**
โ?send
**__to send money for friends or any skewer.__**
๐ฐ?sl & slots
**__to slot,s game They will be lost on the money or they will succeed.__**
๐คนโโ๏ธ?rl & roulette
**__to roullete's game They will be lost on the money or they will succeed.__**
๐ช?cf & coinflip
**__to coinflip's game They will be lost on the money or they will succeed.__**
๐?zz
**__to react game They will be lost on the money or they will succeed.__**
๐?shop & buy
**__to shop and Buy and sell to the one that you have specified__.
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
