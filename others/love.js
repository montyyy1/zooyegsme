const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'love',
    description: 'Show How Much Azunyan Love You',
    usage: '[mention]',
    category: 'fun',
    timeout: 3,
    aliases: [""],
   async execute(message, args, bot) {
        message.delete();
        // Get a member from mention, id, or username
        let user = message.mentions.users.first() || message.author;

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#FFB901")
            .addField(`☁ **${bot.user.username}** loves **${user.username}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
            .setTimestamp()
            .setFooter(`${bot.user.username}`);
        message.channel.send({embed: embed});
    }
}