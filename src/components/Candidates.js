import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import { FaLocationArrow } from "react-icons/fa";
//import axios from "axios";

function Candidates(props){
    let postBody = {};
    if(props.sgType == '1'){
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

    useEffect(()=>{
        console.log(postBody);
        axios.post('/api/sgCandidate', postBody)
            .then(response => {
                props.setHuboList(response.data);
            })
    },[])



    return(
        <section className="Candidates">
            <header>
                <section className="Candidates_mainHeader">
                    <h2>{"후보자 목록"}</h2>
                    <Link to={'/'}>
                        <img src={ logo } alt="logo"/>
                        <span>홈으로</span>
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
                        if(item.status[0] != '사퇴'){
                            return(
                                <li key={item.huboid[0]}>
                                    <div className="Candidates_list_name">
                                        <h5>
                                            {"기호 " + item.giho[0] + "번"}
                                        </h5>
                                        <h3>
                                            {item.name[0]}
                                        </h3>
                                    </div>
                                    <div className="Candidates_list_info">
                                        <h4>
                                            {item.jdName[0]}
                                        </h4>
                                        <span>
                                            <Link to="/candidate">
                                                자세히보기
                                            </Link>
                                        </span>
                                    </div>
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