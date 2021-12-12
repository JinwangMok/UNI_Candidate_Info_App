import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import { FaLocationArrow } from "react-icons/fa";

function Candidate(props){
    const [newsList, setNewsList] = useState([]);
    const [newsUpdateTime, setNewsUpdateTime] = useState('');

    useEffect(()=>{
        axios.get(`/api/rss/${props.huboInfos.name[0]}`)
        .then(response => {
            props.setHuboNewsData(response.data);
            console.log(response.data);

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
    }, [])

    return(
        <section className="Candidate">
            <header>
                <section className="Candidate_mainHeader">
                    <div>
                        <h2>{props.huboInfos.name[0]}</h2>
                        <p>{"기호 " + props.huboInfos.giho[0] + "번 "}</p>
                    </div>
                    <Link to={'/candidates'}>
                        <img src={ logo } alt="logo"/>
                        <span>목록</span>
                    </Link>
                </section>
                <section className="Candidate_subHeader">
                    <h3>{"[" + props.sgId + "] " + props.sgName}</h3>
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
                        <div className="Candidate_huboInfo_content">
                            {props.huboInfos.jdName[0]}
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
                    <h3>후보자 공약</h3>
                    {   
                        props.huboPromises.map((value) => {
                            return(
                                <li>
                                    <div className="Candidate_huboinfo_promise">
                                        <h4>{value[0] + ". " + value[2]}</h4>
                                        <p>{"🏷" + value[1]}</p>
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
            <section className="Candidate_huboArticle">
                <ul>
                    <h3>[후보자 관련 기사]</h3>
                    <p>
                        { newsUpdateTime }
                    </p>
                    {
                        newsList.slice(0,10).map(news => {
                            return(
                                <li key={news.link[0]} className="Candidate_huboArticle_news">
                                    <a href={news.link[0]}>🗞{news.title[0]}</a>
                                </li>
                            )
                        })
                    }
                    <p>...from. Goole News📰</p>
                </ul>
            </section>
        </section>
    )
}

export default Candidate;