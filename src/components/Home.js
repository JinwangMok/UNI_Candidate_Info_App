//추후 css 로 sdName, sggName이 로딩된 후에 선택박스가 나타나도록 수정해서 UX 개선시키자.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import sgCodeData from "../data/sgCodeData.json";

import axios from "axios";


function Home(props){

    const changeSgTypeHandler = (e) => {
        props.setSdNames([]);
        props.setSggNames([]);
        props.setSgType(Object.keys(sgCodeData).find(key=>sgCodeData[key]==e.target.value))
        if(e.target.value != "대통령 선거"){
            props.setSearch("unavailable");
            props.setSgName("");
        }
    }

    const changeSgIdHandler = (e) => {//sgId가 결정되어야 선거구를 찾을 수 있음.
        props.setSgId(e.target.value.slice(1, 9));
        let pBody = {
            sgType : props.sgType,
            sgId : e.target.value.slice(1, 9)
        }
        console.log(pBody);
        props.setSgName(e.target.value.slice(11));
        if(e.target.value.slice(11,17)=="대통령선거"){
            props.setSearch("available");
        }else{
            props.setSearch("unavailable");
            props.setSdNames(["정보를 가져오고 있습니다..."]);
            axios.post('/api/getSdName', pBody)
                .then(response=>{
                    props.setSdNames(response.data);
            });
        }
    }

    const changeRegion1OptionHandler = (e) =>{
        props.setRegion1(e.target.value);
        let pBody = {
            sgType : props.sgType,
            sgId : props.sgId,
            sdName : e.target.value
        }
        props.setSggNames(["정보를 가져오고 있습니다..."]);
        axios.post('/api/getSggName', pBody)
            .then(response=>{
                props.setSggNames(response.data);
                console.log(response.data);
        });
    }

    const changeRegion2OptionHandler = (e) => {
        props.setRegion2(e.target.value)
        if(e.target.value == ""){
            props.setSearch("unavailable");
        }else{
            props.setSearch("available");
        }
    }
    
    const searchListHandler = () =>{
        props.setHuboList([]);
        
        let postBody = {};

        if(props.sgType == '1'){
            props.setRegion1("전국");
            props.setRegion2("대한민국");

            postBody = {
                sgId : props.sgId,
                sgType : props.sgType,
                region1 : "전국",
                region2 : "대한민국"
            }
        }else{
            postBody = {
                sgId : props.sgId,
                sgType : props.sgType,
                region1 : props.region1,
                region2 : props.region2
            }
        }
        console.log(postBody);

        axios.post('/api/sgCandidate', postBody)
            .then(response => {
                console.log(response);
                props.setHuboList(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const setGuidePrinter = () => {
        let guide;
        if(props.search == "available"){
            return(
                <div className="Home_guide">
                    <div className="Home_guideEmoji">👆🏻</div>
                    <div className="Home_guideText">위의 버튼을 눌러 검색하실 수 있습니다.</div>
                </div>
            )
        }else{
            if(props.sgType == ""){
                guide = "선거 분류를 선택해주세요."
            }else if(props.sgName == ""){
                guide = "선거 날짜와 세부분류를 선택해주세요."
            }else{
                guide = "선거구를 선택해주세요."
            }
        } 
        return(
            <div className="Home_guide">
                {guide}
            </div>
        )
    }

    useEffect(() => {
        props.setSgType("");
        props.setSearch("unavailable");
        props.setSgName("");
    }, []);

    return(
        <section className="Home">
            <div className="Home_logoBtn">
                <img src={ logo } alt="logo"/>
            </div>
            <section className="Home_voteClass">
                <span>선거분류</span>
                <select onChange={changeSgTypeHandler}>
                    <option value="" disabled selected="selected">===선거분류===</option>
                    {
                        Object.values(sgCodeData).map((value)=>{
                            return(
                                <option>
                                    {value}
                                </option>
                            )
                        })
                    }
                </select>
            </section>
            <section className="Home_voteId">
                <select onChange={changeSgIdHandler}>
                    <option value="" disabled selected="selected">===날짜 및 세부분류===</option>
                    {
                        props.sgIdList.map((item)=>{
                            if(item["sgTypecode"] == props.sgType){
                                return(
                                    <option>
                                        [{item["sgVotedate"]}] {item["sgName"]}
                                    </option>
                                )
                            }
                        })
                    }
                </select>
            </section>
            <section className={props.sgName == "대통령선거"?"Home_regions_unavailable":"Home_regions"}>
                <span>선거구</span>
                <div className="Home_region1">
                    <select onChange={changeRegion1OptionHandler}>
                        <option value="" disabled selected="selected">===시・도구분===</option>
                        { 
                            props.sdNames.map((item) =>{
                                return(
                                    <option value={ item }>
                                        { item }
                                    </option>
                                )
                            }) 
                        }
                    </select>
                </div>
                <div className="Home_region2">
                    <select onChange={changeRegion2OptionHandler}>
                        <option value="" disabled selected="selected">===선거구===</option>
                        { props.sggNames.map((item) => {
                            return(
                                <option value={ item }>
                                    { item }
                                </option>
                            )
                        })}
                    </select>
                </div>
            </section>
            <button className={props.search} onClick={searchListHandler}>
                <Link to={"/candidates"}>
                    <img src={ logo } alt="logo"/>
                </Link>
            </button>
            {setGuidePrinter()}
        </section>
    )
}

export default Home;