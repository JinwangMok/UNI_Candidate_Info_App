import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Nav from "./Nav";

function Main(){
    return(
        <Router>
            <main className="Main">
                <Nav />
                <section className="Contents">
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
                </section>
            </main>
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