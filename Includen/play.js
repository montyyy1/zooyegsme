////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const ytdl = require("discord-ytdl-core");
const { canModifyQueue } = require("../util/MilratoUtil");
const {
  Client,
  Collection,
  MessageEmbed,
  splitMessage,
  escapeMarkdown,
  MessageAttachment
} = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const createBar = require("string-progressbar");
const lyricsFinder = require("lyrics-finder");

////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  cooldown: 3,
  edesc:
    "Type help to get a short preview of all Commands, Type help <COMMANDNAME> to get extended information about this one command!",
  async play(song, message, client, filters) {
    //VERY MESSY CODE WILL BE CLEANED SOON!
    const { PRUNING, SOUNDCLOUD_CLIENT_ID } = require("../config.json");

    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      const endembed = new MessageEmbed()
        .setColor("#FFB901")
        .setAuthor(
          `   | Music Queue ended.`,
          "https://cdn.discordapp.com/emojis/767059644425306122.gif?v=1"
        );
      return queue.textChannel.send(endembed).catch(console.error);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    let isnotayoutube = false;
    let seekTime = 0;
    let oldSeekTime = queue.realseek;
    let encoderArgstoset;
    if (filters === "remove") {
      queue.filters = ["-af", "dynaudnorm=f=200"];
      encoderArgstoset = queue.filters;
      try {
        seekTime =
          (queue.connection.dispatcher.streamTime -
            queue.connection.dispatcher.pausedTime) /
            1000 +
          oldSeekTime;
      } catch {
        seekTime = 0;
      }
      queue.realseek = seekTime;
    } else if (filters) {
      try {
        seekTime =
          (queue.connection.dispatcher.streamTime -
            queue.connection.dispatcher.pausedTime) /
            1000 +
          oldSeekTime;
      } catch {
        seekTime = 0;
      }
      queue.realseek = seekTime;
      queue.filters.push(filters);
      encoderArgstoset = ["-af", queue.filters];
    }

    try {
      if (song.url.includes("youtube.com")) {
        stream = ytdl(song.url, {
          filter: "audioonly",
          opusEncoded: true,
          encoderArgs: encoderArgstoset,
          bitrate: 320,
          seek: seekTime,
          quality: "highestaudio",
          liveBuffer: 40000,
          highWaterMark: 1 << 25
        });
      } else if (
        song.url.includes(".mp3") ||
        song.url.includes("baseradiode")
      ) {
        stream = song.url;
        isnotayoutube = true;
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return attentionembed(
        message,
        `Error: ${error.message ? error.message : error}`
      );
    }

    queue.connection.on("disconnect", () =>
      message.client.queue.delete(message.guild.id)
    );

    if (isnotayoutube) {
      console.log("TEST");
      const dispatcher = queue.connection
        .play(stream)
        .on("finish", () => {
          if (collector && !collector.ended) collector.stop();

          if (queue.loop) {
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
            module.exports.play(queue.songs[0], message);
          } else {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on("error", err => {
          console.error(err);
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    } else {
      const dispatcher = queue.connection
        .play(stream, { type: streamType })
        .on("finish", () => {
          if (collector && !collector.ended) collector.stop();

          if (queue.loop) {
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
            module.exports.play(queue.songs[0], message);
          } else {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
        })
        .on("error", err => {
          console.error(err);
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
    }

    let thumb;
    if (song.thumbnail === undefined)
      thumb =
        "https://media.discordapp.net/attachments/781335917712638022/781720013693779999/image0.gif";
    else thumb = song.thumbnail.url;

    try {
      const newsong = new MessageEmbed()
        .setTitle(
          "<:2D3119C7645F4DD7A147D1B076C3884B:781910750120771585> " + song.title
        )
        .setURL(song.url)

        .setColor("#FFB901")

        .setImage(thumb) //song.title
        .setThumbnail(
          "https://media.discordapp.net/attachments/781335917712638022/781720013693779999/image0.gif"
        )
        .addField(
          "<:2AC4D5D1887E4F578049FCE123B5BD27:781910750100193301> Requested by:",
          `\`${message.author.username}#${message.author.discriminator}\``,
          true
        )
        .addField(
          "<:12AA9A2118AD4747A5AB5193801097E3:781727514997293068> Length:",
          `\`${song.duration} Minutes\``,
          true
        )
        .addField(
          "<:757206135974658058:781653344942555137> Views:",
          `\`${song.views}\``,
          true
        );
      var playingMessage = await queue.textChannel.send(newsong);

      await playingMessage.react(":skip:781585959782580254"); //skip
      await playingMessage.react(":pasue:781587625139109918"); //pause
      await playingMessage.react(":vol:781590009983139850"); //vol -
      await playingMessage.react(":Vol_:781591477305606164"); //vol +
      await playingMessage.react(":Vol_mute:781594395521843250"); //vol non
      await playingMessage.react(":pasue:781597029473583134"); //stop
      await playingMessage.react(":loopoo:781598644188872706"); //loop
      await playingMessage.react(":nowplyanig:781600553201303602"); //np
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", async (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.id) {
        //queue

        //np
        case "781600553201303602":
          reaction.users.remove(user).catch(console.error);
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
              "https://cdn.discordapp.com/emojis/746257314775957534.gif?v=1"
            )
            .setTitle(
              "<:770184544845430814:781695714715238420>    | Now playing"
            )
            .setDescription(`[**${song.title}**](${song.url})`)
            .setThumbnail(song.thumbnail.url)
            .setColor("#FFB901")
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
            //if its a stream

            //send approve msg
            return message.channel.send(nowPlaying);
          }
          //If its not a stream
          if (ms > 0 && ms < 10000) {
            //send approve msg
            return message.channel.send(nowPlaying);
          }

          break;
        //skip
        case "781585959782580254":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          const skipembed = new MessageEmbed()
            .setColor("#FFB901")
            .setAuthor(
              `${user.username} skipped the song.`,
              "https://cdn.discordapp.com/emojis/781585959782580254.png?v=1"
            );
          queue.textChannel.send(skipembed).catch(console.error);

          collector.stop();

          break;

        //pause
        case "781587625139109918":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
            const pausemebed = new MessageEmbed()
              .setColor("#FFB901")
              .setAuthor(
                ` | ${user.username} paused the music.`,
                "https://cdn.discordapp.com/emojis/781587625139109918.png"
              );
            queue.textChannel.send(pausemebed).catch(console.error);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();

            const playembed = new MessageEmbed()
              .setColor("#FFB901")

              .setAuthor(
                ` | ${user.username} resumed the music!`,
                "https://cdn.discordapp.com/emojis/781589097235873832.png?v=1"
              );
            queue.textChannel.send(playembed).catch(console.error);
          }
          break;
        ///////

        case "781594395521843250":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume <= 0) {
            queue.volume = 100;
            queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
            const unmuted = new MessageEmbed()
              .setColor("#FFB901")
              .setAuthor(
                ` | ${user.username} UnMuted`,
                "https://cdn.discordapp.com/emojis/781591477305606164.png?v=1"
              );
            queue.textChannel.send(unmuted).catch(console.error);
          } else {
            queue.volume = 0;
            queue.connection.dispatcher.setVolumeLogarithmic(0);
            const muted = new MessageEmbed()
              .setColor("#FFB901")

              .setAuthor(
                ` | ${user.username} Muted`,
                "https://cdn.discordapp.com/emojis/781594395521843250.png?v=1"
              );
            queue.textChannel.send(muted).catch(console.error);
          }
          break;

        case "781590009983139850":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume - 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel.Message.delete
            .send(
              `${user} - <:vol:781590009983139850>    decreased the volume, the volume is now ${queue.volume}%`
            )

            .catch(console.error);
          break;

        case "781591477305606164":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume + 10 >= 100) queue.volume = 100;
          else queue.volume = queue.volume + 10;
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          queue.textChannel.Message.send(
            `${user} - <:Vol_:781591477305606164>  increased the volume, the volume is now ${queue.volume}%`
          ).catch(console.error);

          break;

        //////
        //loop
        case "781598644188872706":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          const loopembed = new MessageEmbed()
            .setColor("#FFB901")

            .setAuthor(
              `Loop is now ${queue.loop ? " enabled" : " disabled"}`,
              "https://cdn.discordapp.com/emojis/781598644188872706.png?v=1"
            );
          queue.textChannel.send(loopembed).catch(console.error);
          break;
        //stop
        case "781597029473583134":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          const stopembed = new MessageEmbed()
            .setColor("#FFB901")
            .setAuthor(
              `${user.username} stopped the music!`,
              "https://cdn.discordapp.com/emojis/781597029473583134.png?v=1"
            );
          queue.textChannel.send(stopembed).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};
