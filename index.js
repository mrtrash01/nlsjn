const discord = require("discord.js");;
const fs = require("fs");


const bot = new discord.Client();
bot.commands = new discord.Collection();

bot.on("message", async message => {
    var prefix = "!";
    var messageArray = message.content.split(" ");
var command = messageArray[0];
var arguments = messageArray.slice(1);
var commands = bot.commands.get(command.slice(prefix.length));
if(commands) commands.run(bot, message, arguments);
})
//commmand handler
//commmand handler

fs.readdir('./commands/', (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() == "js");

    if(jsFiles.length <=0) {
        console.log("I cannot find any file");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} has been loaded`);

        bot.commands.set(fileGet.help.name, fileGet);
    })
});
//commmand handler
//commmand handler

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`) 
    bot.user.setActivity('with scripts', {type: "PLAYING"})
})


bot.on("guildMemberAdd", member =>{

    var role = member.guild.roles.cache.get('726787930483326978');

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('726841387282071577')

    if(!channel) return;

    channel.send(`${member} joined the server, Wecome!`)
})


var prefix = "!";

bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");

    if (message.content.startsWith(`${prefix}compressall`)) {
      if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply('You can\'t use this command!')
      const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
      if (args[1] === 'on') {
          channels.forEach(channel => {
              channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
              }).then(() => {
                  channel.setName(channel.name += `🔒`);
              });
          });
          return message.channel.send('Locked all channels');
      } else if (args[1] === 'off') {
          channels.forEach(channel => {
              channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: true
              }).then(() => {
                  channel.setName(channel.name.replace('🔒', ''));
              });
          });
          return message.channel.send('Unlocked all channels');
      };
  };
});



bot.login(process.env.token);
