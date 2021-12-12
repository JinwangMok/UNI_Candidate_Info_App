import axios from "axios";
import React, { useState, useEffect } from "react";

function Candidate_JundangInfo(props){
    const [showJdInfo, setShowJdInfo] = useState(false);
    const JundangInfoHandler = (e) => {
        if(e.target.value == "접기"){
            setShowJdInfo(false);
        }else{
            axios.get(`/api/jdinfo/${props.sgId}/${props.huboInfos.jdName[0]}`)
            .then(response => {
                console.log(response);
            })
            setShowJdInfo(true);
        }
    }

    if(showJdInfo){
        return(
            <section className="Candidate_JundangInfo">
                <div className="Candidate_JundangInfo_showBtn" onClick={JundangInfoHandler}>
                    접기
                </div>
            </section>
        )
    }else{
        return(
            <section className="Candidate_JundangInfo">
                <div className="Candidate_JundangInfo_showBtn" onClick={JundangInfoHandler}>
                    정당 정책 정보 열람하기
                </div>
            </section>
        )
    }
}

export default Candidate_JundangInfo;