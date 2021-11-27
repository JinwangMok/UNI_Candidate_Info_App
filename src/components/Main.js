import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function Main(){
    return(
        <Router>
            <div className="Main">
            <Routes>
                <Route exact path="/" element={<Home />}>
                </Route>
                <Route path="/candidates" element={<Candidates />}>
                    candidates
                </Route>
                <Route path="/party" element={<Party />}>
                    party
                </Route>
            </Routes>
            </div>
        </Router>
    );
}

function Home(){
    return(
        <div>
            I'm home!
        </div>
    )
}

function Candidates(){
    return(
        <div>
            I'm candy!
        </div>
    )
}

function Party(){
    return(
        <div>
            I'm party!
        </div>
    )
}

export default Main;