const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');
const { response } = require('express');

const useApiAxios = (url) => {
    const promise = axios.get(url);

    const dataPormise = promise.then(response => response.data);

    return dataPormise;
}


router.post('/sgCandidate', (req, res)=>{
    //getPoelpcddRegistSttusInfoInqire : 예비후보자
    //getPofelcddRegistSttusInfoInqire : 후보자
    console.log(req.body);
    let Reginfo = ['getPofelcddRegistSttusInfoInqire', 'getPoelpcddRegistSttusInfoInqire']//[0]:후보자, [1]:예비후보자
    // let url = `http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&sdName=${encodeURI(req.body.region1)}&sggName=${encodeURI(req.body.region2)}&pageNo=1&numOfRows=1000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`;
    // console.log(url);
    // axios({
    //     method : 'get',
    //     url : url
    // }).then(response=>{
    //     console.log(response.data);
        // let xml = response.data;
        // console.log(xml);
        // console.log(typeof(xml));
        // xml2js.parseString(response.data, (err, result) => {
        //     let tmp = JSON.stringify(result);
        //     console.log(tmp);
        //     res.json(tmp);
        // })
    // })
})

router.post('/getSdName', (req, res)=>{
    console.log(req.body);//{sgType: '1', sgId: '20220309'}
    
    let url = `http://apis.data.go.kr/9760000/CommonCodeService/getCommonSggCodeList?sgId=${req.body.sgId}&sgTypecode=${req.body.sgType}&pageNo=1&numOfRows=5000&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D`;
    
    useApiAxios(url).then(data => { 
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
    
    useApiAxios(url).then(data => { 
        // console.log(data);
        xml2js.parseString(data, (err, result)=>{
            let resultCode = result.response.header[0].resultCode[0]
            let totalLists = result.response.body[0].items[0].item //253개 선거구 리스트

            let sggLists = [];//선거구 이름 리스트(sggName)

            totalLists.map((item)=>{
                if(item.sdName[0] == req.body.sdName){
                    sggLists.push(item.sggName[0]);
                }
            })
            
            if(resultCode !== "INFO-00"){
                res.send({ error : resultCode });
                return;
            }
            
            res.send(sggLists);
        })
    });

});

module.exports = router;