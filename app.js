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
        case "test":
        util.guildchecking.grablist(message, function(list) {
             });
        break;
        case "setreserve":
        case "setreservation":
            util.guildchecking.grablist(message, function(list) {
                util.country.setplayer(message, list, content[1].toLowerCase(), (country) => {
                    util.output.output(list, message, client);
                });
            });
        break;
        case "removereserve":
        util.guildchecking.grablist(message, function(list) {
            util.country.removeplayer(message, list, function() {
                util.output.output(list, message, client);
            });
        })
        break;
    }
    if(message.content.substring(0, aprefix.length) != "-") return;
    util.guildchecking.grablist(message, function(list1) {
        util.checkforadmin.checkstatus(list1, message.author.id, function(status){
            
            if(status == false) return message.reply("You don't have permission to do that.");

            switch (content2[0].toLowerCase()){
                case "setflag":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setflag(list, content2[1].toLowerCase(), message);
                });
                break;
                case "setprefix":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setprefix(list, content2[1].toLowerCase(), message);
                });
                break;
                case "setaprefix":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setaprefix(list, content2[1].toLowerCase(), message);
                });
                break;
                case "setallowedchannels":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setallowedchannels(list, content2[1].toLowerCase(), message);
                });
                break;
                case "setrosterchannel":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setrosterchannel(list, content2[1].toLowerCase(), message);
                });
                break;
                case "setadmins":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setadmins(list, content2[1].toLowerCase(), message);
                });
                break;
            }
        });
    });
    
})