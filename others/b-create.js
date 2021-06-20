const backup = require("discord-backup");
const discord = require("discord.js");

module.exports = {
  name: "backup-create",
  aliases: ["bc"],
  category: "backup",
  usage: "backup-create",
  description: "Get the bot's ping!",
  execute(message, args) {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
       return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    backup
      .create(message.guild)
      .then(backupData => {
        let embed = new discord.MessageEmbed()
          .setTitle("Backup Create")
          .setAuthor(message.author.username)
          // .setThumbnail(message.author.avatarURL({dynamic: true}))
          .setDescription(
            `**Here is your ID: \`\`\`${backupData.id}\`\`\` **
Use \`\`\`backup-load ${backupData.id}\`\`\` to load the backup on another server!
      `
          )
          .setColor("#FFB901");
        // .setFooter(`${message.guild.name}`,`${message.guild.iconURL()}`)
        message.channel.send(embed);
      })
      .catch(error => {
        return message.channel.send(error.message);
      });
  }
};
