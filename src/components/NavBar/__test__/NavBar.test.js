import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

import NavBar from "../NavBar";

it("Render correctly", () => {
    render(<NavBar />, { wrapper: MemoryRouter });
});

it("Check if have logo and link to home page", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const logoDom = screen.getByRole("icon-logo");

    expect(logoDom).toHaveAttribute("href", "/");
});

it("Check if have cart icon and link to cart page", () => {
    render(<NavBar />, { wrapper: MemoryRouter });

    const cartIcon = screen.getByRole("button");

    expect(cartIcon).toHaveAttribute("href", "/cart");

    expect(screen.getByRole("button")).toBeInTheDocument();
});
