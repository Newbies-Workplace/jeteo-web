import React from "react";

// tslint:disable-next-line:interface-name
interface Props {
    side: "left" | "right";
}

// eslint-disable-next-line react/display-name
export default ({ side }: Props) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <h1 style={{fontFamily: "lato", fontSize: "300px", marginBlockStart: "0", marginBlockEnd: "0"} && side === "left" ? { marginRight: "24px" } : { marginLeft: "24px" }}>
        4
    </h1>
);