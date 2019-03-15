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
          "can": "",
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
          "eng": "<:495pxUnited_Kingdom:465922156107399168>",
          "usa": "<:495pxUnited_States:465922155700551688>",
          "fra": "<:330pxFrance:465922151774421014>",
          "nzl": "<:495pxNew_Zealand:465922155222269954>",
          "cam": "<:495pxDominion_of_Canada:465922154563633153>",
          "saf": "<:495pxSouth_Africa:465922151799848961>",
          "ast": "<:495pxAustralia:465922155708940288>",
          "raj": "<:495pxBritish_Raj:465922156664979456>",
          "pol": "<:pllarge:546140336930684928>",
          "yug": "<:1200pxFlag_of_Yugoslavia_1918194:546114313400745994>",
          "hol": "<:flagnetherlands:546114315061690388>"
        },
        "chinese": {
          "chi": "<:2000pxFlag_of_the_Republic_of_Ch:546121170680938496>",
          "prc": "<:495pxChinese_Peoples_Republic:465922152907014144>"
        },
        "comintern": {
          "sov": "<:495pxSoviet_Union:465922153427238931>",
          "mex": "<:61sIDOD1ajL:546118699841486849>",
          "afg": "<:af:546118705377968148>"
        },
        "axis": {
          "ger": "<:1280pxFlag_of_the_German_Reich_1:465922641593630730>",
          "ita": "<:495pxItaly:465922156560384011>",
          "hun": "<:495pxHungary:465922151153926144>",
          "rom": "<:330pxKingdom_of_Romania:465922153984819200>",
          "spr": "<:330pxNationalist_Spain:465923275411947550>",
          "bul": "<:330pxBulgaria:465922150910525450>",
          "cze": "<:7886004297F88A4:546114314134749207>",
          "fin": "<:2000pxFlag_of_Finland:546118171044741120>",
          "ven": "<:255pxFlag_of_Venezuela_state:546118213394497548>"
        },
        "asia": {
          "jap": "<:495pxJapan:465922156513984512>",
          "man": "<:495pxManchukuo:465922151132692490>",
          "sia": "<:495pxSiam:465923297935360001>"
        }
      }
    },
    "options": {
      "flag": true,
      "prefix": "=",
      "aprefix": "-",
      "allowedchannels": [],
      "rosterchannel": "",
      "admins": [106907083877728256]
    }
  }

module.exports = {
    
    // Will test to see if theres a file if not it will create it
    
    // Grab the list
    grablist: function(message, callback){
      checkforfile(message, function() {
            var file = require("../config/" + message.guild.id + ".json");
            callback(file);
          })
    },
}


function checkforfile(message, callback){
  if(!message.guild.available) return console.log("Error contacting guild, possible discord outage?");

  var fileloc =  "./config/" + message.guild.id + ".json"
      
     try { // Try to access the file, if you can't create it using scope from here
      var file = require("../config/" + message.guild.id + ".json");
      callback(); // return
     }
      catch(e){
        console.log(e);
         fs.appendFile(fileloc, JSON.stringify(json) , function (err2) {
           callback();
           });
      }
}