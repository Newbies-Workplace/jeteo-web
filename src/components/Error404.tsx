import React from "react";

import Planet404 from "../assets/vectors/404-planet.svg"

import GalaxyBg from "../assets/images/GalaxyBg.png";

// eslint-disable-next-line react/display-name
export default function() {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        // tslint:disable-next-line:max-line-length
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundImage: `url(${GalaxyBg})`}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <h1 style={{fontFamily: "lato", fontSize: "300px", marginBlockStart: "0", marginBlockEnd: "0", marginRight: "24px", color: "#FFFFFF"}}>
                    4
                </h1>
                <Planet404 />
                <h1 style={{fontFamily: "lato", fontSize: "300px", marginBlockStart: "0", marginBlockEnd: "0", marginLeft: "24px", color: "#FFFFFF"}}>
                    4
                </h1>
            </div>
            {/* tslint:disable-next-line:max-line-length */}
            <div style={{marginTop: "96px", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 56px"}}>
                <h1 style={{fontFamily: "lato", fontSize: "28px", marginBlockStart: "0px", marginBlockEnd: "0px"}}>
                    Houston, mamy problem 😔
                </h1>
                <h2 style={{fontFamily: "lato", fontSize: "16px"}}>
                    {/* tslint:disable-next-line:max-line-length */}
                    Strona, ktorej szukałeś, zagubiła się na innej<br />planecie. Nasz zespół astronautów już trenuje<br /> do misji poszukiwawczej!
                </h2>
                {/* tslint:disable-next-line:max-line-length */}
                <button style={{fontFamily: "lato", fontSize: "18px", color: "#071018", border: "2px solid #071018", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 20px", backgroundColor: "transparent", marginTop: "24px"}}>
                    Powrót na stronę główną
                </button>
            </div>
        </div>
    );
}