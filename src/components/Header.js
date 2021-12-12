import React from "react";
import titleLogo from "../img/title.png";
function Header(){
    return(
        <header className="Header">
            <img src={titleLogo}/>
        </header>
    );
}

export default Header;