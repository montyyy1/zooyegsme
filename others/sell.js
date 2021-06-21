const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
   
        name: "sell",
        noalias: ["sel"],
        category: "economy",
        description: "Sell to somebody",
        usage: "[mention | ID] <amount>",
        accessableby: "everyone"
    ,
   async execute(message, args) {
        let user = message.author;

        
       let sell = await db.fetch(`sell_${user.id}`);

      
        
        let author = db.fetch(`money_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'champion') {
            let embed1 = new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`❌ You don't have Nikes to sell`);

            let champion = await db.fetch(`champion_${user.id}`)

            if (champion < 1) return message.channel.send(embed1)

            db.fetch(`champion_${user.id}`)
            db.subtract(`champion_${user.id}`, 1)

            let embed2 = new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`✅ Sold Fresh Nikes For 50,000 Coins`);

            db.add(`money_${user.id}`, 200000)
            message.channel.send(embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`❌ You don't have a Car to sell`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`✅ Sold a Car For 200,000 Coins`);

            db.add(`money_${user.id}`, 500000)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'villa') {
            let sembed2 = new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`❌ You don't have a villa to sell`);

            let villa = await db.fetch(`villa_${user.id}`)

            if (villa < 1) return message.channel.send(sembed2)

            db.fetch(`villa_${user.id}`)
            db.subtract(`villa_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("#FFB901")
                .setDescription(`✅ Sold a Mansion For 500,00 Coins`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${sell}sell`) {
                let embed9 = new MessageEmbed()
                    .setColor("#FFB901")
                    .setDescription(`❌ Enter an item to sell. Type ${sell}store to see list of items`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("**Not A Valid Item!**")
            }
        }
    }
}