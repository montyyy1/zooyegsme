////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const createBar = require("string-progressbar");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { PREFIX } = require(`../config.json`);

module.exports = {
  name: "nowplaying",
  aliases: ["np", "now-playing", "current", "current-song"],
  description: "Show current song",
  cooldown: 5,
  edesc: `Type nowplaying in chat, to see which song is currently playing! As well as how long it will take until its finished\nUsage: ${PREFIX}nowplaying`,

  execute(message) {
    //if not in a guild return
    if (!message.guild) return;
    //react with approve emoji
    message.react("<a:next:781695568744546304>");
    //get Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if nothing playing error
    if (!queue)
      return attentionembed(message, "There is nothing playing.").catch(
        console.error
      );
    //Define the current song
    const song = queue.songs[0];
    //get current song duration in s
    let minutes = song.duration.split(":")[0];
    let seconds = song.duration.split(":")[1];
    let ms = Number(minutes) * 60 + Number(seconds);
    //get thumbnail
    let thumb;
    if (song.thumbnail === undefined) thumb = "";
    else thumb = song.thumbnail.url;
    //define current time
    const seek =
      (queue.connection.dispatcher.streamTime -
        queue.connection.dispatcher.pausedTime) /
      1000;
    //define left duration
    const left = ms - seek;
    //define embed
    let nowPlaying = new MessageEmbed()

      .setAuthor(
        `Playing | ${queue.volume}%  🔉  `,
        "https://cdn.discordapp.com/emojis/781660364580323339.gif?v=1"
      )
      .setTitle("<:763383390342479892:781653400861147196> | Now playing")
      .setDescription(`[${song.title}](${song.url})`)
      .setThumbnail(song.thumbnail.url)
      .setColor("#FFB901")
    .setImage("https://media.discordapp.net/attachments/782031373636337737/790396299182211082/image0.gif")
      .addField(
        "Requested by:",
        `\`${message.author.username}#${message.author.discriminator}\``,
        true
      )
      .addField("Length:", `\`${song.duration} Minutes\``, true);

    //if its a stream
    if (ms >= 10000) {
      nowPlaying.addField("\u200b", "🔴 LIVE", false);
      //send approve msg
      return message.channel.send(nowPlaying);
    }

    //send approve msg
    return message.channel.send(nowPlaying);
  }
};
