let express = require("express");
let app = express();

const fs = require('fs');
const request = require('request');

const contryJson = require("./data/data .json");
const contryImageJson = require("./data/country.json");

let axios = require("axios");

// 일반 인증키(Decoding)
let serviceKey = "FwQftdHIytzOcWWya6eNPeRTsdf/dCjr43yHMSM5y5zsshvDikzQ6knERWVwlR/Clp8WL6EWCIQYB6BslHrd0g==";
// 일반 인증키 (Encoding)
// let serviceKey = "FwQftdHIytzOcWWya6eNPeRTsdf%2FdCjr43yHMSM5y5zsshvDikzQ6knERWVwlR%2FClp8WL6EWCIQYB6BslHrd0g%3D%3D";

let resData

// console.log('contryJson', contryJson);

let download = async function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };


let getFlagImage = (( country_nm ) => {
    return contryImageJson.filter(country => country.country_nm === country_nm)[0]
})


// let getCountry = (async ( countryNm ) => {

//     // console.log(countryNm);
//     var config = {
//         method: 'get',
//         url: encodeURI('http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey='+serviceKey+'&pageNo=1&numOfRows=10&cond[country_nm::EQ]='+countryNm),
//         // url: encodeURI('http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey='+serviceKey+'&pageNo=1&numOfRows=10&cond[country_nm::EQ]='+countryNm),
//         headers: { }
//         };
        
//         axios(config)
//         .then(async function (response) {
//             resData = response.data ; //JSON.stringify(response.data);
//             console.log(resData.data[0]);
        
//             let imagePath = './images/'
        
//             // 파일 다운로드
//             await download(resData.data[0].download_url, imagePath+resData.data[0].origin_file_nm, function(){
//                 console.log('done');
//             });
//         })
//         .catch(function (error) {
//         console.log(error);
//         });
// })

let contryInfo = (async ( arr ) => {
    return arr.map( async (country, index)  => {
        let countryInfo = getFlagImage(country.country_nm);
        let imagePath = './images/';        
        // console.log('countryInfo', countryInfo);
        // 파일 다운로드
        await download(countryInfo.download_url, imagePath+countryInfo.origin_file_nm, function(){
            console.log('done');
        });
    })
})

// 국가명 가져오기
contryInfo(contryJson);






app.listen(3000, console.log("Server is running..."));