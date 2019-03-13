const fs = require('fs');

module.exports = {
    setflag: function(list, setting, message){
        if(setting != "false" && setting != "true") return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.flag = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    },
    setprefix: function(list, setting, message){
        if(setting == "" || setting == undefined) return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.prefix = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    },
    setaprefix: function(list, setting, message){
        if(setting == "" || setting == undefined) return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.aprefix = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    },
    setallowedchannels: function(list, setting, message){
        if(setting == "" || setting == undefined) return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.allowedchannels = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    },
    setrosterchannel: function(list, setting, message){
        if(setting == "" || setting == undefined) return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.rosterchannel = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    },
    setadmins: function(list, setting, message){
        if(setting == "" || setting == undefined) return message.reply("Please send a valid setting");
        fileloc =  "./config/" + message.guild.id + ".json";
        list.options.admins = setting;
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("Setting has been updated.");
            });
        });
    }
}