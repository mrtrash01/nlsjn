const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    if(!args.length) {
        return message.channel.send("Please Give the Suggestion")
      }
      
      let channel = message.guild.channels.cache.find((x) => (x.name === "suggestion" || x.name === "suggestions"))
      
      
      if(!channel) {
        return message.channel.send("there is no channel with name - suggestions")
      }
                                                      
      
      var embed = new discord.MessageEmbed()
      .setAuthor("SUGGESTION: " + message.author, message.author.avatarURL())
      .setThumbnail(message.author.avatarURL())
      .setColor("#ff2050")
      .setDescription(args.join(" "))
      .setTimestamp()
      
      
      channel.send(embed).then(m => {
        m.react("✅")
        m.react("❌")
      })
      
  
      
      message.channel.send("Sended Your Suggestion to " + 759048727187947563)
}

module.exports.help = {
    name: "suggest",
    usage: "suggest <message>", //how to use command?
    description: "Send your Suggestion", //Something about command
    category: "suggestions", //Category of command
}