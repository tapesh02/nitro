import React from "react";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../Home";

describe("Home Component", () => {
    it("should have a 'group by' label text for select dropdown ", () => {
        render(<Home />);
        const inputLableEl = screen.getByTestId("inputLableSelectId");
        expect(inputLableEl).toHaveTextContent("Group By");
    });

    it("select should have 'all' placeholder text by default ", () => {
        render(<Home />);
        const buttonEl = screen.getByText("All");
        expect(buttonEl).toBeInTheDocument();
    });

    it("select  dropdown should have 'ArrowDropDownIcon' by default ", () => {
        render(<Home />);
        const svgEl = screen.getByTestId("ArrowDropDownIcon");
        expect(svgEl).toBeInTheDocument();
    });

    it("select dropdown should have valid value  ", async () => {
        render(<Home />);
        userEvent.click(getByRole(screen.getByTestId("selectId"), "button"));
        await waitFor(() => userEvent.click(screen.getByText("By Authors")));
    });

    it("should show accordion detail if is clicked", () => {
        const mockOnClick = jest.fn();
        render(<Home onClick={mockOnClick()} />);
        const buttonEl = screen.getByRole("button", { name: /1 Happy User/i });
        userEvent.click(buttonEl);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("select  input value to should set to selected value after clicked ", () => {
        const mockOnClick = jest.fn();
        render(<Home onClick={mockOnClick()} />);
        const buttonEl = screen.getByTestId("selectId");
        userEvent.click(buttonEl);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        const inputEl = screen.getByRole("button", { name: /group by/i });
        expect(inputEl).toHaveTextContent("All");
    });
});
