module.exports = {

    checkstatus: function(list, user, callback){
        var admins = list.options.admins
        var status = false;
        for(var i = 0; i < admins.length; i++){
            if(admins[i] == user)
                status = true
        }
        callback(status);
    }
}