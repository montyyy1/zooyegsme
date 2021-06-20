const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { PREFIX } = require(`../config.json`);

module.exports = {
  name: `admin`,
  description: `Gives you a list of all help Commands`,
  aliases: ["admin", "commands"],
  cooldown: 3,

  execute(message, args, client) {
    var SUPPORT = "https://discord.gg/7dnQrMKjQs";
    var site = "https://zooyebot.xyz";
    var Link =
      "https://discord.com/api/oauth2/authorize?client_id=762156775716945983&permissions=8&scope=bot";

    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(
        "**<:2AC4D5D1887E4F578049FCE123B5BD27:781910750100193301>Admin help menu**"
      )
      .setImage("")
      .setDescription(
        `** **[ Support](${SUPPORT})** | **[ Invite](${Link})** | **[ Site](${site})** 
        
<:7B3181C17F5946F392964EA1749C7AE7:781910843847606302>?setup
**__to create a room.__**
🧩?bc
**__Back-up - to server Creed Copy.__**
⚖️?kick
**__People's burial.__**
🪓?ban
**__People's baned.__**
📄?say
**__to write a chat with you.__**
✨?poll
**__To express his approval.__
🗑?clear
**__To break the letter.__
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
