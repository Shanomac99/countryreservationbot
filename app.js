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
    try {
    var config = require("./config/" + message.guild.id + ".json");
    }
    catch(e) {
        var config = require("./config/default.json");
        util.guildchecking.grablist(message, function(list) {});
    }
    var prefix = config.options.prefix;
    var aprefix = config.options.aprefix;

    var content = message.content.substring(prefix.length).split(" ");
    var content2 = message.content.substring(aprefix.length).split(" ");

    switch (content[0].toLowerCase()){

        case "setreserve":
        case "setreservation":
            util.guildchecking.grablist(message, function(list) {
                util.country.setplayer(message, list, content[1].toLowerCase(), (country) => {

                });
            });
        break;
    }
})