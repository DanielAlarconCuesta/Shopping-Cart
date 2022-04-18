import React from "react";
import FooterProps from "../../interfaces/props/FooterProps";
import "./Footer.css";

function Footer(props: FooterProps) {
    return (
        <footer className={(props && props.className ? props && props.className : "" )}>
            <h2>Footer</h2>
        </footer>
    )
}

export default Footer;
