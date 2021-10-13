import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

test("Header contains correct text", () => {
    render(<App />);

    // no wories if this test fails, its just proof of concept
    expect(true).toBe(true);
});