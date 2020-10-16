import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../../../components/pagination";

describe("Pagination Component", () => {
  test("pagination component with five pages", () => {
    const { getByText } = render(
      <Pagination total={100} pageChanged={() => {}} />
    );
    const firstElement = getByText(/1/i);
    expect(firstElement).toBeInTheDocument();
    expect(firstElement.parentElement).toHaveClass("active");

    const secondElement = getByText(/2/i);
    expect(secondElement).toBeInTheDocument();
    expect(secondElement.parentElement).not.toHaveClass("active");

    const thirdElement = getByText(/3/i);
    expect(thirdElement).toBeInTheDocument();
    expect(thirdElement.parentElement).not.toHaveClass("active");

    const fourthElement = getByText(/4/i);
    expect(fourthElement).toBeInTheDocument();
    expect(fourthElement.parentElement).not.toHaveClass("active");

    const fifthElement = getByText(/5/i);
    expect(fifthElement.parentElement).toBeInTheDocument();
    expect(fifthElement).not.toHaveClass("active");
  });

  test("render with initial selected value", () => {
    const { getByText } = render(
      <Pagination total={100} pageChanged={() => {}} selected={2} />
    );
    const secondElement = getByText(/2/i);
    expect(secondElement).toBeInTheDocument();
    expect(secondElement.parentElement).toHaveClass("active");
  });

  test("click on page 2 from page 1", () => {
    const mockFunction = jest.fn(() => {});
    render(<Pagination total={100} pageChanged={mockFunction} />);
    fireEvent.click(screen.getByText(/2/i));
    expect(mockFunction).toHaveBeenCalled();
    expect(screen.getByText(/2/i).parentElement).toHaveClass("active");
    expect(screen.getByText(/1/i).parentElement).not.toHaveClass("active");
  });

  test("click on page 1 from page 1", () => {
    const mockFunction = jest.fn(() => {});
    render(<Pagination total={100} pageChanged={mockFunction} />);
    fireEvent.click(screen.getByText(/1/i));
    expect(mockFunction).not.toHaveBeenCalled();
    expect(screen.getByText(/1/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-previous from page 2", () => {
    render(<Pagination total={100} pageChanged={() => {}} selected={2} />);
    fireEvent.click(screen.getByText(/Previous/i).parentElement);
    expect(screen.getByText(/2/i).parentElement).not.toHaveClass("active");
    expect(screen.getByText(/1/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-first from page 2", () => {
    render(<Pagination total={100} pageChanged={() => {}} selected={3} />);
    fireEvent.click(screen.getByText(/First/i).parentElement);
    expect(screen.getByText(/3/i).parentElement).not.toHaveClass("active");
    expect(screen.getByText(/1/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-next from page 1", () => {
    render(<Pagination total={100} pageChanged={() => {}} />);
    fireEvent.click(screen.getByText(/Next/i).parentElement);
    expect(screen.getByText(/1/i).parentElement).not.toHaveClass("active");
    expect(screen.getByText(/2/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-last from page 1", () => {
    render(<Pagination total={100} pageChanged={() => {}} />);
    fireEvent.click(screen.getByText(/Last/i).parentElement);
    expect(screen.getByText(/1/i).parentElement).not.toHaveClass("active");
    expect(screen.getByText(/5/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-previous from page 1", () => {
    const mockFunction = jest.fn(() => {});
    render(<Pagination total={100} pageChanged={mockFunction} />);
    fireEvent.click(screen.getByText(/Previous/i));
    expect(mockFunction).not.toHaveBeenCalled();
    expect(screen.getByText(/1/i).parentElement).toHaveClass("active");
  });

  test("click on page go-to-next from page 5", () => {
    const mockFunction = jest.fn(() => {});
    render(<Pagination total={100} pageChanged={mockFunction} selected={5} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(mockFunction).not.toHaveBeenCalled();
    expect(screen.getByText(/5/i).parentElement).toHaveClass("active");
  });

  test("render with page 100", () => {
    const { getByText } = render(
      <Pagination total={2000} pageChanged={() => {}} selected={50} />
    );
    const secondElement = getByText(/50/i);
    expect(secondElement).toBeInTheDocument();
    expect(secondElement.parentElement).toHaveClass("active");
  });
});
