import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import { FaLocationArrow } from "react-icons/fa";
import jdColorCode from "../data/jdColorCode.json";
//import axios from "axios";

function Candidates(props){

    const selectHuboHandler = (e) => {
        let postBody = {};

        props.setHuboId(e.currentTarget.id);

        props.huboList.map((hubo)=>{
            if(hubo.huboid == e.currentTarget.id){
                props.setHuboInfos(hubo);
            }
        })

        if(props.sgType == '1' || props.sgType == '3'||
        props.sgType == '4' || props.sgType == '11'){ // 이외의 선거타입은 공약서를 제출하지 않음.
            
            postBody = {
                sgId : props.sgId,
                sgType : props.sgType,
                huboId : e.currentTarget.id
            }

            props.setHuboPromises([]);//올바른 정보 전달을 위한 초기화

            axios.post('/api/huboPromises', postBody)
            .then(response => {

                if("Error" in response.data){
                    props.setHuboPromises([["", " 공약은 대통령, 도시자, 구∙시∙군의장, 교육감 선거에서만 확인 가능하며 지난 투표에서는 당선인의 공약만 열람 가능합니다.", ". .죄송합니다. 공약을 열람할 수 없는 후보입니다.", " "]])
                }else{
                    let preSet = Object.values(response.data).slice(11);
                    let forSet = new Array();
                    for(let i = 0; i < preSet.length; i++){
                        if(i % 4 == 0){
                            let temp = preSet.slice(i, i+4);
                            forSet.push(temp);
                        }
                    }
                    props.setHuboPromises(forSet);
                    // console.log("후보 공약 요청 성공");
                    // console.log(forSet);
                }
            })
            .catch(err => console.log(err))
        }else{
            props.setHuboPromises([["", " 공약은 대통령, 도시자, 구∙시∙군의장, 교육감 선거에서만 확인 가능하며 지난 투표에서는 당선인의 공약만 열람 가능합니다.", ". .죄송합니다. 공약을 열람할 수 없는 후보입니다.", " "]]);
        }
    }

    return(
        <section className="Candidates">
            <header>
                <section className="Candidates_mainHeader">
                    <h2>{"후보자 목록"}</h2>
                    <Link to={'/'}>
                        <img src={ logo } alt="logo"/>
                        <span>Home</span>
                    </Link>
                </section>
                <section className="Candidates_subHeader">
                    <h3>{"[" + props.sgId + "] " + props.sgName}</h3>
                    <div>
                        <FaLocationArrow />
                        <h4>{props.region2}</h4>
                    </div>
                </section>
            </header>
            <ul className="Candidates_list">
                {
                    props.huboList.map((item)=>{
                        if(item.status[0] == '등록'){
                            return(
                                <li key={item.huboid[0]} id={item.huboid[0]} onClick={selectHuboHandler} style={jdColorCode[item.jdName]?{backgroundColor : jdColorCode[item.jdName]}:{backgroundColor :"gray"}}>
                                    <Link to="/candidate">
                                        <div className="Candidates_list_name">
                                            <h5>
                                                {"giho" in item?"기호 " + item.giho[0] + "번":"예비후보자"}
                                            </h5>
                                            <h3>
                                                {item.name[0]}
                                            </h3>
                                        </div>
                                        <div className="Candidates_list_info">
                                            <h4>
                                                {item.jdName[0]}
                                            </h4>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </section>
    )
}

export default Candidates;