const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

router.get('/sgCode', (req, res) => {
    axios({
        method : 'get',
        url : 'http://apis.data.go.kr/9760000/CommonCodeService/getCommonSgCodeList?pageNo=1&numOfRows=10&resultType=xml&serviceKey=9HokxV9%2B6g%2Fi1qrzeQ%2BKh5FGdduzfXSOFyjO%2F1QCPdw9LWgzeHsM1uQjYB8B7Y1VZP2v7RoNuq0xQiS%2Bos6HtA%3D%3D'
    }).then((response)=>{
        console.log(response.data);
        // let xml = response.data;
        // console.log(xml);
        // console.log(typeof(xml));
        xml2js.parseString(response.data, (err, result) => {
            let tmp = JSON.stringify(result);
            console.log(tmp);
            res.json(tmp);
        })
    })
});
router.get('/group', (req, res)=>res.json({username:'dev group.jinwang'}));

module.exports = router;