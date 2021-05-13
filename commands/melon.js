const discord = require('discord.js');
const request = require("request")
const cheerio = require("cheerio");
const fs = require("fs");
const { parse } = require('path');
const { type } = require('os');
const MusicData = require('../data.json')
const { writeFileSync } = require('fs');
const { title } = require('process');


function fn (client, msg) {
    const [_,arg1, arg2] = msg.content.split(' ')
    const musictitle = MusicData.find((item) => item.Title)
    const musicartist = MusicData.find((item) => item.Artist)
    const url = `https://www.melon.com/chart/index.htm`
    if (arg1 == "새로고침"){
        MusicData.splice(0, 50);
        return
    }
    if (arg1 == "로드" || arg1 == null){
        request({ url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36' } }, (error, response, body) => {
            if (!error){
            
                  let $ = cheerio.load(body);
      
                  var TitleS = $("div.ellipsis.rank01 > span > a")
                  
                  for(var i = 0; i<50;i++){
                    if(!musictitle){
                            
                            MusicData.push({
                              Rank: i+1,  
                              Title: TitleS[i].children[0].data,
    
                                
                            })
                    }
                  }
                return
              }
              return
          });
    }
    if (arg1 == "순위"){
        request({ url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36' } }, (error, response, body) => {
            if (!error){
            
                  let $ = cheerio.load(body);
      
                  var TitleS = $("div.ellipsis.rank01 > span > a")
                if (arg2 == null){
                    for(let i = 0; i<20;i++){
                        msg.channel.send((i+1)+"위 : "+ TitleS[i].children[0].data + "\n")
                    }
                }else if (arg2 > 35){
                    msg.channel.send("ONLY 35개 이하")
                }else{
                    for(let i = 0; i<parseInt(arg2);i++){
                        msg.channel.send((i+1)+"위 : "+ TitleS[i].children[0].data + "\n")
                    }
                }
            }
          });
    }
    
}

setInterval(() => {
    writeFileSync('./data.json', JSON.stringify(MusicData, null, 2))
}, 1000)

module.exports = fn
module.exports.aliases = ['멜론']