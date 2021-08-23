import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "../Home";

describe("Tests for Home component", () => {
    it("Render correctly", async () => {
        render(<Home />);
    });
});
