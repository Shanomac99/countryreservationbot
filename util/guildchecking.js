// Used to edit local files
const fs = require('fs');

const json = {
    "heading": "Strict Rules Roster",
    "countries": {
      "reservations": {
        "allies": {
          "eng": "",
          "usa": "",
          "fra": "",
          "nzl": "",
          "cam": "",
          "saf": "",
          "ast": "",
          "raj": "",
          "pol": "",
          "yug": "",
          "hol": ""
        },
        "chinese": {
          "chi": "",
          "prc": ""
        },
        "comintern": {
          "sov": "",
          "mex": "",
          "afg": ""
        },
        "axis": {
          "ger": "",
          "ita": "",
          "hun": "",
          "rom": "",
          "spr": "",
          "bul": "",
          "cze": "",
          "fin": "",
          "ven": ""
        },
        "asia": {
          "jap": "",
          "man": "",
          "sia": ""
        }
      },
      "flags": {
        "allies": {
          "eng": ":495pxUnited_Kingdom:",
          "usa": ":495pxUnited_States:",
          "fra": ":330pxFrance:",
          "nzl": ":495pxNew_Zealand:",
          "cam": ":495pxDominion_of_Canada:",
          "saf": ":495pxSouth_Africa:",
          "ast": ":495pxAustralia:",
          "raj": ":495pxBritish_Raj:",
          "pol": ":pllarge:",
          "yug": ":1200pxFlag_of_Yugoslavia_1918194~1:",
          "hol": ":flagnetherlands:"
        },
        "chinese": {
          "chi": ":2000pxFlag_of_the_Republic_of_Ch:",
          "prc": ":495pxChinese_Peoples_Republic:"
        },
        "comintern": {
          "sov": ":495pxSoviet_Union:",
          "mex": ":61sIDOD1ajL:",
          "afg": ":af:"
        },
        "axis": {
          "ger": ":1280pxFlag_of_the_German_Reich_1:",
          "ita": ":495pxItaly:",
          "hun": ":495pxHungary:",
          "rom": ":330pxKingdom_of_Romania:",
          "spr": ":330pxNationalist_Spain:",
          "bul": ":330pxBulgaria:",
          "cze": ":7886004297F88A4:",
          "fin": ":2000pxFlag_of_Finland:",
          "ven": ":255pxFlag_of_Venezuela_state:"
        },
        "asia": {
          "jap": ":495pxJapan:",
          "man": ":495pxManchukuo: ",
          "sia": ":495pxSiam"
        }
      }
    },
    "options": {
      "flag": true,
      "prefix": "=",
      "aprefix": "-",
      "allowedchannels": [],
      "rosterchannel": ""
    }
  }

module.exports = {
    
    // Will test to see if theres a file if not it will create it
    checkforfile: function(message, callback){
        if(!message.guild.available) return console.log("Error contacting guild, possible discord outage?");

        // fs scope is going to run in the main file, hence the . vs ..
        var fileloc =  "./config/" + message.guild.id + ".json"
            
           try { // Try to access the file, if you can't create it using scope from here
            var file = require("../config/" + message.guild.id + ".json");
           }
            catch(e){
               fs.appendFile(fileloc, JSON.stringify(json) , function (err2) {
                       
                 });
            }
         callback(); // return
    },
    
    // Grab the list
    grablist: function(message, callback){
            var file = require("../config/" + message.guild.id + ".json");
            callback(file);
    },
}