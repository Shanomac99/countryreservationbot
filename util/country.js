const fs = require('fs');
const checkforadmin = require("./checkforadmin.js");

module.exports = {
    
    setplayer: function(message, list, country, callback){
        checkforuser(list, message.author.id, function(status){
            if (status) return message.reply("You have already reserved a country.");
        findcountry(list, country, (setcountry, jsonloc) => {
            if(setcountry === undefined){
                message.reply("That country doesn't exist/isnt playable. Please use Hoi4 country tags (http://bit.ly/2ucOpU1)");
                callback();
            }
            else {
                if(setcountry == " " || setcountry == ""){
                     fileloc =  "./config/" + message.guild.id + ".json";
                     message.reply("You have successfuly reserved " + country);
                    setcountryjson(list, fileloc, jsonloc, country, message.author.id, function() {
                        callback();
                    });

                }
                else if(setcountry == message.author.id){
                    message.reply("You have already taken that country!");
                    callback();
                }
                else {
                    message.reply("That country has already been taken!");
                    callback();
                }
            }
        })
    })

    },
    removeplayer: function(message, list, callback){
        checkforuser(list, message.author.id, function(status, country, setcountry) {
            if (status == false){
            return message.reply("You have not signed up for a country.");
            }
            else { 
            fileloc =  "./config/" + message.guild.id + ".json";
            setcountryjson(list, fileloc, country, setcountry, "", function(list) {
                message.reply("You have removed yourself from " + setcountry);
            });
            callback();
        }
        })

    },

    aremoveplayer: function(player, message, list, callback){
        if(isNaN(player)) player = user.id;
        checkforuser(list, player, function(status, country, setcountry) {
            if (status == false){
            return message.reply("That player has not signed up for a country.");
            }
            else { 
            fileloc =  "./config/" + message.guild.id + ".json";
            setcountryjson(list, fileloc, country, setcountry, "", function() {
                message.reply("You have removed a player from " + setcountry);
                callback(list);
            });
            }
        });
    },
    removecountry: function(country, message, list, callback){
        findcountry(list, country, (setcountry, temp)=> {
            message.reply("You have removed a player from " + country)
            fileloc =  "./config/" + message.guild.id + ".json";
            setcountryjson(list, fileloc, temp, country,  "", (list) => {
                callback(list);
            })
        })
    },
    setcountry: function(list, message, user, country, callback){
        if(user === undefined || country === undefined) return message.reply("Please make sure you've provided a user and country");
        if(isNaN(user) && message.mentions.members.first() === undefined) return message.reply("Make sure the first argument is a player id/member.");
        if(isNaN(user)) user = user.id;
        checkforuser(list, user, function(status, temp, setcountry2){
            if((temp === undefined) && (message.guild.members.get(user) === undefined && message.guild.members.get(user.id) === undefined)) return message.reply("That is not a player, make sure the id is correct.");
                
            if (status) return message.reply("This player already has a country.");
            findcountry(list, country, (setcountry, jsonloc) => {
                if(setcountry === undefined){
                    message.reply("That country doesn't exist/isnt playable. Please use Hoi4 country tags (http://bit.ly/2ucOpU1)");
                    callback();
                }
                else {
                    if(setcountry == " " || setcountry == ""){
                         fileloc =  "./config/" + message.guild.id + ".json";
                         message.reply("You have successfuly reserved " + country + " for " + message.guild.members.get(user));
                        setcountryjson(list, fileloc, jsonloc, country, user, function() {
                            callback();
                        });
    
                    }
                    else if(setcountry == user){
                        message.reply("That player has already taken that country!");
                        callback();
                    }
                    else {
                        message.reply("That country has already been taken!");
                        callback();
                    };
               
        };
    });
    });
    },
    addadmin: function(list, message, user, callback){
        if(isNaN(user) && message.mentions.members.first() === undefined) return message.reply("Make sure the first argument is a player id/member.");
        if(isNaN(user)) admin = user.id;
        else
            admin = user;
        checkforadmin.checkstatus(list, admin, (status) => {
            if(status) return message.reply("This user is already an admin");
        list.options.admins.push(parseInt(admin));
        fileloc =  "./config/" + message.guild.id + ".json";
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                message.reply("You have added " + message.guild.members.get(admin));
                callback(list);
            });
        });
    })
    },
    reset: function(list, message, callback){
        var jsonlist = list.countries.reservations
        for(var key1 in jsonlist){
            temp = jsonlist[key1];
            for(var key in jsonlist[key1]){
            setcountry = temp[key];
            temp[key] = "";
            }
        }
        fileloc =  "./config/" + message.guild.id + ".json";
        fs.unlink(fileloc, function(err) {
            fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
                callback(list);
            });
        });
    }
}


function findcountry(list, country, callback) {
    var setcountry, temp;
    var jsonlist = list.countries.reservations
    for(var key1 in jsonlist){
        for(var key in jsonlist[key1]){
            if(key == country){
            temp = jsonlist[key1];
            setcountry = temp[key];
            }
        }
    }
    callback(setcountry, temp);
}

function setcountryjson(list,fileloc, jsonloc, country, user, callback){
    jsonloc[country] = user;

    fs.unlink(fileloc, function(err) {
        fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
            callback(list);
        });
    });

}

function checkforuser(list, user, callback){
    var status = false, country, setcountry2;
    var jsonlist = list.countries.reservations
    for(var key1 in jsonlist){
        for(var key in jsonlist[key1]){
            temp = jsonlist[key1];
            setcountry = temp[key];
            if(setcountry == user){
                status = true;
                country = temp;
                setcountry2 = key;
            }
        }
    }
    callback(status, country, setcountry2);
}