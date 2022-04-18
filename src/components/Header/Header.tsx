import React from "react";
import HeaderProps from "../../interfaces/props/HeaderProps";
import "./Header.css";

function Header(props: HeaderProps) {

    return (
        <header className={(props && props.className ? props && props.className : "" )}>
            <div className="headerContent">

                <div className="left">

                </div>
                
                <div className="center">
                    <h1>market</h1>
                </div>

                <div className="right">
                    <div className="shoppingCart">
                        <span>CART</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
