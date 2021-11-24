import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

test("<App/> render app", () => {
    expect(document.querySelector('body')?.hasChildNodes()).toBe(false);

    render(<App />);

    expect(document.querySelector('body')?.hasChildNodes()).toBe(true);
});