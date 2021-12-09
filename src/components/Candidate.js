import axios from "axios";
import React, { useEffect } from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../img/Home_logo.png"
import { FaLocationArrow } from "react-icons/fa";
//import axios from "axios";

function Candidate(props){
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
        <section className="Candidate">
            i'm candy!
        </section>
    )
}

export default Candidate;