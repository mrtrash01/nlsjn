const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(`You are unable to kick members`)
        }
        if (!args[0]) {
            return message.channel.send(`Please mention a user!`)
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        try {
            await member.kick();
            await message.channel.send(`${member} has been kicked!`)
        } catch (e) {
            return message.channel.send(`User isn't in this server!`)
        
        }
        var kick = new discord.MessageEmbed()
    
        .setDescription("Kick")
        
        .setColor("#ee0000")
        
        .addField("Kicked", kickUser)
        
        .addField("Kicked by", message.author)
        
        .addField("Reason", reason);
        
    }

}
module.exports.help = {
  name: "kick",
  category: "moderation",
}