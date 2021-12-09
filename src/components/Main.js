import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Candidates from "./Candidates";
import Party from "./Party";

function Main(){
    const [sgType, setSgType] = useState({});
    const [sgId, setSgId] = useState("");
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [sdNames, setSdNames] = useState([]);
    const [sggNames, setSggNames] = useState([]);
    const [sgIdList, setSgIdList] = useState([]);
    const [search, setSearch] = useState("unavailable");

    // useEffect(()=>{

    // }, [sgId])

    let props = {
        sgType : sgType,
        setSgType : setSgType,
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
        setSearch : setSearch
    }

    return(
        <Router>
            <main className="Main">
                <Nav />
                <section className="Contents">
                    <Routes>
                        <Route exact path="/" element={<Home {...props}/>}>
                        </Route>
                        <Route path="/candidates" element={<Candidates {...props}/>}>
                            candidates
                        </Route>
                        <Route path="/party" element={<Party />}>
                            party
                        </Route>
                    </Routes>
                </section>
            </main>
        </Router>
    );
}

export default Main;