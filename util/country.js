const fs = require('fs');

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
        checkforuser(list, player, function(status, country, setcountry) {
            if (status == false){
            message.reply("That player has not signed up for a country.");
            callback(list);
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
        if(isNaN(user)) return message.reply("Make sure the first argument is a player id.");
        checkforuser(list, message.author.id, function(status){
            if(temp === undefined || message.guild.members.get(user) === undefined) return message.reply("That is not a player, make sure the id is correct.");
                
            if (status) return message.reply("This player already has a country.");
            findcountry(list, country, (setcountry, jsonloc) => {
                if(setcountry === undefined){
                    message.reply("That country doesn't exist/isnt playable. Please use Hoi4 country tags (http://bit.ly/2ucOpU1)");
                    callback();
                }
                else {
                    if(setcountry == " " || setcountry == ""){
                         fileloc =  "./config/" + message.guild.id + ".json";
                         message.reply("You have successfuly reserved " + country + " for " + user);
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