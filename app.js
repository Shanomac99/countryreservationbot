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
    if(message.mentions.members.first() === undefined){
    if(content[1] === undefined)
    user = "";
    else
    user = content[1].toLowerCase();
    }
    else
    user = message.mentions.members.first();
    if(message.content.substring(0, prefix.length) == config.options.prefix) {
    switch (content[0].toLowerCase()){
        case "help":
        message.reply("\n" + prefix + "reserve {country tag} - reserves a country for you \n" + prefix + "remove - removes your reservation");
        break;
        case "reserve":
        case "setreserve":
        case "setreservation":
            util.guildchecking.grablist(message, function(list) {
                util.country.setplayer(message, list, content[1].toLowerCase(), (country) => {
                    util.output.output(list, message, client);
                });
            });
        break;
        case "remove":
        case "removereserve":
        util.guildchecking.grablist(message, function(list) {
            util.country.removeplayer(message, list, function() {
                util.output.output(list, message, client);
            });
        })
        break;
    }
}
    if(message.content.substring(0, aprefix.length) != config.options.aprefix) return;
    util.guildchecking.grablist(message, function(list1) {
        util.checkforadmin.checkstatus(list1, message.author.id, function(status){
            
            if(status == false) return message.reply("You don't have permission to do that.");

            switch (content2[0].toLowerCase()){
                case "update":
                util.guildchecking.grablist(message, function(list) {
                        util.output.output(list, message, client);
                });
                break;
                case "help":
                message.reply("\n" + aprefix + "removeuser {userid/@user} - removes a user from the roster \n" + aprefix + "removecountry {country tag} - resets a country \n" + aprefix + "setplayer {userid/@user} {country tag} - sets a player to a country\n" + aprefix + "setprefix/" + aprefix + "setaprefix - set prefix\n" + aprefix + "reset - resets the list\n" + aprefix + "addadmin {user} - add a user to admin");
                break;
                case "removereserve":
                case "removeplayer":
                case "removeuser":
                util.guildchecking.grablist(message, function(list) {
                    util.country.aremoveplayer(user, message, list, function(list) {
                        util.output.output(list, message, client);
                    });
                });
                break;
                case "removecountry":
                util.guildchecking.grablist(message, function(list) {
                    util.country.removecountry(content[1].toLowerCase(), message, list, function(list) {
                        util.output.output(list, message, client);
                    });
                });
                break;
                case "setplayer":
                case "setcountry":
                util.guildchecking.grablist(message, function(list) {
                    if (content[2] === undefined) return message.reply("Please provide a country");
                    util.country.setcountry(list, message, user, content[2].toLowerCase(), (country) => {
                        util.output.output(list, message, client);
                    });
                });
                break;
                case "addadmin":
                util.guildchecking.grablist(message, function(list) {
                    util.country.addadmin(list, message, user, (list) => {
                    })
                });
                break;
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
                    util.output.output(list, message, client);
                });
                break;
                case "setadmins":
                util.guildchecking.grablist(message, function(list) {
                    util.setoptions.setadmins(list, content2[1].toLowerCase(), message);
                });
                break;
                case "reset":
                util.guildchecking.grablist(message, function(list) {
                    util.country.reset(list, message, (list) =>{
                        util.output.output(list, message, client);
                        message.reply("You have reset the list");
                    });
                });
                break;
            }
        });
    });
    
})