import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForDomChange,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AddRepo from "../../../components/addrepo";
import Search from "../../../components/search";
import * as API from "./../../../api";
import userreporespnse from "./userrepo.json";
import searchuserresponse from "./searchuser.json";
import searchreporesponse from "./searchrepo.json";
import ResultsTable from "../../../components/results";
import Paginatnor from "../../../components/pagination";

API.getUserRepos = jest.fn((url) => Promise.resolve(userreporespnse));

API.searchRepos = jest.fn((term, page) => Promise.resolve(searchreporesponse));

API.searchUsers = jest.fn((term, page) => Promise.resolve(searchuserresponse));

const MockSearch = ({ fieldValue, handleInputChage, handleSelectChange }) => (
  <>
    <div onClick={() => handleInputChage({ target: { value: "add" } })}>
      input
    </div>
    <div onClick={() => handleSelectChange({ target: { value: "repo" } })}>
      select
    </div>
  </>
);

jest.mock("../../../components/search", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

const MockResults = ({
  dataHeaders,
  dataset,
  showButtonOption,
  buttonAction,
  isLoading,
  buttonText,
  noRowsMessage,
}) => (
  <>
    <div onClick={() => buttonAction(0)}>action_test</div>
    {dataset &&
      dataset.map((data, index) => (
        <div key={index}>{data["URL"] && data["URL"].value}</div>
      ))}
  </>
);

jest.mock("../../../components/results", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

const MockPaginator = ({ selected, total, pageChanged }) => (
  <>
    <div onClick={() => pageChanged(1)}>page_change</div>
  </>
);

jest.mock("../../../components/pagination", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

beforeAll(() => {
  Search.mockImplementation(MockSearch);
  ResultsTable.mockImplementation(MockResults);
  Paginatnor.mockImplementation(MockPaginator);
});

describe("AddRepo Component", () => {
  test("renders addRepo component", () => {
    render(<AddRepo addRepository={() => {}} />);
  });

  test("changes input value", async () => {
    render(<AddRepo addRepository={() => {}} />);
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
  });

  test("changes select value", async () => {
    render(<AddRepo addRepository={() => {}} />);
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/select/i));
    expect(
      screen.queryByText("https://github.com/Newmu")
    ).not.toBeInTheDocument();
  });

  test("select repository to add", async () => {
    const mockFunction = jest.fn(() => {});
    render(<AddRepo addRepository={mockFunction} />);
    fireEvent.click(screen.getByText(/select/i));
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(
      screen.getByText("https://github.com/TeamNewPipe/NewPipe")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/action_test/i));
    expect(mockFunction).toHaveBeenCalled();
  });

  test("select user to view repos", async () => {
    const mockFunction = jest.fn(() => {});
    render(<AddRepo addRepository={mockFunction} />);
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/action_test/i));
    await waitForDomChange();
    expect(screen.getByText(/Go Back/)).toBeInTheDocument();
  });

  test("add repos from user repos and go back", async () => {
    const mockFunction = jest.fn(() => {});
    render(<AddRepo addRepository={mockFunction} />);
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/action_test/i));
    await waitForDomChange();
    expect(screen.getByText(/Go Back/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/action_test/i));
    expect(mockFunction).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/Go Back/i));
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
  });

  test("pagination page change", async () => {
    render(<AddRepo addRepository={() => {}} />);
    fireEvent.click(screen.getByText(/input/i));
    await waitForDomChange();
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/page_change/i));
    expect(screen.getByText("https://github.com/Newmu")).toBeInTheDocument();
  });
});
