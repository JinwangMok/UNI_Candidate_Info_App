import axios from "axios";
import React, { useEffect } from "react";
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
                console.log(response);
            })
    },[])

    return(
        <div>
            I'm candy!
        </div>
    )
}

export default Candidates;