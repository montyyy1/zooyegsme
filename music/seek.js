const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../config.json`);
module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Toggle music loop",
  cooldown: 3,
  edesc: `Just type the Command in the chat to activate/deactivate loop, you can also react to the loop emoji, to receive the same goal!\nUsage: `,
execute(message) { 
   
    const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(Number(args[0]) <= 0 || Number(args[0]) >= player.queue.current.duration/1000) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may set the volume \`1\` - \`${player.queue.current.duration}\``));
      player.seek(Number(args[0])*1000);
      const embed = new MessageEmbed()
      .setTitle(`✅ Seeked song to: ${format(Number(args[0])*1000)}`)
      .addField("Progress: ", "**[" + createBar((player.queue.current.duration == 0 ? player.position : player.queue.current.duration), player.position, 25, "▬", "🔶")[0] + "]**\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))+ "**")
       .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};
const createBar = (total, current, size = 25, line = '▬', slider = '🔶') => current > total ? [line.repeat(size * 2), (current / total) * 100] : [line.repeat(Math.round(size * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total))), current / total];
function format(millis){
  var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
  if(h<1) return(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  }