import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from "./Home";
import Candidates from "./Candidates";
import Candidate from "./Candidate";
import sgIdData from "../data/sgIdData.json";

function Main(){
    const [sgType, setSgType] = useState({});
    const [sgName, setSgName] = useState("");
    const [sgId, setSgId] = useState("");
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [sdNames, setSdNames] = useState([]);
    const [sggNames, setSggNames] = useState([]);
    const [sgIdList, setSgIdList] = useState(sgIdData["list"]);
    const [search, setSearch] = useState("unavailable");
    const [huboList, setHuboList] = useState([]);
    const [huboId, setHuboId] = useState("")
    const [huboInfos, setHuboInfos] = useState({});
    const [huboPromises, setHuboPromises] = useState([]);
    const [huboNewsData, setHuboNewsData] = useState({});
    const [jundangInfo, setJundangInfo] = useState([]);

    let props = {
        sgType : sgType,
        setSgType : setSgType,
        sgName : sgName,
        setSgName : setSgName,
        sgId : sgId,
        setSgId : setSgId,
        region1 : region1,
        setRegion1 : setRegion1,
        region2 : region2,
        setRegion2 : setRegion2,
        sdNames : sdNames,
        setSdNames : setSdNames,
        sggNames : sggNames,
        setSggNames : setSggNames,
        sgIdList : sgIdList,
        setSgIdList : setSgIdList,
        search : search,
        setSearch : setSearch,
        huboList : huboList,
        setHuboList : setHuboList,
        huboId : huboId,
        setHuboId : setHuboId,
        huboInfos : huboInfos,
        setHuboInfos : setHuboInfos,
        huboPromises : huboPromises,
        setHuboPromises : setHuboPromises,
        huboNewsData : huboNewsData,
        setHuboNewsData : setHuboNewsData,
        jundangInfo : jundangInfo,
        setJundangInfo : setJundangInfo
    }

    return(
        <Router>
            <main className="Main">
                <section className="Contents">
                    <Routes>
                        <Route exact path="/" element={<Home {...props}/>} />
                        <Route path="/candidates" element={<Candidates {...props}/>} />
                        <Route path="/candidate" element={<Candidate {...props}/>} />
                    </Routes>
                </section>
            </main>
        </Router>
    );
}

export default Main;