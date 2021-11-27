import React, { useState } from "react";
import { FaBars, FaSearch, FaChevronLeft } from "react-icons/fa";

function Nav(){
    let [showMenu, setShowMenu] = useState("hide");
    
    function toggleBtn(){
        if(showMenu == "hide"){
            return(
                <FaBars />
            );
        }else{
            return(
                <FaChevronLeft />
            );
        }
    }
    return(
        <nav className="Nav">
            <div className="Nav_toggleBtn" onClick={ () => { showMenu=="show"?setShowMenu("hide"):setShowMenu("show") } }>
                { toggleBtn() }
            </div>
            <div className={ showMenu }>
                <div className="Nav_search">
                    <input type="text" placeholder="후보자 이름으로 검색하세요." className="Nav_searchText"/>
                    <div className="Nav_searchBtn">
                        <FaSearch />
                    </div>
                </div>
                <div className="Nav_lists">{/* 추후 서버 데이터로 변경 고려 */}
                    <span>바로가기</span>
                    <ul>
                        <li>2022 대선</li>
                        <li>정당별 정책정보</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;