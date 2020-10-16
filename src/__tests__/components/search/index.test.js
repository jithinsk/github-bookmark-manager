import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../../../components/search";

describe("Search Component", () => {
  test("renders Search component with value in search input", () => {
    const { getByText, getByDisplayValue } = render(
      <Search
        handleInputChage={() => {}}
        handleSelectChange={() => {}}
        fieldValue="test_value"
      />
    );
    const header = getByText(/Search Options:/i);
    expect(header).toBeInTheDocument();
    const type = getByText(/Type:/i);
    expect(type).toBeInTheDocument();
    const users = getByText(/Users/i);
    expect(users).toBeInTheDocument();
    const repo = getByText(/Repository/i);
    expect(repo).toBeInTheDocument();
    const search = getByText(/Search:/i);
    expect(search).toBeInTheDocument();
    const input = getByDisplayValue("test_value");
    expect(input).toBeInTheDocument();
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
