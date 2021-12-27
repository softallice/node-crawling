let express = require("express");
let app = express();

const fs = require('fs');
const request = require('request');

const pocketJson = require("./data/pocket.json");


let download = async function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

let pocketInfo = (async ( arr ) => {
    return arr.map( async (pocket, index)  => {
        
        let imagePath = './images/'+pocket.index + '.png';        
        // console.log('countryInfo', countryInfo);
        // 파일 다운로드
        await download(pocket.url, imagePath, function(){
            console.log('done');
        });
    })
})

// 국가명 가져오기
pocketInfo(pocketJson);






app.listen(3000, console.log("Server is running..."));