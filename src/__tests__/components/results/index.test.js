import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Results from "../../../components/results";

describe("Results Component", () => {
  test("renders results component without data", () => {
    render(
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
    expect(screen.getByText(/Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/No rows/i)).toBeInTheDocument();
  });

  test("renders results component with isloading", () => {
    render(
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
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders results component with data and button", () => {
    const mockFunction = jest.fn(() => {});
    render(
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
    expect(screen.getByText(/test_name/i)).toBeInTheDocument();
    const link = screen.getByText(/test_link/i);
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link.getAttribute("href")).toBe("url");

    const addButton = screen.getByText(/Add/i);
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(mockFunction).toHaveBeenCalled();
  });
});
