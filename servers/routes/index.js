const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

const useXmlApiAxios = (url) => {
    const promise = axios.get(url);
    
    const dataPromise = promise.then(response => response.data);
    
    return dataPromise;
}

router.get('/rss/:name', (req, res) => {
    console.log(req.params.name);
    
    let url = `https://news.google.com/rss/search?q=${encodeURI(req.params.name)}&hl=ko&gl=KR`;

    useXmlApiAxios(url)
    .then(data => {
        xml2js.parseString(data, (err, result)=>{
            if(err){
                console.log(err);
            }
            
            let channel = result.rss.channel[0];

            console.log(channel);

            res.send(channel);
        })
    })
})

router.post('/huboPromises', (req, res) => {
    console.log(req.body);

    let url = `http://apis.data.go.kr/9760000/ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire?pageNo=1&numOfRows=1000&sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&cnddtId=${req.body.huboId}&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`

    console.log(url)

    useXmlApiAxios(url)
    .then(data => {
        xml2js.parseString(data, (err, result)=>{
            if(err){
                console.log(err);
            }

            if("response" in result){//값이 있음!
                res.send(result.response.body[0].items[0].item[0]);
            }else{
                res.send({"Error" : true});
            }
        })
    })
    .catch(err => {
        console.log(err);
    })
    .finally(()=>{
        console.log("공약 요청 끝!")
    })
})


router.post('/sgCandidate', (req, res)=>{
    console.log(req.body);

    let regInfo = ['getPofelcddRegistSttusInfoInqire', 'getPoelpcddRegistSttusInfoInqire']//[0]:후보자, [1]:예비후보자
    let URL = '';
    if(req.body.sgId != "" && req.body.sgType != ""){//값이 있다면...
        
        URL = `http://apis.data.go.kr/9760000/PofelcddInfoInqireService/${regInfo[0]}?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&sdName=${encodeURI(req.body.region1)}&sggName=${encodeURI(req.body.region2)}&pageNo=1&numOfRows=1000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`
        useXmlApiAxios(URL)//후보자로 요청
        .then(data => {
            xml2js.parseString(data, (err, result)=>{
                
                if("response" in result){
                    res.send(result.response.body[0].items[0].item);

                }else{
                    URL = `http://apis.data.go.kr/9760000/PofelcddInfoInqireService/${regInfo[1]}?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&sdName=${encodeURI(req.body.region1)}&sggName=${encodeURI(req.body.region2)}&pageNo=1&numOfRows=1000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`
                    useXmlApiAxios(URL)//예비 후보자로 요청
                    .then(data => {
                        xml2js.parseString(data, (err, result)=>{
                            if("response" in result){
                                res.send(result.response.body[0].items[0].item);
            
                            }else{
                                res.send({"Error" : true});
                            }
                        })
                    })
                }
            })
        })
    }
})

router.post('/getSdName', (req, res)=>{
    console.log(req.body);//{sgType: '1', sgId: '20220309'}
    
    let url = `http://apis.data.go.kr/9760000/CommonCodeService/getCommonSggCodeList?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&pageNo=1&numOfRows=5000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`;
    
    useXmlApiAxios(url)
    .then(data => { 
        // console.log(data);
        xml2js.parseString(data, (err, result)=>{
            let resultCode = result.response.header[0].resultCode[0]
            let totalLists = result.response.body[0].items[0].item //253개 선거구 리스트

            let sdLists = [];//시도 이름 리스트(sdName)
            totalLists.map((item)=>{
                if(sdLists.indexOf(item.sdName[0]) == -1){
                    sdLists.push(item.sdName[0])
                }
            })
            
            if(resultCode !== "INFO-00"){
                res.send({ error : resultCode });
                return;
            }
            
            res.send(sdLists);
        })
    });

});

router.post('/getSggName', (req, res)=>{
    console.log(req.body);//{ sgType: '2', sgId: '20200415', sdName: '부산광역시' }
    
    let url = `http://apis.data.go.kr/9760000/CommonCodeService/getCommonSggCodeList?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&pageNo=1&numOfRows=5000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`;
    
    useXmlApiAxios(url)
    .then(data => { 
        console.log("선거구 xml 받아옴!")
        xml2js.parseString(data, (err, result)=>{
            console.log("선거구 xml 파싱...");
            let totalLists = result.response.body[0].items[0].item //253개 선거구 리스트

            let sggLists = [];//선거구 이름 리스트(sggName)

            totalLists.map((item)=>{
                if(item.sdName[0] == req.body.sdName){
                    sggLists.push(item.sggName[0]);
                }
            })
            
            res.send(sggLists);
        })
    });

});

module.exports = router;