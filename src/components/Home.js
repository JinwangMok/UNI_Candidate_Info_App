import React from "react";
import logo from "../img/Home_logo.png"
import addrData from "../data/addrData.json";

function Home(){
    return(
        <div className="Home_logoBtn">
            <img src={ logo } alt="logo"/>
        </div>

    )
}

export default Home;