import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../../../components/search";

describe("Search Component", () => {
  test("renders Search component with value in search input", () => {
    render(
      <Search
        handleInputChage={() => {}}
        handleSelectChange={() => {}}
        fieldValue="test_value"
      />
    );
    expect(screen.getByText(/Search Options:/i)).toBeInTheDocument();
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Repository/i)).toBeInTheDocument();
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("test_value")).toBeInTheDocument();
  });

  test("change input field value", () => {
    const mockFunction = jest.fn(() => {});
    render(
      <Search
        handleInputChage={mockFunction}
        handleSelectChange={() => {}}
        fieldValue="test_value"
      />
    );
    const input = screen.getByDisplayValue("test_value");
    fireEvent.change(input, { target: { value: "new_value" } });
    expect(mockFunction).toHaveBeenCalled();
  });

  test("change select field value", () => {
    const mockFunction = jest.fn(() => {});
    render(
      <Search
        handleInputChage={() => {}}
        handleSelectChange={mockFunction}
        fieldValue=""
      />
    );
    const input = screen.getByDisplayValue("Users");
    fireEvent.change(input, { target: { value: "Repositories" } });
    expect(mockFunction).toHaveBeenCalled();
  });
});
