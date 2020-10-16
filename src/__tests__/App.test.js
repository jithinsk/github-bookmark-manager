import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import Navigation from "./../components/navigation";
import AddRepository from "./../components/addrepo";
import Homepage from "./../components/homepage";

const MockNavigation = ({ showAddPage, goto }) => (
  <>
    {!showAddPage ? (
      <div onClick={() => goto("add-new")}>navigatorNew</div>
    ) : (
      <div onClick={() => goto()}>navigatorHome</div>
    )}
  </>
);

jest.mock("../components/navigation", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

const MockAddRepository = ({ addRepository }) => (
  <div onClick={() => addRepository("check_elem")}>click</div>
);

jest.mock("../components/addrepo", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

const MockHomepage = ({ repositories }) => <div>{repositories}</div>;

jest.mock("../components/homepage", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

beforeAll(() => {
  Navigation.mockImplementation(MockNavigation);
  AddRepository.mockImplementation(MockAddRepository);
  Homepage.mockImplementation(MockHomepage);
});

describe("App Component", () => {
  test("renders app component", () => {
    render(<App />);
  });

  test("calls add repository and goto", async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/navigatorNew/i));
    fireEvent.click(screen.getByText(/click/i));
    fireEvent.click(screen.getByText(/navigatorHome/i));
    const element = screen.getByText(/check_elem/i);
    expect(element).toBeInTheDocument();
  });
});
