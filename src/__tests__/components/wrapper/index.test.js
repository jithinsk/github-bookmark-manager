import React from "react";
import { render, screen } from "@testing-library/react";
import Wrapper from "../../../components/wrapper";

describe("Wrapper Component", () => {
  test("renders wrapper component with heading and children", () => {
    const { getByText } = render(
      <Wrapper heading="Home" children={<p>children</p>} />
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });
});
