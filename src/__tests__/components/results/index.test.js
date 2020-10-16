import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Results from "../../../components/results";

describe("Results Component", () => {
  test("renders results component without data", () => {
    const { getByText } = render(
      <Results
        dataHeaders={["Index", "Name"]}
        dataset={[]}
        noRowsMessage={"No rows"}
        showButtonOption={false}
        isLoading={false}
        buttonAction={() => {}}
        buttonText=""
      />
    );
    const headerIndex = getByText(/Index/i);
    expect(headerIndex).toBeInTheDocument();

    const headerName = getByText(/Name/i);
    expect(headerName).toBeInTheDocument();

    const noRowsMessage = getByText(/No rows/i);
    expect(noRowsMessage).toBeInTheDocument();
  });

  test("renders results component with isloading", () => {
    const { getByText } = render(
      <Results
        dataHeaders={["Index", "Name"]}
        dataset={[]}
        noRowsMessage={"No rows"}
        showButtonOption={false}
        isLoading={true}
        buttonAction={() => {}}
        buttonText=""
      />
    );
    const loading = getByText(/Loading.../i);
    expect(loading).toBeInTheDocument();
  });

  test("renders results component with data and button", () => {
    const mockFunction = jest.fn(() => {});
    const { getByText } = render(
      <Results
        dataHeaders={["Index", "Name", "Link"]}
        dataset={[
          {
            Name: {
              value: "test_name",
            },
            Link: {
              value: "test_link",
              isLink: true,
            },
            URL: {
              value: "url",
            },
          },
        ]}
        noRowsMessage=""
        showButtonOption={true}
        isLoading={false}
        buttonAction={mockFunction}
        buttonText="Add"
      />
    );
    const field = getByText(/test_name/i);
    expect(field).toBeInTheDocument();
    const link = getByText(/test_link/i);
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link.getAttribute("href")).toBe("url");

    const addButton = getByText(/Add/i);
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(mockFunction).toHaveBeenCalled();
  });
});
