// ***Requirements***

// Used to talk to discord
const Discord = require("discord.js");
const DiscordConfig = require('./auth/discordauth.json')

// File requirements
const util = require("./util");


// Dicord Client setup
const client = new Discord.Client();

// Login to Discord APi
client.login(DiscordConfig.token)


client.on("message", message => {
    // Checks if message is from bot, if so ignore it
    if(message.author.bot) return;
    util.guildchecking.checkforfile(message, function() {
       util.guildchecking.grablist(message, function(list) {
            console.log(list);
        });
    })
})