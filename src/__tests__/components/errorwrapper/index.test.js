import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ErrorWrapper from "../../../components/errorwrapper";

const ChildComponent = () => {
  throw new Error();
};

describe("Errorwrapper Component", () => {
  test("renders error wrapper component without error", () => {
    render(
      <ErrorWrapper>
        <div>no-error</div>
      </ErrorWrapper>
    );
    expect(screen.getByText(/no-error/i)).toBeInTheDocument();
  });

  test("renders error wrapper component without error", () => {
    render(
      <ErrorWrapper>
        <ChildComponent />
      </ErrorWrapper>
    );
    expect(screen.queryByText(/no-error/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });
});
