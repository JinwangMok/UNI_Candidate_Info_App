import axios from "axios";
import React, { useState } from "react";
import jdColorCode from "../data/jdColorCode.json";

function Candidate_JundangInfo(props){
    const [showJdInfo, setShowJdInfo] = useState(false);

    const JundangInfoHandler = (e) => {
        props.setJundangInfo([{
            "title" :"죄송합니다. 잠시만 기다려주세요...",
            "realm" : "정보를 불러오고 있습니다.",
            "cont" : "...\n"
        }])
        if(showJdInfo){
            setShowJdInfo(false);
        }else{
            axios.get(`/api/jdinfo/${props.sgId}/${props.huboInfos.jdName[0]}`)
            .then(response => {
                console.log(response);
                if("Error" in response.data){
                    props.setJundangInfo([{
                        "title" : ". . .죄송합니다. 정당 정책 정보가 없습니다.",
                        "realm" : "열람할 수 없는 정보입니다.",
                        "cont" : "후보의 다른 정보들을 즐겨주세요!😊"
                    }])
                }else{
                    props.setJundangInfo(response.data);
                }
            })
            setShowJdInfo(true);
        }
    }

    if(showJdInfo){
        return(
            <section className="Candidate_JundangInfo">
                <div className="Candidate_JundangInfo_showBtn" onClick={JundangInfoHandler}>
                    <button>✕</button>
                </div>
                <ul>
                    <div>
                        <div className="Candidate_huboInfo_JD_color" style={props.huboInfos.jdName[0] in jdColorCode?{ "backgroundColor" : jdColorCode[props.huboInfos.jdName[0]]}:{"backgroundColor" : "gray"}}></div>
                        <h3>{props.huboInfos.jdName[0]}</h3>
                        <div className="Candidate_huboInfo_JD_color" style={props.huboInfos.jdName[0] in jdColorCode?{ "backgroundColor" : jdColorCode[props.huboInfos.jdName[0]]}:{"backgroundColor" : "gray"}}></div>
                    </div>
                    {
                        props.jundangInfo.map(info => {
                            return(
                                <li key={info.title} className="Candidate_JundangInfo_info">
                                    <h4>{info.title}</h4>
                                    <p>{"🏷 " + info.realm}</p>
                                    <p>{info.cont.split('\n').map(line =>{
                                        return(
                                            <span>
                                                {line}
                                                <br />
                                            </span>
                                        )
                                    })}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
            </section>
        )
    }else{
        return(
            <section className="Candidate_JundangInfo">
                <div className="Candidate_JundangInfo_showBtn" onClick={JundangInfoHandler}>
                    <button>🔍 정당 정책 정보 열람</button>
                </div>
            </section>
        )
    }
}

export default Candidate_JundangInfo;