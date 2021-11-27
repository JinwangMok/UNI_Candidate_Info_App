import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Candidates from "./Candidates";
import Party from "./Party";

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

export default Main;