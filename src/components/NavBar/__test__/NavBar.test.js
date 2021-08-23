import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

import NavBar from "../NavBar";

describe("Testing navBar component", () => {
    it("Render correctly", () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
    });

    it("Check if have logo and link to home page", () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        const logoDom = screen.getByRole("icon-logo");

        expect(logoDom).toHaveAttribute("href", "/");
    });

    it("Check if have cart icon and link to cart page", () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        const cartIcon = screen.getByRole("button");

        expect(cartIcon).toHaveAttribute("href", "/cart");

        expect(cartIcon).toBeInTheDocument();
    });

    it("should render number 1 when pass one item in the cart", () => {
        render(
            <MemoryRouter>
                <NavBar totalItems={1} />
            </MemoryRouter>
        );

        const paragraphElement = screen.getByText(/1/i);
        expect(paragraphElement).toBeInTheDocument();
    });
});
