//추후 css 로 sdName, sggName이 로딩된 후에 선택박스가 나타나도록 수정해서 UX 개선시키자.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import sgCodeData from "../data/sgCodeData.json";
import sgIdData from "../data/sgIdData.json";
import axios from "axios";


function Home(props){

    const changeRegion1OptionHandler = (e) =>{
        props.setRegion1(e.target.value);
        let pBody = {
            sgType : props.sgType,
            sgId : props.sgId,
            sdName : e.target.value
        }
        axios.post('/api/getSggName', pBody)
            .then(response=>{
                props.setSggNames(response.data);
                console.log(response.data);
        });
    }
    useEffect(() => props.setSgIdList(sgIdData["list"].reverse()), []);
    
    const changeSgTypeHandler = (e) => props.setSgType(Object.keys(sgCodeData).find(key=>sgCodeData[key]==e.target.value));

    const changeRegion2OptionHandler = (e) => props.setRegion2(e.target.value);

    const changeSgIdHandler = (e) => {//sgId가 결정되어야 선거구를 찾을 수 있음.
        props.setSgId(e.target.value.slice(1, 9));
        let pBody = {
            sgType : props.sgType,
            sgId : e.target.value.slice(1, 9)
        }
        props.setSgName(e.target.value.slice(11));
        console.log(e.target.value.slice(1, 9))
        console.log(e.target.value.slice(11));
        
        axios.post('/api/getSdName', pBody)
            .then(response=>{
                props.setSdNames(response.data);
            });
    }

    useEffect(() => {
        if(!props.sgType){
            props.setSearch("unavailable");
        }else if(props.sgType == "1"){
            if(props.sgId) props.setSearch("available");
            else props.setSearch("unavailable");
        }else{
            if(props.sgId && props.region1 && props.region2) props.setSearch("available");
            else props.setSearch("unavailable");
        }
    }, [props.sgType, props.sgId, props.region1, props.region2]);

    return(
        <section className="Home">
            <div className="Home_logoBtn">
                <img src={ logo } alt="logo"/>
            </div>
            <section className="Home_voteClass">
                <span>선거분류</span>
                <select onChange={changeSgTypeHandler}>
                    <option selected="selected"></option>
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
                    <option selected="selected"></option>
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
            <section className="Home_regions">
                <span>선거구</span>
                <div className="Home_region1">
                    <select onChange={changeRegion1OptionHandler}>
                        <option selected="selected"></option>
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
                        <option selected="selected"></option>
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
            <button className={props.search}>
                <Link to={"/candidates"}>
                    <img src={ logo } alt="logo"/>
                </Link>
            </button>
        </section>
    )
}

export default Home;