import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Navigation from "../../../components/navigation";

describe("Navigation Component", () => {
  test("renders navigation component with home page", () => {
    const { getByText } = render(
      <Navigation goto={() => {}} showAddPage={false} />
    );
    const homeTextElement = getByText(/Github Bookmark Manager/i);
    expect(homeTextElement).toBeInTheDocument();
    expect(homeTextElement.parentElement).toHaveClass("active");

    const addNewElement = getByText(/Add New/i);
    expect(addNewElement).toBeInTheDocument();
    expect(addNewElement.parentElement).not.toHaveClass("active");
  });

  test("renders navigation component with add new page", () => {
    const { getByText } = render(
      <Navigation goto={() => {}} showAddPage={true} />
    );
    const addNewElement = getByText(/Add New/i);
    expect(addNewElement).toBeInTheDocument();
    expect(addNewElement.parentElement).toHaveClass("active");
  });

  test("clicks on add new page", () => {
    const mockFunction = jest.fn(() => {});
    render(<Navigation goto={mockFunction} showAddPage={false} />);
    fireEvent.click(screen.getByText(/Add New/i));
    expect(mockFunction).toHaveBeenCalled();
  });

  test("clicks on home page", () => {
    const mockFunction = jest.fn(() => {});
    render(<Navigation goto={mockFunction} showAddPage={true} />);
    fireEvent.click(screen.getByText(/Github Bookmark Manager/i));
    expect(mockFunction).toHaveBeenCalled();
  });
});
