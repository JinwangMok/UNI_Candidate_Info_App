import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import jdColorCode from "../data/jdColorCode.json";
import { FaChevronLeft, FaLocationArrow } from "react-icons/fa";
import Candidate_JundangInfo from "./Candidate_JundangInfo";

function Candidate(props){
    const [newsList, setNewsList] = useState([]);
    const [newsUpdateTime, setNewsUpdateTime] = useState('');

    useEffect(()=>{
        if(props.sgId == "" ||  props.sgType == "" || props.region1 == "" || props.region2 == ""){
            setNewsUpdateTime("");
            setNewsList([]);
        }else{
            axios.get(`/api/rss/${props.huboInfos.name[0]}`)
            .then(response => {
                props.setHuboNewsData(response.data);    
                let time = new String(
                    response.data.lastBuildDate[0].slice(5, 7) + "/" +
                    response.data.lastBuildDate[0].slice(8, 11) + "/" +
                    response.data.lastBuildDate[0].slice(12, 16) + "(" +
                    response.data.lastBuildDate[0].slice(0,3).toUpperCase() + ") " +
                    ((parseInt(response.data.lastBuildDate[0].slice(16,19))+9)%24) +
                    response.data.lastBuildDate[0].slice(19,26) + "업데이트(KST)"
                )
                setNewsUpdateTime(time);
                setNewsList(response.data.item);
            })
        }
    }, [])
    if(props.sgId == "" ||  props.sgType == "" || props.region1 == "" || props.region2 == ""){
        return(
            <section className="Error">
                <span>죄송합니다.</span>
                <span>데이터가 초기화되었거나, 잘못되었습니다.</span>
                <span>아래의 홈버튼을 눌러, 홈에서 다시 요청해주세요.</span>
                <div>
                    <Link to={'/'}>
                        <img src={ logo } alt="logo"/>
                        <span>👆🏻클릭!</span>
                    </Link>
                </div>
            </section>
        )
    }else{
        return(
            <section className="Candidate">
                <header>
                    <section className="Candidate_mainHeader">
                        <Link to={'/candidates'}>
                            <FaChevronLeft />
                        </Link>
                        <div>
                            <h2>{props.huboInfos.name[0]}</h2>
                            <p>
                                {
                                    "giho" in props.huboInfos?
                                    "기호 " + props.huboInfos.giho[0] + "번 ":
                                    "예비 후보자"
                                }
                            </p>
                        </div>
                        <Link to={'/'}>
                            <img src={ logo } alt="logo"/>
                            <span>홈으로</span>
                        </Link>
                    </section>
                    <section className="Candidate_subHeader">
                        <h3>
                            {
                                props.sgId.slice(0, 4) + "년 " + 
                                props.sgId.slice(4, 6) + "월 " +
                                props.sgId.slice(6) + "일 "
                            }
                            {props.sgName=="대통령선거"?props.sgName+"🇰🇷":props.sgName}
                        </h3>
                        <div>
                            <FaLocationArrow />
                            <h4>{props.region2}</h4>
                        </div>
                    </section>
                </header>
                <hr />
                <section className="Candidate_huboInfo">
                    <ul>
                        <h3>[후보자 정보]</h3>
                        <li>
                            <div className="Candidate_huboInfo_class">후보이름</div>
                            <div className="Candidate_huboInfo_content">
                                {props.huboInfos.name[0] + "[" + props.huboInfos.hanjaName[0] + "]"}
                            </div>
                        </li>
                        <li>
                            <div className="Candidate_huboInfo_class">소속</div>
                            <div className={"Candidate_huboInfo_content Candidate_huboInfo_JD"}>
                                <div className="Candidate_huboInfo_JD_color" style={props.huboInfos.jdName[0] in jdColorCode?{ "backgroundColor" : jdColorCode[props.huboInfos.jdName[0]]}:{"backgroundColor" : "gray"}}></div>
                                <div>{props.huboInfos.jdName[0]}</div>
                            </div>
                        </li>
                        <li>
                            <div className="Candidate_huboInfo_class">선거구명</div>
                            <div className="Candidate_huboInfo_content">
                                {props.huboInfos.sggName[0]}
                            </div>
                        </li>
                        <li>
                            <div className="Candidate_huboInfo_class">신상정보</div>
                            <div className="Candidate_huboInfo_content">
                                생년월일 : {props.huboInfos.birthday[0].slice(0,4)+"년 "+props.huboInfos.birthday[0].slice(4,6)+"월 "+props.huboInfos.birthday[0].slice(6,8)+"일 "}(만 {props.huboInfos.age[0]}세)
                            </div>
                            <div className="Candidate_huboInfo_content">
                                성별 : {props.huboInfos.gender[0]}
                            </div>
                            <div className="Candidate_huboInfo_content">
                                주소 : {props.huboInfos.addr[0]}
                            </div>
                            <div className="Candidate_huboInfo_content">
                                직업 : {props.huboInfos.job[0]}
                            </div>
                            <div className="Candidate_huboInfo_content">
                                학력 : {props.huboInfos.edu[0]}
                            </div>
                        </li>
                        <li>
                            <div className="Candidate_huboInfo_class">경력사항</div>
                            <div className="Candidate_huboInfo_content">
                                <ul>
                                    <li>
                                        {props.huboInfos.career1[0]}
                                    </li>
                                    <li>
                                        {props.huboInfos.career2[0]}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <h3>[후보자 공약]</h3>
                        {   
                            props.huboPromises.map((value) => {
                                return(
                                    <li>
                                        <div className="Candidate_huboinfo_promise">
                                            <h4>{value[0] + ". " + value[2]}</h4>
                                            <p>{"🏷 " + value[1]}</p>
                                            {value[3][0].split('\n').map(line => {
                                                return(
                                                    <span>
                                                        {line}
                                                        <br />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </li>
                                )

                            })
                        }
                    </ul>
                </section>
                <hr />
                <Candidate_JundangInfo {...props}/>
                <section className="Candidate_huboArticle">
                    <ul>
                        <h3>[후보자 관련 기사]</h3>
                        <span>
                            { newsUpdateTime }
                        </span>
                        {
                            newsList.slice(0,30).map(news => {
                                return(
                                    <li key={news.link[0]} className="Candidate_huboArticle_news">
                                        <a href={news.link[0]} target="_blank">{news.title[0]}</a>
                                    </li>
                                )
                            })
                        }
                        <p>...from. Goole News📰</p>
                    </ul>
                </section>
                <hr />
            </section>
        )
    }
}

export default Candidate;