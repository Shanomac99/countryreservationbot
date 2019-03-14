module.exports = {

    output : function(list, message, client){
        if(list.options.rosterchannel === undefined) return message.reply("Your rosterchannel is not setup, please contact an admin.");
        if(client.channels.get(list.options.rosterchannel) === undefined) return message.reply("Your rosterchannel is incorrect, please contact an admin.");
        var channel =  client.channels.get(list.options.rosterchannel);
        channel.bulkDelete(50);
        
        // Clone the json so we arent editing the data storing one
        var newlist = JSON.parse(JSON.stringify(list));
        var jsonlist = newlist.countries.reservations
        for(var key1 in jsonlist){
        for(var key in jsonlist[key1]){
            temp = jsonlist[key1];
            if(temp === undefined || message.guild.members.get(temp[key]) === undefined) {
                temp[key] = "\u200B";
            }
            else {
                temp[key] = message.guild.members.get(temp[key]).user.username;
            }
        }
    }

        var reserve = newlist.countries.reservations;
        var allies = reserve.allies;
        var chinese = reserve.chinese;
        var comintern = reserve.comintern;
        var axis = reserve.axis;
        var asia = reserve.asia;

        var flags = newlist.countries.flags;
        var fallies = flags.allies;
        var fchinese = flags.chinese;
        var fcomintern = flags.comintern;
        var faxis = flags.axis;
        var fasia = flags.asia;
        channel.send("To reserve a country use " + list.options.prefix + "help in <#518548792300011644> \n**Strict Rules Roster** \n__**Allies**__" + "\n" + fallies.eng + " : " + allies.eng + " \n" + fallies.usa + " : " + allies.usa + "\n" + fallies.fra + " : " + allies.fra + "\n" + fallies.nzl + " : " + allies.nzl + "\n" + fallies.cam + " : " + allies.cam + "\n" + fallies.saf + " : " + allies.saf + "\n" + fallies.ast + " : " + allies.ast +  "\n" + fallies.raj + " : " + allies.raj +"\n" + fallies.pol + " : " + allies.pol + "\n" + fallies.yug + " : " + allies.yug + "\n" + fallies.hol + " : " + allies.hol + "\n");
        channel.send("__**Chinese United Front**__" + "\n" + fchinese.chi + " : " + chinese.chi + "\n" + fchinese.prc + " : " + chinese.prc);
        channel.send("__**Comintern**__" + "\n" + fcomintern.sov + " : " + comintern.sov + "\n" + fcomintern.mex + " : " + comintern.mex + "\n" + fcomintern.afg + " : " + comintern.afg + "\n");
        channel.send("__**Axis**__" + "\n" + faxis.ger + " : " + axis.ger + "\n" + faxis.ita + " : " + axis.ita + "\n" + faxis.hun + " : " + axis.hun + "\n" + faxis.rom + " : " + axis.rom + "\n"+ faxis.spr + " : " + axis.spr + "\n" + faxis.bul + " : " + axis.bul + "\n" + faxis.cze + " : " + axis.cze + "\n" + faxis.fin + " : " + axis.fin + "\n" + faxis.ven + " : " + axis.ven + "\n"   )
        channel.send("__**East Asian Co-Prosperity Sphere**__" + "\n" + fasia.jap + " : " + asia.jap + "\n" + fasia.man + " : " + asia.man + "\n" + fasia.sia + " : " + asia.sia + "\n" )
    }
}