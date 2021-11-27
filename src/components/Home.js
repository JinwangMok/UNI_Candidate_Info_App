import React, { useState } from "react";
import logo from "../img/Home_logo.png"
import regionData from "../data/regionData.json";

function Home(){
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [regions, setRegions] = useState([]);

    const changeRegion1OptionHandler = (e) =>{
        setRegion1(e.target.value);
        regionData.map((item) => {
            if(Object.keys(item)[0] == e.target.value){
                setRegions(...Object.values(item));
            }
        })
    }

    const changeRegion2OptionHandler = (e) => {
        setRegion2(e.target.value);
    }
    
    return(
        <section className="Home">
            <div className="Home_logoBtn">
                <img src={ logo } alt="logo"/>
            </div>
            <section className="Home_voteClass">
                <span>선거분류</span>
                <select>
                    {/*여기는 추후 데이터를 받아서 채워야함*/}
                </select>
            </section>
            <section className="Home_regions">
                <span>선거구</span>
                <div className="Home_region1">
                    <select onChange={changeRegion1OptionHandler}>
                        <option selected="selected">-</option>
                        { 
                            regionData.map((item) =>{
                                return(
                                    <option>
                                        {Object.keys(item)[0]}
                                    </option>
                                )
                            }) 
                        }
                    </select>
                </div>
                <div className="Home_region2">
                    <select onChange={changeRegion2OptionHandler}>
                        <option selected="selected">-</option>
                        { regions.map((item) => {
                            return(
                                <option>
                                    { item }
                                </option>
                            )
                        })}
                    </select>
                </div>
            </section>
        </section>
    )
}

export default Home;