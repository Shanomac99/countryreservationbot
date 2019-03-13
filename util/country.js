const fs = require('fs');

module.exports = {
    
    setplayer: function(message, list, country, callback){
        findcountry(list, country, (setcountry, jsonloc) => {
            if(setcountry === undefined){
                message.reply("That country doesn't exist. Please use Hoi4 country tags (http://bit.ly/2ucOpU1)");
                callback();
            }
            else {
                console.log(setcountry);
                if(setcountry == ""){
                     fileloc =  "./config/" + message.guild.id + ".json"
                    setcountryjson(list, fileloc, jsonloc, country, message.author.username, function() {
                        message.reply("You have successfuly reserved " + country);
                        callback();
                    });

                }
                else if(setcountry == message.author.username){
                    message.reply("You have already taken that country!");
                    callback();
                }
                else {
                    message.reply("That country has already been taken!");
                    callback();
                }
            }
        })

    }



}

function findcountry(list, country, callback, user) {
    console.log("1")
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
    console.log(list.countries.reservations.allies)

    fs.unlink(fileloc, function(err) {
        fs.writeFile(fileloc, JSON.stringify(list) , function (err2) {
        });
    });

}